"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Image from "next/image"
import { formatDate } from "@/lib/utils"
import NewsModal from "./news-modal"

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

export default function NewsContent() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const newsPerPage = 6

  useEffect(() => {
    const loadNews = async () => {
      try {
        const response = await fetch("/data/news.json")
        const data = await response.json()
        setNews(data.news || [])
        setFilteredNews(data.news || [])
      } catch (error) {
        console.error("Error loading news:", error)
      }
    }

    loadNews()
  }, [])

  useEffect(() => {
    let filtered = news

    if (selectedCategory !== "all") {
      filtered = filtered.filter((item) => item.category === selectedCategory)
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.content.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    setFilteredNews(filtered)
    setCurrentPage(1)
  }, [news, selectedCategory, searchQuery])

  const categories = ["all", "Pembangunan", "Sosial", "Ekonomi", "Lingkungan"]
  const startIndex = (currentPage - 1) * newsPerPage
  const endIndex = currentPage * newsPerPage
  const currentNews = filteredNews.slice(startIndex, endIndex)
  const hasMore = endIndex < filteredNews.length

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
  }

  const handleNewsClick = (newsItem: NewsItem) => {
    setSelectedNews(newsItem)
  }

  const closeModal = () => {
    setSelectedNews(null)
  }

  const loadMore = () => {
    setCurrentPage((prev) => prev + 1)
  }

  return (
    <>
      {/* News Filter */}
      <section className="py-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryFilter(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? "bg-primary-600 text-white"
                      : "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600"
                  }`}
                >
                  {category === "all" ? "Semua" : category}
                </button>
              ))}
            </div>
            <form onSubmit={handleSearch} className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Cari berita..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
              <button
                type="submit"
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                <i className="fas fa-search"></i>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {currentNews.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentNews.map((item) => (
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
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Oleh: {item.author}</span>
                        <button className="text-primary-600 dark:text-primary-400 font-semibold hover:text-primary-700 transition-colors duration-200 flex items-center space-x-1">
                          <span>Baca</span>
                          <i className="fas fa-arrow-right text-sm"></i>
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Load More Button */}
              {hasMore && (
                <div className="text-center mt-12">
                  <button
                    onClick={loadMore}
                    className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200"
                  >
                    Muat Lebih Banyak
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <i className="fas fa-search text-4xl text-gray-400 mb-4"></i>
              <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
                Tidak ada berita ditemukan
              </h3>
              <p className="text-gray-500 dark:text-gray-500">Coba ubah filter atau kata kunci pencarian</p>
            </div>
          )}
        </div>
      </section>

      {selectedNews && <NewsModal news={selectedNews} onClose={closeModal} />}
    </>
  )
}
