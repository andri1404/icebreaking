"use client";

import { useCallback, useEffect, useState } from "react";
import { kartu } from "@/components/UI";
import { usePengaturan } from "@/lib/pengaturan";

const EMOJI = ["🍕", "🐝", "⚽", "🌈", "🎸", "🚀", "🐬", "🌵"];

interface Kartu {
  id: number;
  isi: string;
  ketemu: boolean;
}

function susun(): Kartu[] {
  return [...EMOJI, ...EMOJI]
    .map((isi, i) => ({ isi, id: i }))
    .sort(() => Math.random() - 0.5)
    .map((k, i) => ({ ...k, id: i, ketemu: false }));
}

export default function KartuMemori() {
  const [deck, setDeck] = useState<Kartu[]>([]);
  const [terbuka, setTerbuka] = useState<number[]>([]);
  const [langkah, setLangkah] = useState(0);
  const [menang, setMenang] = useState(false);
  const { mainkan, presentasi } = usePengaturan();

  const mulai = useCallback(() => {
    setDeck(susun());
    setTerbuka([]);
    setLangkah(0);
    setMenang(false);
  }, []);

  useEffect(() => {
    mulai();
  }, [mulai]);

  const balik = (i: number) => {
    if (deck[i].ketemu || terbuka.includes(i) || terbuka.length === 2) return;
    mainkan("klik");
    const baru = [...terbuka, i];
    setTerbuka(baru);
    setLangkah((v) => v + 1);

    if (baru.length === 2) {
      const [a, b] = baru;
      if (deck[a].isi === deck[b].isi) {
        setTimeout(() => {
          setDeck((d) =>
            d.map((k, j) => (j === a || j === b ? { ...k, ketemu: true } : k))
          );
          setTerbuka([]);
          mainkan("benar");
        }, 400);
      } else {
        setTimeout(() => {
          setTerbuka([]);
          mainkan("salah");
        }, 800);
      }
    }
  };

  useEffect(() => {
    if (deck.length > 0 && deck.every((k) => k.ketemu)) {
      setMenang(true);
      mainkan("menang");
    }
  }, [deck, mainkan]);

  const ukuran = presentasi ? "text-5xl sm:text-6xl" : "text-3xl sm:text-4xl";

  return (
    <div className="mx-auto max-w-2xl">
      <p className="mb-4 flex justify-between font-bold">
        <span>👣 Langkah: {langkah}</span>
        <button type="button" onClick={mulai} className="underline">
          Mulai Ulang
        </button>
      </p>

      {menang && (
        <div className={`${kartu} mb-4 text-center`} style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <p className="text-5xl">🏅</p>
          <p className="mt-2 font-display text-2xl font-extrabold">
            Semua pasangan ketemu dalam {langkah} langkah!
          </p>
        </div>
      )}

      <div className="grid grid-cols-4 gap-3 sm:gap-4">
        {deck.map((k, i) => {
          const tampil = k.ketemu || terbuka.includes(i);
          return (
            <button
              key={k.id}
              type="button"
              onClick={() => balik(i)}
              aria-label={tampil ? `Kartu ${k.isi}` : "Kartu tertutup"}
              aria-pressed={tampil}
              className={`flex aspect-square items-center justify-center rounded-2xl border-4 font-bold transition active:scale-95 ${ukuran} ${
                tampil
                  ? "border-sun-400 bg-sun-100 dark:bg-sun-400/20"
                  : "border-sky2-300 bg-sky2-500 hover:bg-sky2-400"
              }`}
            >
              {tampil ? k.isi : ""}
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-center text-sm text-[var(--muted)]">
        Temukan 8 pasangan gambar. Latih ingatan visual — cocok untuk pembuka kelas atau
        jeda. {presentasi && "Mode presentasi aktif: kartu lebih besar untuk proyektor."}
      </p>
    </div>
  );
}
