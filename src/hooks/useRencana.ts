"use client";

import { useCallback } from "react";
import { useLocalStorage } from "@/lib/storage";

export interface ItemRencana {
  id: string;
  game: string;
}

export function useRencana() {
  const [items, setItems] = useLocalStorage<ItemRencana[]>("mainice:rencana", []);

  const tambah = useCallback(
    (id: string, nama: string) => {
      if (items.some((i) => i.id === id)) return;
      setItems([...items, { id, game: nama }]);
    },
    [items, setItems]
  );

  const hapus = useCallback(
    (id: string) => setItems(items.filter((i) => i.id !== id)),
    [items, setItems]
  );

  const pindah = useCallback(
    (index: number, arah: -1 | 1) => {
      const t = index + arah;
      if (t < 0 || t >= items.length) return;
      const baru = [...items];
      [baru[index], baru[t]] = [baru[t], baru[index]];
      setItems(baru);
    },
    [items, setItems]
  );

  return { rencana: items, tambah, hapus, pindah, adaDiRencana: (id: string) => items.some((i) => i.id === id) };
}
