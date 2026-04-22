"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import type { Menu } from "@/types";

export default function AddToCartButton({ menu }: { menu: Menu }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(menu);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <button
      onClick={handleAdd}
      className={`w-full flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold text-white transition-all ${
        added ? "bg-green-500" : "bg-orange-500 hover:bg-orange-600"
      }`}
    >
      {added ? (
        <>
          <Check className="h-5 w-5" /> Ditambahkan!
        </>
      ) : (
        <>
          <ShoppingCart className="h-5 w-5" /> Tambah ke Keranjang
        </>
      )}
    </button>
  );
}
