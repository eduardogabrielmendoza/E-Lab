import Hero from '@/components/sections/Hero'
import Marquee from '@/components/sections/Marquee'
import Categories from '@/components/sections/Categories'
import HowItWorks from '@/components/sections/HowItWorks'
import Packages from '@/components/sections/Packages'
import Gallery from '@/components/sections/Gallery'
import CTASection from '@/components/sections/CTASection'
import DemoForm from '@/components/sections/DemoForm'
import FAQ from '@/components/sections/FAQ'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Categories />
      <HowItWorks />
      <Packages />
      <Gallery />
      <CTASection />
      <DemoForm />
      <FAQ />
    </>
  )
}
