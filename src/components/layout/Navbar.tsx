"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, ChefHat } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "Tentang" },
  { href: "/gallery", label: "Galeri" },
  { href: "/contact", label: "Kontak" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalItems } = useCart();
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const transparent = isHome && !scrolled && !isOpen;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${transparent ? "bg-transparent" : "bg-white shadow-sm"}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500">
              <ChefHat className="h-5 w-5 text-white" />
            </div>
            <span className={`text-lg font-bold transition-colors ${transparent ? "text-white" : "text-gray-900"}`}>
              Warung Bu Sari
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "bg-orange-500 text-white"
                    : transparent
                    ? "text-white/90 hover:text-white hover:bg-white/10"
                    : "text-gray-600 hover:text-orange-500 hover:bg-orange-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link href="/cart" className="relative">
              <div className={`p-2 rounded-full transition-colors ${transparent ? "hover:bg-white/10" : "hover:bg-gray-100"}`}>
                <ShoppingCart className={`h-5 w-5 ${transparent ? "text-white" : "text-gray-600"}`} />
              </div>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-full md:hidden transition-colors ${transparent ? "hover:bg-white/10" : "hover:bg-gray-100"}`}
            >
              {isOpen
                ? <X className={`h-5 w-5 ${transparent ? "text-white" : "text-gray-600"}`} />
                : <Menu className={`h-5 w-5 ${transparent ? "text-white" : "text-gray-600"}`} />
              }
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden bg-white rounded-2xl mb-3 shadow-lg border overflow-hidden">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-5 py-3 text-sm font-medium border-b last:border-0 transition-colors ${
                  pathname === link.href ? "text-orange-500 bg-orange-50" : "text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
