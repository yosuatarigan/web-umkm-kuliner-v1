"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Plus } from "lucide-react";
import type { Menu } from "@/types";
import { useCart } from "@/hooks/useCart";

interface Props {
  menu: Menu;
}

export default function MenuCard({ menu }: Props) {
  const { addItem } = useCart();

  const formatted = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(menu.price);

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
            onClick={() => menu.isAvailable && addItem(menu)}
            disabled={!menu.isAvailable}
            className="flex items-center gap-1.5 rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm shadow-orange-200"
          >
            <Plus className="h-4 w-4" /> Pesan
          </button>
        </div>
      </div>
    </div>
  );
}
