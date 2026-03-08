'use client'

import { useState } from 'react'
import Image from 'next/image'
import { SlideUp, FadeIn, StaggerContainer, StaggerItem, PageTransition } from '@/components/animations'

interface PortfolioImage {
  url: string
  tag: string
  text: string
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function PortfolioPage({ data }: { data: any }) {
  const { hero, showcase, gallery } = data
  const [activeTab, setActiveTab] = useState(0)

  const allImages: PortfolioImage[] = (gallery.images || []).filter((img: any) => img && img.url)
  const tabs: string[] = gallery.tabs || []

  const filteredImages = activeTab === -1
    ? allImages
    : allImages.filter((img) => img.tag?.toUpperCase() === tabs[activeTab]?.toUpperCase())

  const displayImages = filteredImages.length > 0 ? filteredImages : []
  const showPlaceholders = gallery.showPlaceholders !== false
  const placeholderCount = displayImages.length === 0 && showPlaceholders ? 18 : 0

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative py-24 sm:py-32 bg-brand-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-900/50 to-brand-black" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SlideUp>
            <p className="text-sm font-bold text-brand-300 tracking-widest mb-4">PORTAFOLIO</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight">
              {hero.title}
            </h1>
          </SlideUp>
          <SlideUp delay={0.15}>
            <p className="mt-6 text-base sm:text-lg text-brand-400 max-w-3xl mx-auto leading-relaxed">
              {hero.subtitle}
            </p>
          </SlideUp>
        </div>
      </section>

      {/* Showcase description */}
      {showcase.visible !== false && (
        <section className="py-16 sm:py-20 bg-brand-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-6">
                {showcase.title}
              </h2>
              <p className="text-brand-400 leading-relaxed mb-8">
                {showcase.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {showcase.sections.map((section: string, i: number) => (
                  <div key={i} className="p-4 border border-brand-700 bg-brand-800/30">
                    <p className="text-sm text-brand-300 leading-relaxed">{section}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* Gallery with tabs */}
      <section className="py-16 sm:py-24 bg-brand-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tabs */}
          <FadeIn className="flex flex-wrap justify-center gap-2 mb-12">
            {tabs.map((tab: string, i: number) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={`px-4 py-2 text-xs font-bold tracking-wider transition-all border ${
                  activeTab === i
                    ? 'bg-white text-brand-black border-white'
                    : 'text-brand-400 border-brand-600 hover:border-brand-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </FadeIn>

          {/* Grid */}
          <StaggerContainer
            className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4"
            staggerDelay={0.04}
          >
            {displayImages.map((item, idx) => (
              <StaggerItem key={`img-${idx}`}>
                <div className="break-inside-avoid mb-4 group cursor-pointer">
                  <div
                    className="relative overflow-hidden bg-brand-800 border border-brand-700 flex items-center justify-center hover:border-brand-500 transition-all duration-300"
                    style={{ aspectRatio: idx % 3 === 0 ? '4/5' : idx % 2 === 0 ? '4/3' : '16/10' }}
                  >
                    <Image src={item.url} alt={item.text || `Portafolio ${idx + 1}`} fill className="object-cover" sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,25vw" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      {item.text && (
                        <p className="text-white text-sm font-medium p-4 w-full">{item.text}</p>
                      )}
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
            {Array.from({ length: placeholderCount }, (_, idx) => (
              <StaggerItem key={`ph-${idx}`}>
                <div className="break-inside-avoid mb-4">
                  <div
                    className="relative overflow-hidden bg-brand-800 border border-brand-700 flex items-center justify-center"
                    style={{ aspectRatio: idx % 3 === 0 ? '4/5' : idx % 2 === 0 ? '4/3' : '16/10' }}
                  >
                    <svg className="w-10 h-10 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </PageTransition>
  )
}
