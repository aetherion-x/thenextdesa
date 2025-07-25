"use client"

import { useEffect, useState } from "react"

interface InfoCard {
  icon: string
  number: string
  label: string
}

export default function InfoCards() {
  const [infoCards, setInfoCards] = useState<InfoCard[]>([])

  useEffect(() => {
    const loadInfoCards = async () => {
      try {
        const response = await fetch("/data/config.json")
        const data = await response.json()
        setInfoCards(data.infoCards || [])
      } catch (error) {
        console.error("Error loading info cards:", error)
      }
    }

    loadInfoCards()
  }, [])

  if (infoCards.length === 0) {
    return null
  }

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {infoCards.map((card, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <i className={`${card.icon} text-4xl text-primary-600 dark:text-primary-400 mb-4`}></i>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{card.number}</h3>
              <p className="text-gray-600 dark:text-gray-300 font-medium">{card.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
