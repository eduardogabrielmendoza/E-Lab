'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import homeData from '@/content/home.json'
import { SlideUp, StaggerContainer, StaggerItem } from '@/components/animations'

export default function FAQ() {
  const { faq } = homeData
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-20 sm:py-28 bg-brand-black">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SlideUp className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            {faq.title}
          </h2>
        </SlideUp>

        <StaggerContainer className="space-y-3" staggerDelay={0.08}>
          {faq.items.map((item, index) => (
            <StaggerItem key={index}>
              <div className="border border-brand-700 overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-brand-900/50 transition-colors"
                >
                  <span className="text-sm sm:text-base font-semibold text-white pr-4">
                    {item.question}
                  </span>
                  <motion.svg
                    animate={{ rotate: openIndex === index ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-5 h-5 text-brand-400 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </motion.svg>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                    >
                      <p className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm text-brand-400 leading-relaxed">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
