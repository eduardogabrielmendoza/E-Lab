'use client'

import { motion } from 'framer-motion'
import { SlideUp } from '@/components/animations'

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function HowItWorks({ data }: { data: any }) {
  const howItWorks = data

  return (
    <section className="py-20 sm:py-28 bg-brand-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SlideUp className="text-center mb-14 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            {howItWorks.title}
          </h2>
        </SlideUp>

        <div className="relative">
          {/* Animated connecting line (desktop) */}
          <motion.div
            className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            style={{ transformOrigin: 'left', background: 'linear-gradient(90deg, transparent, #525252 10%, #525252 90%, transparent)' }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8">
            {howItWorks.steps.map((step: any, index: number) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.2,
                  ease: [0.25, 0.4, 0.25, 1],
                }}
                className="relative text-center group"
              >
                {/* Animated number circle */}
                <motion.div
                  className="relative mx-auto w-20 h-20 sm:w-24 sm:h-24 mb-6"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.2 + index * 0.2,
                    ease: [0.25, 0.4, 0.25, 1],
                  }}
                >
                  {/* Outer ring */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 96 96">
                    <motion.circle
                      cx="48" cy="48" r="44"
                      fill="none"
                      stroke="#404040"
                      strokeWidth="1"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 + index * 0.2, ease: 'easeOut' }}
                    />
                    <motion.circle
                      cx="48" cy="48" r="44"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.5 + index * 0.2, ease: [0.25, 0.4, 0.25, 1] }}
                    />
                  </svg>
                  {/* Number */}
                  <motion.span
                    className="absolute inset-0 flex items-center justify-center text-2xl sm:text-3xl font-black text-white"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.8 + index * 0.2 }}
                  >
                    {step.number}
                  </motion.span>
                </motion.div>

                {/* Content */}
                <motion.h3
                  className="text-base sm:text-lg font-bold text-white tracking-wide mb-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.2 }}
                >
                  {step.title}
                </motion.h3>
                <motion.p
                  className="text-sm text-brand-400 leading-relaxed max-w-xs mx-auto"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.2 }}
                >
                  {step.description}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
