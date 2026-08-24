"use client";

import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { OCCUPANCY_TIERS } from "@/lib/business";
import type { OccupancyTier } from "@/lib/business";

type RateRow = { occupancy: OccupancyTier; nightlyRateInr: string };

export function AdminPricingDashboard() {
  const [extraBed, setExtraBed] = useState("500");
  const [rates, setRates] = useState<RateRow[]>(
    OCCUPANCY_TIERS.map((o) => ({ occupancy: o, nightlyRateInr: "" })),
  );
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    void fetch("/api/pricing")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!data?.room) return;
        setExtraBed(String(data.room.extraBedRateInr));
        setRates(
          OCCUPANCY_TIERS.map((o) => {
            const row = data.occupancyRates.find(
              (r: { occupancy: number }) => r.occupancy === o,
            );
            return {
              occupancy: o,
              nightlyRateInr: row?.nightlyRateInr ? String(row.nightlyRateInr) : "",
            };
          }),
        );
      })
      .catch(() => {
        /* unpublished or no DB — leave empty */
      });
  }, []);

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setMessage(null);

    const payload = {
      extraBedRateInr: Number(extraBed),
      occupancyRates: rates.map((r) => ({
        occupancy: r.occupancy,
        nightlyRateInr: Number(r.nightlyRateInr),
      })),
    };

    const res = await fetch("/api/admin/pricing", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setSaving(false);

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error ?? "Save failed.");
      return;
    }

    setMessage("Live on the public site.");
  }

  return (
    <form onSubmit={onSave} className="mt-6 space-y-6">
      <div className="rounded-lg border border-line bg-surface p-4">
        <p className="font-medium">Deluxe AC Room</p>
        <table className="mt-4 w-full text-sm">
          <thead>
            <tr className="text-left text-muted">
              <th className="pb-2">Sharing</th>
              <th className="pb-2">₹ / night</th>
            </tr>
          </thead>
          <tbody>
            {rates.map((row, index) => (
              <tr key={row.occupancy}>
                <td className="py-2">{row.occupancy} guests</td>
                <td>
                  <Input
                    type="number"
                    min={1}
                    step={1}
                    inputMode="numeric"
                    value={row.nightlyRateInr}
                    onChange={(e) => {
                      const next = [...rates];
                      next[index] = { ...row, nightlyRateInr: e.target.value };
                      setRates(next);
                    }}
                    required
                    className="tabular-nums"
                  />
                </td>
              </tr>
            ))}
            <tr>
              <td className="py-2">Extra bed / person</td>
              <td>
                <Input
                  type="number"
                  min={0}
                  step={1}
                  value={extraBed}
                  onChange={(e) => setExtraBed(e.target.value)}
                  required
                  className="tabular-nums"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {error ? (
        <p className="text-sm text-danger" role="alert">
          {error}
        </p>
      ) : null}
      {message ? <p className="text-sm text-mangrove">{message}</p> : null}
      <div className="flex gap-3">
        <Button type="submit" disabled={saving}>
          {saving ? "Saving…" : "Save"}
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          Sign out
        </Button>
      </div>
    </form>
  );
}
