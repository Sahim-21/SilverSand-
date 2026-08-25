import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";

import { ATTRACTION_IMAGES } from "../attractions/images";
import { OCCUPANCY_TIERS } from "../business";
import { OCCUPANCY_IMAGES } from "../rooms/occupancy-images";
import { nearbyAttractions } from "../site-content";
import { LIGHTBOX_DURATION_MS, wrapGalleryIndex } from "./lightbox";

test("lightbox open/close duration sits in the 200–300ms band", () => {
  assert.ok(LIGHTBOX_DURATION_MS >= 200);
  assert.ok(LIGHTBOX_DURATION_MS <= 300);
  const css = readFileSync(join(process.cwd(), "src/app/globals.css"), "utf8");
  assert.ok(css.includes(`--ss-lightbox-duration: ${LIGHTBOX_DURATION_MS}ms`));
});

test("gallery index wraps so arrow/swipe cycling stays in the same set", () => {
  assert.equal(wrapGalleryIndex(0, 5, -1), 4);
  assert.equal(wrapGalleryIndex(4, 5, 1), 0);
  assert.equal(wrapGalleryIndex(2, 5, 1), 3);
  assert.equal(wrapGalleryIndex(0, 0, 1), 0);
});

test("room and attraction photo sets do not mix", () => {
  const roomSrcs = OCCUPANCY_TIERS.map((tier) => OCCUPANCY_IMAGES[tier].src);
  const attractionSrcs = nearbyAttractions.map((place) => {
    const image = ATTRACTION_IMAGES[place.name];
    assert.ok(image, `missing attraction image for ${place.name}`);
    return image.src;
  });

  assert.equal(roomSrcs.length, OCCUPANCY_TIERS.length);
  assert.ok(attractionSrcs.length >= 5);
  for (const src of roomSrcs) {
    assert.match(src, /^\/Rooms\//);
    assert.ok(!attractionSrcs.includes(src));
  }
  for (const src of attractionSrcs) {
    assert.match(src, /^\/tourist_places\//);
    assert.ok(!roomSrcs.includes(src));
  }

  const roomsGallery = readFileSync(
    join(process.cwd(), "src/components/media/room-photo-gallery.tsx"),
    "utf8",
  );
  const attractionsGallery = readFileSync(
    join(process.cwd(), "src/components/media/attraction-photo-gallery.tsx"),
    "utf8",
  );
  assert.ok(roomsGallery.includes("ROOM_STATIC"));
  assert.doesNotMatch(roomsGallery, /tourist_places|ATTRACTION_STATIC/);
  assert.ok(attractionsGallery.includes("ATTRACTION_STATIC"));
  assert.doesNotMatch(attractionsGallery, /Rooms\/|ROOM_STATIC/);
});

test("lightbox is a custom overlay: keyboard, swipe, trap, reduced motion, no extra package", () => {
  const source = readFileSync(
    join(process.cwd(), "src/components/media/photo-lightbox.tsx"),
    "utf8",
  );
  assert.ok(source.includes("Escape"));
  assert.ok(source.includes("ArrowLeft"));
  assert.ok(source.includes("ArrowRight"));
  assert.ok(source.includes("inert"));
  assert.ok(source.includes("LIGHTBOX_SWIPE_PX"));
  assert.ok(source.includes("prefers-reduced-motion"));
  assert.ok(source.includes('sizes="100vw"'));
  assert.ok(source.includes("createPortal"));
  assert.doesNotMatch(source, /photoswipe|yet-another-react-lightbox|glightbox/i);

  const pkg = readFileSync(join(process.cwd(), "package.json"), "utf8");
  assert.doesNotMatch(
    pkg,
    /photoswipe|yet-another-react-lightbox|glightbox|fancybox|react-image-lightbox/,
  );
});
