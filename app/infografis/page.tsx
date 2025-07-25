import { Suspense } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import InfographicsContent from "@/components/infographics/infographics-content"
import LoadingSpinner from "@/components/loading-spinner"

export const metadata = {
  title: "Infografis - Desa Slorok",
  description: "Data statistik dan infografis Desa Slorok",
}

export default function InfographicsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-300">
      <Header />
      <main className="pt-16 min-h-screen">
        <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold mb-4">Data Statistik Desa</h1>
            <p className="text-xl opacity-90">Visualisasi data dan informasi desa dalam bentuk grafik</p>
          </div>
        </section>

        <Suspense fallback={<LoadingSpinner />}>
          <InfographicsContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
