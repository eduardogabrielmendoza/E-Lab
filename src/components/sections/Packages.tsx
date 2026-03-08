'use client'

import Link from 'next/link'
import { SlideUp, StaggerContainer, StaggerItem } from '@/components/animations'
import { cn } from '@/lib/utils'

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Packages({ data }: { data: any }) {
  const packages = data

  return (
    <section id="paquetes" className="py-20 sm:py-28 bg-brand-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SlideUp className="text-center mb-14 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            {packages.title}
          </h2>
        </SlideUp>

        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto"
          staggerDelay={0.15}
        >
          {packages.items.map((pkg: any) => (
            <StaggerItem key={pkg.name}>
              <div
                className={cn(
                  'relative flex flex-col p-6 sm:p-8 border transition-all duration-300 hover:border-brand-300',
                  pkg.popular
                    ? 'border-white bg-brand-900 scale-[1.02] sm:scale-105'
                    : 'border-brand-700 bg-brand-900/50'
                )}
              >
                {/* Popular badge */}
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-brand-black text-xs font-bold px-4 py-1 tracking-wider">
                    MÁS POPULAR
                  </div>
                )}

                {/* Package header */}
                <div className="mb-6">
                  <h3 className="text-sm font-bold text-brand-300 tracking-widest">
                    {pkg.name}
                  </h3>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-4xl sm:text-5xl font-black text-white">
                      {pkg.price}
                    </span>
                    <span className="text-sm text-brand-400">USD</span>
                  </div>
                  <p className="mt-2 text-sm text-brand-400">{pkg.description}</p>
                </div>

                {/* Features */}
                <ul className="flex-1 space-y-3 mb-8">
                  {pkg.features.map((feature: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg className="w-4 h-4 text-white mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-brand-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href={pkg.cta.href}
                  className={cn(
                    'w-full py-3.5 text-center text-sm font-bold tracking-wider transition-all',
                    pkg.popular
                      ? 'bg-white text-brand-black hover:bg-brand-100'
                      : 'border border-brand-400 text-white hover:bg-white hover:text-brand-black'
                  )}
                >
                  {pkg.cta.label}
                </Link>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
