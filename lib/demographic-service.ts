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
  jumlah: number;
  male: number;
  female: number;
  lastUpdated: Date;
}

// Interface untuk data agama
export interface ReligionData {
  id: string;
  agama: string;
  laki: number;
  perempuan: number;
  jumlah: number;
  icon: string;
}

// Interface untuk data pekerjaan
export interface JobData {
  id: string;
  pekerjaan: string;
  laki: number;
  perempuan: number;
  jumlah: number;
}

// Interface untuk data pendidikan
export interface EducationData {
  id: string;
  tingkat_pendidikan: string;
  laki: number;
  perempuan: number;
  jumlah: number;
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
        jumlah: data.jumlah,
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
    const jumlah = male + female;
    const docRef = doc(db, DEMOGRAPHICS_COLLECTION, POPULATION_DOC);
    
    await setDoc(docRef, {
      jumlah,
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
        jumlah: data.jumlah,
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

// Helper function untuk generate random number dalam range
const randomInRange = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Helper function untuk split number menjadi laki-perempuan secara realistic
const splitGender = (total: number): { laki: number; perempuan: number } => {
  // Distribusi gender realistic: 45-55% untuk masing-masing
  const maleRatio = 0.45 + Math.random() * 0.1; // 45-55%
  const laki = Math.floor(total * maleRatio);
  const perempuan = total - laki;
  return { laki, perempuan };
};

// Fungsi untuk inisialisasi data default dengan data random
export const initializeDemographicData = async (): Promise<void> => {
  try {
    // Check if data already exists before initializing
    const populationDoc = doc(db, DEMOGRAPHICS_COLLECTION, POPULATION_DOC);
    const populationSnapshot = await getDoc(populationDoc);
    
    if (populationSnapshot.exists()) {
      console.log('Demographic data already exists, skipping initialization');
      return;
    }

    console.log('Initializing demographic data with random values...');

    // Generate base population data
    const totalPopulation = randomInRange(8000, 9000);
    const { laki: totalMale, perempuan: totalFemale } = splitGender(totalPopulation);

    // Initialize population data
    await updatePopulationData(totalMale, totalFemale);

    // Initialize religions data with realistic proportions
    const religionsTotal = totalPopulation;
    const islamTotal = Math.floor(religionsTotal * (0.85 + Math.random() * 0.1)); // 85-95%
    const remainingPopulation = religionsTotal - islamTotal;
    
    const defaultReligions: ReligionData[] = [
      { 
        id: 'islam', 
        agama: 'Islam', 
        ...splitGender(islamTotal),
        jumlah: islamTotal,
        icon: 'fa-moon' 
      },
      { 
        id: 'kristen', 
        agama: 'Kristen', 
        ...splitGender(Math.floor(remainingPopulation * 0.4)),
        jumlah: 0,
        icon: 'fa-cross' 
      },
      { 
        id: 'katolik', 
        agama: 'Katolik', 
        ...splitGender(Math.floor(remainingPopulation * 0.3)),
        jumlah: 0,
        icon: 'fa-cross' 
      },
      { 
        id: 'hindu', 
        agama: 'Hindu', 
        ...splitGender(Math.floor(remainingPopulation * 0.15)),
        jumlah: 0,
        icon: 'fa-om' 
      },
      { 
        id: 'buddha', 
        agama: 'Buddha', 
        ...splitGender(Math.floor(remainingPopulation * 0.1)),
        jumlah: 0,
        icon: 'fa-dharmachakra' 
      },
      { 
        id: 'khonghucu', 
        agama: 'Khonghucu', 
        ...splitGender(Math.floor(remainingPopulation * 0.03)),
        jumlah: 0,
        icon: 'fa-yin-yang' 
      },
      { 
        id: 'kepercayaan', 
        agama: 'Kepercayaan', 
        ...splitGender(Math.floor(remainingPopulation * 0.02)),
        jumlah: 0,
        icon: 'fa-pray' 
      },
    ];

    // Calculate jumlah for each religion
    defaultReligions.forEach(religion => {
      religion.jumlah = religion.laki + religion.perempuan;
    });

    await updateReligionsData(defaultReligions);

// Initialize jobs data with 99 templates and realistic random values
const jobsTemplates = [
  { id: 'belum-tidak-bekerja', pekerjaan: 'BELUM/TIDAK BEKERJA', baseCount: 1250, maleRatio: 0.45 },
  { id: 'mengurus-rumah-tangga', pekerjaan: 'MENGURUS RUMAH TANGGA', baseCount: 2100, maleRatio: 0.01 },
  { id: 'pelajar-mahasiswa', pekerjaan: 'PELAJAR/MAHASISWA', baseCount: 1800, maleRatio: 0.51 },
  { id: 'pensiunan', pekerjaan: 'PENSIUNAN', baseCount: 410, maleRatio: 0.60 },
  { id: 'pegawai-negeri-sipil-pns', pekerjaan: 'PEGAWAI NEGERI SIPIL (PNS)', baseCount: 950, maleRatio: 0.48 },
  { id: 'tentara-nasional-indonesia', pekerjaan: 'TENTARA NASIONAL INDONESIA', baseCount: 820, maleRatio: 0.97 },
  { id: 'kepolisian-ri-polri', pekerjaan: 'KEPOLISIAN RI (POLRI)', baseCount: 780, maleRatio: 0.94 },
  { id: 'perdagangan', pekerjaan: 'PERDAGANGAN', baseCount: 750, maleRatio: 0.48 },
  { id: 'petani-pekebun', pekerjaan: 'PETANI/PEKEBUN', baseCount: 1500, maleRatio: 0.80 },
  { id: 'peternak', pekerjaan: 'PETERNAK', baseCount: 380, maleRatio: 0.75 },
  { id: 'nelayan-perikanan', pekerjaan: 'NELAYAN/PERIKANAN', baseCount: 390, maleRatio: 0.88 },
  { id: 'industri', pekerjaan: 'INDUSTRI', baseCount: 680, maleRatio: 0.70 },
  { id: 'konstruksi', pekerjaan: 'KONSTRUKSI', baseCount: 590, maleRatio: 0.96 },
  { id: 'transportasi', pekerjaan: 'TRANSPORTASI', baseCount: 470, maleRatio: 0.92 },
  { id: 'karyawan-swasta', pekerjaan: 'KARYAWAN SWASTA', baseCount: 1900, maleRatio: 0.58 },
  { id: 'karyawan-bumn', pekerjaan: 'KARYAWAN BUMN', baseCount: 720, maleRatio: 0.62 },
  { id: 'karyawan-bumd', pekerjaan: 'KARYAWAN BUMD', baseCount: 430, maleRatio: 0.61 },
  { id: 'karyawan-honorer', pekerjaan: 'KARYAWAN HONORER', baseCount: 450, maleRatio: 0.42 },
  { id: 'buruh-harian-lepas', pekerjaan: 'BURUH HARIAN LEPAS', baseCount: 650, maleRatio: 0.72 },
  { id: 'buruh-tani-perkebunan', pekerjaan: 'BURUH TANI/PERKEBUNAN', baseCount: 810, maleRatio: 0.78 },
  { id: 'buruh-nelayan-perikanan', pekerjaan: 'BURUH NELAYAN/PERIKANAN', baseCount: 320, maleRatio: 0.85 },
  { id: 'buruh-peternakan', pekerjaan: 'BURUH PETERNAKAN', baseCount: 210, maleRatio: 0.73 },
  { id: 'pembantu-rumah-tangga', pekerjaan: 'PEMBANTU RUMAH TANGGA', baseCount: 550, maleRatio: 0.05 },
  { id: 'tukang-cukur', pekerjaan: 'TUKANG CUKUR', baseCount: 190, maleRatio: 0.98 },
  { id: 'tukang-listrik', pekerjaan: 'TUKANG LISTRIK', baseCount: 230, maleRatio: 0.99 },
  { id: 'tukang-batu', pekerjaan: 'TUKANG BATU', baseCount: 250, maleRatio: 0.99 },
  { id: 'tukang-kayu', pekerjaan: 'TUKANG KAYU', baseCount: 200, maleRatio: 0.99 },
  { id: 'tukang-sol-sepatu', pekerjaan: 'TUKANG SOL SEPATU', baseCount: 90, maleRatio: 0.95 },
  { id: 'tukang-las-pandai-besi', pekerjaan: 'TUKANG LAS/PANDAI BESI', baseCount: 280, maleRatio: 0.98 },
  { id: 'tukang-jahit', pekerjaan: 'TUKANG JAHIT', baseCount: 260, maleRatio: 0.20 },
  { id: 'tukang-gigi', pekerjaan: 'TUKANG GIGI', baseCount: 110, maleRatio: 0.65 },
  { id: 'penata-rias', pekerjaan: 'PENATA RIAS', baseCount: 310, maleRatio: 0.03 },
  { id: 'penata-busana', pekerjaan: 'PENATA BUSANA', baseCount: 180, maleRatio: 0.15 },
  { id: 'penata-rambut', pekerjaan: 'PENATA RAMBUT', baseCount: 220, maleRatio: 0.18 },
  { id: 'mekanik', pekerjaan: 'MEKANIK', baseCount: 300, maleRatio: 0.97 },
  { id: 'seniman', pekerjaan: 'SENIMAN', baseCount: 240, maleRatio: 0.60 },
  { id: 'tabib', pekerjaan: 'TABIB', baseCount: 130, maleRatio: 0.70 },
  { id: 'paraji', pekerjaan: 'PARAJI', baseCount: 95, maleRatio: 0.08 },
  { id: 'perancang-busana', pekerjaan: 'PERANCANG BUSANA', baseCount: 170, maleRatio: 0.12 },
  { id: 'penterjemah', pekerjaan: 'PENTERJEMAH', baseCount: 200, maleRatio: 0.40 },
  { id: 'imam-masjid', pekerjaan: 'IMAM MASJID', baseCount: 330, maleRatio: 0.99 },
  { id: 'pendeta', pekerjaan: 'PENDETA', baseCount: 290, maleRatio: 0.85 },
  { id: 'pastor', pekerjaan: 'PASTOR', baseCount: 150, maleRatio: 1.00 },
  { id: 'wartawan', pekerjaan: 'WARTAWAN', baseCount: 350, maleRatio: 0.65 },
  { id: 'ustadz-mubaligh', pekerjaan: 'USTADZ/MUBALIGH', baseCount: 400, maleRatio: 0.88 },
  { id: 'juru-masak', pekerjaan: 'JURU MASAK', baseCount: 410, maleRatio: 0.45 },
  { id: 'promotor-acara', pekerjaan: 'PROMOTOR ACARA', baseCount: 120, maleRatio: 0.55 },
  { id: 'anggota-dpr-ri', pekerjaan: 'ANGGOTA DPR RI', baseCount: 580, maleRatio: 0.79 },
  { id: 'anggota-dpd-ri', pekerjaan: 'ANGGOTA DPD RI', baseCount: 152, maleRatio: 0.85 },
  { id: 'anggota-bpk', pekerjaan: 'ANGGOTA BPK', baseCount: 40, maleRatio: 0.75 },
  { id: 'presiden', pekerjaan: 'PRESIDEN', baseCount: 1, maleRatio: 1.00 },
  { id: 'wakil-presiden', pekerjaan: 'WAKIL PRESIDEN', baseCount: 1, maleRatio: 1.00 },
  { id: 'anggota-mahkamah-konstitusi', pekerjaan: 'ANGGOTA MAHKAMAH KONSTITUSI', baseCount: 9, maleRatio: 0.89 },
  { id: 'anggota-kabinet-kementrian', pekerjaan: 'ANGGOTA KABINET KEMENTRIAN', baseCount: 34, maleRatio: 0.82 },
  { id: 'duta-besar', pekerjaan: 'DUTA BESAR', baseCount: 130, maleRatio: 0.78 },
  { id: 'gubernur', pekerjaan: 'GUBERNUR', baseCount: 38, maleRatio: 0.92 },
  { id: 'wakil-gubernur', pekerjaan: 'WAKIL GUBERNUR', baseCount: 38, maleRatio: 0.89 },
  { id: 'bupati', pekerjaan: 'BUPATI', baseCount: 416, maleRatio: 0.91 },
  { id: 'wakil-bupati', pekerjaan: 'WAKIL BUPATI', baseCount: 416, maleRatio: 0.90 },
  { id: 'walikota', pekerjaan: 'WALIKOTA', baseCount: 98, maleRatio: 0.93 },
  { id: 'wakil-walikota', pekerjaan: 'WAKIL WALIKOTA', baseCount: 98, maleRatio: 0.91 },
  { id: 'anggota-dprd-prop', pekerjaan: 'ANGGOTA DPRD PROP.', baseCount: 2200, maleRatio: 0.80 },
  { id: 'anggota-dprd-kab-kot', pekerjaan: 'ANGGOTA DPRD KAB./KOT', baseCount: 17600, maleRatio: 0.82 },
  { id: 'dosen', pekerjaan: 'DOSEN', baseCount: 300, maleRatio: 0.58 },
  { id: 'guru', pekerjaan: 'GURU', baseCount: 1400, maleRatio: 0.30 },
  { id: 'pilot', pekerjaan: 'PILOT', baseCount: 150, maleRatio: 0.96 },
  { id: 'pengacara', pekerjaan: 'PENGACARA', baseCount: 320, maleRatio: 0.75 },
  { id: 'notaris', pekerjaan: 'NOTARIS', baseCount: 280, maleRatio: 0.45 },
  { id: 'arsitek', pekerjaan: 'ARSITEK', baseCount: 260, maleRatio: 0.68 },
  { id: 'akuntan', pekerjaan: 'AKUNTAN', baseCount: 400, maleRatio: 0.49 },
  { id: 'konsultan', pekerjaan: 'KONSULTAN', baseCount: 380, maleRatio: 0.63 },
  { id: 'dokter', pekerjaan: 'DOKTER', baseCount: 480, maleRatio: 0.52 },
  { id: 'bidan', pekerjaan: 'BIDAN', baseCount: 350, maleRatio: 0.02 },
  { id: 'perawat', pekerjaan: 'PERAWAT', baseCount: 620, maleRatio: 0.22 },
  { id: 'apoteker', pekerjaan: 'APOTEKER', baseCount: 290, maleRatio: 0.35 },
  { id: 'psikiater-psikolog', pekerjaan: 'PSIKIATER/PSIKOLOG', baseCount: 180, maleRatio: 0.38 },
  { id: 'penyiar-televisi', pekerjaan: 'PENYIAR TELEVISI', baseCount: 210, maleRatio: 0.48 },
  { id: 'penyiar-radio', pekerjaan: 'PENYIAR RADIO', baseCount: 240, maleRatio: 0.52 },
  { id: 'pelaut', pekerjaan: 'PELAUT', baseCount: 370, maleRatio: 0.98 },
  { id: 'peneliti', pekerjaan: 'PENELITI', baseCount: 290, maleRatio: 0.55 },
  { id: 'sopir', pekerjaan: 'SOPIR', baseCount: 400, maleRatio: 0.98 },
  { id: 'pialang', pekerjaan: 'PIALANG', baseCount: 160, maleRatio: 0.67 },
  { id: 'paranormal', pekerjaan: 'PARANORMAL', baseCount: 90, maleRatio: 0.70 },
  { id: 'pedagang', pekerjaan: 'PEDAGANG', baseCount: 1450, maleRatio: 0.53 },
  { id: 'perangkat-desa', pekerjaan: 'PERANGKAT DESA', baseCount: 700, maleRatio: 0.75 },
  { id: 'kepala-desa', pekerjaan: 'KEPALA DESA', baseCount: 800, maleRatio: 0.94 },
  { id: 'biarawan-biarawati', pekerjaan: 'BIARAWAN/BIARAWATI', baseCount: 140, maleRatio: 0.50 },
  { id: 'wiraswasta', pekerjaan: 'WIRASWASTA', baseCount: 1350, maleRatio: 0.68 },
  { id: 'anggota-lemb-tinggi-lainnya', pekerjaan: 'ANGGOTA LEMB. TINGGI LAINNYA', baseCount: 110, maleRatio: 0.70 },
  { id: 'artis', pekerjaan: 'ARTIS', baseCount: 250, maleRatio: 0.45 },
  { id: 'atlit', pekerjaan: 'ATLIT', baseCount: 310, maleRatio: 0.72 },
  { id: 'chef', pekerjaan: 'CHEF', baseCount: 200, maleRatio: 0.65 },
  { id: 'manajer', pekerjaan: 'MANAJER', baseCount: 550, maleRatio: 0.60 },
  { id: 'tenaga-tata-usaha', pekerjaan: 'TENAGA TATA USAHA', baseCount: 600, maleRatio: 0.33 },
  { id: 'operator', pekerjaan: 'OPERATOR', baseCount: 480, maleRatio: 0.80 },
  { id: 'pekerja-pengolahan-kerajinan', pekerjaan: 'PEKERJA PENGOLAHAN KERAJINAN', baseCount: 330, maleRatio: 0.30 },
  { id: 'teknisi', pekerjaan: 'TEKNISI', baseCount: 340, maleRatio: 0.93 },
  { id: 'asisten-ahli', pekerjaan: 'ASISTEN AHLI', baseCount: 270, maleRatio: 0.48 },
  { id: 'pekerjaan-lainnya', pekerjaan: 'PEKERJAAN LAINNYA', baseCount: 610, maleRatio: 0.55 }
];
const defaultJobs: JobData[] = jobsTemplates.map(template => {
  const variance = 0.8 + Math.random() * 0.4; // 80-120% dari base
  const totalCount = Math.floor(template.baseCount * variance);
  const laki = Math.floor(totalCount * template.maleRatio);
  const perempuan = totalCount - laki;
  
  return {
    id: template.id,
    pekerjaan: template.pekerjaan,
    laki,
    perempuan,
    jumlah: totalCount
  };
});
    await updateJobsData(defaultJobs);

    // Initialize education data with realistic random values
    const educationTemplates = [
      { id: 'tidak-sekolah', tingkat_pendidikan: 'Tidak/Belum Sekolah', baseCount: 1200, maleRatio: 0.52 },
      { id: 'belum-tamat-sd', tingkat_pendidikan: 'Belum Tamat SD/Sederajat', baseCount: 560, maleRatio: 0.49 },
      { id: 'tamat-sd', tingkat_pendidikan: 'Tamat SD/Sederajat', baseCount: 2100, maleRatio: 0.49 },
      { id: 'sltp', tingkat_pendidikan: 'SLTP/Sederajat', baseCount: 1870, maleRatio: 0.49 },
      { id: 'slta', tingkat_pendidikan: 'SLTA/Sederajat', baseCount: 2200, maleRatio: 0.49 },
      { id: 'diploma', tingkat_pendidikan: 'Diploma I/II', baseCount: 230, maleRatio: 0.49 },
      { id: 's1', tingkat_pendidikan: 'Akademi/Diploma III/S. Muda', baseCount: 340, maleRatio: 0.49 },
      { id: 's1-up', tingkat_pendidikan: 'Diploma IV/Strata I', baseCount: 450, maleRatio: 0.49 },
      { id: 's2', tingkat_pendidikan: 'Strata II', baseCount: 85, maleRatio: 0.49 },
      { id: 's3', tingkat_pendidikan: 'Strata III', baseCount: 95, maleRatio: 0.53 }
    ];

    const defaultEducation: EducationData[] = educationTemplates.map(template => {
      const variance = 0.8 + Math.random() * 0.4; // 80-120% dari base
      const totalCount = Math.floor(template.baseCount * variance);
      const laki = Math.floor(totalCount * template.maleRatio);
      const perempuan = totalCount - laki;
      
      return {
        id: template.id,
        tingkat_pendidikan: template.tingkat_pendidikan,
        laki,
        perempuan,
        jumlah: totalCount
      };
    });

    await updateEducationData(defaultEducation);

    console.log('Demographic data initialized successfully with random realistic values');
  } catch (error) {
    console.error('Error initializing demographic data:', error);
  }
};
