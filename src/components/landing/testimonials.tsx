'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Testimonial {
  name: string
  role: string
  company: string
  avatar: string
  rating: number
  quote: string
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechCorp Inc.",
    avatar: "SJ",
    rating: 5,
    quote: "Agency transformed our digital presence completely. The team's expertise in SEO and paid advertising helped us increase our lead generation by 340% in just 6 months. Absolutely outstanding work!"
  },
  {
    name: "Michael Chen",
    role: "Founder & CEO",
    company: "BuildRight Construction",
    avatar: "MC",
    rating: 5,
    quote: "As a contractor, I was skeptical about digital marketing. Agency proved me wrong. Their local SEO service got us ranking #1 for 'contractors near me' and our phone hasn't stopped ringing since. Best investment we've made."
  },
  {
    name: "Emily Rodriguez",
    role: "Operations Manager",
    company: "ProBuild Solutions",
    avatar: "ER",
    rating: 5,
    quote: "The professionalism and results speak for themselves. From website redesign to Google Ads management, every service exceeded our expectations. Revenue is up 180% year over year. Highly recommend!"
  },
  {
    name: "David Thompson",
    role: "Marketing Lead",
    company: "DesignHub Agency",
    avatar: "DT",
    rating: 5,
    quote: "Working with Agency felt like having an extension of our own team. Their monthly reports are detailed, transparent, and actionable. The ROI on our Meta ads campaign has been incredible - 4.5x ROAS consistently."
  },
  {
    name: "Lisa Martinez",
    role: "Business Owner",
    company: "SmartBuild Contractors",
    avatar: "LM",
    rating: 5,
    quote: "After trying 3 other agencies, Agency was a breath of fresh air. They actually listen, understand our industry, and deliver results. Our website traffic is up 520% and we're booking jobs 2 months out. Thank you!"
  },
  {
    name: "James Wilson",
    role: "VP of Sales",
    company: "CloudSync Technologies",
    avatar: "JW",
    rating: 5,
    quote: "The best part about Agency is their data-driven approach. Every decision is backed by analytics and testing. Our cost per lead dropped by 60% while lead quality improved dramatically. Game changer for our business."
  }
]

export function Testimonials() {
  const shouldReduceMotion = useReducedMotion()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  // Auto-rotate testimonials every 5 seconds
  useEffect(() => {
    if (shouldReduceMotion) return

    const timer = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [shouldReduceMotion])

  const goToNext = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const goToPrevious = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
    }),
  }

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={shouldReduceMotion ? undefined : { once: true }}
          transition={shouldReduceMotion ? undefined : { duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-base font-semibold text-cyan-400 mb-2">Testimonials</h2>
          <p className="text-3xl font-bold sm:text-4xl">
            What Our <span className="text-gradient">Clients Say</span>
          </p>
        </motion.div>

        {/* Testimonial carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Navigation buttons */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 z-20 hidden lg:block">
            <button
              onClick={goToPrevious}
              className="p-3 rounded-full bg-card/50 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 group"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6 text-muted-foreground group-hover:text-foreground transition-colors" />
            </button>
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 z-20 hidden lg:block">
            <button
              onClick={goToNext}
              className="p-3 rounded-full bg-card/50 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 group"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6 text-muted-foreground group-hover:text-foreground transition-colors" />
            </button>
          </div>

          {/* Testimonial card */}
          <div className="relative min-h-[400px] flex items-center justify-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={shouldReduceMotion ? undefined : slideVariants}
                initial={shouldReduceMotion ? undefined : "enter"}
                animate="center"
                exit={shouldReduceMotion ? undefined : "exit"}
                transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                className="w-full"
              >
                <div className="relative">
                  {/* Card glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-2xl" />

                  {/* Card content */}
                  <div className="relative bg-card/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12">
                    {/* Quote icon */}
                    <div className="absolute -top-6 left-8">
                      <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg shadow-blue-500/20">
                        <Quote className="h-6 w-6 text-white" />
                      </div>
                    </div>

                    {/* Stars */}
                    <div className="flex gap-1 mb-6 justify-center">
                      {Array.from({ length: testimonials[currentIndex].rating }).map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote className="text-lg md:text-xl text-foreground text-center mb-8 leading-relaxed">
                      "{testimonials[currentIndex].quote}"
                    </blockquote>

                    {/* Author */}
                    <div className="flex items-center justify-center gap-4">
                      {/* Avatar */}
                      <div className="flex-shrink-0">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/20">
                          {testimonials[currentIndex].avatar}
                        </div>
                      </div>

                      {/* Info */}
                      <div className="text-left">
                        <div className="font-semibold text-foreground">
                          {testimonials[currentIndex].name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {testimonials[currentIndex].role}
                        </div>
                        <div className="text-sm text-cyan-400">
                          {testimonials[currentIndex].company}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1)
                  setCurrentIndex(index)
                }}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  index === currentIndex
                    ? "w-8 bg-gradient-to-r from-blue-500 to-purple-600"
                    : "w-2 bg-white/20 hover:bg-white/40"
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Mobile navigation */}
          <div className="flex justify-center gap-4 mt-6 lg:hidden">
            <button
              onClick={goToPrevious}
              className="p-3 rounded-full bg-card/50 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5 text-muted-foreground" />
            </button>
            <button
              onClick={goToNext}
              className="p-3 rounded-full bg-card/50 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
