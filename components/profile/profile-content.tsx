"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface AuthorityMember {
  name: string
  period: string
  photo: string
  description: string
}

interface ProfileData {
  history: {
    title: string
    icon: string
    content: string[]
  }
  authority: {
    title: string
    icon: string
    members: AuthorityMember[]
  }
  vision: {
    title: string
    icon: string
    content: string
  }
  mission: {
    title: string
    icon: string
    content: string[]
  }
  map: {
    title: string
    icon: string
  }
  leadership: {
    title: string
    icon: string
    positions: Array<{
      title: string
      name: string
      period: string
    }>
  }
}

export default function ProfileContent() {
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await fetch("/data/profile.json")
        const data = await response.json()
        setProfile(data.profile)
      } catch (error) {
        console.error("Error loading profile:", error)
      }
    }

    loadProfile()
  }, [])

  useEffect(() => {
    if (profile?.authority?.members && profile.authority.members.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev === profile.authority.members.length - 1 ? 0 : prev + 1))
      }, 3000)

      return () => clearInterval(interval)
    }
  }, [profile])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  if (!profile) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {/* History Section */}
      {profile.history && (
        <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg mb-8 animate-fade-in-up">
          <h3 className="text-xl font-semibold text-primary-600 dark:text-primary-400 mb-6 flex items-center">
            <i className={`${profile.history.icon} mr-3`}></i>
            {profile.history.title}
          </h3>
          {profile.history.content.map((paragraph, index) => (
            <p key={index} className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      )}

      {/* Authority Section */}
      {profile.authority && (
        <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg mb-8 animate-fade-in-up">
          <h3 className="text-xl font-semibold text-primary-600 dark:text-primary-400 mb-6 flex items-center">
            <i className={`${profile.authority.icon} mr-3`}></i>
            {profile.authority.title}
          </h3>
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {profile.authority.members.map((member, index) => (
                <div key={index} className="min-w-full flex-shrink-0 px-4">
                  <div className="text-center">
                    <div className="w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden shadow-lg">
                      <Image
                        src={member.photo || "/placeholder.svg"}
                        alt={member.name}
                        width={192}
                        height={192}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{member.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Periode: {member.period}</p>
                  </div>
                </div>
              ))}
            </div>
            {profile.authority.members.length > 1 && (
              <div className="flex justify-center mt-6 space-x-2">
                {profile.authority.members.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                      index === currentSlide ? "bg-primary-600 dark:bg-primary-400" : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Vision and Mission */}
      {profile.vision && profile.mission && (
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg animate-fade-in-up">
            <h3 className="text-xl font-semibold text-primary-600 dark:text-primary-400 mb-6 flex items-center">
              <i className={`${profile.vision.icon} mr-3`}></i>
              {profile.vision.title}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed italic text-lg">
              "{profile.vision.content}"
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg animate-fade-in-up">
            <h3 className="text-xl font-semibold text-primary-600 dark:text-primary-400 mb-6 flex items-center">
              <i className={`${profile.mission.icon} mr-3`}></i>
              {profile.mission.title}
            </h3>
            <ul className="space-y-3">
              {profile.mission.content.map((item, index) => (
                <li key={index} className="text-gray-700 dark:text-gray-300 flex items-start">
                  <i className="fas fa-check text-primary-600 dark:text-primary-400 mr-3 mt-1 flex-shrink-0"></i>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Gallery Slider */}
      <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg mb-8 animate-fade-in-up">
        <h3 className="text-xl font-semibold text-primary-600 dark:text-primary-400 mb-6 flex items-center">
          <i className="fas fa-images mr-3"></i>
          Galeri Desa
        </h3>
        <div className="relative w-full h-64 md:h-96 overflow-hidden rounded-xl">
          <GallerySlider />
        </div>
      </div>

      {/* Map Section */}
      {profile.map && (
        <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg mb-8 animate-fade-in-up">
          <h3 className="text-xl font-semibold text-primary-600 dark:text-primary-400 mb-6 flex items-center justify-center">
            <i className={`${profile.map.icon} mr-3`}></i>
            {profile.map.title}
          </h3>
          <div className="flex justify-center">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3950.5926853995315!2d112.24407290949203!3d-8.040860280263455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7893403295fb01%3A0x679a5b38157dae73!2sBalai%20Desa%20Slorok!5e0!3m2!1sid!2sid!4v1752723297853!5m2!1sid!2sid"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg border border-gray-200 dark:border-gray-700 w-full max-w-4xl h-[350px]"
            />
          </div>
        </div>
      )}

      {/* Leadership Section */}
      {profile.leadership && (
        <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg animate-fade-in-up">
          <h3 className="text-xl font-semibold text-primary-600 dark:text-primary-400 mb-6 flex items-center">
            <i className={`${profile.leadership.icon} mr-3`}></i>
            {profile.leadership.title}
          </h3>
          <div className="grid sm:grid-cols-2 gap-6">
            {profile.leadership.positions.map((position, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
              >
                <h4 className="font-semibold text-gray-900 dark:text-white">{position.title}</h4>
                <p className="text-primary-600 dark:text-primary-400 font-medium">{position.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Periode: {position.period}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function GallerySlider() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const images = [
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1932&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1505080857763-eecb2da806a0?q=80&w=1740&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1471879832106-c7ab9e013d84?q=80&w=1674&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1586511925558-a4c6376fe658?q=80&w=1887&auto=format&fit=crop",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [images.length])

  return (
    <div
      className="flex transition-transform duration-700 ease-in-out h-full"
      style={{ transform: `translateX(-${currentIndex * 100}%)` }}
    >
      {images.map((src, index) => (
        <div key={index} className="w-full flex-shrink-0 h-full">
          <Image
            src={src || "/placeholder.svg"}
            alt={`Galeri Desa ${index + 1}`}
            width={800}
            height={400}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  )
}
