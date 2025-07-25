import { db } from './firebase';
import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  onSnapshot,
  DocumentData 
} from 'firebase/firestore';

// Interface untuk data populasi
export interface PopulationData {
  total: number;
  male: number;
  female: number;
  lastUpdated: Date;
}

// Interface untuk data agama
export interface ReligionData {
  name: string;
  count: number;
}

// Interface untuk data pekerjaan
export interface JobData {
  pekerjaan: string;
  laki: number;
  perempuan: number;
}

// Interface untuk data pendidikan
export interface EducationData {
  level: string;
  count: number;
}

// Interface untuk semua data kependudukan
export interface DemographicData {
  population: PopulationData;
  religions: ReligionData[];
  jobs: JobData[];
  education: EducationData[];
  lastUpdated: Date;
}

const DEMOGRAPHIC_DOC_ID = 'demographic-data';

// Fungsi untuk mengambil data kependudukan
export const getDemographicData = async (): Promise<DemographicData | null> => {
  try {
    const docRef = doc(db, 'demographics', DEMOGRAPHIC_DOC_ID);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        ...data,
        lastUpdated: data.lastUpdated?.toDate() || new Date(),
      } as DemographicData;
    }
    return null;
  } catch (error) {
    console.error('Error getting demographic data:', error);
    return null;
  }
};

// Fungsi untuk menyimpan data kependudukan
export const saveDemographicData = async (data: Partial<DemographicData>): Promise<boolean> => {
  try {
    const docRef = doc(db, 'demographics', DEMOGRAPHIC_DOC_ID);
    await setDoc(docRef, {
      ...data,
      lastUpdated: new Date(),
    }, { merge: true });
    return true;
  } catch (error) {
    console.error('Error saving demographic data:', error);
    return false;
  }
};

// Fungsi untuk update data populasi dengan auto-calculate total
export const updatePopulationData = async (male: number, female: number): Promise<boolean> => {
  try {
    const total = male + female;
    const populationData: PopulationData = {
      total,
      male,
      female,
      lastUpdated: new Date(),
    };
    
    const docRef = doc(db, 'demographics', DEMOGRAPHIC_DOC_ID);
    await updateDoc(docRef, {
      population: populationData,
      lastUpdated: new Date(),
    });
    return true;
  } catch (error) {
    console.error('Error updating population data:', error);
    return false;
  }
};

// Fungsi untuk update data agama
export const updateReligionData = async (religionData: ReligionData[]): Promise<boolean> => {
  try {
    const docRef = doc(db, 'demographics', DEMOGRAPHIC_DOC_ID);
    await updateDoc(docRef, {
      religions: religionData,
      lastUpdated: new Date(),
    });
    return true;
  } catch (error) {
    console.error('Error updating religion data:', error);
    return false;
  }
};

// Fungsi untuk update data pekerjaan
export const updateJobData = async (jobData: JobData[]): Promise<boolean> => {
  try {
    const docRef = doc(db, 'demographics', DEMOGRAPHIC_DOC_ID);
    await updateDoc(docRef, {
      jobs: jobData,
      lastUpdated: new Date(),
    });
    return true;
  } catch (error) {
    console.error('Error updating job data:', error);
    return false;
  }
};

// Fungsi untuk update data pendidikan
export const updateEducationData = async (educationData: EducationData[]): Promise<boolean> => {
  try {
    const docRef = doc(db, 'demographics', DEMOGRAPHIC_DOC_ID);
    await updateDoc(docRef, {
      education: educationData,
      lastUpdated: new Date(),
    });
    return true;
  } catch (error) {
    console.error('Error updating education data:', error);
    return false;
  }
};

// Fungsi untuk real-time listener
export const subscribeToDemographicData = (
  callback: (data: DemographicData | null) => void
): (() => void) => {
  const docRef = doc(db, 'demographics', DEMOGRAPHIC_DOC_ID);
  
  return onSnapshot(docRef, (doc) => {
    if (doc.exists()) {
      const data = doc.data();
      callback({
        ...data,
        lastUpdated: data.lastUpdated?.toDate() || new Date(),
      } as DemographicData);
    } else {
      callback(null);
    }
  }, (error) => {
    console.error('Error listening to demographic data:', error);
    callback(null);
  });
};

// Fungsi untuk inisialisasi data awal (migrasi dari data hardcode)
export const initializeDemographicData = async (): Promise<boolean> => {
  try {
    // Cek apakah data sudah ada
    const existingData = await getDemographicData();
    if (existingData) {
      console.log('Demographic data already exists');
      return true;
    }

    // Data awal dari file population-data.tsx
    const initialData: DemographicData = {
      population: {
        total: 8598,
        male: 4317,
        female: 4281,
        lastUpdated: new Date(),
      },
      religions: [
        { name: "Islam", count: 8285 },
        { name: "Kristen", count: 22 },
        { name: "Katolik", count: 268 },
        { name: "Hindu", count: 23 },
        { name: "Buddha", count: 0 },
        { name: "Konghucu", count: 0 },
        { name: "Kepercayaan", count: 0 },
      ],
      jobs: [
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
      ],
      education: [
        { level: "Tidak/Belum Sekolah", count: 173 },
        { level: "Belum Tamat SD/Sederajat", count: 201 },
        { level: "Tamat SD/Sederajat", count: 285 },
        { level: "SLTP/Sederajat", count: 140 },
        { level: "SLTA/Sederajat", count: 286 },
        { level: "Diploma I/II", count: 22 },
        { level: "Diploma III/Sarjana Muda", count: 13 },
        { level: "Diploma IV/Strata I", count: 26 },
        { level: "Strata II", count: 2 },
        { level: "Strata III", count: 0 },
      ],
      lastUpdated: new Date(),
    };

    return await saveDemographicData(initialData);
  } catch (error) {
    console.error('Error initializing demographic data:', error);
    return false;
  }
};
