import { NextResponse } from "next/server";
import { collection, addDoc, doc, setDoc, getDocs, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?w=800&q=80&auto=format&fit=crop`;

const sampleMenus = [
  // Makanan
  {
    name: "Nasi Goreng Spesial",
    description: "Nasi goreng dengan telur mata sapi, ayam suwir, udang, dan bumbu rempah pilihan. Disajikan dengan kerupuk dan acar segar.",
    price: 25000,
    category: "makanan",
    imageUrl: unsplash("photo-1512058564366-18510be2db19"),
    imagePublicId: "",
    isAvailable: true,
  },
  {
    name: "Ayam Bakar Madu",
    description: "Ayam kampung pilihan dibakar dengan bumbu madu dan kecap manis. Empuk, gurih, dan harum dengan aroma rempah asli.",
    price: 35000,
    category: "makanan",
    imageUrl: unsplash("photo-1598515214211-89d3c73ae83b"),
    imagePublicId: "",
    isAvailable: true,
  },
  {
    name: "Mie Ayam Bakso",
    description: "Mie kenyal dengan topping ayam berbumbu, bakso sapi pilihan, pangsit goreng, dan kuah kaldu ayam yang gurih.",
    price: 20000,
    category: "makanan",
    imageUrl: unsplash("photo-1569050467447-ce54b3bbc37d"),
    imagePublicId: "",
    isAvailable: true,
  },
  {
    name: "Soto Ayam Kuning",
    description: "Soto ayam tradisional dengan kuah kuning bening yang segar, dilengkapi ayam suwir, telur, bihun, dan perkedel kentang.",
    price: 22000,
    category: "makanan",
    imageUrl: unsplash("photo-1547592166-23ac45744acd"),
    imagePublicId: "",
    isAvailable: true,
  },
  {
    name: "Gado-gado Komplit",
    description: "Sayuran segar dan rebus dengan bumbu kacang yang kaya rempah, dilengkapi lontong, telur, dan kerupuk.",
    price: 18000,
    category: "makanan",
    imageUrl: unsplash("photo-1540189549336-e6e99c3679fe"),
    imagePublicId: "",
    isAvailable: true,
  },
  {
    name: "Nasi Uduk Betawi",
    description: "Nasi uduk gurih dengan santan dan rempah, disajikan dengan ayam goreng, tempe orek, sambal kacang, dan emping.",
    price: 28000,
    category: "makanan",
    imageUrl: unsplash("photo-1455619452474-d2be8b1e70cd"),
    imagePublicId: "",
    isAvailable: true,
  },
  // Minuman
  {
    name: "Es Teh Manis",
    description: "Teh premium dengan rasa yang segar dan manis, diseduh dari daun teh pilihan dan disajikan dengan es batu.",
    price: 8000,
    category: "minuman",
    imageUrl: unsplash("photo-1556679343-c7306c1976bc"),
    imagePublicId: "",
    isAvailable: true,
  },
  {
    name: "Jus Alpukat",
    description: "Jus alpukat segar tanpa pengawet, dibuat dari alpukat mentega pilihan dengan susu dan madu asli.",
    price: 18000,
    category: "minuman",
    imageUrl: unsplash("photo-1553530666-ba11a90bb5ae"),
    imagePublicId: "",
    isAvailable: true,
  },
  {
    name: "Kopi Susu Kekinian",
    description: "Espresso shot dengan susu segar dan brown sugar, menghadirkan perpaduan rasa yang kaya dan creamy.",
    price: 20000,
    category: "minuman",
    imageUrl: unsplash("photo-1509042239860-f550ce710b93"),
    imagePublicId: "",
    isAvailable: true,
  },
  {
    name: "Es Jeruk Segar",
    description: "Jeruk peras segar tanpa campuran dengan rasa asam manis yang menyegarkan, cocok untuk hari yang panas.",
    price: 12000,
    category: "minuman",
    imageUrl: unsplash("photo-1621263764928-df1444c5e859"),
    imagePublicId: "",
    isAvailable: true,
  },
  // Snack
  {
    name: "Pisang Goreng Crispy",
    description: "Pisang kepok pilihan digoreng dengan tepung renyah, disajikan hangat dengan topping coklat atau keju.",
    price: 12000,
    category: "snack",
    imageUrl: unsplash("photo-1528975604071-b4dc52a2d18c"),
    imagePublicId: "",
    isAvailable: true,
  },
  {
    name: "Martabak Manis",
    description: "Martabak tebal dan lembut dengan pilihan topping coklat, keju, kacang, dan susu. Cocok untuk camilan keluarga.",
    price: 30000,
    category: "snack",
    imageUrl: unsplash("photo-1567620905732-2d1ec7ab7445"),
    imagePublicId: "",
    isAvailable: true,
  },
  // Paket
  {
    name: "Paket Hemat A",
    description: "Nasi goreng spesial + es teh manis + pisang goreng. Hemat dan mengenyangkan untuk makan siang Anda.",
    price: 38000,
    category: "paket",
    imageUrl: unsplash("photo-1504674900247-0877df9cc836"),
    imagePublicId: "",
    isAvailable: true,
  },
  {
    name: "Paket Keluarga",
    description: "5 porsi nasi uduk + 5 ayam bakar + 5 es teh + 2 jus alpukat. Solusi makan bersama keluarga yang lengkap.",
    price: 180000,
    category: "paket",
    imageUrl: unsplash("photo-1414235077428-338989a2e8c0"),
    imagePublicId: "",
    isAvailable: true,
  },
];

const sampleTestimonials = [
  { customerName: "Budi Santoso", rating: 5, message: "Nasi gorengnya enak banget! Bumbunya meresap dan porsinya besar. Sudah jadi langganan keluarga kami.", approved: true },
  { customerName: "Siti Rahayu", rating: 5, message: "Delivery cepat, makanan masih hangat sampai rumah. Ayam bakar madunya juara, cocok banget buat makan malam.", approved: true },
  { customerName: "Ahmad Fauzi", rating: 4, message: "Harga sangat terjangkau untuk kualitas yang didapat. Mie ayam baksonya recommended banget, bumbunya pas.", approved: true },
  { customerName: "Dewi Lestari", rating: 5, message: "Martabak manisnya tebal dan lembut, tidak pelit topping. Jadi favorit anak-anak di rumah setiap minggu.", approved: true },
  { customerName: "Riko Pratama", rating: 5, message: "Kopi susu kekinian di sini beda dari yang lain, rasanya lebih kaya dan tidak terlalu manis. Pasti balik lagi!", approved: true },
];

const sampleGallery = [
  { imageUrl: unsplash("photo-1414235077428-338989a2e8c0"), imagePublicId: "", caption: "Sajian istimewa dari dapur kami" },
  { imageUrl: unsplash("photo-1476224203421-9ac39bcb3327"), imagePublicId: "", caption: "Bahan-bahan segar pilihan setiap hari" },
  { imageUrl: unsplash("photo-1504674900247-0877df9cc836"), imagePublicId: "", caption: "Aneka menu lezat siap disajikan" },
  { imageUrl: unsplash("photo-1567620905732-2d1ec7ab7445"), imagePublicId: "", caption: "Proses memasak dengan penuh cinta" },
  { imageUrl: unsplash("photo-1551218808-94e220e084d2"), imagePublicId: "", caption: "Suasana makan yang nyaman" },
  { imageUrl: unsplash("photo-1490645935967-10de6ba17061"), imagePublicId: "", caption: "Menu sarapan pagi favorit pelanggan" },
];

const sampleSettings = {
  businessName: "Warung Kuliner Bu Sari",
  tagline: "Masakan Rumahan yang Bikin Kangen",
  whatsappNumber: "6281234567890",
  address: "Jl. Melati No. 12, Kel. Kebayoran Baru, Jakarta Selatan",
  openHours: "Senin – Minggu, 08.00 – 21.00 WIB",
  instagram: "@warungkulinerbusari",
  facebook: "Warung Kuliner Bu Sari",
};

async function clearCollection(col: string) {
  const snap = await getDocs(collection(db, col));
  await Promise.all(snap.docs.map((d) => deleteDoc(d.ref)));
}

export async function POST() {
  try {
    await Promise.all([
      clearCollection("menus"),
      clearCollection("testimonials"),
      clearCollection("gallery"),
    ]);

    const now = new Date().toISOString();

    await Promise.all([
      ...sampleMenus.map((m) => addDoc(collection(db, "menus"), { ...m, createdAt: now, updatedAt: now })),
      ...sampleTestimonials.map((t) => addDoc(collection(db, "testimonials"), { ...t, createdAt: now })),
      ...sampleGallery.map((g) => addDoc(collection(db, "gallery"), { ...g, createdAt: now })),
      setDoc(doc(db, "settings", "main"), sampleSettings),
    ]);

    return NextResponse.json({ success: true, message: `${sampleMenus.length} menu, ${sampleTestimonials.length} ulasan, ${sampleGallery.length} galeri berhasil diseed.` });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
