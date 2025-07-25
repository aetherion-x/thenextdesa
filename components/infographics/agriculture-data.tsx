"use client"

import { Bar, Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend)

export default function AgricultureData() {
  const years = ["2018", "2019", "2020", "2021", "2022"]

  const livestockData = {
    labels: years,
    datasets: [
      {
        label: "Sapi",
        data: [1235, 1236, 1240, 1240, 1240],
        backgroundColor: "#4caf50",
      },
      {
        label: "Kambing",
        data: [153, 155, 160, 160, 160],
        backgroundColor: "#8dd18d",
      },
      {
        label: "Ayam",
        data: [1720, 1700, 1750, 1750, 1750],
        backgroundColor: "#bce5bc",
      },
    ],
  }

  const plantationData = {
    labels: years,
    datasets: [
      {
        label: "Kelapa",
        data: [2, 2, 2, 2, 2],
        backgroundColor: "#4caf50",
      },
      {
        label: "Karet",
        data: [0, 0, 0, 0, 0],
        backgroundColor: "#8dd18d",
      },
      {
        label: "Kopi",
        data: [0, 0, 0, 0, 0],
        backgroundColor: "#bce5bc",
      },
    ],
  }

  const foodCropData = {
    labels: years,
    datasets: [
      {
        label: "Padi",
        data: [118, 120, 120, 120, 120],
        borderColor: "#ff6b35",
        tension: 0.1,
      },
      {
        label: "Jagung",
        data: [93, 96, 96, 96, 96],
        borderColor: "#4caf50",
        tension: 0.1,
      },
      {
        label: "Kacang Tanah",
        data: [5, 5, 5, 5, 5],
        borderColor: "#2e7d32",
        tension: 0.1,
      },
      {
        label: "Tomat",
        data: [13, 15, 15, 15, 15],
        borderColor: "#8dd18d",
        tension: 0.1,
      },
      {
        label: "Cabe",
        data: [24, 25, 25, 25, 25],
        borderColor: "#bce5bc",
        tension: 0.1,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: "top" as const } },
    scales: { y: { beginAtZero: true } },
  }

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: "top" as const } },
    scales: {
      y: {
        beginAtZero: true,
        max: 150,
      },
    },
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold text-center text-gray-800 dark:text-white mb-4">Data Potensi Peternakan</h3>
          <div className="h-80">
            <Bar data={livestockData} options={chartOptions} />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold text-center text-gray-800 dark:text-white mb-4">
            Data Potensi Perkebunan (Ton)
          </h3>
          <div className="h-80">
            <Bar data={plantationData} options={chartOptions} />
          </div>
        </div>
      </div>
      <div>
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold text-center text-gray-800 dark:text-white mb-4">
            Data Potensi Tanaman Pangan
          </h3>
          <div className="overflow-x-auto">
            <div className="relative h-96" style={{ minWidth: "800px" }}>
              <Line data={foodCropData} options={lineChartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
