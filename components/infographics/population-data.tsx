"use client"

import { useEffect, useState } from "react"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface JobData {
  jenis: string
  jumlah: number
}

interface JobDataSet {
  semua: JobData[]
  laki_laki: JobData[]
  perempuan: JobData[]
}

export default function PopulationData() {
  const [filter, setFilter] = useState<"semua" | "laki_laki" | "perempuan">("semua")
  const [jobData, setJobData] = useState<JobDataSet | null>(null)

  useEffect(() => {
    // Data mentah diisi dengan angka acak (random)
    const rawData = [
        { pekerjaan: "BELUM/TIDAK BEKERJA", laki: 958, perempuan: 856 },
        { pekerjaan: "MENGURUS RUMAH TANGGA", laki: 25, perempuan: 1228 },
        { pekerjaan: "PELAJAR/MAHASISWA", laki: 640, perempuan: 614 },
        { pekerjaan: "PENSIUNAN", laki: 14, perempuan: 11 },
        { pekerjaan: "PEGAWAI NEGERI SIPIL (PNS)", laki: 26, perempuan: 19 },
        { pekerjaan: "TENTARA NASIONAL INDONESIA", laki: 5, perempuan: 0 },
        { pekerjaan: "KEPOLISIAN RI (POLRI)", laki: 2, perempuan: 0 },
        { pekerjaan: "PERDAGANGAN", laki: 85, perempuan: 106 },
        { pekerjaan: "PETANI/PEKEBUN", laki: 532, perempuan: 259 },
        { pekerjaan: "PETERNAK", laki: 19, perempuan: 3 },
        { pekerjaan: "NELAYAN/PERIKANAN", laki: 8, perempuan: 4 },
        { pekerjaan: "INDUSTRI", laki: 13, perempuan: 5 },
        { pekerjaan: "KONSTRUKSI", laki: 45, perempuan: 2 },
        { pekerjaan: "TRANSPORTASI", laki: 21, perempuan: 1 },
        { pekerjaan: "KARYAWAN SWASTA", laki: 798, perempuan: 483 },
        { pekerjaan: "KARYAWAN BUMN", laki: 9, perempuan: 12 },
        { pekerjaan: "KARYAWAN BUMD", laki: 4, perempuan: 3 },
        { pekerjaan: "KARYAWAN HONORER", laki: 12, perempuan: 18 },
        { pekerjaan: "BURUH HARIAN LEPAS", laki: 265, perempuan: 78 },
        { pekerjaan: "BURUH TANI/PERKEBUNAN", laki: 362, perempuan: 205 },
        { pekerjaan: "BURUH NELAYAN/PERIKANAN", laki: 5, perempuan: 2 },
        { pekerjaan: "BURUH PETERNAKAN", laki: 7, perempuan: 13 },
        { pekerjaan: "PEMBANTU RUMAH TANGGA", laki: 3, perempuan: 38 },
        { pekerjaan: "TUKANG CUKUR", laki: 15, perempuan: 2 },
        { pekerjaan: "TUKANG LISTRIK", laki: 9, perempuan: 0 },
        { pekerjaan: "TUKANG BATU", laki: 24, perempuan: 0 },
        { pekerjaan: "TUKANG KAYU", laki: 13, perempuan: 0 },
        { pekerjaan: "TUKANG SOL SEPATU", laki: 5, perempuan: 0 },
        { pekerjaan: "TUKANG LAS/PANDAI BESI", laki: 11, perempuan: 0 },
        { pekerjaan: "TUKANG JAHIT", laki: 2, perempuan: 16 },
        { pekerjaan: "TUKANG GIGI", laki: 1, perempuan: 1 },
        { pekerjaan: "PENATA RIAS", laki: 1, perempuan: 12 },
        { pekerjaan: "PENATA BUSANA", laki: 0, perempuan: 5 },
        { pekerjaan: "PENATA RAMBUT", laki: 2, perempuan: 8 },
        { pekerjaan: "MEKANIK", laki: 18, perempuan: 0 },
        { pekerjaan: "SENIMAN", laki: 4, perempuan: 3 },
        { pekerjaan: "TABIB", laki: 2, perempuan: 3 },
        { pekerjaan: "PARAJI", laki: 0, perempuan: 5 },
        { pekerjaan: "PERANCANG BUSANA", laki: 1, perempuan: 4 },
        { pekerjaan: "PENTERJEMAH", laki: 2, perempuan: 2 },
        { pekerjaan: "IMAM MASJID", laki: 3, perempuan: 0 },
        { pekerjaan: "PENDETA", laki: 1, perempuan: 0 },
        { pekerjaan: "PASTOR", laki: 1, perempuan: 0 },
        { pekerjaan: "WARTAWAN", laki: 3, perempuan: 2 },
        { pekerjaan: "USTADZ/MUBALIGH", laki: 5, perempuan: 1 },
        { pekerjaan: "JURU MASAK", laki: 2, perempuan: 15 },
        { pekerjaan: "PROMOTOR ACARA", laki: 1, perempuan: 1 },
        { pekerjaan: "ANGGOTA DPR RI", laki: 0, perempuan: 0 },
        { pekerjaan: "ANGGOTA DPD RI", laki: 0, perempuan: 0 },
        { pekerjaan: "ANGGOTA BPK", laki: 0, perempuan: 0 },
        { pekerjaan: "PRESIDEN", laki: 0, perempuan: 0 },
        { pekerjaan: "WAKIL PRESIDEN", laki: 0, perempuan: 0 },
        { pekerjaan: "ANGGOTA MAHKAMAH KONSTITUSI", laki: 0, perempuan: 0 },
        { pekerjaan: "ANGGOTA KABINET KEMENTRIAN", laki: 0, perempuan: 0 },
        { pekerjaan: "DUTA BESAR", laki: 0, perempuan: 0 },
        { pekerjaan: "GUBERNUR", laki: 0, perempuan: 0 },
        { pekerjaan: "WAKIL GUBERNUR", laki: 0, perempuan: 0 },
        { pekerjaan: "BUPATI", laki: 1, perempuan: 0 },
        { pekerjaan: "WAKIL BUPATI", laki: 1, perempuan: 0 },
        { pekerjaan: "WALIKOTA", laki: 0, perempuan: 0 },
        { pekerjaan: "WAKIL WALIKOTA", laki: 0, perempuan: 0 },
        { pekerjaan: "ANGGOTA DPRD PROP.", laki: 2, perempuan: 1 },
        { pekerjaan: "ANGGOTA DPRD KAB./KOT.", laki: 3, perempuan: 2 },
        { pekerjaan: "DOSEN", laki: 15, perempuan: 18 },
        { pekerjaan: "GURU", laki: 24, perempuan: 40 },
        { pekerjaan: "PILOT", laki: 3, perempuan: 0 },
        { pekerjaan: "PENGACARA", laki: 5, perempuan: 2 },
        { pekerjaan: "NOTARIS", laki: 3, perempuan: 4 },
        { pekerjaan: "ARSITEK", laki: 4, perempuan: 3 },
        { pekerjaan: "AKUNTAN", laki: 6, perempuan: 7 },
        { pekerjaan: "KONSULTAN", laki: 8, perempuan: 5 },
        { pekerjaan: "DOKTER", laki: 10, perempuan: 12 },
        { pekerjaan: "BIDAN", laki: 0, perempuan: 15 },
        { pekerjaan: "PERAWAT", laki: 7, perempuan: 21 },
        { pekerjaan: "APOTEKER", laki: 2, perempuan: 8 },
        { pekerjaan: "PSIKIATER/PSIKOLOG", laki: 1, perempuan: 3 },
        { pekerjaan: "PENYIAR TELEVISI", laki: 2, perempuan: 3 },
        { pekerjaan: "PENYIAR RADIO", laki: 4, perempuan: 4 },
        { pekerjaan: "PELAUT", laki: 22, perempuan: 1 },
        { pekerjaan: "PENELITI", laki: 5, perempuan: 6 },
        { pekerjaan: "SOPIR", laki: 55, perempuan: 1 },
        { pekerjaan: "PIALANG", laki: 3, perempuan: 2 },
        { pekerjaan: "PARANORMAL", laki: 2, perempuan: 1 },
        { pekerjaan: "PEDAGANG", laki: 150, perempuan: 104 },
        { pekerjaan: "PERANGKAT DESA", laki: 8, perempuan: 3 },
        { pekerjaan: "KEPALA DESA", laki: 1, perempuan: 0 },
        { pekerjaan: "BIARAWAN/BIARAWATI", laki: 1, perempuan: 3 },
        { pekerjaan: "WIRASWASTA", laki: 330, perempuan: 203 },
        { pekerjaan: "ANGGOTA LEMB. TINGGI LAINNYA", laki: 2, perempuan: 0 },
        { pekerjaan: "ARTIS", laki: 1, perempuan: 2 },
        { pekerjaan: "ATLIT", laki: 5, perempuan: 3 },
        { pekerjaan: "CHEFF", laki: 4, perempuan: 6 },
        { pekerjaan: "MANAJER", laki: 12, perempuan: 9 },
        { pekerjaan: "TENAGA TATA USAHA", laki: 8, perempuan: 15 },
        { pekerjaan: "OPERATOR", laki: 25, perempuan: 10 },
        { pekerjaan: "PEKERJA PENGOLAHAN KERAJINAN", laki: 10, perempuan: 25 },
        { pekerjaan: "TEKNISI", laki: 30, perempuan: 5 },
        { pekerjaan: "ASISTEN AHLI", laki: 7, perempuan: 10 },
        { pekerjaan: "PEKERJAAN LAINNYA", laki: 50, perempuan: 45 },
    ];

    // Memproses data untuk setiap kategori
    const newJobData: JobDataSet = {
      semua: rawData
        .map(item => ({
          jenis: item.pekerjaan,
          jumlah: item.laki + item.perempuan,
        }))
        .filter(item => item.jumlah > 0), // Filter pekerjaan dengan jumlah > 0
      laki_laki: rawData
        .map(item => ({
          jenis: item.pekerjaan,
          jumlah: item.laki,
        }))
        .filter(item => item.jumlah > 0), // Filter pekerjaan dengan jumlah > 0
      perempuan: rawData
        .map(item => ({
          jenis: item.pekerjaan,
          jumlah: item.perempuan,
        }))
        .filter(item => item.jumlah > 0), // Filter pekerjaan dengan jumlah > 0
    };
    
    setJobData(newJobData);
  }, []);

  const educationData = {
    labels: [
      "Tidak/Belum Sekolah",
      "Belum Tamat SD/Sederajat",
      "Tamat SD/Sederajat",
      "SLTP/Sederajat",
      "SLTA/Sederajat",
      "Diploma I/II",
      "Diploma III/Sarjana Muda",
      "Diploma IV/Strata I",
      "Strata II",
      "Strata III",
    ],
    datasets: [
      {
        label: "Jumlah Penduduk",
        data: [173, 201, 285, 140, 286, 22, 13, 26, 2, 0],
        backgroundColor: "#ff6b35",
        borderRadius: 5,
      },
    ],
  };

  const educationOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  const currentJobData = jobData?.[filter] || [];
  // Urutkan data pekerjaan dari yang terbanyak
  const sortedJobData = [...currentJobData].sort((a, b) => b.jumlah - a.jumlah);
  // Ambil 6 pekerjaan teratas untuk ditampilkan dalam kartu
  const top6Jobs = sortedJobData.slice(0, 6);

  return (
    <div>
      {/* Population Summary */}
      <section className="mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-black dark:text-white">Jumlah Penduduk</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="lg:col-span-2 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg flex items-center justify-center space-x-6">
              <div className="flex-shrink-0">
                <i className="fas fa-people-arrows text-blue-600 text-5xl"></i>
              </div>
              <div>
                <p className="text-base font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Total Penduduk
                </p>
                <p className="text-4xl font-bold text-black dark:text-white">8,598 Jiwa</p>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg flex items-center space-x-6">
              <div className="flex-shrink-0">
                <i className="fas fa-person-dress text-blue-600 text-5xl"></i>
              </div>
              <div>
                <p className="text-base font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Perempuan
                </p>
                <p className="text-4xl font-bold text-black dark:text-white">4,281 Jiwa</p>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg flex items-center space-x-6">
              <div className="flex-shrink-0">
                <i className="fas fa-person text-blue-600 text-5xl"></i>
              </div>
              <div>
                <p className="text-base font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Laki-laki
                </p>
                <p className="text-4xl font-bold text-black dark:text-white">4,317 Jiwa</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Religion Statistics */}
      <section className="mb-16 bg-white dark:bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Statistik Berdasarkan Agama</h2>
          </div>
          {(() => {
            const religions = [
              { name: "Islam", count: 8285, icon: "fas fa-mosque" },
              { name: "Kristen", count: 22, icon: "fas fa-church" },
              { name: "Katolik", count: 268, icon: "fas fa-bible" },
              { name: "Hindu", count: 23, icon: "fas fa-om" },
              { name: "Buddha", count: 0, icon: "fas fa-dharmachakra" },
              { name: "Konghucu", count: 0, icon: "fas fa-yin-yang" },
              { name: "Kepercayaan", count: 0, icon: "fas fa-pray" },
            ];
            const firstRowReligions = religions.slice(0, 4);
            const secondRowReligions = religions.slice(4);
            return (
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {firstRowReligions.map((religion, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center flex flex-col items-center">
                      <i className={`${religion.icon} text-blue-600 text-4xl mt-2 mb-6`}></i>
                      <p className="text-4xl font-extrabold text-gray-900 dark:text-white">
                        {religion.count.toLocaleString("id-ID")}
                      </p>
                      <p className="mt-2 text-lg font-medium text-gray-600 dark:text-gray-300">{religion.name}</p>
                      <p className="text-sm text-gray-400 dark:text-gray-500">Jiwa</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex justify-center flex-wrap gap-8">
                  {secondRowReligions.map((religion, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center flex flex-col items-center w-full sm:w-auto lg:w-[calc(25%-1.5rem)]">
                      <i className={`${religion.icon} text-blue-600 text-4xl mt-2 mb-6`}></i>
                      <p className="text-4xl font-extrabold text-gray-900 dark:text-white">
                        {religion.count.toLocaleString("id-ID")}
                      </p>
                      <p className="mt-2 text-lg font-medium text-gray-600 dark:text-gray-300">{religion.name}</p>
                      <p className="text-sm text-gray-400 dark:text-gray-500">Jiwa</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* Job Statistics */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4">
            <h2 className="text-3xl font-bold text-black dark:text-white mb-4">Berdasarkan Pekerjaan</h2>
          </div>
          <div className="flex justify-center mb-8 gap-2 pt-12">
            {[
              { key: "semua", label: "Semua" },
              { key: "laki_laki", label: "Laki-laki" },
              { key: "perempuan", label: "Perempuan" },
            ].map((filterOption) => (
              <button
                key={filterOption.key}
                onClick={() => setFilter(filterOption.key as any)}
                className={`px-4 py-2 rounded-lg shadow transition-colors duration-200 ${
                  filter === filterOption.key
                    ? "bg-blue-600 text-white"
                    : "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                }`}
              >
                {filterOption.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
              <div className="flex items-center bg-blue-600 text-white p-3 rounded-t-lg">
                <span className="font-semibold flex-1">Jenis Pekerjaan</span>
                <span className="font-semibold text-right">Jumlah</span>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {sortedJobData.map((job, index) => (
                  <div key={index} className="flex items-center p-3 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-sm flex-1">{job.jenis}</span>
                    <span className="text-sm font-semibold text-right">{job.jumlah.toLocaleString("id-ID")}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {top6Jobs.map((job, index) => (
                <div key={index} className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 truncate">{job.jenis}</p>
                  <p className="text-4xl font-bold">{job.jumlah.toLocaleString("id-ID")}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education Statistics */}
      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black dark:text-white">Berdasarkan Pendidikan</h2>
          </div>
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
            <div className="overflow-x-auto">
              <div className="relative h-96" style={{ minWidth: "800px" }}>
                <Bar data={educationData} options={educationOptions} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}