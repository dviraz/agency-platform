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

    const { productSlug, addonSlugs = [] } = await request.json()

    if (!productSlug) {
      return NextResponse.json({ error: 'Product slug is required' }, { status: 400 })
    }

    // Find main product
    let mainProduct: { name: string; price: number; slug: string } | undefined

    const { data: productRecords } = await supabase
      .from('products')
      .select('name, price_usd, slug, is_active')
      .eq('slug', productSlug)
      .eq('is_active', true)
      .limit(1)

    const productRecord = productRecords?.[0]

    if (productRecord) {
      mainProduct = {
        name: productRecord.name,
        price: productRecord.price_usd,
        slug: productRecord.slug,
      }
    }

    if (!mainProduct) {
      const product = PRODUCTS.find((p) => p.slug === productSlug)
      if (product) {
        mainProduct = { name: product.name, price: product.price, slug: product.slug }
      } else {
        const tier = SERVICE_TIERS.find((t) => t.slug === productSlug)
        if (tier) {
          mainProduct = { name: tier.name, price: tier.price, slug: tier.slug }
        }
      }
    }

    if (!mainProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    // Find add-ons
    const selectedAddons = PRODUCTS.filter(p => addonSlugs.includes(p.slug))
    
    const totalPrice = mainProduct.price + selectedAddons.reduce((sum, a) => sum + a.price, 0)
    const combinedDescription = [mainProduct.name, ...selectedAddons.map(a => a.name)].join(' + ')

    // Create order in database first
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: user.id,
        product_id: mainProduct.slug,
        amount_usd: totalPrice,
        status: 'pending',
        metadata: {
          addons: selectedAddons.map(a => ({ name: a.name, slug: a.slug, price: a.price }))
        }
      })
      .select()
      .single()

    if (orderError) {
      console.error('Order creation error:', orderError)
      return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
    }

    // Create PayPal order
    const paypalOrder = await createPayPalOrder(
      totalPrice,
      combinedDescription,
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
  } catch (error: unknown) {
    console.error('Create order error:', error)
    const message = error instanceof Error ? error.message : 'Internal server error'
    return NextResponse.json(
      { error: message },
      { status: 500 }
    )
  }
}
