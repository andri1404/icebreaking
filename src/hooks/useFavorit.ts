"use client";

import { useCallback } from "react";
import { useLocalStorage } from "@/lib/storage";

export function useFavorit() {
  const [ids, setIds] = useLocalStorage<string[]>("mainice:favorit", []);

  const toggle = useCallback(
    (id: string) => {
      setIds(ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]);
    },
    [ids, setIds]
  );

  return { favorit: ids, toggle, isFavorit: (id: string) => ids.includes(id) };
}
