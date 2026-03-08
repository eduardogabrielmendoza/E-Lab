import { Metadata } from 'next'
import OrderPage from './OrderPage'
import { getOrderContent } from '@/lib/content'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Ordenar | E-LAB',
  description: 'Ordena tu logotipo personalizado diseñado por profesionales.',
}

export default function Page() {
  const data = getOrderContent()
  return <OrderPage data={data} />
}
