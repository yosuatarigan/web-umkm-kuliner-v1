"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, Plus } from "lucide-react";
import { useState } from "react";
import type { Menu } from "@/types";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/components/ui/Toast";

interface Props {
  menu: Menu;
}

export default function MenuCard({ menu }: Props) {
  const { addItem } = useCart();
  const { showToast } = useToast();
  const [added, setAdded] = useState(false);

  const formatted = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(menu.price);

  const handleAdd = () => {
    if (!menu.isAvailable || added) return;
    addItem(menu);
    showToast("Ditambahkan ke keranjang!", menu.name);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="group relative rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <Link href={`/menu/${menu.id}`}>
        <div className="relative h-52 w-full overflow-hidden bg-gray-100">
          {menu.imageUrl ? (
            <Image
              src={menu.imageUrl}
              alt={menu.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-300 text-5xl">🍽️</div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          <span className="absolute top-3 left-3 rounded-full bg-white/90 backdrop-blur-sm px-2.5 py-1 text-xs font-semibold capitalize text-orange-600 shadow-sm">
            {menu.category}
          </span>

          {!menu.isAvailable && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-semibold text-sm bg-black/60 px-3 py-1.5 rounded-full">
                Tidak Tersedia
              </span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-5">
        <Link href={`/menu/${menu.id}`}>
          <h3 className="font-bold text-gray-900 hover:text-orange-500 transition-colors line-clamp-1 text-lg">
            {menu.name}
          </h3>
        </Link>
        <p className="mt-1.5 text-sm text-gray-500 line-clamp-2 leading-relaxed">{menu.description}</p>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400">Harga</p>
            <p className="text-lg font-bold text-gray-900">{formatted}</p>
          </div>
          <button
            onClick={handleAdd}
            disabled={!menu.isAvailable}
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-white transition-all duration-200 shadow-sm ${
              added
                ? "bg-green-500 scale-95"
                : "bg-orange-500 hover:bg-orange-600 shadow-orange-200"
            } disabled:opacity-40 disabled:cursor-not-allowed`}
          >
            {added ? (
              <><Check className="h-4 w-4" /> Ditambahkan</>
            ) : (
              <><Plus className="h-4 w-4" /> Pesan</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
