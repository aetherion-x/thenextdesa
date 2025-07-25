// Common JavaScript for all pages - Dark Mode and Mobile Menu

// Initialize theme immediately to prevent flash
;(() => {
  const savedTheme = localStorage.getItem("theme") || "light"
  if (savedTheme === "dark") {
    document.documentElement.classList.add("dark")
  }
})()

document.addEventListener("DOMContentLoaded", () => {
  initializeDarkMode()
  initializeMobileMenu()
  loadFooter()
})

// Dark Mode Functions
function initializeDarkMode() {
  const darkModeToggle = document.getElementById("darkModeToggle")
  if (!darkModeToggle) return

  // Set initial theme
  const savedTheme = localStorage.getItem("theme") || "light"
  setTheme(savedTheme)

  // Add click listener
  darkModeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.classList.contains("dark") ? "dark" : "light"
    const newTheme = currentTheme === "dark" ? "light" : "dark"
    setTheme(newTheme)
  })
}

function setTheme(theme) {
  if (theme === "dark") {
    document.documentElement.classList.add("dark")
  } else {
    document.documentElement.classList.remove("dark")
  }

  localStorage.setItem("theme", theme)

  // Update toggle button icon
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

  // Trigger event for charts
  window.dispatchEvent(new CustomEvent("themeChanged", { detail: { theme } }))
}

// Mobile Menu Functions
function initializeMobileMenu() {
  const mobileMenuToggle = document.getElementById("mobileMenuToggle")
  const mobileMenu = document.getElementById("mobileMenu")

  if (!mobileMenuToggle || !mobileMenu) return

  mobileMenuToggle.addEventListener("click", function () {
    mobileMenu.classList.toggle("hidden")

    // Animate hamburger menu
    const spans = this.querySelectorAll("span")
    if (mobileMenu.classList.contains("hidden")) {
      spans[0].style.transform = "none"
      spans[1].style.opacity = "1"
      spans[2].style.transform = "none"
    } else {
      spans[0].style.transform = "rotate(-45deg) translate(-5px, 6px)"
      spans[1].style.opacity = "0"
      spans[2].style.transform = "rotate(45deg) translate(-5px, -6px)"
    }
  })

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!mobileMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
      mobileMenu.classList.add("hidden")

      // Reset hamburger menu
      const spans = mobileMenuToggle.querySelectorAll("span")
      spans[0].style.transform = "none"
      spans[1].style.opacity = "1"
      spans[2].style.transform = "none"
    }
  })
}

// Utility Functions
async function loadJSON(url) {
  try {
    const response = await fetch(url)
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    return await response.json()
  } catch (error) {
    console.error(`Error loading ${url}:`, error)
    return null
  }
}

function hideLoading() {
  const loading = document.getElementById("loading")
  if (loading) {
    setTimeout(() => {
      loading.style.display = "none"
    }, 1000)
  }
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `fixed top-4 right-4 max-w-sm bg-white dark:bg-gray-800 border-l-4 ${
    type === "success" ? "border-green-500" : type === "error" ? "border-red-500" : "border-blue-500"
  } rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300`

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

// Load Footer
async function loadFooter() {
  try {
    const configData = await loadJSON("data/config.json")
    if (configData && configData.contact) {
      populateFooter(configData.contact)
    }
  } catch (error) {
    console.error("Error loading footer:", error)
  }
}

function populateFooter(contact) {
  const container = document.getElementById("footerContent")
  if (!container) return

  container.innerHTML = `
        <div>
            <h3 class="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-4">Kontak Kami</h3>
            <div class="space-y-3 text-gray-600 dark:text-gray-300">
                <p class="flex items-start space-x-3">
                    <i class="fas fa-map-marker-alt text-primary-600 dark:text-primary-400 mt-1 flex-shrink-0"></i>
                    <span>${contact.address}</span>
                </p>
                <p class="flex items-center space-x-3">
                    <i class="fas fa-phone text-primary-600 dark:text-primary-400 flex-shrink-0"></i>
                    <span>${contact.phone}</span>
                </p>
                <p class="flex items-center space-x-3">
                    <i class="fas fa-envelope text-primary-600 dark:text-primary-400 flex-shrink-0"></i>
                    <span>${contact.email}</span>
                </p>
            </div>
        </div>
        
        <div>
            <h3 class="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-4">Jam Pelayanan</h3>
            <div class="space-y-2 text-gray-600 dark:text-gray-300">
                <p>${contact.workingHours.weekdays}</p>
                <p>${contact.workingHours.saturday}</p>
                <p>${contact.workingHours.sunday}</p>
            </div>
        </div>
        
        <div>
            <h3 class="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-4">Media Sosial</h3>
            <div class="flex space-x-4">
                ${contact.socialMedia
                  .map(
                    (social) => `
                    <a href="${social.url}" class="w-10 h-10 bg-primary-600 hover:bg-primary-700 text-white rounded-full flex items-center justify-center transition-all duration-200 transform hover:-translate-y-1">
                        <i class="${social.icon}"></i>
                    </a>
                `,
                  )
                  .join("")}
            </div>
        </div>
    `
}
