/** On-palette fallback when `src` is a string (static imports carry their own blur). */
export const TOKEN_BLUR_DATA_URL =
  "data:image/svg+xml;charset=utf-8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="12"><rect width="100%" height="100%" fill="#e8dfd0"/></svg>`,
  );
