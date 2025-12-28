import Script from 'next/script'

interface FAQ {
  question: string
  answer: string
}

interface FAQSchemaProps {
  faqs: FAQ[]
}

/**
 * FAQ Schema for structured data
 * Helps search engines understand FAQ content
 */
export function FAQSchema({ faqs }: FAQSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <Script
      id="faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/**
 * Organization Schema for structured data
 * Helps search engines understand business information
 */
export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SynergyX',
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://synergyx.pro',
    logo: `${process.env.NEXT_PUBLIC_APP_URL || 'https://synergyx.pro'}/logo.png`,
    description: 'Premium web development and digital solutions agency',
    email: 'dvir@synergyx.pro',
    telephone: '+1-234-567-890',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Business St, Suite 100',
      addressLocality: 'San Francisco',
      addressRegion: 'CA',
      postalCode: '94105',
      addressCountry: 'US',
    },
    sameAs: [
      // Add social media URLs here when available
    ],
  }

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface ProductSchemaProps {
  name: string
  description: string
  price: number
  currency?: string
  image?: string
}

/**
 * Product Schema for structured data
 * Helps search engines understand product information
 */
export function ProductSchema({
  name,
  description,
  price,
  currency = 'USD',
  image,
}: ProductSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image: image || `${process.env.NEXT_PUBLIC_APP_URL || 'https://synergyx.pro'}/og-image.png`,
    offers: {
      '@type': 'Offer',
      price: price.toString(),
      priceCurrency: currency,
      availability: 'https://schema.org/InStock',
      url: process.env.NEXT_PUBLIC_APP_URL || 'https://synergyx.pro',
    },
  }

  return (
    <Script
      id="product-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface BreadcrumbItem {
  name: string
  url: string
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[]
}

/**
 * Breadcrumb Schema for structured data
 * Helps search engines understand site navigation
 */
export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
