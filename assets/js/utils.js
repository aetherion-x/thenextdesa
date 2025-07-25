// Utility Functions

// Data Loading Functions
async function loadJSON(url) {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error(`Error loading ${url}:`, error)
    return null
  }
}

// Hide Loading Screen
function hideLoading() {
  const loading = document.getElementById("loading")
  if (loading) {
    setTimeout(() => {
      loading.classList.add("opacity-0")
      setTimeout(() => {
        loading.style.display = "none"
      }, 500)
    }, 1000)
  }
}

// Show Notification
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `fixed top-4 right-4 max-w-sm bg-white dark:bg-gray-800 border-l-4 ${type === "success" ? "border-green-500" : type === "error" ? "border-red-500" : "border-blue-500"} rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300`

  const iconClass =
    type === "success"
      ? "fa-check-circle text-green-500"
      : type === "error"
        ? "fa-exclamation-circle text-red-500"
        : "fa-info-circle text-blue-500"

  notification.innerHTML = `
        <div class="flex items-center p-4">
            <i class="fas ${iconClass} text-xl mr-3"></i>
            <div class="flex-1">
                <p class="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">${message}</p>
            </div>
            <button onclick="this.closest('.fixed').remove()" class="ml-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `

  document.body.appendChild(notification)

  // Animate in
  setTimeout(() => {
    notification.classList.remove("translate-x-full")
  }, 100)

  // Auto remove after 5 seconds
  setTimeout(() => {
    notification.classList.add("translate-x-full")
    setTimeout(() => {
      if (document.body.contains(notification)) {
        notification.remove()
      }
    }, 300)
  }, 5000)
}

// Format Date
function formatDate(dateString, locale = "id-ID") {
  const date = new Date(dateString)
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

// Debounce Function
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

// Scroll to Top
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}

// Get Theme Color for Charts
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

// Initialize Animations
function initializeAnimations() {
  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-fade-in-up")
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(".bg-white, .bg-gray-900")
  animatedElements.forEach((el) => {
    observer.observe(el)
  })
}

// Handle Online/Offline Status
function initializeConnectionStatus() {
  window.addEventListener("online", () => {
    showNotification("Koneksi internet tersambung kembali", "success")
  })

  window.addEventListener("offline", () => {
    showNotification("Koneksi internet terputus", "error")
  })
}

// Set Theme - Global function for all pages
window.setTheme = (theme) => {
  console.log("Setting theme to:", theme)

  if (theme === "dark") {
    document.documentElement.classList.add("dark")
  } else {
    document.documentElement.classList.remove("dark")
  }

  localStorage.setItem("theme", theme)

  // Update toggle button icon if it exists
  const darkModeToggle = document.getElementById("darkModeToggle")
  if (darkModeToggle) {
    const icon = darkModeToggle.querySelector("i")
    if (icon) {
      if (theme === "dark") {
        icon.className = "fas fa-sun"
      } else {
        icon.className = "fas fa-moon"
      }
    }
  }

  // Trigger custom event for charts and other components
  window.dispatchEvent(new CustomEvent("themeChanged", { detail: { theme } }))
}

// Initialize theme on page load
function initializeTheme() {
  const savedTheme = localStorage.getItem("theme") || "light"
  console.log("Initializing theme:", savedTheme)

  // Apply theme immediately to prevent flash
  if (savedTheme === "dark") {
    document.documentElement.classList.add("dark")
  } else {
    document.documentElement.classList.remove("dark")
  }
}

// Call this immediately when the script loads
initializeTheme()

// Initialize common utilities
document.addEventListener("DOMContentLoaded", () => {
  initializeAnimations()
  initializeConnectionStatus()
})
