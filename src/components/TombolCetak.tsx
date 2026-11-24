"use client";

// Cetak daftar — atau pilih "Simpan sebagai PDF" pada dialog cetak browser
export default function TombolCetak({ label = "🖨 Cetak / Unduh PDF" }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="no-print inline-flex h-12 items-center gap-2 rounded-full bg-sky2-600 px-5 font-bold text-white hover:bg-sky2-700"
    >
      {label}
    </button>
  );
}
