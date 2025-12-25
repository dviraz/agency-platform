import { Metadata } from 'next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { BackgroundBeams } from '@/components/aceternity/background-beams'
import { ProcessSection } from '@/components/landing/process-section'
import { CTASection } from '@/components/landing/cta-section'
import { AnimatedStats } from '@/components/landing/animated-stats'
import { FAQSection } from '@/components/landing/faq-section'
import { CheckCircle, Rocket, Users, Award } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us | SynergyX Agency',
  description: 'Learn about our mission, values, and the team behind SynergyX Agency. We help businesses grow through innovative digital solutions.',
}

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="relative">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          <BackgroundBeams className="opacity-20" />

          {/* Gradient orbs */}
          <div className="absolute top-20 -left-20 w-96 h-96 bg-green-500/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-20 -right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px]" />

          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center py-24">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-gradient">About SynergyX</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We&apos;re a team of digital experts passionate about transforming businesses through innovative marketing strategies and cutting-edge technology.
            </p>
          </div>
        </section>

        {/* Mission & Values */}
        <section className="relative py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center mb-16">
              <h2 className="text-3xl font-bold sm:text-4xl">
                Our Mission
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                To empower businesses of all sizes with world-class digital marketing and development solutions that drive real, measurable results.
              </p>
            </div>

            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative bg-card/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/20 mb-4">
                    <Rocket className="h-6 w-6 text-blue-500" />
                  </div>
                  <h3 className="font-semibold mb-2">Innovation</h3>
                  <p className="text-sm text-muted-foreground">
                    Staying ahead with cutting-edge solutions
                  </p>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative bg-card/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-500/20 mb-4">
                    <CheckCircle className="h-6 w-6 text-purple-500" />
                  </div>
                  <h3 className="font-semibold mb-2">Quality</h3>
                  <p className="text-sm text-muted-foreground">
                    Excellence in every project we deliver
                  </p>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative bg-card/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cyan-500/20 mb-4">
                    <Users className="h-6 w-6 text-cyan-500" />
                  </div>
                  <h3 className="font-semibold mb-2">Partnership</h3>
                  <p className="text-sm text-muted-foreground">
                    Your success is our success
                  </p>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative bg-card/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-500/20 mb-4">
                    <Award className="h-6 w-6 text-green-500" />
                  </div>
                  <h3 className="font-semibold mb-2">Results</h3>
                  <p className="text-sm text-muted-foreground">
                    Data-driven strategies that work
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <ProcessSection />

        {/* Stats Section with Animations */}
        <AnimatedStats />

        {/* FAQ Section */}
        <FAQSection />

        {/* CTA Section */}
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
