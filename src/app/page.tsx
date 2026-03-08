import Hero from '@/components/sections/Hero'
import Marquee from '@/components/sections/Marquee'
import Categories from '@/components/sections/Categories'
import HowItWorks from '@/components/sections/HowItWorks'
import Packages from '@/components/sections/Packages'
import Gallery from '@/components/sections/Gallery'
import CTASection from '@/components/sections/CTASection'
import DemoForm from '@/components/sections/DemoForm'
import FAQ from '@/components/sections/FAQ'
import { getHomeContent } from '@/lib/content'

export default function HomePage() {
  const homeData = getHomeContent()

  return (
    <>
      <Hero data={homeData.hero} />
      <Marquee />
      <Categories data={homeData.categories} />
      <HowItWorks data={homeData.howItWorks} />
      <Packages data={homeData.packages} />
      <Gallery data={homeData.gallery} />
      <CTASection data={homeData.cta} />
      <DemoForm data={homeData.demoForm} />
      <FAQ data={homeData.faq} />
    </>
  )
}
