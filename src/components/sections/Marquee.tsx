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

function dedupe(logos: MarqueeLogo[]): MarqueeLogo[] {
  const seen = new Set<string>()
  return logos.filter((l) => {
    if (seen.has(l.url)) return false
    seen.add(l.url)
    return true
  })
}

export default function Marquee({ logos = [], speed = { desktop: 30, mobile: 20 } }: MarqueeProps) {
  const unique = useMemo(() => shuffle(dedupe(logos)), [logos])
  const uid = useId().replace(/:/g, '')

  const animCSS = `
    @keyframes marquee-slide-${uid} {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .marquee-${uid} {
      display: flex;
      width: max-content;
      animation: marquee-slide-${uid} ${speed.mobile}s linear infinite;
    }
    @media (min-width: 640px) {
      .marquee-${uid} {
        animation-duration: ${speed.desktop}s;
      }
    }
  `

  if (unique.length === 0) {
    const items = ['LOGOS', 'IDENTIDAD VISUAL', 'DISEÑO GRÁFICO', 'TIPOGRAFÍA', 'ILUSTRACIÓN', 'VECTORES']
    return (
      <section className="py-8 bg-white overflow-hidden">
        <style dangerouslySetInnerHTML={{ __html: animCSS }} />
        <div className={`marquee-${uid}`}>
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center whitespace-nowrap">
              {items.map((item, i) => (
                <span key={i} className="mx-8 text-sm sm:text-base font-black tracking-widest text-brand-black/80">
                  {item}
                  <span className="ml-8 text-brand-300">★</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="py-8 sm:py-12 bg-white overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: animCSS }} />
      <div className={`marquee-${uid}`}>
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {unique.map((logo, i) => (
              <div key={i} className="mx-8 sm:mx-14 shrink-0 flex items-center">
                <div className="relative h-28 sm:h-40 w-56 sm:w-80">
                  <Image
                    src={logo.url}
                    alt={logo.text || `Logo ${logo.tag}`}
                    fill
                    className="object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                    sizes="(max-width:640px) 224px, 320px"
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
