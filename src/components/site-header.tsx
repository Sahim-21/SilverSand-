import Link from "next/link";

import { Container } from "@/components/layout/container";
import { buttonVariants } from "@/components/ui/button";
import { BUSINESS_NAME, DISPLAY_PHONE, TEL_URL, WHATSAPP_URL } from "@/lib/business";
import { mainNav } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  return (
    <header className="border-b border-line bg-surface/90 backdrop-blur-sm">
      <Container className="flex items-center justify-between gap-4 py-4">
        <Link href="/" className="font-serif text-lg font-semibold text-mangrove">
          {BUSINESS_NAME}
        </Link>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          {mainNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-ink hover:text-mangrove"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "whatsapp", size: "sm" }))}
          >
            WhatsApp
          </a>
          <a
            href={TEL_URL}
            className={cn(
              buttonVariants({ variant: "call", size: "sm" }),
              "hidden sm:inline-flex",
            )}
          >
            {DISPLAY_PHONE}
          </a>
        </div>
      </Container>
    </header>
  );
}
