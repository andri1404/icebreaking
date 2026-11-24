"use client";

import { useEffect, useRef, useState } from "react";
import { useFavorit } from "@/hooks/useFavorit";
import { useRencana } from "@/hooks/useRencana";
import { usePengaturan } from "@/lib/pengaturan";
import { besar } from "@/components/UI";
import { durasiLabel, pesertaLabel } from "@/lib/games";
import type { Game } from "@/lib/types";

// Presentasi selangkah demi selangkah untuk proyektor
function LayarPenuh({ game, tutup }: { game: Game; tutup: () => void }) {
  const [langkah, setLangkah] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { mainkan } = usePengaturan();
  const total = game.langkah.length;

  useEffect(() => {
    const f = () => {
      if (!document.fullscreenElement) tutup();
    };
    document.addEventListener("fullscreenchange", f);
    ref.current?.requestFullscreen?.().catch(() => {});
    return () => document.removeEventListener("fullscreenchange", f);
  }, [tutup]);

  useEffect(() => {
    const t = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && langkah < total - 1) setLangkah((v) => v + 1);
      if (e.key === "ArrowLeft" && langkah > 0) setLangkah((v) => v - 1);
      if (e.key === "Escape") tutup();
    };
    window.addEventListener("keydown", t);
    return () => window.removeEventListener("keydown", t);
  }, [langkah, total, tutup]);

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-50 flex flex-col bg-slate-900 p-6 text-white sm:p-10"
      role="dialog"
      aria-label={`Mode layar penuh: ${game.nama}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xl font-bold text-sun-300">{game.kategori}</p>
          <h2 className="font-display text-4xl font-extrabold sm:text-6xl">{game.nama}</h2>
          <p className="mt-1 text-lg text-slate-300">
            ⏱ {durasiLabel(game)} · 👥 {pesertaLabel(game)} ·{" "}
            {game.perluAlat ? "butuh alat sederhana" : "tanpa alat"}
          </p>
        </div>
        <button
          type="button"
          onClick={tutup}
          className="h-14 min-w-14 rounded-full bg-white/10 px-5 text-lg font-bold hover:bg-white/20"
        >
          ✕ Tutup
        </button>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <p className="text-3xl font-bold text-leaf-300">
          Langkah {langkah + 1} / {total}
        </p>
        <p className="mt-6 max-w-4xl font-display text-4xl font-extrabold leading-snug sm:text-6xl">
          {game.langkah[langkah]}
        </p>
      </div>

      <div className="flex items-center justify-center gap-4">
        <button
          type="button"
          disabled={langkah === 0}
          onClick={() => {
            setLangkah((v) => v - 1);
            mainkan("klik");
          }}
          className={`${besar} bg-white/10 hover:bg-white/20 disabled:opacity-30`}
        >
          ← Sebelumnya
        </button>
        <button
          type="button"
          disabled={langkah === total - 1}
          onClick={() => {
            setLangkah((v) => v + 1);
            mainkan("klik");
          }}
          className={`${besar} bg-sun-400 text-slate-900 hover:bg-sun-500 disabled:opacity-30`}
        >
          Selanjutnya →
        </button>
      </div>

      <div className="mt-4 flex justify-center gap-1" aria-hidden>
        {game.langkah.map((_, i) => (
          <span
            key={i}
            className={`h-3 rounded-full transition-all ${
              i === langkah ? "w-8 bg-sun-400" : "w-3 bg-white/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function DetailAksi({ game }: { game: Game }) {
  const { isFavorit, toggle } = useFavorit();
  const { tambah, adaDiRencana } = useRencana();
  const [layarPenuh, setLayarPenuh] = useState(false);
  const { mainkan } = usePengaturan();
  const fav = isFavorit(game.id);

  return (
    <>
      <div className="flex flex-wrap gap-2 no-print">
        <button
          type="button"
          onClick={() => {
            toggle(game.id);
            mainkan("klik");
          }}
          aria-pressed={fav}
          className="inline-flex h-12 items-center gap-2 rounded-full border px-5 font-bold"
          style={{ borderColor: "var(--border)" }}
        >
          {fav ? "⭐ Favorit" : "☆ Favoritkan"}
        </button>
        <button
          type="button"
          onClick={() => {
            tambah(game.id, game.nama);
            mainkan("benar");
          }}
          className="inline-flex h-12 items-center gap-2 rounded-full border px-5 font-bold"
          style={{ borderColor: "var(--border)" }}
        >
          {adaDiRencana(game.id) ? "✅ Di rencana sesi" : "＋ Rencana Sesi"}
        </button>
        <button
          type="button"
          onClick={() => {
            setLayarPenuh(true);
            mainkan("klik");
          }}
          className="inline-flex h-12 items-center gap-2 rounded-full bg-sky2-600 px-5 font-bold text-white hover:bg-sky2-700"
        >
          📺 Mode Layar Penuh
        </button>
      </div>

      {layarPenuh && (
        <LayarPenuh game={game} tutup={() => setLayarPenuh(false)} />
      )}
    </>
  );
}
