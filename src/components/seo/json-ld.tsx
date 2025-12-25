/**
 * JSON-LD Structured Data Components
 * Provides Organization, Service, and LocalBusiness schemas for SEO
 */

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

interface OrganizationSchemaProps {
  name?: string
  url?: string
  logo?: string
  email?: string
  phone?: string
  address?: {
    streetAddress: string
    addressLocality: string
    addressRegion: string
    postalCode: string
    addressCountry: string
  }
}

export function OrganizationSchema({
  name = 'Agency',
  url = siteUrl,
  logo = `${siteUrl}/logo.png`,
  email = 'dvir@synergyx.pro',
  phone,
  address,
}: OrganizationSchemaProps = {}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    logo,
    email,
    ...(phone && { telephone: phone }),
    ...(address && { address: { '@type': 'PostalAddress', ...address } }),
    sameAs: [
      'https://twitter.com',
      'https://linkedin.com',
      'https://instagram.com',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface ServiceSchemaProps {
  name: string
  description: string
  provider?: string
  areaServed?: string
  serviceType?: string
}

export function ServiceSchema({
  name,
  description,
  provider = 'Agency',
  areaServed = 'Worldwide',
  serviceType,
}: ServiceSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: {
      '@type': 'Organization',
      name: provider,
      url: siteUrl,
    },
    areaServed,
    ...(serviceType && { serviceType }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface LocalBusinessSchemaProps {
  name?: string
  description?: string
  url?: string
  telephone?: string
  email?: string
  address?: {
    streetAddress: string
    addressLocality: string
    addressRegion: string
    postalCode: string
    addressCountry: string
  }
  geo?: {
    latitude: number
    longitude: number
  }
  openingHours?: string[]
  priceRange?: string
}

export function LocalBusinessSchema({
  name = 'Agency',
  description = 'Premium digital marketing services including web development, Google Ads, social media marketing, SEO, and branding solutions.',
  url = siteUrl,
  telephone,
  email = 'dvir@synergyx.pro',
  address,
  geo,
  openingHours = ['Mo-Fr 09:00-17:00'],
  priceRange = '$$',
}: LocalBusinessSchemaProps = {}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name,
    description,
    url,
    email,
    ...(telephone && { telephone }),
    ...(address && { address: { '@type': 'PostalAddress', ...address } }),
    ...(geo && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: geo.latitude,
        longitude: geo.longitude,
      },
    }),
    openingHoursSpecification: openingHours.map((hours) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: hours.split(' ')[0],
      opens: hours.split(' ')[1]?.split('-')[0],
      closes: hours.split(' ')[1]?.split('-')[1],
    })),
    priceRange,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface WebPageSchemaProps {
  name: string
  description: string
  url?: string
}

export function WebPageSchema({
  name,
  description,
  url = siteUrl,
}: WebPageSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url,
  }

  return (
    <script
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

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.url}`,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
