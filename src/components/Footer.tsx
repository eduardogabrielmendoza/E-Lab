'use client'

import Link from 'next/link'
import { FadeIn, SlideUp } from '@/components/animations'

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Footer({ data }: { data: any }) {
  const { footer } = data

  return (
    <footer className="bg-brand-900 border-t border-brand-700">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo & Description */}
          <FadeIn className="lg:col-span-1">
            <Link href="/" className="text-3xl font-black tracking-tighter text-white">
              {footer.logo.text}
            </Link>
            <p className="mt-4 text-brand-400 text-sm leading-relaxed">
              {footer.description}
            </p>
          </FadeIn>

          {/* Categories */}
          <SlideUp delay={0.1}>
            <h3 className="text-xs font-bold text-white tracking-widest mb-4">
              {footer.categories.title}
            </h3>
            <ul className="space-y-2.5">
              {footer.categories.links.map((link: any) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </SlideUp>

          {/* Menu */}
          <SlideUp delay={0.2}>
            <h3 className="text-xs font-bold text-white tracking-widest mb-4">
              {footer.menu.title}
            </h3>
            <ul className="space-y-2.5">
              {footer.menu.links.map((link: any) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </SlideUp>

          {/* Contact */}
          <SlideUp delay={0.3}>
            <h3 className="text-xs font-bold text-white tracking-widest mb-4">
              {footer.contact.title}
            </h3>
            <p className="text-sm text-brand-400 mb-2">
              {footer.contact.location}
            </p>
            <a
              href={`mailto:${footer.contact.email}`}
              className="text-sm text-brand-300 hover:text-white transition-colors"
            >
              {footer.contact.email}
            </a>
          </SlideUp>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-brand-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-brand-500">
            {footer.copyright}
          </p>
          <Link
            href="/admin/login"
            className="text-xs text-brand-600 hover:text-brand-400 transition-colors"
          >
            Accesibilidad
          </Link>
        </div>
      </div>
    </footer>
  )
}
