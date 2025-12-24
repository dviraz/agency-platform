import { Metadata } from 'next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ProductsGrid } from '@/components/landing/products-grid'
import { CTASection } from '@/components/landing/cta-section'
import { BackgroundBeams } from '@/components/aceternity/background-beams'

export const metadata: Metadata = {
  title: 'Our Products | SynergyX Agency',
  description: 'Browse our specialized marketing products including Google Ads, Facebook Ads, SEO services, and more.',
}

export default function ProductsPage() {
  return (
    <>
      <Header />
      <main className="relative">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          <BackgroundBeams className="opacity-20" />

          {/* Gradient orbs */}
          <div className="absolute top-20 -left-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-20 -right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px]" />

          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center py-24">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-gradient">Specialized Products</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              À la carte marketing solutions designed to target your specific needs. Choose individual products or combine them for maximum impact.
            </p>
          </div>
        </section>

        {/* Products Grid */}
        <ProductsGrid />

        {/* CTA Section */}
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
