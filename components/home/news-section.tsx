"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { formatDate } from "@/lib/utils"
import NewsModal from "@/components/news/news-modal"

interface NewsItem {
  id: number
  title: string
  excerpt: string
  content: string
  image: string
  date: string
  author: string
  category: string
}

export default function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null)

  useEffect(() => {
    const loadNews = async () => {
      try {
        const response = await fetch("/data/news.json")
        const data = await response.json()
        setNews(data.news || [])
      } catch (error) {
        console.error("Error loading news:", error)
      }
    }

    loadNews()
  }, [])

  const handleNewsClick = (newsItem: NewsItem) => {
    setSelectedNews(newsItem)
  }

  const closeModal = () => {
    setSelectedNews(null)
  }

  return (
    <>
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-4">Galeri Kegiatan</h2>
            <p className="text-gray-600 dark:text-gray-300">Foto foto kegiatan di desa slorok</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item) => (
              <article
                key={item.id}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                onClick={() => handleNewsClick(item)}
              >
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                      {formatDate(item.date)}
                    </span>
                    <span className="bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 px-2 py-1 rounded text-xs font-medium">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{item.excerpt}</p>
                  <button className="text-primary-600 dark:text-primary-400 font-semibold hover:text-primary-700 transition-colors duration-200 flex items-center space-x-1">
                    <span>Baca Selengkapnya</span>
                    <i className="fas fa-arrow-right text-sm"></i>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {selectedNews && <NewsModal news={selectedNews} onClose={closeModal} />}
    </>
  )
}
