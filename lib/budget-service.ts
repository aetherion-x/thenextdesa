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

// Interface untuk data pendapatan
export interface RevenueData {
  id: string;
  name: string;
  amount: number;
  year: number;
  lastUpdated: Date;
}

// Interface untuk data belanja
export interface ExpenditureData {
  id: string;
  name: string;
  amount: number;
  year: number;
  lastUpdated: Date;
}

// Interface untuk summary APBD
export interface BudgetSummary {
  year: number;
  totalRevenue: number;
  totalExpenditure: number;
  surplus: number;
  lastUpdated: Date;
}

// Fungsi untuk mengambil data pendapatan
export const getRevenueData = async (year: number = 2024): Promise<RevenueData[]> => {
  try {
    const revenueDoc = await getDoc(doc(db, 'budget', `revenue-${year}`));
    if (revenueDoc.exists()) {
      const data = revenueDoc.data();
      return data.items || [];
    }
    return [];
  } catch (error) {
    console.error('Error getting revenue data:', error);
    return [];
  }
};

// Fungsi untuk mengambil data belanja
export const getExpenditureData = async (year: number = 2024): Promise<ExpenditureData[]> => {
  try {
    const expenditureDoc = await getDoc(doc(db, 'budget', `expenditure-${year}`));
    if (expenditureDoc.exists()) {
      const data = expenditureDoc.data();
      return data.items || [];
    }
    return [];
  } catch (error) {
    console.error('Error getting expenditure data:', error);
    return [];
  }
};

// Fungsi untuk mengambil summary budget
export const getBudgetSummary = async (year: number = 2024): Promise<BudgetSummary | null> => {
  try {
    const summaryDoc = await getDoc(doc(db, 'budget', `summary-${year}`));
    if (summaryDoc.exists()) {
      const data = summaryDoc.data();
      return {
        year: data.year,
        totalRevenue: data.totalRevenue,
        totalExpenditure: data.totalExpenditure,
        surplus: data.surplus,
        lastUpdated: data.lastUpdated?.toDate() || new Date()
      };
    }
    return null;
  } catch (error) {
    console.error('Error getting budget summary:', error);
    return null;
  }
};

// Fungsi untuk update data pendapatan
export const updateRevenueData = async (year: number, items: RevenueData[]): Promise<boolean> => {
  try {
    const totalRevenue = items.reduce((sum, item) => sum + item.amount, 0);
    
    // Update revenue items
    await setDoc(doc(db, 'budget', `revenue-${year}`), {
      year,
      items,
      total: totalRevenue,
      lastUpdated: new Date()
    });

    // Update summary
    await updateBudgetSummary(year);
    
    return true;
  } catch (error) {
    console.error('Error updating revenue data:', error);
    return false;
  }
};

// Fungsi untuk update data belanja
export const updateExpenditureData = async (year: number, items: ExpenditureData[]): Promise<boolean> => {
  try {
    const totalExpenditure = items.reduce((sum, item) => sum + item.amount, 0);
    
    // Update expenditure items
    await setDoc(doc(db, 'budget', `expenditure-${year}`), {
      year,
      items,
      total: totalExpenditure,
      lastUpdated: new Date()
    });

    // Update summary
    await updateBudgetSummary(year);
    
    return true;
  } catch (error) {
    console.error('Error updating expenditure data:', error);
    return false;
  }
};

// Fungsi untuk update summary budget
const updateBudgetSummary = async (year: number): Promise<void> => {
  try {
    const [revenueData, expenditureData] = await Promise.all([
      getRevenueData(year),
      getExpenditureData(year)
    ]);

    const totalRevenue = revenueData.reduce((sum, item) => sum + item.amount, 0);
    const totalExpenditure = expenditureData.reduce((sum, item) => sum + item.amount, 0);
    const surplus = totalRevenue - totalExpenditure;

    await setDoc(doc(db, 'budget', `summary-${year}`), {
      year,
      totalRevenue,
      totalExpenditure,
      surplus,
      lastUpdated: new Date()
    });
  } catch (error) {
    console.error('Error updating budget summary:', error);
  }
};

// Real-time listener untuk data pendapatan
export const subscribeToRevenueData = (
  year: number,
  callback: (data: RevenueData[]) => void
): (() => void) => {
  return onSnapshot(doc(db, 'budget', `revenue-${year}`), (doc) => {
    if (doc.exists()) {
      const data = doc.data();
      callback(data.items || []);
    } else {
      callback([]);
    }
  });
};

// Real-time listener untuk data belanja
export const subscribeToExpenditureData = (
  year: number,
  callback: (data: ExpenditureData[]) => void
): (() => void) => {
  return onSnapshot(doc(db, 'budget', `expenditure-${year}`), (doc) => {
    if (doc.exists()) {
      const data = doc.data();
      callback(data.items || []);
    } else {
      callback([]);
    }
  });
};

// Real-time listener untuk summary budget
export const subscribeToBudgetSummary = (
  year: number,
  callback: (data: BudgetSummary | null) => void
): (() => void) => {
  return onSnapshot(doc(db, 'budget', `summary-${year}`), (doc) => {
    if (doc.exists()) {
      const data = doc.data();
      callback({
        year: data.year,
        totalRevenue: data.totalRevenue,
        totalExpenditure: data.totalExpenditure,
        surplus: data.surplus,
        lastUpdated: data.lastUpdated?.toDate() || new Date()
      });
    } else {
      callback(null);
    }
  });
};

// Fungsi untuk inisialisasi data default
export const initializeBudgetData = async (year: number = 2024): Promise<void> => {
  try {
    // Check if data already exists before initializing
    const revenueDoc = doc(db, 'budget', `revenue-${year}`);
    const revenueSnapshot = await getDoc(revenueDoc);
    
    if (revenueSnapshot.exists()) {
      console.log(`Budget data for ${year} already exists, skipping initialization`);
      return;
    }

    console.log(`Initializing budget data for ${year} with default values...`);

    // Data pendapatan default
    const defaultRevenue: RevenueData[] = [
      {
        id: 'pad',
        name: 'Pendapatan Asli Desa',
        amount: 325310200,
        year,
        lastUpdated: new Date()
      },
      {
        id: 'transfer',
        name: 'Pendapatan Transfer',
        amount: 2089649500,
        year,
        lastUpdated: new Date()
      },
      {
        id: 'lainnya',
        name: 'Pendapatan Lain-lain',
        amount: 0,
        year,
        lastUpdated: new Date()
      }
    ];

    // Data belanja default
    const defaultExpenditure: ExpenditureData[] = [
      {
        id: 'pemerintahan',
        name: 'Penyelenggaraan Pemerintahan Desa',
        amount: 1123785756.34,
        year,
        lastUpdated: new Date()
      },
      {
        id: 'pembangunan',
        name: 'Pelaksanaan Pembangunan Desa',
        amount: 1187744000,
        year,
        lastUpdated: new Date()
      },
      {
        id: 'kemasyarakatan',
        name: 'Pembinaan Kemasyarakatan',
        amount: 73627444,
        year,
        lastUpdated: new Date()
      },
      {
        id: 'pemberdayaan',
        name: 'Pemberdayaan Masyarakat Desa',
        amount: 218317000,
        year,
        lastUpdated: new Date()
      },
      {
        id: 'bencana',
        name: 'Penanggulangan Bencana, Keadaan Darurat dan Mendesak',
        amount: 173093000,
        year,
        lastUpdated: new Date()
      }
    ];

    // Initialize data
    await updateRevenueData(year, defaultRevenue);
    await updateExpenditureData(year, defaultExpenditure);
    
    console.log(`Budget data for ${year} initialized successfully`);
  } catch (error) {
    console.error('Error initializing budget data:', error);
  }
};
