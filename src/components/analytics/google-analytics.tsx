/**
 * Google Analytics Component
 * Uses @next/third-parties for optimized script loading
 */

'use client'

import { GoogleAnalytics as GA } from '@next/third-parties/google'

export function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  // Only render if GA ID is configured
  if (!gaId) {
    return null
  }

  return <GA gaId={gaId} />
}

/**
 * Send a custom event to Google Analytics
 * @param eventName - The name of the event
 * @param params - Additional parameters for the event
 */
export function sendGAEvent(eventName: string, params?: Record<string, any>) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, params)
  }
}

/**
 * Track a conversion event (e.g., purchase, signup)
 * @param transactionId - Unique transaction ID
 * @param value - Transaction value in USD
 * @param items - Array of items in the transaction
 */
export function trackConversion(
  transactionId: string,
  value: number,
  items?: Array<{ id: string; name: string; quantity: number; price: number }>
) {
  sendGAEvent('purchase', {
    transaction_id: transactionId,
    value,
    currency: 'USD',
    items,
  })
}
