"use client";

import type { ReactNode } from "react";

import { BookingEnquiryProvider } from "@/components/booking/enquiry-context";
import { FloatingContact } from "@/components/floating-contact";

/** Public chrome: enquiry context for the FAB + the FAB itself. Admin must not use this. */
export function PublicShell({ children }: { children: ReactNode }) {
  return (
    <BookingEnquiryProvider>
      {children}
      <FloatingContact />
    </BookingEnquiryProvider>
  );
}
