// Reusable Components

// Header Component
function createHeader() {
  return `
        <div class="fixed top-0 left-0 w-full h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 z-40 transition-colors duration-300">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
                <div class="flex items-center space-x-3">
                    <img src="/placeholder.svg?height=40&width=40" alt="Logo Desa" class="w-10 h-10 rounded-full">
                    <span id="brandText" class="text-lg font-semibold text-primary-600 dark:text-primary-400">Desa Slorok</span>
                </div>
                
                <!-- Navigation Menu -->
                <nav class="hidden md:block">
                    <ul class="flex space-x-8">
                        <li><a href="index.html" class="nav-link flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200">
                            <i class="fas fa-home"></i>
                            <span>Beranda</span>
                        </a></li>
                        <li><a href="profil.html" class="nav-link flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200">
                            <i class="fas fa-info-circle"></i>
                            <span>Profil Desa</span>
                        </a></li>
                        <li><a href="infografis.html" class="nav-link flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200">
                            <i class="fas fa-chart-bar"></i>
                            <span>Infografis</span>
                        </a></li>
                        <li><a href="layanan.html" class="nav-link flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200">
                            <i class="fas fa-cogs"></i>
                            <span>Layanan</span>
                        </a></li>
                        <li><a href="berita.html" class="nav-link flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200">
                            <i class="fas fa-newspaper"></i>
                            <span>Berita</span>
                        </a></li>
                    </ul>
                </nav>

                <!-- Header Controls -->
                <div class="flex items-center space-x-4">
                    <button id="darkModeToggle" class="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-primary-600 hover:border-primary-600 transition-all duration-200">
                        <i class="fas fa-moon"></i>
                    </button>
                    <button class="md:hidden w-10 h-10 flex flex-col justify-center items-center space-y-1" id="mobileMenuToggle">
                        <span class="w-6 h-0.5 bg-gray-600 dark:bg-gray-300 transition-all duration-300"></span>
                        <span class="w-6 h-0.5 bg-gray-600 dark:bg-gray-300 transition-all duration-300"></span>
                        <span class="w-6 h-0.5 bg-gray-600 dark:bg-gray-300 transition-all duration-300"></span>
                    </button>
                </div>
            </div>

            <!-- Mobile Menu -->
            <nav id="mobileMenu" class="md:hidden hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                <ul class="px-4 py-2 space-y-1">
                    <li><a href="index.html" class="nav-link-mobile flex items-center space-x-3 px-3 py-3 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">
                        <i class="fas fa-home w-5"></i>
                        <span>Beranda</span>
                    </a></li>
                    <li><a href="profil.html" class="nav-link-mobile flex items-center space-x-3 px-3 py-3 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">
                        <i class="fas fa-info-circle w-5"></i>
                        <span>Profil Desa</span>
                    </a></li>
                    <li><a href="infografis.html" class="nav-link-mobile flex items-center space-x-3 px-3 py-3 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">
                        <i class="fas fa-chart-bar w-5"></i>
                        <span>Infografis</span>
                    </a></li>
                    <li><a href="layanan.html" class="nav-link-mobile flex items-center space-x-3 px-3 py-3 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">
                        <i class="fas fa-cogs w-5"></i>
                        <span>Layanan</span>
                    </a></li>
                    <li><a href="berita.html" class="nav-link-mobile flex items-center space-x-3 px-3 py-3 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">
                        <i class="fas fa-newspaper w-5"></i>
                        <span>Berita</span>
                    </a></li>
                </ul>
            </nav>
        </div>
    `
}

// Footer Component
function createFooter() {
  return `
        <div class="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-12">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div id="footerContent" class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <!-- Footer content will be populated by JavaScript -->
                </div>

                <div class="border-t border-gray-200 dark:border-gray-700 pt-8 text-center text-gray-600 dark:text-gray-400">
                    <p>&copy; 2024 Desa Slorok. Semua hak dilindungi.</p>
                </div>
            </div>
        </div>
    `
}

// Initialize Components
function initializeComponents() {
  // Load Header
  const headerElement = document.getElementById("header")
  if (headerElement) {
    headerElement.innerHTML = createHeader()
  }

  // Load Footer
  const footerElement = document.getElementById("footer")
  if (footerElement) {
    footerElement.innerHTML = createFooter()
  }

  // Initialize mobile menu
  initializeMobileMenu()

  // Initialize dark mode
  initializeDarkMode()

  // Set active navigation
  setActiveNavigation()
}

// Mobile Menu Functionality
function initializeMobileMenu() {
  const mobileMenuToggle = document.getElementById("mobileMenuToggle")
  const mobileMenu = document.getElementById("mobileMenu")

  if (mobileMenuToggle && mobileMenu) {
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
}

// Dark Mode Functionality
function initializeDarkMode() {
  const darkModeToggle = document.getElementById("darkModeToggle")

  if (darkModeToggle) {
    const savedTheme = localStorage.getItem("theme") || "light"
    setTheme(savedTheme)

    darkModeToggle.addEventListener("click", () => {
      const currentTheme = document.documentElement.classList.contains("dark") ? "dark" : "light"
      const newTheme = currentTheme === "dark" ? "light" : "dark"
      setTheme(newTheme)
    })
  }
}

// Set Theme
function setTheme(theme) {
  if (theme === "dark") {
    document.documentElement.classList.add("dark")
  } else {
    document.documentElement.classList.remove("dark")
  }

  localStorage.setItem("theme", theme)

  const darkModeToggle = document.getElementById("darkModeToggle")
  if (darkModeToggle) {
    const icon = darkModeToggle.querySelector("i")
    if (theme === "dark") {
      icon.className = "fas fa-sun"
    } else {
      icon.className = "fas fa-moon"
    }
  }
}

// Set Active Navigation
function setActiveNavigation() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html"
  const navLinks = document.querySelectorAll(".nav-link, .nav-link-mobile")

  navLinks.forEach((link) => {
    const href = link.getAttribute("href")
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("text-primary-600", "bg-primary-50", "dark:bg-primary-900/20")
    }
  })
}

// Initialize components when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initializeComponents()
})
