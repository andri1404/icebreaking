"use client";

import { useEffect, useRef, useState } from "react";
import { primer, sekunder } from "@/components/UI";
import { usePengaturan } from "@/lib/pengaturan";

interface Kartu {
  gambar: string;
  jawaban: string;
  petunjuk: string;
}

export default function TebakGambar({ kartu }: { kartu: Kartu[] }) {
  const susun = () =>
    [...kartu]
      .map((k) => ({ k, acak: Math.random() }))
      .sort((a, b) => a.acak - b.acak)
      .map((x) => x.k);

  const [set, setSet] = useState<Kartu[]>(() => susun());
  const [indeks, setIndeks] = useState(0);
  const [tampil, setTampil] = useState(0); // jumlah huruf terungkap
  const [tepat, setTepat] = useState(false);
  const [skor, setSkor] = useState(0);
  const { mainkan } = usePengaturan();
  const k = set[indeks];
  const jawabanRahasia = k.jawaban.replace(/\s/g, "");

  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    timer.current = setInterval(() => {
      setTampil((v) => {
        if (v >= jawabanRahasia.length) return v;
        return v + 1;
      });
    }, 900);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [indeks, jawabanRahasia.length]);

  const ungkap = jawabanRahasia
    .split("")
    .map((_, i) => (i < tampil ? _ : "•"))
    .join(" ");

  const cek = (input: string) => {
    if (tepat) return;
    if (input.trim().toUpperCase().replace(/\s/g, "") === jawabanRahasia) {
      setTepat(true);
      setSkor((v) => v + 1);
      if (timer.current) clearInterval(timer.current);
      mainkan("menang");
    } else {
      mainkan("salah");
    }
  };

  const lanjut = () => {
    if (indeks + 1 >= set.length) {
      const baru = susun();
      setSet(baru);
      setIndeks(0);
    } else {
      setIndeks((v) => v + 1);
    }
    setTampil(0);
    setTepat(false);
  };

  return (
    <div className="mx-auto max-w-2xl">
      <p className="mb-3 text-sm font-bold text-[var(--muted)]">
        Kartu {indeks + 1}/{set.length} · ⭐ Skor: {skor}
      </p>

      <div className={`${kartu} text-center`} style={{ background: "var(--card)", borderColor: "var(--border)" }}>
        <p className="text-7xl sm:text-8xl" aria-label={`Gambar: ${k.gambar}`}>
          {k.gambar}
        </p>
        <p className="mt-4 font-mono text-2xl tracking-widest">{ungkap}</p>
        <p className="mt-2 text-[var(--muted)]">Petunjuk: {k.petunjuk}</p>

        <form
          className="mt-4 flex flex-col gap-3 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault();
            const f = e.currentTarget as HTMLFormElement;
            const input = (f.elements.namedItem("jawab") as HTMLInputElement).value;
            cek(input);
            f.reset();
          }}
        >
          <input
            name="jawab"
            autoComplete="off"
            placeholder={tepat ? "Tepat! 🎉" : "Ketik tebakanmu…"}
            disabled={tepat}
            className="h-14 flex-1 rounded-2xl border bg-transparent px-5 text-lg font-bold"
            style={{ borderColor: "var(--border)" }}
            aria-label="Jawaban tebakan"
          />
          <button type="submit" className={sekunder} disabled={tepat}>
            Periksa ✓
          </button>
        </form>

        {tepat && (
          <div className="mt-4 animate-pop-in">
            <p className="text-xl font-extrabold text-leaf-600 dark:text-leaf-300">
              🎉 Benar! Jawabannya “{k.jawaban}”.
            </p>
            <button type="button" onClick={lanjut} className={`${primer} mt-3`}>
              Kartu Berikutnya →
            </button>
          </div>
        )}
        {!tepat && tampil >= jawabanRahasia.length && (
          <p className="mt-3 font-bold text-[var(--muted)]">
            Semua huruf sudah terbuka — tebakan bisa berupa kata lengkapnya!
          </p>
        )}
      </div>
    </div>
  );
}
