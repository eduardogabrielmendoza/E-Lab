'use client'

import Link from 'next/link'
import Image from 'next/image'
import { StaggerContainer, StaggerItem } from '@/components/animations'

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Categories({ data }: { data: any }) {
  const categories = data

  return (
    <section id="explorar" className="py-20 sm:py-28 bg-brand-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StaggerContainer className="text-center mb-12 sm:mb-16">
          <StaggerItem>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              {categories.title}
            </h2>
          </StaggerItem>
        </StaggerContainer>

        <StaggerContainer
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          staggerDelay={0.08}
        >
          {categories.items.map((item: any) => (
            <StaggerItem key={item.slug}>
              <Link href={`/${item.slug}`} className="group block">
                <div className="relative overflow-hidden bg-brand-900 border border-brand-700 hover:border-brand-400 transition-all duration-300">
                  {/* Image placeholder */}
                  <div className="aspect-[16/10] bg-brand-800 flex items-center justify-center relative overflow-hidden">
                    {item.image ? (
                      <Image src={item.image} alt={item.title} fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                    ) : categories.showPlaceholders !== false ? (
                      <svg className="w-12 h-12 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    ) : null}
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-6">
                    <h3 className="text-lg font-bold text-white tracking-wide group-hover:text-brand-100 transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-brand-400">
                      {item.description}
                    </p>
                    <span className="inline-block mt-4 text-xs font-bold text-brand-300 tracking-widest group-hover:text-white transition-colors">
                      VER MÁS →
                    </span>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
