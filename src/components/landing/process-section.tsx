'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { CreditCard, FileText, Rocket, BarChart3 } from 'lucide-react'

const steps = [
  {
    id: 1,
    name: 'Choose Your Service',
    description: 'Select from our service tiers or individual products that fit your business needs.',
    icon: CreditCard,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    id: 2,
    name: 'Complete Intake Form',
    description: 'After payment, fill out our detailed intake form so we understand your goals.',
    icon: FileText,
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    id: 3,
    name: 'We Get to Work',
    description: 'Our team starts executing your project with regular updates and milestones.',
    icon: Rocket,
    gradient: 'from-orange-500 to-red-500',
  },
  {
    id: 4,
    name: 'Track Progress',
    description: 'Monitor your project status in real-time through your personal dashboard.',
    icon: BarChart3,
    gradient: 'from-green-500 to-emerald-500',
  },
]

export function ProcessSection() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="process" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={shouldReduceMotion ? undefined : { once: true }}
          transition={shouldReduceMotion ? undefined : { duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-base font-semibold text-cyan-400">How It Works</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Simple <span className="text-gradient">4-Step Process</span>
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
            From selection to delivery, we&apos;ve streamlined every step to make your experience seamless.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="mx-auto mt-16 max-w-5xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={shouldReduceMotion ? undefined : { once: true }}
                transition={shouldReduceMotion ? undefined : { duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[60%] w-full h-px bg-gradient-to-r from-white/20 to-transparent" />
                )}

                <div className="relative flex flex-col items-center text-center">
                  {/* Icon */}
                  <div
                    className={`relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${step.gradient} shadow-lg`}
                  >
                    <step.icon className="h-8 w-8 text-white" />
                    {/* Step number */}
                    <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-background border border-white/10 text-xs font-bold">
                      {step.id}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="mt-6 text-lg font-semibold text-foreground">
                    {step.name}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
