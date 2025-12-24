import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createPayPalOrder } from '@/lib/paypal/config'
import { PRODUCTS } from '@/lib/constants/products'
import { SERVICE_TIERS } from '@/lib/constants/services'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { productSlug } = await request.json()

    if (!productSlug) {
      return NextResponse.json({ error: 'Product slug is required' }, { status: 400 })
    }

    // Find product (prefer database, fallback to local constants/service tiers)
    let productData: { name: string; price: number; slug: string } | undefined

    const { data: productRecords } = await supabase
      .from('products')
      .select('name, price_usd, slug, is_active')
      .eq('slug', productSlug)
      .eq('is_active', true)
      .limit(1)

    const productRecord = productRecords?.[0]

    if (productRecord) {
      productData = {
        name: productRecord.name,
        price: productRecord.price_usd,
        slug: productRecord.slug,
      }
    }

    if (!productData) {
      let product = PRODUCTS.find((p) => p.slug === productSlug)

      if (product) {
        productData = { name: product.name, price: product.price, slug: product.slug }
      } else {
        const tier = SERVICE_TIERS.find((t) => t.slug === productSlug)
        if (tier) {
          productData = { name: tier.name, price: tier.price, slug: tier.slug }
        }
      }
    }

    if (!productData) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    // Create order in database first
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: user.id,
        product_id: productData.slug, // Using slug as ID for now
        amount_usd: productData.price,
        status: 'pending',
      })
      .select()
      .single()

    if (orderError) {
      console.error('Order creation error:', orderError)
      return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
    }

    // Create PayPal order
    const paypalOrder = await createPayPalOrder(
      productData.price,
      productData.name,
      order.id
    )

    // Update order with PayPal order ID
    await supabase
      .from('orders')
      .update({
        paypal_order_id: paypalOrder.id,
        status: 'payment_processing',
      })
      .eq('id', order.id)

    return NextResponse.json({
      orderId: order.id,
      paypalOrderId: paypalOrder.id,
    })
  } catch (error: any) {
    console.error('Create order error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
