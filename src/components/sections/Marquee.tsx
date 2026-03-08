'use client'

import Image from 'next/image'

interface MarqueeLogo {
  url: string
  tag: string
  text?: string
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function Marquee({ logos = [] }: { logos?: MarqueeLogo[] }) {
  if (logos.length === 0) {
    // Fallback: text marquee
    const items = ['LOGOS', 'IDENTIDAD VISUAL', 'DISEÑO GRÁFICO', 'TIPOGRAFÍA', 'ILUSTRACIÓN', 'VECTORES']
    const repeated = [...items, ...items]
    return (
      <section className="py-6 bg-white overflow-hidden">
        <div className="animate-marquee flex whitespace-nowrap">
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

  // Shuffle and duplicate for seamless loop
  const shuffled = shuffle(logos)
  const repeated = [...shuffled, ...shuffled]

  return (
    <section className="py-4 bg-white overflow-hidden">
      <div className="animate-marquee flex items-center">
        {repeated.map((logo, i) => (
          <div key={i} className="mx-6 sm:mx-10 shrink-0 flex items-center">
            <div className="relative h-8 sm:h-10 w-24 sm:w-32">
              <Image
                src={logo.url}
                alt={logo.text || `Logo ${logo.tag}`}
                fill
                className="object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                sizes="128px"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
