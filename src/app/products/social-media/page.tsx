import { Metadata } from 'next'
import { Share2 } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { CategoryPageLayout } from '@/components/products/category-page-layout'
import { getProductsByCategory } from '@/lib/constants/products'

export const metadata: Metadata = {
  title: 'Social Media Management Services | Facebook, Instagram & More | SynergyX',
  description:
    'Professional social media management to grow your brand. Content creation, community management, and strategy across all platforms.',
}

export default function SocialMediaPage() {
  const products = getProductsByCategory('social_media')

  const categoryInfo = {
    name: 'Social Media Management',
    description: 'Build Your Brand & Engage Your Audience',
    longDescription:
      'Social media is where your customers spend their time. Our social media management services help you build a strong brand presence, engage your audience, and drive real business results across all major platforms.',
    benefits: [
      'Consistent, professional content that represents your brand',
      'Active community management and customer engagement',
      'Strategic content calendar aligned with your business goals',
      'Platform-specific optimization for maximum reach',
      'Professional graphics and video content creation',
      'Data-driven insights to continuously improve performance',
    ],
    icon: <Share2 className="w-16 h-16 text-blue-400" />,
  }

  const testimonials = [
    {
      name: 'Amanda Foster',
      role: 'Owner',
      company: 'Foster Interior Design',
      quote:
        'Our Instagram following grew from 800 to 12,000 in 6 months. We now get 3-4 client inquiries per week from social media.',
      rating: 5,
    },
    {
      name: 'Marcus Johnson',
      role: 'Operations Manager',
      company: 'Johnson Construction Group',
      quote:
        'SynergyX helped us build a professional presence on LinkedIn and Facebook. We\'ve hired 5 skilled contractors through our social channels.',
      rating: 5,
    },
    {
      name: 'Sophia Patel',
      role: 'Marketing Director',
      company: 'Patel Real Estate',
      quote:
        'The content quality is outstanding. Our engagement rate tripled, and we\'re now seen as the go-to real estate experts in our area.',
      rating: 5,
    },
  ]

  const faqs = [
    {
      question: 'Which social media platforms should I be on?',
      answer:
        'It depends on your audience. B2C businesses typically do well on Facebook and Instagram, while B2B companies benefit from LinkedIn. We\'ll recommend the right mix based on your goals and industry.',
    },
    {
      question: 'How often will you post on my behalf?',
      answer:
        'Our Basic package includes 12 posts per month (3 per week), while Premium includes 30 posts per month (daily posting). We\'ll create a content calendar for your approval before posting.',
    },
    {
      question: 'Do you create the graphics and videos?',
      answer:
        'Yes! Our team includes graphic designers and video editors. We create all visual content in-house, aligned with your brand guidelines. You can also provide your own content if preferred.',
    },
    {
      question: 'Will you respond to comments and messages?',
      answer:
        'Yes, community management is included in all packages. We monitor and respond to comments, messages, and reviews in a timely and professional manner.',
    },
    {
      question: 'Can I still post on my own accounts?',
      answer:
        'Absolutely! We collaborate with you and can work around your own posting schedule. Many clients like to share behind-the-scenes content while we handle the strategic marketing posts.',
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
