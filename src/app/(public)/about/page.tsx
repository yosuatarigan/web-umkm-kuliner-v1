import Image from "next/image";
import { Heart, Award, Users, Clock } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col pt-16">
      {/* Hero */}
      <section className="relative h-72 flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&q=80&auto=format&fit=crop"
          alt="About hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 text-center">
          <p className="text-orange-300 text-sm font-semibold uppercase tracking-widest mb-2">Tentang Kami</p>
          <h1 className="text-4xl font-bold text-white">Cerita di Balik Dapur Kami</h1>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 px-4 bg-white">
        <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          <div className="relative">
            <div className="relative h-96 rounded-3xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&q=80&auto=format&fit=crop"
                alt="Dapur kami"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -right-5 bg-orange-500 text-white rounded-2xl p-5 shadow-lg">
              <p className="text-3xl font-bold">4+</p>
              <p className="text-sm text-orange-100">Tahun Melayani</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-orange-500 uppercase tracking-widest mb-3">Kisah Kami</p>
            <h2 className="text-3xl font-bold text-gray-900 leading-snug">
              Dari Dapur Kecil Menuju Ratusan Pelanggan
            </h2>
            <p className="mt-5 text-gray-500 leading-relaxed">
              Warung Bu Sari berawal dari dapur kecil di rumah pada tahun 2020. Dengan modal semangat dan cinta memasak, Bu Sari mulai menerima pesanan dari tetangga dan kerabat.
            </p>
            <p className="mt-3 text-gray-500 leading-relaxed">
              Kini kami telah melayani lebih dari 500 pelanggan setia dengan menu yang terus berkembang. Setiap hidangan dibuat dengan bahan-bahan segar yang dibeli langsung dari pasar setiap pagi.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { label: "Pelanggan Setia", value: "500+" },
                { label: "Menu Tersedia", value: "14+" },
                { label: "Rating Rata-rata", value: "4.9★" },
                { label: "Pesanan per Bulan", value: "200+" },
              ].map((s) => (
                <div key={s.label} className="bg-gray-50 rounded-2xl p-4 border">
                  <p className="text-2xl font-bold text-orange-500">{s.value}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="py-16 px-4 bg-orange-500">
        <div className="mx-auto max-w-5xl grid grid-cols-2 sm:grid-cols-4 gap-8 text-center text-white">
          {[
            { icon: <Users className="h-7 w-7 mx-auto" />, value: "500+", label: "Pelanggan Setia" },
            { icon: <Award className="h-7 w-7 mx-auto" />, value: "4.9★", label: "Rating Rata-rata" },
            { icon: <Clock className="h-7 w-7 mx-auto" />, value: "4+", label: "Tahun Pengalaman" },
            { icon: <Heart className="h-7 w-7 mx-auto" />, value: "14+", label: "Varian Menu" },
          ].map((stat) => (
            <div key={stat.label}>
              {stat.icon}
              <p className="mt-2 text-3xl font-bold">{stat.value}</p>
              <p className="text-orange-100 text-sm mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 bg-white">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-orange-500 uppercase tracking-widest mb-2">Komitmen Kami</p>
            <h2 className="text-3xl font-bold text-gray-900">Nilai yang Kami Pegang</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80&auto=format&fit=crop",
                emoji: "🥗",
                title: "Bahan Selalu Segar",
                desc: "Tidak ada bahan yang disimpan lebih dari sehari. Kami belanja setiap pagi untuk menjaga kualitas terbaik.",
              },
              {
                img: "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=600&q=80&auto=format&fit=crop",
                emoji: "🧼",
                title: "Kebersihan Terjaga",
                desc: "Dapur kami selalu bersih dan terjaga sanitasinya sesuai standar keamanan pangan yang berlaku.",
              },
              {
                img: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600&q=80&auto=format&fit=crop",
                emoji: "💛",
                title: "Dibuat dengan Cinta",
                desc: "Setiap masakan kami kerjakan dengan sepenuh hati karena kepuasan Anda adalah kebahagiaan kami.",
              },
            ].map((val) => (
              <div key={val.title} className="rounded-2xl overflow-hidden border hover:shadow-lg transition-shadow">
                <div className="relative h-44">
                  <Image src={val.img} alt={val.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className="absolute bottom-3 left-4 text-3xl">{val.emoji}</span>
                </div>
                <div className="p-5 bg-white">
                  <h3 className="font-bold text-gray-900">{val.title}</h3>
                  <p className="mt-2 text-sm text-gray-500 leading-relaxed">{val.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
