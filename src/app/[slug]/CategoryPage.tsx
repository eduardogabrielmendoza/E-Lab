'use client'

import Link from 'next/link'
import Image from 'next/image'
import { SlideUp, FadeIn, StaggerContainer, StaggerItem, SlideInLeft, PageTransition } from '@/components/animations'

interface CategoryData {
  title: string
  subtitle: string
  heroImages: string[]
  overview: string
  whatYouGet: string[]
  gallery: string[]
  relatedCategories: string[]
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function CategoryPage({ data, slug, allPages, homeData, showPlaceholders }: { data: CategoryData; slug: string; allPages: any; homeData: any; showPlaceholders?: boolean }) {
  const galleryImages = data.gallery || []
  const placeholders = galleryImages.length > 0 ? galleryImages : (showPlaceholders !== false ? Array.from({ length: 8 }, () => '') : [])

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative py-24 sm:py-32 bg-brand-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-900/50 to-brand-black" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <SlideUp>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight">
                {data.title}
              </h1>
            </SlideUp>
            <SlideUp delay={0.1}>
              <p className="mt-6 text-base sm:text-lg text-brand-400 leading-relaxed">
                {data.subtitle}
              </p>
            </SlideUp>
            <SlideUp delay={0.2}>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/#paquetes"
                  className="bg-white text-brand-black px-8 py-4 text-sm font-bold tracking-wider hover:bg-brand-100 transition-all text-center"
                >
                  VER PRECIOS
                </Link>
                <Link
                  href="/ordenar"
                  className="border border-brand-400 text-white px-8 py-4 text-sm font-bold tracking-wider hover:bg-white hover:text-brand-black transition-all text-center"
                >
                  ORDENAR AHORA
                </Link>
              </div>
            </SlideUp>
          </div>

          {/* Hero images placeholders */}
          {(data.heroImages?.length > 0 || showPlaceholders !== false) && (
          <div className="mt-12 grid grid-cols-3 gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-[4/3] bg-brand-800 border border-brand-700 flex items-center justify-center">
                <svg className="w-10 h-10 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            ))}
          </div>
          )}
        </div>
      </section>

      {/* Overview + What you get */}
      <section className="py-16 sm:py-24 bg-brand-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <SlideInLeft>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-4">
                DESCRIPCIÓN
              </h2>
              <p className="text-brand-400 leading-relaxed">{data.overview}</p>
            </SlideInLeft>
            <FadeIn delay={0.2}>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-4">
                ¿QUÉ OBTENDRÁS?
              </h2>
              <ul className="space-y-3">
                {data.whatYouGet.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg className="w-4 h-4 text-white mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-brand-300">{item}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 sm:py-24 bg-brand-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
            staggerDelay={0.06}
          >
            {placeholders.map((item) => (
              <StaggerItem key={item}>
                <div className="group cursor-pointer">
                  <div className="relative overflow-hidden bg-brand-800 border border-brand-700 aspect-[4/3] flex items-center justify-center hover:border-brand-500 transition-all duration-300">
                    <svg className="w-10 h-10 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

      {/* How it works (reused from home data) */}
      <section className="py-16 sm:py-24 bg-brand-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SlideUp className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              ¿CÓMO FUNCIONA?
            </h2>
          </SlideUp>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" staggerDelay={0.1}>
            {homeData.howItWorks.steps.map((step: any) => (
              <StaggerItem key={step.number}>
                <div className="text-center sm:text-left">
                  <div className="text-5xl font-black text-brand-700/50 leading-none mb-3">
                    {step.number}
                  </div>
                  <h3 className="text-sm font-bold text-white tracking-wide mb-2">{step.title}</h3>
                  <p className="text-sm text-brand-400">{step.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Packages */}
      <section className="py-16 sm:py-24 bg-brand-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SlideUp className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              ELIGE TU PAQUETE
            </h2>
          </SlideUp>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto" staggerDelay={0.12}>
            {homeData.packages.items.map((pkg: any) => (
              <StaggerItem key={pkg.name}>
                <div className={`relative flex flex-col p-6 sm:p-8 border transition-all hover:border-brand-300 ${pkg.popular ? 'border-white bg-brand-900' : 'border-brand-700 bg-brand-900/50'}`}>
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-brand-black text-xs font-bold px-4 py-1 tracking-wider">
                      MÁS POPULAR
                    </div>
                  )}
                  <h3 className="text-sm font-bold text-brand-300 tracking-widest">{pkg.name}</h3>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-4xl font-black text-white">{pkg.price}</span>
                    <span className="text-sm text-brand-400">USD</span>
                  </div>
                  <p className="mt-2 text-sm text-brand-400">{pkg.description}</p>
                  <ul className="flex-1 space-y-2.5 mt-6 mb-8">
                    {pkg.features.map((f: string, i: number) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <svg className="w-4 h-4 text-white mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-brand-300">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={pkg.cta.href} className={`w-full py-3 text-center text-sm font-bold tracking-wider transition-all ${pkg.popular ? 'bg-white text-brand-black hover:bg-brand-100' : 'border border-brand-400 text-white hover:bg-white hover:text-brand-black'}`}>
                    {pkg.cta.label}
                  </Link>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-24 bg-brand-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SlideUp className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              PREGUNTAS FRECUENTES
            </h2>
          </SlideUp>
          <div className="space-y-3">
            {homeData.faq.items.map((item: any, index: number) => (
              <FadeIn key={index} delay={index * 0.05}>
                <details className="group border border-brand-700">
                  <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-brand-800/50 transition-colors">
                    <span className="text-sm font-semibold text-white pr-4">{item.question}</span>
                    <span className="text-brand-400 text-xl leading-none group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="px-5 pb-5 text-sm text-brand-400 leading-relaxed">{item.answer}</p>
                </details>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Related categories */}
      <section className="py-16 sm:py-24 bg-brand-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SlideUp className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              TAMBIÉN TE PUEDE INTERESAR
            </h2>
          </SlideUp>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" staggerDelay={0.1}>
            {data.relatedCategories.map((relSlug) => {
              const rel = allPages[relSlug as keyof typeof allPages]
              if (!rel) return null
              return (
                <StaggerItem key={relSlug}>
                  <Link href={`/${relSlug}`} className="group block border border-brand-700 hover:border-brand-400 transition-all">
                    <div className="aspect-[16/10] bg-brand-800 flex items-center justify-center">
                      <svg className="w-10 h-10 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="p-4">
                      <h3 className="text-base font-bold text-white group-hover:text-brand-100 transition-colors">{rel.title}</h3>
                      <span className="mt-2 inline-block text-xs font-bold text-brand-300 tracking-widest">VER MÁS →</span>
                    </div>
                  </Link>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 bg-brand-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SlideUp>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              SIN CLIPART. SIN PLANTILLAS. DISEÑO GRÁFICO REAL.
            </h2>
            <p className="mt-4 text-brand-400">
              Servicios de diseño de logotipos profesionales. Ordena y obtén tu nuevo logotipo diseñado por profesionales.
            </p>
            <Link href="/ordenar" className="inline-block mt-8 bg-white text-brand-black px-10 py-4 text-sm font-bold tracking-wider hover:bg-brand-100 transition-all">
              ORDENA TU LOGOTIPO
            </Link>
          </SlideUp>
        </div>
      </section>
    </PageTransition>
  )
}
