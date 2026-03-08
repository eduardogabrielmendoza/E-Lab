import { Metadata } from 'next'
import PortfolioPage from './PortfolioPage'
import { getPortfolioContent } from '@/lib/content'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Portafolio | E-LAB',
  description: 'Explora nuestro portafolio de logotipos y diseño gráfico profesional.',
}

export default function Page() {
  const data = getPortfolioContent()
  return <PortfolioPage data={data} />
}
