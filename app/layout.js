import './globals.css'
import { Barlow, Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FloatingCallButton from '@/components/FloatingCallButton'

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'],
  variable: '--font-barlow',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://proexpress.com'

export const metadata = {
  title: {
    default: 'ProExpress | 24/7 Expedite Transportation \u2014 Milwaukee & Nationwide',
    template: '%s',
  },
  description:
    'ProExpress delivers time-critical freight fast. Sprinter van and straight truck expedite services available 24/7/365. Serving local, regional, and national routes for 20+ years. Call 414-324-9699.',
  keywords: [
    'expedite transportation',
    'same-day freight delivery',
    'cargo van delivery',
    'straight truck freight',
    'sprinter van shipping',
    '24/7 expedited freight',
    'Milwaukee expedite carrier',
    'nationwide expedite trucking',
    'expedited freight',
    'time-critical freight',
  ],
  authors: [{ name: 'ProExpress' }],
  creator: 'ProExpress',
  metadataBase: new URL(baseUrl),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    siteName: 'ProExpress',
    title: 'ProExpress | 24/7 Expedite Transportation \u2014 Milwaukee & Nationwide',
    description:
      'ProExpress delivers time-critical freight fast. Sprinter van and straight truck expedite services available 24/7/365. Serving local, regional, and national routes for 20+ years.',
    images: [{ url: 'https://images.unsplash.com/photo-1636070762406-4262052fa6ef?w=1200', width: 1200, height: 630, alt: 'ProExpress expedite transportation — sprinter van and straight truck fleet' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ProExpress | 24/7 Expedite Transportation \u2014 Milwaukee & Nationwide',
    description:
      'Same-day sprinter van and straight truck expedite freight. Milwaukee expedite carrier serving all 48 states. Call 414-324-9699.',
    images: ['https://images.unsplash.com/photo-1636070762406-4262052fa6ef?w=1200'],
  },
  robots: { index: true, follow: true },
}

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ProExpress',
  url: baseUrl,
  logo: `${baseUrl}/logo.png`,
  telephone: '+14143249699',
  email: 'info@proexpress.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '1234 Industrial Dr',
    addressLocality: 'Milwaukee',
    addressRegion: 'WI',
    postalCode: '53201',
    addressCountry: 'US',
  },
  sameAs: ['https://www.linkedin.com/company/proexpress', 'https://www.facebook.com/proexpress'],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${barlow.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script dangerouslySetInnerHTML={{__html:'window.addEventListener("error",function(e){if(e.error instanceof DOMException&&e.error.name==="DataCloneError"){e.stopImmediatePropagation();e.preventDefault()}},true);'}} />
      </head>
      <body className="font-sans bg-white text-gray-900 antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingCallButton />
      </body>
    </html>
  )
}
