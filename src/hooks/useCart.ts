"use client";

import { useState, useEffect, useCallback } from "react";
import type { Menu, OrderItem } from "@/types";

const CART_KEY = "umkm_cart";

export function useCart() {
  const [items, setItems] = useState<OrderItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(CART_KEY);
    if (stored) setItems(JSON.parse(stored));
  }, []);

  const save = (next: OrderItem[]) => {
    setItems(next);
    localStorage.setItem(CART_KEY, JSON.stringify(next));
  };

  const addItem = useCallback((menu: Menu) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.menuId === menu.id);
      const next = existing
        ? prev.map((i) => (i.menuId === menu.id ? { ...i, quantity: i.quantity + 1 } : i))
        : [...prev, { menuId: menu.id, menuName: menu.name, price: menu.price, quantity: 1 }];
      localStorage.setItem(CART_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const removeItem = useCallback((menuId: string) => {
    setItems((prev) => {
      const next = prev.filter((i) => i.menuId !== menuId);
      localStorage.setItem(CART_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const updateQty = useCallback((menuId: string, quantity: number) => {
    if (quantity < 1) return;
    setItems((prev) => {
      const next = prev.map((i) => (i.menuId === menuId ? { ...i, quantity } : i));
      localStorage.setItem(CART_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    localStorage.removeItem(CART_KEY);
  }, []);

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  return { items, addItem, removeItem, updateQty, clearCart, total, totalItems };
}
