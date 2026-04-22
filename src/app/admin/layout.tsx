import SessionProvider from "@/components/providers/SessionProvider";

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <div className="min-h-screen">{children}</div>
    </SessionProvider>
  );
}
