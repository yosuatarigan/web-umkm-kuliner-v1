"use client";

import { createContext, useContext, useState, useCallback, useRef } from "react";
import { ShoppingCart, X } from "lucide-react";

interface Toast {
  id: number;
  message: string;
  sub?: string;
}

interface ToastContextType {
  showToast: (message: string, sub?: string) => void;
}

const ToastContext = createContext<ToastContextType>({ showToast: () => {} });

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const counter = useRef(0);

  const showToast = useCallback((message: string, sub?: string) => {
    const id = ++counter.current;
    setToasts((prev) => [...prev, { id, message, sub }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000);
  }, []);

  const remove = (id: number) => setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-center gap-3 rounded-2xl bg-gray-900 px-5 py-3.5 text-white shadow-2xl animate-slide-up"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 shrink-0">
              <ShoppingCart className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold">{toast.message}</p>
              {toast.sub && <p className="text-xs text-gray-400 mt-0.5">{toast.sub}</p>}
            </div>
            <button
              onClick={() => remove(toast.id)}
              className="ml-2 text-gray-500 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
