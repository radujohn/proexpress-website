import Link from 'next/link'
import { Phone, Mail, MapPin, Clock, Truck, Facebook, Linkedin, Instagram } from 'lucide-react'

export default function Footer() {
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
            <p className="text-white/60 text-sm leading-relaxed mb-5">
              When speed is non-negotiable, trust ProExpress. 20+ years of expedite excellence across 48 states.
            </p>
            <a
              href="tel:4143249699"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-electric hover:bg-electric-dark text-white text-sm font-bold rounded-lg transition-colors"
            >
              <Phone className="w-4 h-4" />
              414-324-9699
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-700 text-white mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2.5">
              {[['Home', '/'], ['Services', '/services'], ['About Us', '/about'], ['Tracking', '/tracking'], ['FAQ', '/faq'], ['Contact', '/contact']].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-white/60 hover:text-electric text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading font-700 text-white mb-4 text-sm uppercase tracking-wider">Services</h3>
            <ul className="space-y-2.5">
              {[['Sprinter Van / Cargo Van', '/services'], ['Straight Truck', '/services'], ['Request a Quote', '/quote'], ['Shipment Tracking', '/tracking']].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-white/60 hover:text-electric text-sm transition-colors">
                    {label}
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
                <a href="tel:4143249699" className="flex items-start gap-2.5 text-white/60 hover:text-electric text-sm transition-colors">
                  <Phone className="w-4 h-4 mt-0.5 text-electric flex-shrink-0" />
                  414-324-9699
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-white/60 text-sm">
                <Mail className="w-4 h-4 mt-0.5 text-electric flex-shrink-0" />
                info@proexpress.com
              </li>
              <li className="flex items-start gap-2.5 text-white/60 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 text-electric flex-shrink-0" />
                1234 Industrial Dr,<br />Milwaukee, WI 53201
              </li>
              <li className="flex items-start gap-2.5 text-white/60 text-sm">
                <Clock className="w-4 h-4 mt-0.5 text-electric flex-shrink-0" />
                24 / 7 / 365 — Always Open
              </li>
            </ul>
            {/* Social */}
            <div className="flex items-center gap-3 mt-5">
              <a href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-lg bg-white/10 hover:bg-electric flex items-center justify-center transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-lg bg-white/10 hover:bg-electric flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-lg bg-white/10 hover:bg-electric flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-sm">&copy; 2025 ProExpress. All Rights Reserved.</p>
          <div className="flex items-center gap-4 text-white/40 text-sm">
            <Link href="/faq" className="hover:text-white/70 transition-colors">FAQ</Link>
            <span>|</span>
            <Link href="/contact" className="hover:text-white/70 transition-colors">Contact</Link>
            <span>|</span>
            <Link href="/quote" className="hover:text-white/70 transition-colors">Get a Quote</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
