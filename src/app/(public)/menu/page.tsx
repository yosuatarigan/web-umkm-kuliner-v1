"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { getAvailableMenus } from "@/lib/firestore";
import MenuCard from "@/components/public/MenuCard";
import type { Menu } from "@/types";
import { MENU_CATEGORIES } from "@/types";

export default function MenuPage() {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [filtered, setFiltered] = useState<Menu[]>([]);
  const [category, setCategory] = useState("semua");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAvailableMenus()
      .then((data) => {
        setMenus(data);
        setFiltered(data);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let result = menus;
    if (category !== "semua") result = result.filter((m) => m.category === category);
    if (search) result = result.filter((m) => m.name.toLowerCase().includes(search.toLowerCase()));
    setFiltered(result);
  }, [category, search, menus]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <h1 className="text-3xl font-bold text-gray-900">Menu Kami</h1>
          <p className="mt-2 text-gray-500">Temukan makanan & minuman favorit Anda</p>

          {/* Search */}
          <div className="mt-6 relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari menu..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-gray-50"
            />
          </div>

          {/* Category Filter */}
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => setCategory("semua")}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                category === "semua"
                  ? "bg-orange-500 text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-orange-300"
              }`}
            >
              Semua
            </button>
            {MENU_CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  category === cat.value
                    ? "bg-orange-500 text-white"
                    : "bg-white border border-gray-200 text-gray-600 hover:border-orange-300"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-6xl px-4 py-10">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-2xl bg-white border h-72 animate-pulse" />
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <>
            <p className="text-sm text-gray-500 mb-6">{filtered.length} menu ditemukan</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((menu) => (
                <MenuCard key={menu.id} menu={menu} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <p className="text-5xl mb-4">🍽️</p>
            <p className="text-lg font-medium">Menu tidak ditemukan</p>
            <p className="text-sm mt-1">Coba kata kunci lain atau pilih kategori berbeda</p>
          </div>
        )}
      </div>
    </div>
  );
}
