'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Phone, CheckCircle2, ArrowRight, MapPin, Truck, Package } from 'lucide-react'
import AnimatedSection from '@/components/AnimatedSection'

const PHONE = '414-324-9699'
const TEL = 'tel:4143249699'

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
              Expedite Freight Services Built for Speed
            </h1>
            <p className="text-white/60 text-base sm:text-xl max-w-2xl">
              Sprinter van shipping, cargo van delivery, and straight truck freight — two specialized services with one mission: your time-critical freight arrives on schedule, every time.
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
              <h2 className="font-heading font-900 text-3xl sm:text-4xl text-navy mb-4">Sprinter Van / Cargo Van</h2>
              <p className="text-gray-500 leading-relaxed mb-6 text-lg">
                When your urgent shipment is too important for a standard carrier but doesn\'t require a full truck, our Sprinter Van and Cargo Van service is your answer. Ideal for smaller critical loads that need to move fast — same day, door-to-door, no terminals.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Capacity up to 2,500 lbs and 200 cubic feet',
                  'Same-day dispatch within 30–90 minutes',
                  'Door-to-door dedicated service — no transfers',
                  'Local, regional, and cross-state deliveries',
                  'Climate-friendly, fuel-efficient fleet',
                  'Real-time driver communication throughout delivery',
                  'Ideal for medical supplies, automotive parts, electronics',
                ].map((f, i) => (
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
              <h2 className="font-heading font-900 text-3xl sm:text-4xl text-navy mb-4">Straight Truck</h2>
              <p className="text-gray-500 leading-relaxed mb-6 text-lg">
                For medium to large freight that needs to move fast and far, our Straight Truck service delivers. With team driver options for nonstop coast-to-coast delivery, we ensure your large, time-critical freight never stops moving — day or night.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Capacity up to 10,000 lbs and 1,600 cubic feet',
                  'Team drivers available for nonstop 24-hour delivery',
                  'Regional and nationwide coverage across all 48 states',
                  'Lift gate service available on equipped units',
                  'Ideal for manufacturing, construction, and retail loads',
                  'Dedicated vehicle — your freight is the only freight',
                  'Electronic logging for transparent delivery tracking',
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-600">
                    <CheckCircle2 className="w-5 h-5 text-electric mt-0.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/quote"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-electric hover:bg-electric-dark text-white font-bold rounded-xl transition-all shadow-lg shadow-electric/25 min-h-[48px] w-full sm:w-auto"
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

      {/* COVERAGE MAP PLACEHOLDER */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-10">
            <h2 className="font-heading font-800 text-3xl sm:text-4xl text-navy mb-4">Nationwide Coverage</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">ProExpress serves all 48 contiguous United States. From Milwaukee to Miami, Seattle to Dallas — we cover every mile.</p>
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
