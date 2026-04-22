import { getMenus, getOrders, getTestimonials } from "@/lib/firestore";
import { ShoppingBag, UtensilsCrossed, MessageSquare, TrendingUp } from "lucide-react";
import Link from "next/link";
import { ORDER_STATUS_LABELS } from "@/types";

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const [menus, orders, testimonials] = await Promise.all([
    getMenus().catch(() => []),
    getOrders().catch(() => []),
    getTestimonials().catch(() => []),
  ]);

  const pendingOrders = orders.filter((o) => o.status === "pending");
  const pendingTestimonials = testimonials.filter((t) => !t.approved);
  const todayOrders = orders.filter((o) => o.createdAt.startsWith(new Date().toISOString().slice(0, 10)));
  const todayRevenue = todayOrders.reduce((sum, o) => sum + o.total, 0);

  const formatted = (val: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(val);

  const stats = [
    { label: "Total Menu", value: menus.length, icon: UtensilsCrossed, color: "bg-blue-50 text-blue-600", href: "/admin/menus" },
    { label: "Pesanan Masuk", value: pendingOrders.length, icon: ShoppingBag, color: "bg-orange-50 text-orange-600", href: "/admin/orders" },
    { label: "Ulasan Pending", value: pendingTestimonials.length, icon: MessageSquare, color: "bg-purple-50 text-purple-600", href: "/admin/testimonials" },
    { label: "Revenue Hari Ini", value: formatted(todayRevenue), icon: TrendingUp, color: "bg-green-50 text-green-600", href: "/admin/orders" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="bg-white rounded-2xl border p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className={`rounded-xl p-3 ${s.color}`}>
              <s.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{s.label}</p>
              <p className="text-xl font-bold text-gray-900">{s.value}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl border overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="font-bold text-gray-900">Pesanan Terbaru</h2>
          <Link href="/admin/orders" className="text-sm text-orange-500 hover:text-orange-600 font-medium">
            Lihat Semua →
          </Link>
        </div>
        {orders.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <ShoppingBag className="h-10 w-10 mx-auto mb-2 opacity-30" />
            <p>Belum ada pesanan</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                <tr>
                  <th className="px-6 py-3 text-left">Pelanggan</th>
                  <th className="px-6 py-3 text-left">Total</th>
                  <th className="px-6 py-3 text-left">Tipe</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Tanggal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{order.customerName}</td>
                    <td className="px-6 py-4 text-gray-600">{formatted(order.total)}</td>
                    <td className="px-6 py-4">
                      <span className="capitalize">{order.type === "delivery" ? "🛵 Delivery" : "🏪 Pickup"}</span>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString("id-ID")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    pending: "bg-yellow-50 text-yellow-700",
    confirmed: "bg-blue-50 text-blue-700",
    process: "bg-orange-50 text-orange-700",
    ready: "bg-teal-50 text-teal-700",
    done: "bg-green-50 text-green-700",
    cancelled: "bg-red-50 text-red-700",
  };
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${colors[status] || "bg-gray-100 text-gray-600"}`}>
      {ORDER_STATUS_LABELS[status as keyof typeof ORDER_STATUS_LABELS] || status}
    </span>
  );
}
