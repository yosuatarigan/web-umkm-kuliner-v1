import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, ChevronRight } from "lucide-react";
import { getAvailableMenus, getTestimonials } from "@/lib/firestore";
import MenuCard from "@/components/public/MenuCard";
import StarRating from "@/components/ui/StarRating";

export const revalidate = 60;

const CATEGORIES = [
  { label: "Makanan", value: "makanan", emoji: "🍽️", color: "bg-orange-50 text-orange-600 border-orange-100" },
  { label: "Minuman", value: "minuman", emoji: "🥤", color: "bg-blue-50 text-blue-600 border-blue-100" },
  { label: "Snack", value: "snack", emoji: "🍿", color: "bg-yellow-50 text-yellow-600 border-yellow-100" },
  { label: "Paket", value: "paket", emoji: "📦", color: "bg-green-50 text-green-600 border-green-100" },
];

export default async function HomePage() {
  const [menus, testimonials] = await Promise.all([
    getAvailableMenus().catch(() => []),
    getTestimonials(true).catch(() => []),
  ]);

  const featured = menus.slice(0, 6);
  const featuredTestimonials = testimonials.slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative h-screen min-h-[600px] flex items-center">
        <Image
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&q=85&auto=format&fit=crop"
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-transparent" />

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-orange-500/20 border border-orange-400/30 px-4 py-1.5 text-sm font-medium text-orange-300 backdrop-blur-sm mb-6">
              <span className="h-2 w-2 rounded-full bg-orange-400 animate-pulse" />
              Buka Setiap Hari 08.00 – 21.00
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Masakan
              <span className="block text-orange-400">Rumahan</span>
              Terbaik
            </h1>
            <p className="mt-5 text-lg text-gray-300 leading-relaxed max-w-xl">
              Dibuat dengan bahan segar pilihan setiap hari. Cita rasa autentik yang selalu bikin kangen dan harga yang bersahabat.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-8 py-3.5 font-semibold text-white hover:bg-orange-400 transition-colors shadow-lg shadow-orange-500/30"
              >
                Pesan Sekarang <ArrowRight className="h-5 w-5" />
              </Link>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm px-8 py-3.5 font-semibold text-white hover:bg-white/20 transition-colors"
              >
                Chat WhatsApp
              </a>
            </div>

            <div className="mt-12 flex flex-wrap gap-6">
              {[
                { icon: "⭐", text: "4.9/5 Rating" },
                { icon: "🚴", text: "Delivery & Pickup" },
                { icon: "🥘", text: "14+ Menu Pilihan" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2 text-gray-300">
                  <span>{item.icon}</span>
                  <span className="text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/50">
          <span className="text-xs">Scroll</span>
          <div className="h-8 w-5 rounded-full border border-white/30 flex items-start justify-center p-1">
            <div className="h-1.5 w-1 rounded-full bg-white/50 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Category Shortcuts */}
      <section className="py-12 px-4 bg-white">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.value}
                href={`/menu?category=${cat.value}`}
                className={`flex items-center gap-3 rounded-2xl border p-4 hover:shadow-md transition-all hover:-translate-y-0.5 ${cat.color}`}
              >
                <span className="text-3xl">{cat.emoji}</span>
                <div>
                  <p className="font-semibold text-sm">{cat.label}</p>
                  <p className="text-xs opacity-70 flex items-center gap-0.5 mt-0.5">
                    Lihat menu <ChevronRight className="h-3 w-3" />
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Menu */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-sm font-semibold text-orange-500 uppercase tracking-widest mb-2">Menu Pilihan</p>
              <h2 className="text-3xl font-bold text-gray-900">Yang Paling Disukai</h2>
            </div>
            <Link href="/menu" className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-orange-500 hover:text-orange-600 group">
              Semua Menu <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {featured.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((menu) => (
                <MenuCard key={menu.id} menu={menu} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-400">
              <p className="text-5xl mb-4">🍽️</p>
              <p className="text-lg font-medium">Menu akan segera hadir</p>
            </div>
          )}
        </div>
      </section>

      {/* Promo Banner */}
      <section className="py-16 px-4 bg-white">
        <div className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500 to-amber-500 p-10 md:p-14">
            <div className="absolute right-0 top-0 h-full w-1/2 opacity-20">
              <Image
                src="https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&q=80&auto=format&fit=crop"
                alt=""
                fill
                className="object-cover"
              />
            </div>
            <div className="relative z-10 max-w-lg">
              <span className="inline-block rounded-full bg-white/20 px-4 py-1 text-sm font-medium text-white mb-4">
                Promo Spesial
              </span>
              <h2 className="text-3xl font-bold text-white">Paket Keluarga<br />Lebih Hemat!</h2>
              <p className="mt-3 text-orange-100">
                Nikmati paket makan bersama keluarga dengan harga spesial. Cocok untuk momen kebersamaan yang berkesan.
              </p>
              <Link
                href="/menu?category=paket"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-orange-500 hover:bg-orange-50 transition-colors"
              >
                Lihat Paket <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-orange-500 uppercase tracking-widest mb-2">Keunggulan Kami</p>
            <h2 className="text-3xl font-bold text-gray-900">Mengapa Pilih Kami?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80&auto=format&fit=crop",
                emoji: "🥗",
                title: "Bahan Segar Pilihan",
                desc: "Kami belanja ke pasar setiap pagi untuk memastikan semua bahan dalam kondisi terbaik dan segar.",
              },
              {
                img: "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=600&q=80&auto=format&fit=crop",
                emoji: "🚴",
                title: "Pengiriman Cepat",
                desc: "Pesanan Anda tiba dalam 30–60 menit sejak dikonfirmasi, masih panas dan terjaga kualitasnya.",
              },
              {
                img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80&auto=format&fit=crop",
                emoji: "💰",
                title: "Harga Bersahabat",
                desc: "Kualitas makanan rumahan premium dengan harga yang dapat dijangkau semua kalangan.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl overflow-hidden border hover:shadow-lg transition-shadow">
                <div className="relative h-44">
                  <Image src={item.img} alt={item.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className="absolute bottom-3 left-4 text-3xl">{item.emoji}</span>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 text-lg">{item.title}</h3>
                  <p className="mt-2 text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {featuredTestimonials.length > 0 && (
        <section className="py-16 px-4 bg-white">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <p className="text-sm font-semibold text-orange-500 uppercase tracking-widest mb-2">Ulasan Pelanggan</p>
              <h2 className="text-3xl font-bold text-gray-900">Kata Mereka</h2>
              <div className="flex items-center justify-center gap-2 mt-3">
                <div className="flex">
                  {[1,2,3,4,5].map((s) => <Star key={s} className="h-5 w-5 fill-yellow-400 text-yellow-400" />)}
                </div>
                <span className="text-gray-500 text-sm">4.9 dari 5 bintang</span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {featuredTestimonials.map((t, i) => (
                <div key={t.id} className={`rounded-2xl p-6 border ${i === 1 ? "bg-orange-500 border-orange-500" : "bg-white"}`}>
                  <StarRating value={t.rating} readonly />
                  <p className={`mt-4 text-sm leading-relaxed ${i === 1 ? "text-orange-100" : "text-gray-600"}`}>
                    "{t.message}"
                  </p>
                  <div className="mt-5 flex items-center gap-3">
                    <div className={`h-9 w-9 rounded-full flex items-center justify-center font-bold text-sm ${i === 1 ? "bg-white/20 text-white" : "bg-orange-100 text-orange-600"}`}>
                      {t.customerName.charAt(0)}
                    </div>
                    <div>
                      <p className={`font-semibold text-sm ${i === 1 ? "text-white" : "text-gray-900"}`}>{t.customerName}</p>
                      <p className={`text-xs ${i === 1 ? "text-orange-200" : "text-gray-400"}`}>Pelanggan setia</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="relative py-24 px-4 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80&auto=format&fit=crop"
          alt="CTA background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold text-white">Lapar? Kami Siap!</h2>
          <p className="mt-4 text-gray-300 text-lg">
            Pesan sekarang dan nikmati masakan rumahan yang lezat diantar langsung ke pintu Anda.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link
              href="/menu"
              className="rounded-full bg-orange-500 px-10 py-4 font-bold text-white hover:bg-orange-400 transition-colors shadow-xl shadow-orange-500/30"
            >
              Pesan Sekarang
            </Link>
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-green-500 px-10 py-4 font-bold text-white hover:bg-green-400 transition-colors"
            >
              WhatsApp Kami
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
