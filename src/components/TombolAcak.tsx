"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { randomGame } from "@/lib/games";
import { besar } from "@/components/UI";
import { usePengaturan } from "@/lib/pengaturan";

// Acak satu game dari seluruh pustaka lalu langsung buka detailnya
export default function TombolAcak() {
  const router = useRouter();
  const [nama, setNama] = useState<string | null>(null);
  const { mainkan } = usePengaturan();

  const acak = () => {
    const g = randomGame();
    setNama(g.nama);
    mainkan("putar");
    router.push(`/games/${g.id}`);
  };

  return (
    <button
      type="button"
      onClick={acak}
      className={`${besar} bg-leaf-500 text-white hover:bg-leaf-600`}
    >
      🎲 Acak Game {nama && <span className="sr-only">terpilih: {nama}</span>}
    </button>
  );
}
