import Link from "next/link";
import type { Metadata } from "next";
import { TOOLS } from "@/lib/tools";
import { besar } from "@/components/UI";

export const metadata: Metadata = {
  title: "Alat Interaktif",
  description:
    "Roda putar, kuis cepat, tebak gambar, pengacak kelompok, timer & papan skor, dan kartu memori — dimainkan langsung di web.",
};

export default function HalamanInteraktif() {
  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="font-display text-3xl font-extrabold">Alat Interaktif</h1>
        <p className="mt-1 text-[var(--muted)]">
          Dimainkan langsung di layar — ideal diproyeksikan di depan kelas tanpa login
          atau instal apa pun.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TOOLS.map((t) => (
          <Link
            key={t.id}
            href={`/interaktif/${t.id}`}
            className="flex min-h-32 flex-col gap-2 rounded-card border p-6 shadow-card transition hover:-translate-y-1"
            style={{ background: "var(--card)", borderColor: "var(--border)" }}
          >
            <span className="text-4xl" aria-hidden>
              {t.ikon}
            </span>
            <span className="font-display text-xl font-extrabold">{t.nama}</span>
            <span className="text-sm text-[var(--muted)]">{t.deskripsi}</span>
            <span className={`${besar} mt-auto w-fit bg-sun-400 px-5 text-base text-slate-900 hover:bg-sun-500`}>
              Buka →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
