"use client";

import { useEffect, useId, useMemo, useState, useSyncExternalStore } from "react";

import { QuantityStepper } from "@/components/booking/quantity-stepper";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Text } from "@/components/ui/heading";
import {
  catalogFromPricing,
  occupancyOptionValue,
  parseOccupancyOptionValue,
  pricingListFromCatalog,
} from "@/lib/booking/catalog";
import { addDaysIso, parseIsoDate, todayIso } from "@/lib/booking/dates";
import { buildWhatsAppEnquiryUrl } from "@/lib/booking/whatsapp-message";
import {
  BUSINESS_PLACE,
  DISPLAY_PHONE,
  OCCUPANCY_TIERS,
  TEL_URL,
} from "@/lib/business";
import { estimateEnquiry, formatInr, nightsBetween } from "@/lib/pricing/estimate";
import type { PublicPricing } from "@/lib/pricing/types";
import { cn } from "@/lib/utils";

type RoomLine = {
  id: string;
  roomSlug: string;
  occupancy: (typeof OCCUPANCY_TIERS)[number];
  quantity: number;
  extraBeds: number;
};

type BookingWidgetFormProps = {
  initialPricing: PublicPricing | null;
};

function newLineId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `line-${Math.random().toString(36).slice(2)}`;
}

function subscribeToday(): () => void {
  return () => {};
}

function getTodaySnapshot(): string {
  return todayIso();
}

function getServerTodaySnapshot(): string {
  return "";
}

function defaultLine(pricing: PublicPricing | null, id = "line-0"): RoomLine {
  const catalog = catalogFromPricing(pricing);
  const room = catalog[0];
  return {
    id,
    roomSlug: room.slug,
    occupancy: room.occupancyOptions[0] ?? 2,
    quantity: 1,
    extraBeds: 0,
  };
}

export function BookingWidgetForm({ initialPricing }: BookingWidgetFormProps) {
  const formId = useId();
  const [pricing, setPricing] = useState<PublicPricing | null>(initialPricing);
  const [pricingStatus, setPricingStatus] = useState<
    "ready" | "loading" | "unavailable"
  >(initialPricing ? "ready" : "loading");

  const [guestName, setGuestName] = useState("");
  const [phone, setPhone] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const minCheckIn = useSyncExternalStore(
    subscribeToday,
    getTodaySnapshot,
    getServerTodaySnapshot,
  );
  const [lines, setLines] = useState<RoomLine[]>(() => [defaultLine(initialPricing)]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const response = await fetch("/api/pricing", { cache: "no-store" });
        if (!response.ok) {
          if (!cancelled) {
            setPricing(null);
            setPricingStatus("unavailable");
          }
          return;
        }
        const data = (await response.json()) as PublicPricing;
        if (!cancelled) {
          setPricing(data);
          setPricingStatus("ready");
        }
      } catch {
        if (!cancelled) {
          setPricing(null);
          setPricingStatus("unavailable");
        }
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const catalog = catalogFromPricing(pricing);
  const pricingList = pricingListFromCatalog(pricing);
  const extraBedsOffered = pricing != null && pricing.room.extraBedRateInr > 0;
  const enquiryLines = extraBedsOffered
    ? lines
    : lines.map((line) => ({ ...line, extraBeds: 0 }));

  const checkInDate = parseIsoDate(checkIn);
  const checkOutDate = parseIsoDate(checkOut);
  const datesChosen = Boolean(checkIn && checkOut);
  const checkoutAfterCheckin =
    checkInDate && checkOutDate ? nightsBetween(checkInDate, checkOutDate) > 0 : false;

  const estimate = useMemo(() => {
    if (!checkInDate || !checkOutDate || !checkoutAfterCheckin) return null;
    if (pricingList.length === 0) return null;
    return estimateEnquiry(pricingList, checkInDate, checkOutDate, enquiryLines);
  }, [checkInDate, checkOutDate, checkoutAfterCheckin, pricingList, enquiryLines]);

  const nights =
    checkInDate && checkOutDate && checkoutAfterCheckin
      ? nightsBetween(checkInDate, checkOutDate)
      : null;

  const minCheckOut = checkIn ? (addDaysIso(checkIn, 1) ?? undefined) : undefined;

  function updateLine(id: string, patch: Partial<RoomLine>) {
    setLines((current) =>
      current.map((line) => (line.id === id ? { ...line, ...patch } : line)),
    );
  }

  function addRoomType() {
    setLines((current) => [...current, defaultLine(pricing, newLineId())]);
  }

  function removeLine(id: string) {
    setLines((current) =>
      current.length <= 1 ? current : current.filter((line) => line.id !== id),
    );
  }

  function onCheckInChange(value: string) {
    setCheckIn(value);
    if (!value) return;
    const nextMinOut = addDaysIso(value, 1);
    if (nextMinOut && (!checkOut || checkOut <= value)) {
      setCheckOut(nextMinOut);
    }
  }

  const whatsappHref = buildWhatsAppEnquiryUrl({
    guestName,
    phone,
    checkInIso: checkIn,
    checkOutIso: checkOut,
    nights,
    lines: enquiryLines.map((line) => {
      const room = catalog.find((item) => item.slug === line.roomSlug) ?? catalog[0];
      return {
        roomName: room.name,
        occupancy: line.occupancy,
        quantity: line.quantity,
        extraBeds: line.extraBeds,
      };
    }),
    estimatedTotalLabel: estimate ? formatInr(estimate.totalInr) : null,
  });

  return (
    <Card tone="dark" className="w-full scheme-dark">
      <CardHeader>
        <CardTitle as="h2" className="text-gold">
          Book your stay
        </CardTitle>
        <CardDescription className="text-sand/80">
          Pick occupancy and dates for a live estimate. We confirm availability on
          WhatsApp — this is not an instant booking.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <Label htmlFor={`${formId}-name`} className="mb-2 text-sand">
            Name <span className="font-normal text-sand/60">(optional)</span>
          </Label>
          <Input
            id={`${formId}-name`}
            surface="dark"
            autoComplete="name"
            value={guestName}
            onChange={(event) => setGuestName(event.target.value)}
          />
        </div>

        <div className="flex flex-col gap-4">
          {lines.map((line, index) => (
            <div
              key={line.id}
              className="flex flex-col gap-3 rounded-md border border-line-on-dark p-3"
            >
              <div>
                <Label htmlFor={`${formId}-room-${line.id}`} className="mb-2 text-sand">
                  Room Type*
                </Label>
                <Select
                  id={`${formId}-room-${line.id}`}
                  surface="dark"
                  required
                  value={occupancyOptionValue(line.roomSlug, line.occupancy)}
                  onChange={(event) => {
                    const parsed = parseOccupancyOptionValue(event.target.value);
                    if (!parsed) return;
                    updateLine(line.id, parsed);
                  }}
                >
                  {catalog.flatMap((room) =>
                    room.occupancyOptions.map((occupancy) => (
                      <option
                        key={occupancyOptionValue(room.slug, occupancy)}
                        value={occupancyOptionValue(room.slug, occupancy)}
                      >
                        {room.name} — {occupancy} sharing
                      </option>
                    )),
                  )}
                </Select>
              </div>

              <div className="flex flex-col gap-3">
                <div>
                  <Label className="mb-2 text-sand">Quantity*</Label>
                  <QuantityStepper
                    label={`quantity for room ${index + 1}`}
                    value={line.quantity}
                    min={1}
                    max={8}
                    onChange={(quantity) => updateLine(line.id, { quantity })}
                  />
                </div>
                <div>
                  {extraBedsOffered || pricingStatus !== "ready" ? (
                    <>
                      <Label className="mb-2 text-sand">Extra beds</Label>
                      <QuantityStepper
                        label={`extra beds for room ${index + 1}`}
                        value={line.extraBeds}
                        min={0}
                        max={8}
                        onChange={(extraBeds) => updateLine(line.id, { extraBeds })}
                      />
                    </>
                  ) : (
                    <Text size="xs" className="text-sand/60">
                      Extra beds are not offered at the current published rate.
                    </Text>
                  )}
                </div>
              </div>

              {lines.length > 1 ? (
                <button
                  type="button"
                  className="self-start text-sm text-sand/70 underline-offset-2 hover:text-sand hover:underline"
                  onClick={() => removeLine(line.id)}
                >
                  Remove this room type
                </button>
              ) : null}
            </div>
          ))}

          <button
            type="button"
            className="self-start text-sm font-medium text-gold-muted hover:text-gold"
            onClick={addRoomType}
          >
            + Add another room type
          </button>
          <Text size="xs" className="text-sand/60">
            Quantity is an enquiry, not live inventory. We confirm how many rooms we can
            offer on WhatsApp.
          </Text>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <Label htmlFor={`${formId}-in`} className="mb-2 text-sand">
              Check-in Date*
            </Label>
            <Input
              id={`${formId}-in`}
              surface="dark"
              type="date"
              required
              min={minCheckIn || undefined}
              value={checkIn}
              onChange={(event) => onCheckInChange(event.target.value)}
            />
          </div>
          <div>
            <Label htmlFor={`${formId}-out`} className="mb-2 text-sand">
              Check-out Date*
            </Label>
            <Input
              id={`${formId}-out`}
              surface="dark"
              type="date"
              required
              min={(minCheckOut ?? minCheckIn) || undefined}
              value={checkOut}
              onChange={(event) => setCheckOut(event.target.value)}
            />
          </div>
        </div>

        <div>
          <Label htmlFor={`${formId}-phone`} className="mb-2 text-sand">
            Phone Number <span className="font-normal text-sand/60">(optional)</span>
          </Label>
          <Input
            id={`${formId}-phone`}
            surface="dark"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </div>

        <div
          className="rounded-md border border-line-on-dark bg-mangrove-mid px-4 py-3"
          aria-live="polite"
        >
          <EstimatePanel
            datesChosen={datesChosen}
            checkoutAfterCheckin={checkoutAfterCheckin}
            pricingStatus={pricingStatus}
            estimate={estimate}
            nights={nights}
          />
        </div>
      </CardContent>
      <CardFooter>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: "whatsapp", size: "full" }))}
        >
          Check Availability on WhatsApp
        </a>
        <a
          href={TEL_URL}
          className={cn(buttonVariants({ variant: "outline-on-dark", size: "full" }))}
        >
          Call us
        </a>
        <Text size="xs" className="text-center text-sand/60">
          {DISPLAY_PHONE} · {BUSINESS_PLACE}
        </Text>
      </CardFooter>
    </Card>
  );
}

function EstimatePanel({
  datesChosen,
  checkoutAfterCheckin,
  pricingStatus,
  estimate,
  nights,
}: {
  datesChosen: boolean;
  checkoutAfterCheckin: boolean;
  pricingStatus: "ready" | "loading" | "unavailable";
  estimate: ReturnType<typeof estimateEnquiry>;
  nights: number | null;
}) {
  if (!datesChosen) {
    return (
      <Text size="sm" className="text-sand/80">
        Select check-in and check-out dates to see an estimate.
      </Text>
    );
  }

  if (!checkoutAfterCheckin) {
    return (
      <Text size="sm" className="text-sand/80">
        Check-out must be after check-in.
      </Text>
    );
  }

  if (pricingStatus === "loading" && !estimate) {
    return (
      <Text size="sm" className="text-sand/80">
        Loading today&apos;s rates…
      </Text>
    );
  }

  if (!estimate) {
    return (
      <Text size="sm" className="text-sand/80">
        Pricing is temporarily unavailable. Message us on WhatsApp for today&apos;s rate
        — we do not invent a fallback rupee amount.
      </Text>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <p className="text-sm text-gold">Estimated Total</p>
      <p className="font-serif text-2xl font-semibold tabular-nums text-sand">
        {formatInr(estimate.totalInr)}
      </p>
      {nights ? (
        <Text size="xs" className="text-sand/70">
          {nights} {nights === 1 ? "night" : "nights"}
        </Text>
      ) : null}
      <Text size="xs" className="text-sand/70">
        *Estimate only, subject to availability
      </Text>
    </div>
  );
}
