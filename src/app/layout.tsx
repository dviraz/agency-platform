import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: 'Agency | Premium Digital Marketing Services',
    template: '%s | Agency',
  },
  description:
    'Transform your digital presence with our premium marketing services. Web development, Google Ads, social media marketing, SEO, and branding solutions.',
  keywords: [
    'digital marketing',
    'web development',
    'google ads',
    'facebook ads',
    'seo',
    'social media marketing',
    'branding',
    'agency',
  ],
  authors: [{ name: 'Agency' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: 'Agency',
    title: 'Agency | Premium Digital Marketing Services',
    description:
      'Transform your digital presence with our premium marketing services.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agency | Premium Digital Marketing Services',
    description:
      'Transform your digital presence with our premium marketing services.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
