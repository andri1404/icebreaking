import Link from "next/link";
import type { Metadata } from "next";
import { GAMES, KATEGORI, kategoriWarna } from "@/lib/games";
import GameCard from "@/components/GameCard";
import { besar } from "@/components/UI";

export const metadata: Metadata = {
  title: "Perpustakaan Ice Breaking",
  description:
    "30 permainan ice breaking non-digital untuk kelas dan pelatihan: perkenalan, energizer, fokus, kerja sama tim, refleksi, dan penutup.",
};

export default function Perpustakaan() {
  return (
    <div className="flex flex-col gap-12">
      <header>
        <h1 className="font-display text-3xl font-extrabold">
          Perpustakaan Ice Breaking
        </h1>
        <p className="mt-1 max-w-2xl text-[var(--muted)]">
          {GAMES.length} permainan non-digital yang teruji di kelas dan lokakarya — pilih
          berdasarkan kebutuhan sesi Anda, atau cetak semuanya sebagai panduan luring.
        </p>
        <Link href="/games" className={`${besar} mt-4 bg-sky2-600 text-white hover:bg-sky2-700`}>
          🔍 Cari dengan filter
        </Link>
      </header>

      {KATEGORI.map((k) => {
        const daftar = GAMES.filter((g) => g.kategori === k);
        return (
          <section key={k} aria-labelledby={`kat-${k}`} className="scroll-mt-24">
            <h2 id={`kat-${k}`} className="mb-4 flex items-center gap-3">
              <span className={`rounded-full px-4 py-1 font-display text-xl font-extrabold ${kategoriWarna(k)}`}>
                {k}
              </span>
              <span className="text-sm font-bold text-[var(--muted)]">
                {daftar.length} permainan
              </span>
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {daftar.map((g) => (
                <GameCard key={g.id} game={g} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
