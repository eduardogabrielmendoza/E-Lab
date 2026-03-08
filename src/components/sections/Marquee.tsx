'use client'

import { useMemo, useId } from 'react'
import Image from 'next/image'

interface MarqueeLogo {
  url: string
  tag: string
  text?: string
}

interface MarqueeProps {
  logos?: MarqueeLogo[]
  speed?: { desktop: number; mobile: number }
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function Marquee({ logos = [], speed = { desktop: 30, mobile: 20 } }: MarqueeProps) {
  const shuffled = useMemo(() => shuffle(logos), [logos])
  const uid = useId().replace(/:/g, '')

  const animCSS = `
    .marquee-${uid} {
      animation: marquee ${speed.mobile}s linear infinite;
    }
    @media (min-width: 640px) {
      .marquee-${uid} {
        animation-duration: ${speed.desktop}s;
      }
    }
  `

  if (logos.length === 0) {
    const items = ['LOGOS', 'IDENTIDAD VISUAL', 'DISEÑO GRÁFICO', 'TIPOGRAFÍA', 'ILUSTRACIÓN', 'VECTORES']
    const repeated = [...items, ...items]
    return (
      <section className="py-8 bg-white overflow-hidden">
        <style dangerouslySetInnerHTML={{ __html: animCSS }} />
        <div className={`marquee-${uid} flex whitespace-nowrap`}>
          {repeated.map((item, i) => (
            <span key={i} className="mx-8 text-sm sm:text-base font-black tracking-widest text-brand-black/80">
              {item}
              <span className="ml-8 text-brand-300">★</span>
            </span>
          ))}
        </div>
      </section>
    )
  }

  const repeated = [...shuffled, ...shuffled]

  return (
    <section className="py-6 sm:py-8 bg-white overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: animCSS }} />
      <div className={`marquee-${uid} flex items-center`}>
        {repeated.map((logo, i) => (
          <div key={i} className="mx-6 sm:mx-10 shrink-0 flex items-center">
            <div className="relative h-20 sm:h-28 w-48 sm:w-72">
              <Image
                src={logo.url}
                alt={logo.text || `Logo ${logo.tag}`}
                fill
                className="object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                sizes="(max-width:640px) 192px, 288px"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
