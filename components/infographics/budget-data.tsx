"use client"

import { useEffect, useState } from "react"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
import { 
  subscribeToRevenueData,
  subscribeToExpenditureData,
  subscribeToBudgetSummary,
  initializeBudgetData,
  type RevenueData,
  type ExpenditureData,
  type BudgetSummary
} from "@/lib/budget-service"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function BudgetData() {
  const [revenueData, setRevenueData] = useState<RevenueData[]>([])
  const [expenditureData, setExpenditureData] = useState<ExpenditureData[]>([])
  const [budgetSummary, setBudgetSummary] = useState<BudgetSummary | null>(null)
  const [loading, setLoading] = useState(true)
  const currentYear = 2024

  useEffect(() => {
    // Initialize data if needed
    const initData = async () => {
      await initializeBudgetData(currentYear)
    }

    // Subscribe to real-time updates
    const unsubscribeRevenue = subscribeToRevenueData(currentYear, (data) => {
      setRevenueData(data)
      if (data.length > 0) setLoading(false)
    })
    
    const unsubscribeExpenditure = subscribeToExpenditureData(currentYear, (data) => {
      setExpenditureData(data)
      if (data.length > 0) setLoading(false)
    })
    
    const unsubscribeSummary = subscribeToBudgetSummary(currentYear, (data) => {
      setBudgetSummary(data)
      if (data) setLoading(false)
    })

    initData()

    return () => {
      unsubscribeRevenue()
      unsubscribeExpenditure()
      unsubscribeSummary()
    }
  }, [currentYear])
  const formatCurrency = (value: number) => {
    if (value >= 1.0e9) return "Rp " + (value / 1.0e9).toFixed(2) + " M"
    if (value >= 1.0e6) return "Rp " + (value / 1.0e6).toFixed(1) + " Jt"
    if (value >= 1.0e3) return "Rp " + (value / 1.0e3).toFixed(1) + " Rb"
    return "Rp " + value
  }

  // Transform Firebase data to Chart.js format
  const revenueChartData = {
    labels: revenueData.map(item => item.name),
    datasets: [
      {
        label: "Anggaran (Rp)",
        data: revenueData.map(item => item.amount),
        backgroundColor: ["#2e7d32", "#4caf50", "#8dd18d"],
        borderRadius: 5,
      },
    ],
  }

  const expenditureChartData = {
    labels: expenditureData.map(item => item.name),
    datasets: [
      {
        label: "Anggaran (Rp)",
        data: expenditureData.map(item => item.amount),
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

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
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
              <p className="mt-2 text-2xl font-bold text-green-500">
                {budgetSummary ? `Rp${budgetSummary.totalRevenue.toLocaleString("id-ID")}` : 'Loading...'}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
              <div className="flex items-center text-sm font-semibold text-gray-500 dark:text-gray-400">
                <i className="fas fa-arrow-down text-red-500 mr-2"></i>
                Belanja
              </div>
              <p className="mt-2 text-2xl font-bold text-red-500">
                {budgetSummary ? `Rp${budgetSummary.totalExpenditure.toLocaleString("id-ID")}` : 'Loading...'}
              </p>
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
            <Bar data={revenueChartData} options={revenueOptions} />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold text-center text-gray-800 dark:text-white mb-4">Detail Belanja Desa</h3>
          <div className="h-96">
            <Bar data={expenditureChartData} options={expenditureOptions} />
          </div>
        </div>
      </div>
    </div>
  )
}
