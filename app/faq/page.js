'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Phone, ChevronDown, HelpCircle } from 'lucide-react'

const PHONE = '414-324-9699'
const TEL = 'tel:4143249699'

const faqs = [
  {
    category: 'Coverage & Service Area',
    questions: [
      {
        q: 'What areas do you serve?',
        a: 'ProExpress provides nationwide expedite trucking across all 48 contiguous United States. Headquartered in Milwaukee, WI, we offer same-day freight delivery throughout Wisconsin and Illinois, regional expedite transportation across the Midwest, and direct coast-to-coast straight truck freight hauls. No corridor is out of reach for our 24/7 expedited freight operation.',
      },
      {
        q: 'Do you offer same-day delivery?',
        a: 'Yes — same-day freight delivery is our core specialty. ProExpress can dispatch a sprinter van or straight truck within 1–2 hours of your request, making same-day expedite transportation achievable on the vast majority of routes. For longer hauls, we utilize team drivers who alternate shifts for nonstop 24/7 expedited freight delivery.',
      },
      {
        q: 'Are you available on weekends and holidays?',
        a: 'Absolutely. ProExpress operates 24 hours a day, 7 days a week, 365 days a year — including every weekend and holiday. Our live dispatch team is always staffed and ready to move your time-critical freight immediately, regardless of the hour or date.',
      },
    ],
  },
  {
    category: 'Services & Fleet',
    questions: [
      {
        q: 'What is the difference between a Sprinter Van and a Straight Truck?',
        a: 'Sprinter van shipping and cargo van delivery are best suited for urgent loads up to 2,500 lbs. These vehicles are faster, more maneuverable in urban environments, and ideal for same-day freight delivery on local and regional routes. Straight truck freight handles larger loads — up to 10,000 lbs — making it the right choice for medium to large expedite transportation needs across regional and national corridors.',
      },
      {
        q: 'What is the maximum freight weight you can handle?',
        a: 'For sprinter van shipping and cargo van delivery, ProExpress handles loads up to 2,500 lbs. Our straight truck freight service accommodates loads up to 10,000 lbs. For shipments exceeding these limits, call us at 414-324-9699 and we will work with our partner network to find the right expedite transportation solution.',
      },
      {
        q: 'Do you offer team drivers for nonstop delivery?',
        a: 'Yes. For time-critical long-haul routes where every hour matters, ProExpress offers team driver service on our straight truck freight fleet. With two CDL drivers, the vehicle never stops — enabling continuous 24/7 expedited freight movement for coast-to-coast and multi-state overnight deliveries.',
      },
    ],
  },
  {
    category: 'Quotes, Booking & Tracking',
    questions: [
      {
        q: 'How do I request a quote?',
        a: 'You can request a free expedite freight quote two ways: call ProExpress directly at 414-324-9699 for an immediate over-the-phone quote in under 2 minutes, or submit our online Quote Request form and a logistics specialist will respond within minutes. We provide transparent, competitive pricing for all sprinter van shipping, cargo van delivery, and straight truck freight services.',
      },
      {
        q: 'How do I track my shipment?',
        a: 'Our full online tracking portal is currently in development. For real-time expedite transportation status, call our 24/7 dispatch team at 414-324-9699. Our dispatchers have live GPS visibility on every vehicle in the fleet and can provide an accurate ETA and delivery update at any time.',
      },
      {
        q: 'How quickly can you dispatch a vehicle?',
        a: 'ProExpress can dispatch a vehicle within 1–2 hours of your request in most service areas. Our regionally staged fleet of sprinter vans and straight trucks, combined with our 24/7 expedited freight dispatch operation, ensures industry-leading response times for any same-day freight delivery need.',
      },
    ],
  },
  {
    category: 'Industries & Compliance',
    questions: [
      {
        q: 'What industries do you serve?',
        a: 'ProExpress serves virtually every major industry requiring expedite transportation: Automotive (production parts, assemblies), Manufacturing (components, tooling), Healthcare (medical devices, pharmaceuticals), Retail (inventory replenishment), Construction (materials, equipment), Aerospace (precision parts), Energy (industrial components), and Technology (electronics, hardware). If your business has time-critical freight, our Milwaukee expedite carrier team can handle it.',
      },
      {
        q: 'Are your drivers licensed and insured?',
        a: 'Yes. All ProExpress drivers hold valid commercial driver\'s licenses (CDL) appropriate for their vehicle class. Our entire fleet carries comprehensive cargo and liability insurance. Every driver undergoes background checks, drug screening, and ongoing safety training. We maintain full DOT compliance across all sprinter van shipping and straight truck freight operations.',
      },
      {
        q: 'What makes ProExpress different from other carriers?',
        a: 'Three things set ProExpress apart as a Milwaukee expedite carrier: speed, reliability, and accountability. Unlike brokers, we use our own drivers and our own fleet for every cargo van delivery, sprinter van shipping, and straight truck freight run — giving you consistent quality and direct accountability. Our 99.8% on-time rate across 100,000+ same-day freight delivery runs speaks for itself. When you call ProExpress, a real dispatcher answers, a real driver is dispatched, and your freight arrives on time — guaranteed.',
      },
    ],
  },
]

const allFAQs = faqs.flatMap(cat => cat.questions)

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: allFAQs.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export default function FAQPage() {
  const [open, setOpen] = useState({})
  const toggle = (key) => setOpen(prev => ({ ...prev, [key]: !prev[key] }))

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* HERO */}
      <section className="bg-navy pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="w-14 h-14 bg-electric/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <HelpCircle className="w-7 h-7 text-electric" />
          </div>
          <h1 className="font-heading font-900 text-3xl sm:text-4xl md:text-5xl text-white mb-4">Expedite Transportation FAQ</h1>
          <p className="text-white/60 text-base sm:text-xl max-w-2xl mx-auto">Everything you need to know about expedite transportation, same-day freight delivery, sprinter van shipping, straight truck freight, and more.</p>
        </div>
      </section>

      {/* FAQ CONTENT */}
      <section className="py-16 bg-light-gray">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="space-y-10">
            {faqs.map((category, ci) => (
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
