"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import { deleteMenu } from "@/lib/firestore";

interface Props {
  menuId: string;
  imagePublicId?: string;
}

export default function MenuAdminActions({ menuId, imagePublicId }: Props) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Hapus menu ini? Tindakan tidak bisa dibatalkan.")) return;
    if (imagePublicId) {
      await fetch("/api/upload/delete", { method: "DELETE", body: JSON.stringify({ publicId: imagePublicId }), headers: { "Content-Type": "application/json" } });
    }
    await deleteMenu(menuId);
    router.refresh();
  };

  return (
    <div className="flex items-center justify-end gap-2">
      <Link
        href={`/admin/menus/${menuId}`}
        className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
      >
        <Pencil className="h-3.5 w-3.5" /> Edit
      </Link>
      <button
        onClick={handleDelete}
        className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50 transition-colors"
      >
        <Trash2 className="h-3.5 w-3.5" /> Hapus
      </button>
    </div>
  );
}
