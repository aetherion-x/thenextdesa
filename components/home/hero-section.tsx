"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import desa from "../../public/assets/img/desa.jpg"

interface HeroData {
  title: string
  subtitle: string
}

export default function HeroSection() {
  const [heroData, setHeroData] = useState<HeroData | null>(null)

  useEffect(() => {
    const loadHeroData = async () => {
      try {
        const response = await fetch("/data/config.json")
        const data = await response.json()
        setHeroData(data.hero)
      } catch (error) {
        console.error("Error loading hero data:", error)
        // Fallback data
        setHeroData({
          title: "Selamat Datang di Desa Slorok",
          subtitle: "Desa yang maju, mandiri, dan sejahtera untuk semua warga",
        })
      }
    }

    loadHeroData()
  }, [])

  if (!heroData) {
    return null
  }

  return (
    <section className="bg-gradient-to-br from-primary-50 to-green-50 dark:from-gray-800 dark:to-gray-900 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-5xl font-bold text-primary-600 dark:text-primary-400 mb-6 animate-fade-in-up">
              {heroData.title}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 animate-fade-in-up animation-delay-200">
              {heroData.subtitle}
            </p>
            <Link
              href="/profil"
              className="inline-block bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:-translate-y-1 hover:shadow-lg animate-fade-in-up animation-delay-400"
            >
              Jelajahi Desa
            </Link>
          </div>
          <div className="animate-fade-in-right animation-delay-600">
            <Image
              src={desa}
              alt="Pemandangan Desa"
              width={600}
              height={400}
              className="w-full h-auto rounded-xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
