"use client"

import type React from "react"

import { useEffect } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { formatDate } from "@/lib/utils"

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

interface NewsModalProps {
  news: NewsItem
  onClose: () => void
}

export default function NewsModal({ news, onClose }: NewsModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscape)
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [onClose])

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white dark:bg-gray-900 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white pr-4">{news.title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl flex-shrink-0"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <Image
            src={news.image || "/placeholder.svg"}
            alt={news.title}
            width={600}
            height={300}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />

          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
            <span>
              <i className="fas fa-calendar mr-1"></i>
              {formatDate(news.date)}
            </span>
            <span>
              <i className="fas fa-user mr-1"></i>
              {news.author}
            </span>
            <span className="bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 px-2 py-1 rounded">
              {news.category}
            </span>
          </div>

          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{news.content}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
