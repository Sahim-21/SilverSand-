import assert from "node:assert/strict";
import { test } from "node:test";

import { buildWhatsAppEnquiryMessage } from "./whatsapp-message";

test("WhatsApp message includes enquiry details without inventing a rate", () => {
  const message = buildWhatsAppEnquiryMessage({
    guestName: "Priya",
    phone: "9986222892",
    checkInIso: "2026-09-12",
    checkOutIso: "2026-09-14",
    nights: 2,
    lines: [
      {
        roomName: "Deluxe AC Room",
        occupancy: 4,
        quantity: 1,
        extraBeds: 0,
      },
    ],
    estimatedTotalLabel: null,
  });

  assert.match(message, /Priya/);
  assert.match(message, /Deluxe AC Room, 4 sharing × 1/);
  assert.match(message, /12 Sep(t)?\.? 2026/);
  assert.match(message, /Please share today's rate/);
  assert.doesNotMatch(message, /Estimated total/);
});

test("WhatsApp message uses the formatted live estimate when provided", () => {
  const message = buildWhatsAppEnquiryMessage({
    guestName: "",
    phone: "",
    checkInIso: "2026-09-12",
    checkOutIso: "2026-09-14",
    nights: 2,
    lines: [
      {
        roomName: "Deluxe AC Room",
        occupancy: 2,
        quantity: 2,
        extraBeds: 1,
      },
    ],
    estimatedTotalLabel: "₹4,500",
  });

  assert.match(message, /Estimated total: ₹4,500/);
  assert.match(message, /\*Estimate only, subject to availability/);
  assert.match(message, /Rates include GST/);
  assert.match(message, /1 extra bed/);
});
