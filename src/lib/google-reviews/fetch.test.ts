import assert from "node:assert/strict";
import { test } from "node:test";

import {
  GOOGLE_REVIEWS_API_CAP,
  normalizePlaceReview,
  normalizePlacesReviewsResponse,
} from "./fetch";

test("normalizePlaceReview passes through API values without inventing text", () => {
  const review = normalizePlaceReview({
    name: "places/abc/reviews/1",
    rating: 5,
    relativePublishTimeDescription: "2 months ago",
    text: { text: "Clean room and helpful host.", languageCode: "en" },
    authorAttribution: {
      displayName: "Asha K",
      uri: "https://maps.google.com/example",
      photoUri: "https://lh3.googleusercontent.com/example",
    },
    googleMapsUri: "https://maps.google.com/maps/contrib/review",
  });

  assert.ok(review);
  assert.equal(review.rating, 5);
  assert.equal(review.text, "Clean room and helpful host.");
  assert.equal(review.relativePublishTimeDescription, "2 months ago");
  assert.equal(review.author.displayName, "Asha K");
  assert.equal(review.author.uri, "https://maps.google.com/example");
});

test("normalizePlaceReview keeps star-only reviews with empty text", () => {
  const review = normalizePlaceReview({
    rating: 4,
    relativePublishTimeDescription: "a week ago",
    authorAttribution: { displayName: "Guest" },
  });
  assert.ok(review);
  assert.equal(review.text, "");
  assert.equal(review.rating, 4);
});

test("normalizePlaceReview rejects missing rating", () => {
  assert.equal(
    normalizePlaceReview({
      text: { text: "Nice stay" },
      authorAttribution: { displayName: "X" },
    }),
    null,
  );
});

test("normalizePlacesReviewsResponse caps at API max and drops invalid rows", () => {
  const reviews = normalizePlacesReviewsResponse({
    reviews: [
      { rating: 5, text: { text: "One" }, relativePublishTimeDescription: "1d" },
      { rating: 4, text: { text: "Two" }, relativePublishTimeDescription: "2d" },
      { rating: 3, text: { text: "Three" }, relativePublishTimeDescription: "3d" },
      { rating: 2, text: { text: "Four" }, relativePublishTimeDescription: "4d" },
      { rating: 1, text: { text: "Five" }, relativePublishTimeDescription: "5d" },
      { rating: 5, text: { text: "Sixth ignored" }, relativePublishTimeDescription: "6d" },
      { text: { text: "No rating" } },
    ],
  });
  assert.equal(reviews.length, GOOGLE_REVIEWS_API_CAP);
  assert.equal(reviews[0].text, "One");
  assert.equal(reviews[4].text, "Five");
});

test("fewer than five reviews are returned as-is", () => {
  const reviews = normalizePlacesReviewsResponse({
    reviews: [
      { rating: 5, text: { text: "Only one" }, relativePublishTimeDescription: "yesterday" },
    ],
  });
  assert.equal(reviews.length, 1);
});
