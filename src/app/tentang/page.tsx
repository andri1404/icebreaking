import type { Metadata } from "next";
import TombolCetak from "@/components/TombolCetak";

export const metadata: Metadata = {
  title: "Tentang & Panduan Penggunaan",
  description:
    "Cara memakai MainIce untuk guru dan fasilitator, cara menambah game baru lewat file JSON, dan cara deploy ke Vercel.",
};

const kartu = "rounded-card border p-6 shadow-card";
const kartuCss = { background: "var(--card)", borderColor: "var(--border)" };

function Bagian({
  id,
  judul,
  children,
}: {
  id?: string;
  judul: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`${kartu} scroll-mt-24`} style={kartuCss}>
      <h2 className="mb-3 font-display text-2xl font-extrabold">{judul}</h2>
      <div className="flex flex-col gap-3 leading-relaxed">{children}</div>
    </section>
  );
}

export default function Tentang() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <header>
        <h1 className="font-display text-3xl font-extrabold">
          Tentang &amp; Panduan Penggunaan
        </h1>
        <p className="mt-1 text-[var(--muted)]">
          MainIce membantu guru, fasilitator, dan trainer mencairkan suasana belajar
          tanpa persiapan berlebihan.
        </p>
        <div className="mt-4">
          <TombolCetak label="🖨 Cetak Panduan Ini" />
        </div>
      </header>

      <Bagian judul="📖 Untuk Apa MainIce?">
        <p>
          Ice breaking singkat (3–15 menit) terbukti menurunkan kecemasan peserta,
          membangun kepercayaan kelompok, dan mengembalikan fokus. MainIce menyatukan tiga
          hal dalam satu situs ringan:
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            <strong>Perpustakaan 30 permainan non-digital</strong> yang bisa dimainkan di
            kelas, lapangan, atau ruang pelatihan.
          </li>
          <li>
            <strong>7 alat interaktif</strong> — roda putar, kuis, tebak gambar, kartu
            pemantik, pengacak kelompok, timer &amp; papan skor, dan kartu memori.
          </li>
          <li>
            <strong>Fitur pendukung</strong>: mode presentasi proyektor, rencana sesi,
            favorit, mode gelap/terang, serta efek suara dan animasi yang bisa dimatikan.
          </li>
        </ul>
      </Bagian>

      <Bagian judul="🧑‍🏫 Alur Pakai untuk Guru (5 langkah)">
        <ol className="list-decimal space-y-2 pl-6">
          <li>
            Buka <strong>Daftar Game</strong>, saring sesuai kondisi kelas: durasi, jumlah
            peserta, jenjang, dan ketersediaan alat.
          </li>
          <li>
            Klik <strong>☆ Favorit</strong> pada game yang cocok, atau <strong>＋
            Rencana</strong> untuk menyusun urutan satu sesi.
          </li>
          <li>
            Buka <strong>Rencana Sesi</strong> untuk mengatur urutan dan memperkirakan
            total waktu, lalu cetak sebagai pegangan luring.
          </li>
          <li>
            Saat mengajar, buka halaman detail game dan tekan <strong>Mode Layar
            Penuh</strong> — langkah tampil besar untuk proyektor, navigasi dengan panah
            kiri/kanan keyboard.
          </li>
          <li>
            Untuk kompetisi atau acak peserta, pakai alat di menu <strong>Interaktif</strong>.
            Nama peserta tersimpan otomatis di perangkat Anda.
          </li>
        </ol>
      </Bagian>

      <Bagian judul="⚡ Tips Fasilitasi Umum">
        <ul className="list-disc space-y-1 pl-6">
          <li>Mulai dari permainan berisiko rendah (Perkenalan) sebelum yang fisik.</li>
          <li>Jaga durasi — selesai lebih awal lebih baik daripada terlambat selesai.</li>
          <li>Ikut bermain bersama peserta; fasilitator yang bermain menghilangkan jarak.</li>
          <li>Tutup setiap aktivitas dengan satu pertanyaan refleksi singkat.</li>
        </ul>
      </Bagian>

      <Bagian id="tambah" judul="➕ Menambah Game Baru (1 file JSON)">
        <p>
          Semua permainan disimpan di <code className="rounded bg-black/10 px-1 dark:bg-white/10">src/data/games.json</code>{" "}
          — tanpa database. Untuk menambah game:
        </p>
        <ol className="list-decimal space-y-2 pl-6">
          <li>Buka file tersebut dan salin satu objek game yang sudah ada sebagai contoh.</li>
          <li>
            Ubah isinya: <code>id</code> (unik, tanpa spasi), <code>nama</code>,{" "}
            <code>kategori</code> (harus salah satu dari enam kategori yang tersedia),{" "}
            <code>deskripsi</code>, <code>durasiMenit</code>,{" "}
            <code>pesertaMin</code>/<code>pesertaMax</code>, <code>usia</code>,{" "}
            <code>perluAlat</code>, <code>alat</code>, <code>tujuan</code>,{" "}
            <code>langkah</code>, <code>variasi</code>, <code>tips</code>, dan{" "}
            <code>tags</code>.
          </li>
          <li>Simpan — halaman Daftar Game, Perpustakaan, dan Acak Game otomatis membaca data terbaru.</li>
        </ol>
        <p>
          Soal kuis, kartu tebak, dan prompt berada di file JSON terpisah:{" "}
          <code>quiz.json</code>, <code>tebak.json</code>, dan <code>prompt.json</code> —
          pas untuk diisi sesuai mata pelajaran Anda.
        </p>
      </Bagian>

      <Bagian judul="🚀 Menjalankan &amp; Deploy">
        <ol className="list-decimal space-y-2 pl-6">
          <li>
            Lokal: <code className="rounded bg-black/10 px-1 dark:bg-white/10">npm install</code>{" "}
            lalu <code className="rounded bg-black/10 px-1 dark:bg-white/10">npm run dev</code>.
          </li>
          <li>
            Deploy: dorong repo ini ke GitHub, lalu impor di Vercel — tanpa konfigurasi
            tambahan (Next.js + Tailwind terdeteksi otomatis).
          </li>
          <li>
            Tanpa database dan tanpa login: aman dipakai di sekolah dengan koneksi
            terbatas karena semua data berupa file statis.
          </li>
        </ol>
      </Bagian>

      <Bagian judul="♿ Aksesibilitas &amp; Privasi">
        <ul className="list-disc space-y-1 pl-6">
          <li>Semua target sentuh minimal 44px; fokus keyboard terlihat jelas.</li>
          <li>Kontras warna memenuhi standar keterbacaan untuk proyektor.</li>
          <li>Animasi menghormati pengaturan <em>prefers-reduced-motion</em>.</li>
          <li>
            Tidak ada data pribadi yang dikirim ke mana pun: favorit, rencana, dan daftar
            nama hanya tersimpan di <em>localStorage</em> perangkat Anda.
          </li>
        </ul>
      </Bagian>
    </div>
  );
}
