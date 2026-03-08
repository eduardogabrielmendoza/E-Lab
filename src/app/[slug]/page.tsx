import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCategoriesContent, getHomeContent } from '@/lib/content'
import CategoryPage from './CategoryPage'

export const dynamic = 'force-dynamic'

type Props = { params: { slug: string } }

export function generateMetadata({ params }: Props): Metadata {
  const categoriesData = getCategoriesContent()
  const page = categoriesData.pages[params.slug as keyof typeof categoriesData.pages]
  if (!page) return {}
  return {
    title: `${page.title} | E-LAB`,
    description: page.subtitle,
  }
}

export default function Page({ params }: Props) {
  const categoriesData = getCategoriesContent()
  const homeData = getHomeContent()
  const page = categoriesData.pages[params.slug as keyof typeof categoriesData.pages]
  if (!page) notFound()
  return <CategoryPage data={page} slug={params.slug} allPages={categoriesData.pages} homeData={homeData} showPlaceholders={categoriesData.showPlaceholders} />
}
