import type { Metadata } from "next";
import { Baloo_2, Nunito } from "next/font/google";
import "./globals.css";
import { PengaturanProvider } from "@/lib/pengaturan";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const display = Baloo_2({ subsets: ["latin"], variable: "--font-display" });
const body = Nunito({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: {
    default: "MainIce — Media Pembelajaran Interaktif",
    template: "%s | MainIce",
  },
  description:
    "Kumpulan permainan ice breaking dan aktivitas belajar interaktif untuk guru, fasilitator, trainer, dan peserta. Tanpa login, ringan, siap diproyeksikan.",
};

// Skrip kecil agar mode gelap tidak "kedip" saat halaman dimuat
const skripGelap = `(function(){try{if(localStorage.getItem('mainice:gelap')==='1')document.documentElement.classList.add('dark')}catch(e){}})()`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: skripGelap }} />
      </head>
      <body
        className={`${display.variable} ${body.variable} flex min-h-screen flex-col`}
      >
        <PengaturanProvider>
          <Header />
          <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-16 pt-6 sm:px-6">
            {children}
          </main>
          <Footer />
        </PengaturanProvider>
      </body>
    </html>
  );
}
