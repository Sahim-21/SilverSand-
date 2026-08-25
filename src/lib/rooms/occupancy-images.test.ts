import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";

import { OCCUPANCY_TIERS } from "../business";
import { OCCUPANCY_IMAGES } from "./occupancy-images";

test("each occupancy tier has a unique alt and a file in public/", () => {
  const alts = new Set<string>();

  for (const tier of OCCUPANCY_TIERS) {
    const image = OCCUPANCY_IMAGES[tier];
    assert.equal(image.occupancy, tier);
    assert.ok(
      image.width > 0 && image.height > 0,
      `${tier} sharing needs width/height`,
    );
    assert.ok(image.alt.length > 0, `${tier} sharing needs alt text`);
    alts.add(image.alt);

    const rel = image.src.replace(/^\//, "");
    const onDisk = join(process.cwd(), "public", rel);
    assert.equal(existsSync(onDisk), true, `missing ${image.src}`);
  }

  assert.equal(
    alts.size,
    OCCUPANCY_TIERS.length,
    "alt text must be unique per occupancy",
  );
});
