"use client"

import { useEffect, useState } from "react"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface JobData {
  jenis: string
  jumlah: number
}

interface JobDataSet {
  semua: JobData[]
  laki_laki: JobData[]
  perempuan: JobData[]
}

export default function PopulationData() {
  const [filter, setFilter] = useState<"semua" | "laki_laki" | "perempuan">("semua")
  const [jobData, setJobData] = useState<JobDataSet | null>(null)

  useEffect(() => {
    // Mock job data - in real app, this would come from an API
    const mockJobData: JobDataSet = {
      semua: [
        { jenis: "BELUM/TIDAK BEKERJA", jumlah: 269 },
        { jenis: "MENGURUS RUMAH TANGGA", jumlah: 269 },
        { jenis: "PELAJAR/MAHASISWA", jumlah: 323 },
        { jenis: "PETANI/PEKEBUN", jumlah: 38 },
        { jenis: "NELAYAN/PERIKANAN", jumlah: 51 },
        { jenis: "KARYAWAN SWASTA", jumlah: 117 },
        { jenis: "WIRASWASTA", jumlah: 27 },
      ],
      laki_laki: [
        { jenis: "BELUM/TIDAK BEKERJA", jumlah: 130 },
        { jenis: "PELAJAR/MAHASISWA", jumlah: 170 },
        { jenis: "PETANI/PEKEBUN", jumlah: 35 },
        { jenis: "NELAYAN/PERIKANAN", jumlah: 50 },
        { jenis: "KARYAWAN SWASTA", jumlah: 90 },
        { jenis: "WIRASWASTA", jumlah: 25 },
      ],
      perempuan: [
        { jenis: "BELUM/TIDAK BEKERJA", jumlah: 139 },
        { jenis: "MENGURUS RUMAH TANGGA", jumlah: 260 },
        { jenis: "PELAJAR/MAHASISWA", jumlah: 153 },
        { jenis: "PETANI/PEKEBUN", jumlah: 3 },
        { jenis: "NELAYAN/PERIKANAN", jumlah: 1 },
        { jenis: "KARYAWAN SWASTA", jumlah: 27 },
        { jenis: "WIRASWASTA", jumlah: 2 },
      ],
    }
    setJobData(mockJobData)
  }, [])

  const educationData = {
    labels: [
      "Tidak/Belum Sekolah",
      "Belum Tamat SD/Sederajat",
      "Tamat SD/Sederajat",
      "SLTP/Sederajat",
      "SLTA/Sederajat",
      "Diploma I/II",
      "Diploma III/Sarjana Muda",
      "Diploma IV/Strata I",
      "Strata II",
      "Strata III",
    ],
    datasets: [
      {
        label: "Jumlah Penduduk",
        data: [173, 201, 285, 140, 286, 22, 13, 26, 2, 0],
        backgroundColor: "#ff6b35",
        borderRadius: 5,
      },
    ],
  }

  const educationOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { beginAtZero: true },
    },
  }

  const currentJobData = jobData?.[filter] || []
  const sortedJobData = [...currentJobData].sort((a, b) => b.jumlah - a.jumlah)
  const top6Jobs = sortedJobData.slice(0, 6)

  return (
    <div>
      {/* Population Summary */}
      <section className="mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-black dark:text-white">Jumlah Penduduk</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="lg:col-span-2 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg flex items-center justify-center space-x-6">
              <div className="flex-shrink-0">
                <i className="fas fa-people-arrows text-blue-600 text-5xl"></i>
              </div>
              <div>
                <p className="text-base font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Total Penduduk
                </p>
                <p className="text-4xl font-bold text-black dark:text-white">8,598 Jiwa</p>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg flex items-center space-x-6">
              <div className="flex-shrink-0">
                <i className="fas fa-person-dress text-blue-600 text-5xl"></i>
              </div>
              <div>
                <p className="text-base font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Perempuan
                </p>
                <p className="text-4xl font-bold text-black dark:text-white">4,281 Jiwa</p>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg flex items-center space-x-6">
              <div className="flex-shrink-0">
                <i className="fas fa-person text-blue-600 text-5xl"></i>
              </div>
              <div>
                <p className="text-base font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Laki-laki
                </p>
                <p className="text-4xl font-bold text-black dark:text-white">4,317 Jiwa</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Religion Statistics */}
      <section className="mb-16 bg-white dark:bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Statistik Berdasarkan Agama</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Islam", count: 8285, icon: "fas fa-mosque" },
              { name: "Kristen", count: 22, icon: "fas fa-church" },
              { name: "Katolik", count: 268, icon: "fas fa-bible" },
              { name: "Hindu", count: 23, icon: "fas fa-om" },
              { name: "Buddha", count: 0, icon: "fas fa-dharmachakra" },
              { name: "Konghucu", count: 0, icon: "fas fa-yin-yang" },
              { name: "Kepercayaan Lainnya", count: 0, icon: "fas fa-pray" },
              { name: "Aliran Kepercayaan", count: 0, icon: "fas fa-praying-hands" },
            ].map((religion, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center flex flex-col items-center"
              >
                <i className={`${religion.icon} text-blue-600 text-4xl mt-2 mb-6`}></i>
                <p className="text-4xl font-extrabold text-gray-900 dark:text-white">
                  {religion.count.toLocaleString("id-ID")}
                </p>
                <p className="mt-2 text-lg font-medium text-gray-600 dark:text-gray-300">{religion.name}</p>
                <p className="text-sm text-gray-400 dark:text-gray-500">Jiwa</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Statistics */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4">
            <h2 className="text-3xl font-bold text-black dark:text-white mb-4">Berdasarkan Pekerjaan</h2>
          </div>
          <div className="flex justify-center mb-8 gap-2 pt-12">
            {[
              { key: "semua", label: "Semua" },
              { key: "laki_laki", label: "Laki-laki" },
              { key: "perempuan", label: "Perempuan" },
            ].map((filterOption) => (
              <button
                key={filterOption.key}
                onClick={() => setFilter(filterOption.key as any)}
                className={`px-4 py-2 rounded-lg shadow transition-colors duration-200 ${
                  filter === filterOption.key
                    ? "bg-blue-600 text-white"
                    : "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                }`}
              >
                {filterOption.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
              <div className="flex items-center bg-blue-600 text-white p-3 rounded-t-lg">
                <span className="font-semibold flex-1">Jenis Pekerjaan</span>
                <span className="font-semibold text-right">Jumlah</span>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {sortedJobData.map((job, index) => (
                  <div key={index} className="flex items-center p-3 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-sm flex-1">{job.jenis}</span>
                    <span className="text-sm font-semibold text-right">{job.jumlah.toLocaleString("id-ID")}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {top6Jobs.map((job, index) => (
                <div key={index} className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 truncate">{job.jenis}</p>
                  <p className="text-4xl font-bold">{job.jumlah.toLocaleString("id-ID")}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education Statistics */}
      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black dark:text-white">Berdasarkan Pendidikan</h2>
          </div>
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
            <div className="overflow-x-auto">
              <div className="relative h-96" style={{ minWidth: "800px" }}>
                <Bar data={educationData} options={educationOptions} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
