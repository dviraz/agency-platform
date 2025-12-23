import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Hero } from '@/components/landing/hero'
import { ServiceTiers } from '@/components/landing/service-tiers'
import { ProductsGrid } from '@/components/landing/products-grid'
import { ProcessSection } from '@/components/landing/process-section'
import { CTASection } from '@/components/landing/cta-section'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ServiceTiers />
        <ProductsGrid />
        <ProcessSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
