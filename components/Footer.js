'use client'
import Link from 'next/link'
import { Phone, Mail, MapPin, Clock, Truck, Facebook, Linkedin, Instagram } from 'lucide-react'
import { useCmsContent } from '@/hooks/useCmsContent'

const defaultFooter = {
  tagline: 'When speed is non-negotiable, trust ProExpress. 20+ years of expedite excellence across 48 states.',
  phone: '414-324-9699',
  email: 'info@proexpress.com',
  address: '1234 Industrial Dr, Milwaukee, WI 53201',
  hours: '24 / 7 / 365 — Always Open',
  quickLinks: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'About Us', href: '/about' },
    { label: 'Tracking', href: '/tracking' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact', href: '/contact' },
  ],
  serviceLinks: [
    { label: 'Sprinter Van / Cargo Van', href: '/services' },
    { label: 'Straight Truck', href: '/services' },
    { label: 'Request a Quote', href: '/quote' },
    { label: 'Shipment Tracking', href: '/tracking' },
  ],
  copyright: '© 2025 ProExpress. All Rights Reserved.',
  linkedin: '#',
  facebook: '#',
  instagram: '#',
}

const toTel = (phone) => 'tel:' + (phone || '').replace(/\D/g, '')

export default function Footer() {
  const cms = useCmsContent('footer_content', defaultFooter)
  const phone = cms.phone || defaultFooter.phone
  const email = cms.email || defaultFooter.email
  const address = cms.address || defaultFooter.address
  const hours = cms.hours || defaultFooter.hours
  const tagline = cms.tagline || defaultFooter.tagline
  const copyright = cms.copyright || defaultFooter.copyright
  const quickLinks = cms.quickLinks || defaultFooter.quickLinks
  const serviceLinks = cms.serviceLinks || defaultFooter.serviceLinks

  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-electric rounded-lg flex items-center justify-center">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading font-800 text-xl">
                Pro<span className="text-electric">Express</span>
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-5">{tagline}</p>
            <a
              href={toTel(phone)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-electric hover:bg-electric-dark text-white text-sm font-bold rounded-lg transition-colors"
            >
              <Phone className="w-4 h-4" />
              {phone}
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-700 text-white mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-white/60 hover:text-electric text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading font-700 text-white mb-4 text-sm uppercase tracking-wider">Services</h3>
            <ul className="space-y-2.5">
              {serviceLinks.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-white/60 hover:text-electric text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-700 text-white mb-4 text-sm uppercase tracking-wider">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a href={toTel(phone)} className="flex items-start gap-2.5 text-white/60 hover:text-electric text-sm transition-colors">
                  <Phone className="w-4 h-4 mt-0.5 text-electric flex-shrink-0" />
                  {phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-white/60 text-sm">
                <Mail className="w-4 h-4 mt-0.5 text-electric flex-shrink-0" />
                {email}
              </li>
              <li className="flex items-start gap-2.5 text-white/60 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 text-electric flex-shrink-0" />
                <span>{address}</span>
              </li>
              <li className="flex items-start gap-2.5 text-white/60 text-sm">
                <Clock className="w-4 h-4 mt-0.5 text-electric flex-shrink-0" />
                {hours}
              </li>
            </ul>
            {/* Social */}
            <div className="flex items-center gap-3 mt-5">
              <a href={cms.linkedin || '#'} aria-label="LinkedIn" className="w-9 h-9 rounded-lg bg-white/10 hover:bg-electric flex items-center justify-center transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href={cms.facebook || '#'} aria-label="Facebook" className="w-9 h-9 rounded-lg bg-white/10 hover:bg-electric flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href={cms.instagram || '#'} aria-label="Instagram" className="w-9 h-9 rounded-lg bg-white/10 hover:bg-electric flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-sm text-center sm:text-left">{copyright}</p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-white/40 text-sm">
            <Link href="/faq" className="hover:text-white/70 transition-colors">FAQ</Link>
            <span className="hidden sm:inline">|</span>
            <Link href="/contact" className="hover:text-white/70 transition-colors">Contact</Link>
            <span className="hidden sm:inline">|</span>
            <Link href="/quote" className="hover:text-white/70 transition-colors">Get a Quote</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
