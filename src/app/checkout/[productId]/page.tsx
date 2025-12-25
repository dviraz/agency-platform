import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Check, Shield, Clock, Headphones } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CheckoutForm } from '@/components/checkout/checkout-form'
import { PRODUCTS } from '@/lib/constants/products'
import { SERVICE_TIERS } from '@/lib/constants/services'
import { BackgroundBeams } from '@/components/aceternity/background-beams'

type CheckoutProductData = {
  name: string
  price: number
  description: string
  features: readonly string[] | string[]
  slug: string
}

function getProductData(productSlug: string, billing?: string): CheckoutProductData | null {
  const product = PRODUCTS.find((p) => p.slug === productSlug)

  if (product) {
    return {
      name: product.name,
      price: product.price,
      description: product.description,
      features: product.features,
      slug: product.slug,
    }
  }

  const tier = SERVICE_TIERS.find((t) => t.slug === productSlug)
  if (tier) {
    return {
      name: tier.name,
      price: billing === 'monthly' ? tier.monthlyPrice : tier.price,
      description: tier.description,
      features: tier.features,
      slug: tier.slug,
    }
  }

  return null
}

export async function generateMetadata({ params, searchParams }: { params: Promise<{ productId: string }>, searchParams: Promise<{ billing?: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const resolvedSearchParams = await searchParams
  const productData = getProductData(resolvedParams.productId, resolvedSearchParams.billing)

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

export default async function CheckoutPage({
  params,
  searchParams,
}: {
  params: Promise<{ productId: string }>
  searchParams: Promise<{ billing?: string }>
}) {
  const resolvedParams = await params
  const resolvedSearchParams = await searchParams
  const productSlug = resolvedParams.productId

  // Find product (check both products and service tiers)
  const productData = getProductData(productSlug, resolvedSearchParams.billing)

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

        <CheckoutForm initialProduct={productData} />
      </div>
    </div>
  )
}
