'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Phone, CheckCircle2, ArrowRight, Award, Heart, Target, Users } from 'lucide-react'
import AnimatedSection from '@/components/AnimatedSection'

const PHONE = '414-324-9699'
const TEL = 'tel:4143249699'

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: process.env.NEXT_PUBLIC_BASE_URL || 'https://proexpress.com' },
    { '@type': 'ListItem', position: 2, name: 'About Us', item: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://proexpress.com'}/about` },
  ],
}

const values = [
  { icon: Target, title: 'Mission-Driven', desc: 'Every shipment we handle represents a promise. Our mission is to be the most reliable expedite carrier in America, one delivery at a time.' },
  { icon: Heart, title: 'Client-First Culture', desc: 'Our clients are not account numbers. We know your business, your timelines, and your challenges — and we build our service around you.' },
  { icon: Award, title: 'Excellence in Everything', desc: 'From how we answer the phone to how we deliver your freight, we hold ourselves to the highest standards in the industry.' },
  { icon: Users, title: 'A Team You Can Trust', desc: 'Our drivers are vetted, trained, and dedicated professionals. When ProExpress is on the job, you can rest easy.' },
]

const team = [
  { name: 'Robert Johnson', title: 'CEO & Founder', bio: '20+ years building ProExpress from a one-van operation into a nationwide expedite carrier. Robert\'s vision drives everything we do.', initials: 'RJ' },
  { name: 'Lisa Martinez', title: 'VP of Operations', bio: 'With 15 years in fleet logistics, Lisa ensures every dispatch is optimized for speed, safety, and efficiency across our entire network.', initials: 'LM' },
  { name: 'David Chen', title: 'Director, Customer Relations', bio: 'David leads our client success team, ensuring every customer from first call to final delivery experiences the ProExpress difference.', initials: 'DC' },
]

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      {/* HERO */}
      <section className="relative pt-32 pb-20 bg-navy overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.pexels.com/photos/8783533/pexels-photo-8783533.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="ProExpress logistics operations" fill className="object-cover opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/60" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-electric/20 border border-electric/30 rounded-full text-electric text-sm font-semibold mb-6">
              About ProExpress
            </div>
            <h1 className="font-heading font-900 text-4xl sm:text-5xl lg:text-6xl text-white mb-5">
              20 Years of Delivering
              <span className="block text-electric">On Our Promise</span>
            </h1>
            <p className="text-white/60 text-base sm:text-xl max-w-2xl">
              Built on reliability, driven by speed, and powered by a team that treats every shipment like it\'s their own.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* COMPANY STORY */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <AnimatedSection>
              <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
                <Image
                  src="https://images.pexels.com/photos/29057949/pexels-photo-29057949.jpeg?auto=compress&cs=tinysrgb&w=900"
                  alt="ProExpress truck fleet"
                  fill
                  className="object-cover"
                />
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <h2 className="font-heading font-900 text-3xl sm:text-4xl text-navy mb-5">Our Story</h2>
              <div className="space-y-4 text-gray-500 leading-relaxed">
                <p>ProExpress was founded over 20 years ago with a single sprinter van and one unshakeable conviction: in expedite transportation, speed and reliability aren&apos;t luxuries — they&apos;re the product. What started as a Milwaukee expedite carrier has grown into one of the Midwest&apos;s most trusted providers of 24/7 expedited freight, same-day freight delivery, and nationwide expedite trucking across all 48 contiguous states.</p>
                <p>Over two decades, we&apos;ve built a large modern fleet of sprinter vans and straight trucks, a network of professional CDL drivers, and a 24/7 dispatch operation that never sleeps. Our cargo van delivery and straight truck freight services have helped manufacturers prevent line shutdowns, hospitals receive critical medical supplies, and retailers keep their supply chains moving — more than 100,000 deliveries and counting.</p>
                <p>Today, ProExpress is a family of expedite transportation professionals united by one purpose: when your business can&apos;t afford a delay, we show up. Every time. On time.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-7">
                <Link href="/quote" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-electric hover:bg-electric-dark text-white font-bold rounded-xl transition-all shadow-lg shadow-electric/25 min-h-[48px] w-full sm:w-auto">
                  Work With Us <ArrowRight className="w-4 h-4" />
                </Link>
                <a href={TEL} className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border-2 border-navy text-navy hover:bg-navy hover:text-white font-bold rounded-xl transition-all min-h-[48px] w-full sm:w-auto">
                  <Phone className="w-4 h-4" /> {PHONE}
                </a>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="py-14 bg-electric">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { stat: '20+', label: 'Years in Business' },
              { stat: '100K+', label: 'Deliveries Completed' },
              { stat: '24/7', label: 'Operations — Always On' },
              { stat: '48', label: 'States Covered' },
            ].map((s, i) => (
              <AnimatedSection key={i} delay={i * 0.1} className="text-center">
                <div className="font-heading font-900 text-4xl sm:text-5xl text-white mb-1">{s.stat}</div>
                <div className="text-white/70 text-sm font-medium">{s.label}</div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION & VALUES */}
      <section className="py-20 bg-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="font-heading font-800 text-3xl sm:text-4xl text-navy mb-4">Our Mission & Values</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">The principles that have guided every decision for 20 years — and will guide the next 20.</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full">
                  <div className="w-12 h-12 bg-electric/10 rounded-xl flex items-center justify-center mb-4">
                    <v.icon className="w-6 h-6 text-electric" />
                  </div>
                  <h3 className="font-heading font-800 text-lg text-navy mb-2">{v.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FLEET */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection delay={0.1}>
              <h2 className="font-heading font-900 text-3xl sm:text-4xl text-navy mb-5">Our Modern Fleet</h2>
              <p className="text-gray-500 leading-relaxed mb-6 text-lg">
                ProExpress operates one of the region\'s largest and most well-maintained expedite fleets. Every vehicle is inspected regularly, GPS-tracked, and operated by a vetted professional driver.
              </p>
              <ul className="space-y-3">
                {[
                  'Late-model Sprinter vans and cargo vans — fuel-efficient and fast',
                  'Heavy-duty straight trucks for larger freight needs',
                  'GPS tracking on every vehicle in real time',
                  'Regular DOT-compliant inspections and maintenance',
                  'All vehicles fully insured, all drivers fully licensed',
                  'Liftgate-equipped units available on request',
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-600">
                    <CheckCircle2 className="w-5 h-5 text-electric mt-0.5 flex-shrink-0" />{f}
                  </li>
                ))}
              </ul>
            </AnimatedSection>
            <AnimatedSection>
              <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
                <Image src="https://images.unsplash.com/photo-1636070762406-4262052fa6ef?w=900&q=80" alt="ProExpress modern fleet" fill className="object-cover" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-20 bg-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="font-heading font-800 text-3xl sm:text-4xl text-navy mb-4">Meet Our Leadership</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">The experienced team behind 20 years of on-time performance.</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member, i) => (
              <AnimatedSection key={i} delay={i * 0.15}>
                <div className="bg-white rounded-2xl p-7 text-center shadow-sm border border-gray-100">
                  <div className="w-20 h-20 bg-navy rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="font-heading font-800 text-2xl text-electric">{member.initials}</span>
                  </div>
                  <h3 className="font-heading font-800 text-lg text-navy mb-1">{member.name}</h3>
                  <p className="text-electric text-sm font-semibold mb-3">{member.title}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
