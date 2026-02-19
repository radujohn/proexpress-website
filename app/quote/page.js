'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Phone, Send, CheckCircle2, Loader2 } from 'lucide-react'
import { useCmsContent } from '@/hooks/useCmsContent'

const defaultQuote = {
  heroTitle: 'Get a Free Expedite Freight Quote',
  heroSubtitle: 'Tell us about your time-critical shipment — sprinter van, cargo van, or straight truck — and a ProExpress logistics specialist will respond within minutes with a competitive quote.',
  sidebarTitle: 'Need It Faster?',
  sidebarSubtitle: 'Skip the form and talk to a dispatcher right now. We quote over the phone in under 2 minutes.',
  sidebarPhone: '414-324-9699',
  sidebarNote: 'Available 24/7/365 — including holidays',
}

const toTel = (phone) => 'tel:' + (phone || '').replace(/\D/g, '')

export default function QuotePage() {
  const [form, setForm] = useState({
    full_name: '', company_name: '', email: '', phone: '',
    pickup_location: '', delivery_location: '', service_type: '',
    freight_description: '', weight: '', pickup_date: '',
    delivery_deadline: '', additional_notes: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const cms = useCmsContent('quote_page', defaultQuote)
  const sidebarPhone = cms.sidebarPhone || defaultQuote.sidebarPhone
  const sidebarTel = toTel(sidebarPhone)

  const update = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) {
        setSuccess(true)
        setForm({ full_name: '', company_name: '', email: '', phone: '', pickup_location: '', delivery_location: '', service_type: '', freight_description: '', weight: '', pickup_date: '', delivery_deadline: '', additional_notes: '' })
      } else {
        setError(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Network error. Please call us directly.')
    } finally {
      setLoading(false)
    }
  }

  const inputCls = 'w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-electric/30 focus:border-electric text-base min-h-[48px] transition-colors'
  const labelCls = 'block text-sm font-semibold text-navy mb-1.5'

  return (
    <div className="min-h-screen bg-light-gray pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="font-heading font-900 text-3xl sm:text-4xl lg:text-5xl text-navy mb-3">{cms.heroTitle}</h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">{cms.heroSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FORM */}
          <div className="lg:col-span-2">
            {success ? (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
                <h2 className="font-heading font-800 text-2xl text-navy mb-2">Quote Request Received!</h2>
                <p className="text-gray-500 mb-6">Our team will reach out within minutes. For urgent needs, call us right now.</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a href={TEL} className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-electric text-white font-bold rounded-xl min-h-[48px] w-full sm:w-auto"><Phone className="w-4 h-4" />Call {PHONE}</a>
                  <button onClick={() => setSuccess(false)} className="px-6 py-3.5 border-2 border-navy text-navy font-bold rounded-xl hover:bg-navy hover:text-white transition-all min-h-[48px] w-full sm:w-auto">Submit Another</button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                {error && <div className="mb-5 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">{error}</div>}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className={labelCls}>Full Name *</label>
                    <input type="text" required value={form.full_name} onChange={update('full_name')} placeholder="John Smith" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Company Name</label>
                    <input type="text" value={form.company_name} onChange={update('company_name')} placeholder="Acme Corp" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Email Address *</label>
                    <input type="email" required value={form.email} onChange={update('email')} placeholder="john@company.com" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Phone Number *</label>
                    <input type="tel" required value={form.phone} onChange={update('phone')} placeholder="555-123-4567" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Pickup Location *</label>
                    <input type="text" required value={form.pickup_location} onChange={update('pickup_location')} placeholder="City, State or ZIP" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Delivery Location *</label>
                    <input type="text" required value={form.delivery_location} onChange={update('delivery_location')} placeholder="City, State or ZIP" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Service Type *</label>
                    <select required value={form.service_type} onChange={update('service_type')} className={inputCls + ' bg-white'}>
                      <option value="">Select a service...</option>
                      <option value="sprinter">Sprinter Van / Cargo Van</option>
                      <option value="straight_truck">Straight Truck</option>
                      <option value="unsure">Not Sure — Help Me Choose</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Freight Weight (lbs)</label>
                    <input type="text" value={form.weight} onChange={update('weight')} placeholder="e.g. 500 lbs" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Pickup Date</label>
                    <input type="date" value={form.pickup_date} onChange={update('pickup_date')} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Delivery Deadline</label>
                    <input type="date" value={form.delivery_deadline} onChange={update('delivery_deadline')} className={inputCls} />
                  </div>
                </div>

                <div className="mb-5">
                  <label className={labelCls}>Freight Description</label>
                  <input type="text" value={form.freight_description} onChange={update('freight_description')} placeholder="e.g. Automotive parts, medical supplies, etc." className={inputCls} />
                </div>

                <div className="mb-6">
                  <label className={labelCls}>Additional Notes</label>
                  <textarea value={form.additional_notes} onChange={update('additional_notes')} placeholder="Any special requirements, hazmat info, access restrictions..." rows={4} className={inputCls + ' resize-none min-h-[100px]'} />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-electric hover:bg-electric-dark disabled:opacity-50 text-white font-bold text-lg rounded-xl transition-all shadow-lg shadow-electric/25 flex items-center justify-center gap-2 min-h-[56px]"
                >
                  {loading ? <><Loader2 className="w-5 h-5 animate-spin" />Submitting...</> : <><Send className="w-5 h-5" />Request My Quote</>}
                </button>

                {/* Security Note */}
                <div className="mt-4 flex items-start gap-2.5 p-4 bg-light-gray rounded-xl border border-gray-100">
                  <span className="text-base leading-none mt-0.5 flex-shrink-0">🔒</span>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    <strong className="text-navy font-semibold">Your information is private and will never be shared.</strong>{' '}
                    We&apos;ll respond within 1 business hour — or call us now at{' '}
                    <a href="tel:4143249699" className="text-electric font-semibold hover:underline">414-324-9699</a>.
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* SIDEBAR */}
          <div className="space-y-5">
            <div className="bg-navy rounded-2xl p-6 text-center sticky top-24">
              <h3 className="font-heading font-800 text-lg text-white mb-2">{cms.sidebarTitle}</h3>
              <p className="text-white/60 text-sm mb-5">{cms.sidebarSubtitle}</p>
              <a
                href={sidebarTel}
                className="flex items-center justify-center gap-2 w-full py-4 bg-electric hover:bg-electric-dark text-white font-bold rounded-xl transition-all shadow-lg shadow-electric/30 min-h-[56px] text-lg"
              >
                <Phone className="w-5 h-5" />
                {sidebarPhone}
              </a>
              <p className="text-white/40 text-xs mt-3">{cms.sidebarNote}</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-heading font-700 text-navy mb-4 text-sm uppercase tracking-wider">What Happens Next?</h3>
              <ol className="space-y-3">
                {[
                  'We review your request immediately',
                  'A specialist calls or emails within minutes',
                  'We provide a firm, transparent price',
                  'Driver dispatched upon your approval',
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                    <span className="w-5 h-5 bg-electric text-white text-xs font-bold rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">{i+1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
