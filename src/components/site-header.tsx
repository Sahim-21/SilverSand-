import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { BUSINESS_NAME, DISPLAY_PHONE, TEL_URL, WHATSAPP_URL } from "@/lib/business";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/rooms/deluxe-ac", label: "Rooms" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-[var(--line)] bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="font-serif text-lg font-semibold text-[var(--sea)]">
          {BUSINESS_NAME}
        </Link>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[var(--ink)] hover:text-[var(--sea)]"
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
              buttonVariants({ variant: "outline", size: "sm" }),
              "hidden sm:inline-flex",
            )}
          >
            {DISPLAY_PHONE}
          </a>
        </div>
      </div>
    </header>
  );
}
