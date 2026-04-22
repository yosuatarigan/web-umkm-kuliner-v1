import { getGallery } from "@/lib/firestore";
import GalleryAdminClient from "@/components/admin/GalleryAdminClient";

export const revalidate = 0;

export default async function AdminGalleryPage() {
  const gallery = await getGallery().catch(() => []);
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Manajemen Galeri</h1>
        <p className="text-gray-500 text-sm mt-1">{gallery.length} foto tersimpan</p>
      </div>
      <GalleryAdminClient gallery={gallery} />
    </div>
  );
}
