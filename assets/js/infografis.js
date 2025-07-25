// import { Chart } from "@/components/ui/chart"
// Infografis Page JavaScript

let chartsData = {}
let charts = {}

// Initialize Infografis Page
async function initializeInfografisPage() {
  try {
    await loadChartsData()
    initializeCharts()
    populateStatisticsSummary()
    hideLoading()
  } catch (error) {
    console.error("Error initializing infografis page:", error)
    hideLoading()
  }
}

// Load Charts Data
async function loadChartsData() {
  try {
    const response = await fetch("data/charts.json")
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    chartsData = await response.json()
    console.log("Charts data loaded successfully:", chartsData)
  } catch (error) {
    console.error("Error loading charts data:", error)
    chartsData = getDefaultChartsData()
  }
}

// Get Default Charts Data
function getDefaultChartsData() {
  return {
    charts: {
      demography: {
        title: "Demografi Penduduk",
        type: "doughnut",
        data: {
          labels: ["Laki-laki", "Perempuan"],
          datasets: [
            {
              data: [1300, 1200],
              backgroundColor: ["#2E7D32", "#4CAF50"],
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "bottom",
            },
          },
        },
      },
      education: {
        title: "Tingkat Pendidikan",
        type: "bar",
        data: {
          labels: ["SD", "SMP", "SMA", "Diploma", "S1", "S2/S3"],
          datasets: [
            {
              label: "Jumlah Penduduk",
              data: [800, 600, 450, 150, 200, 50],
              backgroundColor: "#1976D2",
              borderColor: "#0D47A1",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      },
      occupation: {
        title: "Mata Pencaharian",
        type: "pie",
        data: {
          labels: ["Petani", "Pedagang", "PNS", "Swasta", "Buruh", "Lainnya"],
          datasets: [
            {
              data: [900, 400, 200, 300, 350, 350],
              backgroundColor: ["#4CAF50", "#FF9800", "#2196F3", "#9C27B0", "#F44336", "#607D8B"],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "right",
            },
          },
        },
      },
      economy: {
        title: "Perkembangan Ekonomi",
        type: "line",
        data: {
          labels: ["2019", "2020", "2021", "2022", "2023", "2024"],
          datasets: [
            {
              label: "Pendapatan Desa (Juta Rupiah)",
              data: [2800, 2650, 2900, 3200, 3500, 3800],
              borderColor: "#4CAF50",
              backgroundColor: "rgba(76, 175, 80, 0.1)",
              tension: 0.4,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      },
    },
  }
}

// Initialize All Charts
function initializeCharts() {
  if (!chartsData.charts) {
    console.error("No charts data available")
    return
  }

  // Destroy existing charts if they exist
  Object.values(charts).forEach((chart) => {
    if (chart) chart.destroy()
  })
  charts = {}

  // Initialize each chart
  Object.keys(chartsData.charts).forEach((chartKey) => {
    const chartConfig = chartsData.charts[chartKey]
    const canvas = document.getElementById(chartKey + "Chart")

    if (canvas && chartConfig) {
      console.log(`Initializing chart: ${chartKey}`)
      initializeChart(chartKey, canvas, chartConfig)
    } else {
      console.warn(`Canvas or config not found for chart: ${chartKey}`)
    }
  })
}

// Initialize Individual Chart
function initializeChart(chartKey, canvas, config) {
  try {
    const ctx = canvas.getContext("2d")

    // Create a deep copy of the config to avoid modifying the original
    const processedConfig = JSON.parse(JSON.stringify(config))

    // Set theme-appropriate colors
    updateChartThemeColors(processedConfig)

    // Create the chart
    charts[chartKey] = new Chart(ctx, {
      type: processedConfig.type,
      data: processedConfig.data,
      options: {
        ...processedConfig.options,
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          ...processedConfig.options?.plugins,
          legend: {
            ...processedConfig.options?.plugins?.legend,
            labels: {
              ...processedConfig.options?.plugins?.legend?.labels,
              color: getThemeColor("text"),
              font: {
                family: "Poppins",
              },
            },
          },
        },
        scales: processedConfig.options?.scales
          ? {
              ...processedConfig.options.scales,
              y: processedConfig.options.scales.y
                ? {
                    ...processedConfig.options.scales.y,
                    ticks: {
                      ...processedConfig.options.scales.y.ticks,
                      color: getThemeColor("textSecondary"),
                      font: {
                        family: "Poppins",
                      },
                    },
                    grid: {
                      color: getThemeColor("border"),
                    },
                  }
                : undefined,
              x: processedConfig.options.scales.x
                ? {
                    ...processedConfig.options.scales.x,
                    ticks: {
                      ...processedConfig.options.scales.x.ticks,
                      color: getThemeColor("textSecondary"),
                      font: {
                        family: "Poppins",
                      },
                    },
                    grid: {
                      color: getThemeColor("border"),
                    },
                  }
                : undefined,
            }
          : undefined,
      },
    })

    console.log(`Chart ${chartKey} initialized successfully`)
  } catch (error) {
    console.error(`Error initializing chart ${chartKey}:`, error)
  }
}

// Get theme-appropriate color
function getThemeColor(colorType) {
  const isDark = document.documentElement.classList.contains("dark")

  const colors = {
    text: isDark ? "#ffffff" : "#111827",
    textSecondary: isDark ? "#9ca3af" : "#6b7280",
    border: isDark ? "#374151" : "#e5e7eb",
    background: isDark ? "#1f2937" : "#ffffff",
  }

  return colors[colorType] || colors.text
}

// Update chart theme colors
function updateChartThemeColors(config) {
  // Update border colors for doughnut and pie charts
  if (config.data?.datasets) {
    config.data.datasets.forEach((dataset) => {
      if (dataset.borderColor === undefined && (config.type === "doughnut" || config.type === "pie")) {
        dataset.borderColor = getThemeColor("background")
        dataset.borderWidth = 2
      }
    })
  }
}

// Update charts theme when dark mode is toggled
function updateChartsTheme() {
  Object.values(charts).forEach((chart) => {
    if (chart) {
      // Update legend colors
      if (chart.options.plugins?.legend?.labels) {
        chart.options.plugins.legend.labels.color = getThemeColor("text")
      }

      // Update scales colors
      if (chart.options.scales) {
        ;["x", "y"].forEach((axis) => {
          if (chart.options.scales[axis]) {
            if (chart.options.scales[axis].ticks) {
              chart.options.scales[axis].ticks.color = getThemeColor("textSecondary")
            }
            if (chart.options.scales[axis].grid) {
              chart.options.scales[axis].grid.color = getThemeColor("border")
            }
          }
        })
      }

      chart.update()
    }
  })
}

// Populate Statistics Summary
function populateStatisticsSummary() {
  const summaryContainer = document.getElementById("statisticsSummary")
  if (!summaryContainer) return

  const statistics = [
    {
      icon: "fas fa-users",
      title: "Total Penduduk",
      value: "2,500",
      description: "Jiwa",
      color: "text-blue-600",
    },
    {
      icon: "fas fa-graduation-cap",
      title: "Tingkat Pendidikan",
      value: "65%",
      description: "Lulusan SMA ke atas",
      color: "text-green-600",
    },
    {
      icon: "fas fa-briefcase",
      title: "Mata Pencaharian",
      value: "36%",
      description: "Sektor Pertanian",
      color: "text-yellow-600",
    },
    {
      icon: "fas fa-chart-line",
      title: "Pertumbuhan Ekonomi",
      value: "15%",
      description: "Peningkatan tahun ini",
      color: "text-purple-600",
    },
  ]

  summaryContainer.innerHTML = ""

  statistics.forEach((stat, index) => {
    const statElement = document.createElement("div")
    statElement.className =
      "bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
    statElement.style.animationDelay = `${index * 0.1}s`
    statElement.innerHTML = `
            <i class="${stat.icon} text-4xl ${stat.color} mb-4"></i>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">${stat.value}</h3>
            <p class="text-gray-600 dark:text-gray-300 font-medium mb-1">${stat.title}</p>
            <p class="text-sm text-gray-500 dark:text-gray-400">${stat.description}</p>
        `
    summaryContainer.appendChild(statElement)
  })
}

// Utility functions
function hideLoading() {
  const loadingElement = document.getElementById("loading")
  if (loadingElement) {
    setTimeout(() => {
      loadingElement.classList.add("opacity-0")
      setTimeout(() => {
        loadingElement.style.display = "none"
      }, 500)
    }, 1000)
  }
}

// Handle window resize
window.addEventListener(
  "resize",
  debounce(() => {
    Object.values(charts).forEach((chart) => {
      if (chart) chart.resize()
    })
  }, 250),
)

// Debounce utility function
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Listen for theme changes
document.addEventListener("DOMContentLoaded", () => {
  // Initialize page
  initializeInfografisPage()

  // Listen for theme changes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "attributes" && mutation.attributeName === "class") {
        updateChartsTheme()
      }
    })
  })

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  })
})
