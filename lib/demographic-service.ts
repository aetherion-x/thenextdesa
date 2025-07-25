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
      { id: 'buddha', name: 'Buddha', count: 4, icon: 'fa-dharmachakra' }
    ];
    await updateReligionsData(defaultReligions);

    // Initialize jobs data with proper IDs
    const defaultJobs: JobData[] = [
      { id: 'belum-bekerja', pekerjaan: 'Belum/Tidak Bekerja', laki: 946, perempuan: 1205 },
      { id: 'mengurus-rumah', pekerjaan: 'Mengurus Rumah Tangga', laki: 12, perempuan: 1890 },
      { id: 'pelajar', pekerjaan: 'Pelajar/Mahasiswa', laki: 725, perempuan: 689 },
      { id: 'pensiunan', pekerjaan: 'Pensiunan', laki: 145, perempuan: 67 },
      { id: 'petani', pekerjaan: 'Petani/Pekebun', laki: 1205, perempuan: 245 },
      { id: 'buruh-harian', pekerjaan: 'Buruh Harian Lepas', laki: 345, perempuan: 123 },
      { id: 'buruh-tani', pekerjaan: 'Buruh Tani/Perkebunan', laki: 234, perempuan: 89 },
      { id: 'swasta', pekerjaan: 'Karyawan Swasta', laki: 456, perempuan: 234 },
      { id: 'wiraswasta', pekerjaan: 'Wiraswasta', laki: 345, perempuan: 156 },
      { id: 'pedagang', pekerjaan: 'Pedagang', laki: 234, perempuan: 345 },
      { id: 'supir', pekerjaan: 'Sopir', laki: 123, perempuan: 12 },
      { id: 'tukang', pekerjaan: 'Tukang', laki: 234, perempuan: 23 }
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
      { id: 's2-s3', level: 'Strata II/III', count: 89 }
    ];
    await updateEducationData(defaultEducation);

    console.log('Demographic data initialized successfully');
  } catch (error) {
    console.error('Error initializing demographic data:', error);
  }
};
