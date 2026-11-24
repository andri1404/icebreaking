"use client";

import Link from "next/link";
import { usePengaturan } from "@/lib/pengaturan";
import { useFavorit } from "@/hooks/useFavorit";
import { useRencana } from "@/hooks/useRencana";
import { durasiLabel, kategoriWarna, pesertaLabel } from "@/lib/games";
import type { Game } from "@/lib/types";

export default function GameCard({ game }: { game: Game }) {
  const { isFavorit, toggle } = useFavorit();
  const { tambah, adaDiRencana } = useRencana();
  const { mainkan } = usePengaturan();
  const fav = isFavorit(game.id);

  return (
    <article
      className="print-card flex flex-col rounded-card border p-4 shadow-card transition hover:-translate-y-0.5"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <span
          className={`rounded-full px-3 py-1 text-xs font-bold ${kategoriWarna(game.kategori)}`}
        >
          {game.kategori}
        </span>
        <button
          type="button"
          aria-label={fav ? "Hapus dari favorit" : "Tambah ke favorit"}
          aria-pressed={fav}
          onClick={() => {
            toggle(game.id);
            mainkan("klik");
          }}
          className="h-11 w-11 shrink-0 rounded-full text-xl transition active:scale-90"
        >
          {fav ? "⭐" : "☆"}
        </button>
      </div>

      <h3 className="font-display text-lg font-extrabold leading-tight">
        <Link href={`/games/${game.id}`} className="hover:text-sun-600">
          {game.nama}
        </Link>
      </h3>
      <p className="mt-1 flex-1 text-sm text-[var(--muted)]">{game.deskripsi}</p>

      <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs font-semibold text-[var(--muted)]">
        <span>⏱ {durasiLabel(game)}</span>
        <span>👥 {pesertaLabel(game)}</span>
        <span>{game.perluAlat ? "🧰 butuh alat" : "🚫 tanpa alat"}</span>
      </p>

      <div className="mt-3 flex gap-2 no-print">
        <Link
          href={`/games/${game.id}`}
          className="inline-flex h-11 flex-1 items-center justify-center rounded-full bg-sky2-500 px-4 text-sm font-bold text-white transition hover:bg-sky2-600 active:scale-95"
        >
          Lihat Detail
        </Link>
        <button
          type="button"
          onClick={() => {
            tambah(game.id, game.nama);
            mainkan("benar");
          }}
          className="h-11 rounded-full border px-4 text-sm font-bold transition hover:bg-leaf-50 dark:hover:bg-leaf-500/20"
          style={{ borderColor: "var(--border)" }}
          aria-label={`Tambah ${game.nama} ke rencana sesi`}
        >
          {adaDiRencana(game.id) ? "✅ Direncanakan" : "＋ Rencana"}
        </button>
      </div>
    </article>
  );
}
