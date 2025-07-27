// lib/bumdes-service.ts
import { supabase } from './supabase';
import { validateImageFile, generateFileName, extractFilePathFromUrl } from './upload-utils';

export interface BumdesItem {
  id: number;
  title: string;
  description: string;
  content: string;
  image: string;
  category: string;
  status: string;
  established: string;
  manager: string;
  revenue: number;
  employees: number;
  location: string;
}

export interface BumdesFormData {
  title: string;
  description: string;
  content: string;
  category: string;
  status: string;
  established: string;
  manager: string;
  revenue: number;
  employees: number;
  location: string;
}

// Fungsi untuk mendapatkan semua data BUMDes
export async function getBumdesData(): Promise<BumdesItem[]> {
  try {
    const { data, error } = await supabase
      .from('bumdes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching BUMDes data:', error);
      throw new Error(`Gagal memuat data: ${error.message}`);
    }

    return data || [];
  } catch (error) {
    console.error('Error in getBumdesData:', error);
    
    // Fallback ke file JSON jika database belum setup
    try {
      const response = await fetch('/data/bumdes.json');
      if (!response.ok) {
        throw new Error('Failed to fetch fallback data');
      }
      const fallbackData = await response.json();
      return fallbackData.bumdes || [];
    } catch (fallbackError) {
      console.error('Error loading fallback data:', fallbackError);
      return [];
    }
  }
}

// Fungsi untuk upload gambar ke Supabase Storage
export async function uploadBumdesImage(file: File, itemId: number): Promise<string | null> {
  try {
    // Validasi file
    const validation = validateImageFile(file);
    if (!validation.isValid) {
      throw new Error(validation.error);
    }

    const fileName = generateFileName(file.name, itemId);
    const filePath = `bumdes/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      console.error('Error uploading image:', uploadError);
      throw new Error(`Upload gagal: ${uploadError.message}`);
    }

    // Mendapatkan URL publik gambar
    const { data } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  } catch (error) {
    console.error('Error in uploadBumdesImage:', error);
    throw error;
  }
}

// Fungsi untuk menghapus gambar dari Supabase Storage
export async function deleteBumdesImage(imageUrl: string): Promise<boolean> {
  try {
    const filePath = extractFilePathFromUrl(imageUrl);
    
    if (!filePath) {
      throw new Error('Cannot extract file path from URL');
    }

    const { error } = await supabase.storage
      .from('images')
      .remove([filePath]);

    if (error) {
      console.error('Error deleting image:', error);
      throw new Error(`Delete gagal: ${error.message}`);
    }

    return true;
  } catch (error) {
    console.error('Error in deleteBumdesImage:', error);
    return false;
  }
}

// Fungsi untuk menyimpan data BUMDes ke Supabase Database
export async function saveBumdesData(data: BumdesItem[]): Promise<boolean> {
  try {
    // Implementasi ini tidak digunakan lagi karena kita menggunakan operasi CRUD langsung
    console.warn('saveBumdesData: Function deprecated, use direct CRUD operations');
    return true;
  } catch (error) {
    console.error('Error saving BUMDes data:', error);
    return false;
  }
}

// Fungsi untuk update item BUMDes
export async function updateBumdesItem(id: number, formData: BumdesFormData, newImageUrl?: string): Promise<boolean> {
  try {
    const updateData: any = {
      ...formData,
      updated_at: new Date().toISOString()
    };

    if (newImageUrl) {
      updateData.image = newImageUrl;
    }

    const { error } = await supabase
      .from('bumdes')
      .update(updateData)
      .eq('id', id);

    if (error) {
      console.error('Error updating BUMDes item:', error);
      throw new Error(`Gagal memperbarui data: ${error.message}`);
    }

    return true;
  } catch (error) {
    console.error('Error in updateBumdesItem:', error);
    return false;
  }
}

// Fungsi untuk menambah item BUMDes baru
export async function addBumdesItem(formData: BumdesFormData, imageUrl: string): Promise<boolean> {
  try {
    console.log('Adding BUMDes item with data:', { ...formData, imageUrl });
    
    const insertData = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      content: formData.content.trim(),
      image: imageUrl,
      category: formData.category.trim(),
      status: formData.status,
      established: formData.established, // Format: YYYY-MM-DD sudah benar dari input type="date"
      manager: formData.manager.trim(),
      revenue: parseInt(formData.revenue.toString()) || 0,
      employees: parseInt(formData.employees.toString()) || 0,
      location: formData.location.trim()
    };

    console.log('Insert data:', insertData);

    const { data, error } = await supabase
      .from('bumdes')
      .insert([insertData])
      .select(); // Menambahkan select untuk mendapatkan data yang diinsert

    if (error) {
      console.error('Supabase error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      throw new Error(`Gagal menambah data: ${error.message}`);
    }

    console.log('Insert successful, returned data:', data);
    return true;
  } catch (error) {
    console.error('Error in addBumdesItem:', error);
    return false;
  }
}

// Fungsi untuk menghapus item BUMDes
export async function deleteBumdesItem(id: number): Promise<boolean> {
  try {
    // Ambil data item untuk mendapatkan URL gambar
    const { data: item, error: fetchError } = await supabase
      .from('bumdes')
      .select('image')
      .eq('id', id)
      .single();

    if (fetchError) {
      console.error('Error fetching item for deletion:', fetchError);
      throw new Error(`Gagal mengambil data item: ${fetchError.message}`);
    }

    // Hapus gambar dari storage jika ada dan bukan gambar default
    if (item?.image && item.image.includes('supabase')) {
      await deleteBumdesImage(item.image);
    }

    // Hapus item dari database
    const { error: deleteError } = await supabase
      .from('bumdes')
      .delete()
      .eq('id', id);

    if (deleteError) {
      console.error('Error deleting BUMDes item:', deleteError);
      throw new Error(`Gagal menghapus data: ${deleteError.message}`);
    }

    return true;
  } catch (error) {
    console.error('Error in deleteBumdesItem:', error);
    return false;
  }
}