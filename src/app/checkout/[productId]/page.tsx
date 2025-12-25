import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Check, Shield, Clock, Headphones } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PayPalButton } from '@/components/checkout/paypal-button'
import { PRODUCTS } from '@/lib/constants/products'
import { SERVICE_TIERS } from '@/lib/constants/services'
import { BackgroundBeams } from '@/components/aceternity/background-beams'

type CheckoutProductData = {
  name: string
  price: number
  description: string
  features: readonly string[] | string[]
}

function getProductData(productSlug: string): CheckoutProductData | null {
  const product = PRODUCTS.find((p) => p.slug === productSlug)

  if (product) {
    return {
      name: product.name,
      price: product.price,
      description: product.description,
      features: product.features,
    }
  }

  const tier = SERVICE_TIERS.find((t) => t.slug === productSlug)
  if (tier) {
    return {
      name: tier.name,
      price: tier.price,
      description: tier.description,
      features: tier.features,
    }
  }

  return null
}

export function generateMetadata({ params }: { params: { productId: string } }): Metadata {
  const productData = getProductData(params.productId)

  if (!productData) {
    return {
      title: 'Checkout',
      description: 'Complete your purchase.',
    }
  }

  return {
    title: `Checkout | ${productData.name}`,
    description: `Complete your purchase for ${productData.name}.`,
  }
}

export default function CheckoutPage({ params }: { params: { productId: string } }) {
  const productSlug = params.productId

  // Find product (check both products and service tiers)
  const productData = getProductData(productSlug)

  if (!productData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Button asChild>
            <Link href="/">Go back home</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <BackgroundBeams className="opacity-20" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-purple-500/20 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        {/* Back link */}
        <Link
          href="/#services"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to services
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product details */}
          <div>
            <h1 className="text-3xl font-bold mb-4">{productData.name}</h1>
            <p className="text-muted-foreground mb-6">{productData.description}</p>

            <div className="text-4xl font-bold mb-8">
              ${productData.price.toLocaleString()}
              <span className="text-base font-normal text-muted-foreground ml-2">
                USD
              </span>
            </div>

            {/* Features */}
            <div className="space-y-3 mb-8">
              <h3 className="font-semibold mb-4">What&apos;s included:</h3>
              {productData.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10">
              <div className="text-center">
                <Shield className="h-6 w-6 mx-auto mb-2 text-cyan-400" />
                <span className="text-xs text-muted-foreground">Secure Payment</span>
              </div>
              <div className="text-center">
                <Clock className="h-6 w-6 mx-auto mb-2 text-cyan-400" />
                <span className="text-xs text-muted-foreground">Quick Start</span>
              </div>
              <div className="text-center">
                <Headphones className="h-6 w-6 mx-auto mb-2 text-cyan-400" />
                <span className="text-xs text-muted-foreground">24/7 Support</span>
              </div>
            </div>
          </div>

          {/* Payment section */}
          <div>
            <div className="bg-card/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              <h2 className="text-xl font-semibold mb-6">Complete your purchase</h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${productData.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>$0.00</span>
                </div>
                <div className="border-t border-white/10 pt-4 flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${productData.price.toLocaleString()} USD</span>
                </div>
              </div>

              {/* PayPal Button */}
              <div className="mb-6">
                <PayPalButton productSlug={productSlug} />
              </div>

              <p className="text-xs text-muted-foreground text-center">
                By completing this purchase, you agree to our{' '}
                <Link href="/legal/terms" className="underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/legal/privacy" className="underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
