"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { createMenu, updateMenu } from "@/lib/firestore";
import ImageUpload from "@/components/ui/ImageUpload";
import { MENU_CATEGORIES } from "@/types";
import type { Menu } from "@/types";

interface Props {
  menu?: Menu;
}

export default function MenuForm({ menu }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: menu?.name || "",
    description: menu?.description || "",
    price: menu?.price?.toString() || "",
    category: menu?.category || "makanan",
    isAvailable: menu?.isAvailable ?? true,
    imageUrl: menu?.imageUrl || "",
    imagePublicId: menu?.imagePublicId || "",
  });

  const set = (key: string, val: string | boolean) => setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price) return;
    setLoading(true);
    try {
      const data = {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        category: form.category,
        isAvailable: form.isAvailable,
        imageUrl: form.imageUrl,
        imagePublicId: form.imagePublicId,
      };
      if (menu) {
        await updateMenu(menu.id, data);
      } else {
        await createMenu(data);
      }
      router.push("/admin/menus");
      router.refresh();
    } catch {
      alert("Terjadi kesalahan, coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      {/* Foto */}
      <div className="bg-white rounded-2xl border p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Foto Menu</h2>
        <ImageUpload
          value={form.imageUrl}
          folder="umkm-kuliner/menus"
          onChange={(url, publicId) => { set("imageUrl", url); set("imagePublicId", publicId); }}
          onRemove={() => { set("imageUrl", ""); set("imagePublicId", ""); }}
        />
      </div>

      {/* Info */}
      <div className="bg-white rounded-2xl border p-6 space-y-4">
        <h2 className="font-semibold text-gray-900 mb-2">Informasi Menu</h2>

        <div>
          <label className="text-sm font-medium text-gray-700">Nama Menu *</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            className="mt-1 w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Contoh: Nasi Goreng Spesial"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Deskripsi</label>
          <textarea
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            rows={3}
            className="mt-1 w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
            placeholder="Deskripsi singkat tentang menu ini"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Harga (Rp) *</label>
            <input
              type="number"
              required
              min={0}
              value={form.price}
              onChange={(e) => set("price", e.target.value)}
              className="mt-1 w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="15000"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Kategori *</label>
            <select
              value={form.category}
              onChange={(e) => set("category", e.target.value)}
              className="mt-1 w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
            >
              {MENU_CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => set("isAvailable", !form.isAvailable)}
            className={`relative inline-flex h-6 w-11 rounded-full transition-colors ${form.isAvailable ? "bg-orange-500" : "bg-gray-200"}`}
          >
            <span className={`inline-block h-5 w-5 mt-0.5 rounded-full bg-white shadow transition-transform ${form.isAvailable ? "translate-x-5" : "translate-x-0.5"}`} />
          </button>
          <span className="text-sm font-medium text-gray-700">
            {form.isAvailable ? "Tersedia" : "Tidak tersedia"}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-full border px-6 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
        >
          Batal
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 rounded-full bg-orange-500 px-8 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-60 transition-colors"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {menu ? "Simpan Perubahan" : "Tambah Menu"}
        </button>
      </div>
    </form>
  );
}
