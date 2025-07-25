import { initializeDemographicData } from '../lib/demographic-service';

async function initData() {
  console.log('Menginisialisasi data kependudukan ke Firestore...');
  
  try {
    const success = await initializeDemographicData();
    
    if (success) {
      console.log('✅ Data berhasil diinisialisasi ke Firestore!');
    } else {
      console.log('❌ Gagal menginisialisasi data');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

initData();
