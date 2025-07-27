"use client"

import { useState, useEffect } from "react"
import { getBumdesData, BumdesItem } from "@/lib/bumdes-service"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, DollarSign, Building2 } from "lucide-react"
import LoadingSpinner from "@/components/loading-spinner"
import Image from "next/image"

export default function BumdesContent() {
  const [bumdesData, setBumdesData] = useState<BumdesItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedItem, setSelectedItem] = useState<BumdesItem | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBumdesData()
        setBumdesData(data)
      } catch (error) {
        console.error('Error fetching BUMDes data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    // Refresh data setiap 30 detik untuk sinkronisasi
    const interval = setInterval(fetchData, 30000)
    
    return () => clearInterval(interval)
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'aktif':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'non-aktif':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {bumdesData.map((item) => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow duration-300">
            <div className="relative h-48">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover rounded-t-lg"
              />
              <div className="absolute top-4 right-4">
                <Badge className={getStatusColor(item.status)}>
                  {item.status}
                </Badge>
              </div>
            </div>
            
            <CardHeader>
              <CardTitle className="text-xl">{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
              <Badge variant="outline" className="w-fit">
                {item.category}
              </Badge>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span>{new Date(item.established).toLocaleDateString('id-ID')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span>{item.employees} Karyawan</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-gray-500" />
                  <span className="text-xs">{formatCurrency(item.revenue)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-gray-500" />
                  <span className="text-xs">{item.manager}</span>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" />
                <span className="text-sm text-gray-600 dark:text-gray-400">{item.location}</span>
              </div>
              
              <Button 
                onClick={() => setSelectedItem(item)}
                className="w-full"
                variant="outline"
              >
                Lihat Detail
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal Detail */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="relative h-64">
              <Image
                src={selectedItem.image}
                alt={selectedItem.title}
                fill
                className="object-cover rounded-t-lg"
              />
              <Button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4"
                variant="secondary"
                size="sm"
              >
                ✕
              </Button>
            </div>
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{selectedItem.title}</h2>
                  <Badge className={getStatusColor(selectedItem.status)}>
                    {selectedItem.status}
                  </Badge>
                </div>
                <Badge variant="outline">{selectedItem.category}</Badge>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6">{selectedItem.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <div>
                    <span className="text-gray-500">Didirikan:</span>
                    <p>{new Date(selectedItem.established).toLocaleDateString('id-ID')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <div>
                    <span className="text-gray-500">Karyawan:</span>
                    <p>{selectedItem.employees} orang</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-gray-500" />
                  <div>
                    <span className="text-gray-500">Pendapatan:</span>
                    <p>{formatCurrency(selectedItem.revenue)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-gray-500" />
                  <div>
                    <span className="text-gray-500">Pengelola:</span>
                    <p>{selectedItem.manager}</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" />
                  <div>
                    <span className="text-gray-500">Lokasi:</span>
                    <p>{selectedItem.location}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Deskripsi Lengkap:</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {selectedItem.content}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
