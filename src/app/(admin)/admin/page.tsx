import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { PricingDashboard } from "@/components/admin/pricing-dashboard";
import { BUSINESS_NAME } from "@/lib/business";
import { getAdminPricing } from "@/lib/pricing/admin-fetch";

export const metadata: Metadata = {
  title: "Pricing dashboard",
  robots: { index: false, follow: false },
};

/**
 * Server-side auth check + data load.
 *
 * Prices are loaded here (not in the client component) so:
 * - The form populates immediately with no useEffect round-trip.
 * - Admin can see and edit rates even when the room is unpublished or fewer
 *   than 5 occupancy rows exist (cases the public API rejects).
 *
 * Authorization at two layers:
 * 1. Middleware (edge) rejects unauthenticated requests before this renders.
 * 2. `auth()` here is defense-in-depth: if middleware is bypassed, this
 *    catches it and redirects to login. The PATCH route also checks auth.
 */
export default async function AdminDashboardPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/admin/login");
  }

  const pricing = await getAdminPricing();

  return (
    <div className="mx-auto max-w-lg px-gutter py-8">
      <div className="mb-6">
        <h1 className="font-serif text-2xl font-semibold text-mangrove">
          {BUSINESS_NAME}
        </h1>
        <p className="mt-1 text-sm text-muted">Pricing dashboard</p>
      </div>
      <PricingDashboard initialData={pricing} />
    </div>
  );
}
