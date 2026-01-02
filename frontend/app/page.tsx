import { HeroSection } from "@/components/hero-section"
import { FeaturedCategories } from "@/components/featured-categories"
import { TrendingJerseys } from "@/components/trending-jerseys"
import { WhyChooseUs } from "@/components/why-choose-us"
import { Newsletter } from "@/components/newsletter"

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedCategories />
      <TrendingJerseys />
      <WhyChooseUs />
      <Newsletter />
    </>
  )
}
