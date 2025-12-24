'use client'

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

export function MovingBorder({
  children,
  duration = 2000,
  className,
  containerClassName,
  borderClassName,
  as: Component = 'button',
  ...otherProps
}: {
  children: React.ReactNode
  duration?: number
  className?: string
  containerClassName?: string
  borderClassName?: string
  as?: React.ElementType
  [key: string]: unknown
}) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <Component
      className={cn(
        'relative bg-transparent p-[1px] overflow-hidden',
        containerClassName
      )}
      {...otherProps}
    >
      <div
        className="absolute inset-0"
        style={{ borderRadius: 'inherit' }}
      >
        {shouldReduceMotion ? (
          <div
            style={{
              position: 'absolute',
              inset: '-200%',
              background:
                'conic-gradient(from 0deg, transparent, #3b82f6, #8b5cf6, #22d3ee, transparent)',
            }}
            className={cn(borderClassName)}
          />
        ) : (
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{
              duration: duration / 1000,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              position: 'absolute',
              inset: '-200%',
              background:
                'conic-gradient(from 0deg, transparent, #3b82f6, #8b5cf6, #22d3ee, transparent)',
            }}
            className={cn(borderClassName)}
          />
        )}
      </div>

      <div
        className={cn(
          'relative bg-background backdrop-blur-xl',
          className
        )}
        style={{ borderRadius: 'inherit' }}
      >
        {children}
      </div>
    </Component>
  )
}

// Button variant with moving border
export function MovingBorderButton({
  children,
  className,
  ...props
}: {
  children: React.ReactNode
  className?: string
  [key: string]: unknown
}) {
  return (
    <MovingBorder
      containerClassName="rounded-lg"
      className={cn(
        'px-6 py-3 font-medium text-white',
        className
      )}
      {...props}
    >
      {children}
    </MovingBorder>
  )
}
