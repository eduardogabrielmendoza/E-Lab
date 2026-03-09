'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

/* eslint-disable @typescript-eslint/no-explicit-any */

function AnimatedNumber({ value, suffix = '', prefix = '' }: { value: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const duration = 2000
    const step = (timestamp: number) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.floor(eased * value))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [isInView, value])

  return (
    <span ref={ref} className="text-3xl sm:text-4xl md:text-5xl font-black text-white tabular-nums">
      {prefix}{display}{suffix}
    </span>
  )
}

export default function Stats({ data }: { data: any }) {
  const stats = data.items || []
  if (stats.length === 0) return null

  return (
    <section className="bg-brand-black border-y border-brand-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className={`grid grid-cols-2 lg:grid-cols-${Math.min(stats.length, 4)} gap-8 sm:gap-12`}>
          {stats.map((stat: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <AnimatedNumber
                value={parseInt(String(stat.value).replace(/\D/g, '')) || 0}
                prefix={stat.prefix || ''}
                suffix={stat.suffix || ''}
              />
              <p className="mt-2 text-xs sm:text-sm font-medium text-brand-400 tracking-wider uppercase">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
