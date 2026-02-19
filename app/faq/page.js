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
      { q: 'What areas do you serve?', a: 'ProExpress serves all 48 contiguous United States. From our Milwaukee, WI headquarters, we dispatch drivers for local runs throughout Wisconsin and Illinois, regional hauls across the Midwest, and nationwide coast-to-coast deliveries. No matter where your freight needs to go within the continental US, we can get it there.' },
      { q: 'Do you offer same-day delivery?', a: 'Yes — same-day delivery is our specialty. ProExpress can dispatch a vehicle within 30–90 minutes of your request, making same-day delivery possible for the vast majority of routes. For longer interstate routes, we utilize team drivers who alternate driving shifts to ensure nonstop, around-the-clock transit.' },
      { q: 'Are you available on weekends and holidays?', a: 'Absolutely. ProExpress operates 24 hours a day, 7 days a week, 365 days a year — including every weekend, holiday, and overnight. Our dispatch team is always staffed with live people who are ready to take your call and get a driver moving immediately.' },
    ],
  },
  {
    category: 'Services & Fleet',
    questions: [
      { q: 'What is the difference between a Sprinter Van and a Straight Truck?', a: 'A Sprinter Van or Cargo Van is ideal for smaller, time-critical loads up to approximately 2,500 lbs and 200 cubic feet. It is more fuel-efficient, maneuverable in urban environments, and typically faster for regional routes. A Straight Truck handles much larger freight — up to 10,000 lbs and 1,600 cubic feet — making it the right choice for medium to large shipments that need expedite speed at a larger scale.' },
      { q: 'What is the maximum freight weight you can handle?', a: 'Our Sprinter Vans handle loads up to approximately 2,500 lbs, while our Straight Trucks can accommodate freight up to 10,000 lbs. For loads exceeding these limits, please contact us directly at 414-324-9699 and we will work with our partner network to find the right solution for your specific freight needs.' },
      { q: 'Do you offer team drivers for nonstop delivery?', a: 'Yes. For time-critical long-haul routes where every hour counts, we offer team driver service on our Straight Trucks. With two drivers, the vehicle never stops — one drives while the other rests — enabling continuous 24-hour transit. This is especially valuable for coast-to-coast or multi-state overnight deliveries.' },
    ],
  },
  {
    category: 'Quotes, Booking & Tracking',
    questions: [
      { q: 'How do I request a quote?', a: 'You have two easy options. First, you can call us directly at 414-324-9699 for an instant quote over the phone — our dispatch team can provide pricing in under 2 minutes. Second, you can submit our online Quote Request form at any time and a logistics specialist will respond within minutes with a competitive, transparent price.' },
      { q: 'How do I track my shipment?', a: 'Our full online tracking portal is currently in development. In the meantime, you can get real-time shipment status by calling our dispatch team directly at 414-324-9699. Our dispatchers have live GPS visibility on every vehicle in our fleet and can give you an accurate ETA at any time.' },
      { q: 'How quickly can you dispatch a vehicle?', a: 'ProExpress prides itself on industry-leading response times. In most cases, we can have a driver on-site at your pickup location within 30 to 90 minutes of your call. Our regionally distributed fleet and 24/7 dispatch operation make this possible regardless of time of day or day of week.' },
    ],
  },
  {
    category: 'Industries & Compliance',
    questions: [
      { q: 'What industries do you serve?', a: 'ProExpress serves businesses across virtually every major industry, including Automotive (production parts, assemblies), Manufacturing (components, tooling), Healthcare (medical devices, pharmaceuticals, supplies), Retail (inventory replenishment, urgent stock), Construction (materials, equipment), Aerospace (precision parts), Energy (industrial components), and Technology (electronics, equipment). If your business has time-critical freight, we can help.' },
      { q: 'Are your drivers licensed and insured?', a: 'Yes — absolutely. All ProExpress drivers hold valid commercial driver\'s licenses (CDL) appropriate for the vehicles they operate. Our entire fleet carries comprehensive cargo and liability insurance. Every driver undergoes background checks, drug screening, and ongoing safety training. We maintain full DOT compliance across all operations.' },
      { q: 'What makes ProExpress different from other carriers?', a: 'Three things set us apart: speed, reliability, and accountability. Unlike brokers who outsource to unknown carriers, ProExpress uses our own drivers and our own fleet — giving you consistent quality and direct accountability. We\'ve been doing this for 20+ years and have built our reputation on a 99.8% on-time delivery rate. When you call ProExpress, a real dispatcher answers, a real driver is dispatched, and your freight gets there on time — guaranteed.' },
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
          <h1 className="font-heading font-900 text-3xl sm:text-4xl md:text-5xl text-white mb-4">Frequently Asked Questions</h1>
          <p className="text-white/60 text-base sm:text-xl max-w-2xl mx-auto">Everything you need to know about ProExpress expedite transportation services.</p>
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
