import { Metadata } from 'next'
import ContactPage from './ContactPage'
import { getContactContent } from '@/lib/content'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Contacto | E-LAB',
  description: 'Contáctanos para discutir tu proyecto de diseño gráfico.',
}

export default function Page() {
  const data = getContactContent()
  return <ContactPage data={data} />
}
