import { Metadata } from 'next'
import { Code2 } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { CategoryPageLayout } from '@/components/products/category-page-layout'
import { getProductsByCategory } from '@/lib/constants/products'

export const metadata: Metadata = {
  title: 'Web Development Services | Custom Websites & Web Apps | SynergyX',
  description:
    'Professional web development services. Custom websites, e-commerce, and web applications built with modern technology.',
}

export default function WebDevelopmentPage() {
  const products = getProductsByCategory('web_development')

  const categoryInfo = {
    name: 'Web Development',
    description: 'Custom Websites & Applications That Drive Results',
    longDescription:
      'Your website is your digital storefront. We build fast, beautiful, and conversion-optimized websites and web applications using cutting-edge technology. From simple landing pages to complex web applications, we deliver solutions that grow with your business.',
    benefits: [
      'Mobile-first, responsive design that works on all devices',
      'Lightning-fast loading speeds for better SEO and conversions',
      'Secure, scalable architecture built for growth',
      'SEO-optimized structure and clean, semantic code',
      'Easy-to-use content management systems',
      'Ongoing support and maintenance available',
    ],
    icon: <Code2 className="w-16 h-16 text-blue-400" />,
  }

  const testimonials = [
    {
      name: 'Kevin Walsh',
      role: 'Owner',
      company: 'Walsh Electrical Services',
      quote:
        'Our new website looks incredible and loads instantly. We\'ve seen a 200% increase in contact form submissions.',
      rating: 5,
    },
    {
      name: 'Rachel Green',
      role: 'CEO',
      company: 'Green Home Solutions',
      quote:
        'The web app they built streamlined our entire quote process. What used to take 2 hours now takes 15 minutes. Incredible ROI.',
      rating: 5,
    },
    {
      name: 'Tom Anderson',
      role: 'Director',
      company: 'Anderson Roofing',
      quote:
        'Professional, responsive, and delivered on time. The CMS is so easy to use that I can update content myself without calling them.',
      rating: 5,
    },
  ]

  const faqs = [
    {
      question: 'What technology do you use to build websites?',
      answer:
        'We use modern frameworks like Next.js, React, and TypeScript for front-end development, with headless CMS options like Sanity or Contentful. For simpler sites, we use WordPress. We choose the best tool for your specific needs.',
    },
    {
      question: 'Will I be able to update my website myself?',
      answer:
        'Yes! All websites come with an easy-to-use content management system (CMS). We provide training and documentation so you can make updates without technical knowledge.',
    },
    {
      question: 'How long does it take to build a website?',
      answer:
        'A typical custom website takes 6-12 weeks from start to launch, including design, development, revisions, and testing. Web applications can take 3-6 months depending on complexity.',
    },
    {
      question: 'Do you provide hosting and maintenance?',
      answer:
        'Yes, we offer hosting and maintenance packages. Alternatively, we can build on your existing hosting or help you set up your own infrastructure.',
    },
    {
      question: 'Will my website be mobile-friendly?',
      answer:
        'Absolutely. All websites are built mobile-first and tested across all devices and browsers. With 60%+ of traffic coming from mobile, it\'s essential.',
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
