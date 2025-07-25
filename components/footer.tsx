"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

interface ContactInfo {
  address: string
  phone: string
  email: string
  workingHours: {
    weekdays: string
    saturday: string
    sunday: string
  }
  socialMedia: Array<{
    platform: string
    icon: string
    url: string
  }>
}

export default function Footer() {
  const [contact, setContact] = useState<ContactInfo | null>(null)

  useEffect(() => {
    const loadContactInfo = async () => {
      try {
        const response = await fetch("/data/config.json")
        const data = await response.json()
        setContact(data.contact)
      } catch (error) {
        console.error("Error loading contact info:", error)
      }
    }

    loadContactInfo()
  }, [])

  if (!contact) {
    return null
  }

  return (
    <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-4">Kontak Kami</h3>
            <div className="space-y-3 text-gray-600 dark:text-gray-300">
              <p className="flex items-start space-x-3">
                <i className="fas fa-map-marker-alt text-primary-600 dark:text-primary-400 mt-1 flex-shrink-0"></i>
                <span>{contact.address}</span>
              </p>
              <p className="flex items-center space-x-3">
                <i className="fas fa-phone text-primary-600 dark:text-primary-400 flex-shrink-0"></i>
                <span>{contact.phone}</span>
              </p>
              <p className="flex items-center space-x-3">
                <i className="fas fa-envelope text-primary-600 dark:text-primary-400 flex-shrink-0"></i>
                <span>{contact.email}</span>
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-4">Jam Pelayanan</h3>
            <div className="space-y-2 text-gray-600 dark:text-gray-300">
              <p>{contact.workingHours.weekdays}</p>
              <p>{contact.workingHours.saturday}</p>
              <p>{contact.workingHours.sunday}</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-4">Media Sosial</h3>
            <div className="flex space-x-4">
              {contact.socialMedia.map((social) => (
                <Link
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-primary-600 hover:bg-primary-700 text-white rounded-full flex items-center justify-center transition-all duration-200 transform hover:-translate-y-1"
                >
                  <i className={social.icon}></i>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-8 text-center text-gray-600 dark:text-gray-400">
          <Link href="/about">
            <p className="hover:text-primary-600 transition-colors duration-200">
              &copy; 2025 Develop by MMD FILKOM 18 Universitas Brawijaya . Semua hak dilindungi.
            </p>
          </Link>
        </div>
      </div>
    </footer>
  )
}
