'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Phone, CheckCircle2, ArrowRight, MapPin, Truck, Package } from 'lucide-react'
import AnimatedSection from '@/components/AnimatedSection'
import { useCmsContent } from '@/hooks/useCmsContent'

const PHONE = '414-324-9699'
const TEL = 'tel:4143249699'

const defaultServices = {
  heroTitle: 'Expedite Freight Services Built for Speed',
  heroSubtitle: 'Sprinter van shipping, cargo van delivery, and straight truck freight \u2014 two specialized services with one mission: your time-critical freight arrives on schedule, every time.',
  sprinterTitle: 'Sprinter Van / Cargo Van',
  sprinterDesc: "Our sprinter van shipping and cargo van delivery service is engineered for time-critical freight that can\u2019t wait. ProExpress provides same-day freight delivery with a dedicated vehicle dispatched directly from pickup to destination \u2014 no freight terminals, no co-loading, no delays.",
  sprinterFeatures: [
    'Sprinter van shipping up to 2,500 lbs and 200 cu ft',
    'Same-day freight delivery \u2014 dispatch in 1\u20132 hours',
    'Cargo van delivery direct door-to-door, no terminals',
    'Local Milwaukee runs and cross-state regional routes',
    'Fuel-efficient, late-model sprinter van fleet',
    'Direct driver communication throughout your expedite',
    'Automotive parts, medical supplies, electronics, and more',
  ],
  straightTitle: 'Straight Truck',
  straightDesc: 'ProExpress straight truck freight service handles medium to large time-critical loads that demand expedite speed at scale. As a Milwaukee expedite carrier with nationwide expedite trucking capability, we deploy straight trucks for regional corridor hauls and full coast-to-coast runs \u2014 with team drivers available for nonstop 24/7 expedited freight delivery when every hour counts.',
  straightFeatures: [
    'Straight truck freight up to 10,000 lbs and 1,600 cu ft',
    'Team drivers for nonstop 24/7 expedited freight runs',
    'Nationwide expedite trucking across all 48 states',
    'Lift gate service available on equipped units',
    'Dedicated straight truck \u2014 your freight only, no co-loading',
    'Manufacturing, construction, retail, and aerospace loads',
    'Electronic logging for transparent, real-time delivery status',
  ],
  ctaTitle: 'Need It There Fast?',
  ctaSubtitle: 'Our dispatch team is standing by right now. Get your quote in minutes.',
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Expedite Transportation Services',
  provider: { '@type': 'Organization', name: 'ProExpress', telephone: '+14143249699' },
  areaServed: 'United States',
  description: 'Same-day expedite freight delivery across 48 contiguous US states using Sprinter Vans and Straight Trucks.',
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: process.env.NEXT_PUBLIC_BASE_URL || 'https://proexpress.com' },
    { '@type': 'ListItem', position: 2, name: 'Services', item: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://proexpress.com'}/services` },
  ],
}

export default function ServicesPage() {
  const cms = useCmsContent('services_page', defaultServices)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      {/* HERO */}
      <section className="relative pt-32 pb-20 bg-navy overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.pexels.com/photos/29057949/pexels-photo-29057949.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="ProExpress fleet" fill className="object-cover opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/70" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-electric/20 border border-electric/30 rounded-full text-electric text-sm font-semibold mb-6">
              Our Services
            </div>
            <h1 className="font-heading font-900 text-4xl sm:text-5xl lg:text-6xl text-white mb-5">
              {cms.heroTitle}
            </h1>
            <p className="text-white/60 text-base sm:text-xl max-w-2xl">
              {cms.heroSubtitle}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* SERVICE 1: SPRINTER VAN */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
                <Image
                  src="https://images.unsplash.com/photo-1611746351408-c0a1346be8e8?w=900&q=80"
                  alt="ProExpress Sprinter Van cargo service"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-electric text-white text-sm font-bold rounded-lg">
                  Sprinter / Cargo Van
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <div className="w-14 h-14 bg-electric/10 rounded-xl flex items-center justify-center mb-5">
                <Package className="w-7 h-7 text-electric" />
              </div>
              <h2 className="font-heading font-900 text-3xl sm:text-4xl text-navy mb-4">{cms.sprinterTitle}</h2>
              <p className="text-gray-500 leading-relaxed mb-6 text-lg">
                {cms.sprinterDesc}
              </p>
              <ul className="space-y-3 mb-8">
                {(cms.sprinterFeatures || []).map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-600">
                    <CheckCircle2 className="w-5 h-5 text-electric mt-0.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/quote"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-electric hover:bg-electric-dark text-white font-bold rounded-xl transition-all shadow-lg shadow-electric/25 min-h-[48px] w-full sm:w-auto"
              >
                Request a Quote <ArrowRight className="w-5 h-5" />
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* SERVICE 2: STRAIGHT TRUCK */}
      <section className="py-20 bg-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection delay={0.15} className="order-2 lg:order-1">
              <div className="w-14 h-14 bg-electric/10 rounded-xl flex items-center justify-center mb-5">
                <Truck className="w-7 h-7 text-electric" />
              </div>
              <h2 className="font-heading font-900 text-3xl sm:text-4xl text-navy mb-4">{cms.straightTitle}</h2>
              <p className="text-gray-500 leading-relaxed mb-6 text-lg">
                {cms.straightDesc}
              </p>
              <ul className="space-y-3 mb-8">
                {(cms.straightFeatures || []).map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-600">
                    <CheckCircle2 className="w-5 h-5 text-electric mt-0.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/quote"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-electric hover:bg-electric-dark text-white font-bold rounded-xl transition-all shadow-lg shadow-electric/25 min-h-[48px] w-full sm:w-auto"
              >
                Request a Quote <ArrowRight className="w-5 h-5" />
              </Link>
            </AnimatedSection>
            <AnimatedSection className="order-1 lg:order-2">
              <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
                <Image
                  src="https://images.pexels.com/photos/29057946/pexels-photo-29057946.jpeg?auto=compress&cs=tinysrgb&w=900"
                  alt="ProExpress straight truck service"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-electric text-white text-sm font-bold rounded-lg">
                  Straight Truck
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="py-14 bg-white border-t border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <AnimatedSection className="text-center mb-7">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Why Businesses Trust ProExpress</span>
          </AnimatedSection>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: '🛡️', label: 'Fully Licensed', desc: 'FMCSA-authorized carrier' },
              { icon: '✅', label: 'Fully Insured', desc: 'Full cargo & liability coverage' },
              { icon: '⭐', label: '20+ Years Experience', desc: 'Two decades of expedite excellence' },
              { icon: '🕐', label: '24/7 Dispatch Available', desc: 'Always on — no holidays, no weekends' },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-light-gray border border-gray-100 hover:border-electric/20 transition-colors h-full">
                  <span className="text-2xl mb-2">{item.icon}</span>
                  <h3 className="font-heading font-800 text-navy text-sm mb-1 leading-tight">{item.label}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* COVERAGE MAP PLACEHOLDER */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-10">
            <h2 className="font-heading font-800 text-3xl sm:text-4xl text-navy mb-4">Nationwide Expedite Trucking Coverage</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">ProExpress operates nationwide expedite trucking routes across all 48 contiguous United States. From same-day Milwaukee cargo van delivery to multi-day cross-country straight truck freight runs — we cover every corridor.</p>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="relative rounded-2xl overflow-hidden bg-navy/5 border-2 border-dashed border-navy/20 flex items-center justify-center" style={{ minHeight: 340 }}>
              <div className="text-center p-10">
                <MapPin className="w-16 h-16 text-electric mx-auto mb-4" />
                <h3 className="font-heading font-800 text-2xl text-navy mb-2">48 Contiguous States</h3>
                <p className="text-gray-500 max-w-md">
                  Our fleet and driver network spans the entire continental United States. Regional hubs in the Midwest, Southeast, Northeast, and West Coast ensure fast dispatch wherever your freight needs to go.
                </p>
                <div className="flex flex-wrap justify-center gap-3 mt-6">
                  {['Midwest', 'Southeast', 'Northeast', 'Southwest', 'West Coast', 'Mountain States'].map(r => (
                    <span key={r} className="px-3 py-1.5 bg-electric/10 text-electric text-sm font-semibold rounded-full">{r}</span>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-navy">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="font-heading font-900 text-3xl sm:text-4xl text-white mb-4">Need It There Fast?</h2>
            <p className="text-white/60 text-lg mb-8">Our dispatch team is standing by right now. Get your quote in minutes.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quote" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-electric hover:bg-electric-dark text-white font-bold text-lg rounded-xl transition-all shadow-xl shadow-electric/30 min-h-[56px]">
                Request a Quote
              </Link>
              <a href={TEL} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-lg rounded-xl transition-all min-h-[56px]">
                <Phone className="w-5 h-5 text-electric" />{PHONE}
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
