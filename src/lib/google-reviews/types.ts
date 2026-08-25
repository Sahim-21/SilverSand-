/**
 * Google Places API (New) review shapes — only fields we display.
 * Values are passed through from the API; we do not invent ratings or copy.
 */

export type GoogleReviewAuthor = {
  displayName: string;
  uri?: string;
  photoUri?: string;
};

export type GoogleReview = {
  /** Stable id from Places `name` when present. */
  name?: string;
  rating: number;
  text: string;
  relativePublishTimeDescription: string;
  author: GoogleReviewAuthor;
  googleMapsUri?: string;
  flagContentUri?: string;
};

export type GoogleReviewsResult = {
  reviews: GoogleReview[];
  /** Max the Places API returns for this field. */
  apiCap: 5;
  fetchedAt: string;
};
