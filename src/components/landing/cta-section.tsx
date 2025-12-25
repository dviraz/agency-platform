'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Mail, Phone, MapPin } from 'lucide-react'
import { useState, MouseEvent } from 'react'
import { Button } from '@/components/ui/button'
import { MovingBorder } from '@/components/aceternity/moving-border'

export function CTASection() {
  const shouldReduceMotion = useReducedMotion()
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([])

  const createRipple = (e: MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget
    const rect = button.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const newRipple = { x, y, id: Date.now() }
    setRipples((prev) => [...prev, newRipple])

    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id))
    }, 600)
  }

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={shouldReduceMotion ? undefined : { once: true }}
            transition={shouldReduceMotion ? undefined : { duration: 0.5 }}
          >
            <MovingBorder
              containerClassName="rounded-3xl"
              className="p-8 sm:p-12 lg:p-16"
              duration={4000}
            >
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Ready to <span className="text-gradient">Transform</span> Your Business?
                </h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                  Let&apos;s discuss how we can help you achieve your marketing goals. Get in touch with our team today.
                </p>

                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={createRipple}
                    className="relative overflow-hidden w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    {ripples.map((ripple) => (
                      <motion.span
                        key={ripple.id}
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{ scale: 4, opacity: 0 }}
                        transition={{ duration: 0.6 }}
                        style={{
                          position: 'absolute',
                          left: ripple.x,
                          top: ripple.y,
                          width: 20,
                          height: 20,
                          borderRadius: '50%',
                          backgroundColor: 'rgba(255, 255, 255, 0.6)',
                          transform: 'translate(-50%, -50%)',
                        }}
                      />
                    ))}
                    <Link href="#services" className="relative z-10 flex items-center justify-center gap-2">
                      Get Started Now
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </motion.button>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size="lg"
                      variant="outline"
                      asChild
                      className="w-full sm:w-auto px-8 rounded-xl border-white/10 hover:bg-white/5"
                    >
                      <Link href="mailto:dvir@synergyx.pro">Schedule a Call</Link>
                    </Button>
                  </motion.div>
                </div>

                {/* Contact info */}
                <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-muted-foreground">
                  <motion.a
                    href="mailto:dvir@synergyx.pro"
                    className="flex items-center gap-2 hover:text-foreground transition-colors"
                    whileHover={{ scale: 1.1, color: 'rgb(var(--foreground))' }}
                  >
                    <Mail className="h-4 w-4" />
                    dvir@synergyx.pro
                  </motion.a>
                  <motion.a
                    href="tel:+1234567890"
                    className="flex items-center gap-2 hover:text-foreground transition-colors"
                    whileHover={{ scale: 1.1, color: 'rgb(var(--foreground))' }}
                  >
                    <Phone className="h-4 w-4" />
                    +1 (234) 567-890
                  </motion.a>
                  <motion.span
                    className="flex items-center gap-2"
                    whileHover={{ scale: 1.1 }}
                  >
                    <MapPin className="h-4 w-4" />
                    San Francisco, CA
                  </motion.span>
                </div>
              </div>
            </MovingBorder>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
