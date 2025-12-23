import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { capturePayPalOrder } from '@/lib/paypal/config'
import { sendEmail, getPaymentConfirmationEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { paypalOrderId, orderId } = await request.json()

    if (!paypalOrderId || !orderId) {
      return NextResponse.json(
        { error: 'PayPal order ID and order ID are required' },
        { status: 400 }
      )
    }

    // Verify the order belongs to the user
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .eq('user_id', user.id)
      .single()

    if (orderError || !order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    // Capture the PayPal payment
    const captureData = await capturePayPalOrder(paypalOrderId)

    if (captureData.status !== 'COMPLETED') {
      // Update order status to failed
      await supabase
        .from('orders')
        .update({
          status: 'payment_failed',
          payment_status: captureData.status,
        })
        .eq('id', orderId)

      return NextResponse.json(
        { error: 'Payment was not completed' },
        { status: 400 }
      )
    }

    // Update order status to completed
    const { error: updateError } = await supabase
      .from('orders')
      .update({
        status: 'payment_completed',
        payment_status: 'COMPLETED',
        paypal_capture_id: captureData.purchase_units?.[0]?.payments?.captures?.[0]?.id,
        payment_completed_at: new Date().toISOString(),
      })
      .eq('id', orderId)

    if (updateError) {
      console.error('Order update error:', updateError)
    }

    // Create intake form for the order
    const { error: intakeError } = await supabase
      .from('intake_forms')
      .insert({
        order_id: orderId,
        user_id: user.id,
        current_step: 1,
        is_completed: false,
      })

    if (intakeError) {
      console.error('Intake form creation error:', intakeError)
    }

    // Send confirmation email
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name, email')
        .eq('id', user.id)
        .single()

      if (profile) {
        const emailContent = getPaymentConfirmationEmail({
          customerName: profile.full_name || 'Valued Customer',
          productName: order.product_id, // This should be product name
          amount: order.amount_usd,
          orderId: orderId,
        })

        await sendEmail({
          to: profile.email,
          subject: emailContent.subject,
          html: emailContent.html,
        })
      }
    } catch (emailError) {
      console.error('Email sending error:', emailError)
      // Don't fail the request if email fails
    }

    return NextResponse.json({
      success: true,
      orderId,
      captureId: captureData.purchase_units?.[0]?.payments?.captures?.[0]?.id,
    })
  } catch (error: any) {
    console.error('Capture order error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
