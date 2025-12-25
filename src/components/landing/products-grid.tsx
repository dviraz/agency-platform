'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import {
  Megaphone,
  Search,
  Share2,
  Code,
  Palette,
  ArrowRight,
  Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { PRODUCTS, ProductCategory, PRODUCT_CATEGORIES } from '@/lib/constants/products'

const categoryIcons: Record<string, React.ReactNode> = {
  advertising: <Megaphone className="h-5 w-5" />,
  seo: <Search className="h-5 w-5" />,
  social_media: <Share2 className="h-5 w-5" />,
  web_development: <Code className="h-5 w-5" />,
  branding: <Palette className="h-5 w-5" />,
}

const categoryColors: Record<string, string> = {
  advertising: 'from-blue-500/20 to-cyan-500/20',
  seo: 'from-green-500/20 to-emerald-500/20',
  social_media: 'from-pink-500/20 to-rose-500/20',
  web_development: 'from-purple-500/20 to-violet-500/20',
  branding: 'from-orange-500/20 to-amber-500/20',
}

type FilterCategory = 'all' | ProductCategory

export function ProductsGrid() {
  const shouldReduceMotion = useReducedMotion()
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all')

  // Filter products based on active category (exclude service_tier)
  const allProducts = PRODUCTS.filter(p => p.category !== 'service_tier')
  const filteredProducts = activeFilter === 'all'
    ? allProducts
    : allProducts.filter(p => p.category === activeFilter)

  // Determine if product is featured (top products by price)
  const featuredSlugs = ['web-app-development', 'branding-complete', 'seo-national', 'social-media-premium']

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

        {/* Category Filters */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={shouldReduceMotion ? undefined : { once: true }}
          transition={shouldReduceMotion ? undefined : { duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          <button
            onClick={() => setActiveFilter('all')}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
              activeFilter === 'all'
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/20'
                : 'bg-card/50 backdrop-blur-xl border border-white/10 text-muted-foreground hover:text-foreground hover:border-white/20'
            )}
          >
            All Products
          </button>
          {Object.entries(PRODUCT_CATEGORIES).map(([key, category]) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key as ProductCategory)}
              className={cn(
                'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
                activeFilter === key
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/20'
                  : 'bg-card/50 backdrop-blur-xl border border-white/10 text-muted-foreground hover:text-foreground hover:border-white/20'
              )}
            >
              {categoryIcons[key]}
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => {
            const isFeatured = featuredSlugs.includes(product.slug)
            return (
              <motion.div
                key={product.id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={shouldReduceMotion ? undefined : { once: true, margin: '-100px' }}
                transition={shouldReduceMotion ? undefined : { duration: 0.5, delay: index * 0.05 }}
                className="relative group"
              >
                {/* Card glow effect */}
                <div className={cn(
                  'absolute inset-0 rounded-2xl blur-xl transition-all duration-300 opacity-0 group-hover:opacity-100',
                  `bg-gradient-to-br ${categoryColors[product.category]}`
                )} />

                {/* Card content */}
                <div className="relative h-full bg-card/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col hover:border-white/20 transition-all duration-300">
                  {/* Featured badge */}
                  {isFeatured && (
                    <div className="absolute -top-3 -right-3">
                      <div className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-3 py-1 text-xs font-semibold text-white shadow-lg">
                        <Sparkles className="h-3 w-3" />
                        Popular
                      </div>
                    </div>
                  )}

                  {/* Category icon & name */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className={cn(
                      'p-2 rounded-lg bg-gradient-to-br',
                      categoryColors[product.category]
                    )}>
                      {categoryIcons[product.category]}
                    </div>
                    <span className="text-xs text-muted-foreground uppercase tracking-wide">
                      {PRODUCT_CATEGORIES[product.category as keyof typeof PRODUCT_CATEGORIES].name}
                    </span>
                  </div>

                  {/* Product name */}
                  <h3 className="text-xl font-semibold mb-2 text-foreground">
                    {product.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-4 flex-1">
                    {product.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {product.features.slice(0, 3).map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-cyan-400 mt-0.5">•</span>
                        {feature}
                      </li>
                    ))}
                    {product.features.length > 3 && (
                      <li className="text-xs text-muted-foreground/60">
                        +{product.features.length - 3} more features
                      </li>
                    )}
                  </ul>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div>
                      <div className="text-2xl font-bold text-foreground">
                        ${product.price.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">One-time payment</div>
                    </div>
                    <Link
                      href={`/checkout/${product.slug}`}
                      className="inline-flex items-center gap-1 text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors group/link"
                    >
                      Get Started
                      <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* No results message */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products found in this category.</p>
          </div>
        )}

        {/* Category page link (when filtered) */}
        {activeFilter !== 'all' && (
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={shouldReduceMotion ? undefined : { once: true }}
            transition={shouldReduceMotion ? undefined : { duration: 0.5, delay: 0.3 }}
            className="mt-12 text-center"
          >
            <Link
              href={`/products/${activeFilter.replace('_', '-')}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
            >
              View All {PRODUCT_CATEGORIES[activeFilter as keyof typeof PRODUCT_CATEGORIES].name} Services
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        )}

        {/* View services link */}
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
            View service packages
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
