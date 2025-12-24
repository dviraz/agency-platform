'use client'

import { cn } from '@/lib/utils'
import { useReducedMotion } from 'framer-motion'

export function BackgroundBeams({ className }: { className?: string }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div
      className={cn(
        'absolute inset-0 overflow-hidden',
        className
      )}
    >
      <svg
        className="absolute w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="beam-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)" />
            <stop offset="50%" stopColor="rgba(139, 92, 246, 0.2)" />
            <stop offset="100%" stopColor="rgba(34, 211, 238, 0.1)" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Animated beam lines */}
        <g filter="url(#glow)">
          <line
            x1="0"
            y1="0"
            x2="100%"
            y2="100%"
            stroke="url(#beam-gradient)"
            strokeWidth="1"
            className={shouldReduceMotion ? undefined : 'animate-beam'}
          />
          <line
            x1="100%"
            y1="0"
            x2="0"
            y2="100%"
            stroke="url(#beam-gradient)"
            strokeWidth="1"
            className={shouldReduceMotion ? undefined : 'animate-beam-reverse'}
          />
          <line
            x1="50%"
            y1="0"
            x2="50%"
            y2="100%"
            stroke="url(#beam-gradient)"
            strokeWidth="0.5"
            className={shouldReduceMotion ? undefined : 'animate-beam-slow'}
          />
        </g>
      </svg>

      {/* Radial gradients for glow effect */}
      <div
        className={cn(
          'absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl',
          shouldReduceMotion ? undefined : 'animate-pulse'
        )}
      />
      <div
        className={cn(
          'absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl',
          shouldReduceMotion ? undefined : 'animate-pulse'
        )}
        style={shouldReduceMotion ? undefined : { animationDelay: '1s' }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl" />

      <style jsx>{`
        @keyframes beam {
          0% { opacity: 0; stroke-dashoffset: 1000; }
          50% { opacity: 1; }
          100% { opacity: 0; stroke-dashoffset: 0; }
        }
        .animate-beam {
          stroke-dasharray: 1000;
          animation: beam 8s ease-in-out infinite;
        }
        .animate-beam-reverse {
          stroke-dasharray: 1000;
          animation: beam 8s ease-in-out infinite reverse;
          animation-delay: 2s;
        }
        .animate-beam-slow {
          stroke-dasharray: 500;
          animation: beam 12s ease-in-out infinite;
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}
