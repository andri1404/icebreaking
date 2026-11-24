"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import GameCard from "@/components/GameCard";
import { GAMES, KATEGORI } from "@/lib/games";

interface Filter {
  kategori: string;
  durasi: string;
  peserta: string;
  usia: string;
  alat: string;
  q: string;
}

const usiaUnik = Array.from(new Set(GAMES.map((g) => g.usia))).sort();

function cocokFilter(g: (typeof GAMES)[number], f: Filter): boolean {
  if (f.kategori && g.kategori !== f.kategori) return false;
  if (f.durasi === "5" && g.durasiMenit > 5) return false;
  if (f.durasi === "10" && g.durasiMenit > 10) return false;
  if (f.durasi === "15" && g.durasiMenit > 15) return false;
  if (f.peserta === "kecil" && g.pesertaMin > 10) return false;
  if (f.peserta === "besar" && g.pesertaMax < 20) return false;
  if (f.usia && g.usia !== f.usia) return false;
  if (f.alat === "tanpa" && g.perluAlat) return false;
  if (f.alat === "dengan" && !g.perluAlat) return false;
  if (f.q) {
    const q = f.q.toLowerCase();
    const teks = (g.nama + g.deskripsi + g.tags.join(" ") + g.kategori).toLowerCase();
    if (!teks.includes(q)) return false;
  }
  return true;
}

export default function DaftarGame() {
  const params = useSearchParams();
  const [f, setF] = useState<Filter>({
    kategori: params.get("kategori") ?? "",
    durasi: "",
    peserta: "",
    usia: "",
    alat: "",
    q: "",
  });

  const hasil = useMemo(() => GAMES.filter((g) => cocokFilter(g, f)), [f]);
  const set = (k: keyof Filter) => (v: string) =>
    setF((lama) => ({ ...lama, [k]: v }));

  const pilihanKelas =
    "h-11 rounded-full border bg-[var(--card)] px-4 text-sm font-bold w-full";
  const adaFilterAktif =
    f.kategori || f.durasi || f.peserta || f.usia || f.alat || f.q;

  return (
    <div className="flex flex-col gap-6">
      <form
        aria-label="Filter dan pencarian game"
        onSubmit={(e) => e.preventDefault()}
        className="grid gap-3 rounded-card border p-4 shadow-card sm:grid-cols-2 lg:grid-cols-3"
        style={{ background: "var(--card)", borderColor: "var(--border)" }}
      >
        <label className="sm:col-span-2 lg:col-span-3">
          <span className="mb-1 block text-sm font-bold">🔍 Cari</span>
          <input
            type="search"
            value={f.q}
            onChange={(e) => set("q")(e.target.value)}
            placeholder="Cari nama, kata kunci, atau tag…"
            className="h-12 w-full rounded-full border bg-transparent px-5 font-semibold"
            style={{ borderColor: "var(--border)" }}
          />
        </label>

        <label>
          <span className="mb-1 block text-sm font-bold">Kategori</span>
          <select
            value={f.kategori}
            onChange={(e) => set("kategori")(e.target.value)}
            className={pilihanKelas}
          >
            <option value="">Semua kategori</option>
            {KATEGORI.map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span className="mb-1 block text-sm font-bold">Durasi maksimal</span>
          <select
            value={f.durasi}
            onChange={(e) => set("durasi")(e.target.value)}
            className={pilihanKelas}
          >
            <option value="">Berapa pun</option>
            <option value="5">≤ 5 menit</option>
            <option value="10">≤ 10 menit</option>
            <option value="15">≤ 15 menit</option>
          </select>
        </label>

        <label>
          <span className="mb-1 block text-sm font-bold">Jumlah peserta</span>
          <select
            value={f.peserta}
            onChange={(e) => set("peserta")(e.target.value)}
            className={pilihanKelas}
          >
            <option value="">Berapa pun</option>
            <option value="kecil">Kelas kecil (≤ 10)</option>
            <option value="besar">Kelas besar (20+)</option>
          </select>
        </label>

        <label>
          <span className="mb-1 block text-sm font-bold">Usia / Jenjang</span>
          <select
            value={f.usia}
            onChange={(e) => set("usia")(e.target.value)}
            className={pilihanKelas}
          >
            <option value="">Semua jenjang</option>
            {usiaUnik.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span className="mb-1 block text-sm font-bold">Alat</span>
          <select
            value={f.alat}
            onChange={(e) => set("alat")(e.target.value)}
            className={pilihanKelas}
          >
            <option value="">Semua</option>
            <option value="tanpa">Tanpa alat</option>
            <option value="dengan">Dengan alat sederhana</option>
          </select>
        </label>

        {adaFilterAktif && (
          <button
            type="reset"
            onClick={() =>
              setF({ kategori: "", durasi: "", peserta: "", usia: "", alat: "", q: "" })
            }
            className="h-11 self-end rounded-full bg-black/10 px-5 font-bold dark:bg-white/10"
          >
            ✕ Bersihkan filter
          </button>
        )}
      </form>

      <p aria-live="polite" className="font-bold text-[var(--muted)]">
        Menampilkan {hasil.length} dari {GAMES.length} game
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {hasil.map((g) => (
          <GameCard key={g.id} game={g} />
        ))}
      </div>

      {hasil.length === 0 && (
        <p className="rounded-card border border-dashed p-8 text-center text-[var(--muted)]">
          Tidak ada game yang cocok. Coba longgarkan filternya 🙂
        </p>
      )}
    </div>
  );
}
