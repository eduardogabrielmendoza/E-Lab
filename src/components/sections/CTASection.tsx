'use client'

import Link from 'next/link'
import { SlideUp } from '@/components/animations'

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function CTASection({ data }: { data: any }) {
  const cta = data

  return (
    <section className="py-20 sm:py-28 bg-brand-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-800/30 via-transparent to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <SlideUp>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            {cta.title}
          </h2>
        </SlideUp>
        <SlideUp delay={0.1}>
          <p className="mt-6 text-base sm:text-lg text-brand-300 max-w-2xl mx-auto">
            {cta.description}
          </p>
        </SlideUp>
        <SlideUp delay={0.2}>
          <Link
            href={cta.button.href}
            className="inline-block mt-8 bg-white text-brand-black px-10 py-4 text-sm font-bold tracking-wider hover:bg-brand-100 transition-all hover:scale-105"
          >
            {cta.button.label}
          </Link>
        </SlideUp>
      </div>
    </section>
  )
}
