// lib/upload-utils.ts

export interface UploadValidation {
  isValid: boolean;
  error?: string;
}

export const validateImageFile = (file: File): UploadValidation => {
  // Validasi tipe file
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: 'Tipe file tidak didukung. Gunakan JPG, PNG, WebP, atau GIF.'
    };
  }

  // Validasi ukuran file (maksimal 5MB)
  const maxSize = 5 * 1024 * 1024; // 5MB in bytes
  if (file.size > maxSize) {
    return {
      isValid: false,
      error: 'Ukuran file terlalu besar. Maksimal 5MB.'
    };
  }

  // Validasi nama file
  if (file.name.length > 100) {
    return {
      isValid: false,
      error: 'Nama file terlalu panjang.'
    };
  }

  return { isValid: true };
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const generateFileName = (originalName: string, itemId: number): string => {
  const ext = originalName.split('.').pop();
  const timestamp = Date.now();
  return `bumdes-${itemId}-${timestamp}.${ext}`;
};

export const extractFilePathFromUrl = (url: string): string | null => {
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/');
    // URL Supabase storage format: /storage/v1/object/public/bucket/folder/file
    if (pathParts.includes('storage') && pathParts.includes('public')) {
      const bucketIndex = pathParts.findIndex(part => part === 'public') + 1;
      return pathParts.slice(bucketIndex).join('/');
    }
    return null;
  } catch (error) {
    console.error('Error extracting file path:', error);
    return null;
  }
};
