import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-4 py-24 text-center">
      <p className="text-7xl" aria-hidden>🎲</p>
      <h1 className="font-display text-3xl font-extrabold">Halaman tidak ditemukan</h1>
      <p className="text-[var(--muted)]">Mungkin linknya salah — atau game ini sedang bermain petak umpet.</p>
      <Link
        href="/games"
        className="mt-2 inline-flex h-14 items-center rounded-full bg-sun-400 px-6 text-lg font-extrabold text-slate-900 hover:bg-sun-500"
      >
        Lihat Daftar Game
      </Link>
    </div>
  );
}
