import { Metadata } from 'next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ServiceTiers } from '@/components/landing/service-tiers'
import { ComparisonTable } from '@/components/landing/comparison-table'
import { Testimonials } from '@/components/landing/testimonials'
import { TrustBadges } from '@/components/landing/trust-badges'
import { ProcessSection } from '@/components/landing/process-section'
import { FAQSection } from '@/components/landing/faq-section'
import { CTASection } from '@/components/landing/cta-section'
import { BackgroundBeams } from '@/components/aceternity/background-beams'

export const metadata: Metadata = {
  title: 'Our Services | Agency',
  description: 'Explore our comprehensive digital marketing and web development services. From starter packages to enterprise solutions.',
}

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className="relative">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          <BackgroundBeams className="opacity-20" />

          {/* Gradient orbs */}
          <div className="absolute top-20 -left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-20 -right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px]" />

          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center py-24">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-gradient">Our Services</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tailored solutions to elevate your brand and drive growth. From startups to enterprises, we have the perfect package for you.
            </p>
          </div>
        </section>

        {/* Service Tiers */}
        <ServiceTiers />

        {/* Comparison Table */}
        <ComparisonTable />

        {/* Testimonials */}
        <Testimonials />

        {/* Trust Badges */}
        <TrustBadges />

        {/* Process Section */}
        <ProcessSection />

        {/* FAQ Section */}
        <FAQSection />

        {/* CTA Section */}
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
