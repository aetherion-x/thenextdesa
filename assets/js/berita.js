// Berita Page JavaScript

let newsData = []
let filteredNews = []
let currentPage = 1
const newsPerPage = 6

function hideLoading() {
  const loadingElement = document.getElementById("loading")
  if (loadingElement) {
    loadingElement.classList.add("hidden")
  }
}

async function loadJSON(url) {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error("Network response was not ok")
  }
  return response.json()
}

function formatDate(date) {
  const options = { year: "numeric", month: "long", day: "numeric" }
  return new Date(date).toLocaleDateString(undefined, options)
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    await loadNewsContent()
    initializeNewsFilters()
    displayNews()
    hideLoading()
  } catch (error) {
    console.error("Error loading news content:", error)
    hideLoading()
  }
})

async function loadNewsContent() {
  try {
    const data = await loadJSON("data/news.json")
    if (data && data.news) {
      newsData = data.news
      filteredNews = [...newsData]
    }
  } catch (error) {
    console.error("Error loading news content:", error)
  }
}

function initializeNewsFilters() {
  // Category filter buttons
  const filterButtons = document.querySelectorAll(".filter-btn")
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      filterButtons.forEach((btn) => btn.classList.remove("active"))
      this.classList.add("active")

      const category = this.getAttribute("data-category")
      filterNewsByCategory(category)
    })
  })

  // Search functionality
  const searchInput = document.getElementById("searchInput")
  const searchBtn = document.getElementById("searchBtn")

  if (searchInput && searchBtn) {
    searchBtn.addEventListener("click", () => {
      const query = searchInput.value.trim()
      searchNews(query)
    })

    searchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        const query = this.value.trim()
        searchNews(query)
      }
    })
  }
}

function filterNewsByCategory(category) {
  if (category === "all") {
    filteredNews = [...newsData]
  } else {
    filteredNews = newsData.filter((news) => news.category === category)
  }

  currentPage = 1
  displayNews()
}

function searchNews(query) {
  if (!query) {
    filteredNews = [...newsData]
  } else {
    filteredNews = newsData.filter(
      (news) =>
        news.title.toLowerCase().includes(query.toLowerCase()) ||
        news.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        news.content.toLowerCase().includes(query.toLowerCase()),
    )
  }

  currentPage = 1
  displayNews()
}

function displayNews() {
  const newsGrid = document.getElementById("newsGrid")
  const loadMoreBtn = document.getElementById("loadMoreBtn")

  if (!newsGrid) return

  const startIndex = (currentPage - 1) * newsPerPage
  const endIndex = currentPage * newsPerPage
  const newsToShow = filteredNews.slice(startIndex, endIndex)

  newsGrid.innerHTML = ""

  newsToShow.forEach((news) => {
    const newsElement = document.createElement("article")
    newsElement.className =
      "bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"

    newsElement.innerHTML = `
            <img src="${news.image}" alt="${news.title}" class="w-full h-48 object-cover">
            <div class="p-6">
                <div class="flex items-center justify-between mb-3">
                    <span class="text-sm text-gray-500 dark:text-gray-400 font-medium">${formatDate(news.date)}</span>
                    <span class="bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 px-2 py-1 rounded text-xs font-medium">${news.category}</span>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">${news.title}</h3>
                <p class="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">${news.excerpt}</p>
                <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-500 dark:text-gray-400">Oleh: ${news.author}</span>
                    <button onclick="showNewsDetail(${news.id})" class="text-primary-600 dark:text-primary-400 font-semibold hover:text-primary-700 transition-colors duration-200 flex items-center space-x-1">
                        <span>Baca</span>
                        <i class="fas fa-arrow-right text-sm"></i>
                    </button>
                </div>
            </div>
        `
    newsGrid.appendChild(newsElement)
  })

  // Show/hide load more button
  if (loadMoreBtn) {
    if (endIndex < filteredNews.length) {
      loadMoreBtn.classList.remove("hidden")
      loadMoreBtn.onclick = () => {
        currentPage++
        displayNews()
      }
    } else {
      loadMoreBtn.classList.add("hidden")
    }
  }

  // Show no results message
  if (filteredNews.length === 0) {
    newsGrid.innerHTML = `
            <div class="col-span-full text-center py-12">
                <i class="fas fa-search text-4xl text-gray-400 mb-4"></i>
                <h3 class="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">Tidak ada berita ditemukan</h3>
                <p class="text-gray-500 dark:text-gray-500">Coba ubah filter atau kata kunci pencarian</p>
            </div>
        `
  }
}

function showNewsDetail(newsId) {
  const news = newsData.find((n) => n.id === newsId)
  if (!news) return

  const modal = document.createElement("div")
  modal.className = "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
  modal.innerHTML = `
        <div class="bg-white dark:bg-gray-900 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div class="p-6">
                <div class="flex justify-between items-start mb-4">
                    <h2 class="text-2xl font-bold text-gray-900 dark:text-white pr-4">${news.title}</h2>
                    <button onclick="this.closest('.fixed').remove()" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl flex-shrink-0">×</button>
                </div>
                <img src="${news.image}" alt="${news.title}" class="w-full h-64 object-cover rounded-lg mb-4">
                <div class="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <span><i class="fas fa-calendar mr-1"></i>${formatDate(news.date)}</span>
                    <span><i class="fas fa-user mr-1"></i>${news.author}</span>
                    <span class="bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 px-2 py-1 rounded">${news.category}</span>
                </div>
                <div class="prose dark:prose-invert max-w-none">
                    <p class="text-gray-700 dark:text-gray-300 leading-relaxed">${news.content}</p>
                </div>
            </div>
        </div>
    `

  document.body.appendChild(modal)

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.remove()
    }
  })
}
