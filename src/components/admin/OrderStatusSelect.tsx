"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateOrderStatus } from "@/lib/firestore";
import { ORDER_STATUS_LABELS } from "@/types";
import type { Order } from "@/types";

const statusOrder: Order["status"][] = ["pending", "confirmed", "process", "ready", "done", "cancelled"];

export default function OrderStatusSelect({ orderId, currentStatus }: { orderId: string; currentStatus: Order["status"] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLoading(true);
    await updateOrderStatus(orderId, e.target.value as Order["status"]);
    router.refresh();
    setLoading(false);
  };

  return (
    <select
      value={currentStatus}
      onChange={handleChange}
      disabled={loading}
      className="rounded-lg border px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white disabled:opacity-60"
    >
      {statusOrder.map((s) => (
        <option key={s} value={s}>{ORDER_STATUS_LABELS[s]}</option>
      ))}
    </select>
  );
}
