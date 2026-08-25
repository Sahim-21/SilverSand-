import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";

import {
  HERO_PARALLAX_LAG,
  HERO_PARALLAX_MAX_PX,
  HERO_PARALLAX_MIN_WIDTH_PX,
  HERO_PARALLAX_SPEED,
  heroParallaxOffset,
} from "./hero-parallax";

test("hero parallax speed sits in the 50–70% band and the offset is capped", () => {
  assert.ok(HERO_PARALLAX_SPEED >= 0.5);
  assert.ok(HERO_PARALLAX_SPEED <= 0.7);
  assert.equal(HERO_PARALLAX_LAG, 1 - HERO_PARALLAX_SPEED);
  assert.equal(heroParallaxOffset(0), 0);
  assert.equal(heroParallaxOffset(-40), 0);
  const mid = 80;
  assert.equal(heroParallaxOffset(mid), mid * HERO_PARALLAX_LAG);
  assert.equal(heroParallaxOffset(10_000), HERO_PARALLAX_MAX_PX);
  assert.ok(heroParallaxOffset(mid) < mid);
});

test("hero parallax uses translateY on an inner layer, rAF, and stays off on mobile", () => {
  assert.equal(HERO_PARALLAX_MIN_WIDTH_PX, 768);

  const source = readFileSync(
    join(process.cwd(), "src/components/sections/hero-parallax.tsx"),
    "utf8",
  );
  assert.ok(source.includes("requestAnimationFrame"));
  assert.ok(source.includes("translate3d"));
  assert.ok(source.includes("scrollY"));
  assert.ok(source.includes("prefers-reduced-motion"));
  assert.ok(source.includes("passive: true"));
  assert.doesNotMatch(source, /backgroundPosition|background-position/);
  assert.doesNotMatch(source, /getBoundingClientRect/);
  assert.doesNotMatch(source, /setState|useState/);

  const css = readFileSync(join(process.cwd(), "src/app/globals.css"), "utf8");
  assert.ok(css.includes(`--ss-hero-parallax-max: ${HERO_PARALLAX_MAX_PX}px`));
  assert.ok(css.includes(".hero-parallax"));
  assert.match(css, /min-width:\s*768px[\s\S]*hero-parallax/);
  assert.ok(css.includes("hero-media-in"));
  assert.ok(css.includes("scale(1.045)"));

  const hero = readFileSync(
    join(process.cwd(), "src/components/sections/hero-section.tsx"),
    "utf8",
  );
  const media = hero.indexOf("hero-media");
  const parallax = hero.indexOf("<HeroParallax");
  const copy = hero.indexOf("hero-copy");
  const widget = hero.indexOf("<BookingWidget");
  assert.ok(media > 0 && parallax > media);
  assert.ok(copy > parallax);
  assert.ok(widget > copy);
  assert.doesNotMatch(hero.slice(copy), /HeroParallax/);
});
