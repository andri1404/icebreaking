"use client";

import { useState } from "react";
import { sekunder, netral } from "@/components/UI";
import { usePengaturan } from "@/lib/pengaturan";
import { useLocalStorage } from "@/lib/storage";

const WARNA_TIM = [
  "bg-sun-400 text-slate-900",
  "bg-sky2-500 text-white",
  "bg-leaf-500 text-white",
  "bg-orange-400 text-slate-900",
  "bg-violet-500 text-white",
  "bg-rose-400 text-white",
  "bg-cyan-500 text-white",
  "bg-lime-500 text-slate-900",
];

export default function PengacakKelompok() {
  const [teks, setTeks] = useLocalStorage("mainice:nama-kelompok", "Ani\nBudi\nCitra\nDimas\nEka\nFajar\nGita\nHana");
  const [jumlah, setJumlah] = useState(4);
  const [hasil, setHasil] = useState<string[][]>([]);
  const { mainkan } = usePengaturan();

  const nama = teks
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  const acak = () => {
    const urut = [...nama].sort(() => Math.random() - 0.5);
    const tim: string[][] = Array.from({ length: jumlah }, () => []);
    urut.forEach((n, i) => tim[i % jumlah].push(n));
    setHasil(tim);
    mainkan("menang");
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="flex flex-col gap-3">
        <label htmlFor="nama-kelompok" className="font-bold">
          Daftar Nama Peserta (satu per baris)
        </label>
        <textarea
          id="nama-kelompok"
          rows={12}
          value={teks}
          onChange={(e) => setTeks(e.target.value)}
          className="rounded-card border p-4 font-mono text-base"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}
        />
        <div className="flex items-center gap-3">
          <label htmlFor="jumlah" className="font-bold">
            Jumlah kelompok:
          </label>
          <input
            id="jumlah"
            type="number"
            min={2}
            max={12}
            value={jumlah}
            onChange={(e) => setJumlah(Math.max(2, Math.min(12, Number(e.target.value) || 2)))}
            className="h-12 w-20 rounded-xl border px-3 text-lg font-bold"
            style={{ borderColor: "var(--border)" }}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={acak} className={sekunder} disabled={nama.length < jumlah}>
            🎲 Bagi Kelompok
          </button>
          {hasil.length > 0 && (
            <button
              type="button"
              onClick={() => setHasil([])}
              className={netral}
              style={{ borderColor: "var(--border)" }}
            >
              Bersihkan
            </button>
          )}
        </div>
        <p className="text-sm text-[var(--muted)]">
          {nama.length} nama terdeteksi. Daftar tersimpan otomatis di perangkat Anda.
        </p>
      </div>

      <div aria-live="polite" className="grid content-start gap-3">
        {hasil.map((tim, i) => (
          <div
            key={i}
            className={`${WARNA_TIM[i % WARNA_TIM.length]} animate-pop-in rounded-card p-4 shadow-card`}
          >
            <p className="font-display text-lg font-extrabold">Kelompok {i + 1}</p>
            <p className="font-semibold">{tim.join(", ")}</p>
          </div>
        ))}
        {hasil.length === 0 && (
          <p className="text-[var(--muted)]">
            Hasil pembagian kelompok akan tampil di sini setelah tombol “Bagi Kelompok”
            ditekan.
          </p>
        )}
      </div>
    </div>
  );
}
