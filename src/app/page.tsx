import dynamic from 'next/dynamic'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

const Hero = dynamic(() => import('@/components/landing/hero').then((mod) => mod.Hero))
const ServiceTiers = dynamic(() =>
  import('@/components/landing/service-tiers').then((mod) => mod.ServiceTiers)
)
const ProductsGrid = dynamic(() =>
  import('@/components/landing/products-grid').then((mod) => mod.ProductsGrid)
)
const ProcessSection = dynamic(() =>
  import('@/components/landing/process-section').then((mod) => mod.ProcessSection)
)
const CTASection = dynamic(() =>
  import('@/components/landing/cta-section').then((mod) => mod.CTASection)
)

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
