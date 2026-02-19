'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Phone, ChevronDown, Star, Shield, Zap, Globe, Award, Truck, Package, ArrowRight, CheckCircle2 } from 'lucide-react'
import AnimatedSection from '@/components/AnimatedSection'
import { motion } from 'framer-motion'

const PHONE = '414-324-9699'
const TEL = 'tel:4143249699'

const homeFAQs = [
  {
    q: 'What is expedite transportation?',
    a: 'Expedite transportation is the urgent, time-critical movement of freight that cannot wait for standard shipping schedules. ProExpress specializes in same-day and next-day expedite delivery using sprinter vans and straight trucks.',
  },
  {
    q: 'How fast can ProExpress dispatch a vehicle?',
    a: 'ProExpress can dispatch a vehicle within 1\u20132 hours of booking in most service areas. We operate 24/7/365 with no holidays or weekends off.',
  },
  {
    q: 'Does ProExpress operate 24 hours a day?',
    a: 'Yes. ProExpress is available 24 hours a day, 7 days a week, 365 days a year including all holidays. Call 414-324-9699 anytime.',
  },
  {
    q: 'What states does ProExpress serve?',
    a: 'ProExpress serves all 48 contiguous United States with local, regional, and national expedite freight routes.',
  },
  {
    q: 'How do I get an expedite freight quote from ProExpress?',
    a: 'You can request a free quote online via our Quote Request page or call us directly at 414-324-9699 for an immediate response.',
  },
]

const industries = [
  { icon: '\uD83D\uDE97', label: 'Automotive' }, { icon: '\uD83C\uDFED', label: 'Manufacturing' },
  { icon: '\uD83C\uDFE5', label: 'Healthcare' }, { icon: '\uD83D\uDED2', label: 'Retail' },
  { icon: '\uD83C\uDFD7\uFE0F', label: 'Construction' }, { icon: '\u2708\uFE0F', label: 'Aerospace' },
  { icon: '\u26A1', label: 'Energy' }, { icon: '\uD83D\uDCF1', label: 'Technology' },
]

const testimonials = [
  { name: 'Mike R.', company: 'Precision Auto Parts Co.', title: 'Plant Manager', quote: 'ProExpress delivered our critical automotive components from Detroit to Chicago in under 6 hours. Their sprinter van service is absolutely unmatched. They saved our production line and earned a customer for life.' },
  { name: 'Sarah K.', company: 'Midwest Manufacturing Inc.', title: 'Operations Director', quote: 'When our assembly line was about to shut down due to a missing part, ProExpress came through with a same-day straight truck delivery. They saved us an estimated $40,000 in downtime. Incredible team.' },
  { name: 'Dr. James L.', company: 'Regional Medical Center', title: 'Supply Chain Manager', quote: "We've relied on ProExpress for healthcare supply logistics for 3 years running. Their 24/7 availability, on-time guarantee, and professional drivers make them our sole expedite carrier. Simply the best." },
]

const pillars = [
  { icon: Award, label: 'Experience', desc: '20+ years delivering excellence in expedite freight across the Midwest and nationwide.' },
  { icon: Zap, label: 'Speed', desc: 'Same-day dispatch in 30–90 minutes. We move when every minute counts for your business.' },
  { icon: Shield, label: 'Reliability', desc: '99.8% on-time delivery rate. Your freight arrives when promised — every single time.' },
  { icon: Globe, label: 'Coverage', desc: 'From local Milwaukee runs to nationwide coast-to-coast hauls across all 48 states.' },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: homeFAQs.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* HERO */}
      <section
        className="relative min-h-screen flex items-center"
        style={{ background: 'linear-gradient(135deg, #0A0F2C 0%, #141B3C 60%, #0A0F2C 100%)' }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1636070762406-4262052fa6ef?w=1600&q=80"
            alt="ProExpress expedite trucks on highway"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 hero-gradient" />
          {/* Blue accent glow */}
          <div className="absolute top-1/3 right-0 w-96 h-96 bg-electric/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-electric/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-electric/20 border border-electric/30 rounded-full text-electric text-sm font-semibold mb-6">
                <span className="w-2 h-2 bg-electric rounded-full animate-pulse" />
                24/7 Nationwide Expedite Service
              </span>
              <h1 className="font-heading font-900 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white leading-tight mb-6">
                When Speed Is
                <span className="block text-electric">Non-Negotiable,</span>
                Call ProExpress.
              </h1>
              <p className="text-white/70 text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl">
                ProExpress is Milwaukee&apos;s trusted expedite carrier — providing 24/7 expedited freight service with sprinter vans and straight trucks. Same-day freight delivery and nationwide expedite trucking across all 48 states, dispatched in as little as 1–2 hours.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/quote"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-electric hover:bg-electric-dark text-white font-bold text-lg rounded-xl transition-all duration-200 shadow-xl shadow-electric/30 hover:shadow-electric/50 min-h-[56px]"
              >
                Get a Free Quote
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href={TEL}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-lg rounded-xl transition-all duration-200 backdrop-blur-sm min-h-[56px]"
              >
                <Phone className="w-5 h-5 text-electric" />
                Call {PHONE}
              </a>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40">
          <span className="text-xs">Scroll</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="bg-electric py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 text-white font-heading font-700 text-sm sm:text-base">
            {['20+ Years in Business', '24/7/365 Availability', 'Large Modern Fleet', '48-State Coverage'].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 opacity-80" />
                <span>{item}</span>
                {i < 3 && <span className="hidden sm:block text-white/40">|</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES OVERVIEW */}
      <section className="py-20 bg-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="font-heading font-800 text-3xl sm:text-4xl text-navy mb-4">Our Expedite Services</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">Two specialized services built for speed. One mission: get your freight there on time.</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { icon: Package, title: 'Sprinter Van / Cargo Van', desc: 'Ideal for smaller urgent loads up to 2,500 lbs. Perfect for same-day local and regional deliveries with door-to-door service and immediate dispatch availability.', href: '/services', features: ['Up to 2,500 lbs capacity', 'Same-day dispatch available', 'Door-to-door service', 'Local & regional coverage'] },
              { icon: Truck, title: 'Straight Truck', desc: 'Built for medium to large freight loads up to 10,000 lbs. Regional and national runs with team drivers available for nonstop delivery coast-to-coast.', href: '/services', features: ['Up to 10,000 lbs capacity', 'Team drivers for nonstop runs', 'Regional & national coverage', 'Expedited LTL options'] },
            ].map((svc, i) => (
              <AnimatedSection key={i} delay={i * 0.15}>
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg hover:border-electric/20 transition-all duration-300 group h-full">
                  <div className="w-14 h-14 bg-electric/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-electric/20 transition-colors">
                    <svc.icon className="w-7 h-7 text-electric" />
                  </div>
                  <h3 className="font-heading font-800 text-xl text-navy mb-3">{svc.title}</h3>
                  <p className="text-gray-500 mb-5 leading-relaxed">{svc.desc}</p>
                  <ul className="space-y-2 mb-6">
                    {svc.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle2 className="w-4 h-4 text-electric flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href={svc.href} className="inline-flex items-center gap-1.5 text-electric font-semibold text-sm hover:gap-2.5 transition-all">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="font-heading font-800 text-3xl sm:text-4xl text-navy mb-4">Why Choose ProExpress?</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">Two decades of expedite expertise, a massive modern fleet, and an unrelenting commitment to your timeline.</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="text-center p-6 rounded-2xl bg-light-gray hover:bg-electric/5 transition-colors group">
                  <div className="w-14 h-14 bg-electric rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <p.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-heading font-800 text-lg text-navy mb-2">{p.label}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="py-16 bg-navy overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <AnimatedSection className="text-center">
            <h2 className="font-heading font-800 text-3xl text-white mb-2">Industries We Serve</h2>
            <p className="text-white/50">Trusted by businesses across every major sector</p>
          </AnimatedSection>
        </div>
        <div className="relative">
          <div className="flex animate-marquee gap-0">
            {[...industries, ...industries].map((ind, i) => (
              <div key={i} className="flex-none mx-6 flex flex-col items-center gap-2">
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-2xl hover:bg-electric/20 transition-colors">
                  {ind.icon}
                </div>
                <span className="text-white/60 text-xs font-medium whitespace-nowrap">{ind.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="font-heading font-800 text-3xl sm:text-4xl text-navy mb-4">What Our Clients Say</h2>
            <div className="flex justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
            </div>
            <p className="text-gray-500">Trusted by hundreds of businesses nationwide</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <AnimatedSection key={i} delay={i * 0.15}>
                <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 h-full flex flex-col">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                  </div>
                  <p className="text-gray-600 leading-relaxed flex-1 italic mb-5">&ldquo;{t.quote}&rdquo;</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <div className="w-10 h-10 bg-electric/10 rounded-full flex items-center justify-center font-heading font-800 text-electric">
                      {t.name[0]}
                    </div>
                    <div>
                      <div className="font-semibold text-navy text-sm">{t.name}</div>
                      <div className="text-gray-400 text-xs">{t.title}, {t.company}</div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <AnimatedSection className="text-center mb-10">
            <h2 className="font-heading font-800 text-3xl sm:text-4xl text-navy mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-500">Quick answers to the questions we hear most often</p>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="space-y-3">
              {homeFAQs.map((faq, i) => (
                <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left font-heading font-700 text-navy hover:bg-light-gray transition-colors"
                  >
                    <span className="pr-4">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-electric flex-shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-5 text-gray-600 leading-relaxed bg-light-gray/50 border-t border-gray-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.2} className="text-center mt-8">
            <Link href="/faq" className="inline-flex items-center gap-2 text-electric font-semibold hover:gap-3 transition-all">
              View all FAQs <ArrowRight className="w-4 h-4" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-16 bg-navy relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-electric/15 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-electric/10 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="font-heading font-900 text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
              Ready to Ship? We&apos;re Standing By.
            </h2>
            <p className="text-white/60 text-lg mb-8">Dispatch available in 30–90 minutes. Call now or request a quote online.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/quote"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-electric hover:bg-electric-dark text-white font-bold text-lg rounded-xl transition-all shadow-xl shadow-electric/30 min-h-[56px]"
              >
                Get Your Free Quote Now
              </Link>
              <a
                href={TEL}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-lg rounded-xl transition-all min-h-[56px]"
              >
                <Phone className="w-5 h-5 text-electric" />
                {PHONE}
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
