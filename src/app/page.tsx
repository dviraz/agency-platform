import dynamic from 'next/dynamic'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

const Hero = dynamic(() => import('@/components/landing/hero').then((mod) => mod.Hero))
const ClientsSection = dynamic(() =>
  import('@/components/landing/clients-section').then((mod) => mod.ClientsSection)
)
const ServiceTiers = dynamic(() =>
  import('@/components/landing/service-tiers').then((mod) => mod.ServiceTiers)
)
const ProductsGrid = dynamic(() =>
  import('@/components/landing/products-grid').then((mod) => mod.ProductsGrid)
)
const Testimonials = dynamic(() =>
  import('@/components/landing/testimonials').then((mod) => mod.Testimonials)
)
const TrustBadges = dynamic(() =>
  import('@/components/landing/trust-badges').then((mod) => mod.TrustBadges)
)
const ProcessSection = dynamic(() =>
  import('@/components/landing/process-section').then((mod) => mod.ProcessSection)
)
const FAQSection = dynamic(() =>
  import('@/components/landing/faq-section').then((mod) => mod.FAQSection)
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
        <ClientsSection />
        <ServiceTiers />
        <ProductsGrid />
        <Testimonials />
        <TrustBadges />
        <ProcessSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
