import { Metadata } from 'next'
import { Palette } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { CategoryPageLayout } from '@/components/products/category-page-layout'
import { getProductsByCategory } from '@/lib/constants/products'

export const metadata: Metadata = {
  title: 'Branding Services | Logo Design & Brand Identity | SynergyX',
  description:
    'Professional branding and logo design services. Create a memorable brand identity that stands out and resonates with your target audience.',
}

export default function BrandingPage() {
  const products = getProductsByCategory('branding')

  const categoryInfo = {
    name: 'Branding & Identity',
    description: 'Build a Memorable Brand That Stands Out',
    longDescription:
      'Your brand is more than just a logo—it\'s the complete experience customers have with your business. We create cohesive brand identities that tell your story, differentiate you from competitors, and build lasting connections with your audience.',
    benefits: [
      'Stand out from competitors with a unique visual identity',
      'Build trust and credibility through professional design',
      'Create consistency across all marketing materials',
      'Attract your ideal customers with strategic positioning',
      'Own all design files and intellectual property',
      'Flexible revision process to ensure perfect results',
    ],
    icon: <Palette className="w-16 h-16 text-blue-400" />,
  }

  const testimonials = [
    {
      name: 'Jennifer Lopez',
      role: 'Owner',
      company: 'Lopez Catering',
      quote:
        'The rebrand completely transformed how customers perceive our business. We look professional and modern, and bookings are up 50%.',
      rating: 5,
    },
    {
      name: 'Chris Taylor',
      role: 'Founder',
      company: 'Taylor Tech Consulting',
      quote:
        'From logo to business cards to website, everything is perfectly cohesive. The brand guidelines they created make it easy to stay on-brand.',
      rating: 5,
    },
    {
      name: 'Nina Rodriguez',
      role: 'CEO',
      company: 'Rodriguez Law Firm',
      quote:
        'They took the time to understand our values and target clients. The final brand identity perfectly represents who we are and attracts the right clientele.',
      rating: 5,
    },
  ]

  const faqs = [
    {
      question: 'What\'s included in a brand identity package?',
      answer:
        'Our Starter package includes logo design, color palette, typography, business cards, and basic brand guidelines. The Complete package adds brand strategy, additional marketing materials, social media templates, and comprehensive guidelines.',
    },
    {
      question: 'How many logo concepts will I receive?',
      answer:
        'The Starter package includes 3 initial logo concepts, while the Complete package includes 5. We refine your chosen concept through multiple revision rounds until it\'s perfect.',
    },
    {
      question: 'What file formats will I receive?',
      answer:
        'You\'ll receive your logo in all necessary formats: vector files (AI, EPS, SVG), high-resolution PNG and JPG, and various size variations. You own all rights to use the logo however you need.',
    },
    {
      question: 'Can you match my industry\'s style?',
      answer:
        'Absolutely. We research your industry and competitors to ensure your brand fits your market while standing out. We can create traditional, modern, playful, or any style that suits your goals.',
    },
    {
      question: 'What if I already have a logo but need a refresh?',
      answer:
        'We offer brand refresh services where we modernize your existing logo and identity while maintaining brand recognition. This is often more affordable than a complete rebrand.',
    },
  ]

  return (
    <>
      <Header />
      <main>
        <CategoryPageLayout
          category={categoryInfo}
          products={products}
          testimonials={testimonials}
          faqs={faqs}
        />
      </main>
      <Footer />
    </>
  )
}
