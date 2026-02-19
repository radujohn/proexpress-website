'use client'
import { Phone } from 'lucide-react'

export default function FloatingCallButton() {
  return (
    <a
      href="tel:4143249699"
      aria-label="Call ProExpress at 414-324-9699"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-electric hover:bg-electric-dark shadow-xl shadow-electric/40 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
    >
      <Phone className="w-6 h-6 text-white" />
      <span className="absolute right-16 bg-navy text-white text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        414-324-9699
      </span>
    </a>
  )
}
