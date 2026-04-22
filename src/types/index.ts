export interface Menu {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  imagePublicId: string;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  menuId: string;
  menuName: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  items: OrderItem[];
  total: number;
  note: string;
  type: "delivery" | "pickup";
  address?: string;
  status: "pending" | "confirmed" | "process" | "ready" | "done" | "cancelled";
  createdAt: string;
  updatedAt: string;
}

export interface Testimonial {
  id: string;
  customerName: string;
  rating: number;
  message: string;
  approved: boolean;
  createdAt: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  imagePublicId: string;
  isActive: boolean;
  createdAt: string;
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  imagePublicId: string;
  caption?: string;
  createdAt: string;
}

export interface SiteSettings {
  id: string;
  businessName: string;
  tagline: string;
  whatsappNumber: string;
  address: string;
  openHours: string;
  logoUrl?: string;
  logoPublicId?: string;
  instagram?: string;
  facebook?: string;
}

export type MenuCategory = "makanan" | "minuman" | "snack" | "paket";

export const MENU_CATEGORIES: { value: MenuCategory; label: string }[] = [
  { value: "makanan", label: "Makanan" },
  { value: "minuman", label: "Minuman" },
  { value: "snack", label: "Snack" },
  { value: "paket", label: "Paket" },
];

export const ORDER_STATUS_LABELS: Record<Order["status"], string> = {
  pending: "Menunggu Konfirmasi",
  confirmed: "Dikonfirmasi",
  process: "Diproses",
  ready: "Siap",
  done: "Selesai",
  cancelled: "Dibatalkan",
};
