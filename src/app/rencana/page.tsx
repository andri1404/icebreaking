"use client";

import Link from "next/link";
import { useRencana } from "@/hooks/useRencana";
import { useFavorit } from "@/hooks/useFavorit";
import { GAMES, getGame, durasiLabel, pesertaLabel } from "@/lib/games";
import TombolCetak from "@/components/TombolCetak";

export default function HalamanRencana() {
  const { rencana, hapus, pindah } = useRencana();
  const { favorit } = useFavorit();

  const totalMenit = rencana.reduce((t, i) => t + (getGame(i.id)?.durasiMenit ?? 0), 0);

  return (
    <div className="flex flex-col gap-10">
      <header>
        <h1 className="font-display text-3xl font-extrabold">Rencana Sesi</h1>
        <p className="mt-1 max-w-2xl text-[var(--muted)]">
          Susun urutan permainan untuk satu sesi pembelajaran atau pelatihan. Rencana
          tersimpan otomatis di perangkat Anda — tanpa akun.
        </p>
      </header>

      <section aria-label="Daftar rencana">
        {rencana.length === 0 ? (
          <p className="rounded-card border border-dashed p-8 text-center text-[var(--muted)]">
            Belum ada game dalam rencana. Tambahkan dari tombol “＋ Rencana” di{" "}
            <Link href="/games" className="underline">
              Daftar Game
            </Link>
            .
          </p>
        ) : (
          <>
            <p className="mb-3 font-bold">
              {rencana.length} game · ≈ {totalMenit} menit total
            </p>
            <ol className="flex flex-col gap-3">
              {rencana.map((item, i) => {
                const g = getGame(item.id);
                return (
                  <li
                    key={item.id}
                    className="print-card flex flex-wrap items-center gap-3 rounded-card border p-4 shadow-card"
                    style={{ background: "var(--card)", borderColor: "var(--border)" }}
                  >
                    <span className="font-display text-2xl font-extrabold text-sun-500">
                      {i + 1}.
                    </span>
                    <div className="min-w-40 flex-1">
                      <Link href={`/games/${item.id}`} className="font-display text-lg font-extrabold hover:text-sun-600">
                        {item.game}
                      </Link>
                      {g && (
                        <p className="text-sm text-[var(--muted)]">
                          {g.kategori} · ⏱ {durasiLabel(g)} · 👥 {pesertaLabel(g)}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-1 no-print">
                      <button
                        type="button"
                        onClick={() => pindah(i, -1)}
                        disabled={i === 0}
                        aria-label={`Naikkan ${item.game}`}
                        className="h-12 w-12 rounded-full bg-black/5 font-bold disabled:opacity-30 dark:bg-white/10"
                      >
                        ↑
                      </button>
                      <button
                        type="button"
                        onClick={() => pindah(i, 1)}
                        disabled={i === rencana.length - 1}
                        aria-label={`Turunkan ${item.game}`}
                        className="h-12 w-12 rounded-full bg-black/5 font-bold disabled:opacity-30 dark:bg-white/10"
                      >
                        ↓
                      </button>
                      <button
                        type="button"
                        onClick={() => hapus(item.id)}
                        aria-label={`Hapus ${item.game} dari rencana`}
                        className="h-12 w-12 rounded-full bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300"
                      >
                        🗑
                      </button>
                    </div>
                  </li>
                );
              })}
            </ol>
            <div className="mt-4 flex flex-wrap gap-3">
              <TombolCetak label="🖨 Cetak Rencana Sesi (PDF)" />
            </div>
          </>
        )}
      </section>

      <section aria-labelledby="judul-favorit">
        <h2 id="judul-favorit" className="mb-3 font-display text-2xl font-extrabold">
          ⭐ Favorit Saya
        </h2>
        {favorit.length === 0 ? (
          <p className="text-[var(--muted)]">
            Belum ada favorit. Klik ikon bintang pada kartu game untuk menyimpannya di
            sini.
          </p>
        ) : (
          <ul className="flex flex-wrap gap-2">
            {favorit.map((id) => {
              const g = GAMES.find((x) => x.id === id);
              return g ? (
                <li key={id}>
                  <Link
                    href={`/games/${id}`}
                    className="inline-flex min-h-11 items-center rounded-full bg-sun-100 px-4 font-bold text-sun-700 hover:bg-sun-200 dark:bg-sun-400/20 dark:text-sun-300"
                  >
                    {g.nama}
                  </Link>
                </li>
              ) : null;
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
