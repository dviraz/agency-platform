const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET!
const PAYPAL_MODE = process.env.PAYPAL_MODE || 'sandbox'

export const PAYPAL_API_URL =
  PAYPAL_MODE === 'live'
    ? 'https://api-m.paypal.com'
    : 'https://api-m.sandbox.paypal.com'

export async function getPayPalAccessToken(): Promise<string> {
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64')

  const response = await fetch(`${PAYPAL_API_URL}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error_description || 'Failed to get PayPal access token')
  }

  return data.access_token
}

export async function createPayPalOrder(amount: number, description: string, customId: string) {
  const accessToken = await getPayPalAccessToken()

  const response = await fetch(`${PAYPAL_API_URL}/v2/checkout/orders`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: amount.toFixed(2),
          },
          description,
          custom_id: customId,
        },
      ],
      application_context: {
        brand_name: 'Agency',
        shipping_preference: 'NO_SHIPPING',
        user_action: 'PAY_NOW',
        return_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/cancel`,
      },
    }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Failed to create PayPal order')
  }

  return data
}

export async function capturePayPalOrder(orderId: string) {
  const accessToken = await getPayPalAccessToken()

  const response = await fetch(`${PAYPAL_API_URL}/v2/checkout/orders/${orderId}/capture`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Failed to capture PayPal order')
  }

  return data
}

/**
 * Verify PayPal webhook signature
 * See: https://developer.paypal.com/api/rest/webhooks/
 */
export async function verifyWebhookSignature(
  webhookId: string,
  headers: {
    transmissionId: string
    transmissionTime: string
    certUrl: string
    authAlgo: string
    transmissionSig: string
  },
  webhookEventBody: string
): Promise<boolean> {
  const accessToken = await getPayPalAccessToken()

  const response = await fetch(`${PAYPAL_API_URL}/v1/notifications/verify-webhook-signature`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      auth_algo: headers.authAlgo,
      cert_url: headers.certUrl,
      transmission_id: headers.transmissionId,
      transmission_sig: headers.transmissionSig,
      transmission_time: headers.transmissionTime,
      webhook_id: webhookId,
      webhook_event: JSON.parse(webhookEventBody),
    }),
  })

  const data = await response.json()

  if (!response.ok) {
    console.error('Webhook verification failed:', data)
    return false
  }

  return data.verification_status === 'SUCCESS'
}
