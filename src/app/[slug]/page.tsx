import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import categoriesData from '@/content/categories.json'
import CategoryPage from './CategoryPage'

type Props = { params: { slug: string } }

const validSlugs = Object.keys(categoriesData.pages)

export function generateStaticParams() {
  return validSlugs.map((slug) => ({ slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const page = categoriesData.pages[params.slug as keyof typeof categoriesData.pages]
  if (!page) return {}
  return {
    title: `${page.title} | E-LAB`,
    description: page.subtitle,
  }
}

export default function Page({ params }: Props) {
  const page = categoriesData.pages[params.slug as keyof typeof categoriesData.pages]
  if (!page) notFound()
  return <CategoryPage data={page} slug={params.slug} />
}
