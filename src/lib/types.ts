// Skema data game — tambahkan game baru di src/data/games.json
export type Kategori =
  | "Perkenalan"
  | "Energizer"
  | "Fokus & Konsentrasi"
  | "Kerja Sama Tim"
  | "Refleksi"
  | "Penutup";

export interface Game {
  id: string;
  nama: string;
  kategori: Kategori;
  deskripsi: string;
  durasiMenit: number; // perkiraan durasi rata-rata
  pesertaMin: number;
  pesertaMax: number; // gunakan 999 untuk tanpa batas
  usia: string; // mis. "SD-SMP", "Umum"
  perluAlat: boolean;
  alat: string[];
  tujuan: string[];
  langkah: string[];
  variasi: string[];
  tips: string[];
  populer?: boolean;
  tags: string[];
}

// Alat interaktif yang dimainkan langsung di web
export interface Tool {
  id: string;
  nama: string;
  deskripsi: string;
  ikon: string; // emoji agar ringan tanpa aset gambar
  warna: "sun" | "sky2" | "leaf";
}
