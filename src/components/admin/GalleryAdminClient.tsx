"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Trash2, Loader2, Upload } from "lucide-react";
import { addGalleryItem, deleteGalleryItem } from "@/lib/firestore";
import type { GalleryItem } from "@/types";

export default function GalleryAdminClient({ gallery }: { gallery: GalleryItem[] }) {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [caption, setCaption] = useState("");

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const form = new FormData();
    form.append("file", file);
    form.append("folder", "umkm-kuliner/gallery");
    const res = await fetch("/api/upload", { method: "POST", body: form });
    const data = await res.json();
    if (data.url) {
      await addGalleryItem({ imageUrl: data.url, imagePublicId: data.publicId, caption });
      setCaption("");
      router.refresh();
    }
    setUploading(false);
    e.target.value = "";
  };

  const handleDelete = async (item: GalleryItem) => {
    if (!confirm("Hapus foto ini?")) return;
    await fetch("/api/upload/delete", { method: "DELETE", body: JSON.stringify({ publicId: item.imagePublicId }), headers: { "Content-Type": "application/json" } });
    await deleteGalleryItem(item.id);
    router.refresh();
  };

  return (
    <div className="space-y-6">
      {/* Upload */}
      <div className="bg-white rounded-2xl border p-6 flex flex-col sm:flex-row gap-4 items-end">
        <div className="flex-1">
          <label className="text-sm font-medium text-gray-700">Caption (opsional)</label>
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="mt-1 w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Deskripsi foto..."
          />
        </div>
        <label className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white cursor-pointer transition-colors ${uploading ? "bg-orange-300 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"}`}>
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          {uploading ? "Mengupload..." : "Upload Foto"}
          <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading} />
        </label>
      </div>

      {/* Grid */}
      {gallery.length === 0 ? (
        <div className="bg-white rounded-2xl border p-16 text-center text-gray-400">
          <p className="text-5xl mb-4">📷</p>
          <p className="font-medium">Belum ada foto di galeri</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {gallery.map((item) => (
            <div key={item.id} className="group relative rounded-2xl overflow-hidden border bg-gray-100 aspect-square">
              <Image src={item.imageUrl} alt={item.caption || "Galeri"} fill className="object-cover" />
              {item.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                  <p className="text-white text-xs">{item.caption}</p>
                </div>
              )}
              <button
                onClick={() => handleDelete(item)}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-red-500 text-white rounded-full p-1.5 transition-opacity hover:bg-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
