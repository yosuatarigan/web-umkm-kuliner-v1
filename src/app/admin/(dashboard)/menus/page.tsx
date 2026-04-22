import Link from "next/link";
import Image from "next/image";
import { Plus } from "lucide-react";
import { getMenus } from "@/lib/firestore";
import MenuAdminActions from "@/components/admin/MenuAdminActions";

export const revalidate = 0;

export default async function AdminMenusPage() {
  const menus = await getMenus().catch(() => []);

  const formatted = (val: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(val);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manajemen Menu</h1>
          <p className="text-gray-500 text-sm mt-1">{menus.length} menu terdaftar</p>
        </div>
        <Link
          href="/admin/menus/new"
          className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 transition-colors"
        >
          <Plus className="h-4 w-4" /> Tambah Menu
        </Link>
      </div>

      {menus.length === 0 ? (
        <div className="bg-white rounded-2xl border p-16 text-center text-gray-400">
          <p className="text-5xl mb-4">🍽️</p>
          <p className="font-medium">Belum ada menu</p>
          <Link href="/admin/menus/new" className="mt-4 inline-block text-sm text-orange-500 hover:text-orange-600 font-medium">
            + Tambah menu pertama
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                <tr>
                  <th className="px-6 py-3 text-left">Menu</th>
                  <th className="px-6 py-3 text-left">Kategori</th>
                  <th className="px-6 py-3 text-left">Harga</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {menus.map((menu) => (
                  <tr key={menu.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-12 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                          {menu.imageUrl ? (
                            <Image src={menu.imageUrl} alt={menu.name} fill className="object-cover" />
                          ) : (
                            <div className="flex h-full items-center justify-center text-xl">🍽️</div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{menu.name}</p>
                          <p className="text-gray-400 text-xs line-clamp-1">{menu.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="capitalize rounded-full bg-orange-50 px-2.5 py-1 text-xs font-medium text-orange-600">
                        {menu.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">{formatted(menu.price)}</td>
                    <td className="px-6 py-4">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${menu.isAvailable ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                        {menu.isAvailable ? "Tersedia" : "Nonaktif"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <MenuAdminActions menuId={menu.id} imagePublicId={menu.imagePublicId} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
