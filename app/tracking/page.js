'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Phone, Search, Package, CheckCircle2, Clock, Truck } from 'lucide-react'

const PHONE = '414-324-9699'
const TEL = 'tel:4143249699'

export default function TrackingPage() {
  const [trackingNum, setTrackingNum] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (trackingNum.trim()) setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-light-gray">
      <div className="pt-28 pb-20 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-electric/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <Package className="w-8 h-8 text-electric" />
            </div>
            <h1 className="font-heading font-900 text-3xl sm:text-4xl text-navy mb-3">Track Your Expedite Shipment</h1>
            <p className="text-gray-500 text-lg">Enter your ProExpress tracking number below for shipment status, or call us 24/7 for an immediate update from dispatch.</p>
          </div>

          {/* Tracking Form */}
          {!submitted ? (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
              <label className="block text-navy font-semibold mb-2">Tracking Number</label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={trackingNum}
                  onChange={e => setTrackingNum(e.target.value)}
                  placeholder="e.g. PX-2025-0012345"
                  className="flex-1 px-4 py-3.5 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-electric/30 focus:border-electric text-base min-h-[48px]"
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 bg-electric hover:bg-electric-dark text-white font-bold rounded-xl transition-colors flex items-center gap-2 min-h-[48px]"
                >
                  <Search className="w-4 h-4" />
                  Track
                </button>
              </div>
            </form>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
              <div className="flex items-center gap-3 mb-6 pb-5 border-b border-gray-100">
                <Package className="w-6 h-6 text-electric" />
                <div>
                  <div className="font-semibold text-navy">Tracking #{trackingNum}</div>
                  <div className="text-sm text-gray-400">Last updated: {new Date().toLocaleDateString()}</div>
                </div>
                <span className="ml-auto px-3 py-1 bg-yellow-50 text-yellow-600 text-xs font-bold rounded-full border border-yellow-200">
                  Portal Coming Soon
                </span>
              </div>
              <div className="space-y-4 mb-6">
                {[
                  { icon: CheckCircle2, label: 'Order Received', status: 'complete', time: 'Confirmed' },
                  { icon: Truck, label: 'Driver Dispatched', status: 'complete', time: 'In Progress' },
                  { icon: Clock, label: 'In Transit', status: 'active', time: 'Estimated' },
                  { icon: Package, label: 'Delivered', status: 'pending', time: 'Pending' },
                ].map((step, i) => (
                  <div key={i} className={`flex items-center gap-3 p-3 rounded-xl ${
                    step.status === 'complete' ? 'bg-green-50' :
                    step.status === 'active' ? 'bg-electric/5 border border-electric/20' :
                    'bg-gray-50 opacity-50'
                  }`}>
                    <step.icon className={`w-5 h-5 ${
                      step.status === 'complete' ? 'text-green-500' :
                      step.status === 'active' ? 'text-electric' :
                      'text-gray-300'
                    }`} />
                    <span className={`font-medium text-sm ${
                      step.status === 'pending' ? 'text-gray-400' : 'text-navy'
                    }`}>{step.label}</span>
                    <span className="ml-auto text-xs text-gray-400">{step.time}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => { setSubmitted(false); setTrackingNum('') }} className="text-sm text-electric hover:underline">Track another shipment</button>
            </div>
          )}

          {/* Call to action panel */}
          <div className="bg-navy rounded-2xl p-7 text-center">
            <div className="w-12 h-12 bg-electric/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Phone className="w-6 h-6 text-electric" />
            </div>
            <h3 className="font-heading font-800 text-xl text-white mb-2">Need Real-Time Status?</h3>
            <p className="text-white/60 text-sm mb-5">
              Our online tracking portal is coming soon. For immediate shipment status, call our 24/7 dispatch team directly.
            </p>
            <a
              href={TEL}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-electric hover:bg-electric-dark text-white font-bold rounded-xl transition-all shadow-lg shadow-electric/30 min-h-[48px]"
            >
              <Phone className="w-5 h-5" />
              Call Now: {PHONE}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
