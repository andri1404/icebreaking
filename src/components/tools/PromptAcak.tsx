"use client";

import { useState } from "react";
import { primer, kartu } from "@/components/UI";
import { usePengaturan } from "@/lib/pengaturan";

type Jenis = "truth" | "dare" | "pemantik";

const LABEL: Record<Jenis, string> = {
  truth: "🤔 Truth — Jujur Dong",
  dare: "🔥 Dare — Tantangan",
  pemantik: "💡 Pertanyaan Pemantik",
};

export default function PromptAcak({
  data,
}: {
  data: { truth: string[]; dare: string[]; pemantik: string[] };
}) {
  const [kartuAktif, setKartuAktif] = useState<{ jenis: Jenis; teks: string } | null>(null);
  const { mainkan } = usePengaturan();

  const ambil = (jenis: Jenis) => {
    const pool = data[jenis];
    const teks = pool[Math.floor(Math.random() * pool.length)];
    setKartuAktif({ jenis, teks });
    mainkan("klik");
  };

  return (
    <div className="mx-auto max-w-2xl">
      {kartuAktif && (
        <div
          role="status"
          className={`${kartu} mb-6 text-center`}
          style={{ background: "var(--card)", borderColor: "var(--border)" }}
        >
          <p className="text-sm font-bold uppercase tracking-wide text-[var(--muted)]">
            {LABEL[kartuAktif.jenis]}
          </p>
          <p className="mt-3 font-display text-2xl font-extrabold leading-snug sm:text-3xl">
            {kartuAktif.teks}
          </p>
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-3">
        {(["truth", "dare", "pemantik"] as Jenis[]).map((j) => (
          <button key={j} type="button" onClick={() => ambil(j)} className={primer}>
            {LABEL[j]}
          </button>
        ))}
      </div>

      {!kartuAktif && (
        <p className="mt-6 text-center text-[var(--muted)]">
          Pilih jenis kartu di atas. Cocok untuk buka sesi, jeda, atau penutup — tanpa perlu
          persiapan apa pun.
        </p>
      )}
    </div>
  );
}
