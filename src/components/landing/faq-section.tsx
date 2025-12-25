'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FAQ {
  question: string
  answer: string
  category: 'pricing' | 'process' | 'support' | 'technical'
}

const faqs: FAQ[] = [
  {
    category: 'pricing',
    question: "What's included in each package?",
    answer: "Each package includes everything listed in its features section. Starter includes basic website design and SEO, Growth adds e-commerce and CMS capabilities, and Enterprise includes custom applications, dedicated support, and advanced integrations. All packages include our satisfaction guarantee and professional support."
  },
  {
    category: 'pricing',
    question: "Can I upgrade or downgrade my plan later?",
    answer: "Absolutely! You can upgrade to a higher tier at any time, and we'll credit your previous payment toward the new package. If you need to adjust your monthly subscription, you can do so at the end of your current billing cycle. Contact us anytime to discuss your options."
  },
  {
    category: 'pricing',
    question: "What's the difference between one-time and monthly pricing?",
    answer: "One-time pricing is a single payment for the complete project with ongoing support for the specified duration (30-365 days depending on tier). Monthly pricing spreads the cost over time and includes continuous support and updates. One-time payments save you up to 62% compared to 12 months of monthly payments."
  },
  {
    category: 'process',
    question: "How long does a typical project take?",
    answer: "Timeline varies by package: Starter projects typically take 2-3 weeks, Growth projects 4-6 weeks, and Enterprise projects 8-12 weeks. We provide a detailed timeline during the intake process and keep you updated throughout. Rush delivery is available for an additional fee."
  },
  {
    category: 'process',
    question: "What happens after I purchase?",
    answer: "After purchase, you'll immediately receive access to our intake form where you'll provide project details, brand assets, and preferences. Within 24 hours, you'll be assigned a dedicated project manager who will schedule a kickoff call. You'll have access to your client dashboard to track progress in real-time."
  },
  {
    category: 'support',
    question: "What kind of support do you provide?",
    answer: "All packages include email and chat support. Growth and Enterprise tiers include phone support and scheduled strategy calls. Support duration varies by package (30 days to 1 year). After the initial support period, you can purchase extended support or upgrade to a maintenance plan."
  },
  {
    category: 'support',
    question: "What's your refund policy?",
    answer: "We offer a 100% money-back guarantee within the first 14 days if you're not satisfied with our initial concepts and strategy. After project commencement, refunds are prorated based on work completed. Your satisfaction is our priority, and we'll work with you to make things right."
  },
  {
    category: 'technical',
    question: "Do I own the website and all assets?",
    answer: "Yes! Upon final payment, you receive full ownership of all deliverables including source code, design files, content, and assets. We provide all files in industry-standard formats. You're free to host anywhere and make modifications as needed."
  },
  {
    category: 'technical',
    question: "Will my website be mobile-friendly and SEO optimized?",
    answer: "Absolutely! All our websites are built mobile-first and fully responsive across all devices. Basic SEO optimization is included in all packages (meta tags, site structure, speed optimization). Growth and Enterprise tiers include advanced SEO with keyword research and content optimization."
  },
  {
    category: 'technical',
    question: "Can you help with ongoing maintenance and updates?",
    answer: "Yes! While each package includes initial support, we offer monthly maintenance plans starting at $199/month that include updates, backups, security monitoring, content changes, and priority support. We can discuss the best maintenance option for your needs during your project."
  },
]

const categories = [
  { id: 'all', name: 'All Questions' },
  { id: 'pricing', name: 'Pricing' },
  { id: 'process', name: 'Process' },
  { id: 'support', name: 'Support' },
  { id: 'technical', name: 'Technical' },
] as const

type CategoryId = typeof categories[number]['id']

export function FAQSection() {
  const shouldReduceMotion = useReducedMotion()
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all')
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const filteredFaqs = activeCategory === 'all'
    ? faqs
    : faqs.filter(faq => faq.category === activeCategory)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="relative py-24 sm:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent" />

      <div className="relative mx-auto max-w-4xl px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={shouldReduceMotion ? undefined : { once: true }}
          transition={shouldReduceMotion ? undefined : { duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-base font-semibold text-cyan-400 mb-2">FAQ</h2>
          <p className="text-3xl font-bold sm:text-4xl">
            Frequently Asked <span className="text-gradient">Questions</span>
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to know about our services and process.
          </p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={shouldReduceMotion ? undefined : { once: true }}
          transition={shouldReduceMotion ? undefined : { duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setActiveCategory(category.id)
                setOpenIndex(0) // Open first question of new category
              }}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/20'
                  : 'bg-card/50 backdrop-blur-xl border border-white/10 text-muted-foreground hover:text-foreground hover:border-white/20'
              )}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* FAQ items */}
        <div className="space-y-4">
          <AnimatePresence mode="wait">
            {filteredFaqs.map((faq, index) => (
              <motion.div
                key={`${activeCategory}-${index}`}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="relative group"
              >
                {/* Card glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Card content */}
                <div className="relative bg-card/30 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300">
                  {/* Question button */}
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full text-left p-6 flex items-start justify-between gap-4"
                  >
                    <span className="font-semibold text-foreground pr-4">
                      {faq.question}
                    </span>
                    <span className="flex-shrink-0 mt-1">
                      {openIndex === index ? (
                        <Minus className="h-5 w-5 text-cyan-400" />
                      ) : (
                        <Plus className="h-5 w-5 text-muted-foreground" />
                      )}
                    </span>
                  </button>

                  {/* Answer */}
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={shouldReduceMotion ? false : { height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="px-6 pb-6 text-muted-foreground">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Still have questions CTA */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={shouldReduceMotion ? undefined : { once: true }}
          transition={shouldReduceMotion ? undefined : { duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground">
            Still have questions?{' '}
            <a
              href="/contact"
              className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
            >
              Contact our team
            </a>
            {' '}and we'll be happy to help.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
