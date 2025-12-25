'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function GradientMesh() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated gradient orbs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
        style={{
          left: `${20 + mousePosition.x * 10}%`,
          top: `${10 + mousePosition.y * 10}%`,
        }}
        className="absolute w-[500px] h-[500px] bg-gradient-to-br from-blue-500/30 via-cyan-500/20 to-transparent rounded-full blur-[120px]"
      />

      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
        style={{
          right: `${15 + mousePosition.x * 10}%`,
          top: `${30 + mousePosition.y * 10}%`,
        }}
        className="absolute w-[600px] h-[600px] bg-gradient-to-br from-purple-500/30 via-pink-500/20 to-transparent rounded-full blur-[120px]"
      />

      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, -50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
        style={{
          left: `${50 + mousePosition.x * 5}%`,
          bottom: `${20 + mousePosition.y * 5}%`,
        }}
        className="absolute w-[400px] h-[400px] bg-gradient-to-br from-indigo-500/20 via-blue-500/15 to-transparent rounded-full blur-[100px]"
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />
    </div>
  )
}
