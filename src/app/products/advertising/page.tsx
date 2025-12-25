import { Metadata } from 'next'
import { Megaphone } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { CategoryPageLayout } from '@/components/products/category-page-layout'
import { getProductsByCategory } from '@/lib/constants/products'

export const metadata: Metadata = {
  title: 'Advertising Services | Google Ads & Social Media Ads | SynergyX',
  description:
    'Professional Google Ads and social media advertising services. Drive targeted traffic and conversions with expert campaign management.',
}

export default function AdvertisingPage() {
  const products = getProductsByCategory('advertising')

  const categoryInfo = {
    name: 'Advertising',
    description: 'Drive Targeted Traffic & Maximize ROI',
    longDescription:
      'Our advertising services help you reach the right customers at the right time. From Google Ads to social media advertising, we create and manage campaigns that deliver measurable results and positive ROI.',
    benefits: [
      'Reach customers actively searching for your services',
      'Precise targeting based on demographics, interests, and behavior',
      'Transparent reporting with real-time performance metrics',
      'Continuous optimization to lower costs and improve results',
      'Expert campaign management by certified professionals',
      'Scale campaigns as your business grows',
    ],
    icon: <Megaphone className="w-16 h-16 text-blue-400" />,
  }

  const testimonials = [
    {
      name: 'Sarah Mitchell',
      role: 'Marketing Director',
      company: 'BuildPro Construction',
      quote:
        'Our Google Ads campaign generated 127 qualified leads in the first 60 days. The ROI has been incredible.',
      rating: 5,
    },
    {
      name: 'James Rodriguez',
      role: 'Owner',
      company: 'Rodriguez Plumbing',
      quote:
        'Facebook Ads brought us customers we never would have reached otherwise. Our booking calendar is now full 3 weeks out.',
      rating: 5,
    },
    {
      name: 'Emily Chen',
      role: 'CEO',
      company: 'Elite Renovations',
      quote:
        'The team at SynergyX knows how to target contractors and homeowners. Our cost per lead dropped by 40% in 3 months.',
      rating: 5,
    },
  ]

  const faqs = [
    {
      question: 'What\'s the difference between Google Ads and Meta Ads?',
      answer:
        'Google Ads targets people actively searching for your services (high intent), while Meta Ads (Facebook/Instagram) targets based on demographics, interests, and behavior. We recommend both for maximum reach.',
    },
    {
      question: 'How much should I budget for ad spend?',
      answer:
        'We recommend starting with at least $1,000-2,000/month in ad spend for local campaigns, and $3,000-5,000/month for regional or national campaigns. Our management fee is separate from the ad spend.',
    },
    {
      question: 'How long before I see results?',
      answer:
        'Most clients see initial results within 2-4 weeks. However, optimal performance typically requires 60-90 days of testing and optimization as we refine targeting and ad creative.',
    },
    {
      question: 'Do I own the ad accounts?',
      answer:
        'Yes! We set up campaigns in your own Google Ads and Meta Business accounts. You maintain full ownership and access at all times.',
    },
    {
      question: 'What kind of reporting do you provide?',
      answer:
        'You\'ll receive detailed weekly or monthly reports showing impressions, clicks, conversions, cost per lead, and ROI. We also provide real-time dashboard access.',
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
