// Form Validation JavaScript

// Validate entire form
function validateForm(form) {
  let isValid = true
  const requiredFields = form.querySelectorAll("[required]")

  requiredFields.forEach((field) => {
    if (!validateField(field)) {
      isValid = false
    }
  })

  return isValid
}

// Validate individual field
function validateField(field) {
  const value = field.value.trim()
  const fieldName = field.name
  let isValid = true
  let errorMessage = ""

  // Clear previous error
  clearFieldError(field)

  // Required field validation
  if (field.hasAttribute("required") && !value) {
    errorMessage = "Field ini wajib diisi"
    isValid = false
  }

  // Specific field validations
  if (value && isValid) {
    switch (fieldName) {
      case "nik":
        if (!/^\d{16}$/.test(value)) {
          errorMessage = "NIK harus terdiri dari 16 digit angka"
          isValid = false
        }
        break

      case "phone":
        if (!/^(\+62|62|0)[0-9]{9,13}$/.test(value.replace(/\s/g, ""))) {
          errorMessage = "Format nomor telepon tidak valid"
          isValid = false
        }
        break

      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errorMessage = "Format email tidak valid"
          isValid = false
        }
        break

      case "fullName":
        if (value.length < 3) {
          errorMessage = "Nama lengkap minimal 3 karakter"
          isValid = false
        }
        break
    }
  }

  // Show error if validation failed
  if (!isValid) {
    showFieldError(field, errorMessage)
  }

  return isValid
}

// Show field error
function showFieldError(field, message) {
  const errorElement = field.parentNode.querySelector(".error-message")

  field.classList.add("border-red-500")
  field.classList.remove("border-gray-300", "dark:border-gray-600")

  if (errorElement) {
    errorElement.textContent = message
    errorElement.classList.remove("hidden")
  }
}

// Clear field error
function clearFieldError(field) {
  const errorElement = field.parentNode.querySelector(".error-message")

  field.classList.remove("border-red-500")
  field.classList.add("border-gray-300", "dark:border-gray-600")

  if (errorElement) {
    errorElement.textContent = ""
    errorElement.classList.add("hidden")
  }
}

// Initialize form validation
function initializeFormValidation(form) {
  if (!form) return

  // Real-time validation
  const inputs = form.querySelectorAll("input, select, textarea")
  inputs.forEach((input) => {
    input.addEventListener("blur", function () {
      validateField(this)
    })

    input.addEventListener("input", function () {
      clearFieldError(this)
    })
  })
}
