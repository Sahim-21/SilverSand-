import Link from "next/link";

import { Container } from "@/components/layout/container";
import {
  BUSINESS_NAME,
  BUSINESS_PLACE,
  DISPLAY_PHONE,
  TEL_URL,
  WHATSAPP_URL,
} from "@/lib/business";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-surface">
      <Container className="grid gap-6 py-10 text-sm md:grid-cols-2">
        <div>
          <p className="font-semibold text-mangrove">{BUSINESS_NAME}</p>
          <p className="mt-1 text-muted">{BUSINESS_PLACE}</p>
          <p className="mt-2 text-muted">
            Full address pending — see{" "}
            <Link href="/contact" className="text-mangrove underline">
              Contact
            </Link>
            .
          </p>
        </div>
        <div className="flex flex-col gap-2">
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
          <div className="mt-2 flex gap-4 text-muted">
            <Link href="/privacy" className="hover:text-mangrove">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-mangrove">
              Terms
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
