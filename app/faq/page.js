'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Phone, ChevronDown, HelpCircle } from 'lucide-react'
import { useCmsContent } from '@/hooks/useCmsContent'

const PHONE = '414-324-9699'
const TEL = 'tel:4143249699'

const defaultFaqPage = {
  heroTitle: 'Expedite Transportation FAQ',
  heroSubtitle: 'Everything you need to know about expedite transportation, same-day freight delivery, sprinter van shipping, straight truck freight, and more.',
  categories: [
    { category: 'Coverage & Service Area', questions: [
      { q: 'What areas do you serve?', a: 'ProExpress provides nationwide expedite trucking across all 48 contiguous United States.' },
      { q: 'Do you offer same-day delivery?', a: 'Yes \u2014 same-day freight delivery is our core specialty. ProExpress can dispatch within 1\u20132 hours of your request.' },
      { q: 'Are you available on weekends and holidays?', a: 'Absolutely. ProExpress operates 24 hours a day, 7 days a week, 365 days a year.' },
    ]},
    { category: 'Services & Fleet', questions: [
      { q: 'What is the difference between a Sprinter Van and a Straight Truck?', a: 'Sprinter van shipping handles loads up to 2,500 lbs; straight truck handles up to 10,000 lbs.' },
      { q: 'What is the maximum freight weight you can handle?', a: 'Sprinter van: up to 2,500 lbs. Straight truck: up to 10,000 lbs. Call us for larger requirements.' },
      { q: 'Do you offer team drivers for nonstop delivery?', a: 'Yes. For long-haul routes, we offer team driver service enabling continuous 24/7 movement.' },
    ]},
    { category: 'Quotes, Booking & Tracking', questions: [
      { q: 'How do I request a quote?', a: 'Call 414-324-9699 or submit our online Quote Request form. Response within minutes.' },
      { q: 'How do I track my shipment?', a: 'For real-time status, call our 24/7 dispatch at 414-324-9699. Online tracking coming soon.' },
      { q: 'How quickly can you dispatch a vehicle?', a: 'ProExpress can dispatch within 1\u20132 hours of your request in most service areas.' },
    ]},
    { category: 'Industries & Compliance', questions: [
      { q: 'What industries do you serve?', a: 'Automotive, Manufacturing, Healthcare, Retail, Construction, Aerospace, Energy, and Technology.' },
      { q: 'Are your drivers licensed and insured?', a: 'Yes. All drivers hold valid CDL licenses. Full cargo and liability insurance on every shipment.' },
      { q: 'What makes ProExpress different from other carriers?', a: 'Speed, reliability, and accountability. Our own drivers, our own fleet \u2014 consistent quality and 99.8% on-time rate.' },
    ]},
  ],
}

export default function FAQPage() {
  const [open, setOpen] = useState({})
  const toggle = (key) => setOpen(prev => ({ ...prev, [key]: !prev[key] }))
  const cms = useCmsContent('faq_page', defaultFaqPage)
  const allFAQs = (cms.categories || []).flatMap(cat => cat.questions)
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allFAQs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* HERO */}
      <section className="bg-navy pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="w-14 h-14 bg-electric/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <HelpCircle className="w-7 h-7 text-electric" />
          </div>
          <h1 className="font-heading font-900 text-3xl sm:text-4xl md:text-5xl text-white mb-4">{cms.heroTitle}</h1>
          <p className="text-white/60 text-base sm:text-xl max-w-2xl mx-auto">{cms.heroSubtitle}</p>
        </div>
      </section>

      {/* FAQ CONTENT */}
      <section className="py-16 bg-light-gray">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="space-y-10">
            {(cms.categories || []).map((category, ci) => (
              <div key={ci}>
                <h2 className="font-heading font-800 text-xl text-navy mb-4 flex items-center gap-2">
                  <span className="w-7 h-7 bg-electric text-white text-xs font-bold rounded-full flex items-center justify-center">{ci+1}</span>
                  {category.category}
                </h2>
                <div className="space-y-3">
                  {category.questions.map((faq, qi) => {
                    const key = `${ci}-${qi}`
                    return (
                      <div key={qi} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <button
                          onClick={() => toggle(key)}
                          className="w-full flex items-start sm:items-center justify-between px-6 py-5 text-left hover:bg-light-gray transition-colors gap-4"
                        >
                          <span className="font-heading font-700 text-navy text-base">{faq.q}</span>
                          <ChevronDown className={`w-5 h-5 text-electric flex-shrink-0 transition-transform duration-200 mt-0.5 sm:mt-0 ${
                            open[key] ? 'rotate-180' : ''
                          }`} />
                        </button>
                        {open[key] && (
                          <div className="px-6 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Still have questions */}
          <div className="mt-12 bg-navy rounded-2xl p-8 text-center">
            <h3 className="font-heading font-800 text-2xl text-white mb-2">Still Have Questions?</h3>
            <p className="text-white/60 mb-6">Our team is available 24/7 to answer any question and get your freight moving.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={TEL} className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-electric hover:bg-electric-dark text-white font-bold rounded-xl transition-all shadow-lg shadow-electric/30 min-h-[48px]">
                <Phone className="w-5 h-5" />Call {PHONE}
              </a>
              <Link href="/quote" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-xl transition-all min-h-[48px]">
                Get a Free Quote
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
