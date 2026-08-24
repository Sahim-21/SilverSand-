import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { AdminPricingDashboard } from "@/components/admin/pricing-dashboard";

export default async function AdminDashboardPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/admin/login");
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      <h1 className="text-xl font-semibold text-mangrove">Pricing dashboard</h1>
      <p className="mt-1 text-sm text-muted">
        Changes save to the database and appear on the public site.
      </p>
      <AdminPricingDashboard />
    </div>
  );
}
