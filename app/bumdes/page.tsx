import { Suspense } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import NewsContent from "@/components/news/news-content"
import LoadingSpinner from "@/components/loading-spinner"

export const metadata = {
  title: "BUMDes - Desa Slorok",
  description: "Badan Usaha Milik Desa Slorok",
}

export default function BumdesPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <Header />
      <main className="pt-16 min-h-screen">
        <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold mb-4">Badan Usaha Milik Desa</h1>
            <p className="text-xl opacity-90">Macam-macam badan usaha milik desa</p>
          </div>
        </section>

        <Suspense fallback={<LoadingSpinner />}>
          <NewsContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
