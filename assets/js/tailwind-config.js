import tailwind from "tailwindcss"

// Tailwind CSS Configuration
tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: {
          50: "#f0f9f0",
          100: "#dcf2dc",
          200: "#bce5bc",
          300: "#8dd18d",
          400: "#4caf50",
          500: "#2e7d32",
          600: "#1b5e20",
          700: "#174e1a",
          800: "#153f17",
          900: "#133515",
        },
        accent: "#ff6b35",
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s ease-out",
        "fade-in-right": "fadeInRight 0.6s ease-out",
        "spin-slow": "spin 2s linear infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        fadeInRight: {
          "0%": {
            opacity: "0",
            transform: "translateX(30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
      },
    },
  },
  darkMode: "class",
}
