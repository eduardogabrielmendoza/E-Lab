'use client'

export default function Marquee() {
  const items = [
    'LOGOS',
    'BRANDING',
    'IDENTIDAD VISUAL',
    'MERCH',
    'DISEÑO GRÁFICO',
    'TIPOGRAFÍA',
    'ILUSTRACIÓN',
    'VECTORES',
  ]

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
