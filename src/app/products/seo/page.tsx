import { Metadata } from 'next'
import { Search } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { CategoryPageLayout } from '@/components/products/category-page-layout'
import { getProductsByCategory } from '@/lib/constants/products'

export const metadata: Metadata = {
  title: 'SEO Services | Local & National SEO Packages | SynergyX',
  description:
    'Professional SEO services to improve your search engine rankings. Local and national SEO packages designed to drive organic traffic and leads.',
}

export default function SEOPage() {
  const products = getProductsByCategory('seo')

  const categoryInfo = {
    name: 'SEO Services',
    description: 'Dominate Search Results & Drive Organic Traffic',
    longDescription:
      'Search Engine Optimization (SEO) is the foundation of sustainable online growth. Our proven strategies help you rank higher on Google, attract more qualified traffic, and convert visitors into customers—without paying for ads.',
    benefits: [
      'Rank higher on Google for keywords that matter to your business',
      'Drive consistent organic traffic month after month',
      'Build long-term authority and trust in your industry',
      'Lower customer acquisition costs compared to paid advertising',
      'Comprehensive technical, on-page, and off-page optimization',
      'Transparent monthly reporting with measurable KPIs',
    ],
    icon: <Search className="w-16 h-16 text-blue-400" />,
  }

  const testimonials = [
    {
      name: 'David Thompson',
      role: 'Owner',
      company: 'Thompson HVAC Services',
      quote:
        'We went from page 3 to the top 3 results for "HVAC repair [city]" in just 4 months. Phone calls tripled.',
      rating: 5,
    },
    {
      name: 'Lisa Martinez',
      role: 'Marketing Manager',
      company: 'Premier Landscaping',
      quote:
        'The local SEO package transformed our business. We now dominate the map pack and get 15-20 calls per week from Google.',
      rating: 5,
    },
    {
      name: 'Robert Kim',
      role: 'Founder',
      company: 'Urban Builders LLC',
      quote:
        'National SEO was a game-changer. We\'re now ranking nationwide and getting project inquiries from across the country.',
      rating: 5,
    },
  ]

  const faqs = [
    {
      question: 'How long does SEO take to show results?',
      answer:
        'SEO is a long-term strategy. Most clients see initial improvements in 3-4 months, with significant results by 6-12 months. Unlike ads, SEO builds compound value over time.',
    },
    {
      question: 'What\'s the difference between local and national SEO?',
      answer:
        'Local SEO focuses on ranking in your geographic area (e.g., "plumber in Chicago"), while national SEO targets broader keywords across the country. Local SEO is faster and more affordable for service-based businesses.',
    },
    {
      question: 'Do you guarantee first page rankings?',
      answer:
        'No ethical SEO agency can guarantee specific rankings, as Google\'s algorithm is constantly evolving. However, we have a proven track record of achieving top rankings for our clients through white-hat strategies.',
    },
    {
      question: 'What\'s included in technical SEO?',
      answer:
        'Technical SEO includes site speed optimization, mobile responsiveness, XML sitemaps, robots.txt configuration, schema markup, fixing crawl errors, and ensuring your site follows Google\'s best practices.',
    },
    {
      question: 'Will I need to create new content?',
      answer:
        'Content is a critical part of SEO. We\'ll optimize your existing pages and recommend new content opportunities. We can handle content creation as an add-on, or you can create it in-house with our guidance.',
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
