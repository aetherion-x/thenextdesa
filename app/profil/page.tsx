import { Suspense } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ProfileContent from "@/components/profile/profile-content"
import LoadingSpinner from "@/components/loading-spinner"

export const metadata = {
  title: "Profil Desa - Desa Slorok",
  description: "Mengenal lebih dekat Desa Slorok",
}

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <Header />
      <main className="pt-16 min-h-screen">
        <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold mb-4">Profile Desa Slorok</h1>
            <p className="text-xl opacity-90">Mengenal lebih dekat desa kami</p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Suspense fallback={<LoadingSpinner />}>
              <ProfileContent />
            </Suspense>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
