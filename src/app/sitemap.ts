import type { MetadataRoute } from "next";

import { ROOM_PATH, SITE_URL } from "@/lib/business";

const publicPaths = [
  "/",
  "/rooms",
  ROOM_PATH,
  "/gallery",
  "/about",
  "/location",
  "/contact",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return publicPaths.map((path) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === ROOM_PATH ? 0.9 : 0.8,
  }));
}
