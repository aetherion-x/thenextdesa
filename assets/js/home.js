// Home Page JavaScript

let siteData = {};
let newsData = []; // Mengubah menjadi array untuk menampung data berita

// Fungsi untuk menyembunyikan animasi loading
function hideLoading() {
  const loadingElement = document.getElementById("loading");
  if (loadingElement) loadingElement.style.display = "none";
}

// Fungsi untuk memuat data JSON dari URL
async function loadJSON(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Gagal memuat ${url}`);
  return response.json();
}

// Fungsi untuk memformat tanggal
function formatDate(date) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString("id-ID", options);
}

// Inisialisasi Halaman Beranda saat DOM siap
document.addEventListener("DOMContentLoaded", async () => {
  try {
    await loadHomeContent();
    hideLoading();
  } catch (error) {
    console.error("Error memuat konten beranda:", error);
    hideLoading();
  }
});

// Memuat konten utama untuk halaman beranda
async function loadHomeContent() {
  try {
    // Memuat data konfigurasi dan berita secara bersamaan
    const [configData, loadedNewsData] = await Promise.all([
      loadJSON("data/config.json"),
      loadJSON("data/news.json"),
    ]);

    if (configData) {
      siteData = configData;
      populateInfoCards(siteData.infoCards);
      populateHeroSection();
      populateFooter();

      // Memperbarui judul situs dan teks brand
      if (siteData.site?.title) {
        document.title = siteData.site.title + " - Beranda";
        const brandText = document.getElementById("brandText");
        if (brandText) brandText.textContent = siteData.site.title;
      }
    }

    if (loadedNewsData && loadedNewsData.news) {
      newsData = loadedNewsData.news; // Menyimpan data berita ke variabel global
      populateNews(newsData); // Menampilkan semua berita
    }
  } catch (error) {
    console.error("Error memuat konten beranda:", error);
  }
}

// Mengisi kartu informasi
function populateInfoCards(infoCards) {
  const container = document.getElementById("infoCards");
  if (!container || !infoCards) return;

  container.innerHTML = "";
  infoCards.forEach((card) => {
    const cardElement = document.createElement("div");
    cardElement.className =
      "bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2";
    cardElement.innerHTML = `
            <i class="${card.icon} text-4xl text-primary-600 dark:text-primary-400 mb-4"></i>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">${card.number}</h3>
            <p class="text-gray-600 dark:text-gray-300 font-medium">${card.label}</p>
        `;
    container.appendChild(cardElement);
  });
}

// Menampilkan semua berita di halaman beranda
function populateNews(news) {
  const container = document.getElementById("newsGrid");
  if (!container || !news) return;

  container.innerHTML = "";
  // Tidak lagi menggunakan .slice(0, 3) untuk menampilkan semua berita
  news.forEach((item) => {
    const newsElement = document.createElement("article");
    newsElement.className =
      "bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2";

    newsElement.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="w-full h-48 object-cover">
            <div class="p-6">
                <div class="flex items-center justify-between mb-3">
                    <span class="text-sm text-gray-500 dark:text-gray-400 font-medium">${formatDate(
                      item.date
                    )}</span>
                    <span class="bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 px-2 py-1 rounded text-xs font-medium">${
                      item.category
                    }</span>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">${
                  item.title
                }</h3>
                <p class="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">${
                  item.excerpt
                }</p>
                <button onclick="showNewsModal(${
                  item.id
                })" class="text-primary-600 dark:text-primary-400 font-semibold hover:text-primary-700 transition-colors duration-200 flex items-center space-x-1">
                    <span>Baca Selengkapnya</span>
                    <i class="fas fa-arrow-right text-sm"></i>
                </button>
            </div>
        `;
    container.appendChild(newsElement);
  });
}

// Menampilkan modal detail berita
function showNewsModal(newsId) {
  const news = newsData.find((n) => n.id === newsId);
  if (!news) return;

  const modal = document.createElement("div");
  modal.className =
    "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4";
  modal.innerHTML = `
        <div class="bg-white dark:bg-gray-900 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div class="p-6">
                <div class="flex justify-between items-start mb-4">
                    <h2 class="text-2xl font-bold text-gray-900 dark:text-white pr-4">${
                      news.title
                    }</h2>
                    <button onclick="this.closest('.fixed').remove()" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl flex-shrink-0">&times;</button>
                </div>
                <img src="${
                  news.image
                }" alt="${news.title}" class="w-full h-64 object-cover rounded-lg mb-4">
                <div class="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <span><i class="fas fa-calendar mr-1"></i>${formatDate(
                      news.date
                    )}</span>
                    <span><i class="fas fa-user mr-1"></i>${news.author}</span>
                    <span class="bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 px-2 py-1 rounded">${
                      news.category
                    }</span>
                </div>
                <div class="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed">
                   ${news.content}
                </div>
            </div>
        </div>
    `;

  document.body.appendChild(modal);

  // Menutup modal saat mengklik di luar area konten
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });
}

// Mengisi bagian hero
function populateHeroSection() {
  const heroTitle = document.getElementById("heroTitle");
  const heroSubtitle = document.getElementById("heroSubtitle");

  if (heroTitle && siteData.hero?.title) {
    heroTitle.textContent = siteData.hero.title;
  }

  if (heroSubtitle && siteData.hero?.subtitle) {
    heroSubtitle.textContent = siteData.hero.subtitle;
  }
}

// Mengisi bagian footer
function populateFooter() {
  const footerContent = document.getElementById("footerContent");
  if (!footerContent || !siteData.contact) return;

  const contact = siteData.contact;

  footerContent.innerHTML = `
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
                    <a href="${social.url}" target="_blank" rel="noopener noreferrer" class="w-10 h-10 bg-primary-600 hover:bg-primary-700 text-white rounded-full flex items-center justify-center transition-all duration-200 transform hover:-translate-y-1">
                        <i class="${social.icon}"></i>
                    </a>
                `
                  )
                  .join("")}
            </div>
        </div>
    `;
}
