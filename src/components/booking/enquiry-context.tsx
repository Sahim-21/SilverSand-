"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type BookingEnquiryContextValue = {
  widgetWhatsAppHref: string | null;
  setWidgetWhatsAppHref: (href: string | null) => void;
};

const BookingEnquiryContext = createContext<BookingEnquiryContextValue | null>(null);

export function BookingEnquiryProvider({ children }: { children: ReactNode }) {
  const [widgetWhatsAppHref, setWidgetWhatsAppHref] = useState<string | null>(null);
  const value = useMemo(
    () => ({ widgetWhatsAppHref, setWidgetWhatsAppHref }),
    [widgetWhatsAppHref],
  );

  return (
    <BookingEnquiryContext.Provider value={value}>
      {children}
    </BookingEnquiryContext.Provider>
  );
}

export function useBookingEnquiry(): BookingEnquiryContextValue {
  const ctx = useContext(BookingEnquiryContext);
  if (!ctx) {
    return { widgetWhatsAppHref: null, setWidgetWhatsAppHref: () => {} };
  }
  return ctx;
}
