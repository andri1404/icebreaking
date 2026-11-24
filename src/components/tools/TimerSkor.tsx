"use client";

import { useEffect, useRef, useState } from "react";
import { primer, sekunder, netral } from "@/components/UI";
import { usePengaturan } from "@/lib/pengaturan";

function fmt(totalDetik: number) {
  const m = Math.floor(totalDetik / 60);
  const s = totalDetik % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

interface Tim {
  nama: string;
  poin: number;
}

export default function TimerSkor() {
  const [lama, setLama] = useState(300);
  const [sisa, setSisa] = useState(300);
  const [jalan, setJalan] = useState(false);
  const [tim, setTim] = useState<Tim[]>([
    { nama: "Tim Merah", poin: 0 },
    { nama: "Tim Biru", poin: 0 },
  ]);
  const { mainkan, presentasi } = usePengaturan();
  const ref = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!jalan) return;
    ref.current = setInterval(() => {
      setSisa((v) => {
        if (v <= 1) {
          clearInterval(ref.current!);
          setJalan(false);
          mainkan("menang");
          return 0;
        }
        if (v <= 6) mainkan("tiktok");
        return v - 1;
      });
    }, 1000);
    return () => clearInterval(ref.current!);
  }, [jalan, mainkan]);

  const setDurasi = (d: number) => {
    setJalan(false);
    setLama(d);
    setSisa(d);
  };

  const ubahPoin = (i: number, d: number) => {
    setTim((t) => t.map((x, j) => (j === i ? { ...x, poin: Math.max(0, x.poin + d) } : x)));
    mainkan(d > 0 ? "benar" : "klik");
  };

  const tambahTim = () =>
    setTim((t) => [...t, { nama: `Tim ${t.length + 1}`, poin: 0 }]);

  const jumlahBesar = presentasi ? "text-7xl sm:text-9xl" : "text-6xl sm:text-7xl";
  const judulTim = presentasi ? "text-4xl" : "text-2xl";

  return (
    <div className="grid gap-8">
      <section aria-label="Penghitung waktu" className="text-center">
        <p
          className={`font-mono font-extrabold tabular-nums ${jumlahBesar}`}
          style={{ color: sisa === 0 ? "#e0533d" : sisa <= 30 ? "#d97706" : "var(--fg)" }}
          role="timer"
          aria-live="off"
        >
          {fmt(sisa)}
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {[60, 120, 300, 600].map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDurasi(d)}
              className={netral}
              style={{ borderColor: "var(--border)" }}
              aria-pressed={lama === d}
            >
              {d / 60} mnt
            </button>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap justify-center gap-3">
          <button type="button" onClick={() => setJalan((v) => !v)} className={jalan ? sekunder : primer}>
            {jalan ? "⏸ Jeda" : "▶️ Mulai"}
          </button>
          <button
            type="button"
            onClick={() => {
              setJalan(false);
              setSisa(lama);
            }}
            className={netral}
            style={{ borderColor: "var(--border)" }}
          >
            🔁 Reset
          </button>
        </div>
      </section>

      <section aria-label="Papan skor" className="grid gap-3 sm:grid-cols-2">
        {tim.map((t, i) => (
          <div
            key={i}
            className="flex items-center justify-between gap-3 rounded-card border p-4 shadow-card"
            style={{ background: "var(--card)", borderColor: "var(--border)" }}
          >
            <input
              value={t.nama}
              onChange={(e) =>
                setTim((ts) => ts.map((x, j) => (j === i ? { ...x, nama: e.target.value } : x)))
              }
              aria-label={`Nama tim ${i + 1}`}
              className={`${judulTim} w-40 bg-transparent font-display font-extrabold`}
            />
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => ubahPoin(i, -1)}
                className="h-12 w-12 rounded-full bg-red-100 text-xl font-extrabold text-red-700 dark:bg-red-500/20 dark:text-red-300"
                aria-label={`Kurangi poin ${t.nama}`}
              >
                −
              </button>
              <span className="min-w-16 text-center font-display text-3xl font-extrabold tabular-nums">
                {t.poin}
              </span>
              <button
                type="button"
                onClick={() => ubahPoin(i, +1)}
                className="h-12 w-12 rounded-full bg-leaf-100 text-xl font-extrabold text-leaf-700 dark:bg-leaf-500/20 dark:text-leaf-300"
                aria-label={`Tambah poin ${t.nama}`}
              >
                +
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={tambahTim}
          className="min-h-14 rounded-card border-2 border-dashed font-bold"
          style={{ borderColor: "var(--border)" }}
        >
          ＋ Tambah Tim
        </button>
      </section>
    </div>
  );
}
