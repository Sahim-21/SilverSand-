import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";

import { nearbyAttractions } from "../site-content";
import { ATTRACTION_IMAGES } from "./images";

test("attraction photos exist on disk with unique alt text", () => {
  const alts = new Set<string>();

  for (const place of nearbyAttractions) {
    const image = ATTRACTION_IMAGES[place.name];
    assert.ok(image, `missing image metadata for ${place.name}`);
    assert.ok(image.width > 0 && image.height > 0, `${place.name} needs width/height`);
    assert.ok(image.alt.length > 0, `${place.name} needs alt text`);
    alts.add(image.alt);

    const rel = image.src.replace(/^\//, "");
    assert.equal(
      existsSync(join(process.cwd(), "public", rel)),
      true,
      `missing ${image.src}`,
    );
  }

  assert.equal(alts.size, nearbyAttractions.length);
});
