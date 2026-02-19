'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Phone, Menu, X, Truck } from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Tracking', href: '/tracking' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-navy shadow-lg shadow-black/20' : 'bg-navy/90 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group" onClick={() => setMobileOpen(false)}>
              <div className="w-9 h-9 bg-electric rounded-lg flex items-center justify-center flex-shrink-0">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading font-900 text-xl text-white">
                Pro<span className="text-electric">Express</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-white/80 hover:text-white hover:text-electric transition-colors duration-200 relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-electric scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
                </Link>
              ))}
            </nav>

            {/* Desktop Right */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="tel:4143249699"
                className="flex items-center gap-2 text-sm font-semibold text-electric hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
                414-324-9699
              </a>
              <Link
                href="/quote"
                className="px-5 py-2.5 bg-electric hover:bg-electric-dark text-white text-sm font-bold rounded-lg transition-colors duration-200 shadow-lg shadow-electric/25"
              >
                Get a Quote
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden p-2 text-white rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-80 max-w-[90vw] bg-navy shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-5 border-b border-white/10">
            <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
              <div className="w-8 h-8 bg-electric rounded-lg flex items-center justify-center">
                <Truck className="w-4 h-4 text-white" />
              </div>
              <span className="font-heading font-800 text-white text-lg">
                Pro<span className="text-electric">Express</span>
              </span>
            </Link>
            <button onClick={() => setMobileOpen(false)} className="p-2 text-white/70 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Links */}
          <nav className="flex-1 overflow-y-auto py-6 px-5 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center px-4 py-3.5 text-white/80 hover:text-white hover:bg-electric/10 rounded-xl font-medium transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Drawer Footer CTAs */}
          <div className="p-5 border-t border-white/10 space-y-3">
            <a
              href="tel:4143249699"
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-colors min-h-[48px]"
            >
              <Phone className="w-5 h-5 text-electric" />
              Call 414-324-9699
            </a>
            <Link
              href="/quote"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center w-full py-3.5 bg-electric hover:bg-electric-dark text-white font-bold rounded-xl transition-colors shadow-lg shadow-electric/30 min-h-[48px]"
            >
              Get a Free Quote
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
