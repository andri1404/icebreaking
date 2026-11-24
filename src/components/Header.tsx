"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGelap, usePengaturan } from "@/lib/pengaturan";

const NAV = [
  { href: "/", label: "Beranda" },
  { href: "/games", label: "Daftar Game" },
  { href: "/interaktif", label: "Interaktif" },
  { href: "/perpustakaan", label: "Perpustakaan" },
  { href: "/rencana", label: "Rencana Sesi" },
  { href: "/tentang", label: "Panduan" },
];

// Tombol dasar minimal 44px agar nyaman disentuh di HP
const btn =
  "inline-flex h-11 min-w-11 items-center justify-center gap-2 rounded-full px-4 text-sm font-bold transition active:scale-95";

export default function Header() {
  const path = usePathname();
  const { gelap, toggle } = useGelap();
  const { suara, setSuara, animasi, setAnimasi, presentasi, setPresentasi, mainkan } =
    usePengaturan();

  return (
    <header
      className="sticky top-0 z-40 border-b backdrop-blur"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-2 gap-y-1 px-4 py-2 sm:px-6">
        <Link
          href="/"
          className="mr-2 flex items-center gap-2 text-lg font-extrabold font-display"
        >
          <span aria-hidden>🎲</span> MainIce
        </Link>

        <nav aria-label="Navigasi utama" className="flex flex-1 flex-wrap items-center gap-1">
          {NAV.map((n) => {
            const aktif = n.href === "/" ? path === "/" : path.startsWith(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                aria-current={aktif ? "page" : undefined}
                className={`${btn} ${
                  aktif
                    ? "bg-sun-400 text-slate-900"
                    : "text-[var(--fg)] hover:bg-black/5 dark:hover:bg-white/10"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => {
              setPresentasi(!presentasi);
              mainkan("klik");
            }}
            title={presentasi ? "Matikan mode presentasi" : "Mode presentasi (proyektor)"}
            aria-pressed={presentasi}
            className={`${btn} ${
              presentasi ? "bg-sky2-500 text-white" : "hover:bg-black/5 dark:hover:bg-white/10"
            }`}
          >
            📺
            <span className="hidden sm:inline">Presentasi</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setSuara(!suara);
              if (!suara) mainkan("klik");
            }}
            title={suara ? "Matikan efek suara" : "Nyalakan efek suara"}
            aria-pressed={suara}
            className={`${btn} ${
              suara ? "hover:bg-black/5 dark:hover:bg-white/10" : "opacity-50"
            }`}
          >
            {suara ? "🔊" : "🔇"}
          </button>
          <button
            type="button"
            onClick={() => {
              setAnimasi(!animasi);
            }}
            title={animasi ? "Matikan animasi" : "Nyalakan animasi"}
            aria-pressed={animasi}
            className={`${btn} ${
              animasi ? "hover:bg-black/5 dark:hover:bg-white/10" : "opacity-50"
            }`}
          >
            ✨
          </button>
          <button
            type="button"
            onClick={toggle}
            title={gelap ? "Mode terang" : "Mode gelap"}
            className={`${btn} hover:bg-black/5 dark:hover:bg-white/10`}
          >
            {gelap ? "☀️" : "🌙"}
          </button>
        </div>
      </div>
    </header>
  );
}
