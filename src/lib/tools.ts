import type { Tool } from "./types";

// Registri alat interaktif; tambahkan alat baru di sini + folder komponennya
export const TOOLS: Tool[] = [
  {
    id: "roda",
    nama: "Roda Putar Nama",
    deskripsi: "Acak peserta atau kelompok dengan roda putar yang seru.",
    ikon: "🎡",
    warna: "sun",
  },
  {
    id: "kuis",
    nama: "Kuis Cepat",
    deskripsi: "Pilihan ganda dengan timer dan skor, cocok untuk review materi.",
    ikon: "❓",
    warna: "sky2",
  },
  {
    id: "tebak",
    nama: "Tebak Gambar/Kata",
    deskripsi: "Tebak kata dari gambar emoji dan petunjuk, diberi batas waktu.",
    ikon: "🖼",
    warna: "leaf",
  },
  {
    id: "prompt",
    nama: "Truth or Dare & Pemantik",
    deskripsi: "Kartu pertanyaan acak: jujur, tantangan, atau pertanyaan pemantik.",
    ikon: "💬",
    warna: "sun",
  },
  {
    id: "kelompok",
    nama: "Pengacak Kelompok",
    deskripsi: "Masukkan daftar nama, bagi kelompok secara acak dan adil.",
    ikon: "👥",
    warna: "sky2",
  },
  {
    id: "timer",
    nama: "Timer & Papan Skor",
    deskripsi: "Penghitung waktu besar plus papan skor tim untuk kompetisi.",
    ikon: "⏱",
    warna: "leaf",
  },
  {
    id: "memori",
    nama: "Kartu Memori",
    deskripsi: "Memory match gambar untuk mengasah ingat visual peserta.",
    ikon: "🃏",
    warna: "sun",
  },
];

export function getTool(id: string) {
  return TOOLS.find((t) => t.id === id);
}
