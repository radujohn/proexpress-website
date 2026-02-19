'use client'
import { useEffect, useState } from 'react'
import Script from 'next/script'

export default function GoogleAnalytics() {
  const [gaEnabled, setGaEnabled] = useState(false)
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

  useEffect(() => {
    if (!measurementId) return

    // Check if already consented
    try {
      const consent = localStorage.getItem('ga_consent')
      if (consent === 'accepted') {
        setGaEnabled(true)
      }
    } catch {}

    // Listen for consent events from CookieConsentBanner
    const handleConsent = () => setGaEnabled(true)
    const handleRevoke = () => setGaEnabled(false)
    window.addEventListener('ga_consent_accepted', handleConsent)
    window.addEventListener('ga_consent_declined', handleRevoke)

    return () => {
      window.removeEventListener('ga_consent_accepted', handleConsent)
      window.removeEventListener('ga_consent_declined', handleRevoke)
    }
  }, [measurementId])

  if (!gaEnabled || !measurementId) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', { page_path: window.location.pathname });
        `}
      </Script>
    </>
  )
}
