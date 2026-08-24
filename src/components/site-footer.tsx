import Link from "next/link";

import {
  BUSINESS_NAME,
  BUSINESS_PLACE,
  DISPLAY_PHONE,
  TEL_URL,
  WHATSAPP_URL,
} from "@/lib/business";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[var(--line)] bg-white">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 text-sm md:grid-cols-2">
        <div>
          <p className="font-semibold text-[var(--sea)]">{BUSINESS_NAME}</p>
          <p className="mt-1 text-[var(--muted)]">{BUSINESS_PLACE}</p>
          <p className="mt-2 text-[var(--muted)]">
            Full address pending — see{" "}
            <Link href="/contact" className="text-[var(--sea)] underline">
              Contact
            </Link>
            .
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <a href={TEL_URL} className="text-[var(--sea)] hover:underline">
            {DISPLAY_PHONE}
          </a>
          <a
            href={WHATSAPP_URL}
            className="text-[var(--sea)] hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp us
          </a>
          <div className="mt-2 flex gap-4 text-[var(--muted)]">
            <Link href="/privacy" className="hover:text-[var(--sea)]">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-[var(--sea)]">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
