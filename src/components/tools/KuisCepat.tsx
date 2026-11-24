"use client";

import { useEffect, useState } from "react";
import { primer, sekunder, kartu } from "@/components/UI";
import { usePengaturan } from "@/lib/pengaturan";

interface Soal {
  pertanyaan: string;
  opsi: string[];
  jawaban: number;
  penjelasan: string;
}

const WAKTU_SOAL = 20;

export default function KuisCepat({ soal }: { soal: Soal[] }) {
  const [indeks, setIndeks] = useState(0);
  const [skor, setSkor] = useState(0);
  const [pilih, setPilih] = useState<number | null>(null);
  const [sisa, setSisa] = useState(WAKTU_SOAL);
  const [selesai, setSelesai] = useState(false);
  const { mainkan } = usePengaturan();
  const s = soal[indeks];

  useEffect(() => {
    if (pilih !== null || selesai) return;
    if (sisa <= 0) {
      setPilih(-1);
      mainkan("salah");
      return;
    }
    const t = setTimeout(() => setSisa((v) => v - 1), 1000);
    return () => clearTimeout(t);
  }, [sisa, pilih, selesai, mainkan]);

  const jawab = (i: number) => {
    if (pilih !== null) return;
    setPilih(i);
    const benar = i === s.jawaban;
    if (benar) {
      setSkor((v) => v + 1 + Math.floor(sisa / 10));
      mainkan("benar");
    } else {
      mainkan("salah");
    }
  };

  const lanjut = () => {
    if (indeks + 1 >= soal.length) {
      setSelesai(true);
      mainkan("menang");
    } else {
      setIndeks((v) => v + 1);
      setPilih(null);
      setSisa(WAKTU_SOAL);
    }
  };

  const ulang = () => {
    setIndeks(0);
    setSkor(0);
    setPilih(null);
    setSisa(WAKTU_SOAL);
    setSelesai(false);
  };

  if (selesai) {
    return (
      <div className={`${kartu} mx-auto max-w-xl text-center`} style={{ background: "var(--card)", borderColor: "var(--border)" }}>
        <p className="text-6xl">🏆</p>
        <h3 className="mt-2 font-display text-3xl font-extrabold">Kuis Selesai!</h3>
        <p className="mt-2 text-xl">
          Skor akhir: <strong>{skor}</strong> dari maksimal {soal.length * 3}
        </p>
        <p className="mt-1 text-[var(--muted)]">
          {skor >= soal.length * 2
            ? "Luar biasa! Kelas ini siap lanjut."
            : "Bagus! Ulangi kuis untuk memperkuat ingatan."}
        </p>
        <button type="button" onClick={ulang} className={`${primer} mt-6`}>
          🔄 Main Lagi
        </button>
      </div>
    );
  }

  const persen = (sisa / WAKTU_SOAL) * 100;

  return (
    <div className="mx-auto max-w-2xl">
      {/* Bilah progres */}
      <div className="mb-2 h-3 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
        <div
          className="h-full rounded-full bg-sky2-500 transition-all"
          style={{ width: `${persen}%` }}
          aria-hidden
        />
      </div>
      <p className="mb-4 flex justify-between text-sm font-bold text-[var(--muted)]">
        <span>
          Soal {indeks + 1}/{soal.length}
        </span>
        <span>
          ⏱ {sisa} dtk · ⭐ {skor}
        </span>
      </p>

      <div className={`${kartu}`} style={{ background: "var(--card)", borderColor: "var(--border)" }}>
        <h3 className="font-display text-xl font-extrabold sm:text-2xl">{s.pertanyaan}</h3>
        <div className="mt-4 grid gap-3">
          {s.opsi.map((o, i) => {
            let gaya = "border";
            if (pilih !== null) {
              if (i === s.jawaban) gaya = "bg-leaf-500 text-white border-leaf-500";
              else if (i === pilih) gaya = "bg-red-500 text-white border-red-500";
            }
            return (
              <button
                key={i}
                type="button"
                onClick={() => jawab(i)}
                disabled={pilih !== null}
                className={`flex min-h-14 items-center rounded-2xl border px-5 py-3 text-left text-lg font-bold transition active:scale-[0.98] ${gaya}`}
                style={pilih === null ? { borderColor: "var(--border)" } : undefined}
              >
                <span className="mr-3 opacity-60">{String.fromCharCode(65 + i)}.</span>
                {o}
              </button>
            );
          })}
        </div>

        {pilih !== null && (
          <div className="mt-4 animate-pop-in rounded-2xl bg-black/5 p-4 dark:bg-white/10">
            <p className="font-bold">
              {pilih === s.jawaban
                ? "✅ Benar!"
                : pilih === -1
                  ? "⌛ Waktu habis!"
                  : "❌ Belum tepat."}
            </p>
            <p className="mt-1 text-[var(--muted)]">{s.penjelasan}</p>
            <button type="button" onClick={lanjut} className={`${sekunder} mt-4`}>
              {indeks + 1 >= soal.length ? "Lihat Hasil 🏁" : "Soal Berikutnya →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
