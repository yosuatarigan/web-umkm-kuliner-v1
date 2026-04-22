import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { getMenuById, getAvailableMenus } from "@/lib/firestore";
import AddToCartButton from "@/components/public/AddToCartButton";

export const revalidate = 60;

export async function generateStaticParams() {
  const menus = await getAvailableMenus().catch(() => []);
  return menus.map((m) => ({ id: m.id }));
}

export default async function MenuDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const menu = await getMenuById(id).catch(() => null);
  if (!menu) notFound();

  const formatted = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(menu.price);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-orange-500 transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" /> Kembali ke Menu
        </Link>

        <div className="bg-white rounded-2xl overflow-hidden border shadow-sm">
          <div className="md:flex">
            {/* Image */}
            <div className="relative h-72 md:h-auto md:w-1/2 bg-gray-100">
              {menu.imageUrl ? (
                <Image
                  src={menu.imageUrl}
                  alt={menu.name}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="flex h-full items-center justify-center text-6xl">🍽️</div>
              )}
              {!menu.isAvailable && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white font-semibold bg-black/60 px-4 py-2 rounded-full">
                    Tidak Tersedia
                  </span>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-8 md:w-1/2 flex flex-col justify-between">
              <div>
                <span className="inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-medium uppercase tracking-wide text-orange-600">
                  {menu.category}
                </span>
                <h1 className="mt-3 text-2xl font-bold text-gray-900">{menu.name}</h1>
                <p className="mt-3 text-gray-500 leading-relaxed">{menu.description}</p>
              </div>

              <div className="mt-8">
                <p className="text-3xl font-bold text-gray-900">{formatted}</p>
                <div className="mt-4">
                  {menu.isAvailable ? (
                    <AddToCartButton menu={menu} />
                  ) : (
                    <button
                      disabled
                      className="w-full flex items-center justify-center gap-2 rounded-full bg-gray-200 px-6 py-3 font-semibold text-gray-400 cursor-not-allowed"
                    >
                      <ShoppingCart className="h-5 w-5" />
                      Tidak Tersedia
                    </button>
                  )}
                </div>
                <Link
                  href="/cart"
                  className="mt-3 block text-center text-sm text-orange-500 hover:text-orange-600 font-medium"
                >
                  Lihat Keranjang →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
