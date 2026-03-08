import { Metadata } from 'next'
import OrderPage from './OrderPage'

export const metadata: Metadata = {
  title: 'Ordenar | E-LAB',
  description: 'Ordena tu logotipo personalizado diseñado por profesionales.',
}

export default function Page() {
  return <OrderPage />
}
