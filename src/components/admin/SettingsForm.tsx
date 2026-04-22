"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { updateSiteSettings } from "@/lib/firestore";
import type { SiteSettings } from "@/types";

export default function SettingsForm({ settings }: { settings: SiteSettings | null }) {
  const [form, setForm] = useState({
    businessName: settings?.businessName || "Kuliner UMKM",
    tagline: settings?.tagline || "Sajian Lezat & Terjangkau",
    whatsappNumber: settings?.whatsappNumber || "6281234567890",
    address: settings?.address || "",
    openHours: settings?.openHours || "Senin - Minggu, 08.00 - 21.00",
    instagram: settings?.instagram || "",
    facebook: settings?.facebook || "",
  });
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const set = (key: string, val: string) => setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await updateSiteSettings(form);
    setLoading(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <div className="bg-white rounded-2xl border p-6 space-y-4">
        <h2 className="font-semibold text-gray-900">Informasi Bisnis</h2>

        {[
          { label: "Nama Bisnis", key: "businessName", placeholder: "Kuliner UMKM" },
          { label: "Tagline", key: "tagline", placeholder: "Sajian Lezat & Terjangkau" },
          { label: "No. WhatsApp (tanpa +)", key: "whatsappNumber", placeholder: "6281234567890" },
          { label: "Alamat", key: "address", placeholder: "Jl. Contoh No. 123, Kota Anda" },
          { label: "Jam Operasional", key: "openHours", placeholder: "Senin - Minggu, 08.00 - 21.00" },
        ].map((field) => (
          <div key={field.key}>
            <label className="text-sm font-medium text-gray-700">{field.label}</label>
            <input
              type="text"
              value={form[field.key as keyof typeof form]}
              onChange={(e) => set(field.key, e.target.value)}
              className="mt-1 w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder={field.placeholder}
            />
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border p-6 space-y-4">
        <h2 className="font-semibold text-gray-900">Media Sosial</h2>
        {[
          { label: "Instagram (username)", key: "instagram", placeholder: "@kulinerumkm" },
          { label: "Facebook (URL atau nama halaman)", key: "facebook", placeholder: "kulinerumkm" },
        ].map((field) => (
          <div key={field.key}>
            <label className="text-sm font-medium text-gray-700">{field.label}</label>
            <input
              type="text"
              value={form[field.key as keyof typeof form]}
              onChange={(e) => set(field.key, e.target.value)}
              className="mt-1 w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder={field.placeholder}
            />
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="flex items-center gap-2 rounded-full bg-orange-500 px-8 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-60 transition-colors"
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {saved ? "✓ Tersimpan!" : "Simpan Pengaturan"}
      </button>
    </form>
  );
}
