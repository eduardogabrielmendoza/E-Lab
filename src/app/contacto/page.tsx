import { Metadata } from 'next'
import ContactPage from './ContactPage'

export const metadata: Metadata = {
  title: 'Contacto | E-LAB',
  description: 'Contáctanos para discutir tu proyecto de diseño gráfico.',
}

export default function Page() {
  return <ContactPage />
}
