"use client";

import { useRef, useState } from "react";
import { primer, sekunder, netral, kartu } from "@/components/UI";
import { usePengaturan } from "@/lib/pengaturan";
import { useLocalStorage } from "@/lib/storage";

const WARNA = ["#fbb724", "#36aaf5", "#47a748", "#e0533d", "#8a5cd6", "#0ea5b7"];

export default function RodaPutar() {
  const [teks, setTeks] = useLocalStorage("mainice:roda-nama", "Ani\nBudi\nCitra\nDimas\nEka");
  const [daftar, setDaftar] = useState<string[]>([]);
  const [pemenang, setPemenang] = useState<string | null>(null);
  const [berputar, setBerputar] = useState(false);
  const [rot, setRot] = useState(0);
  const audioRef = useRef<number>(0);
  const { mainkan } = usePengaturan();

  const nama = teks
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  const buatIrisan = (n: number) => {
    const hasil: React.ReactNode[] = [];
    const total = n > 0 ? n : 1;
    for (let i = 0; i < total; i++) {
      const a0 = (i / total) * 360;
      const a1 = ((i + 1) / total) * 360;
      const x0 = 50 + 46 * Math.cos((a0 * Math.PI) / 180);
      const y0 = 50 + 46 * Math.sin((a0 * Math.PI) / 180);
      const x1 = 50 + 46 * Math.cos((a1 * Math.PI) / 180);
      const y1 = 50 + 46 * Math.sin((a1 * Math.PI) / 180);
      hasil.push(
        <path
          key={i}
          d={`M50,50 L${x0},${y0} A46,46 0 0,1 ${x1},${y1} Z`}
          fill={WARNA[i % WARNA.length]}
          stroke="#ffffff"
          strokeWidth="1"
        />
      );
    }
    return hasil;
  };

  const putar = () => {
    if (nama.length < 2 || berputar) return;
    setDaftar(nama);
    setPemenang(null);
    setBerputar(true);
    const pilih = Math.floor(Math.random() * nama.length);
    // Beri rotasi ekstra penuh + posisi pilihan (irisan tengahnya di atas/jam 12)
    const target = 720 + 360 - (pilih / nama.length) * 360 - 360 / (nama.length * 2);
    setRot(target);
    mainkan("putar");
    const mulai = Date.now();
    const durasi = 3000;
    clearInterval(audioRef.current);
    audioRef.current = window.setInterval(() => {
      const lewat = Date.now() - mulai;
      if (lewat % 300 < 60) mainkan("putar");
      if (lewat >= durasi) {
        clearInterval(audioRef.current);
        setBerputar(false);
        setPemenang(nama[pilih]);
        mainkan("menang");
      }
    }, 300);
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="flex flex-col items-center gap-4">
        <div className="relative aspect-square w-full max-w-sm">
          <div
            aria-hidden
            className="absolute left-1/2 top-[-10px] text-3xl"
            style={{ transform: "translateX(-50%)" }}
          >
            🔻
          </div>
          <svg
            viewBox="0 0 100 100"
            className="h-full w-full"
            style={{
              transform: `rotate(${rot}deg)`,
              transition: berputar ? "transform 3s cubic-bezier(0.2, 0.8, 0.2, 1)" : "none",
            }}
            role="img"
            aria-label="Roda putar nama peserta"
          >
            <circle cx="50" cy="50" r="48" fill="#fff" stroke="#e5e7eb" />
            {buatIrisan(daftar.length || nama.length)}
            <circle cx="50" cy="50" r="12" fill="var(--card)" stroke="#999" />
            <text x="50" y="54" textAnchor="middle" fontSize="8" fontWeight="800">
              PUTAR
            </text>
          </svg>
        </div>

        {pemenang !== null && (
          <p className="rounded-card bg-leaf-500 px-6 py-4 text-center text-2xl font-extrabold text-white animate-pop-in">
            🎉 {pemenang}!
          </p>
        )}

        <button type="button" onClick={putar} className={primer} disabled={berputar}>
          🎡 Putar Roda
        </button>
      </div>

      <div className="flex flex-col gap-3">
        <label htmlFor="nama" className="font-bold">
          Daftar Nama / Kelompok (satu per baris)
        </label>
        <textarea
          id="nama"
          value={teks}
          onChange={(e) => setTeks(e.target.value)}
          rows={10}
          className={kartu + " font-mono text-base"}
          style={{ background: "var(--card)", borderColor: "var(--border)" }}
          placeholder={"Ani\nBudi\nCitra"}
        />
        <p className="text-sm text-[var(--muted)]">
          Nama tersimpan otomatis di perangkat Anda ({nama.length} nama siap).
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className={sekunder}
            onClick={() => {
              const acak = [...nama].sort(() => Math.random() - 0.5);
              setPemenang(acak[0] ?? null);
              mainkan("menang");
            }}
          >
            🎲 Acak 1 Nama
          </button>
          {pemenang && (
            <button
              type="button"
              className={netral}
              style={{ borderColor: "var(--border)" }}
              onClick={() => {
                setTeks(
                  nama
                    .filter((n) => n !== pemenang)
                    .join("\n")
                );
                setPemenang(null);
              }}
            >
              🗑 Hapus Pemenang dari Daftar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
