"use client";

import { useCallback, useEffect, useState } from "react";

// Hook penyimpanan kecil berbasis localStorage (aman untuk SSR)
export function useLocalStorage<T>(key: string, awal: T) {
  const [nilai, setNilai] = useState<T>(awal);
  const [siap, setSiap] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw !== null) setNilai(JSON.parse(raw));
    } catch {}
    setSiap(true);
  }, [key]);

  const simpan = useCallback(
    (v: T) => {
      setNilai(v);
      try {
        localStorage.setItem(key, JSON.stringify(v));
      } catch {}
    },
    [key]
  );

  return [nilai, simpan, siap] as const;
}
