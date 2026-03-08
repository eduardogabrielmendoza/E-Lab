'use client'

import Link from 'next/link'
import { SlideUp, FadeIn, PageTransition } from '@/components/animations'

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function OrderPage({ data }: { data: any }) {
  const { hero, form, cta } = data

  return (
    <PageTransition>
      {/* Hero + Form */}
      <section className="relative py-24 sm:py-32 bg-brand-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-900/50 to-brand-black" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left - Info */}
            <div>
              <SlideUp>
                <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                  {hero.title}
                </h1>
              </SlideUp>
              <SlideUp delay={0.1}>
                <p className="mt-6 text-brand-400 leading-relaxed">
                  {hero.description}
                </p>
              </SlideUp>
              <SlideUp delay={0.2}>
                <div className="mt-8 inline-block bg-brand-800 border border-brand-700 px-4 py-2">
                  <span className="text-xs text-brand-300 font-medium">{form.badge}</span>
                </div>
              </SlideUp>

              {/* Gallery placeholders */}
              <div className="mt-12 grid grid-cols-2 gap-3">
                {Array.from({ length: 4 }, (_, i) => (
                  <div key={i} className="aspect-[4/3] bg-brand-800 border border-brand-700 flex items-center justify-center">
                    <svg className="w-8 h-8 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Form */}
            <FadeIn delay={0.2}>
              <div className="bg-brand-900 border border-brand-700 p-6 sm:p-8">
                <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                  <input
                    type="text"
                    placeholder={form.fields.name}
                    className="w-full bg-brand-800 border border-brand-700 text-white px-4 py-3 text-sm placeholder:text-brand-500 focus:outline-none focus:border-brand-400 transition-colors"
                  />
                  <input
                    type="text"
                    placeholder={form.fields.country}
                    className="w-full bg-brand-800 border border-brand-700 text-white px-4 py-3 text-sm placeholder:text-brand-500 focus:outline-none focus:border-brand-400 transition-colors"
                  />
                  <input
                    type="email"
                    placeholder={form.fields.email}
                    className="w-full bg-brand-800 border border-brand-700 text-white px-4 py-3 text-sm placeholder:text-brand-500 focus:outline-none focus:border-brand-400 transition-colors"
                  />
                  <button
                    type="submit"
                    className="w-full bg-white text-brand-black py-4 text-sm font-bold tracking-wider hover:bg-brand-100 transition-colors"
                  >
                    {form.submitLabel}
                  </button>
                </form>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Big gallery */}
      <section className="py-16 sm:py-24 bg-brand-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {Array.from({ length: 10 }, (_, i) => (
              <div key={i} className="aspect-[4/3] bg-brand-800 border border-brand-700 flex items-center justify-center">
                <svg className="w-8 h-8 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 bg-brand-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SlideUp>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {cta.title}
            </h2>
            <p className="mt-4 text-brand-400">{cta.description}</p>
            <Link href={cta.button.href} className="inline-block mt-8 bg-white text-brand-black px-10 py-4 text-sm font-bold tracking-wider hover:bg-brand-100 transition-all">
              {cta.button.label}
            </Link>
          </SlideUp>
        </div>
      </section>
    </PageTransition>
  )
}
