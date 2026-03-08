import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SmoothScroll from '@/components/SmoothScroll'
import WhatsAppButton from '@/components/WhatsAppButton'
import { getLayoutContent } from '@/lib/content'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'E-LAB | Logotipos y Diseño Gráfico Profesional',
  description: 'Diseñamos logotipos y piezas de diseño gráfico 100% originales. Sin plantillas. Sin IA. Diseño hecho a mano por profesionales.',
}

export const dynamic = 'force-dynamic'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const layoutData = getLayoutContent()

  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        <SmoothScroll>
          <Header data={layoutData} />
          <main className="min-h-screen">{children}</main>
          <Footer data={layoutData} />
        </SmoothScroll>
        <WhatsAppButton />
      </body>
    </html>
  )
}
