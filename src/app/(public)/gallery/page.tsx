import Image from "next/image";
import { getGallery } from "@/lib/firestore";

export const revalidate = 60;

export default async function GalleryPage() {
  const gallery = await getGallery().catch(() => []);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-orange-50 to-amber-50 py-20 px-4 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold text-gray-900">Galeri Kami</h1>
          <p className="mt-4 text-lg text-gray-600">
            Sekilas momen di dapur dan sajian terbaik kami
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 px-4">
        <div className="mx-auto max-w-6xl">
          {gallery.length > 0 ? (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {gallery.map((item) => (
                <div key={item.id} className="break-inside-avoid rounded-2xl overflow-hidden border shadow-sm group">
                  <div className="relative">
                    <Image
                      src={item.imageUrl}
                      alt={item.caption || "Galeri"}
                      width={600}
                      height={400}
                      className="w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {item.caption && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-white text-sm">{item.caption}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-400">
              <p className="text-5xl mb-4">📷</p>
              <p className="text-lg font-medium">Galeri akan segera hadir</p>
              <p className="text-sm mt-1">Foto-foto lezat sedang dalam proses</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
