'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Hero({ data }: { data: any }) {
  const hero = data

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-brand-black">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-900 via-brand-black to-brand-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-700/20 via-transparent to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-6"
          >
            <span className="text-xs sm:text-sm font-medium text-brand-300 tracking-widest border border-brand-600 px-4 py-2 rounded-full">
              {hero.badge}
            </span>
          </motion.div>

          {/* Main title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.05]"
          >
            {hero.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 text-base sm:text-lg md:text-xl text-brand-300 max-w-2xl mx-auto leading-relaxed"
          >
            {hero.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href={hero.cta1.href}
              className="bg-white text-brand-black px-8 py-4 text-sm font-bold tracking-wider hover:bg-brand-100 transition-all hover:scale-105"
            >
              {hero.cta1.label}
            </Link>
            <Link
              href={hero.cta2.href}
              className="border border-brand-400 text-white px-8 py-4 text-sm font-bold tracking-wider hover:bg-white hover:text-brand-black transition-all hover:scale-105"
            >
              {hero.cta2.label}
            </Link>
          </motion.div>

          {/* Placeholder images row */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-16 grid grid-cols-3 gap-3 sm:gap-4 max-w-3xl mx-auto"
          >
            {(hero.images && hero.images.length > 0 ? hero.images.slice(0, 3) : [null, null, null]).map((img: string | null, i: number) => (
              <div
                key={i}
                className="aspect-[4/3] bg-brand-800 rounded-sm border border-brand-700 flex items-center justify-center overflow-hidden relative"
              >
                {img ? (
                  <Image src={img} alt={`Ejemplo ${i + 1}`} fill className="object-cover" sizes="(max-width: 768px) 33vw, 256px" />
                ) : (
                  <svg className="w-10 h-10 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
