import Link from "next/link";

import { Container } from "@/components/layout/container";
import {
  BUSINESS_NAME,
  BUSINESS_PLACE,
  DISPLAY_PHONE,
  TEL_URL,
  WHATSAPP_URL,
} from "@/lib/business";
import { footerNav } from "@/lib/navigation";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-surface">
      <Container className="grid gap-8 py-10 md:grid-cols-2">
        <div>
          <p className="font-semibold text-mangrove">{BUSINESS_NAME}</p>
          <p className="mt-1 text-sm text-muted">{BUSINESS_PLACE}</p>
          <p className="mt-2 text-sm text-muted">
            Full address pending — see{" "}
            <Link href="/location" className="text-mangrove underline">
              Location
            </Link>{" "}
            or{" "}
            <Link href="/contact" className="text-mangrove underline">
              Contact
            </Link>
            .
          </p>
          <div className="mt-4 flex flex-col gap-1 text-sm">
            <a href={TEL_URL} className="text-mangrove hover:underline">
              {DISPLAY_PHONE}
            </a>
            <a
              href={WHATSAPP_URL}
              className="text-mangrove hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp us
            </a>
          </div>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
          {footerNav.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-mangrove">
              {link.label}
            </Link>
          ))}
        </nav>
      </Container>
    </footer>
  );
}
