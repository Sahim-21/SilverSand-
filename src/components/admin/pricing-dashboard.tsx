"use client";

import { signOut } from "next-auth/react";
import { useMemo, useState } from "react";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { OCCUPANCY_TIERS } from "@/lib/business";
import type { OccupancyTier } from "@/lib/business";
import type { AdminPricing } from "@/lib/pricing/admin-fetch";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Form value helpers
// ---------------------------------------------------------------------------

type FormValues = {
  /** String representation of each occupancy rate, keyed by tier. */
  byTier: Record<OccupancyTier, string>;
  extraBed: string;
};

function toFormValues(data: AdminPricing | null): FormValues {
  const byTier = Object.fromEntries(
    OCCUPANCY_TIERS.map((tier) => {
      const row = data?.rates.find((r) => r.occupancy === tier);
      return [tier, row?.nightlyRateInr ? String(row.nightlyRateInr) : ""];
    }),
  ) as Record<OccupancyTier, string>;

  return {
    byTier,
    extraBed: data != null ? String(data.room.extraBedRateInr) : "",
  };
}

function validateValues(values: FormValues): Record<string, string> {
  const errors: Record<string, string> = {};

  for (const tier of OCCUPANCY_TIERS) {
    const raw = values.byTier[tier].trim();
    const val = Number(raw);
    if (!raw || !Number.isInteger(val) || val < 1) {
      errors[`tier_${tier}`] = "Whole number ≥ 1 required";
    } else if (val > 99_999) {
      errors[`tier_${tier}`] = "Must be ≤ ₹99,999";
    }
  }

  const raw = values.extraBed.trim();
  const val = Number(raw);
  if (raw === "" || !Number.isInteger(val) || val < 0) {
    errors.extraBed = "Enter 0 or a whole number ≥ 0";
  } else if (val > 9_999) {
    errors.extraBed = "Must be ≤ ₹9,999";
  }

  return errors;
}

function valuesAreDifferent(a: FormValues, b: FormValues): boolean {
  for (const tier of OCCUPANCY_TIERS) {
    if ((a.byTier[tier] ?? "") !== (b.byTier[tier] ?? "")) return true;
  }
  return a.extraBed !== b.extraBed;
}

function formatIst(isoString: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(isoString));
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

type PricingDashboardProps = {
  initialData: AdminPricing | null;
};

export function PricingDashboard({ initialData }: PricingDashboardProps) {
  const initialValues = toFormValues(initialData);

  /**
   * `baseline` tracks what is currently in the database (i.e. the last saved
   * values). It resets to `values` after a successful save so the form returns
   * to a "not dirty" state without a full page reload.
   */
  const [baseline, setBaseline] = useState<FormValues>(initialValues);
  const [values, setValues] = useState<FormValues>(initialValues);
  const [isPublished, setIsPublished] = useState(
    initialData?.room.isPublished ?? false,
  );
  const [savedAt, setSavedAt] = useState<string | null>(
    initialData?.room.updatedAt ?? null,
  );

  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const errors = useMemo(() => validateValues(values), [values]);
  const hasErrors = Object.keys(errors).length > 0;
  const isDirty = valuesAreDifferent(baseline, values);
  const canSave = isDirty && !hasErrors;

  function handleTierChange(tier: OccupancyTier, val: string) {
    setValues((prev) => ({
      ...prev,
      byTier: { ...prev.byTier, [tier]: val },
    }));
    setSuccessMsg(null);
  }

  function handleExtraBedChange(val: string) {
    setValues((prev) => ({ ...prev, extraBed: val }));
    setSuccessMsg(null);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSave) return;

    setSaving(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const res = await fetch("/api/admin/pricing", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          extraBedRateInr: Number(values.extraBed),
          occupancyRates: OCCUPANCY_TIERS.map((tier) => ({
            occupancy: tier,
            nightlyRateInr: Number(values.byTier[tier]),
          })),
        }),
      });

      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        setErrorMsg(body.error ?? "Save failed. Please try again.");
        return;
      }

      const body = (await res.json()) as { updatedAt: string };
      setSavedAt(body.updatedAt);
      setIsPublished(true);
      setBaseline(values); // reset dirty check to the just-saved values
      setSuccessMsg("Live on the public site.");
    } catch {
      setErrorMsg("Network error. Check your connection and try again.");
    } finally {
      setSaving(false);
    }
  }

  const roomName = initialData?.room.name ?? "Deluxe AC Room";

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      {/* Pricing card */}
      <div className="rounded-lg border border-line bg-surface p-6">
        <div className="mb-5 flex items-center gap-3">
          <p className="font-semibold text-ink">{roomName}</p>
          <span
            className={cn(
              "rounded-full px-2.5 py-0.5 text-xs font-medium",
              isPublished
                ? "bg-whatsapp/10 text-whatsapp"
                : "border border-line bg-sand-deep text-muted",
            )}
          >
            {isPublished ? "Published" : "Unpublished"}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line text-left text-muted">
                <th className="pb-3 pr-6 font-medium">Guests sharing</th>
                <th className="pb-3 font-medium">₹ / night</th>
              </tr>
            </thead>
            <tbody>
              {OCCUPANCY_TIERS.map((tier) => (
                <tr key={tier} className="border-b border-line/60">
                  <td className="py-3 pr-6">{tier} sharing</td>
                  <td className="py-3">
                    <div className="flex flex-col gap-1">
                      <Input
                        type="number"
                        min={1}
                        max={99999}
                        step={1}
                        inputMode="numeric"
                        required
                        aria-label={`Rate for ${tier} sharing`}
                        aria-invalid={Boolean(errors[`tier_${tier}`])}
                        value={values.byTier[tier]}
                        onChange={(e) => handleTierChange(tier, e.target.value)}
                        className="w-32 tabular-nums"
                      />
                      {errors[`tier_${tier}`] ? (
                        <p className="text-xs text-danger">{errors[`tier_${tier}`]}</p>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))}
              <tr>
                <td className="py-3 pr-6">
                  <span>Extra bed / person</span>
                  <p className="text-xs text-muted">Enter 0 if not offered</p>
                </td>
                <td className="py-3">
                  <div className="flex flex-col gap-1">
                    <Input
                      type="number"
                      min={0}
                      max={9999}
                      step={1}
                      inputMode="numeric"
                      required
                      aria-label="Extra bed rate per person"
                      aria-invalid={Boolean(errors.extraBed)}
                      value={values.extraBed}
                      onChange={(e) => handleExtraBedChange(e.target.value)}
                      className="w-32 tabular-nums"
                    />
                    {errors.extraBed ? (
                      <p className="text-xs text-danger">{errors.extraBed}</p>
                    ) : null}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {savedAt ? (
          <p className="mt-5 text-xs text-muted">
            Last saved: {formatIst(savedAt)} IST
          </p>
        ) : (
          <p className="mt-5 text-xs text-muted">
            Rates not yet saved. Saving will publish them to the public site.
          </p>
        )}
      </div>

      {/* Feedback */}
      {errorMsg ? <Alert tone="danger">{errorMsg}</Alert> : null}
      {successMsg ? (
        <p className="text-sm font-medium text-mangrove-fg" role="status">
          {successMsg}
        </p>
      ) : null}
      {!isDirty && !successMsg ? (
        <p className="text-xs text-muted">Edit a rate above to enable saving.</p>
      ) : null}

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={!canSave || saving}>
          {saving ? "Saving…" : "Save Changes"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => void signOut({ callbackUrl: "/" })}
        >
          Sign out
        </Button>
      </div>
    </form>
  );
}
