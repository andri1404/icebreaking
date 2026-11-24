# MainIce — Media Pembelajaran Interaktif 🎲

Kumpulan permainan ice breaking dan aktivitas belajar berbahasa Indonesia untuk guru,
fasilitator, trainer, dan peserta. Ringan, responsif (mobile & proyektor), tanpa login,
dan tanpa database — siap deploy ke Vercel.

## Fitur Utama

- **Perpustakaan 30 permainan non-digital** dalam 6 kategori: Perkenalan, Energizer,
  Fokus & Konsentrasi, Kerja Sama Tim, Refleksi, Penutup
- **7 alat interaktif yang dimainkan langsung di web**: Roda Putar Nama, Kuis Cepat,
  Tebak Gambar/Kata, Truth or Dare/Pertanyaan Pemantik, Pengacak Kelompok, Timer & Papan
  Skor, Kartu Memori
- **Filter lengkap** di Daftar Game: kategori, durasi, jumlah peserta, usia/jenjang,
  butuh alat atau tidak + pencarian teks
- **Mode Layar Penuh/Presentasi**: langkah permainan tampil besar untuk proyektor,
  navigasi dengan panah keyboard
- **Favorit & Rencana Sesi**: susun urutan game, tersimpan di `localStorage` (tanpa akun)
- **Cetak/Unduh PDF**: halaman memakai gaya cetak khusus — dari dialog cetak browser
  pilih "Simpan sebagai PDF"
- **Mode gelap/terang**, efek suara & animasi yang bisa dimatikan dari header
- **Aksesibel**: target sentuh ≥ 44px, fokus keyboard jelas, hormat
  `prefers-reduced-motion`

## Menjalankan Secara Lokal

```bash
npm install
npm run dev
```

Buka http://localhost:3000

## Deploy ke Vercel

1. Dorong repo ini ke GitHub.
2. Di [vercel.com](https://vercel.com), klik **New Project** dan impor repo tersebut.
3. Vercel mendeteksi Next.js otomatis — tidak perlu konfigurasi tambahan.
4. Alternatif CLI: `npx vercel --prod`

## Struktur Proyek

```
src/
├── app/                  # Halaman (Next.js App Router)
│   ├── page.tsx          # Beranda
│   ├── games/            # Daftar game + detail (/games/[id])
│   ├── interaktif/       # Alat interaktif (/interaktif/[tool])
│   ├── perpustakaan/     # Pustaka ice breaking per kategori
│   ├── rencana/          # Rencana sesi & favorit
│   └── tentang/          # Panduan penggunaan
├── components/
│   ├── tools/            # Komponen 7 alat interaktif
│   ├── GameCard.tsx      # Kartu game
│   ├── DaftarGame.tsx    # Filter + pencarian
│   └── ...
├── data/                 # SEMUA DATA di file JSON (mudah ditambah)
│   ├── games.json        # 30 permainan ice breaking
│   ├── quiz.json         # Soal kuis cepat
│   ├── tebak.json        # Kartu tebak gambar/kata
│   └── prompt.json       # Truth/Dare/pertanyaan pemantik
├── hooks/                # Favorit & rencana sesi
└── lib/                  # Tipe, helper data, pengaturan (tema/suara/animasi)
```

## Menambah Game Baru (cukup 1 file JSON)

Semua permainan ada di `src/data/games.json`. Cara menambah:

1. Buka file tersebut, salin satu objek game yang sudah ada sebagai contoh.
2. Isi field berikut:

```json
{
  "id": "nama-unik-tanpa-spasi",
  "nama": "Nama Permainan",
  "kategori": "Energizer",
  "deskripsi": "Satu-dua kalimat deskripsi.",
  "durasiMenit": 10,
  "pesertaMin": 5,
  "pesertaMax": 30,
  "usia": "SD-SMP",
  "perluAlat": false,
  "alat": [],
  "tujuan": ["Tujuan 1", "Tujuan 2"],
  "langkah": ["Langkah 1", "Langkah 2"],
  "variasi": ["Variasi 1"],
  "tips": ["Tip fasilitator 1"],
  "populer": false,
  "tags": ["indoor", "tanpa alat"]
}
```

Catatan:

- `kategori` harus salah satu dari: `Perkenalan`, `Energizer`, `Fokus & Konsentrasi`,
  `Kerja Sama Tim`, `Refleksi`, `Penutup`.
- `pesertaMax` isi `999` jika tanpa batas jumlah peserta.
- `populer: true` menampilkan game di bagian "Game Populer" beranda.
- Simpan file — halaman Daftar Game, Perpustakaan, dan tombol Acak Game otomatis
  membaca data terbaru. Tidak perlu menyentuh kode sama sekali.

Mengubah soal kuis, kartu tebak, atau prompt dilakukan di `src/data/quiz.json`,
`src/data/tebak.json`, dan `src/data/prompt.json`.

---

Dibuat untuk mendukung pendidik Indonesia. Kontribusi game baru sangat welcome — cukup
tambahkan entri JSON dan buat pull request.
