'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ComparisonFeature {
  name: string
  starter: boolean | string
  growth: boolean | string
  enterprise: boolean | string
}

const features: ComparisonFeature[] = [
  { name: 'Website Pages', starter: 'Up to 5', growth: 'Up to 15', enterprise: 'Unlimited' },
  { name: 'Revisions', starter: '2 rounds', growth: 'Unlimited', enterprise: 'Unlimited' },
  { name: 'Support Duration', starter: '30 days', growth: '90 days', enterprise: '1 year' },
  { name: 'Mobile Responsive', starter: true, growth: true, enterprise: true },
  { name: 'Basic SEO Optimization', starter: true, growth: true, enterprise: true },
  { name: 'Advanced SEO Package', starter: false, growth: true, enterprise: true },
  { name: 'Content Management System', starter: false, growth: true, enterprise: true },
  { name: 'E-commerce Integration', starter: false, growth: true, enterprise: true },
  { name: 'Social Media Setup', starter: false, growth: true, enterprise: true },
  { name: 'Custom Web Application', starter: false, growth: false, enterprise: true },
  { name: 'Advanced Integrations', starter: false, growth: false, enterprise: true },
  { name: 'Dedicated Account Manager', starter: false, growth: false, enterprise: true },
  { name: 'Priority Support', starter: false, growth: false, enterprise: true },
  { name: 'Monthly Strategy Calls', starter: false, growth: false, enterprise: true },
  { name: 'Performance Optimization', starter: false, growth: false, enterprise: true },
  { name: 'Security Audit', starter: false, growth: false, enterprise: true },
]

const tiers = [
  { name: 'Starter', key: 'starter' as const, highlighted: false },
  { name: 'Growth', key: 'growth' as const, highlighted: true },
  { name: 'Enterprise', key: 'enterprise' as const, highlighted: false },
]

function FeatureCell({ value }: { value: boolean | string }) {
  if (typeof value === 'boolean') {
    return value ? (
      <Check className="h-5 w-5 text-green-400 mx-auto" />
    ) : (
      <X className="h-5 w-5 text-red-400/50 mx-auto" />
    )
  }
  return <span className="text-sm text-foreground">{value}</span>
}

export function ComparisonTable() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="relative py-24 sm:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={shouldReduceMotion ? undefined : { once: true }}
          transition={shouldReduceMotion ? undefined : { duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-base font-semibold text-cyan-400 mb-2">Comparison</h2>
          <p className="text-3xl font-bold sm:text-4xl">
            Compare <span className="text-gradient">Service Tiers</span>
          </p>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Find the perfect plan for your business needs. All plans include our premium support and satisfaction guarantee.
          </p>
        </motion.div>

        {/* Comparison table */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={shouldReduceMotion ? undefined : { once: true }}
          transition={shouldReduceMotion ? undefined : { duration: 0.5, delay: 0.1 }}
          className="relative"
        >
          {/* Desktop table */}
          <div className="hidden lg:block overflow-hidden rounded-2xl border border-white/10 bg-card/30 backdrop-blur-xl">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-6 text-sm font-semibold text-muted-foreground">
                    Features
                  </th>
                  {tiers.map((tier) => (
                    <th
                      key={tier.key}
                      className={cn(
                        'p-6 text-center',
                        tier.highlighted && 'bg-gradient-to-b from-blue-500/10 to-purple-500/10'
                      )}
                    >
                      <div className="text-lg font-bold text-foreground">{tier.name}</div>
                      {tier.highlighted && (
                        <div className="text-xs text-cyan-400 mt-1">Most Popular</div>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map((feature, index) => (
                  <tr
                    key={feature.name}
                    className={cn(
                      'border-b border-white/5',
                      index % 2 === 0 && 'bg-white/[0.02]'
                    )}
                  >
                    <td className="p-6 text-sm text-muted-foreground">
                      {feature.name}
                    </td>
                    {tiers.map((tier) => (
                      <td
                        key={tier.key}
                        className={cn(
                          'p-6 text-center',
                          tier.highlighted && 'bg-gradient-to-b from-blue-500/5 to-purple-500/5'
                        )}
                      >
                        <FeatureCell value={feature[tier.key]} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile view */}
          <div className="lg:hidden space-y-8">
            {tiers.map((tier, tierIndex) => (
              <motion.div
                key={tier.key}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={shouldReduceMotion ? undefined : { once: true }}
                transition={shouldReduceMotion ? undefined : { duration: 0.5, delay: tierIndex * 0.1 }}
                className={cn(
                  'rounded-2xl border border-white/10 bg-card/30 backdrop-blur-xl overflow-hidden',
                  tier.highlighted && 'border-blue-500/50 shadow-lg shadow-blue-500/10'
                )}
              >
                {/* Tier header */}
                <div className={cn(
                  'p-6 border-b border-white/10',
                  tier.highlighted && 'bg-gradient-to-b from-blue-500/10 to-purple-500/10'
                )}>
                  <div className="text-xl font-bold text-foreground">{tier.name}</div>
                  {tier.highlighted && (
                    <div className="text-sm text-cyan-400 mt-1">Most Popular</div>
                  )}
                </div>

                {/* Features list */}
                <div className="divide-y divide-white/5">
                  {features.map((feature) => (
                    <div key={feature.name} className="p-4 flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{feature.name}</span>
                      <FeatureCell value={feature[tier.key]} />
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
