import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { TOOLS, getTool } from "@/lib/tools";
import RodaPutar from "@/components/tools/RodaPutar";
import KuisCepat from "@/components/tools/KuisCepat";
import TebakGambar from "@/components/tools/TebakGambar";
import PromptAcak from "@/components/tools/PromptAcak";
import PengacakKelompok from "@/components/tools/PengacakKelompok";
import TimerSkor from "@/components/tools/TimerSkor";
import KartuMemori from "@/components/tools/KartuMemori";
import quizData from "@/data/quiz.json";
import tebakData from "@/data/tebak.json";
import promptData from "@/data/prompt.json";

export function generateStaticParams() {
  return TOOLS.map((t) => ({ tool: t.id }));
}

export function generateMetadata({
  params,
}: {
  params: { tool: string };
}): Metadata {
  const t = getTool(params.tool);
  return t
    ? { title: t.nama, description: t.deskripsi }
    : { title: "Alat tidak ditemukan" };
}

export default function HalamanTool({ params }: { params: { tool: string } }) {
  const t = getTool(params.tool);
  if (!t) notFound();

  return (
    <div className="flex flex-col gap-8">
      <header className="text-center">
        <p className="text-6xl" aria-hidden>
          {t.ikon}
        </p>
        <h1 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">{t.nama}</h1>
        <p className="mx-auto mt-1 max-w-xl text-[var(--muted)]">{t.deskripsi}</p>
      </header>

      {params.tool === "roda" && <RodaPutar />}
      {params.tool === "kuis" && <KuisCepat soal={quizData as never} />}
      {params.tool === "tebak" && <TebakGambar kartu={tebakData as never} />}
      {params.tool === "prompt" && <PromptAcak data={promptData as never} />}
      {params.tool === "kelompok" && <PengacakKelompok />}
      {params.tool === "timer" && <TimerSkor />}
      {params.tool === "memori" && <KartuMemori />}
    </div>
  );
}
