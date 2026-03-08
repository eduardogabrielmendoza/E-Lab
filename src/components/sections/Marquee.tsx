'use client'

import { useMemo } from 'react'
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

  if (logos.length === 0) {
    const items = ['LOGOS', 'IDENTIDAD VISUAL', 'DISEÑO GRÁFICO', 'TIPOGRAFÍA', 'ILUSTRACIÓN', 'VECTORES']
    const repeated = [...items, ...items]
    return (
      <section className="py-8 bg-white overflow-hidden">
        <div
          className="flex whitespace-nowrap"
          style={{
            animation: `marquee var(--marquee-speed) linear infinite`,
            '--marquee-speed': `${speed.mobile}s`,
          } as React.CSSProperties}
        >
          <style>{`@media(min-width:640px){[style*="--marquee-speed"]{--marquee-speed:${speed.desktop}s !important}}`}</style>
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
    <section className="py-8 sm:py-10 bg-white overflow-hidden">
      <div
        className="flex items-center"
        style={{
          animation: `marquee var(--marquee-speed) linear infinite`,
          '--marquee-speed': `${speed.mobile}s`,
        } as React.CSSProperties}
      >
        <style>{`@media(min-width:640px){[style*="--marquee-speed"]{--marquee-speed:${speed.desktop}s !important}}`}</style>
        {repeated.map((logo, i) => (
          <div key={i} className="mx-8 sm:mx-14 shrink-0 flex items-center">
            <div className="relative h-14 sm:h-20 w-36 sm:w-52">
              <Image
                src={logo.url}
                alt={logo.text || `Logo ${logo.tag}`}
                fill
                className="object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                sizes="(max-width:640px) 144px, 208px"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
