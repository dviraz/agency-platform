'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useInView } from 'framer-motion'
import CountUp from 'react-countup'

interface Stat {
  value: number
  suffix?: string
  label: string
  prefix?: string
}

const stats: Stat[] = [
  {
    value: 500,
    suffix: '+',
    label: 'Projects Completed',
  },
  {
    value: 200,
    suffix: '+',
    label: 'Happy Clients',
  },
  {
    value: 50,
    suffix: '+',
    label: 'Team Members',
  },
  {
    value: 99,
    suffix: '%',
    label: 'Client Satisfaction',
  },
]

export function AnimatedStats() {
  const shouldReduceMotion = useReducedMotion()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="relative py-24 sm:py-32 bg-gradient-to-b from-background to-background/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={shouldReduceMotion ? undefined : { once: true }}
          transition={shouldReduceMotion ? undefined : { duration: 0.5 }}
          className="mx-auto max-w-2xl lg:text-center mb-16"
        >
          <h2 className="text-3xl font-bold sm:text-4xl">
            Trusted by Businesses Worldwide
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.5 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
              viewport={shouldReduceMotion ? undefined : { once: true }}
              transition={shouldReduceMotion ? undefined : {
                duration: 0.5,
                delay: index * 0.1,
                type: 'spring',
                bounce: 0.4
              }}
              className="text-center group"
            >
              {/* Animated background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative">
                <div className="text-4xl font-bold text-gradient mb-2">
                  {isInView || shouldReduceMotion ? (
                    <CountUp
                      end={stat.value}
                      duration={2.5}
                      suffix={stat.suffix || ''}
                      prefix={stat.prefix || ''}
                      enableScrollSpy={false}
                      scrollSpyOnce
                    />
                  ) : (
                    <span>{stat.prefix}{stat.value}{stat.suffix}</span>
                  )}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
