"use client";

import { useState } from "react";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { createOrder } from "@/lib/firestore";

type OrderType = "delivery" | "pickup";

export default function CartPage() {
  const { items, removeItem, updateQty, clearCart, total } = useCart();
  const [form, setForm] = useState({
    customerName: "",
    customerPhone: "",
    type: "delivery" as OrderType,
    address: "",
    note: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const formatted = (val: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(val);

  const handleCheckout = async () => {
    if (!form.customerName || !form.customerPhone) return alert("Nama dan nomor HP wajib diisi.");
    if (form.type === "delivery" && !form.address) return alert("Alamat pengiriman wajib diisi.");
    if (items.length === 0) return alert("Keranjang masih kosong.");

    setLoading(true);
    try {
      await createOrder({
        customerName: form.customerName,
        customerPhone: form.customerPhone,
        items,
        total,
        note: form.note,
        type: form.type,
        address: form.type === "delivery" ? form.address : undefined,
        status: "pending",
      });

      // Build WhatsApp message
      const itemList = items
        .map((i) => `- ${i.menuName} x${i.quantity} = ${formatted(i.price * i.quantity)}`)
        .join("%0A");
      const msg = [
        `*Pesanan Baru*`,
        `Nama: ${form.customerName}`,
        `HP: ${form.customerPhone}`,
        `Tipe: ${form.type === "delivery" ? "Delivery" : "Pickup"}`,
        form.type === "delivery" ? `Alamat: ${form.address}` : "",
        ``,
        itemList,
        ``,
        `*Total: ${formatted(total)}*`,
        form.note ? `Catatan: ${form.note}` : "",
      ]
        .filter(Boolean)
        .join("%0A");

      clearCart();
      setSubmitted(true);

      window.open(`https://wa.me/6281234567890?text=${msg}`, "_blank");
    } catch {
      alert("Terjadi kesalahan, coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-6xl mb-4">✅</p>
          <h2 className="text-2xl font-bold text-gray-900">Pesanan Terkirim!</h2>
          <p className="mt-2 text-gray-500">Kami akan segera mengkonfirmasi pesanan Anda via WhatsApp.</p>
          <Link
            href="/menu"
            className="mt-6 inline-block rounded-full bg-orange-500 px-8 py-3 font-semibold text-white hover:bg-orange-600"
          >
            Pesan Lagi
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-6xl mb-4">🛒</p>
          <h2 className="text-xl font-bold text-gray-900">Keranjang Kosong</h2>
          <p className="mt-2 text-gray-500">Yuk pilih menu favorit Anda!</p>
          <Link
            href="/menu"
            className="mt-6 inline-block rounded-full bg-orange-500 px-8 py-3 font-semibold text-white hover:bg-orange-600"
          >
            Lihat Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <Link href="/menu" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-orange-500 mb-8">
          <ArrowLeft className="h-4 w-4" /> Kembali ke Menu
        </Link>

        <h1 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <ShoppingBag className="h-6 w-6 text-orange-500" /> Keranjang Belanja
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Items */}
          <div className="lg:col-span-3 space-y-4">
            {items.map((item) => (
              <div key={item.menuId} className="bg-white rounded-2xl border p-4 flex items-center gap-4">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{item.menuName}</p>
                  <p className="text-sm text-orange-500 mt-0.5">{formatted(item.price)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQty(item.menuId, item.quantity - 1)}
                    className="h-8 w-8 rounded-full border flex items-center justify-center hover:bg-gray-100"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => updateQty(item.menuId, item.quantity + 1)}
                    className="h-8 w-8 rounded-full border flex items-center justify-center hover:bg-gray-100"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <p className="w-24 text-right font-semibold text-gray-800">
                  {formatted(item.price * item.quantity)}
                </p>
                <button onClick={() => removeItem(item.menuId)} className="text-red-400 hover:text-red-600">
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Form & Summary */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-2xl border p-6 space-y-4">
              <h2 className="font-bold text-gray-900 text-lg">Detail Pesanan</h2>

              <div>
                <label className="text-sm font-medium text-gray-700">Nama Lengkap *</label>
                <input
                  type="text"
                  value={form.customerName}
                  onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="Masukkan nama Anda"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Nomor HP *</label>
                <input
                  type="tel"
                  value={form.customerPhone}
                  onChange={(e) => setForm({ ...form, customerPhone: e.target.value })}
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="08xxxxxxxxxx"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Tipe Pesanan *</label>
                <div className="mt-1 flex gap-3">
                  {(["delivery", "pickup"] as OrderType[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => setForm({ ...form, type: t })}
                      className={`flex-1 rounded-lg border py-2 text-sm font-medium transition-colors ${
                        form.type === t ? "border-orange-500 bg-orange-50 text-orange-600" : "text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      {t === "delivery" ? "🛵 Delivery" : "🏪 Pickup"}
                    </button>
                  ))}
                </div>
              </div>

              {form.type === "delivery" && (
                <div>
                  <label className="text-sm font-medium text-gray-700">Alamat Pengiriman *</label>
                  <textarea
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    rows={3}
                    className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
                    placeholder="Masukkan alamat lengkap"
                  />
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-gray-700">Catatan (opsional)</label>
                <textarea
                  value={form.note}
                  onChange={(e) => setForm({ ...form, note: e.target.value })}
                  rows={2}
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
                  placeholder="Contoh: tidak pedas, tanpa bawang"
                />
              </div>
            </div>

            {/* Total */}
            <div className="bg-white rounded-2xl border p-6">
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>Subtotal</span>
                <span>{formatted(total)}</span>
              </div>
              <div className="flex justify-between font-bold text-gray-900 text-lg border-t pt-3">
                <span>Total</span>
                <span>{formatted(total)}</span>
              </div>
              <button
                onClick={handleCheckout}
                disabled={loading}
                className="mt-4 w-full rounded-full bg-green-500 py-3 font-semibold text-white hover:bg-green-600 disabled:opacity-60 transition-colors"
              >
                {loading ? "Memproses..." : "Pesan via WhatsApp"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
