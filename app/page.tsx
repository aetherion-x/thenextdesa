import { Suspense } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import HeroSection from "@/components/home/hero-section"
import InfoCards from "@/components/home/info-cards"
import NewsSection from "@/components/home/news-section"
import LoadingSpinner from "@/components/loading-spinner"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <Header />
      <main className="pt-16">
        <HeroSection />
        <Suspense fallback={<LoadingSpinner />}>
          <InfoCards />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <NewsSection />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
