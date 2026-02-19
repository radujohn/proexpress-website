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
  title: { default: 'ProExpress | Expedite Transportation Services', template: '%s | ProExpress' },
  description: 'ProExpress delivers urgent freight anywhere in the 48 contiguous states. 24/7/365 same-day expedite service with Sprinter Vans and Straight Trucks. Call 414-324-9699.',
  keywords: ['expedite transportation', 'same-day delivery', 'freight', 'sprinter van', 'straight truck', 'Milwaukee', 'nationwide logistics'],
  authors: [{ name: 'ProExpress' }],
  creator: 'ProExpress',
  metadataBase: new URL(baseUrl),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    siteName: 'ProExpress',
    title: 'ProExpress | Expedite Transportation — When Speed Is Non-Negotiable',
    description: 'ProExpress delivers urgent freight anywhere in the 48 contiguous states. 24/7/365 same-day expedite service.',
    images: [{ url: 'https://images.unsplash.com/photo-1636070762406-4262052fa6ef?w=1200', width: 1200, height: 630, alt: 'ProExpress Expedite Trucks' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ProExpress | Expedite Transportation',
    description: '24/7 nationwide expedite freight. Sprinter Vans & Straight Trucks. Call 414-324-9699.',
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
