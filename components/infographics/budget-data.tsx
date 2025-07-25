"use client"

import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function BudgetData() {
  const formatCurrency = (value: number) => {
    if (value >= 1.0e9) return "Rp " + (value / 1.0e9).toFixed(2) + " M"
    if (value >= 1.0e6) return "Rp " + (value / 1.0e6).toFixed(1) + " Jt"
    if (value >= 1.0e3) return "Rp " + (value / 1.0e3).toFixed(1) + " Rb"
    return "Rp " + value
  }

  const revenueData = {
    labels: ["Pendapatan Asli Desa", "Pendapatan Transfer", "Pendapatan Lain-lain"],
    datasets: [
      {
        label: "Anggaran (Rp)",
        data: [325310200, 2089649500, 0],
        backgroundColor: ["#2e7d32", "#4caf50", "#8dd18d"],
        borderRadius: 5,
      },
    ],
  }

  const expenditureData = {
    labels: [
      "Penyelenggaraan Pemerintahan Desa",
      "Pelaksanaan Pembangunan Desa",
      "Pembinaan Kemasyarakatan",
      "Pemberdayaan Masyarakat Desa",
      "Penanggulangan Bencana, Keadaan Darurat dan Mendesak",
    ],
    datasets: [
      {
        label: "Anggaran (Rp)",
        data: [1123785756.34, 1187744000, 73627444, 218317000, 173093000],
        backgroundColor: ["#ff6b35", "#ff8a5c", "#ffab8a", "#ffcba8", "#ffe8d6"],
        borderRadius: 5,
      },
    ],
  }

  const revenueOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: any) => formatCurrency(value),
        },
      },
    },
  }

  const expenditureOptions = {
    indexAxis: "y" as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          callback: (value: any) => formatCurrency(value),
        },
      },
    },
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center mb-16">
        <div className="lg:col-span-1 text-center lg:text-left">
          <h2 className="text-3xl lg:text-4xl font-bold text-black dark:text-white mb-2">APBD Desa 2024</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Ringkasan Anggaran Pendapatan dan Belanja Desa tahun berjalan.
          </p>
        </div>
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
              <div className="flex items-center text-sm font-semibold text-gray-500 dark:text-gray-400">
                <i className="fas fa-arrow-up text-green-500 mr-2"></i>
                Pendapatan
              </div>
              <p className="mt-2 text-2xl font-bold text-green-500">Rp{(2414959700).toLocaleString("id-ID")}</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
              <div className="flex items-center text-sm font-semibold text-gray-500 dark:text-gray-400">
                <i className="fas fa-arrow-down text-red-500 mr-2"></i>
                Belanja
              </div>
              <p className="mt-2 text-2xl font-bold text-red-500">Rp{(2776567200).toLocaleString("id-ID")}</p>
            </div>
          </div>
        </div>
      </div>

      <hr className="my-16 border-gray-200 dark:border-gray-700" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold text-center text-gray-800 dark:text-white mb-4">
            Detail Pendapatan Desa
          </h3>
          <div className="h-96">
            <Bar data={revenueData} options={revenueOptions} />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold text-center text-gray-800 dark:text-white mb-4">Detail Belanja Desa</h3>
          <div className="h-96">
            <Bar data={expenditureData} options={expenditureOptions} />
          </div>
        </div>
      </div>
    </div>
  )
}
