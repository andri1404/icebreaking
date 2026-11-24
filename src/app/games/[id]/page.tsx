import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { GAMES, getGame, durasiLabel, pesertaLabel, kategoriWarna } from "@/lib/games";
import DetailAksi from "@/components/DetailAksi";

export function generateStaticParams() {
  return GAMES.map((g) => ({ id: g.id }));
}

export function generateMetadata({
  params,
}: {
  params: { id: string };
}): Metadata {
  const g = getGame(params.id);
  if (!g) return { title: "Game tidak ditemukan" };
  return { title: g.nama, description: g.deskripsi };
}

export default function DetailGame({ params }: { params: { id: string } }) {
  const g = getGame(params.id);
  if (!g) notFound();

  const kartu = "rounded-card border p-6 shadow-card";
  const kartuCss = { background: "var(--card)", borderColor: "var(--border)" };

  const Bagian = ({
    judul,
    ikon,
    isi,
    ol = false,
  }: {
    judul: string;
    ikon: string;
    isi: string[];
    ol?: boolean;
  }) => (
    <section className={kartu} style={kartuCss}>
      <h2 className="mb-3 font-display text-xl font-extrabold">
        <span aria-hidden>{ikon}</span> {judul}
      </h2>
      {ol ? (
        <ol className="list-decimal space-y-2 pl-6">
          {isi.map((x, i) => (
            <li key={i} className="leading-relaxed">
              {x}
            </li>
          ))}
        </ol>
      ) : (
        <ul className="list-disc space-y-2 pl-6">
          {isi.map((x, i) => (
            <li key={i} className="leading-relaxed">
              {x}
            </li>
          ))}
        </ul>
      )}
    </section>
  );

  return (
    <article className="mx-auto flex max-w-3xl flex-col gap-6">
      <nav aria-label="Breadcrumb" className="text-sm font-bold text-[var(--muted)]">
        <Link href="/games" className="underline">
          Daftar Game
        </Link>{" "}
        / <span>{g.nama}</span>
      </nav>

      <header className="flex flex-col gap-3">
        <span className={`w-fit rounded-full px-3 py-1 text-sm font-bold ${kategoriWarna(g.kategori)}`}>
          {g.kategori}
        </span>
        <h1 className="font-display text-3xl font-extrabold sm:text-4xl">{g.nama}</h1>
        <p className="text-lg text-[var(--muted)]">{g.deskripsi}</p>
        <p className="flex flex-wrap gap-x-4 gap-y-1 font-bold">
          <span>⏱ {durasiLabel(g)}</span>
          <span>👥 {pesertaLabel(g)}</span>
          <span>🎓 {g.usia}</span>
          <span>{g.perluAlat ? "🧰 butuh alat" : "🚫 tanpa alat"}</span>
        </p>
        {!g.perluAlat && g.alat.length === 0 ? null : (
          <p className="text-sm text-[var(--muted)]">
            <strong className="text-[var(--fg)]">Alat:</strong> {g.alat.join(" · ")}
          </p>
        )}
        <DetailAksi game={g} />
      </header>

      <Bagian judul="Tujuan" ikon="🎯" isi={g.tujuan} />
      <Bagian judul="Langkah-langkah" ikon="📋" isi={g.langkah} ol />
      <Bagian judul="Variasi" ikon="🔀" isi={g.variasi} />
      <Bagian judul="Tips Fasilitator" ikon="💡" isi={g.tips} />

      {g.tags.length > 0 && (
        <p className="print-card flex flex-wrap gap-2 text-sm">
          {g.tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-black/5 px-3 py-1 font-semibold dark:bg-white/10"
            >
              #{t}
            </span>
          ))}
        </p>
      )}
    </article>
  );
}
