import { getTestimonials } from "@/lib/firestore";
import TestimonialActions from "@/components/admin/TestimonialActions";
import StarRating from "@/components/ui/StarRating";

export const revalidate = 0;

export default async function AdminTestimonialsPage() {
  const testimonials = await getTestimonials().catch(() => []);
  const pending = testimonials.filter((t) => !t.approved);
  const approved = testimonials.filter((t) => t.approved);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Manajemen Ulasan</h1>
        <p className="text-gray-500 text-sm mt-1">{pending.length} menunggu persetujuan</p>
      </div>

      {/* Pending */}
      {pending.length > 0 && (
        <div className="mb-8">
          <h2 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-yellow-400 inline-block" /> Menunggu Persetujuan ({pending.length})
          </h2>
          <div className="space-y-3">
            {pending.map((t) => (
              <div key={t.id} className="bg-white rounded-2xl border p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <p className="font-semibold text-gray-900">{t.customerName}</p>
                      <StarRating value={t.rating} readonly />
                    </div>
                    <p className="mt-2 text-sm text-gray-600">"{t.message}"</p>
                    <p className="mt-1 text-xs text-gray-400">{new Date(t.createdAt).toLocaleString("id-ID")}</p>
                  </div>
                  <TestimonialActions testimonialId={t.id} approved={t.approved} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Approved */}
      <div>
        <h2 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-green-400 inline-block" /> Disetujui ({approved.length})
        </h2>
        {approved.length === 0 ? (
          <div className="bg-white rounded-2xl border p-10 text-center text-gray-400">
            <p>Belum ada ulasan yang disetujui</p>
          </div>
        ) : (
          <div className="space-y-3">
            {approved.map((t) => (
              <div key={t.id} className="bg-white rounded-2xl border p-5 opacity-80">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <p className="font-semibold text-gray-900">{t.customerName}</p>
                      <StarRating value={t.rating} readonly />
                    </div>
                    <p className="mt-2 text-sm text-gray-600">"{t.message}"</p>
                  </div>
                  <TestimonialActions testimonialId={t.id} approved={t.approved} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
