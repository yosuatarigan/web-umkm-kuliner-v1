"use client";

import { useState } from "react";
import { MapPin, Phone, Clock, MessageCircle } from "lucide-react";
import { createTestimonial } from "@/lib/firestore";
import StarRating from "@/components/ui/StarRating";

export default function ContactPage() {
  const [form, setForm] = useState({ customerName: "", rating: 5, message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.customerName || !form.message) return;
    setLoading(true);
    try {
      await createTestimonial({ customerName: form.customerName, rating: form.rating, message: form.message, approved: false });
      setSubmitted(true);
    } catch {
      alert("Gagal mengirim ulasan, coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-orange-50 to-amber-50 py-20 px-4 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold text-gray-900">Hubungi Kami</h1>
          <p className="mt-4 text-lg text-gray-600">
            Kami siap melayani Anda — hubungi kami kapan saja!
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Informasi Kontak</h2>
            <div className="space-y-5">
              {[
                { icon: <MapPin className="h-5 w-5 text-orange-500 shrink-0" />, label: "Alamat", value: "Jl. Contoh No. 123, Kota Anda" },
                { icon: <Phone className="h-5 w-5 text-orange-500 shrink-0" />, label: "Telepon / WhatsApp", value: "+62 812 3456 7890" },
                { icon: <Clock className="h-5 w-5 text-orange-500 shrink-0" />, label: "Jam Buka", value: "Senin – Minggu, 08.00 – 21.00 WIB" },
              ].map((info) => (
                <div key={info.label} className="flex items-start gap-3">
                  {info.icon}
                  <div>
                    <p className="text-sm text-gray-500">{info.label}</p>
                    <p className="font-medium text-gray-800">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-green-500 px-6 py-3 font-semibold text-white hover:bg-green-600 transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              Chat via WhatsApp
            </a>

            {/* Maps placeholder */}
            <div className="mt-8 rounded-2xl overflow-hidden border bg-gray-100 h-48 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <MapPin className="h-8 w-8 mx-auto mb-2" />
                <p className="text-sm">Google Maps embed di sini</p>
              </div>
            </div>
          </div>

          {/* Testimonial Form */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Kirim Ulasan</h2>
            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                <p className="text-4xl mb-3">🙏</p>
                <h3 className="font-bold text-green-800">Terima Kasih!</h3>
                <p className="mt-2 text-sm text-green-600">
                  Ulasan Anda akan kami tampilkan setelah ditinjau.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl border p-6 space-y-4 shadow-sm">
                <div>
                  <label className="text-sm font-medium text-gray-700">Nama Anda *</label>
                  <input
                    type="text"
                    value={form.customerName}
                    onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                    required
                    className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                    placeholder="Masukkan nama Anda"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Rating *</label>
                  <div className="mt-2">
                    <StarRating value={form.rating} onChange={(v) => setForm({ ...form, rating: v })} />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Ulasan *</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    rows={4}
                    className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
                    placeholder="Ceritakan pengalaman Anda..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-full bg-orange-500 py-3 font-semibold text-white hover:bg-orange-600 disabled:opacity-60 transition-colors"
                >
                  {loading ? "Mengirim..." : "Kirim Ulasan"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
