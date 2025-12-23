'use client'

import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface PayPalButtonProps {
  productSlug: string
  onSuccess?: (orderId: string) => void
}

export function PayPalButton({ productSlug, onSuccess }: PayPalButtonProps) {
  const router = useRouter()

  const createOrder = async () => {
    try {
      const response = await fetch('/api/paypal/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productSlug }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create order')
      }

      return data.paypalOrderId
    } catch (error: any) {
      toast.error(error.message || 'Failed to create order')
      throw error
    }
  }

  const onApprove = async (data: any) => {
    try {
      const response = await fetch('/api/paypal/capture-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paypalOrderId: data.orderID,
          orderId: data.orderID, // This should be our internal order ID
        }),
      })

      const captureData = await response.json()

      if (!response.ok) {
        throw new Error(captureData.error || 'Failed to capture payment')
      }

      toast.success('Payment successful!')

      if (onSuccess) {
        onSuccess(captureData.orderId)
      } else {
        router.push(`/checkout/success?orderId=${captureData.orderId}`)
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to process payment')
    }
  }

  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
        currency: 'USD',
        intent: 'capture',
      }}
    >
      <PayPalButtons
        style={{
          layout: 'vertical',
          color: 'gold',
          shape: 'rect',
          label: 'paypal',
        }}
        createOrder={createOrder}
        onApprove={onApprove}
        onError={(err) => {
          console.error('PayPal error:', err)
          toast.error('Payment failed. Please try again.')
        }}
        onCancel={() => {
          toast.info('Payment cancelled')
        }}
      />
    </PayPalScriptProvider>
  )
}
