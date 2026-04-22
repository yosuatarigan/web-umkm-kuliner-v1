import { getOrders } from "@/lib/firestore";
import { ORDER_STATUS_LABELS } from "@/types";
import OrderStatusSelect from "@/components/admin/OrderStatusSelect";

export const revalidate = 0;

export default async function AdminOrdersPage() {
  const orders = await getOrders().catch(() => []);

  const formatted = (val: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(val);

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-50 text-yellow-700",
    confirmed: "bg-blue-50 text-blue-700",
    process: "bg-orange-50 text-orange-700",
    ready: "bg-teal-50 text-teal-700",
    done: "bg-green-50 text-green-700",
    cancelled: "bg-red-50 text-red-700",
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Manajemen Pesanan</h1>
        <p className="text-gray-500 text-sm mt-1">{orders.length} total pesanan</p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl border p-16 text-center text-gray-400">
          <p className="text-5xl mb-4">📦</p>
          <p className="font-medium">Belum ada pesanan masuk</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-2xl border p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-gray-900">{order.customerName}</h3>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[order.status] || "bg-gray-100 text-gray-600"}`}>
                      {ORDER_STATUS_LABELS[order.status]}
                    </span>
                    <span className="text-xs text-gray-400">
                      {order.type === "delivery" ? "🛵 Delivery" : "🏪 Pickup"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{order.customerPhone}</p>
                  {order.address && <p className="text-sm text-gray-500">📍 {order.address}</p>}
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{formatted(order.total)}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {new Date(order.createdAt).toLocaleString("id-ID")}
                  </p>
                </div>
              </div>

              {/* Items */}
              <div className="mt-4 bg-gray-50 rounded-xl p-3 space-y-1.5">
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-gray-700">{item.menuName} <span className="text-gray-400">x{item.quantity}</span></span>
                    <span className="font-medium text-gray-900">{formatted(item.price * item.quantity)}</span>
                  </div>
                ))}
                {order.note && (
                  <p className="text-xs text-gray-500 pt-1 border-t mt-2">📝 {order.note}</p>
                )}
              </div>

              {/* Update Status */}
              <div className="mt-4 flex items-center gap-3">
                <span className="text-sm text-gray-500 font-medium">Update Status:</span>
                <OrderStatusSelect orderId={order.id} currentStatus={order.status} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
