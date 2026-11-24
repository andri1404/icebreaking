"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useLocalStorage } from "@/lib/storage";

type Sfx = "klik" | "benar" | "salah" | "tiktok" | "menang" | "putar";

interface Pengaturan {
  suara: boolean;
  animasi: boolean;
  presentasi: boolean;
  gelap?: boolean;
  mainkan: (s: Sfx) => void;
  setSuara: (v: boolean) => void;
  setAnimasi: (v: boolean) => void;
  setPresentasi: (v: boolean) => void;
}

const Ctx = createContext<Pengaturan | null>(null);

export function PengaturanProvider({ children }: { children: ReactNode }) {
  const [suara, setSuaraL] = useLocalStorage("mainice:suara", true);
  const [animasi, setAnimasiL] = useLocalStorage("mainice:animasi", true);
  const [presentasi, setPresentasiL] = useLocalStorage("mainice:presentasi", false);
  const [audio, setAudio] = useState<AudioContext | null>(null);

  // Kelas tema & mode di <html> agar berlaku global dan tersimpan antar halaman
  useEffect(() => {
    const gelap = localStorage.getItem("mainice:gelap") === "1";
    document.documentElement.classList.toggle("dark", gelap);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("presentasi", presentasi);
  }, [presentasi]);

  useEffect(() => {
    document.documentElement.classList.toggle("kurang-animasi", !animasi);
  }, [animasi]);

  const mainkan = useCallback(
    (s: Sfx) => {
      if (!suara) return;
      try {
        let ctx = audio;
        if (!ctx) {
          ctx = new AudioContext();
          setAudio(ctx);
        }
        // Nada pendek memakai osilator sederhana (tanpa file audio)
        const map: Record<Sfx, number[]> = {
          klik: [660, 0.05],
          benar: [880, 0.12],
          salah: [220, 0.2],
          tiktok: [980, 0.03],
          menang: [523, 0.1],
          putar: [440, 0.08],
        };
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        const [f, d] = map[s];
        o.frequency.value = f;
        o.type = s === "salah" ? "sawtooth" : "sine";
        g.gain.setValueAtTime(0.12, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + d);
        o.connect(g).connect(ctx.destination);
        o.start();
        o.stop(ctx.currentTime + d);
        if (s === "benar") {
          // efek nada kedua naik
          setTimeout(() => {
            if (!suara) return;
            const o2 = ctx!.createOscillator();
            const g2 = ctx!.createGain();
            o2.frequency.value = 1174;
            g2.gain.setValueAtTime(0.1, ctx!.currentTime);
            g2.gain.exponentialRampToValueAtTime(0.001, ctx!.currentTime + 0.12);
            o2.connect(g2).connect(ctx!.destination);
            o2.start();
            o2.stop(ctx!.currentTime + 0.12);
          }, 110);
        }
      } catch {}
    },
    [suara, audio]
  );

  return (
    <Ctx.Provider
      value={{
        suara,
        animasi,
        presentasi,
        mainkan,
        setSuara: setSuaraL,
        setAnimasi: setAnimasiL,
        setPresentasi: setPresentasiL,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function usePengaturan() {
  const v = useContext(Ctx);
  if (!v) throw new Error("usePengaturan harus dipakai di dalam PengaturanProvider");
  return v;
}

export function useGelap() {
  const [gelap, setGelap] = useState<boolean | null>(null);
  useEffect(() => {
    setGelap(document.documentElement.classList.contains("dark"));
  }, []);
  const toggle = useCallback(() => {
    const now = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", now);
    localStorage.setItem("mainice:gelap", now ? "1" : "0");
    setGelap(now);
  }, []);
  return { gelap, toggle };
}
