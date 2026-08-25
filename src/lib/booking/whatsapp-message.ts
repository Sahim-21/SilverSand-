import { BUSINESS_NAME, WHATSAPP_E164 } from "@/lib/business";
import type { OccupancyTier } from "@/lib/business";
import { formatIsoDateLong } from "@/lib/booking/dates";

export type WhatsAppEnquiryLine = {
  roomName: string;
  occupancy: OccupancyTier;
  quantity: number;
  extraBeds: number;
};

export type WhatsAppEnquiryInput = {
  guestName: string;
  phone: string;
  checkInIso: string;
  checkOutIso: string;
  nights: number | null;
  lines: WhatsAppEnquiryLine[];
  /** Already formatted from live rates (formatInr). Never a hardcoded amount. */
  estimatedTotalLabel: string | null;
};

export function buildWhatsAppEnquiryMessage(input: WhatsAppEnquiryInput): string {
  const lines: string[] = [
    `Hello ${BUSINESS_NAME},`,
    "",
    "I would like to check availability.",
  ];

  const name = input.guestName.trim();
  if (name) lines.push(`Name: ${name}`);

  const phone = input.phone.trim();
  if (phone) lines.push(`Phone: ${phone}`);

  if (input.checkInIso && input.checkOutIso) {
    lines.push(`Check-in: ${formatIsoDateLong(input.checkInIso)}`);
    lines.push(`Check-out: ${formatIsoDateLong(input.checkOutIso)}`);
    if (input.nights && input.nights > 0) {
      lines.push(`Nights: ${input.nights}`);
    }
  } else {
    lines.push("Dates: not selected yet — please advise availability.");
  }

  lines.push("");
  lines.push("Rooms:");
  if (input.lines.length === 0) {
    lines.push("- (none selected)");
  } else {
    for (const line of input.lines) {
      const extra =
        line.extraBeds > 0 ? `, ${line.extraBeds} extra bed(s)` : ", no extra beds";
      lines.push(
        `- ${line.roomName}, ${line.occupancy} sharing × ${line.quantity}${extra}`,
      );
    }
  }

  lines.push("");
  if (input.estimatedTotalLabel) {
    lines.push(`Estimated total: ${input.estimatedTotalLabel}`);
    lines.push("*Estimate only, subject to availability.");
    lines.push("Rates include GST.");
  } else {
    lines.push("Please share today's rate for these dates.");
  }

  lines.push("");
  lines.push("Please confirm availability. Thank you.");

  return lines.join("\n");
}

export function buildWhatsAppEnquiryUrl(input: WhatsAppEnquiryInput): string {
  const text = buildWhatsAppEnquiryMessage(input);
  return `https://wa.me/${WHATSAPP_E164}?text=${encodeURIComponent(text)}`;
}
