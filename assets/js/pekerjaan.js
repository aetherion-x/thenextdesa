document.addEventListener('DOMContentLoaded', function() {
    // --- DATA DIAMBIL LANGSUNG DARI FILE SPREADSHEET ANDA ---
    const dataPekerjaan = {
        "semua": [
            { "jenis": "BELUM/TIDAK BEKERJA", "jumlah": 269 },
            { "jenis": "MENGURUS RUMAH TANGGA", "jumlah": 269 },
            { "jenis": "PELAJAR/MAHASISWA", "jumlah": 323 },
            { "jenis": "PENSIUNAN", "jumlah": 0 },
            { "jenis": "PEGAWAI NEGERI SIPIL (PNS)", "jumlah": 0 },
            { "jenis": "TENTARA NASIONAL INDONESIA (TNI)", "jumlah": 0 },
            { "jenis": "KEPOLISIAN RI (POLRI)", "jumlah": 0 },
            { "jenis": "PERDAGANGAN", "jumlah": 0 },
            { "jenis": "PETANI/PEKEBUN", "jumlah": 38 },
            { "jenis": "PETERNAK", "jumlah": 0 },
            { "jenis": "NELAYAN/PERIKANAN", "jumlah": 51 },
            { "jenis": "INDUSTRI", "jumlah": 0 },
            { "jenis": "KONSTRUKSI", "jumlah": 0 },
            { "jenis": "TRANSPORTASI", "jumlah": 0 },
            { "jenis": "KARYAWAN SWASTA", "jumlah": 117 },
            { "jenis": "KARYAWAN BUMN", "jumlah": 0 },
            { "jenis": "KARYAWAN BUMD", "jumlah": 0 },
            { "jenis": "KARYAWAN HONORER", "jumlah": 0 },
            { "jenis": "BURUH HARIAN LEPAS", "jumlah": 0 },
            { "jenis": "BURUH TANI/PERKEBUNAN", "jumlah": 0 },
            { "jenis": "BURUH NELAYAN/PERIKANAN", "jumlah": 0 },
            { "jenis": "BURUH PETERNAKAN", "jumlah": 0 },
            { "jenis": "PEMBANTU RUMAH TANGGA", "jumlah": 0 },
            { "jenis": "TUKANG CUKUR", "jumlah": 0 },
            { "jenis": "TUKANG LISTRIK", "jumlah": 0 },
            { "jenis": "TUKANG BATU", "jumlah": 0 },
            { "jenis": "TUKANG KAYU", "jumlah": 0 },
            { "jenis": "TUKANG SOL SEPATU", "jumlah": 0 },
            { "jenis": "TUKANG LAS/PANDAI BESI", "jumlah": 0 },
            { "jenis": "TUKANG JAHIT", "jumlah": 0 },
            { "jenis": "TUKANG GIGI", "jumlah": 0 },
            { "jenis": "PENATA RIAS", "jumlah": 0 },
            { "jenis": "PENATA BUSANA", "jumlah": 0 },
            { "jenis": "PENATA RAMBUT", "jumlah": 0 },
            { "jenis": "MEKANIK", "jumlah": 0 },
            { "jenis": "SENIMAN", "jumlah": 0 },
            { "jenis": "TABIB", "jumlah": 0 },
            { "jenis": "PARAJI", "jumlah": 0 },
            { "jenis": "PERANCANG BUSANA", "jumlah": 0 },
            { "jenis": "PENTERJEMAH", "jumlah": 0 },
            { "jenis": "IMAM MASJID", "jumlah": 0 },
            { "jenis": "PENDETA", "jumlah": 0 },
            { "jenis": "PASTOR", "jumlah": 0 },
            { "jenis": "WARTAWAN", "jumlah": 0 },
            { "jenis": "USTADZ/MUBALIGH", "jumlah": 0 },
            { "jenis": "JURU MASAK", "jumlah": 0 },
            { "jenis": "PROMOTOR ACARA", "jumlah": 0 },
            { "jenis": "ANGGOTA DPR-RI", "jumlah": 0 },
            { "jenis": "ANGGOTA DPD", "jumlah": 0 },
            { "jenis": "ANGGOTA BPK", "jumlah": 0 },
            { "jenis": "PRESIDEN", "jumlah": 0 },
            { "jenis": "WAKIL PRESIDEN", "jumlah": 0 },
            { "jenis": "ANGGOTA MAHKAMAH KONSTITUSI", "jumlah": 0 },
            { "jenis": "ANGGOTA KABINET/KEMENTERIAN", "jumlah": 0 },
            { "jenis": "DUTA BESAR", "jumlah": 0 },
            { "jenis": "GUBERNUR", "jumlah": 0 },
            { "jenis": "WAKIL GUBERNUR", "jumlah": 0 },
            { "jenis": "BUPATI", "jumlah": 0 },
            { "jenis": "WAKIL BUPATI", "jumlah": 0 },
            { "jenis": "WALIKOTA", "jumlah": 0 },
            { "jenis": "WAKIL WALIKOTA", "jumlah": 0 },
            { "jenis": "ANGGOTA DPRD PROVINSI", "jumlah": 0 },
            { "jenis": "ANGGOTA DPRD KABUPATEN/KOTA", "jumlah": 0 },
            { "jenis": "DOSEN", "jumlah": 0 },
            { "jenis": "GURU", "jumlah": 0 },
            { "jenis": "PILOT", "jumlah": 0 },
            { "jenis": "PENGACARA", "jumlah": 0 },
            { "jenis": "NOTARIS", "jumlah": 0 },
            { "jenis": "ARSITEK", "jumlah": 0 },
            { "jenis": "AKUNTAN", "jumlah": 0 },
            { "jenis": "KONSULTAN", "jumlah": 0 },
            { "jenis": "DOKTER", "jumlah": 0 },
            { "jenis": "BIDAN", "jumlah": 0 },
            { "jenis": "PERAWAT", "jumlah": 0 },
            { "jenis": "APOTEKER", "jumlah": 0 },
            { "jenis": "PSIKIATER/PSIKOLOG", "jumlah": 0 },
            { "jenis": "PENYIAR TELEVISI", "jumlah": 0 },
            { "jenis": "PENYIAR RADIO", "jumlah": 0 },
            { "jenis": "PELAUT", "jumlah": 0 },
            { "jenis": "PENELITI", "jumlah": 0 },
            { "jenis": "SOPIR", "jumlah": 0 },
            { "jenis": "PIALANG", "jumlah": 0 },
            { "jenis": "PARANORMAL", "jumlah": 0 },
            { "jenis": "PEDAGANG", "jumlah": 0 },
            { "jenis": "PERANGKAT DESA", "jumlah": 0 },
            { "jenis": "KEPALA DESA", "jumlah": 0 },
            { "jenis": "WIRASWASTA", "jumlah": 27 },
            { "jenis": "LAINNYA", "jumlah": 0 }
        ],
        "laki_laki": [
            { "jenis": "BELUM/TIDAK BEKERJA", "jumlah": 130 },
            { "jenis": "PELAJAR/MAHASISWA", "jumlah": 170 },
            { "jenis": "PETANI/PEKEBUN", "jumlah": 35 },
            { "jenis": "NELAYAN/PERIKANAN", "jumlah": 50 },
            { "jenis": "KARYAWAN SWASTA", "jumlah": 90 },
            { "jenis": "WIRASWASTA", "jumlah": 25 }
        ],
        "perempuan": [
            { "jenis": "BELUM/TIDAK BEKERJA", "jumlah": 139 },
            { "jenis": "MENGURUS RUMAH TANGGA", "jumlah": 260 },
            { "jenis": "PELAJAR/MAHASISWA", "jumlah": 153 },
            { "jenis": "PETANI/PEKEBUN", "jumlah": 3 },
            { "jenis": "NELAYAN/PERIKANAN", "jumlah": 1 },
            { "jenis": "KARYAWAN SWASTA", "jumlah": 27 },
            { "jenis": "WIRASWASTA", "jumlah": 2 }
        ]
    };

    const tabelContainer = document.getElementById('tabel-pekerjaan-container');
    const kartuContainer = document.getElementById('kartu-pekerjaan-container');
    const filterButtons = document.querySelectorAll('.filter-btn-pekerjaan');

    function tampilkanData(filter = 'semua') {
        const data = dataPekerjaan[filter];
        if (!data || !tabelContainer || !kartuContainer) return;

        tabelContainer.innerHTML = '';
        kartuContainer.innerHTML = '';
        
        // --- PERUBAHAN LOGIKA DI SINI ---
        // 1. Urutkan semua data berdasarkan jumlah terbanyak
        const dataUrut = [...data].sort((a, b) => b.jumlah - a.jumlah);

        // 2. Tampilkan semua data di tabel sesuai urutan baru
        dataUrut.forEach(item => {
            const row = document.createElement('div');
            row.className = 'flex items-center p-3 border-b border-gray-200 dark:border-gray-700';
            row.innerHTML = `
                <span class="text-sm flex-1">${item.jenis}</span>
                <span class="text-sm font-semibold text-right">${item.jumlah.toLocaleString('id-ID')}</span>
            `;
            tabelContainer.appendChild(row);
        });
        
        // 3. Ambil 6 data teratas untuk kartu ringkasan
        const top6 = dataUrut.slice(0, 6);
        top6.forEach(item => {
            const card = document.createElement('div');
            card.className = 'bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg text-center';
            card.innerHTML = `
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-2 truncate">${item.jenis}</p>
                <p class="text-4xl font-bold">${item.jumlah.toLocaleString('id-ID')}</p>
            `;
            kartuContainer.appendChild(card);
        });
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => {
                btn.classList.remove('bg-blue', 'text-white');
                btn.classList.add('bg-white', 'dark:bg-gray-700');
            });

            button.classList.add('bg-blue', 'text-white');
            button.classList.remove('bg-white', 'dark:bg-gray-700');

            const filterText = button.innerText.toLowerCase();
            let filterKey = 'semua';
            if (filterText === 'laki-laki') {
                filterKey = 'laki_laki';
            } else if (filterText === 'perempuan') {
                filterKey = 'perempuan';
            }
            
            tampilkanData(filterKey);
        });
    });

    tampilkanData('semua');
});
