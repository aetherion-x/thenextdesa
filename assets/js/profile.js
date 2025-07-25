// Profile Page JavaScript

function hideLoading() {
  const loadingElement = document.getElementById("loading")
  if (loadingElement) {
    loadingElement.style.display = "none"
  }
}

async function loadJSON(url) {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to load JSON from ${url}`)
  }
  return response.json()
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    await loadProfileContent()
    hideLoading()
  } catch (error) {
    console.error("Error loading profile content:", error)
    hideLoading()
  }
})

async function loadProfileContent() {
  try {
    const profileData = await loadJSON("data/profile.json")
    if (profileData && profileData.profile) {
      populateProfile(profileData.profile)
      // Initialize authority slider after content is populated
      setTimeout(initializeAuthoritySlider, 100)
    }
  } catch (error) {
    console.error("Error loading profile content:", error)
  }
}
// Authority slider functionality
let currentSlide = 0
let authoritySliderInterval = null

function goToSlide(slideIndex) {
  const slider = document.getElementById('authoritySlider')
  const dots = document.querySelectorAll('.authority-dot')

  if (!slider || !dots.length) return

  const totalSlides = dots.length
  currentSlide = slideIndex

  // Update slider position
  slider.style.transform = `translateX(-${currentSlide * 100}%)`

  // Update dots
  dots.forEach((dot, index) => {
    dot.classList.toggle('bg-primary-600', index === currentSlide)
    dot.classList.toggle('dark:bg-primary-400', index === currentSlide)
    dot.classList.toggle('bg-gray-300', index !== currentSlide)
    dot.classList.toggle('dark:bg-gray-600', index !== currentSlide)
  })

  // Reset auto-slide timer
  resetAuthoritySlider()
}

function nextSlide() {
  const dots = document.querySelectorAll('.authority-dot')
  if (dots.length > 1) {
    currentSlide = (currentSlide + 1) % dots.length
    goToSlide(currentSlide)
  }
}

function startAuthoritySlider() {
  const dots = document.querySelectorAll('.authority-dot')
  if (dots.length > 1) {
    authoritySliderInterval = setInterval(nextSlide, 3000) // Auto-slide every 5 seconds
  }
}

function resetAuthoritySlider() {
  if (authoritySliderInterval) {
    clearInterval(authoritySliderInterval)
    startAuthoritySlider()
  }
}

// Initialize authority slider after content is loaded
function initializeAuthoritySlider() {
  const slider = document.getElementById('authoritySlider')
  if (slider) {
    startAuthoritySlider()

    // Pause auto-slide on hover
    slider.addEventListener('mouseenter', () => {
      if (authoritySliderInterval) {
        clearInterval(authoritySliderInterval)
      }
    })

    // Resume auto-slide when mouse leaves
    slider.addEventListener('mouseleave', () => {
      startAuthoritySlider()
    })
  }
}

function populateProfile(profile) {
  const container = document.getElementById("profileContent")
  if (!container) return

  let content = ""

  // History section
  if (profile.history) {
    content += `
            <div class="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg mb-8 animate-fade-in-up">
                <h3 class="text-xl font-semibold text-primary-600 dark:text-primary-400 mb-6 flex items-center">
                    <i class="${profile.history.icon} mr-3"></i>
                    ${profile.history.title}
                </h3>
                ${profile.history.content.map((paragraph) => `<p class="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">${paragraph}</p>`).join("")}
            </div>
        `
  }

  // Authority section with automatic glider
  if (profile.authority) {
    content += `
            <div class="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg mb-8 animate-fade-in-up">
                <h3 class="text-xl font-semibold text-primary-600 dark:text-primary-400 mb-6 flex items-center">
                    <i class="${profile.authority.icon} mr-3"></i>
                    ${profile.authority.title}
                </h3>
                <div class="relative overflow-hidden">
                    <div class="authority-slider flex transition-transform duration-500 ease-in-out" id="authoritySlider">
                        ${profile.authority.members
        .map(
          (member, index) => `
                            <div class="min-w-full flex-shrink-0 px-4">
                                <div class="text-center">
                                    <div class="w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden shadow-lg">
                                        <img src="${member.photo}" alt="${member.name}" class="w-full h-full object-cover">
                                    </div>
                                    <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">${member.name}</h4>
                                    <p class="text-sm text-gray-500 dark:text-gray-400">Periode: ${member.period}</p>
                                </div>
                            </div>
                        `,
        )
        .join("")}
                    </div>
                    ${profile.authority.members.length > 1 ? `
                    <div class="flex justify-center mt-6 space-x-2">
                        ${profile.authority.members
          .map(
            (_, index) => `
                            <button class="authority-dot w-3 h-3 rounded-full transition-colors duration-300 ${index === 0 ? 'bg-primary-600 dark:bg-primary-400' : 'bg-gray-300 dark:bg-gray-600'}" 
                                    onclick="goToSlide(${index})" data-slide="${index}">
                            </button>
                        `,
          )
          .join("")}
                    </div>
                    ` : ''}
                </div>
            </div>
        `
  }
  // Vision and Mission
  if (profile.vision && profile.mission) {
    content += `
            <div class="grid md:grid-cols-2 gap-8 mb-8">
                <div class="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg animate-fade-in-up">
                    <h3 class="text-xl font-semibold text-primary-600 dark:text-primary-400 mb-6 flex items-center">
                        <i class="${profile.vision.icon} mr-3"></i>
                        ${profile.vision.title}
                    </h3>
                    <p class="text-gray-700 dark:text-gray-300 leading-relaxed italic text-lg">"${profile.vision.content}"</p>
                </div>
                <div class="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg animate-fade-in-up">
                    <h3 class="text-xl font-semibold text-primary-600 dark:text-primary-400 mb-6 flex items-center">
                        <i class="${profile.mission.icon} mr-3"></i>
                        ${profile.mission.title}
                    </h3>
                    <ul class="space-y-3">
                        ${profile.mission.content
        .map(
          (item) => `
                            <li class="text-gray-700 dark:text-gray-300 flex items-start">
                                <i class="fas fa-check text-primary-600 dark:text-primary-400 mr-3 mt-1 flex-shrink-0"></i>
                                <span>${item}</span>
                            </li>
                        `,
        )
        .join("")}
                    </ul>
                </div>
            </div>
        `
  }

  // Map section
  if (profile.map) {
    content += `
    <div class="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg mb-8 animate-fade-in-up">
      <h3 class="text-xl font-semibold text-primary-600 dark:text-primary-400 mb-6 flex items-center justify-center">
        <i class="${profile.map.icon} mr-3"></i>
        ${profile.map.title}
      </h3>
      <div class="flex justify-center">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3950.5926853995315!2d112.24407290949203!3d-8.040860280263455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7893403295fb01%3A0x679a5b38157dae73!2sBalai%20Desa%20Slorok!5e0!3m2!1sid!2sid!4v1752723297853!5m2!1sid!2sid" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
          class="rounded-lg border border-gray-200 dark:border-gray-700 w-full max-w-4xl h-[350px]">
        </iframe>
      </div>
    </div>
  `
  }


  // Leadership section
  if (profile.leadership) {
    content += `
            <div class="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg animate-fade-in-up">
                <h3 class="text-xl font-semibold text-primary-600 dark:text-primary-400 mb-6 flex items-center">
                    <i class="${profile.leadership.icon} mr-3"></i>
                    ${profile.leadership.title}
                </h3>
                <div class="grid sm:grid-cols-2 gap-6">
                    ${profile.leadership.positions
        .map(
          (position) => `
                        <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                            <h4 class="font-semibold text-gray-900 dark:text-white">${position.title}</h4>
                            <p class="text-primary-600 dark:text-primary-400 font-medium">${position.name}</p>
                            <p class="text-sm text-gray-500 dark:text-gray-400">Periode: ${position.period}</p>
                        </div>
                    `,
        )
        .join("")}
                </div>
            </div>
        `
    container.innerHTML = content
  }
}
