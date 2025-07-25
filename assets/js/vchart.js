document.addEventListener("DOMContentLoaded", function () {
        // --- BAGIAN 1: LOGIKA INTERFACE (TAB & DARK MODE) ---

        const buttons = document.querySelectorAll(".tab-button");
        const contents = document.querySelectorAll(".tab-content");

        buttons.forEach((button) => {
          button.addEventListener("click", () => {
            const targetId = button.dataset.target;
            contents.forEach((content) => content.classList.add("hidden"));
            const targetContent = document.querySelector(targetId);
            if (targetContent) targetContent.classList.remove("hidden");

            // Atur style tombol aktif
            buttons.forEach((btn) => {
              btn.classList.remove("bg-accent", "text-white");
              btn.classList.add(
                "bg-white",
                "dark:bg-gray-700",
                "text-gray-800",
                "dark:text-gray-200",
                "hover:bg-gray-100"
              );
            });
            button.classList.add("bg-accent", "text-white");
            button.classList.remove(
              "bg-white",
              "dark:bg-gray-700",
              "text-gray-800",
              "dark:text-gray-200",
              "hover:bg-gray-100"
            );

            // PENTING: Panggil ulang observer setiap kali tab diklik
            // agar animasi bisa berjalan pada konten yang baru ditampilkan.
            observeVisibleContent();
          });
        });

        // --- BAGIAN 2: LOGIKA ANIMASI ANGKA ---

        const animateNumber = (element) => {
          const target = parseFloat(element.dataset.value);
          const format = element.dataset.format;
          const duration = 1500;
          let startTimestamp = null;

          const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min(
              (timestamp - startTimestamp) / duration,
              1
            );
            const current = progress * target;
            let formattedText =
              format === "currency"
                ? "Rp" + Math.floor(current).toLocaleString("id-ID")
                : Math.floor(current).toLocaleString("id-ID");
            element.innerText = formattedText;
            if (progress < 1) window.requestAnimationFrame(step);
          };
          window.requestAnimationFrame(step);
        };

        // --- BAGIAN 3: KONFIGURASI DAN PEMBUATAN GRAFIK (CHART) ---

        let renderedCharts = {}; // Objek untuk melacak chart yang sudah dirender

        const createChart = (canvasId, config) => {
          if (renderedCharts[canvasId]) return;
          const canvas = document.getElementById(canvasId);
          if (!canvas) return;
          new Chart(canvas.getContext("2d"), config);
          renderedCharts[canvasId] = true;
        };

        // Fungsi bantuan untuk format mata uang di sumbu grafik
        const formatAsShortCurrency = (value) => {
          if (value >= 1.0e9) return "Rp " + (value / 1.0e9).toFixed(2) + " M";
          if (value >= 1.0e6) return "Rp " + (value / 1.0e6).toFixed(1) + " Jt";
          if (value >= 1.0e3) return "Rp " + (value / 1.0e3).toFixed(1) + " Rb";
          return "Rp " + value;
        };

        // Data bersama untuk grafik
        const chartData = {
          years: ["2018", "2019", "2020", "2021", "2022"],
          colors: {
            peternakan: ["#4caf50", "#8dd18d", "#bce5bc"],
            perkebunan: ["#4caf50", "#8dd18d", "#bce5bc"],
            tanamanPangan: [
              "#ff6b35",
              "#4caf50",
              "#2e7d32",
              "#8dd18d",
              "#bce5bc",
            ],
            apbd: {
              pendapatan: ["#2e7d32", "#4caf50", "#8dd18d"],
              belanja: ["#ff6b35", "#ff8a5c", "#ffab8a", "#ffcba8", "#ffe8d6"],
            },
          },
        };

        // Pusat konfigurasi untuk SEMUA chart
        const chartConfigs = {
          // --- Chart dari skrip Anda sebelumnya ---
          peternakanChart: {
            type: "bar",
            data: {
              labels: chartData.years,
              datasets: [
                {
                  label: "Sapi",
                  data: [1235, 1236, 1240, 1240, 1240],
                  backgroundColor: chartData.colors.peternakan[0],
                },
                {
                  label: "Kambing",
                  data: [153, 155, 160, 160, 160],
                  backgroundColor: chartData.colors.peternakan[1],
                },
                {
                  label: "Ayam",
                  data: [1720, 1700, 1750, 1750, 1750],
                  backgroundColor: chartData.colors.peternakan[2],
                },
              ],
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { position: "top" } },
              scales: { y: { beginAtZero: true } },
            },
          },
          perkebunanChart: {
            type: "bar",
            data: {
              labels: chartData.years,
              datasets: [
                {
                  label: "Kelapa",
                  data: [2, 2, 2, 2, 2],
                  backgroundColor: chartData.colors.perkebunan[0],
                },
                {
                  label: "Karet",
                  data: [0, 0, 0, 0, 0],
                  backgroundColor: chartData.colors.perkebunan[1],
                },
                {
                  label: "Kopi",
                  data: [0, 0, 0, 0, 0],
                  backgroundColor: chartData.colors.perkebunan[2],
                },
              ],
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { position: "top" } },
              scales: { y: { beginAtZero: true } },
            },
          },
          tanamanPanganChart: {
            type: "line",
            data: {
              labels: chartData.years,
              datasets: [
                {
                  label: "Padi",
                  data: [118, 120, 120, 120, 120],
                  borderColor: chartData.colors.tanamanPangan[0],
                  tension: 0.1,
                },
                {
                  label: "Jagung",
                  data: [93, 96, 96, 96, 96],
                  borderColor: chartData.colors.tanamanPangan[1],
                  tension: 0.1,
                },
                {
                  label: "Kacang Tanah",
                  data: [5, 5, 5, 5, 5],
                  borderColor: chartData.colors.tanamanPangan[2],
                  tension: 0.1,
                },
                {
                  label: "Tomat",
                  data: [13, 15, 15, 15, 15],
                  borderColor: chartData.colors.tanamanPangan[3],
                  tension: 0.1,
                },
                {
                  label: "Cabe",
                  data: [24, 25, 25, 25, 25],
                  borderColor: chartData.colors.tanamanPangan[4],
                  tension: 0.1,
                },
              ],
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { position: "top" } },
              scales: { y: { beginAtZero: true } },
            },
          },
          pendidikanChart: {
            type: "bar",
            data: {
              labels: [
                ["Tidak/Belum", "Sekolah"],
                ["Belum Tamat", "SD/Sederajat"],
                ["Tamat", "SD/Sederajat"],
                "SLTP/Sederajat",
                "SLTA/Sederajat",
                "Diploma I/II",
                ["Diploma III/", "Sarjana Muda"],
                ["Diploma IV/", "Strata I"],
                "Strata II",
                "Strata III",
              ],
              datasets: [
                {
                  label: "Jumlah Penduduk",
                  data: [173, 201, 285, 140, 286, 22, 13, 26, 2, 0],
                  backgroundColor: "#ff6b35",
                  borderRadius: 5,
                },
              ],
            },
            options: {
              animation: { duration: 1200, easing: "easeInOutCubic" },
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { display: false } },
              scales: { y: { beginAtZero: true } },
            },
          },

          // === PENAMBAHAN KONFIGURASI CHART APBD DESA ===
          pendapatanDetailChart: {
            type: "bar",
            data: {
              labels: [
                "Pendapatan Asli Desa",
                "Pendapatan Transfer",
                "Pendapatan Lain-lain",
              ],
              datasets: [
                {
                  label: "Anggaran (Rp)",
                  data: [325310200, 2089649500, 0],
                  backgroundColor: ["#2e7d32", "#4caf50", "#8dd18d"],
                  borderRadius: 5,
                },
              ],
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { display: false } },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    callback: formatAsShortCurrency,
                  },
                },
              },
            },
          },
          belanjaDetailChart: {
            type: "bar",
            data: {
              // Label kembali menjadi 1 baris karena akan ditampilkan secara vertikal
              labels: [
                "Penyelenggaraan Pemerintahan Desa",
                "Pelaksanaan Pembangunan Desa",
                "Pembinaan Kemasyarakatan",
                "Pemberdayaan Masyarakat Desa",
                "Penanggulangan Bencana, Keadaan Darurat dan Mendesak",
              ],
              datasets: [
                {
                  label: "Anggaran (Rp)",
                  data: [
                    1123785756.34, 1187744000, 73627444, 218317000, 173093000,
                  ],
                  backgroundColor: [
                    "#ff6b35",
                    "#ff8a5c",
                    "#ffab8a",
                    "#ffcba8",
                    "#ffe8d6",
                  ],
                  borderRadius: 5,
                },
              ],
            },
            options: {
              indexAxis: "y", // <-- Kunci utama: Mengubah grafik menjadi horizontal
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { display: false },
              },
              scales: {
                // Skala X (horizontal) sekarang untuk nilai uang
                x: {
                  beginAtZero: true,
                  ticks: {
                    callback: formatAsShortCurrency,
                  },
                },
              },
            },
          },
        };

        // --- BAGIAN 4: LOGIKA ANIMASI SAAT SCROLL (OBSERVER) ---

        const observer = new IntersectionObserver(
          (entries, observerInstance) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                // Animasikan angka jika elemen memiliki kelas .animate-number
                if (entry.target.classList.contains("animate-number")) {
                  animateNumber(entry.target);
                }
                // Buat grafik jika elemen adalah canvas dengan ID yang ada di konfigurasi
                if (chartConfigs[entry.target.id]) {
                  createChart(entry.target.id, chartConfigs[entry.target.id]);
                }
                // Hentikan pengamatan setelah elemen dianimasikan
                observerInstance.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.3 }
        );

        const observeVisibleContent = () => {
          // Amati semua elemen yang perlu dianimasikan di dalam tab yang sedang aktif
          document
            .querySelectorAll(
              ".tab-content:not(.hidden) .animate-number, .tab-content:not(.hidden) canvas"
            )
            .forEach((el) => {
              observer.observe(el);
            });
        };

        // Jalankan observer pertama kali untuk konten yang aktif saat halaman dimuat
        observeVisibleContent();
      });
