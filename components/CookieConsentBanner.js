'use client'
import { useState, useEffect } from 'react'

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const consent = localStorage.getItem('ga_consent')
      if (!consent) {
        // Small delay so it doesn't flash on initial paint
        const timer = setTimeout(() => setVisible(true), 1200)
        return () => clearTimeout(timer)
      }
    } catch {
      setVisible(true)
    }
  }, [])

  const handleAccept = () => {
    try {
      localStorage.setItem('ga_consent', 'accepted')
    } catch {}
    window.dispatchEvent(new Event('ga_consent_accepted'))
    setVisible(false)
  }

  const handleDecline = () => {
    try {
      localStorage.setItem('ga_consent', 'declined')
    } catch {}
    window.dispatchEvent(new Event('ga_consent_declined'))
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-50 px-4 py-3 sm:py-4"
      style={{ background: 'rgba(10,15,44,0.97)', backdropFilter: 'blur(8px)', borderTop: '1px solid rgba(0,102,255,0.2)' }}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6">
        <p className="text-white/70 text-xs sm:text-sm leading-relaxed text-center sm:text-left">
          We use cookies to improve your experience and analyze site traffic.{' '}
          <span className="text-white/50">No data is sold to third parties.</span>
        </p>
        <div className="flex items-center gap-4 flex-shrink-0">
          <button
            onClick={handleDecline}
            className="text-white/40 hover:text-white/70 text-xs sm:text-sm transition-colors underline underline-offset-2"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="px-5 py-2 text-xs sm:text-sm font-bold text-white rounded-lg transition-all hover:opacity-90 active:scale-95"
            style={{ background: '#0066FF' }}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
