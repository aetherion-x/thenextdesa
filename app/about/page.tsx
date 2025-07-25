import Link from "next/link"
import Image from "next/image"

export const metadata = {
  title: "About - MMD FILKOM 18",
  description: "Tim pengembang website Desa Slorok",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      {/* Header Section */}
      <header
        className="py-16 px-4"
        style={{
          background: "linear-gradient(135deg, #F5F5DC 0%, #D2B48C 50%, #C7A882 100%)",
        }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <h1
            className="text-5xl md:text-7xl font-bold mb-8 animate-fade-in-up"
            style={{
              background: "linear-gradient(135deg, #8B4513, #6F4E37)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            MMD FILKOM 18
          </h1>
          <div className="relative group max-w-2xl mx-auto">
            <div className="w-full h-full bg-white rounded-xl shadow-lg transition-transform duration-300 hover:scale-105">
              <Image
                src="/assets/img/team.jpg"
                alt="Team MMD FILKOM 18"
                width={800}
                height={600}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12" style={{ color: "#6F4E37" }}>
            Tentang Kami
          </h2>
          <div
            className="p-8 rounded-2xl shadow-xl"
            style={{
              background: "linear-gradient(to right, #F5F5DC, #D2B48C)",
            }}
          >
            <p className="text-lg leading-relaxed text-center mb-6" style={{ color: "#8B4513" }}>
              MMD FILKOM 18 adalah tim yang berdedikasi untuk menciptakan solusi digital inovatif. Kami terdiri dari
              mahasiswa-mahasiswa berbakat dari Fakultas Ilmu Komputer yang berkomitmen untuk mengembangkan teknologi
              yang bermanfaat bagi masyarakat.
            </p>
            <p className="text-lg leading-relaxed text-center" style={{ color: "#8B4513" }}>
              Dengan semangat kolaborasi dan inovasi, kami bekerja sama untuk mewujudkan visi digital yang dapat
              memberikan dampak positif bagi lingkungan sekitar.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-12 px-4"
        style={{
          background: "linear-gradient(135deg, #F5F5DC 0%, #D2B48C 50%, #C7A882 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4" style={{ color: "#6F4E37" }}>
            MMD FILKOM 18
          </h3>
          <p className="mb-6" style={{ color: "#8B4513" }}>
            Bersama membangun masa depan digital yang lebih baik
          </p>
          <div className="flex justify-center space-x-6">
            <Link
              href="https://instagram.com/mmd18_filkom_slorok"
              target="_blank"
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#6F4E37"
                className="w-7 h-7"
              >
                <rect width="18" height="18" x="3" y="3" rx="5" stroke="#6F4E37" strokeWidth="1.5" fill="none" />
                <circle cx="12" cy="12" r="4" stroke="#6F4E37" strokeWidth="1.5" fill="none" />
                <circle cx="17" cy="7" r="1" fill="#6F4E37" />
              </svg>
            </Link>
            <Link
              href="https://tiktok.com/@mmd18_filkom_slor"
              target="_blank"
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-7 h-7">
                <path
                  d="M34.5 10.5c-1.7 0-3-1.3-3-3V6h-5v24.5c0 3.6-2.9 6.5-6.5 6.5S13.5 34.1 13.5 30.5 16.4 24 20 24c.2 0 .5 0 .7.1V19.7c-.2 0-.5-.1-.7-.1-6.1 0-11 4.9-11 11s4.9 11 11 11 11-4.9 11-11V18.1c1.4 1.2 3.2 1.9 5.1 1.9h1.4v-5h-1.4z"
                  fill="#6F4E37"
                />
              </svg>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
