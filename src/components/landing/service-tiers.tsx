'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import { Check, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { SERVICE_TIERS } from '@/lib/constants/services'
import { SpotlightCard } from '@/components/aceternity/spotlight'

type BillingCycle = 'onetime' | 'monthly'

export function ServiceTiers() {
  const shouldReduceMotion = useReducedMotion()
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('onetime')

  return (
    <section id="services" className="relative py-24 sm:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={shouldReduceMotion ? undefined : { once: true }}
          transition={shouldReduceMotion ? undefined : { duration: 0.5 }}
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

        {/* Pricing Toggle */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={shouldReduceMotion ? undefined : { once: true }}
          transition={shouldReduceMotion ? undefined : { duration: 0.5, delay: 0.1 }}
          className="mt-12 flex flex-col items-center gap-4"
        >
          <div className="relative inline-flex items-center rounded-full bg-card/50 backdrop-blur-xl border border-white/10 p-1">
            <button
              onClick={() => setBillingCycle('onetime')}
              className={cn(
                'relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300',
                billingCycle === 'onetime'
                  ? 'text-white'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {billingCycle === 'onetime' && (
                <motion.div
                  layoutId="pricing-toggle"
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                  transition={shouldReduceMotion ? { duration: 0 } : { type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">One-Time</span>
            </button>
            <button
              onClick={() => setBillingCycle('monthly')}
              className={cn(
                'relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300',
                billingCycle === 'monthly'
                  ? 'text-white'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {billingCycle === 'monthly' && (
                <motion.div
                  layoutId="pricing-toggle"
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                  transition={shouldReduceMotion ? { duration: 0 } : { type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">Monthly</span>
            </button>
          </div>

          {/* Savings/Benefit Badge */}
          <AnimatePresence mode="wait">
            {billingCycle === 'onetime' ? (
              <motion.div
                key="onetime-badge"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="inline-flex items-center gap-1 rounded-full bg-green-500/10 border border-green-500/20 px-3 py-1 text-xs font-medium text-green-400"
              >
                <Sparkles className="h-3 w-3" />
                Save up to 62% with one-time payment
              </motion.div>
            ) : (
              <motion.div
                key="monthly-badge"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 border border-blue-500/20 px-3 py-1 text-xs font-medium text-blue-400"
              >
                <Sparkles className="h-3 w-3" />
                Continuous Optimization & Priority Support Included
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Pricing cards */}
        <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
          {SERVICE_TIERS.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={shouldReduceMotion ? undefined : { once: true }}
              transition={shouldReduceMotion ? undefined : { duration: 0.5, delay: index * 0.1 }}
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
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={billingCycle}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="text-4xl font-bold tracking-tight text-foreground"
                      >
                        ${billingCycle === 'onetime' ? tier.price.toLocaleString() : tier.monthlyPrice.toLocaleString()}
                      </motion.span>
                    </AnimatePresence>
                    <span className="text-sm text-muted-foreground">
                      {billingCycle === 'onetime' ? 'USD' : '/mo'}
                    </span>
                  </div>

                  {/* Features */}
                  <ul className="mt-8 space-y-3">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                    {billingCycle === 'monthly' && (
                      <>
                        <li className="flex items-start gap-3">
                          <Sparkles className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                          <span className="text-sm text-blue-400 font-medium">Continuous SEO Updates</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Sparkles className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                          <span className="text-sm text-blue-400 font-medium">Monthly Performance Audit</span>
                        </li>
                      </>
                    )}
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
                    <Link href={`/checkout/${tier.slug}${billingCycle === 'monthly' ? '?billing=monthly' : ''}`}>
                      Get Started
                    </Link>
                  </Button>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

        {/* Enterprise note */}
        <motion.p
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1 }}
          viewport={shouldReduceMotion ? undefined : { once: true }}
          transition={shouldReduceMotion ? undefined : { duration: 0.5, delay: 0.4 }}
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
