'use client'

import { SlideUp, FadeIn, PageTransition } from '@/components/animations'

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function OrderPage({ data }: { data: any }) {
  const { hero, form, cta } = data
  const whatsappUrl = `https://wa.me/543814463243?text=${encodeURIComponent(form.whatsappMessage || 'Hola! Quiero ordenar un diseño personalizado')}`
  const ctaIsExternal = cta.button.href.startsWith('http')

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative py-24 sm:py-32 bg-brand-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-900/50 to-brand-black" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
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

            {/* WhatsApp CTA */}
            <FadeIn delay={0.3}>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 mt-10 bg-[#25D366] text-white px-12 py-5 text-base font-bold tracking-wider hover:bg-[#20bd5a] transition-all hover:scale-105"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Ordenar por WhatsApp
              </a>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA */}
      {cta.visible !== false && (
        <section className="py-16 sm:py-24 bg-brand-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <SlideUp>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {cta.title}
              </h2>
              <p className="mt-4 text-brand-400">{cta.description}</p>
              <a
                href={cta.button.href}
                target={ctaIsExternal ? '_blank' : undefined}
                rel={ctaIsExternal ? 'noopener noreferrer' : undefined}
                className="inline-flex items-center gap-2 mt-8 bg-white text-brand-black px-10 py-4 text-sm font-bold tracking-wider hover:bg-brand-100 transition-all"
              >
                {ctaIsExternal && (
                  <svg className="w-4 h-4 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                )}
                {cta.button.label}
              </a>
            </SlideUp>
          </div>
        </section>
      )}
    </PageTransition>
  )
}
