import gamesJson from "@/data/games.json";
import type { Game, Kategori } from "./types";

export const GAMES = gamesJson as Game[];

export const KATEGORI: Kategori[] = [
  "Perkenalan",
  "Energizer",
  "Fokus & Konsentrasi",
  "Kerja Sama Tim",
  "Refleksi",
  "Penutup",
];

export function getGame(id: string): Game | undefined {
  return GAMES.find((g) => g.id === id);
}

export function randomGame(): Game {
  return GAMES[Math.floor(Math.random() * GAMES.length)];
}

export function durasiLabel(g: Game): string {
  return `${g.durasiMenit} menit`;
}

export function pesertaLabel(g: Game): string {
  return g.pesertaMax >= 999
    ? `${g.pesertaMin}+ peserta`
    : `${g.pesertaMin}\u2013${g.pesertaMax} peserta`;
}

export function kategoriWarna(k: Kategori): string {
  switch (k) {
    case "Perkenalan":
      return "bg-sun-100 text-sun-700 dark:bg-sun-500/20 dark:text-sun-300";
    case "Energizer":
      return "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300";
    case "Fokus & Konsentrasi":
      return "bg-sky2-100 text-sky2-700 dark:bg-sky2-400/20 dark:text-sky2-300";
    case "Kerja Sama Tim":
      return "bg-leaf-100 text-leaf-700 dark:bg-leaf-400/20 dark:text-leaf-300";
    case "Refleksi":
      return "bg-violet-100 text-violet-700 dark:bg-violet-400/20 dark:text-violet-300";
    case "Penutup":
      return "bg-rose-100 text-rose-700 dark:bg-rose-400/20 dark:text-rose-300";
  }
}
