"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { 
  getBumdesData, 
  updateBumdesItem, 
  addBumdesItem, 
  deleteBumdesItem, 
  uploadBumdesImage, 
  deleteBumdesImage,
  BumdesItem, 
  BumdesFormData 
} from "@/lib/bumdes-service"
import { validateImageFile, formatFileSize } from "@/lib/upload-utils"
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Upload, 
  Image as ImageIcon,
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Building2,
  RefreshCw,
  ArrowLeft
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import LoadingSpinner from "@/components/loading-spinner"
import Image from "next/image"

interface AdminBumdesProps {
  onBack: () => void;
}

export default function AdminBumdes({ onBack }: AdminBumdesProps) {
  const [bumdesData, setBumdesData] = useState<BumdesItem[]>([])
  const [loading, setLoading] = useState(true)
  const [editingItem, setEditingItem] = useState<BumdesItem | null>(null)
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [formData, setFormData] = useState<BumdesFormData>({
    title: "",
    description: "",
    content: "",
    category: "",
    status: "Aktif",
    established: "",
    manager: "",
    revenue: 0,
    employees: 0,
    location: ""
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [isUploading, setIsUploading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchBumdesData()
  }, [])

  const fetchBumdesData = async () => {
    try {
      setLoading(true)
      console.log('Fetching BUMDes data...')
      const data = await getBumdesData()
      console.log('Fetched data:', data)
      setBumdesData(data)
    } catch (error) {
      console.error('Error fetching BUMDes data:', error)
      toast({
        title: "Error",
        description: "Gagal memuat data BUMDes",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const validateForm = (): string | null => {
    if (!formData.title.trim()) return "Judul harus diisi"
    if (!formData.description.trim()) return "Deskripsi harus diisi"
    if (!formData.content.trim()) return "Deskripsi lengkap harus diisi"
    if (!formData.category.trim()) return "Kategori harus dipilih"
    if (!formData.established.trim()) return "Tanggal didirikan harus diisi"
    if (!formData.manager.trim()) return "Pengelola harus diisi"
    if (!formData.location.trim()) return "Lokasi harus diisi"
    if (formData.employees < 0) return "Jumlah karyawan tidak boleh negatif"
    if (formData.revenue < 0) return "Pendapatan tidak boleh negatif"
    
    return null
  }

  const handleEdit = (item: BumdesItem) => {
    setEditingItem(item)
    setFormData({
      title: item.title,
      description: item.description,
      content: item.content,
      category: item.category,
      status: item.status,
      established: item.established,
      manager: item.manager,
      revenue: item.revenue,
      employees: item.employees,
      location: item.location
    })
    setImagePreview(item.image)
    setImageFile(null)
  }

  const handleAddNew = () => {
    setIsAddingNew(true)
    setFormData({
      title: "",
      description: "",
      content: "",
      category: "",
      status: "Aktif",
      established: "",
      manager: "",
      revenue: 0,
      employees: 0,
      location: ""
    })
    setImagePreview("") // Reset preview
    setImageFile(null)
  }

  const handleCancel = () => {
    setEditingItem(null)
    setIsAddingNew(false)
    setFormData({
      title: "",
      description: "",
      content: "",
      category: "",
      status: "Aktif",
      established: "",
      manager: "",
      revenue: 0,
      employees: 0,
      location: ""
    })
    setImageFile(null)
    setImagePreview("")
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validasi file
      const validation = validateImageFile(file)
      if (!validation.isValid) {
        toast({
          title: "Error",
          description: validation.error,
          variant: "destructive"
        })
        // Reset input file
        e.target.value = ''
        return
      }

      setImageFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = async () => {
    try {
      // Validasi form terlebih dahulu
      const validationError = validateForm()
      if (validationError) {
        toast({
          title: "Error",
          description: validationError,
          variant: "destructive"
        })
        return
      }

      setIsUploading(true)
      console.log('Starting save operation...')
      console.log('Form data:', formData)
      console.log('Is adding new:', isAddingNew)
      console.log('Editing item:', editingItem)
      
      let imageUrl = editingItem?.image || ""
      
      // Upload gambar baru jika ada
      if (imageFile) {
        console.log('Uploading image file:', imageFile.name)
        const itemId = editingItem?.id || Date.now()
        const uploadedUrl = await uploadBumdesImage(imageFile, itemId)
        
        if (!uploadedUrl) {
          throw new Error("Gagal mengupload gambar")
        }
        
        console.log('Image uploaded successfully:', uploadedUrl)
        
        // Hapus gambar lama jika ada dan berbeda
        if (editingItem?.image && editingItem.image !== uploadedUrl && editingItem.image.includes('supabase')) {
          console.log('Deleting old image:', editingItem.image)
          await deleteBumdesImage(editingItem.image)
        }
        
        imageUrl = uploadedUrl
      }

      console.log('Final image URL:', imageUrl)

      let success = false
      
      if (editingItem) {
        console.log('Updating existing item with ID:', editingItem.id)
        // Update existing item
        success = await updateBumdesItem(editingItem.id, formData, imageUrl)
      } else if (isAddingNew) {
        console.log('Adding new item')
        // Add new item - gambar tidak wajib, gunakan placeholder default jika kosong
        if (!imageUrl) {
          imageUrl = "/placeholder.jpg" // Placeholder image default
          console.log('Using default placeholder image for new item')
        }
        success = await addBumdesItem(formData, imageUrl)
      }

      console.log('Operation success:', success)

      if (success) {
        console.log('Refreshing data...')
        // Refresh data setelah berhasil
        await fetchBumdesData()
        handleCancel()
        toast({
          title: "Berhasil",
          description: editingItem 
            ? "BUMDes berhasil diperbarui" 
            : `BUMDes baru berhasil ditambahkan${!imageFile ? ' dengan gambar default' : ''}`,
        })
      } else {
        throw new Error("Gagal menyimpan data")
      }
    } catch (error) {
      console.error('Error saving BUMDes:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Gagal menyimpan data BUMDes",
        variant: "destructive"
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus item BUMDes ini?")) {
      try {
        const success = await deleteBumdesItem(id)
        if (success) {
          // Refresh data setelah berhasil hapus
          await fetchBumdesData()
          toast({
            title: "Berhasil",
            description: "BUMDes berhasil dihapus",
          })
        } else {
          throw new Error("Gagal menghapus data")
        }
      } catch (error) {
        console.error('Error deleting BUMDes:', error)
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Gagal menghapus BUMDes",
          variant: "destructive"
        })
      }
    }
  }

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
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin BUMDes</h1>
          <p className="text-gray-600 dark:text-gray-400">Kelola data Badan Usaha Milik Desa</p>
        </div>
        <div className="flex gap-3">
          <Button 
            onClick={fetchBumdesData}
            variant="outline"
            disabled={loading}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={onBack} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold"></h2>
          <Button onClick={handleAddNew} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Tambah BUMDes Baru
          </Button>
        </div>

      {/* Form Edit/Add */}
      {(editingItem || isAddingNew) && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingItem ? `Edit BUMDes: ${editingItem.title}` : "Tambah BUMDes Baru"}
            </CardTitle>
            <CardDescription>
              {editingItem ? "Perbarui informasi BUMDes" : "Tambahkan BUMDes baru ke sistem"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Judul</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Nama unit usaha BUMDes"
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Deskripsi Singkat</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Deskripsi singkat tentang unit usaha"
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Kategori</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Perdagangan">Perdagangan</SelectItem>
                        <SelectItem value="Pelayanan">Pelayanan</SelectItem>
                        <SelectItem value="Peternakan">Peternakan</SelectItem>
                        <SelectItem value="Pertanian">Pertanian</SelectItem>
                        <SelectItem value="Industri">Industri</SelectItem>
                        <SelectItem value="Pariwisata">Pariwisata</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) => setFormData({ ...formData, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Aktif">Aktif</SelectItem>
                        <SelectItem value="Non-Aktif">Non-Aktif</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="established">Tanggal Didirikan</Label>
                    <Input
                      id="established"
                      type="date"
                      value={formData.established}
                      onChange={(e) => setFormData({ ...formData, established: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="employees">Jumlah Karyawan</Label>
                    <Input
                      id="employees"
                      type="number"
                      value={formData.employees}
                      onChange={(e) => setFormData({ ...formData, employees: parseInt(e.target.value) || 0 })}
                      placeholder="0"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="manager">Pengelola</Label>
                  <Input
                    id="manager"
                    value={formData.manager}
                    onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                    placeholder="Nama pengelola unit usaha"
                  />
                </div>
                
                <div>
                  <Label htmlFor="revenue">Pendapatan (Rp)</Label>
                  <Input
                    id="revenue"
                    type="number"
                    value={formData.revenue}
                    onChange={(e) => setFormData({ ...formData, revenue: parseInt(e.target.value) || 0 })}
                    placeholder="0"
                  />
                </div>
                
                <div>
                  <Label htmlFor="location">Lokasi</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Alamat lengkap unit usaha"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="content">Deskripsi Lengkap</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Deskripsi lengkap tentang unit usaha BUMDes"
                    rows={8}
                  />
                </div>
                
                <div>
                  <Label htmlFor="image">
                    Gambar (Opsional)
                    {isAddingNew && (
                      <span className="ml-2 text-xs text-blue-600">
                        • Akan menggunakan gambar default jika kosong
                      </span>
                    )}
                    {editingItem && (
                      <span className="ml-2 text-xs text-orange-600">
                        • Gambar saat ini akan tetap digunakan jika tidak diubah
                      </span>
                    )}
                  </Label>
                  <div className="space-y-4">
                    <div>
                      <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Format: JPG, PNG, WebP, GIF. Maksimal 5MB. Jika tidak diupload, akan menggunakan gambar default.
                      </p>
                      {imageFile && (
                        <p className="text-xs text-blue-600 mt-1">
                          File: {imageFile.name} ({formatFileSize(imageFile.size)})
                        </p>
                      )}
                    </div>
                    
                    {imagePreview && (
                      <div className="relative w-full h-48 border rounded-lg overflow-hidden">
                        <Image
                          src={imagePreview}
                          alt="Preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    
                    {!imagePreview && isAddingNew && (
                      <div className="relative w-full h-48 border rounded-lg overflow-hidden bg-gray-100">
                        <Image
                          src="/placeholder.jpg"
                          alt="Placeholder Default"
                          fill
                          className="object-cover opacity-75"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                          <div className="text-center text-white">
                            <ImageIcon className="w-8 h-8 mx-auto mb-2" />
                            <p className="text-sm">Preview Placeholder Default</p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {!imagePreview && editingItem && (
                      <div className="w-full h-48 border-2 border-dashed rounded-lg flex items-center justify-center text-gray-500">
                        <div className="text-center">
                          <ImageIcon className="w-8 h-8 mx-auto mb-2" />
                          <p>Gambar tidak dipilih</p>
                          <p className="text-xs mt-1">Gambar saat ini akan tetap digunakan</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={handleCancel}>
                <X className="w-4 h-4 mr-2" />
                Batal
              </Button>
              <Button onClick={handleSave} disabled={isUploading}>
                {isUploading ? (
                  <>
                    <Upload className="w-4 h-4 mr-2 animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Simpan
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* List BUMDes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <CardTitle className="text-lg">{item.title}</CardTitle>
              <CardDescription className="line-clamp-2">{item.description}</CardDescription>
              <Badge variant="outline" className="w-fit">
                {item.category}
              </Badge>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-gray-500" />
                  <span className="text-xs">{new Date(item.established).toLocaleDateString('id-ID')}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3 text-gray-500" />
                  <span className="text-xs">{item.employees} orang</span>
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="w-3 h-3 text-gray-500" />
                  <span className="text-xs">{formatCurrency(item.revenue)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Building2 className="w-3 h-3 text-gray-500" />
                  <span className="text-xs truncate">{item.manager}</span>
                </div>
              </div>
              
              <div className="flex items-start gap-1">
                <MapPin className="w-3 h-3 text-gray-500 mt-1 flex-shrink-0" />
                <span className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">{item.location}</span>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={() => handleEdit(item)}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  <Edit className="w-3 h-3 mr-1" />
                  Edit
                </Button>
                <Button 
                  onClick={() => handleDelete(item.id)}
                  variant="destructive"
                  size="sm"
                  className="flex-1"
                >
                  <Trash2 className="w-3 h-3 mr-1" />
                  Hapus
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
    </div>
  )
}
