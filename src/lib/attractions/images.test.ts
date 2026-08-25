import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";

import { nearbyAttractions } from "../site-content";
import { ATTRACTION_IMAGES } from "./images";

const EXPECTED_PHOTO_NAMES = [
  "Murudeshwar Temple & Shiva statue",
  "Murudeshwar Beach",
  "Netrani Island",
  "Idagunji Ganapati Temple",
  "Murdeshwar jetty & local fish market",
] as const;

test("attraction photos exist on disk with unique alt text", () => {
  const alts = new Set<string>();

  for (const name of EXPECTED_PHOTO_NAMES) {
    const image = ATTRACTION_IMAGES[name];
    assert.ok(image, `missing image metadata for ${name}`);
    assert.ok(image.width > 0 && image.height > 0, `${name} needs width/height`);
    assert.ok(image.alt.length > 0, `${name} needs alt text`);
    alts.add(image.alt);

    const rel = image.src.replace(/^\//, "");
    assert.equal(
      existsSync(join(process.cwd(), "public", rel)),
      true,
      `missing ${image.src}`,
    );
  }

  assert.equal(alts.size, EXPECTED_PHOTO_NAMES.length);

  const yana = nearbyAttractions.find((place) => place.name.startsWith("Yana"));
  assert.ok(yana);
  assert.equal(ATTRACTION_IMAGES[yana.name], undefined);
});
