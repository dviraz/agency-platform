'use client'

import { motion, useReducedMotion } from 'framer-motion'

// Placeholder client logos (brand names as text for now - can be replaced with SVGs later)
const clients = [
  { name: 'TechCorp', color: 'text-blue-400' },
  { name: 'BuildRight', color: 'text-cyan-400' },
  { name: 'DesignHub', color: 'text-purple-400' },
  { name: 'MarketPro', color: 'text-green-400' },
  { name: 'CloudSync', color: 'text-pink-400' },
  { name: 'DataFlow', color: 'text-orange-400' },
  { name: 'CodeBase', color: 'text-indigo-400' },
  { name: 'SmartBuild', color: 'text-emerald-400' },
  { name: 'NextGen', color: 'text-violet-400' },
  { name: 'ProConstruct', color: 'text-amber-400' },
  { name: 'DigitalEdge', color: 'text-rose-400' },
  { name: 'BuildMaster', color: 'text-teal-400' },
]

export function ClientsSection() {
  const shouldReduceMotion = useReducedMotion()

  // Duplicate clients for seamless loop
  const duplicatedClients = [...clients, ...clients]

  return (
    <section className="relative py-16 sm:py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={shouldReduceMotion ? undefined : { once: true }}
          transition={shouldReduceMotion ? undefined : { duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-base font-semibold text-muted-foreground mb-4">
            Trusted by Industry Leaders
          </h2>
        </motion.div>

        {/* Infinite scrolling logos */}
        <div className="relative">
          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

          {/* Scrolling container */}
          <div className="flex overflow-hidden">
            <motion.div
              className="flex gap-12 items-center"
              animate={shouldReduceMotion ? {} : {
                x: [0, -1200], // Adjust based on number of logos
              }}
              transition={shouldReduceMotion ? {} : {
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
            >
              {duplicatedClients.map((client, index) => (
                <div
                  key={`${client.name}-${index}`}
                  className="flex-shrink-0 group"
                >
                  {/* Placeholder text logo */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative px-8 py-4 bg-card/30 backdrop-blur-sm border border-white/10 rounded-lg group-hover:border-white/20 transition-all duration-300">
                      <span className={`text-2xl font-bold ${client.color} group-hover:text-white transition-colors duration-300`}>
                        {client.name}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={shouldReduceMotion ? undefined : { once: true }}
          transition={shouldReduceMotion ? undefined : { duration: 0.5, delay: 0.2 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          <div className="p-4 bg-card/30 backdrop-blur-sm border border-white/10 rounded-lg">
            <div className="text-3xl font-bold text-gradient">200+</div>
            <div className="text-sm text-muted-foreground mt-1">Happy Clients</div>
          </div>
          <div className="p-4 bg-card/30 backdrop-blur-sm border border-white/10 rounded-lg">
            <div className="text-3xl font-bold text-gradient">500+</div>
            <div className="text-sm text-muted-foreground mt-1">Projects Delivered</div>
          </div>
          <div className="p-4 bg-card/30 backdrop-blur-sm border border-white/10 rounded-lg">
            <div className="text-3xl font-bold text-gradient">99%</div>
            <div className="text-sm text-muted-foreground mt-1">Satisfaction Rate</div>
          </div>
          <div className="p-4 bg-card/30 backdrop-blur-sm border border-white/10 rounded-lg">
            <div className="text-3xl font-bold text-gradient">24/7</div>
            <div className="text-sm text-muted-foreground mt-1">Support Available</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
