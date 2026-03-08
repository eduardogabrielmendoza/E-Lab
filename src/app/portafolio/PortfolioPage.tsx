'use client'

import { useState } from 'react'
import portfolioData from '@/content/portfolio.json'
import { SlideUp, FadeIn, StaggerContainer, StaggerItem, PageTransition } from '@/components/animations'

export default function PortfolioPage() {
  const { hero, showcase, gallery } = portfolioData
  const [activeTab, setActiveTab] = useState(0)

  const placeholders = Array.from({ length: 18 }, (_, i) => i + 1)

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
              {showcase.sections.map((section, i) => (
                <div key={i} className="p-4 border border-brand-700 bg-brand-800/30">
                  <p className="text-sm text-brand-300 leading-relaxed">{section}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Gallery with tabs */}
      <section className="py-16 sm:py-24 bg-brand-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tabs */}
          <FadeIn className="flex flex-wrap justify-center gap-2 mb-12">
            {gallery.tabs.map((tab, i) => (
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
            {placeholders.map((item) => (
              <StaggerItem key={item}>
                <div className="break-inside-avoid mb-4 group cursor-pointer">
                  <div
                    className="relative overflow-hidden bg-brand-800 border border-brand-700 flex items-center justify-center hover:border-brand-500 transition-all duration-300"
                    style={{ aspectRatio: item % 3 === 0 ? '4/5' : item % 2 === 0 ? '4/3' : '16/10' }}
                  >
                    <svg className="w-10 h-10 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
    </PageTransition>
  )
}
