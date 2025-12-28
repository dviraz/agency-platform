import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendEmail, getPaymentConfirmationEmail } from '@/lib/email';
import { verifyWebhookSignature } from '@/lib/paypal/config';
import crypto from 'crypto';

// Use service role key for admin operations
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const PAYPAL_WEBHOOK_ID = process.env.PAYPAL_WEBHOOK_ID;

/**
 * PayPal Webhook Handler
 *
 * This endpoint handles PayPal webhook events for payment reliability.
 * Critical event: PAYMENT.CAPTURE.COMPLETED
 *
 * Even if the user closes their browser after payment, this webhook
 * ensures the order is marked as paid and the intake form is created.
 */
export async function POST(request: NextRequest) {
  try {
    // Get the raw body for signature verification
    const rawBody = await request.text();
    const body = JSON.parse(rawBody);
    const eventType = body.event_type;

    // Verify webhook signature in production
    if (PAYPAL_WEBHOOK_ID) {
      const transmissionId = request.headers.get('paypal-transmission-id');
      const transmissionTime = request.headers.get('paypal-transmission-time');
      const certUrl = request.headers.get('paypal-cert-url');
      const authAlgo = request.headers.get('paypal-auth-algo');
      const transmissionSig = request.headers.get('paypal-transmission-sig');

      if (!transmissionId || !transmissionTime || !certUrl || !authAlgo || !transmissionSig) {
        return NextResponse.json({ error: 'Missing webhook headers' }, { status: 401 });
      }

      const isValid = await verifyWebhookSignature(
        PAYPAL_WEBHOOK_ID,
        {
          transmissionId,
          transmissionTime,
          certUrl,
          authAlgo,
          transmissionSig,
        },
        rawBody
      );

      if (!isValid) {
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
      }
    }

    // Handle payment capture completed event
    if (eventType === 'PAYMENT.CAPTURE.COMPLETED') {
      const captureId = body.resource.id;
      const orderId = body.resource.supplementary_data?.related_ids?.order_id;
      const amount = body.resource.amount.value;
      const currency = body.resource.amount.currency_code;

      if (!orderId) {
        return NextResponse.json({ error: 'No order ID' }, { status: 400 });
      }

      // Find the order in our database by PayPal order ID
      const { data: order, error: orderError } = await supabaseAdmin
        .from('orders')
        .select('*, profiles(*), products(*)')
        .eq('paypal_order_id', orderId)
        .single();

      if (orderError || !order) {
        return NextResponse.json({ error: 'Order not found' }, { status: 404 });
      }

      // Handle guest checkout - create account if order has no user_id
      let userId = order.user_id;
      let userEmail = order.profiles?.email;

      if (!userId && order.metadata?.guestEmail) {
        const guestEmail = order.metadata.guestEmail;

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(guestEmail)) {
          return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
        }

        // Check if user with this email already exists
        const { data: existingUser } = await supabaseAdmin.auth.admin.listUsers();
        const userExists = existingUser?.users.find(u => u.email === guestEmail);

        if (userExists) {
          userId = userExists.id;
        } else {
          // Create a new user account with crypto-secure random password
          const tempPassword = crypto.randomBytes(16).toString('base64') + 'Aa1!';
          const { data: newUser, error: createUserError } = await supabaseAdmin.auth.admin.createUser({
            email: guestEmail,
            password: tempPassword,
            email_confirm: true, // Auto-confirm email
          });

          if (!createUserError && newUser.user) {
            userId = newUser.user.id;
            userEmail = guestEmail;

            // Create profile
            await supabaseAdmin.from('profiles').insert({
              id: userId,
              email: guestEmail,
              role: 'user',
            });
          }
        }

        // Link order to user
        if (userId) {
          await supabaseAdmin
            .from('orders')
            .update({ user_id: userId })
            .eq('id', order.id);

          order.user_id = userId;
        }
      }

      // Check if already processed (idempotency)
      if (order.status === 'payment_completed' || order.paypal_capture_id) {
        return NextResponse.json({ message: 'Already processed' }, { status: 200 });
      }

      // Update order status
      const { error: updateError } = await supabaseAdmin
        .from('orders')
        .update({
          status: 'payment_completed',
          payment_status: 'COMPLETED',
          paypal_capture_id: captureId,
          payment_completed_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', order.id);

      if (updateError) {
        return NextResponse.json({ error: 'Update failed' }, { status: 500 });
      }

      // Create intake form for the order (if not exists)
      const { data: existingIntake } = await supabaseAdmin
        .from('intake_forms')
        .select('id')
        .eq('order_id', order.id)
        .single();

      if (!existingIntake && userId) {
        await supabaseAdmin
          .from('intake_forms')
          .insert({
            order_id: order.id,
            user_id: userId,
            contact_email: userEmail || order.profiles?.email,
            contact_person: order.profiles?.full_name,
            business_name: order.profiles?.company_name,
            current_step: 1,
            is_completed: false,
          });
      }

      // Send payment confirmation email
      try {
        const recipientEmail = userEmail || order.profiles?.email;
        if (recipientEmail) {
          const emailContent = getPaymentConfirmationEmail({
            customerName: order.profiles?.full_name || 'Customer',
            productName: order.products?.name || 'Your purchase',
            amount: parseFloat(amount),
            orderId: order.id,
          });

          await sendEmail({
            to: recipientEmail,
            subject: emailContent.subject,
            html: emailContent.html,
          });
        }
      } catch {
        // Don't fail the webhook if email fails
      }

      return NextResponse.json({
        message: 'Webhook processed successfully',
        orderId: order.id,
      });
    }

    // Handle other webhook events (optional)
    return NextResponse.json({ message: 'Event received' }, { status: 200 });

  } catch {
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

