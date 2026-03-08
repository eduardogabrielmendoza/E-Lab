import { Metadata } from 'next'
import PortfolioPage from './PortfolioPage'

export const metadata: Metadata = {
  title: 'Portafolio | E-LAB',
  description: 'Explora nuestro portafolio de logotipos y diseño gráfico profesional.',
}

export default function Page() {
  return <PortfolioPage />
}
