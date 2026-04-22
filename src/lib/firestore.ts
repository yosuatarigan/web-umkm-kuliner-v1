import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import type { Menu, Order, Testimonial, Banner, GalleryItem, SiteSettings } from "@/types";

// ─── Menus ───────────────────────────────────────────────────────────────────

export async function getMenus(): Promise<Menu[]> {
  const q = query(collection(db, "menus"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Menu));
}

export async function getAvailableMenus(): Promise<Menu[]> {
  const all = await getMenus();
  return all.filter((m) => m.isAvailable);
}

export async function getMenuById(id: string): Promise<Menu | null> {
  const snap = await getDoc(doc(db, "menus", id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as Menu;
}

export async function createMenu(data: Omit<Menu, "id" | "createdAt" | "updatedAt">) {
  const now = new Date().toISOString();
  return addDoc(collection(db, "menus"), { ...data, createdAt: now, updatedAt: now });
}

export async function updateMenu(id: string, data: Partial<Menu>) {
  return updateDoc(doc(db, "menus", id), { ...data, updatedAt: new Date().toISOString() });
}

export async function deleteMenu(id: string) {
  return deleteDoc(doc(db, "menus", id));
}

// ─── Orders ──────────────────────────────────────────────────────────────────

export async function getOrders(): Promise<Order[]> {
  const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Order));
}

export async function createOrder(data: Omit<Order, "id" | "createdAt" | "updatedAt">) {
  const now = new Date().toISOString();
  return addDoc(collection(db, "orders"), { ...data, createdAt: now, updatedAt: now });
}

export async function updateOrderStatus(id: string, status: Order["status"]) {
  return updateDoc(doc(db, "orders", id), { status, updatedAt: new Date().toISOString() });
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

export async function getTestimonials(onlyApproved = false): Promise<Testimonial[]> {
  const q = query(collection(db, "testimonials"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  const all = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Testimonial));
  return onlyApproved ? all.filter((t) => t.approved) : all;
}

export async function createTestimonial(data: Omit<Testimonial, "id" | "createdAt">) {
  return addDoc(collection(db, "testimonials"), {
    ...data,
    approved: false,
    createdAt: new Date().toISOString(),
  });
}

export async function updateTestimonialApproval(id: string, approved: boolean) {
  return updateDoc(doc(db, "testimonials", id), { approved });
}

export async function deleteTestimonial(id: string) {
  return deleteDoc(doc(db, "testimonials", id));
}

// ─── Banners ──────────────────────────────────────────────────────────────────

export async function getBanners(onlyActive = false): Promise<Banner[]> {
  const q = query(collection(db, "banners"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  const all = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Banner));
  return onlyActive ? all.filter((b) => b.isActive) : all;
}

export async function createBanner(data: Omit<Banner, "id" | "createdAt">) {
  return addDoc(collection(db, "banners"), { ...data, createdAt: new Date().toISOString() });
}

export async function updateBanner(id: string, data: Partial<Banner>) {
  return updateDoc(doc(db, "banners", id), data);
}

export async function deleteBanner(id: string) {
  return deleteDoc(doc(db, "banners", id));
}

// ─── Gallery ──────────────────────────────────────────────────────────────────

export async function getGallery(): Promise<GalleryItem[]> {
  const q = query(collection(db, "gallery"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as GalleryItem));
}

export async function addGalleryItem(data: Omit<GalleryItem, "id" | "createdAt">) {
  return addDoc(collection(db, "gallery"), { ...data, createdAt: new Date().toISOString() });
}

export async function deleteGalleryItem(id: string) {
  return deleteDoc(doc(db, "gallery", id));
}

// ─── Settings ────────────────────────────────────────────────────────────────

export async function getSiteSettings(): Promise<SiteSettings | null> {
  const snap = await getDoc(doc(db, "settings", "main"));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as SiteSettings;
}

export async function updateSiteSettings(data: Partial<SiteSettings>) {
  return updateDoc(doc(db, "settings", "main"), data);
}
