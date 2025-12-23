'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { SERVICE_TIERS } from '@/lib/constants/services'
import { SpotlightCard } from '@/components/aceternity/spotlight'

export function ServiceTiers() {
  return (
    <section id="services" className="relative py-24 sm:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-base font-semibold text-cyan-400">Pricing</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Choose Your <span className="text-gradient">Growth Plan</span>
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
            Select the package that best fits your business needs. All plans include our premium support.
          </p>
        </motion.div>

        {/* Pricing cards */}
        <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
          {SERVICE_TIERS.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <SpotlightCard
                className={cn(
                  'relative h-full flex flex-col',
                  tier.highlighted && 'border-blue-500/50 shadow-lg shadow-blue-500/10'
                )}
              >
                {/* Popular badge */}
                {tier.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-1 text-xs font-semibold text-white">
                      <Sparkles className="h-3 w-3" />
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground">{tier.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{tier.description}</p>

                  {/* Price */}
                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-4xl font-bold tracking-tight text-foreground">
                      ${tier.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-muted-foreground">USD</span>
                  </div>

                  {/* Features */}
                  <ul className="mt-8 space-y-3">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="mt-8">
                  <Button
                    asChild
                    className={cn(
                      'w-full',
                      tier.highlighted
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white'
                        : 'bg-white/5 hover:bg-white/10 text-foreground border border-white/10'
                    )}
                    size="lg"
                  >
                    <Link href={`/checkout/${tier.slug}`}>Get Started</Link>
                  </Button>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

        {/* Enterprise note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center text-sm text-muted-foreground"
        >
          Need a custom solution?{' '}
          <a href="#contact" className="text-cyan-400 hover:underline">
            Contact us
          </a>{' '}
          for enterprise pricing.
        </motion.p>
      </div>
    </section>
  )
}
