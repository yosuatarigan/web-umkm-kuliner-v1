"use client";

import { useRouter } from "next/navigation";
import { Check, X, Trash2 } from "lucide-react";
import { updateTestimonialApproval, deleteTestimonial } from "@/lib/firestore";

interface Props {
  testimonialId: string;
  approved: boolean;
}

export default function TestimonialActions({ testimonialId, approved }: Props) {
  const router = useRouter();

  const handleApprove = async () => {
    await updateTestimonialApproval(testimonialId, true);
    router.refresh();
  };

  const handleReject = async () => {
    await updateTestimonialApproval(testimonialId, false);
    router.refresh();
  };

  const handleDelete = async () => {
    if (!confirm("Hapus ulasan ini?")) return;
    await deleteTestimonial(testimonialId);
    router.refresh();
  };

  return (
    <div className="flex items-center gap-2 shrink-0">
      {!approved && (
        <button
          onClick={handleApprove}
          className="flex items-center gap-1 rounded-lg bg-green-50 border border-green-200 px-3 py-1.5 text-xs font-medium text-green-600 hover:bg-green-100 transition-colors"
        >
          <Check className="h-3.5 w-3.5" /> Setujui
        </button>
      )}
      {approved && (
        <button
          onClick={handleReject}
          className="flex items-center gap-1 rounded-lg bg-yellow-50 border border-yellow-200 px-3 py-1.5 text-xs font-medium text-yellow-600 hover:bg-yellow-100 transition-colors"
        >
          <X className="h-3.5 w-3.5" /> Batalkan
        </button>
      )}
      <button
        onClick={handleDelete}
        className="flex items-center gap-1 rounded-lg bg-red-50 border border-red-200 px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-100 transition-colors"
      >
        <Trash2 className="h-3.5 w-3.5" /> Hapus
      </button>
    </div>
  );
}
