'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Shield, Award, Headphones, Lock, Star, Users } from 'lucide-react'

const badges = [
  {
    icon: Star,
    title: '5-Star Rated',
    description: 'Average rating from 200+ clients',
    color: 'from-yellow-500/20 to-orange-500/20',
    iconColor: 'text-yellow-400',
  },
  {
    icon: Shield,
    title: 'Money-Back Guarantee',
    description: '100% satisfaction or full refund',
    color: 'from-green-500/20 to-emerald-500/20',
    iconColor: 'text-green-400',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Always here when you need us',
    color: 'from-blue-500/20 to-cyan-500/20',
    iconColor: 'text-blue-400',
  },
  {
    icon: Lock,
    title: 'Secure Payments',
    description: 'Bank-level encryption & PCI compliant',
    color: 'from-purple-500/20 to-pink-500/20',
    iconColor: 'text-purple-400',
  },
  {
    icon: Award,
    title: 'Award-Winning Team',
    description: 'Industry-recognized expertise',
    color: 'from-orange-500/20 to-red-500/20',
    iconColor: 'text-orange-400',
  },
  {
    icon: Users,
    title: '99% Client Satisfaction',
    description: 'Proven track record of success',
    color: 'from-cyan-500/20 to-teal-500/20',
    iconColor: 'text-cyan-400',
  },
]

export function TrustBadges() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="relative py-16 sm:py-24">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={shouldReduceMotion ? undefined : { once: true }}
          transition={shouldReduceMotion ? undefined : { duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl font-bold sm:text-3xl">
            Why Choose <span className="text-gradient">Agency</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Your success is our commitment. Here's what sets us apart.
          </p>
        </motion.div>

        {/* Badges grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {badges.map((badge, index) => {
            const Icon = badge.icon
            return (
              <motion.div
                key={badge.title}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={shouldReduceMotion ? undefined : { once: true, margin: '-50px' }}
                transition={shouldReduceMotion ? undefined : { duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                {/* Card glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${badge.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                {/* Card content */}
                <div className="relative h-full bg-card/30 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${badge.color} mb-4`}>
                    <Icon className={`h-6 w-6 ${badge.iconColor}`} />
                  </div>

                  {/* Text */}
                  <h3 className="font-semibold text-foreground mb-2">
                    {badge.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {badge.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
