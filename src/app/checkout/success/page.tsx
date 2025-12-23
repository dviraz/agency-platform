'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BackgroundBeams } from '@/components/aceternity/background-beams'

function SuccessContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <BackgroundBeams className="opacity-30" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-green-500/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-cyan-500/20 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-lg mx-auto px-6 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="mb-8"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 mb-6">
            <CheckCircle className="h-10 w-10 text-green-500" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
          <p className="text-muted-foreground mb-8">
            Thank you for your purchase. We've sent a confirmation email with your order details.
          </p>

          {orderId && (
            <div className="bg-card/50 backdrop-blur-xl border border-white/10 rounded-xl p-6 mb-8">
              <p className="text-sm text-muted-foreground mb-2">Order ID</p>
              <p className="font-mono text-sm">{orderId}</p>
            </div>
          )}

          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-6 mb-8 border border-white/10">
            <FileText className="h-8 w-8 text-cyan-400 mx-auto mb-4" />
            <h2 className="font-semibold mb-2">Next Step: Complete Your Intake Form</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Please fill out the intake form so we can learn more about your project and get started right away.
            </p>
            <Button
              asChild
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              <Link href={orderId ? `/intake/${orderId}` : '/dashboard'}>
                Complete Intake Form
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <Button variant="outline" asChild>
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
}
