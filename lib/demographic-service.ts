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

// Initialize jobs data with realistic random values
const jobsTemplates = [
  { id: 'belum-tidak-bekerja', pekerjaan: 'BELUM/TIDAK BEKERJA', baseCount: 1200, maleRatio: 0.4 },
  { id: 'mengurus-rumah-tangga', pekerjaan: 'MENGURUS RUMAH TANGGA', baseCount: 2000, maleRatio: 0.01 },
  { id: 'pelajar-mahasiswa', pekerjaan: 'PELAJAR/MAHASISWA', baseCount: 1600, maleRatio: 0.51 },
  { id: 'pensiunan', pekerjaan: 'PENSIUNAN', baseCount: 360, maleRatio: 0.58 },
  { id: 'pegawai-negeri-sipil-pns', pekerjaan: 'PEGAWAI NEGERI SIPIL (PNS)', baseCount: 900, maleRatio: 0.49 },
  { id: 'tentara-nasional-indonesia', pekerjaan: 'TENTARA NASIONAL INDONESIA', baseCount: 800, maleRatio: 0.96 },
  { id: 'kepolisian-ri-polri', pekerjaan: 'KEPOLISIAN RI (POLRI)', baseCount: 750, maleRatio: 0.93 },
  { id: 'perdagangan', pekerjaan: 'PERDAGANGAN', baseCount: 700, maleRatio: 0.43 },
  { id: 'petani-pekebun', pekerjaan: 'PETANI/PEKEBUN', baseCount: 1470, maleRatio: 0.78 },
  { id: 'peternak', pekerjaan: 'PETERNAK', baseCount: 340, maleRatio: 0.74 },
  { id: 'nelayan-perikanan', pekerjaan: 'NELAYAN/PERIKANAN', baseCount: 350, maleRatio: 0.87 },
  { id: 'industri', pekerjaan: 'INDUSTRI', baseCount: 630, maleRatio: 0.67 },
  { id: 'konstruksi', pekerjaan: 'KONSTRUKSI', baseCount: 540, maleRatio: 0.95 },
  { id: 'transportasi', pekerjaan: 'TRANSPORTASI', baseCount: 430, maleRatio: 0.90 },
  { id: 'karyawan-swasta', pekerjaan: 'KARYAWAN SWASTA', baseCount: 1740, maleRatio: 0.57 },
  { id: 'guru', pekerjaan: 'GURU', baseCount: 1340, maleRatio: 0.34 },
  { id: 'dokter', pekerjaan: 'DOKTER', baseCount: 450, maleRatio: 0.46 },
  { id: 'perawat', pekerjaan: 'PERAWAT', baseCount: 600, maleRatio: 0.25 },
  { id: 'bidan', pekerjaan: 'BIDAN', baseCount: 315, maleRatio: 0.02 },
  { id: 'pedagang', pekerjaan: 'PEDAGANG', baseCount: 1370, maleRatio: 0.47 },
  { id: 'wiraswasta', pekerjaan: 'WIRASWASTA', baseCount: 1300, maleRatio: 0.65 },
  { id: 'sopir', pekerjaan: 'SOPIR', baseCount: 360, maleRatio: 0.97 },
  { id: 'tukang-batu', pekerjaan: 'TUKANG BATU', baseCount: 220, maleRatio: 0.99 },
  { id: 'tukang-kayu', pekerjaan: 'TUKANG KAYU', baseCount: 180, maleRatio: 0.98 },
  { id: 'tukang-jahit', pekerjaan: 'TUKANG JAHIT', baseCount: 240, maleRatio: 0.23 },
  { id: 'mekanik', pekerjaan: 'MEKANIK', baseCount: 245, maleRatio: 0.96 },
  { id: 'buruh-harian-lepas', pekerjaan: 'BURUH HARIAN LEPAS', baseCount: 600, maleRatio: 0.69 },
  { id: 'karyawan-honorer', pekerjaan: 'KARYAWAN HONORER', baseCount: 420, maleRatio: 0.43 },
  { id: 'teknisi', pekerjaan: 'TEKNISI', baseCount: 310, maleRatio: 0.90 },
  { id: 'pekerjaan-lainnya', pekerjaan: 'PEKERJAAN LAINNYA', baseCount: 590, maleRatio: 0.53 }
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
