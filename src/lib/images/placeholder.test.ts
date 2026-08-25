import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";

import { TOKEN_BLUR_DATA_URL } from "./placeholder";

test("token blur data URL is a sand-deep SVG for next/image placeholder", () => {
  assert.ok(TOKEN_BLUR_DATA_URL.startsWith("data:image/svg+xml"));
  assert.ok(TOKEN_BLUR_DATA_URL.includes("e8dfd0"));
});

test("image skeleton shimmers only when motion is allowed and reserves the box", () => {
  const css = readFileSync(join(process.cwd(), "src/app/globals.css"), "utf8");
  assert.ok(css.includes(".ss-image-skeleton"));
  assert.ok(css.includes("ss-image-shimmer"));
  assert.match(css, /prefers-reduced-motion:\s*reduce[\s\S]*ss-image-skeleton/);

  const tokenImage = readFileSync(
    join(process.cwd(), "src/components/ui/token-image.tsx"),
    "utf8",
  );
  assert.ok(tokenImage.includes('placeholder={placeholder ?? "blur"}'));
  assert.ok(tokenImage.includes("alt={alt}"));
  assert.ok(tokenImage.includes("bg-sand-deep"));
  assert.ok(tokenImage.includes("slotClassName"));

  const occupancy = readFileSync(
    join(process.cwd(), "src/components/marketing/occupancy-room-image.tsx"),
    "utf8",
  );
  assert.ok(occupancy.includes('slotClassName="aspect-[4/3] w-full"'));
  assert.ok(occupancy.includes("TokenImage"));
  assert.ok(occupancy.includes("fill"));

  const attractions = readFileSync(
    join(process.cwd(), "src/components/marketing/attraction-place-image.tsx"),
    "utf8",
  );
  assert.ok(attractions.includes('slotClassName="aspect-[4/3] w-full"'));
  assert.ok(attractions.includes("TokenImage"));

  const hero = readFileSync(
    join(process.cwd(), "src/components/sections/hero-section.tsx"),
    "utf8",
  );
  assert.ok(hero.includes("TokenImage"));
  assert.ok(hero.includes("heroCoast"));
  assert.ok(hero.includes('slotClassName="h-full w-full"'));

  const avatar = readFileSync(
    join(process.cwd(), "src/components/marketing/review-avatar.tsx"),
    "utf8",
  );
  assert.ok(avatar.includes("ss-image-skeleton"));
  assert.ok(avatar.includes("h-10 w-10"));
});
