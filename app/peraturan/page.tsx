"use client";

import { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function PeraturanPage() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const years = Array.from({ length: 15 }, (_, i) => 2024 - i);

  // Simulasi data peraturan dinamis berdasarkan tahun
  const allRegulations = years.flatMap((year) => [
    {
      id: `${year}-1`,
      year: year,
      title: `Peraturan Desa Tahun ${year}`,
      link: `/dokumen/peraturan-desa-${year}.pdf`,
    },
    {
      id: `${year}-2`,
      year: year,
      title: `Peraturan Kepala Desa ${year}`,
      link: `/dokumen/peraturan-kepala-desa-${year}.pdf`,
    },
    {
      id: `${year}-3`,
      year: year,
      title: `Surat Keputusan Kepala Desa ${year}`,
      link: `/dokumen/surat-keputusan-kepala-desa-${year}.pdf`,
    },
  ]);

  const filteredRegulations = allRegulations.filter(
    (reg) => reg.year === selectedYear
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <Header />
      <main className="pt-16 min-h-screen">
        <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold mb-4">Peraturan Desa</h1>
            <p className="text-xl opacity-90">
              Kumpulan dokumen peraturan yang berlaku di Desa Slorok.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-center gap-4">
              <label htmlFor="year-filter" className="font-semibold text-lg">
                Pilih Tahun:
              </label>
              <select
                id="year-filter"
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* --- BAGIAN YANG DIUBAH --- */}
            <div className="space-y-12">
              {" "}
              {/* Menambah jarak antar pratinjau */}
              {filteredRegulations.length > 0 ? (
                filteredRegulations.map((regulation) => (
                  <div
                    key={regulation.id}
                    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      {regulation.title}
                    </h3>
                    <iframe
                      src={regulation.link}
                      className="w-full h-[75vh] rounded-md border border-gray-300 dark:border-gray-600"
                      title={regulation.title}
                    >
                      Browser Anda tidak mendukung pratinjau PDF. Silakan{" "}
                      <a
                        href={regulation.link}
                        className="text-primary-600 underline"
                      >
                        unduh dokumennya
                      </a>
                      .
                    </iframe>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Tidak ada peraturan yang ditemukan untuk tahun {selectedYear}.
                </p>
              )}
            </div>
            {/* --- AKHIR BAGIAN YANG DIUBAH --- */}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}