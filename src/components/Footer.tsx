import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="border-t py-6 text-sm"
      style={{ borderColor: "var(--border)", color: "var(--muted)" }}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          <strong className="text-[var(--fg)]">MainIce</strong> — permainan ice breaking
          &amp; aktivitas belajar untuk pendidik Indonesia.
        </p>
        <nav aria-label="Tautan footer" className="flex gap-4">
          <Link href="/tentang" className="underline hover:text-sun-600">
            Panduan &amp; Tentang
          </Link>
          <Link href="/tentang#tambah" className="underline hover:text-sun-600">
            Menambah Game
          </Link>
        </nav>
      </div>
    </footer>
  );
}
