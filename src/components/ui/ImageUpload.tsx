"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, Loader2 } from "lucide-react";

interface Props {
  value?: string;
  onChange: (url: string, publicId: string) => void;
  onRemove?: () => void;
  folder?: string;
}

export default function ImageUpload({ value, onChange, onRemove, folder = "umkm-kuliner" }: Props) {
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setLoading(true);
    const form = new FormData();
    form.append("file", file);
    form.append("folder", folder);
    const res = await fetch("/api/upload", { method: "POST", body: form });
    const data = await res.json();
    setLoading(false);
    if (data.url) onChange(data.url, data.publicId);
  };

  return (
    <div className="space-y-2">
      {value ? (
        <div className="relative w-full h-48 rounded-lg overflow-hidden border">
          <Image src={value} alt="Preview" fill className="object-cover" />
          {onRemove && (
            <button
              type="button"
              onClick={onRemove}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={loading}
          className="flex w-full flex-col items-center justify-center h-48 rounded-lg border-2 border-dashed border-gray-300 hover:border-orange-400 transition-colors bg-gray-50"
        >
          {loading ? (
            <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
          ) : (
            <>
              <Upload className="h-8 w-8 text-gray-400" />
              <span className="mt-2 text-sm text-gray-500">Klik untuk upload gambar</span>
              <span className="text-xs text-gray-400">PNG, JPG, WEBP maks. 5MB</span>
            </>
          )}
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
      />
    </div>
  );
}
