'use client'

import { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { SlideUp, FadeIn, PageTransition } from '@/components/animations'

interface PortfolioImage {
  url: string
  tag: string
  text: string
  colorUrl?: string
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function PortfolioPage({ data }: { data: any }) {
  const { hero, showcase, gallery } = data
  const [activeTab, setActiveTab] = useState(0)
  const [lightbox, setLightbox] = useState<{ url: string; text: string } | null>(null)
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  const allImages: PortfolioImage[] = (gallery.images || []).filter((img: any) => img && img.url)
  const tabs: string[] = gallery.tabs || []

  const filteredImages = activeTab === -1
    ? allImages
    : allImages.filter((img) => img.tag?.toUpperCase() === tabs[activeTab]?.toUpperCase())

  const displayImages = filteredImages.length > 0 ? filteredImages : []
  const showPlaceholders = gallery.showPlaceholders !== false
  const placeholderCount = displayImages.length === 0 && showPlaceholders ? 12 : 0

  const openLightbox = useCallback((url: string, text: string) => {
    setLightbox({ url, text })
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }, [])

  const closeLightbox = useCallback(() => {
    setLightbox(null)
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }, [])

  useEffect(() => {
    if (!lightbox) return
    document.body.style.overflow = 'hidden'
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') closeLightbox()
    }
    function onWheel(e: WheelEvent) {
      e.preventDefault()
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('wheel', onWheel, { passive: false })
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('wheel', onWheel)
    }
  }, [lightbox, closeLightbox])

  function handleWheel(e: React.WheelEvent) {
    e.preventDefault()
    setZoom((z) => {
      const delta = e.deltaY > 0 ? -0.1 : 0.1
      return Math.min(Math.max(z + delta, 0.5), 5)
    })
  }

  function handleMouseDown(e: React.MouseEvent) {
    e.preventDefault()
    setDragging(true)
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y })
  }

  function handleMouseMove(e: React.MouseEvent) {
    if (!dragging) return
    const dx = e.clientX - dragStart.x
    const dy = e.clientY - dragStart.y
    setPan((prev) => ({
      x: prev.x + (dx - prev.x) * 0.3,
      y: prev.y + (dy - prev.y) * 0.3,
    }))
  }

  function handleMouseUp() {
    setDragging(false)
  }

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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {displayImages.map((item, idx) => (
              <FadeIn key={`img-${idx}`}>
                <div className="group relative">
                  <div
                    className="relative overflow-hidden bg-brand-800 border border-brand-700 flex items-center justify-center hover:border-brand-500 transition-all duration-300 cursor-pointer"
                    style={{ aspectRatio: '16/9' }}
                    onClick={() => openLightbox(item.url, item.text || '')}
                  >
                    <Image
                      src={item.url}
                      alt={item.text || `Portafolio ${idx + 1}`}
                      fill
                      className="object-contain p-2"
                      sizes="(max-width:1024px) 100vw,50vw"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      {item.text && (
                        <p className="text-white text-sm font-medium p-4 w-full">{item.text}</p>
                      )}
                    </div>
                  </div>
                  {/* Action buttons */}
                  <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    {/* Zoom / open button */}
                    <button
                      onClick={(e) => { e.stopPropagation(); openLightbox(item.url, item.text || '') }}
                      className="w-8 h-8 bg-black/70 backdrop-blur-sm border border-brand-600 flex items-center justify-center text-brand-300 hover:text-white hover:border-brand-400 transition-colors"
                      title="Ver imagen"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </button>
                    {/* Color version button — only if colorUrl exists */}
                    {item.colorUrl && (
                      <button
                        onClick={(e) => { e.stopPropagation(); openLightbox(item.colorUrl!, item.text ? `${item.text} (Color)` : 'Versión a color') }}
                        className="w-8 h-8 bg-black/70 backdrop-blur-sm border border-brand-600 flex items-center justify-center text-brand-300 hover:text-white hover:border-brand-400 transition-colors"
                        title="Ver versión a color"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </FadeIn>
            ))}
            {Array.from({ length: placeholderCount }, (_, idx) => (
              <FadeIn key={`ph-${idx}`}>
                <div
                  className="relative overflow-hidden bg-brand-800 border border-brand-700 flex items-center justify-center"
                  style={{ aspectRatio: '16/9' }}
                >
                  <svg className="w-10 h-10 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox with zoom */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-50 w-10 h-10 bg-brand-800/80 border border-brand-600 flex items-center justify-center text-white hover:bg-brand-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Zoom controls */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-brand-800/80 border border-brand-600 px-4 py-2">
            <button onClick={(e) => { e.stopPropagation(); setZoom((z) => Math.max(z - 0.25, 0.5)) }} className="text-white hover:text-brand-300 text-lg font-bold">−</button>
            <span className="text-brand-400 text-xs min-w-[3rem] text-center">{Math.round(zoom * 100)}%</span>
            <button onClick={(e) => { e.stopPropagation(); setZoom((z) => Math.min(z + 0.25, 5)) }} className="text-white hover:text-brand-300 text-lg font-bold">+</button>
            <button onClick={(e) => { e.stopPropagation(); setZoom(1); setPan({ x: 0, y: 0 }) }} className="text-brand-500 hover:text-white text-xs ml-2">Reset</button>
          </div>

          {/* Caption */}
          {lightbox.text && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-brand-800/80 border border-brand-600 px-4 py-2">
              <p className="text-white text-sm">{lightbox.text}</p>
            </div>
          )}

          {/* Image container */}
          <div
            className="relative w-full h-full flex items-center justify-center overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{ cursor: dragging ? 'grabbing' : 'grab' }}
          >
            <div
              className="relative"
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                transition: dragging ? 'none' : 'transform 0.25s cubic-bezier(0.25, 0.4, 0.25, 1)',
                maxWidth: '90vw',
                maxHeight: '85vh',
                width: '100%',
                height: '100%',
              }}
            >
              <Image
                src={lightbox.url}
                alt={lightbox.text || 'Imagen del portafolio'}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </PageTransition>
  )
}
