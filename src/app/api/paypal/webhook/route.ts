import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendEmail, getPaymentConfirmationEmail } from '@/lib/email';
import { verifyWebhookSignature } from '@/lib/paypal/config';

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

    console.log('PayPal webhook received:', eventType);

    // Verify webhook signature in production
    if (PAYPAL_WEBHOOK_ID) {
      const transmissionId = request.headers.get('paypal-transmission-id');
      const transmissionTime = request.headers.get('paypal-transmission-time');
      const certUrl = request.headers.get('paypal-cert-url');
      const authAlgo = request.headers.get('paypal-auth-algo');
      const transmissionSig = request.headers.get('paypal-transmission-sig');

      if (!transmissionId || !transmissionTime || !certUrl || !authAlgo || !transmissionSig) {
        console.error('Missing PayPal webhook headers');
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
        console.error('Invalid PayPal webhook signature');
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
      }

      console.log('PayPal webhook signature verified');
    } else {
      console.warn('PAYPAL_WEBHOOK_ID not set - skipping signature verification (development only)');
    }

    // Handle payment capture completed event
    if (eventType === 'PAYMENT.CAPTURE.COMPLETED') {
      const captureId = body.resource.id;
      const orderId = body.resource.supplementary_data?.related_ids?.order_id;
      const amount = body.resource.amount.value;
      const currency = body.resource.amount.currency_code;
      const payerEmail = body.resource.payer?.email_address;

      console.log('Payment captured:', { captureId, orderId, amount, currency });

      if (!orderId) {
        console.error('No order ID in webhook payload');
        return NextResponse.json({ error: 'No order ID' }, { status: 400 });
      }

      // Find the order in our database by PayPal order ID
      const { data: order, error: orderError } = await supabaseAdmin
        .from('orders')
        .select('*, profiles(*), products(*)')
        .eq('paypal_order_id', orderId)
        .single();

      if (orderError || !order) {
        console.error('Order not found:', orderError);
        return NextResponse.json({ error: 'Order not found' }, { status: 404 });
      }

      // Check if already processed (idempotency)
      if (order.status === 'payment_completed' || order.paypal_capture_id) {
        console.log('Order already processed, skipping');
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
        console.error('Failed to update order:', updateError);
        return NextResponse.json({ error: 'Update failed' }, { status: 500 });
      }

      // Create intake form for the order (if not exists)
      const { data: existingIntake } = await supabaseAdmin
        .from('intake_forms')
        .select('id')
        .eq('order_id', order.id)
        .single();

      if (!existingIntake) {
        const { error: intakeError } = await supabaseAdmin
          .from('intake_forms')
          .insert({
            order_id: order.id,
            user_id: order.user_id,
            contact_email: order.profiles.email,
            contact_person: order.profiles.full_name,
            business_name: order.profiles.company_name,
            current_step: 1,
            is_completed: false,
          });

        if (intakeError) {
          console.error('Failed to create intake form:', intakeError);
        } else {
          console.log('Intake form created for order:', order.id);
        }
      }

      // Send payment confirmation email
      try {
        const emailContent = getPaymentConfirmationEmail({
          customerName: order.profiles.full_name || 'Customer',
          productName: order.products.name,
          amount: parseFloat(amount),
          orderId: order.id,
        });

        await sendEmail({
          to: order.profiles.email,
          subject: emailContent.subject,
          html: emailContent.html,
        });

        console.log('Payment confirmation email sent to:', order.profiles.email);
      } catch (emailError) {
        console.error('Failed to send email:', emailError);
        // Don't fail the webhook if email fails
      }

      return NextResponse.json({
        message: 'Webhook processed successfully',
        orderId: order.id,
      });
    }

    // Handle other webhook events (optional)
    console.log('Unhandled webhook event type:', eventType);
    return NextResponse.json({ message: 'Event received' }, { status: 200 });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

