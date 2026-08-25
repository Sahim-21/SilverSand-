import Link from "next/link";

import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbListJsonLd, type Crumb } from "@/lib/seo/json-ld";
import { cn } from "@/lib/utils";

type BreadcrumbsProps = {
  items: readonly Crumb[];
  className?: string;
};

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  if (items.length < 2) return null;

  return (
    <>
      <JsonLd data={breadcrumbListJsonLd(items)} />
      <nav aria-label="Breadcrumb" className={cn("text-sm text-muted", className)}>
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {items.map((item, index) => {
            const last = index === items.length - 1;
            return (
              <li
                key={`${item.href}-${item.label}`}
                className="flex items-center gap-2"
              >
                {index > 0 ? (
                  <span aria-hidden="true" className="text-line">
                    /
                  </span>
                ) : null}
                {last ? (
                  <span aria-current="page" className="text-ink">
                    {item.label}
                  </span>
                ) : (
                  <Link href={item.href} className="ss-link">
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
