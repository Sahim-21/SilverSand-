import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type BookNowButtonProps = {
  href: string;
  size?: "default" | "lg" | "full";
  className?: string;
};

/**
 * Same Button primitive and `whatsapp` variant as “Check Availability on
 * WhatsApp” — the existing primary conversion style from the design system.
 */
export function BookNowButton({
  href,
  size = "default",
  className,
}: BookNowButtonProps) {
  return (
    <Link
      href={href}
      className={cn(buttonVariants({ variant: "whatsapp", size }), className)}
    >
      Book Now
    </Link>
  );
}
