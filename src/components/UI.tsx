// Gaya tombol bersama agar konsisten di seluruh alat interaktif
export const besar =
  "inline-flex h-14 items-center justify-center gap-2 rounded-full px-6 text-lg font-extrabold transition active:scale-95";

export const primer = `${besar} bg-sun-400 text-slate-900 hover:bg-sun-500`;
export const sekunder = `${besar} bg-sky2-500 text-white hover:bg-sky2-600`;
export const netral = `${besar} border font-bold hover:bg-black/5 dark:hover:bg-white/10`;

export const kartu =
  "rounded-card border p-6 shadow-card animate-pop-in";
