import Hero from '@/components/sections/Hero'
import Stats from '@/components/sections/Stats'
import Marquee from '@/components/sections/Marquee'
import Categories from '@/components/sections/Categories'

export const dynamic = 'force-dynamic'
import HowItWorks from '@/components/sections/HowItWorks'
import Packages from '@/components/sections/Packages'
import Gallery from '@/components/sections/Gallery'
import CTASection from '@/components/sections/CTASection'
import DemoForm from '@/components/sections/DemoForm'
import Testimonials from '@/components/sections/Testimonials'
import FAQ from '@/components/sections/FAQ'
import { getHomeContent, getPortfolioContent } from '@/lib/content'

export default function HomePage() {
  const homeData = getHomeContent()
  const portfolioData = getPortfolioContent()
  const marqueeLogos = (portfolioData?.gallery?.images || [])
    .filter((img: { tag?: string; url?: string }) =>
      img?.url && img?.tag && !['MERCH', 'BRANDING', 'COLOR'].includes(img.tag.toUpperCase())
    )
  const marqueeSpeed = {
    desktop: homeData.marquee?.desktopSpeed || 30,
    mobile: homeData.marquee?.mobileSpeed || 20,
  }

  return (
    <>
      {homeData.hero.visible !== false && <Hero data={homeData.hero} />}
      {homeData.stats?.visible !== false && homeData.stats && <Stats data={homeData.stats} />}
      {homeData.marquee?.visible !== false && <Marquee logos={marqueeLogos} speed={marqueeSpeed} />}
      {homeData.categories.visible !== false && <Categories data={homeData.categories} />}
      {homeData.howItWorks.visible !== false && <HowItWorks data={homeData.howItWorks} />}
      {homeData.packages.visible !== false && <Packages data={homeData.packages} />}
      {homeData.gallery.visible !== false && <Gallery data={homeData.gallery} />}
      {homeData.cta.visible !== false && <CTASection data={homeData.cta} />}
      {homeData.demoForm.visible !== false && <DemoForm data={homeData.demoForm} />}
      {homeData.testimonials?.visible !== false && homeData.testimonials && <Testimonials data={homeData.testimonials} />}
      {homeData.faq.visible !== false && <FAQ data={homeData.faq} />}
    </>
  )
}
