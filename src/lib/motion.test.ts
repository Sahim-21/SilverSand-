import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";

import { MOTION_INIT_SCRIPT, MOTION_OK_ATTR, MOTION_OK_VALUE } from "./motion";

test("motion init script opts in only when reduced-motion is off", () => {
  assert.ok(MOTION_INIT_SCRIPT.includes("prefers-reduced-motion: reduce"));
  assert.ok(MOTION_INIT_SCRIPT.includes(MOTION_OK_ATTR));
  assert.ok(MOTION_INIT_SCRIPT.includes(MOTION_OK_VALUE));
});

test("hero entrance and reveals are gated on prefers-reduced-motion", () => {
  const css = readFileSync(join(process.cwd(), "src/app/globals.css"), "utf8");
  assert.ok(css.includes("@media (prefers-reduced-motion: no-preference)"));
  assert.ok(css.includes("@media (prefers-reduced-motion: reduce)"));
  assert.ok(css.includes(".hero-media"));
  assert.ok(css.includes(".hero-copy"));
  assert.ok(css.includes(".reveal.is-pending"));
});

test("homepage hero does not delay the booking widget", () => {
  const hero = readFileSync(
    join(process.cwd(), "src/components/sections/hero-section.tsx"),
    "utf8",
  );
  const widgetIndex = hero.indexOf("<BookingWidget");
  assert.ok(widgetIndex > 0);
  const beforeWidget = hero.slice(0, widgetIndex);
  const lastSticky = beforeWidget.lastIndexOf("lg:sticky");
  const afterSticky = hero.slice(lastSticky, widgetIndex);
  assert.doesNotMatch(afterSticky, /hero-copy/);
  assert.doesNotMatch(afterSticky, /hero-media/);
  assert.doesNotMatch(hero, /RevealOnScroll/);
});

test("scroll reveals are homepage-only wrappers, not baked into sections", () => {
  const home = readFileSync(join(process.cwd(), "src/app/(public)/page.tsx"), "utf8");
  assert.ok(home.includes("RevealOnScroll"));
  assert.match(home, /RevealOnScroll>\s*\n\s*<RoomPricingSection/);
  assert.match(home, /RevealOnScroll>\s*\n\s*<PhotosSection/);
  assert.match(home, /RevealOnScroll>\s*\n\s*<AboutSection/);
  assert.match(home, /RevealOnScroll>\s*\n\s*<NearbyAttractionsSection/);
  assert.match(home, /RevealOnScroll>\s*\n\s*<FaqSection/);

  for (const file of [
    "src/components/sections/room-pricing-section.tsx",
    "src/components/sections/photos-section.tsx",
    "src/components/sections/about-section.tsx",
    "src/components/sections/nearby-attractions-section.tsx",
    "src/components/sections/faq-section.tsx",
  ]) {
    const source = readFileSync(join(process.cwd(), file), "utf8");
    assert.doesNotMatch(source, /RevealOnScroll/);
    assert.doesNotMatch(source, /hero-copy/);
  }
});
