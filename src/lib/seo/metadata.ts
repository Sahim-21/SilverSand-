import type { Metadata } from "next";

import { BUSINESS_NAME, SITE_URL } from "@/lib/business";
import type { PageSeoCopy } from "@/lib/seo/copy";

export const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Silver Sand Beach Homestay — Homestay in Murudeshwar",
};

export function absoluteUrl(path: string): string {
  if (path === "/") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function pageMetadata(copy: PageSeoCopy, extras?: Metadata): Metadata {
  const url = absoluteUrl(copy.path);
  const ogTitle = copy.absoluteTitle ?? copy.title;

  return {
    title: copy.absoluteTitle ? { absolute: copy.absoluteTitle } : copy.title,
    description: copy.description,
    alternates: { canonical: copy.path },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url,
      siteName: BUSINESS_NAME,
      title: ogTitle,
      description: copy.description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: copy.description,
      images: [OG_IMAGE.url],
    },
    ...extras,
  };
}

export function noIndexMetadata(title: string, extras?: Metadata): Metadata {
  return {
    title,
    robots: { index: false, follow: false },
    ...extras,
  };
}
