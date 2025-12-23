'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Mail, Phone, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MovingBorder } from '@/components/aceternity/moving-border'

export function CTASection() {
  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
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
                  Let's discuss how we can help you achieve your marketing goals. Get in touch with our team today.
                </p>

                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    size="lg"
                    asChild
                    className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 rounded-xl"
                  >
                    <Link href="#services">
                      Get Started Now
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    asChild
                    className="w-full sm:w-auto px-8 rounded-xl border-white/10 hover:bg-white/5"
                  >
                    <Link href="mailto:hello@agency.com">Schedule a Call</Link>
                  </Button>
                </div>

                {/* Contact info */}
                <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-muted-foreground">
                  <a
                    href="mailto:hello@agency.com"
                    className="flex items-center gap-2 hover:text-foreground transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    hello@agency.com
                  </a>
                  <a
                    href="tel:+1234567890"
                    className="flex items-center gap-2 hover:text-foreground transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                    +1 (234) 567-890
                  </a>
                  <span className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    San Francisco, CA
                  </span>
                </div>
              </div>
            </MovingBorder>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
