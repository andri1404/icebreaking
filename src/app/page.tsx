import Link from "next/link";
import GameCard from "@/components/GameCard";
import TombolAcak from "@/components/TombolAcak";
import { GAMES, KATEGORI, kategoriWarna } from "@/lib/games";
import { TOOLS } from "@/lib/tools";
import { besar } from "@/components/UI";

export default function Beranda() {
  const populer = GAMES.filter((g) => g.populer).slice(0, 4);
  const acakTools = TOOLS.slice(0, 4);

  return (
    <div className="flex flex-col gap-14">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-card bg-gradient-to-br from-sun-300 via-sun-200 to-leaf-200 p-8 text-slate-900 shadow-pop sm:p-12 dark:from-sun-600 dark:via-sun-500/70 dark:to-leaf-700 dark:text-slate-50">
        <p className="mb-2 inline-block rounded-full bg-white/70 px-4 py-1 text-sm font-bold text-sun-700 dark:bg-black/30 dark:text-sun-200">
          Gratis · Tanpa login · Bahasa Indonesia
        </p>
        <h1 className="max-w-2xl font-display text-4xl font-extrabold leading-tight sm:text-5xl">
          Bikin kelas hidup dengan ice breaking &amp; aktivitas belajar.
        </h1>
        <p className="mt-3 max-w-xl text-lg font-semibold">
          30+ permainan siap pakai dan 7 alat interaktif untuk guru, fasilitator, trainer,
          dan peserta. Ringan, responsif, dan siap diproyeksikan.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/games" className={`${besar} bg-sky2-600 text-white hover:bg-sky2-700`}>
            🚀 Mulai Main
          </Link>
          <TombolAcak />
        </div>
      </section>

      {/* Kategori */}
      <section aria-labelledby="judul-kategori">
        <div className="mb-4 flex items-baseline justify-between gap-4">
          <h2 id="judul-kategori" className="font-display text-2xl font-extrabold">
            Kategori Game
          </h2>
          <Link href="/games" className="font-bold text-sky2-600 hover:underline">
            Lihat semua →
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {KATEGORI.map((k) => (
            <Link
              key={k}
              href={`/games?kategori=${encodeURIComponent(k)}`}
              className="flex min-h-14 items-center justify-between rounded-card border px-5 py-4 font-bold shadow-card transition hover:-translate-y-0.5"
              style={{ background: "var(--card)", borderColor: "var(--border)" }}
            >
              <span className={`rounded-full px-3 py-1 text-sm ${kategoriWarna(k)}`}>{k}</span>
              <span className="text-sm text-[var(--muted)]">
                {GAMES.filter((g) => g.kategori === k).length} game
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Game populer */}
      <section aria-labelledby="judul-populer">
        <div className="mb-4 flex items-baseline justify-between gap-4">
          <h2 id="judul-populer" className="font-display text-2xl font-extrabold">
            🔥 Game Populer
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {populer.map((g) => (
            <GameCard key={g.id} game={g} />
          ))}
        </div>
      </section>

      {/* Alat interaktif */}
      <section aria-labelledby="judul-interaktif">
        <div className="mb-4 flex items-baseline justify-between gap-4">
          <h2 id="judul-interaktif" className="font-display text-2xl font-extrabold">
            🎮 Main Langsung di Web
          </h2>
          <Link href="/interaktif" className="font-bold text-sky2-600 hover:underline">
            Semua alat →
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {acakTools.map((t) => (
            <Link
              key={t.id}
              href={`/interaktif/${t.id}`}
              className="flex min-h-24 flex-col gap-1 rounded-card border p-4 shadow-card transition hover:-translate-y-0.5"
              style={{ background: "var(--card)", borderColor: "var(--border)" }}
            >
              <span className="text-3xl" aria-hidden>
                {t.ikon}
              </span>
              <span className="font-display font-extrabold">{t.nama}</span>
              <span className="text-sm text-[var(--muted)]">{t.deskripsi}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
