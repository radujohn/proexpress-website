'use client'
import { useState, useEffect, useCallback } from 'react'
import { Save, Plus, Trash2, ChevronDown, CheckCircle2, Loader2, Settings, Home, Wrench, Users, HelpCircle, Globe, Navigation } from 'lucide-react'

// ─── Default content (mirrors the hardcoded values in each page) ──────────────

const DEFAULTS = {
  site_settings: {
    phone: '414-324-9699',
    email: 'info@proexpress.com',
    address: '1234 Industrial Dr, Milwaukee, WI 53201',
    hours: '24/7/365 — Always Open',
    facebook: '#',
    linkedin: '#',
    instagram: '#',
    companyTagline: 'When speed is non-negotiable, trust ProExpress. 20+ years of expedite excellence across 48 states.',
    copyright: '© 2025 ProExpress. All Rights Reserved.',
  },
  nav_links: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'About', href: '/about' },
    { label: 'Tracking', href: '/tracking' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact', href: '/contact' },
  ],
  navbar_content: {
    logoText: 'Express',
    phone: '414-324-9699',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Services', href: '/services' },
      { label: 'About', href: '/about' },
      { label: 'Tracking', href: '/tracking' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  footer_content: {
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
  },
  contact_page: {
    heroTitle: 'Contact ProExpress — 24/7 Expedite Freight Dispatch',
    heroSubtitle: 'Our expedite transportation dispatch team is available 24 hours a day, 7 days a week, 365 days a year. Call us now or send a message for same-day freight delivery anywhere in the US.',
    phone: '414-324-9699',
    email: 'info@proexpress.com',
    address: '1234 Industrial Dr\nMilwaukee, WI 53201',
    hours: '24 Hours / 7 Days\n365 Days a Year',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d93157.70744826024!2d-88.07664978779296!3d43.0388806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880502d7279cdc1b%3A0x7911d251b22a02b2!2sMilwaukee%2C%20WI!5e0!3m2!1sen!2sus!4v1718000000000!5m2!1sen!2sus',
  },
  quote_page: {
    heroTitle: 'Get a Free Expedite Freight Quote',
    heroSubtitle: 'Tell us about your time-critical shipment — sprinter van, cargo van, or straight truck — and a ProExpress logistics specialist will respond within minutes with a competitive quote.',
    sidebarTitle: 'Need It Faster?',
    sidebarSubtitle: 'Skip the form and talk to a dispatcher right now. We quote over the phone in under 2 minutes.',
    sidebarPhone: '414-324-9699',
    sidebarNote: 'Available 24/7/365 — including holidays',
  },
  home_hero: {
    badge: '24/7 Nationwide Expedite Service',
    title1: 'When Speed Is',
    title2: 'Non-Negotiable,',
    title3: 'Call ProExpress.',
    subtitle: "ProExpress is Milwaukee's trusted expedite carrier — providing 24/7 expedited freight service with sprinter vans and straight trucks. Same-day freight delivery and nationwide expedite trucking across all 48 states, dispatched in as little as 1–2 hours.",
    cta1: 'Get a Free Quote',
    cta2: 'Call 414-324-9699',
  },
  home_testimonials: [
    { name: 'Mike R.', company: 'Precision Auto Parts Co.', title: 'Plant Manager', quote: 'ProExpress handled our same-day freight delivery from Detroit to Chicago in under 6 hours. Their sprinter van shipping service is unmatched — direct, fast, and no terminal delays. Saved our production line.' },
    { name: 'Sarah K.', company: 'Midwest Manufacturing Inc.', title: 'Operations Director', quote: 'When our line was about to go down, we needed expedite transportation immediately. ProExpress dispatched a straight truck freight team within 90 minutes and delivered nonstop through the night. Saved us $40K in downtime.' },
    { name: 'Dr. James L.', company: 'Regional Medical Center', title: 'Supply Chain Manager', quote: "We rely on ProExpress for 24/7 expedited freight of medical supplies. Three years of flawless cargo van delivery across the Midwest. Their Milwaukee expedite carrier team is the most dependable we've worked with." },
  ],
  home_faqs: [
    { q: 'What is expedite transportation?', a: 'Expedite transportation is the urgent, time-critical movement of freight that cannot wait for standard shipping schedules. ProExpress specializes in same-day and next-day expedite delivery using sprinter vans and straight trucks.' },
    { q: 'How fast can ProExpress dispatch a vehicle?', a: 'ProExpress can dispatch a vehicle within 1–2 hours of booking in most service areas. We operate 24/7/365 with no holidays or weekends off.' },
    { q: 'Does ProExpress operate 24 hours a day?', a: 'Yes. ProExpress is available 24 hours a day, 7 days a week, 365 days a year including all holidays. Call 414-324-9699 anytime.' },
    { q: 'What states does ProExpress serve?', a: 'ProExpress serves all 48 contiguous United States with local, regional, and national expedite freight routes.' },
    { q: 'How do I get an expedite freight quote from ProExpress?', a: 'You can request a free quote online via our Quote Request page or call us directly at 414-324-9699 for an immediate response.' },
  ],
  home_cta: {
    title: 'Ready to Ship? Our 24/7 Expedited Freight Team Is Standing By.',
    subtitle: "Nationwide expedite trucking dispatched in 1–2 hours. Call Milwaukee's trusted expedite carrier now or request a quote online.",
    cta1: 'Get Your Free Quote Now',
    cta2: '414-324-9699',
  },
  services_page: {
    heroTitle: 'Expedite Freight Services Built for Speed',
    heroSubtitle: 'Sprinter van shipping, cargo van delivery, and straight truck freight — two specialized services with one mission: your time-critical freight arrives on schedule, every time.',
    sprinterTitle: 'Sprinter Van / Cargo Van',
    sprinterDesc: "Our sprinter van shipping and cargo van delivery service is engineered for time-critical freight that can't wait. ProExpress provides same-day freight delivery with a dedicated vehicle dispatched directly from pickup to destination — no freight terminals, no co-loading, no delays.",
    sprinterFeatures: [
      'Sprinter van shipping up to 2,500 lbs and 200 cu ft',
      'Same-day freight delivery — dispatch in 1–2 hours',
      'Cargo van delivery direct door-to-door, no terminals',
      'Local Milwaukee runs and cross-state regional routes',
      'Fuel-efficient, late-model sprinter van fleet',
      'Direct driver communication throughout your expedite',
      'Automotive parts, medical supplies, electronics, and more',
    ],
    straightTitle: 'Straight Truck',
    straightDesc: 'ProExpress straight truck freight service handles medium to large time-critical loads that demand expedite speed at scale. As a Milwaukee expedite carrier with nationwide expedite trucking capability, we deploy straight trucks for regional corridor hauls and full coast-to-coast runs — with team drivers available for nonstop 24/7 expedited freight delivery when every hour counts.',
    straightFeatures: [
      'Straight truck freight up to 10,000 lbs and 1,600 cu ft',
      'Team drivers for nonstop 24/7 expedited freight runs',
      'Nationwide expedite trucking across all 48 states',
      'Lift gate service available on equipped units',
      'Dedicated straight truck — your freight only, no co-loading',
      'Manufacturing, construction, retail, and aerospace loads',
      'Electronic logging for transparent, real-time delivery status',
    ],
    ctaTitle: 'Need It There Fast?',
    ctaSubtitle: 'Our dispatch team is standing by right now. Get your quote in minutes.',
  },
  about_page: {
    heroTitle: '20 Years of Delivering',
    heroTitleHighlight: 'On Our Promise',
    heroSubtitle: 'Built on reliability, driven by speed, and powered by a team that treats every shipment like it\'s their own.',
    storyTitle: 'Our Story',
    storyParagraphs: [
      "ProExpress was founded over 20 years ago with a single sprinter van and one unshakeable conviction: in expedite transportation, speed and reliability aren't luxuries — they're the product.",
      "Over two decades, we've built a large modern fleet of sprinter vans and straight trucks, a network of professional CDL drivers, and a 24/7 dispatch operation that never sleeps.",
      "Today, ProExpress is a family of expedite transportation professionals united by one purpose: when your business can't afford a delay, we show up. Every time. On time.",
    ],
    stats: [
      { stat: '20+', label: 'Years in Business' },
      { stat: '100K+', label: 'Deliveries Completed' },
      { stat: '24/7', label: 'Operations — Always On' },
      { stat: '48', label: 'States Covered' },
    ],
    valuesTitle: 'Our Mission & Values',
    valuesSubtitle: 'The principles that have guided every decision for 20 years — and will guide the next 20.',
    values: [
      { title: 'Mission-Driven', desc: 'Every shipment we handle represents a promise. Our mission is to be the most reliable expedite carrier in America, one delivery at a time.' },
      { title: 'Client-First Culture', desc: 'Our clients are not account numbers. We know your business, your timelines, and your challenges — and we build our service around you.' },
      { title: 'Excellence in Everything', desc: 'From how we answer the phone to how we deliver your freight, we hold ourselves to the highest standards in the industry.' },
      { title: 'A Team You Can Trust', desc: 'Our drivers are vetted, trained, and dedicated professionals. When ProExpress is on the job, you can rest easy.' },
    ],
    teamTitle: 'Meet Our Leadership',
    teamSubtitle: 'The experienced team behind 20 years of on-time performance.',
    team: [
      { name: 'Robert Johnson', title: 'CEO & Founder', bio: "20+ years building ProExpress from a one-van operation into a nationwide expedite carrier. Robert's vision drives everything we do.", initials: 'RJ' },
      { name: 'Lisa Martinez', title: 'VP of Operations', bio: 'With 15 years in fleet logistics, Lisa ensures every dispatch is optimized for speed, safety, and efficiency across our entire network.', initials: 'LM' },
      { name: 'David Chen', title: 'Director, Customer Relations', bio: 'David leads our client success team, ensuring every customer from first call to final delivery experiences the ProExpress difference.', initials: 'DC' },
    ],
  },
  faq_page: {
    heroTitle: 'Expedite Transportation FAQ',
    heroSubtitle: 'Everything you need to know about expedite transportation, same-day freight delivery, sprinter van shipping, straight truck freight, and more.',
    categories: [
      {
        category: 'Coverage & Service Area',
        questions: [
          { q: 'What areas do you serve?', a: 'ProExpress provides nationwide expedite trucking across all 48 contiguous United States.' },
          { q: 'Do you offer same-day delivery?', a: 'Yes — same-day freight delivery is our core specialty. ProExpress can dispatch within 1–2 hours of your request.' },
          { q: 'Are you available on weekends and holidays?', a: 'Absolutely. ProExpress operates 24 hours a day, 7 days a week, 365 days a year.' },
        ],
      },
      {
        category: 'Services & Fleet',
        questions: [
          { q: 'What is the difference between a Sprinter Van and a Straight Truck?', a: 'Sprinter van shipping handles loads up to 2,500 lbs; straight truck handles up to 10,000 lbs.' },
          { q: 'What is the maximum freight weight you can handle?', a: 'Sprinter van: up to 2,500 lbs. Straight truck: up to 10,000 lbs.' },
          { q: 'Do you offer team drivers for nonstop delivery?', a: 'Yes. For long-haul routes, we offer team driver service enabling continuous 24/7 movement.' },
        ],
      },
      {
        category: 'Quotes, Booking & Tracking',
        questions: [
          { q: 'How do I request a quote?', a: 'Call 414-324-9699 or submit our online Quote Request form. Response within minutes.' },
          { q: 'How do I track my shipment?', a: 'Online tracking portal is in development. For real-time status, call our 24/7 dispatch at 414-324-9699.' },
          { q: 'How quickly can you dispatch a vehicle?', a: 'ProExpress can dispatch within 1–2 hours of your request in most service areas.' },
        ],
      },
      {
        category: 'Industries & Compliance',
        questions: [
          { q: 'What industries do you serve?', a: 'Automotive, Manufacturing, Healthcare, Retail, Construction, Aerospace, Energy, and Technology.' },
          { q: 'Are your drivers licensed and insured?', a: 'Yes. All drivers hold valid CDL licenses. Full cargo and liability insurance on every shipment.' },
          { q: 'What makes ProExpress different from other carriers?', a: 'Speed, reliability, and accountability. Our own drivers, our own fleet — consistent quality and 99.8% on-time rate.' },
        ],
      },
    ],
  },
}

// ─── Reusable field components ────────────────────────────────────────────────

const inputCls = 'w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500'
const labelCls = 'block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1'

function Field({ label, value, onChange, type = 'text', rows, placeholder }) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      {rows ? (
        <textarea value={value} onChange={e => onChange(e.target.value)} rows={rows} placeholder={placeholder} className={inputCls + ' resize-y'} />
      ) : (
        <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={inputCls} />
      )}
    </div>
  )
}

function StringList({ label, items, onChange }) {
  const update = (i, val) => { const n = [...items]; n[i] = val; onChange(n) }
  const add = () => onChange([...items, ''])
  const remove = (i) => onChange(items.filter((_, idx) => idx !== i))
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className={labelCls}>{label}</label>
        <button onClick={add} className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-semibold">
          <Plus className="w-3 h-3" /> Add
        </button>
      </div>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2">
            <input value={item} onChange={e => update(i, e.target.value)} className={inputCls + ' flex-1'} />
            <button onClick={() => remove(i)} className="text-gray-300 hover:text-red-500 transition-colors flex-shrink-0">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Section Editors ──────────────────────────────────────────────────────────

function SiteSettingsEditor({ data, onChange }) {
  const set = (k) => (v) => onChange({ ...data, [k]: v })
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Field label="Phone Number" value={data.phone} onChange={set('phone')} placeholder="414-324-9699" />
      <Field label="Email" value={data.email} onChange={set('email')} />
      <Field label="Address (one line)" value={data.address} onChange={set('address')} />
      <Field label="Hours" value={data.hours} onChange={set('hours')} />
      <Field label="Facebook URL" value={data.facebook} onChange={set('facebook')} />
      <Field label="LinkedIn URL" value={data.linkedin} onChange={set('linkedin')} />
      <Field label="Instagram URL" value={data.instagram} onChange={set('instagram')} />
      <div className="sm:col-span-2">
        <Field label="Footer Tagline" value={data.companyTagline} onChange={set('companyTagline')} rows={2} />
      </div>
      <div className="sm:col-span-2">
        <Field label="Copyright Text" value={data.copyright} onChange={set('copyright')} placeholder="© 2025 ProExpress. All Rights Reserved." />
      </div>
    </div>
  )
}

function NavLinksEditor({ data, onChange }) {
  const update = (i, k, v) => { const n = data.map((x, idx) => idx === i ? { ...x, [k]: v } : x); onChange(n) }
  const add = () => onChange([...data, { label: '', href: '/' }])
  const remove = (i) => onChange(data.filter((_, idx) => idx !== i))
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-gray-500">Edit the navigation menu links shown in the header and mobile drawer.</p>
        <button onClick={add} className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-semibold whitespace-nowrap">
          <Plus className="w-3 h-3" /> Add Link
        </button>
      </div>
      <div className="space-y-2">
        {data.map((link, i) => (
          <div key={i} className="flex gap-2 items-center">
            <input value={link.label} onChange={e => update(i, 'label', e.target.value)} placeholder="Label" className={inputCls + ' w-32 flex-shrink-0'} />
            <input value={link.href} onChange={e => update(i, 'href', e.target.value)} placeholder="/path" className={inputCls + ' flex-1'} />
            <button onClick={() => remove(i)} className="text-gray-300 hover:text-red-500 flex-shrink-0">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

function HomeHeroEditor({ data, onChange }) {
  const set = (k) => (v) => onChange({ ...data, [k]: v })
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="sm:col-span-2"><Field label="Top Badge Text" value={data.badge} onChange={set('badge')} /></div>
      <Field label="Headline Line 1" value={data.title1} onChange={set('title1')} placeholder="When Speed Is" />
      <Field label="Headline Line 2 (blue)" value={data.title2} onChange={set('title2')} placeholder="Non-Negotiable," />
      <div className="sm:col-span-2"><Field label="Headline Line 3" value={data.title3} onChange={set('title3')} placeholder="Call ProExpress." /></div>
      <div className="sm:col-span-2"><Field label="Subtitle / Description" value={data.subtitle} onChange={set('subtitle')} rows={3} /></div>
      <Field label="Primary CTA Button" value={data.cta1} onChange={set('cta1')} placeholder="Get a Free Quote" />
      <Field label="Secondary CTA Button" value={data.cta2} onChange={set('cta2')} placeholder="Call 414-324-9699" />
    </div>
  )
}

function HomeCTAEditor({ data, onChange }) {
  const set = (k) => (v) => onChange({ ...data, [k]: v })
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="sm:col-span-2"><Field label="Headline" value={data.title} onChange={set('title')} rows={2} /></div>
      <div className="sm:col-span-2"><Field label="Subtitle" value={data.subtitle} onChange={set('subtitle')} rows={2} /></div>
      <Field label="Primary CTA Button" value={data.cta1} onChange={set('cta1')} />
      <Field label="Secondary CTA (phone display)" value={data.cta2} onChange={set('cta2')} />
    </div>
  )
}

function TestimonialsEditor({ data, onChange }) {
  const update = (i, k, v) => { const n = data.map((x, idx) => idx === i ? { ...x, [k]: v } : x); onChange(n) }
  const add = () => onChange([...data, { name: '', company: '', title: '', quote: '' }])
  const remove = (i) => onChange(data.filter((_, idx) => idx !== i))
  return (
    <div className="space-y-4">
      {data.map((t, i) => (
        <div key={i} className="border border-gray-200 rounded-xl p-4 relative">
          <button onClick={() => remove(i)} className="absolute top-3 right-3 text-gray-300 hover:text-red-500">
            <Trash2 className="w-4 h-4" />
          </button>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
            <Field label="Name" value={t.name} onChange={v => update(i, 'name', v)} />
            <Field label="Company" value={t.company} onChange={v => update(i, 'company', v)} />
            <Field label="Job Title" value={t.title} onChange={v => update(i, 'title', v)} />
          </div>
          <Field label="Quote" value={t.quote} onChange={v => update(i, 'quote', v)} rows={3} />
        </div>
      ))}
      <button onClick={add} className="w-full py-2.5 border-2 border-dashed border-gray-200 text-gray-400 hover:border-blue-400 hover:text-blue-500 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-colors">
        <Plus className="w-4 h-4" /> Add Testimonial
      </button>
    </div>
  )
}

function FAQListEditor({ data, onChange, label = 'FAQ Items' }) {
  const update = (i, k, v) => { const n = data.map((x, idx) => idx === i ? { ...x, [k]: v } : x); onChange(n) }
  const add = () => onChange([...data, { q: '', a: '' }])
  const remove = (i) => onChange(data.filter((_, idx) => idx !== i))
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className={labelCls}>{label}</span>
        <button onClick={add} className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-semibold">
          <Plus className="w-3 h-3" /> Add Q&A
        </button>
      </div>
      {data.map((item, i) => (
        <div key={i} className="border border-gray-200 rounded-xl p-4 relative">
          <button onClick={() => remove(i)} className="absolute top-3 right-3 text-gray-300 hover:text-red-500">
            <Trash2 className="w-4 h-4" />
          </button>
          <div className="space-y-2 pr-6">
            <Field label="Question" value={item.q} onChange={v => update(i, 'q', v)} />
            <Field label="Answer" value={item.a} onChange={v => update(i, 'a', v)} rows={3} />
          </div>
        </div>
      ))}
    </div>
  )
}

function ServicesEditor({ data, onChange }) {
  const set = (k) => (v) => onChange({ ...data, [k]: v })
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h4 className="text-sm font-bold text-gray-700 border-b pb-2">Hero Section</h4>
        <Field label="Page Title" value={data.heroTitle} onChange={set('heroTitle')} />
        <Field label="Page Subtitle" value={data.heroSubtitle} onChange={set('heroSubtitle')} rows={2} />
      </div>
      <div className="space-y-3">
        <h4 className="text-sm font-bold text-gray-700 border-b pb-2">Sprinter Van / Cargo Van</h4>
        <Field label="Service Title" value={data.sprinterTitle} onChange={set('sprinterTitle')} />
        <Field label="Description" value={data.sprinterDesc} onChange={set('sprinterDesc')} rows={4} />
        <StringList label="Feature Bullet Points" items={data.sprinterFeatures || []} onChange={set('sprinterFeatures')} />
      </div>
      <div className="space-y-3">
        <h4 className="text-sm font-bold text-gray-700 border-b pb-2">Straight Truck</h4>
        <Field label="Service Title" value={data.straightTitle} onChange={set('straightTitle')} />
        <Field label="Description" value={data.straightDesc} onChange={set('straightDesc')} rows={4} />
        <StringList label="Feature Bullet Points" items={data.straightFeatures || []} onChange={set('straightFeatures')} />
      </div>
      <div className="space-y-3">
        <h4 className="text-sm font-bold text-gray-700 border-b pb-2">Bottom CTA</h4>
        <Field label="CTA Title" value={data.ctaTitle} onChange={set('ctaTitle')} />
        <Field label="CTA Subtitle" value={data.ctaSubtitle} onChange={set('ctaSubtitle')} />
      </div>
    </div>
  )
}

function AboutEditor({ data, onChange }) {
  const set = (k) => (v) => onChange({ ...data, [k]: v })
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h4 className="text-sm font-bold text-gray-700 border-b pb-2">Hero Section</h4>
        <div className="grid sm:grid-cols-2 gap-3">
          <Field label="Headline Line 1" value={data.heroTitle} onChange={set('heroTitle')} />
          <Field label="Headline Line 2 (blue)" value={data.heroTitleHighlight} onChange={set('heroTitleHighlight')} />
        </div>
        <Field label="Hero Subtitle" value={data.heroSubtitle} onChange={set('heroSubtitle')} rows={2} />
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-bold text-gray-700 border-b pb-2">Company Story</h4>
        <Field label="Section Title" value={data.storyTitle} onChange={set('storyTitle')} />
        <div className="space-y-2">
          <label className={labelCls}>Story Paragraphs (one per box)</label>
          {(data.storyParagraphs || []).map((p, i) => (
            <div key={i} className="flex gap-2">
              <textarea value={p} onChange={e => { const n = [...data.storyParagraphs]; n[i] = e.target.value; set('storyParagraphs')(n) }} rows={3} className={inputCls + ' flex-1 resize-y'} />
              <button onClick={() => set('storyParagraphs')(data.storyParagraphs.filter((_, idx) => idx !== i))} className="text-gray-300 hover:text-red-500 flex-shrink-0 self-start mt-1">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button onClick={() => set('storyParagraphs')([...(data.storyParagraphs || []), ''])} className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-semibold">
            <Plus className="w-3 h-3" /> Add Paragraph
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-bold text-gray-700 border-b pb-2">Stats Bar (4 numbers)</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {(data.stats || []).map((s, i) => (
            <div key={i} className="flex gap-2">
              <div className="flex-1">
                <Field label="Number" value={s.stat} onChange={v => { const n = [...data.stats]; n[i] = { ...n[i], stat: v }; set('stats')(n) }} placeholder="20+" />
              </div>
              <div className="flex-1">
                <Field label="Label" value={s.label} onChange={v => { const n = [...data.stats]; n[i] = { ...n[i], label: v }; set('stats')(n) }} placeholder="Years in Business" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-bold text-gray-700 border-b pb-2">Mission & Values</h4>
        <div className="grid sm:grid-cols-2 gap-3">
          <Field label="Section Title" value={data.valuesTitle} onChange={set('valuesTitle')} />
          <Field label="Section Subtitle" value={data.valuesSubtitle} onChange={set('valuesSubtitle')} />
        </div>
        {(data.values || []).map((v, i) => (
          <div key={i} className="border border-gray-200 rounded-xl p-3 grid sm:grid-cols-2 gap-3">
            <Field label="Value Title" value={v.title} onChange={val => { const n = [...data.values]; n[i] = { ...n[i], title: val }; set('values')(n) }} />
            <Field label="Description" value={v.desc} onChange={val => { const n = [...data.values]; n[i] = { ...n[i], desc: val }; set('values')(n) }} />
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-bold text-gray-700 border-b pb-2">Leadership Team</h4>
        <div className="grid sm:grid-cols-2 gap-3">
          <Field label="Section Title" value={data.teamTitle} onChange={set('teamTitle')} />
          <Field label="Section Subtitle" value={data.teamSubtitle} onChange={set('teamSubtitle')} />
        </div>
        {(data.team || []).map((m, i) => (
          <div key={i} className="border border-gray-200 rounded-xl p-3 relative">
            <button onClick={() => set('team')(data.team.filter((_, idx) => idx !== i))} className="absolute top-2 right-2 text-gray-300 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
            <div className="grid sm:grid-cols-3 gap-3 pr-6">
              <Field label="Name" value={m.name} onChange={v => { const n = [...data.team]; n[i] = { ...n[i], name: v }; set('team')(n) }} />
              <Field label="Job Title" value={m.title} onChange={v => { const n = [...data.team]; n[i] = { ...n[i], title: v }; set('team')(n) }} />
              <Field label="Initials (avatar)" value={m.initials} onChange={v => { const n = [...data.team]; n[i] = { ...n[i], initials: v }; set('team')(n) }} />
              <div className="sm:col-span-3"><Field label="Bio" value={m.bio} onChange={v => { const n = [...data.team]; n[i] = { ...n[i], bio: v }; set('team')(n) }} rows={2} /></div>
            </div>
          </div>
        ))}
        <button onClick={() => set('team')([...(data.team || []), { name: '', title: '', bio: '', initials: '' }])} className="w-full py-2.5 border-2 border-dashed border-gray-200 text-gray-400 hover:border-blue-400 hover:text-blue-500 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-colors">
          <Plus className="w-4 h-4" /> Add Team Member
        </button>
      </div>
    </div>
  )
}

function FAQPageEditor({ data, onChange }) {
  const set = (k) => (v) => onChange({ ...data, [k]: v })

  const updateCategory = (ci, key, val) => {
    const n = data.categories.map((c, i) => i === ci ? { ...c, [key]: val } : c)
    set('categories')(n)
  }
  const updateQuestion = (ci, qi, key, val) => {
    const n = data.categories.map((c, i) => {
      if (i !== ci) return c
      return { ...c, questions: c.questions.map((q, j) => j === qi ? { ...q, [key]: val } : q) }
    })
    set('categories')(n)
  }
  const addQuestion = (ci) => {
    const n = data.categories.map((c, i) => i === ci ? { ...c, questions: [...c.questions, { q: '', a: '' }] } : c)
    set('categories')(n)
  }
  const removeQuestion = (ci, qi) => {
    const n = data.categories.map((c, i) => i === ci ? { ...c, questions: c.questions.filter((_, j) => j !== qi) } : c)
    set('categories')(n)
  }
  const addCategory = () => set('categories')([...data.categories, { category: 'New Category', questions: [] }])
  const removeCategory = (ci) => set('categories')(data.categories.filter((_, i) => i !== ci))

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-3">
        <Field label="Page Title" value={data.heroTitle} onChange={set('heroTitle')} />
        <Field label="Page Subtitle" value={data.heroSubtitle} onChange={set('heroSubtitle')} rows={2} />
      </div>
      {data.categories.map((cat, ci) => (
        <div key={ci} className="border border-gray-200 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <input value={cat.category} onChange={e => updateCategory(ci, 'category', e.target.value)} className={inputCls + ' flex-1 font-semibold'} placeholder="Category Name" />
            <button onClick={() => removeCategory(ci)} className="text-gray-300 hover:text-red-500 flex-shrink-0"><Trash2 className="w-4 h-4" /></button>
          </div>
          <div className="space-y-3 ml-3">
            {cat.questions.map((q, qi) => (
              <div key={qi} className="border border-gray-100 rounded-lg p-3 relative">
                <button onClick={() => removeQuestion(ci, qi)} className="absolute top-2 right-2 text-gray-300 hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
                <div className="pr-6 space-y-2">
                  <Field label="Question" value={q.q} onChange={v => updateQuestion(ci, qi, 'q', v)} />
                  <Field label="Answer" value={q.a} onChange={v => updateQuestion(ci, qi, 'a', v)} rows={3} />
                </div>
              </div>
            ))}
            <button onClick={() => addQuestion(ci)} className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-semibold">
              <Plus className="w-3 h-3" /> Add Question
            </button>
          </div>
        </div>
      ))}
      <button onClick={addCategory} className="w-full py-2.5 border-2 border-dashed border-gray-200 text-gray-400 hover:border-blue-400 hover:text-blue-500 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-colors">
        <Plus className="w-4 h-4" /> Add Category
      </button>
    </div>
  )
}

// ─── NEW: Navbar / Footer / Contact / Quote editors ──────────────────────────

function LinkListEditor({ label, items, onChange }) {
  const update = (i, k, v) => { const n = items.map((x, idx) => idx === i ? { ...x, [k]: v } : x); onChange(n) }
  const add = () => onChange([...items, { label: '', href: '/' }])
  const remove = (i) => onChange(items.filter((_, idx) => idx !== i))
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className={labelCls}>{label}</label>
        <button onClick={add} className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-semibold whitespace-nowrap">
          <Plus className="w-3 h-3" /> Add Link
        </button>
      </div>
      <div className="space-y-2">
        {items.map((link, i) => (
          <div key={i} className="flex gap-2 items-center">
            <input value={link.label} onChange={e => update(i, 'label', e.target.value)} placeholder="Label" className={inputCls + ' w-36 flex-shrink-0'} />
            <input value={link.href} onChange={e => update(i, 'href', e.target.value)} placeholder="/path" className={inputCls + ' flex-1'} />
            <button onClick={() => remove(i)} className="text-gray-300 hover:text-red-500 flex-shrink-0"><Trash2 className="w-4 h-4" /></button>
          </div>
        ))}
      </div>
    </div>
  )
}

function NavbarContentEditor({ data, onChange }) {
  const set = (k) => (v) => onChange({ ...data, [k]: v })
  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <h4 className="text-sm font-bold text-gray-700 border-b pb-2">Logo & Phone</h4>
        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>Logo Text (after &ldquo;Pro&rdquo;)</label>
            <input value={data.logoText} onChange={e => set('logoText')(e.target.value)} placeholder="Express" className={inputCls} />
            <p className="text-xs text-gray-400 mt-1">The logo always shows &ldquo;Pro&rdquo; + this text in blue.</p>
          </div>
          <Field label="Phone Number (displayed in header)" value={data.phone} onChange={set('phone')} placeholder="414-324-9699" />
        </div>
      </div>
      <div className="space-y-3">
        <h4 className="text-sm font-bold text-gray-700 border-b pb-2">Navigation Links</h4>
        <LinkListEditor label="Header & Mobile Menu Links" items={data.links || []} onChange={set('links')} />
      </div>
    </div>
  )
}

function FooterContentEditor({ data, onChange }) {
  const set = (k) => (v) => onChange({ ...data, [k]: v })
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h4 className="text-sm font-bold text-gray-700 border-b pb-2">Brand Column</h4>
        <Field label="Tagline / Description" value={data.tagline} onChange={set('tagline')} rows={2} />
        <Field label="Phone Number (footer)" value={data.phone} onChange={set('phone')} placeholder="414-324-9699" />
      </div>
      <div className="space-y-3">
        <h4 className="text-sm font-bold text-gray-700 border-b pb-2">Contact Info Column</h4>
        <div className="grid sm:grid-cols-2 gap-3">
          <Field label="Email" value={data.email} onChange={set('email')} />
          <Field label="Hours" value={data.hours} onChange={set('hours')} placeholder="24 / 7 / 365 — Always Open" />
        </div>
        <Field label="Address (displayed in footer)" value={data.address} onChange={set('address')} />
      </div>
      <div className="space-y-3">
        <h4 className="text-sm font-bold text-gray-700 border-b pb-2">Social Media Links</h4>
        <div className="grid sm:grid-cols-3 gap-3">
          <Field label="LinkedIn URL" value={data.linkedin} onChange={set('linkedin')} placeholder="https://linkedin.com/..." />
          <Field label="Facebook URL" value={data.facebook} onChange={set('facebook')} placeholder="https://facebook.com/..." />
          <Field label="Instagram URL" value={data.instagram} onChange={set('instagram')} placeholder="https://instagram.com/..." />
        </div>
      </div>
      <LinkListEditor label="Quick Links Column" items={data.quickLinks || []} onChange={set('quickLinks')} />
      <LinkListEditor label="Services Links Column" items={data.serviceLinks || []} onChange={set('serviceLinks')} />
      <div className="space-y-3">
        <h4 className="text-sm font-bold text-gray-700 border-b pb-2">Bottom Bar</h4>
        <Field label="Copyright Text" value={data.copyright} onChange={set('copyright')} placeholder="© 2025 ProExpress. All Rights Reserved." />
      </div>
    </div>
  )
}

function ContactPageEditor({ data, onChange }) {
  const set = (k) => (v) => onChange({ ...data, [k]: v })
  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <h4 className="text-sm font-bold text-gray-700 border-b pb-2">Page Header</h4>
        <Field label="Page Title" value={data.heroTitle} onChange={set('heroTitle')} />
        <Field label="Page Subtitle" value={data.heroSubtitle} onChange={set('heroSubtitle')} rows={2} />
      </div>
      <div className="space-y-3">
        <h4 className="text-sm font-bold text-gray-700 border-b pb-2">Contact Details (Info Panel)</h4>
        <div className="grid sm:grid-cols-2 gap-3">
          <Field label="Phone Number" value={data.phone} onChange={set('phone')} placeholder="414-324-9699" />
          <Field label="Email Address" value={data.email} onChange={set('email')} placeholder="info@proexpress.com" />
        </div>
        <Field label="Address (use \\n for line break)" value={data.address} onChange={set('address')} rows={2} placeholder={'1234 Industrial Dr\nMilwaukee, WI 53201'} />
        <Field label="Hours (use \\n for line break)" value={data.hours} onChange={set('hours')} rows={2} placeholder={'24 Hours / 7 Days\n365 Days a Year'} />
      </div>
      <div className="space-y-3">
        <h4 className="text-sm font-bold text-gray-700 border-b pb-2">Map Embed</h4>
        <Field label="Google Maps Embed URL" value={data.mapUrl} onChange={set('mapUrl')} rows={3} placeholder="https://www.google.com/maps/embed?pb=..." />
        <p className="text-xs text-gray-400">Get this from Google Maps → Share → Embed a map → copy the src URL only.</p>
      </div>
    </div>
  )
}

function QuotePageEditor({ data, onChange }) {
  const set = (k) => (v) => onChange({ ...data, [k]: v })
  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <h4 className="text-sm font-bold text-gray-700 border-b pb-2">Page Header</h4>
        <Field label="Page Title / Headline" value={data.heroTitle} onChange={set('heroTitle')} />
        <Field label="Page Subtitle" value={data.heroSubtitle} onChange={set('heroSubtitle')} rows={2} />
      </div>
      <div className="space-y-3">
        <h4 className="text-sm font-bold text-gray-700 border-b pb-2">Sidebar Call-to-Action</h4>
        <div className="grid sm:grid-cols-2 gap-3">
          <Field label="Sidebar Title" value={data.sidebarTitle} onChange={set('sidebarTitle')} placeholder="Need It Faster?" />
          <Field label="Sidebar Phone Number" value={data.sidebarPhone} onChange={set('sidebarPhone')} placeholder="414-324-9699" />
        </div>
        <Field label="Sidebar Description" value={data.sidebarSubtitle} onChange={set('sidebarSubtitle')} rows={2} />
        <Field label="Sidebar Note (small text below button)" value={data.sidebarNote} onChange={set('sidebarNote')} placeholder="Available 24/7/365 — including holidays" />
      </div>
    </div>
  )
}

// ─── Section config ────────────────────────────────────────────────────────────

const SECTIONS = [
  { key: 'site_settings',    label: 'Site Settings',       icon: Settings,    desc: 'Phone, email, address, social links, footer text' },
  { key: 'navbar_content',   label: 'Navbar',              icon: Navigation,  desc: 'Logo text, phone number & all navigation links' },
  { key: 'footer_content',   label: 'Footer',              icon: Globe,       desc: 'Tagline, contact info, social links, quick links, copyright' },
  { key: 'home_hero',        label: 'Home — Hero',         icon: Home,        desc: 'Hero headline, subtitle, and CTA buttons' },
  { key: 'home_cta',         label: 'Home — Bottom CTA',   icon: Home,        desc: 'Bottom call-to-action section' },
  { key: 'home_testimonials',label: 'Testimonials',        icon: Users,       desc: 'Client testimonial cards' },
  { key: 'home_faqs',        label: 'Home FAQs',           icon: HelpCircle,  desc: 'FAQ accordion on the home page' },
  { key: 'services_page',    label: 'Services Page',       icon: Wrench,      desc: 'Sprinter van and straight truck content' },
  { key: 'about_page',       label: 'About Us Page',       icon: Users,       desc: 'Story, stats, team, values' },
  { key: 'faq_page',         label: 'FAQ Page',            icon: HelpCircle,  desc: 'All FAQ categories and questions' },
  { key: 'contact_page',     label: 'Contact Page',        icon: Settings,    desc: 'Phone, email, address, hours, map embed URL' },
  { key: 'quote_page',       label: 'Quote Page',          icon: Wrench,      desc: 'Headline, subtitle and sidebar call-to-action' },
]

// ─── Main CmsTab export ────────────────────────────────────────────────────────

export default function CmsTab({ token }) {
  const [allData, setAllData] = useState({})
  const [activeSection, setActiveSection] = useState('site_settings')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [loadingAll, setLoadingAll] = useState(true)
  const [error, setError] = useState('')

  // Load all CMS sections on mount
  useEffect(() => {
    if (!token) return
    fetch('/api/admin/cms', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(json => {
        if (json.data) setAllData(json.data)
      })
      .catch(() => {})
      .finally(() => setLoadingAll(false))
  }, [token])

  const getCurrentData = useCallback(() => {
    return allData[activeSection] ?? DEFAULTS[activeSection]
  }, [allData, activeSection])

  const handleChange = useCallback((newData) => {
    setAllData(prev => ({ ...prev, [activeSection]: newData }))
  }, [activeSection])

  const handleSave = async () => {
    setSaving(true)
    setError('')
    setSaved(false)
    try {
      const res = await fetch(`/api/admin/cms/${activeSection}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ data: getCurrentData() }),
      })
      const json = await res.json()
      if (json.success) {
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      } else {
        setError(json.error || 'Save failed')
      }
    } catch {
      setError('Network error — please try again')
    } finally {
      setSaving(false)
    }
  }

  const activeConfig = SECTIONS.find(s => s.key === activeSection)

  const renderEditor = () => {
    const d = getCurrentData()
    switch (activeSection) {
      case 'site_settings':    return <SiteSettingsEditor    data={d} onChange={handleChange} />
      case 'navbar_content':   return <NavbarContentEditor   data={d} onChange={handleChange} />
      case 'footer_content':   return <FooterContentEditor   data={d} onChange={handleChange} />
      case 'home_hero':        return <HomeHeroEditor        data={d} onChange={handleChange} />
      case 'home_cta':         return <HomeCTAEditor         data={d} onChange={handleChange} />
      case 'home_testimonials':return <TestimonialsEditor    data={d} onChange={handleChange} />
      case 'home_faqs':        return <FAQListEditor         data={d} onChange={handleChange} label="Home Page FAQ Items" />
      case 'services_page':    return <ServicesEditor        data={d} onChange={handleChange} />
      case 'about_page':       return <AboutEditor           data={d} onChange={handleChange} />
      case 'faq_page':         return <FAQPageEditor         data={d} onChange={handleChange} />
      case 'contact_page':     return <ContactPageEditor     data={d} onChange={handleChange} />
      case 'quote_page':       return <QuotePageEditor       data={d} onChange={handleChange} />
      default: return <p className="text-gray-400 text-sm">Select a section from the left to start editing.</p>
    }
  }

  if (loadingAll) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-400">
        <Loader2 className="w-6 h-6 animate-spin mr-2" /> Loading content…
      </div>
    )
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-[600px]">
      {/* Sidebar */}
      <aside className="lg:w-60 lg:flex-shrink-0 border-b lg:border-b-0 lg:border-r border-gray-100 bg-gray-50">
        <div className="p-3 border-b border-gray-100 lg:block hidden">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Content Sections</p>
        </div>
        <nav className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-1 p-2 lg:p-2">
          {SECTIONS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => { setActiveSection(key); setSaved(false); setError('') }}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-left text-sm font-medium transition-all whitespace-nowrap lg:whitespace-normal flex-shrink-0 lg:flex-shrink w-auto lg:w-full ${
                activeSection === key
                  ? 'bg-white border border-gray-200 text-navy shadow-sm'
                  : 'text-gray-500 hover:bg-white hover:text-gray-700'
              }`}
            >
              <Icon className={`w-4 h-4 flex-shrink-0 ${activeSection === key ? 'text-blue-600' : 'text-gray-400'}`} />
              <span className="hidden sm:block">{label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Editor Pane */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Editor Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-white sticky top-[64px] z-10">
          <div>
            <h3 className="font-heading font-700 text-navy text-base">{activeConfig?.label}</h3>
            <p className="text-xs text-gray-400 mt-0.5">{activeConfig?.desc}</p>
          </div>
          <div className="flex items-center gap-3">
            {error && <span className="text-xs text-red-500">{error}</span>}
            {saved && (
              <span className="flex items-center gap-1 text-xs text-green-600 font-semibold">
                <CheckCircle2 className="w-4 h-4" /> Saved!
              </span>
            )}
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-bold rounded-lg transition-all shadow-sm"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {saving ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        </div>

        {/* Editor Body */}
        <div className="flex-1 p-5 overflow-y-auto">
          <div className="mb-3 p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-700">
            💡 <strong>Tip:</strong> Changes appear on the live site immediately after saving. Use your browser&apos;s refresh (Ctrl+R / Cmd+R) if you don&apos;t see updates right away.
          </div>
          {renderEditor()}
        </div>
      </div>
    </div>
  )
}
