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
  id: string;
  name: string;
  count: number;
  icon: string;
}

// Interface untuk data pekerjaan
export interface JobData {
  id: string;
  pekerjaan: string;
  laki: number;
  perempuan: number;
}

// Interface untuk data pendidikan
export interface EducationData {
  id: string;
  level: string;
  count: number;
}

// Konstanta untuk collection names
const DEMOGRAPHICS_COLLECTION = 'demographics';
const POPULATION_DOC = 'population';
const RELIGIONS_DOC = 'religions';
const JOBS_DOC = 'jobs';
const EDUCATION_DOC = 'education';

// === POPULATION FUNCTIONS ===

// Fungsi untuk mengambil data populasi
export const getPopulationData = async (): Promise<PopulationData | null> => {
  try {
    const docRef = doc(db, DEMOGRAPHICS_COLLECTION, POPULATION_DOC);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        total: data.total,
        male: data.male,
        female: data.female,
        lastUpdated: data.lastUpdated?.toDate() || new Date()
      };
    }
    return null;
  } catch (error) {
    console.error('Error getting population data:', error);
    return null;
  }
};

// Fungsi untuk update data populasi
export const updatePopulationData = async (male: number, female: number): Promise<boolean> => {
  try {
    const total = male + female;
    const docRef = doc(db, DEMOGRAPHICS_COLLECTION, POPULATION_DOC);
    
    await setDoc(docRef, {
      total,
      male,
      female,
      lastUpdated: new Date()
    });
    
    return true;
  } catch (error) {
    console.error('Error updating population data:', error);
    return false;
  }
};

// Real-time listener untuk data populasi
export const subscribeToPopulationData = (
  callback: (data: PopulationData | null) => void
): (() => void) => {
  const docRef = doc(db, DEMOGRAPHICS_COLLECTION, POPULATION_DOC);
  return onSnapshot(docRef, (doc) => {
    if (doc.exists()) {
      const data = doc.data();
      callback({
        total: data.total,
        male: data.male,
        female: data.female,
        lastUpdated: data.lastUpdated?.toDate() || new Date()
      });
    } else {
      callback(null);
    }
  });
};

// === RELIGIONS FUNCTIONS ===

// Fungsi untuk mengambil data agama
export const getReligionsData = async (): Promise<ReligionData[]> => {
  try {
    const docRef = doc(db, DEMOGRAPHICS_COLLECTION, RELIGIONS_DOC);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return data.religions || [];
    }
    return [];
  } catch (error) {
    console.error('Error getting religions data:', error);
    return [];
  }
};

// Fungsi untuk update data agama
export const updateReligionsData = async (religions: ReligionData[]): Promise<boolean> => {
  try {
    const docRef = doc(db, DEMOGRAPHICS_COLLECTION, RELIGIONS_DOC);
    
    await setDoc(docRef, {
      religions,
      lastUpdated: new Date()
    });
    
    return true;
  } catch (error) {
    console.error('Error updating religions data:', error);
    return false;
  }
};

// Real-time listener untuk data agama
export const subscribeToReligionsData = (
  callback: (data: ReligionData[]) => void
): (() => void) => {
  const docRef = doc(db, DEMOGRAPHICS_COLLECTION, RELIGIONS_DOC);
  return onSnapshot(docRef, (doc) => {
    if (doc.exists()) {
      const data = doc.data();
      callback(data.religions || []);
    } else {
      callback([]);
    }
  });
};

// === JOBS FUNCTIONS ===

// Fungsi untuk mengambil data pekerjaan
export const getJobsData = async (): Promise<JobData[]> => {
  try {
    const docRef = doc(db, DEMOGRAPHICS_COLLECTION, JOBS_DOC);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return data.jobs || [];
    }
    return [];
  } catch (error) {
    console.error('Error getting jobs data:', error);
    return [];
  }
};

// Fungsi untuk update data pekerjaan
export const updateJobsData = async (jobs: JobData[]): Promise<boolean> => {
  try {
    const docRef = doc(db, DEMOGRAPHICS_COLLECTION, JOBS_DOC);
    
    await setDoc(docRef, {
      jobs,
      lastUpdated: new Date()
    });
    
    return true;
  } catch (error) {
    console.error('Error updating jobs data:', error);
    return false;
  }
};

// Real-time listener untuk data pekerjaan
export const subscribeToJobsData = (
  callback: (data: JobData[]) => void
): (() => void) => {
  const docRef = doc(db, DEMOGRAPHICS_COLLECTION, JOBS_DOC);
  return onSnapshot(docRef, (doc) => {
    if (doc.exists()) {
      const data = doc.data();
      callback(data.jobs || []);
    } else {
      callback([]);
    }
  });
};

// === EDUCATION FUNCTIONS ===

// Fungsi untuk mengambil data pendidikan
export const getEducationData = async (): Promise<EducationData[]> => {
  try {
    const docRef = doc(db, DEMOGRAPHICS_COLLECTION, EDUCATION_DOC);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return data.education || [];
    }
    return [];
  } catch (error) {
    console.error('Error getting education data:', error);
    return [];
  }
};

// Fungsi untuk update data pendidikan
export const updateEducationData = async (education: EducationData[]): Promise<boolean> => {
  try {
    const docRef = doc(db, DEMOGRAPHICS_COLLECTION, EDUCATION_DOC);
    
    await setDoc(docRef, {
      education,
      lastUpdated: new Date()
    });
    
    return true;
  } catch (error) {
    console.error('Error updating education data:', error);
    return false;
  }
};

// Real-time listener untuk data pendidikan
export const subscribeToEducationData = (
  callback: (data: EducationData[]) => void
): (() => void) => {
  const docRef = doc(db, DEMOGRAPHICS_COLLECTION, EDUCATION_DOC);
  return onSnapshot(docRef, (doc) => {
    if (doc.exists()) {
      const data = doc.data();
      callback(data.education || []);
    } else {
      callback([]);
    }
  });
};

// === INITIALIZATION FUNCTIONS ===

// Fungsi untuk inisialisasi data default
export const initializeDemographicData = async (): Promise<void> => {
  try {
    // Check if data already exists before initializing
    const populationDoc = doc(db, DEMOGRAPHICS_COLLECTION, POPULATION_DOC);
    const populationSnapshot = await getDoc(populationDoc);
    
    if (populationSnapshot.exists()) {
      console.log('Demographic data already exists, skipping initialization');
      return;
    }

    console.log('Initializing demographic data with default values...');

    // Initialize population data
    await updatePopulationData(4216, 4213);

    // Initialize religions data
    const defaultReligions: ReligionData[] = [
      { id: 'islam', name: 'Islam', count: 8320, icon: 'fa-moon' },
      { id: 'kristen', name: 'Kristen', count: 80, icon: 'fa-cross' },
      { id: 'katolik', name: 'Katolik', count: 15, icon: 'fa-cross' },
      { id: 'hindu', name: 'Hindu', count: 10, icon: 'fa-dharmachakra' },
      { id: 'buddha', name: 'Buddha', count: 4, icon: 'fa-dharmachakra' },
      { id: 'khonghucu', name: 'Khonghucu', count: 4, icon: 'fa-dharmachakra' },
      { id: 'kepercayaan', name: 'Kepercayaan', count: 4, icon: 'fa-dharmachakra' },
    ];
    await updateReligionsData(defaultReligions);

// Initialize jobs data with proper IDs
const defaultJobs: JobData[] = [
  { id: 'belum-tidak-bekerja', pekerjaan: 'BELUM/TIDAK BEKERJA', laki: 521, perempuan: 678 },
  { id: 'mengurus-rumah-tangga', pekerjaan: 'MENGURUS RUMAH TANGGA', laki: 25, perempuan: 1987 },
  { id: 'pelajar-mahasiswa', pekerjaan: 'PELAJAR/MAHASISWA', laki: 812, perempuan: 799 },
  { id: 'pensiunan', pekerjaan: 'PENSIUNAN', laki: 210, perempuan: 154 },
  { id: 'pegawai-negeri-sipil-pns', pekerjaan: 'PEGAWAI NEGERI SIPIL (PNS)', laki: 450, perempuan: 465 },
  { id: 'tentara-nasional-indonesia', pekerjaan: 'TENTARA NASIONAL INDONESIA', laki: 780, perempuan: 35 },
  { id: 'kepolisian-ri-polri', pekerjaan: 'KEPOLISIAN RI (POLRI)', laki: 698, perempuan: 52 },
  { id: 'perdagangan', pekerjaan: 'PERDAGANGAN', laki: 312, perempuan: 405 },
  { id: 'petani-pekebun', pekerjaan: 'PETANI/PEKEBUN', laki: 1150, perempuan: 320 },
  { id: 'peternak', pekerjaan: 'PETERNAK', laki: 250, perempuan: 88 },
  { id: 'nelayan-perikanan', pekerjaan: 'NELAYAN/PERIKANAN', laki: 310, perempuan: 45 },
  { id: 'industri', pekerjaan: 'INDUSTRI', laki: 421, perempuan: 211 },
  { id: 'konstruksi', pekerjaan: 'KONSTRUKSI', laki: 512, perempuan: 28 },
  { id: 'transportasi', pekerjaan: 'TRANSPORTASI', laki: 388, perempuan: 41 },
  { id: 'karyawan-swasta', pekerjaan: 'KARYAWAN SWASTA', laki: 987, perempuan: 754 },
  { id: 'karyawan-bumn', pekerjaan: 'KARYAWAN BUMN', laki: 345, perempuan: 210 },
  { id: 'karyawan-bumd', pekerjaan: 'KARYAWAN BUMD', laki: 210, perempuan: 150 },
  { id: 'karyawan-honorer', pekerjaan: 'KARYAWAN HONORER', laki: 180, perempuan: 240 },
  { id: 'buruh-harian-lepas', pekerjaan: 'BURUH HARIAN LEPAS', laki: 412, perempuan: 189 },
  { id: 'buruh-tani-perkebunan', pekerjaan: 'BURUH TANI/PERKEBUNAN', laki: 311, perempuan: 122 },
  { id: 'buruh-nelayan-perikanan', pekerjaan: 'BURUH NELAYAN/PERIKANAN', laki: 155, perempuan: 33 },
  { id: 'buruh-peternakan', pekerjaan: 'BURUH PETERNAKAN', laki: 98, perempuan: 41 },
  { id: 'pembantu-rumah-tangga', pekerjaan: 'PEMBANTU RUMAH TANGGA', laki: 15, perempuan: 321 },
  { id: 'tukang-cukur', pekerjaan: 'TUKANG CUKUR', laki: 110, perempuan: 12 },
  { id: 'tukang-listrik', pekerjaan: 'TUKANG LISTRIK', laki: 95, perempuan: 5 },
  { id: 'tukang-batu', pekerjaan: 'TUKANG BATU', laki: 215, perempuan: 3 },
  { id: 'tukang-kayu', pekerjaan: 'TUKANG KAYU', laki: 180, perempuan: 4 },
  { id: 'tukang-sol-sepatu', pekerjaan: 'TUKANG SOL SEPATU', laki: 65, perempuan: 8 },
  { id: 'tukang-las-pandai-besi', pekerjaan: 'TUKANG LAS/PANDAI BESI', laki: 143, perempuan: 2 },
  { id: 'tukang-jahit', pekerjaan: 'TUKANG JAHIT', laki: 55, perempuan: 189 },
  { id: 'tukang-gigi', pekerjaan: 'TUKANG GIGI', laki: 32, perempuan: 21 },
  { id: 'penata-rias', pekerjaan: 'PENATA RIAS', laki: 10, perempuan: 150 },
  { id: 'penata-busana', pekerjaan: 'PENATA BUSANA', laki: 12, perempuan: 98 },
  { id: 'penata-rambut', pekerjaan: 'PENATA RAMBUT', laki: 28, perempuan: 112 },
  { id: 'mekanik', pekerjaan: 'MEKANIK', laki: 234, perempuan: 11 },
  { id: 'seniman', pekerjaan: 'SENIMAN', laki: 88, perempuan: 76 },
  { id: 'tabib', pekerjaan: 'TABIB', laki: 45, perempuan: 23 },
  { id: 'paraji', pekerjaan: 'PARAJI', laki: 2, perempuan: 55 },
  { id: 'perancang-busana', pekerjaan: 'PERANCANG BUSANA', laki: 15, perempuan: 88 },
  { id: 'penterjemah', pekerjaan: 'PENTERJEMAH', laki: 41, perempuan: 56 },
  { id: 'imam-masjid', pekerjaan: 'IMAM MASJID', laki: 78, perempuan: 0 },
  { id: 'pendeta', pekerjaan: 'PENDETA', laki: 65, perempuan: 10 },
  { id: 'pastor', pekerjaan: 'PASTOR', laki: 50, perempuan: 0 },
  { id: 'wartawan', pekerjaan: 'WARTAWAN', laki: 110, perempuan: 85 },
  { id: 'ustadz-mubaligh', pekerjaan: 'USTADZ/MUBALIGH', laki: 123, perempuan: 21 },
  { id: 'juru-masak', pekerjaan: 'JURU MASAK', laki: 88, perempuan: 167 },
  { id: 'promotor-acara', pekerjaan: 'PROMOTOR ACARA', laki: 32, perempuan: 41 },
  { id: 'anggota-dpr-ri', pekerjaan: 'ANGGOTA DPR RI', laki: 3, perempuan: 2 },
  { id: 'anggota-dpd-ri', pekerjaan: 'ANGGOTA DPD RI', laki: 2, perempuan: 1 },
  { id: 'anggota-bpk', pekerjaan: 'ANGGOTA BPK', laki: 4, perempuan: 1 },
  { id: 'presiden', pekerjaan: 'PRESIDEN', laki: 1, perempuan: 0 },
  { id: 'wakil-presiden', pekerjaan: 'WAKIL PRESIDEN', laki: 1, perempuan: 0 },
  { id: 'anggota-mahkamah-konstitusi', pekerjaan: 'ANGGOTA MAHKAMAH KONSTITUSI', laki: 5, perempuan: 2 },
  { id: 'anggota-kabinet-kementrian', pekerjaan: 'ANGGOTA KABINET KEMENTRIAN', laki: 20, perempuan: 8 },
  { id: 'duta-besar', pekerjaan: 'DUTA BESAR', laki: 15, perempuan: 7 },
  { id: 'gubernur', pekerjaan: 'GUBERNUR', laki: 1, perempuan: 0 },
  { id: 'wakil-gubernur', pekerjaan: 'WAKIL GUBERNUR', laki: 1, perempuan: 0 },
  { id: 'bupati', pekerjaan: 'BUPATI', laki: 1, perempuan: 0 },
  { id: 'wakil-bupati', pekerjaan: 'WAKIL BUPATI', laki: 1, perempuan: 0 },
  { id: 'walikota', pekerjaan: 'WALIKOTA', laki: 1, perempuan: 0 },
  { id: 'wakil-walikota', pekerjaan: 'WAKIL WALIKOTA', laki: 1, perempuan: 0 },
  { id: 'anggota-dprd-prop', pekerjaan: 'ANGGOTA DPRD PROP.', laki: 25, perempuan: 10 },
  { id: 'anggota-dprd-kab-kota', pekerjaan: 'ANGGOTA DPRD KAB./KOTA', laki: 30, perempuan: 15 },
  { id: 'dosen', pekerjaan: 'DOSEN', laki: 150, perempuan: 165 },
  { id: 'guru', pekerjaan: 'GURU', laki: 450, perempuan: 890 },
  { id: 'pilot', pekerjaan: 'PILOT', laki: 88, perempuan: 9 },
  { id: 'pengacara', pekerjaan: 'PENGACARA', laki: 120, perempuan: 65 },
  { id: 'notaris', pekerjaan: 'NOTARIS', laki: 55, perempuan: 95 },
  { id: 'arsitek', pekerjaan: 'ARSITEK', laki: 95, perempuan: 60 },
  { id: 'akuntan', pekerjaan: 'AKUNTAN', laki: 110, perempuan: 130 },
  { id: 'konsultan', pekerjaan: 'KONSULTAN', laki: 98, perempuan: 77 },
  { id: 'dokter', pekerjaan: 'DOKTER', laki: 210, perempuan: 245 },
  { id: 'bidan', pekerjaan: 'BIDAN', laki: 5, perempuan: 310 },
  { id: 'perawat', pekerjaan: 'PERAWAT', laki: 150, perempuan: 450 },
  { id: 'apoteker', pekerjaan: 'APOTEKER', laki: 45, perempuan: 180 },
  { id: 'psikiater-psikolog', pekerjaan: 'PSIKIATER/PSIKOLOG', laki: 35, perempuan: 85 },
  { id: 'penyiar-televisi', pekerjaan: 'PENYIAR TELEVISI', laki: 25, perempuan: 35 },
  { id: 'penyiar-radio', pekerjaan: 'PENYIAR RADIO', laki: 30, perempuan: 40 },
  { id: 'pelaut', pekerjaan: 'PELAUT', laki: 220, perempuan: 15 },
  { id: 'peneliti', pekerjaan: 'PENELITI', laki: 80, perempuan: 95 },
  { id: 'sopir', pekerjaan: 'SOPIR', laki: 350, perempuan: 10 },
  { id: 'pialang', pekerjaan: 'PIALANG', laki: 40, perempuan: 30 },
  { id: 'paranormal', pekerjaan: 'PARANORMAL', laki: 25, perempuan: 10 },
  { id: 'pedagang', pekerjaan: 'PEDAGANG', laki: 650, perempuan: 720 },
  { id: 'perangkat-desa', pekerjaan: 'PERANGKAT DESA', laki: 15, perempuan: 8 },
  { id: 'kepala-desa', pekerjaan: 'KEPALA DESA', laki: 1, perempuan: 0 },
  { id: 'biarawan-biarawati', pekerjaan: 'BIARAWAN/BIARAWATI', laki: 20, perempuan: 45 },
  { id: 'wiraswasta', pekerjaan: 'WIRASWASTA', laki: 850, perempuan: 450 },
  { id: 'anggota-lemb-tinggi-lainnya', pekerjaan: 'ANGGOTA LEMB. TINGGI LAINNYA', laki: 50, perempuan: 20 },
  { id: 'artis', pekerjaan: 'ARTIS', laki: 60, perempuan: 80 },
  { id: 'atlit', pekerjaan: 'ATLIT', laki: 120, perempuan: 50 },
  { id: 'cheff', pekerjaan: 'CHEFF', laki: 90, perempuan: 70 }, // Ejaan umum 'Chef'
  { id: 'manajer', pekerjaan: 'MANAJER', laki: 250, perempuan: 180 },
  { id: 'tenaga-tata-usaha', pekerjaan: 'TENAGA TATA USAHA', laki: 80, perempuan: 250 },
  { id: 'operator', pekerjaan: 'OPERATOR', laki: 180, perempuan: 120 },
  { id: 'pekerja-pengolahan-kerajinan', pekerjaan: 'PEKERJA PENGOLAHAN KERAJINAN', laki: 40, perempuan: 160 },
  { id: 'teknisi', pekerjaan: 'TEKNISI', laki: 280, perempuan: 30 },
  { id: 'asisten-ahli', pekerjaan: 'ASISTEN AHLI', laki: 70, perempuan: 90 },
  { id: 'pekerjaan-lainnya', pekerjaan: 'PEKERJAAN LAINNYA', laki: 310, perempuan: 280 }
];
    await updateJobsData(defaultJobs);

    // Initialize education data
    const defaultEducation: EducationData[] = [
      { id: 'tidak-sekolah', level: 'Tidak/Belum Sekolah', count: 1245 },
      { id: 'belum-tamat-sd', level: 'Belum Tamat SD/Sederajat', count: 567 },
      { id: 'tamat-sd', level: 'Tamat SD/Sederajat', count: 2134 },
      { id: 'sltp', level: 'SLTP/Sederajat', count: 1876 },
      { id: 'slta', level: 'SLTA/Sederajat', count: 2234 },
      { id: 'diploma', level: 'Diploma I/II', count: 234 },
      { id: 's1', level: 'Akademi/Diploma III/S. Muda', count: 345 },
      { id: 's1-up', level: 'Diploma IV/Strata I', count: 456 },
      { id: 's2', level: 'Strata II', count: 89 },
      { id: 's3', level: 'Strata III', count: 100 }
    ];
    await updateEducationData(defaultEducation);

    console.log('Demographic data initialized successfully');
  } catch (error) {
    console.error('Error initializing demographic data:', error);
  }
};
