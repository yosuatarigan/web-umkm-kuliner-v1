import Link from "next/link";
import { MapPin, Phone, Clock, ChefHat } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500">
                <ChefHat className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">Warung Bu Sari</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Sajian masakan rumahan yang lezat dan autentik. Dibuat dengan bahan segar pilihan dan cinta setiap harinya.
            </p>
            <div className="mt-5 flex gap-3">
              <a href="#" aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 hover:bg-orange-500 hover:text-white transition-colors text-xs font-bold">
                IG
              </a>
              <a href="#" aria-label="Facebook" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 hover:bg-orange-500 hover:text-white transition-colors text-xs font-bold">
                FB
              </a>
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4 className="font-semibold text-white mb-4">Menu</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: "/menu", label: "Daftar Menu" },
                { href: "/about", label: "Tentang Kami" },
                { href: "/gallery", label: "Galeri" },
                { href: "/contact", label: "Kontak" },
                { href: "/cart", label: "Keranjang" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-orange-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-semibold text-white mb-4">Informasi</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-orange-400" />
                <span>Jl. Melati No. 12, Kebayoran Baru, Jakarta Selatan</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-orange-400" />
                <span>+62 812 3456 7890</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="h-4 w-4 mt-0.5 shrink-0 text-orange-400" />
                <span>Senin – Minggu<br />08.00 – 21.00 WIB</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
          <p>&copy; {new Date().getFullYear()} Warung Kuliner Bu Sari. All rights reserved.</p>
          <p>Dibuat dengan ❤️ untuk UMKM Indonesia</p>
        </div>
      </div>
    </footer>
  );
}
