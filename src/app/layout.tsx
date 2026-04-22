import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kuliner UMKM — Sajian Lezat & Terjangkau",
  description: "Pesan makanan dan minuman lezat langsung dari dapur kami.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="antialiased">{children}</body>
    </html>
  );
}
