export type ProductCategory =
  | 'service_tier'
  | 'advertising'
  | 'seo'
  | 'social_media'
  | 'web_development'
  | 'branding'

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  category: ProductCategory
  price: number
  features: string[]
}

export const PRODUCTS: Product[] = [
  // Google Ads
  {
    id: 'google-ads-starter',
    name: 'Google Ads - Starter Campaign',
    slug: 'google-ads-starter',
    category: 'advertising',
    price: 1500,
    description: 'Launch your first Google Ads campaign with professional setup and optimization',
    features: [
      'Campaign strategy & setup',
      'Keyword research (up to 50 keywords)',
      'Ad copywriting (5 ad variations)',
      '30 days management',
      'Weekly performance reports',
    ],
  },
  {
    id: 'google-ads-pro',
    name: 'Google Ads - Professional Campaign',
    slug: 'google-ads-pro',
    category: 'advertising',
    price: 3500,
    description: 'Comprehensive Google Ads management for serious growth',
    features: [
      'Multi-campaign setup',
      'Advanced keyword research (200+ keywords)',
      'A/B testing & optimization',
      '90 days management',
      'Daily monitoring',
      'Conversion tracking setup',
      'Landing page recommendations',
    ],
  },
  // Meta Ads
  {
    id: 'meta-ads-starter',
    name: 'Facebook & Instagram Ads - Starter',
    slug: 'meta-ads-starter',
    category: 'advertising',
    price: 1200,
    description: 'Get started with social media advertising on Meta platforms',
    features: [
      'Audience research & targeting',
      'Ad creative design (3 variations)',
      'Campaign setup & launch',
      '30 days management',
      'Bi-weekly reports',
    ],
  },
  {
    id: 'meta-ads-pro',
    name: 'Facebook & Instagram Ads - Professional',
    slug: 'meta-ads-pro',
    category: 'advertising',
    price: 3000,
    description: 'Advanced Meta advertising with retargeting and optimization',
    features: [
      'Everything in Starter',
      'Retargeting campaigns',
      '10+ ad creative variations',
      'Pixel setup & custom events',
      '90 days management',
      'A/B testing',
      'Lookalike audiences',
    ],
  },
  // SEO
  {
    id: 'seo-local',
    name: 'Local SEO Package',
    slug: 'seo-local',
    category: 'seo',
    price: 2000,
    description: 'Dominate local search results in your area',
    features: [
      'Google Business Profile optimization',
      'Local keyword optimization',
      'Citation building (25 listings)',
      'Review management strategy',
      'On-page SEO (up to 10 pages)',
      '3 months support',
    ],
  },
  {
    id: 'seo-national',
    name: 'National SEO Package',
    slug: 'seo-national',
    category: 'seo',
    price: 5000,
    description: 'Comprehensive SEO for nationwide visibility',
    features: [
      'Complete technical SEO audit',
      'Keyword research (100+ keywords)',
      'On-page optimization (unlimited pages)',
      'Link building strategy',
      'Content optimization',
      'Competitor analysis',
      '6 months support',
      'Monthly ranking reports',
    ],
  },
  // Social Media
  {
    id: 'social-media-basic',
    name: 'Social Media Management - Basic',
    slug: 'social-media-basic',
    category: 'social_media',
    price: 1800,
    description: 'Professional social media presence across 2 platforms',
    features: [
      '2 social platforms',
      '12 posts per month',
      'Content calendar',
      'Basic graphics design',
      'Community management',
      'Monthly analytics report',
    ],
  },
  {
    id: 'social-media-premium',
    name: 'Social Media Management - Premium',
    slug: 'social-media-premium',
    category: 'social_media',
    price: 4000,
    description: 'Comprehensive social media marketing across all platforms',
    features: [
      '4+ social platforms',
      '30 posts per month',
      'Advanced content strategy',
      'Professional graphics & video',
      'Influencer outreach',
      'Community management',
      'Paid social integration',
      'Weekly analytics reports',
    ],
  },
  // Web Development
  {
    id: 'web-design-custom',
    name: 'Custom Web Design',
    slug: 'web-design-custom',
    category: 'web_development',
    price: 5000,
    description: 'Bespoke website design tailored to your brand',
    features: [
      'Custom design mockups',
      'Responsive development',
      'CMS integration',
      'Up to 20 pages',
      'Contact forms',
      'SEO ready',
      '60 days support',
      'Training session',
    ],
  },
  {
    id: 'web-app-development',
    name: 'Web Application Development',
    slug: 'web-app-development',
    category: 'web_development',
    price: 12000,
    description: 'Custom web application built to your specifications',
    features: [
      'Custom functionality',
      'User authentication',
      'Database design',
      'API development',
      'Admin dashboard',
      'Testing & QA',
      '6 months support',
      'Scalable architecture',
    ],
  },
  // Branding
  {
    id: 'branding-starter',
    name: 'Brand Identity - Starter',
    slug: 'branding-starter',
    category: 'branding',
    price: 2500,
    description: 'Essential branding package for new businesses',
    features: [
      'Logo design (3 concepts)',
      'Color palette',
      'Typography selection',
      'Business card design',
      'Brand guidelines (basic)',
      '3 revisions',
      'Final files in all formats',
    ],
  },
  {
    id: 'branding-complete',
    name: 'Complete Brand Identity',
    slug: 'branding-complete',
    category: 'branding',
    price: 6000,
    description: 'Comprehensive branding for established businesses',
    features: [
      'Logo design (5 concepts)',
      'Complete brand strategy',
      'Color & typography system',
      'Marketing collateral (business cards, letterhead, etc.)',
      'Social media templates',
      'Brand guidelines (comprehensive)',
      'Unlimited revisions',
      'Brand workshop session',
    ],
  },
]

export const PRODUCT_CATEGORIES = {
  advertising: {
    name: 'Advertising',
    description: 'Google Ads & Social Media Advertising',
    icon: 'megaphone',
  },
  seo: {
    name: 'SEO',
    description: 'Search Engine Optimization',
    icon: 'search',
  },
  social_media: {
    name: 'Social Media',
    description: 'Social Media Management',
    icon: 'share',
  },
  web_development: {
    name: 'Web Development',
    description: 'Websites & Web Applications',
    icon: 'code',
  },
  branding: {
    name: 'Branding',
    description: 'Brand Identity & Design',
    icon: 'palette',
  },
} as const

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((product) => product.slug === slug)
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return PRODUCTS.filter((product) => product.category === category)
}
