import { getSiteSettings } from "@/lib/firestore";
import SettingsForm from "@/components/admin/SettingsForm";

export const revalidate = 0;

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings().catch(() => null);
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Pengaturan Website</h1>
        <p className="text-gray-500 text-sm mt-1">Kelola informasi bisnis yang tampil di website</p>
      </div>
      <SettingsForm settings={settings} />
    </div>
  );
}
