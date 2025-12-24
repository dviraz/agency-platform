'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import {
  Megaphone,
  Search,
  Share2,
  Code,
  Palette,
  ArrowRight,
} from 'lucide-react'
import { BentoGrid, BentoGridItem } from '@/components/aceternity/bento-grid'
import { PRODUCTS, ProductCategory } from '@/lib/constants/products'

const categoryIcons: Record<ProductCategory, React.ReactNode> = {
  service_tier: <Code className="h-5 w-5 text-cyan-400" />,
  advertising: <Megaphone className="h-5 w-5 text-blue-400" />,
  seo: <Search className="h-5 w-5 text-green-400" />,
  social_media: <Share2 className="h-5 w-5 text-pink-400" />,
  web_development: <Code className="h-5 w-5 text-purple-400" />,
  branding: <Palette className="h-5 w-5 text-orange-400" />,
}

// Featured products for bento grid
const featuredProducts = [
  {
    ...PRODUCTS.find((p) => p.slug === 'google-ads-pro')!,
    className: 'md:col-span-2',
    gradient: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    ...PRODUCTS.find((p) => p.slug === 'seo-national')!,
    className: 'md:col-span-1',
    gradient: 'from-green-500/20 to-emerald-500/20',
  },
  {
    ...PRODUCTS.find((p) => p.slug === 'meta-ads-pro')!,
    className: 'md:col-span-1',
    gradient: 'from-pink-500/20 to-rose-500/20',
  },
  {
    ...PRODUCTS.find((p) => p.slug === 'social-media-premium')!,
    className: 'md:col-span-2',
    gradient: 'from-purple-500/20 to-violet-500/20',
  },
]

export function ProductsGrid() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="products" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={shouldReduceMotion ? undefined : { once: true }}
          transition={shouldReduceMotion ? undefined : { duration: 0.5 }}
          className="mx-auto max-w-2xl text-center mb-16"
        >
          <h2 className="text-base font-semibold text-cyan-400">Products</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            A La Carte <span className="text-gradient">Marketing Services</span>
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
            Choose individual services based on your specific needs. Mix and match to create your perfect marketing stack.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <BentoGrid className="mx-auto">
          {featuredProducts.map((product, i) => (
            <BentoGridItem
              key={product.id}
              title={product.name}
              description={product.description}
              className={product.className}
              icon={categoryIcons[product.category as ProductCategory]}
              header={
                <div
                  className={`flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br ${product.gradient}`}
                >
                  <div className="flex items-end justify-between w-full p-4">
                    <div className="text-2xl font-bold text-foreground">
                      ${product.price.toLocaleString()}
                    </div>
                    <Link
                      href={`/checkout/${product.slug}`}
                      className="inline-flex items-center gap-1 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      Learn more <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              }
            />
          ))}
        </BentoGrid>

        {/* View all products link */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={shouldReduceMotion ? undefined : { once: true }}
          transition={shouldReduceMotion ? undefined : { duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
          >
            View all services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
