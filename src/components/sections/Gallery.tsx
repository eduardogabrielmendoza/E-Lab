'use client'

import Image from 'next/image'
import { SlideUp, StaggerContainer, StaggerItem } from '@/components/animations'

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Gallery({ data }: { data: any }) {
  const gallery = data
  const images: string[] = gallery.images || []
  const placeholders = images.length > 0 ? images : Array.from({ length: 10 }, () => '')

  return (
    <section className="py-20 sm:py-28 bg-brand-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SlideUp className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            TRABAJOS RECIENTES
          </h2>
        </SlideUp>

        <StaggerContainer
          className="columns-1 sm:columns-2 lg:columns-3 gap-4"
          staggerDelay={0.06}
        >
          {placeholders.map((img, index) => (
            <StaggerItem key={index}>
              <div className="break-inside-avoid mb-4 group cursor-pointer">
                <div
                  className="relative overflow-hidden bg-brand-800 border border-brand-700 flex items-center justify-center hover:border-brand-500 transition-all duration-300"
                  style={{ aspectRatio: index % 3 === 0 ? '4/5' : index % 2 === 0 ? '4/3' : '16/10' }}
                >
                  {img ? (
                    <Image src={img} alt={`Trabajo ${index + 1}`} fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                  ) : (
                    <svg className="w-12 h-12 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  )}

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
