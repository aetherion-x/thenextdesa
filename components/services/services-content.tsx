"use client"

import { useEffect, useState } from "react"

interface Service {
  id: string
  title: string
  icon: string
  description: string
  flowContent: string
}

export default function ServicesContent() {
  const [services, setServices] = useState<Service[]>([])

  useEffect(() => {
    const loadServices = async () => {
      try {
        const response = await fetch("/data/services.json")
        const data = await response.json()
        setServices(data.services || [])
      } catch (error) {
        console.error("Error loading services:", error)
      }
    }

    loadServices()
  }, [])

  const showServiceDetail = (service: Service) => {
    const whatsappNumber = "6285607006122"
    const message = `== Perihal Meminta ${service.title} ==

Halo Admin Dukcapil Slorok, Saya (...) ingin meminta pembuatan ${service.title}

Terima kasih..`
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

    // Create modal
    const modal = document.createElement("div")
    modal.className = "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    modal.innerHTML = `
      <div class="bg-white dark:bg-gray-900 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6 md:p-8">
          <div class="flex justify-between items-start mb-4">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white pr-4">${service.title}</h2>
            <button onclick="this.closest('.fixed').remove()" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl flex-shrink-0">×</button>
          </div>
          
          <div class="prose dark:prose-invert max-w-none">
            ${service.flowContent}
          </div>

          <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <a href="${whatsappLink}" target="_blank" rel="noopener noreferrer"
               class="inline-flex items-center justify-center w-full px-5 py-3 text-base font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800">
               <i class="fab fa-whatsapp mr-2"></i>
               Chat Call Center ${service.title}
            </a>
          </div>
        </div>
      </div>
    `

    document.body.appendChild(modal)

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.remove()
      }
    })
  }

  return (
    <div className="space-y-6">
      {services.map((service) => (
        <div
          key={service.id}
          className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex items-center space-x-6"
          onClick={() => showServiceDetail(service)}
        >
          <div className="flex-shrink-0">
            <i className={`${service.icon} text-4xl text-primary-600 dark:text-primary-400`}></i>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{service.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{service.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
