"use client"

import { useEffect, useState } from "react"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
import { 
  subscribeToPopulationData,
  subscribeToReligionsData,
  subscribeToJobsData,
  subscribeToEducationData,
  initializeDemographicData,
  type PopulationData,
  type ReligionData,
  type JobData,
  type EducationData
} from "@/lib/demographic-service"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface JobDataDisplay {
  jenis: string
  jumlah: number
}

interface JobDataSet {
  semua: JobDataDisplay[]
  laki_laki: JobDataDisplay[]
  perempuan: JobDataDisplay[]
}

// Simulasi data demografis dalam format lama untuk kompatibilitas UI
interface DemographicDataCompat {
  population: {
    total: number
    male: number
    female: number
    lastUpdated: Date
  }
  religions: Array<{
    name: string
    count: number
    icon: string
  }>
  jobs: JobDataDisplay[]
  education: Array<{
    level: string
    count: number
  }>
  lastUpdated: Date
}

export default function PopulationData() {
  const [filter, setFilter] = useState<"semua" | "laki_laki" | "perempuan">("semua")
  const [jobData, setJobData] = useState<JobDataSet | null>(null)
  const [demographicData, setDemographicData] = useState<DemographicDataCompat | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let populationData: PopulationData | null = null
    let religionsData: ReligionData[] = []
    let jobsData: JobData[] = []
    let educationData: EducationData[] = []

    const updateCombinedData = () => {
      if (populationData && religionsData.length > 0 && jobsData.length > 0 && educationData.length > 0) {
        // Transform data ke format lama untuk kompatibilitas UI
        const combinedData: DemographicDataCompat = {
          population: {
            total: populationData.total,
            male: populationData.male,
            female: populationData.female,
            lastUpdated: populationData.lastUpdated
          },
          religions: religionsData.map(r => ({
            name: r.name,
            count: r.count,
            icon: r.icon
          })),
          jobs: jobsData.map(j => ({
            jenis: j.pekerjaan,
            jumlah: j.laki + j.perempuan
          })),
          education: educationData.map(e => ({
            level: e.level,
            count: e.count
          })),
          lastUpdated: populationData.lastUpdated
        }

        setDemographicData(combinedData)

        // Process job data untuk filter
        const newJobData: JobDataSet = {
          semua: jobsData
            .map(item => ({
              jenis: item.pekerjaan,
              jumlah: item.laki + item.perempuan
            }))
            .filter(item => item.jumlah > 0),
          
          laki_laki: jobsData
            .map(item => ({
              jenis: item.pekerjaan,
              jumlah: item.laki
            }))
            .filter(item => item.jumlah > 0),
          
          perempuan: jobsData
            .map(item => ({
              jenis: item.pekerjaan,
              jumlah: item.perempuan
            }))
            .filter(item => item.jumlah > 0)
        }

        setJobData(newJobData)
        setLoading(false)
      }
    }

    const initAndSubscribe = async () => {
      try {
        // Inisialisasi data jika belum ada
        await initializeDemographicData()

        // Subscribe untuk real-time updates
        const unsubscribePopulation = subscribeToPopulationData((data) => {
          populationData = data
          updateCombinedData()
        })
        
        const unsubscribeReligions = subscribeToReligionsData((data) => {
          religionsData = data
          updateCombinedData()
        })
        
        const unsubscribeJobs = subscribeToJobsData((data) => {
          jobsData = data
          updateCombinedData()
        })
        
        const unsubscribeEducation = subscribeToEducationData((data) => {
          educationData = data
          updateCombinedData()
        })

        return () => {
          unsubscribePopulation()
          unsubscribeReligions()
          unsubscribeJobs()
          unsubscribeEducation()
        }
      } catch (error) {
        console.error("Error initializing demographic data:", error)
        setLoading(false)
      }
    }

    let unsubscribeAll: (() => void) | undefined
    initAndSubscribe().then((cleanup) => {
      unsubscribeAll = cleanup
    })

    return () => {
      if (unsubscribeAll) {
        unsubscribeAll()
      }
    }
  }, [])

  const educationData = {
    labels: demographicData?.education?.map(edu => edu.level) || [
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
        data: demographicData?.education?.map(edu => edu.count) || [173, 201, 285, 140, 286, 22, 13, 26, 2, 0],
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Memuat data kependudukan...</p>
        </div>
      </div>
    );
  }

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
                <p className="text-4xl font-bold text-black dark:text-white">
                  {demographicData?.population?.total?.toLocaleString("id-ID") || "0"} Jiwa
                </p>
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
                <p className="text-4xl font-bold text-black dark:text-white">
                  {demographicData?.population?.female?.toLocaleString("id-ID") || "0"} Jiwa
                </p>
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
                <p className="text-4xl font-bold text-black dark:text-white">
                  {demographicData?.population?.male?.toLocaleString("id-ID") || "0"} Jiwa
                </p>
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
            const religions = demographicData?.religions || [
              { name: "Islam", count: 8285 },
              { name: "Kristen", count: 22 },
              { name: "Katolik", count: 268 },
              { name: "Hindu", count: 23 },
              { name: "Buddha", count: 0 },
              { name: "Konghucu", count: 0 },
              { name: "Kepercayaan", count: 0 },
            ];
            
            // Mapping icon berdasarkan nama agama
            const getIconForReligion = (name: string) => {
              const iconMap: { [key: string]: string } = {
                "Islam": "fas fa-mosque",
                "Kristen": "fas fa-church", 
                "Katolik": "fas fa-bible",
                "Hindu": "fas fa-om",
                "Buddha": "fas fa-dharmachakra",
                "Konghucu": "fas fa-yin-yang",
                "Kepercayaan": "fas fa-pray"
              };
              return iconMap[name] || "fas fa-pray";
            };
            
            const firstRowReligions = religions.slice(0, 4);
            const secondRowReligions = religions.slice(4);
            return (
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {firstRowReligions.map((religion, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center flex flex-col items-center">
                      <i className={`${getIconForReligion(religion.name)} text-blue-600 text-4xl mt-2 mb-6`}></i>
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
                      <i className={`${getIconForReligion(religion.name)} text-blue-600 text-4xl mt-2 mb-6`}></i>
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
