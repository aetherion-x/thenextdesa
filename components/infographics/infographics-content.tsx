"use client"

import { useState } from "react"
import Image from "next/image"
import PopulationData from "./population-data"
import AgricultureData from "./agriculture-data"
import BudgetData from "./budget-data"

export default function InfographicsContent() {
  const [activeTab, setActiveTab] = useState("population")

  const tabs = [
    {
      id: "population",
      title: "Data Penduduk",
      icon: "/assets/img/Penduduk.png",
      component: PopulationData,
    },
    {
      id: "agriculture",
      title: "Data Potensi\nPertanian",
      icon: "/assets/img/farmer.png",
      component: AgricultureData,
    },
    {
      id: "budget",
      title: "Data APBD Desa",
      icon: "/assets/img/money.png",
      component: BudgetData,
    },
  ]

  const ActiveComponent = tabs.find((tab) => tab.id === activeTab)?.component || PopulationData

  return (
    <>
      {/* Tab Navigation */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-40 h-40 flex flex-col items-center justify-center font-semibold rounded-lg shadow-md transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-primary-600 text-white"
                    : "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                }`}
              >
                <Image src={tab.icon || "/placeholder.svg"} alt={tab.title} width={40} height={40} className="mb-2" />
                <span className="text-center leading-tight whitespace-pre-line">{tab.title}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <div className="pb-16">
        <ActiveComponent />
      </div>
    </>
  )
}
