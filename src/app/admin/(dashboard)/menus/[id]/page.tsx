import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { getMenuById } from "@/lib/firestore";
import MenuForm from "@/components/admin/MenuForm";

export default async function EditMenuPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const menu = await getMenuById(id).catch(() => null);
  if (!menu) notFound();

  return (
    <div>
      <Link href="/admin/menus" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-orange-500 mb-6">
        <ArrowLeft className="h-4 w-4" /> Kembali
      </Link>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Edit Menu</h1>
      <MenuForm menu={menu} />
    </div>
  );
}
