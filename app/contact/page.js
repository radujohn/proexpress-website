'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, Loader2 } from 'lucide-react'

const PHONE = '414-324-9699'
const TEL = 'tel:4143249699'

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'ProExpress',
  '@id': 'https://proexpress.com',
  url: 'https://proexpress.com',
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
  openingHours: 'Mo-Su 00:00-23:59',
  description: 'ProExpress offers 24/7/365 expedite freight transportation across 48 US states.',
  priceRange: '$$',
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const update = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) {
        setSuccess(true)
        setForm({ name: '', email: '', phone: '', message: '' })
      } else {
        setError(data.error || 'Something went wrong.')
      }
    } catch {
      setError('Network error. Please call us directly at ' + PHONE)
    } finally {
      setLoading(false)
    }
  }

  const inputCls = 'w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-electric/30 focus:border-electric text-base min-h-[48px]'
  const labelCls = 'block text-sm font-semibold text-navy mb-1.5'

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />

      <div className="min-h-screen bg-light-gray pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="font-heading font-900 text-3xl sm:text-4xl lg:text-5xl text-navy mb-3">Contact ProExpress — 24/7 Expedite Freight Dispatch</h1>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">Our expedite transportation dispatch team is available 24 hours a day, 7 days a week, 365 days a year. Call us now or send a message for same-day freight delivery anywhere in the US.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* CONTACT FORM */}
            <div className="lg:col-span-2">
              {success ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                  </div>
                  <h2 className="font-heading font-800 text-2xl text-navy mb-2">Message Received!</h2>
                  <p className="text-gray-500 mb-5">We\'ll be in touch shortly. For urgent matters, call us now.</p>
                  <a href={TEL} className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-electric text-white font-bold rounded-xl min-h-[48px] w-full sm:w-auto">
                    <Phone className="w-4 h-4" />Call {PHONE}
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                  {error && <div className="mb-5 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">{error}</div>}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className={labelCls}>Your Name *</label>
                      <input required value={form.name} onChange={update('name')} placeholder="John Smith" className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Email Address *</label>
                      <input type="email" required value={form.email} onChange={update('email')} placeholder="john@company.com" className={inputCls} />
                    </div>
                    <div className="sm:col-span-2">
                      <label className={labelCls}>Phone Number</label>
                      <input type="tel" value={form.phone} onChange={update('phone')} placeholder="555-123-4567" className={inputCls} />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label className={labelCls}>Message *</label>
                    <textarea required value={form.message} onChange={update('message')} placeholder="Tell us how we can help you..." rows={5} className={inputCls + ' resize-none min-h-[120px]'} />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-electric hover:bg-electric-dark disabled:opacity-50 text-white font-bold text-lg rounded-xl transition-all shadow-lg shadow-electric/25 flex items-center justify-center gap-2 min-h-[56px]"
                  >
                    {loading ? <><Loader2 className="w-5 h-5 animate-spin" />Sending...</> : <><Send className="w-5 h-5" />Send Message</>}
                  </button>
                </form>
              )}
            </div>

            {/* INFO PANEL */}
            <div className="space-y-5">
              {/* Call CTA */}
              <div className="bg-navy rounded-2xl p-6 text-center">
                <h3 className="font-heading font-800 text-lg text-white mb-1">Call Us Directly</h3>
                <p className="text-white/60 text-sm mb-4">Our dispatch is always available — no hold times, no voicemail.</p>
                <a href={TEL} className="flex items-center justify-center gap-2 w-full py-4 bg-electric hover:bg-electric-dark text-white font-bold rounded-xl transition-all shadow-lg shadow-electric/30 min-h-[56px] text-lg">
                  <Phone className="w-5 h-5" />{PHONE}
                </a>
              </div>

              {/* Contact Details */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-electric mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-xs text-gray-400 mb-0.5 uppercase font-semibold tracking-wide">Phone</div>
                    <a href={TEL} className="text-navy font-semibold hover:text-electric transition-colors">{PHONE}</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-electric mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-xs text-gray-400 mb-0.5 uppercase font-semibold tracking-wide">Email</div>
                    <span className="text-navy font-semibold">info@proexpress.com</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-electric mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-xs text-gray-400 mb-0.5 uppercase font-semibold tracking-wide">Address</div>
                    <span className="text-navy font-semibold text-sm">1234 Industrial Dr<br />Milwaukee, WI 53201</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-electric mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-xs text-gray-400 mb-0.5 uppercase font-semibold tracking-wide">Hours</div>
                    <span className="text-navy font-semibold text-sm">24 Hours / 7 Days<br />365 Days a Year</span>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="rounded-2xl overflow-hidden border border-gray-200 bg-gray-100" style={{ height: 200 }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d93157.70744826024!2d-88.07664978779296!3d43.0388806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880502d7279cdc1b%3A0x7911d251b22a02b2!2sMilwaukee%2C%20WI!5e0!3m2!1sen!2sus!4v1718000000000!5m2!1sen!2sus"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="ProExpress Milwaukee Location"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
