import { Suspense } from "react";
import type { Metadata } from "next";
import DaftarGame from "@/components/DaftarGame";

export const metadata: Metadata = {
  title: "Daftar Game",
  description:
    "Cari dan filter permainan ice breaking berdasarkan kategori, durasi, jumlah peserta, jenjang, dan kebutuhan alat.",
};

export default function HalamanGames() {
  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="font-display text-3xl font-extrabold">Daftar Game</h1>
        <p className="mt-1 text-[var(--muted)]">
          Semua permainan non-digital di pustaka MainIce — bisa dimainkan di kelas,
          lapangan, atau ruang pelatihan.
        </p>
      </header>
      <Suspense fallback={<p>Memuat daftar…</p>}>
        <DaftarGame />
      </Suspense>
    </div>
  );
}
