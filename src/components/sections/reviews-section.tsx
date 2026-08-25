import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Stack } from "@/components/layout/stack";
import { Heading, Text } from "@/components/ui/heading";
import { getGoogleReviews } from "@/lib/google-reviews/fetch";
import type { GoogleReview } from "@/lib/google-reviews/types";

/**
 * Visual stars matching the API rating exactly (no rounding of the number shown).
 * Fractional ratings fill the corresponding count of whole stars via Math.floor
 * only for glyph count; the numeric label remains the API value.
 */
function RatingStars({ rating }: { rating: number }) {
  const filled = Math.max(0, Math.min(5, Math.floor(rating)));
  return (
    <span
      className="inline-flex items-center gap-2"
      aria-label={`${rating} out of 5 stars`}
    >
      <span className="inline-flex gap-0.5 text-gold" aria-hidden="true">
        {Array.from({ length: 5 }, (_, index) => (
          <span key={index} className={index < filled ? "opacity-100" : "opacity-25"}>
            ★
          </span>
        ))}
      </span>
      <span className="tabular-nums text-sm font-medium text-ink">{rating}</span>
    </span>
  );
}

function AuthorLine({ review }: { review: GoogleReview }) {
  const name = review.author.displayName;
  const nameNode = review.author.uri ? (
    <a
      href={review.author.uri}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-mangrove-fg underline-offset-2 hover:underline"
    >
      {name}
    </a>
  ) : (
    <span className="font-medium text-ink">{name}</span>
  );

  return (
    <div className="flex items-center gap-3">
      {review.author.photoUri ? (
        // eslint-disable-next-line @next/next/no-img-element -- Google profile URIs; no next/image remote config needed
        <img
          src={review.author.photoUri}
          alt=""
          width={40}
          height={40}
          className="h-10 w-10 rounded-full object-cover"
          referrerPolicy="no-referrer"
        />
      ) : (
        <span
          className="flex h-10 w-10 items-center justify-center rounded-full bg-sand-deep text-sm font-medium text-muted"
          aria-hidden="true"
        >
          {name.slice(0, 1).toUpperCase()}
        </span>
      )}
      <div className="min-w-0">
        <p className="truncate text-sm">{nameNode}</p>
        {review.relativePublishTimeDescription ? (
          <p className="text-xs text-muted">{review.relativePublishTimeDescription}</p>
        ) : null}
      </div>
    </div>
  );
}

function ReviewItem({ review }: { review: GoogleReview }) {
  return (
    <article className="flex flex-col gap-3 border-b border-line py-6 last:border-b-0 last:pb-0 first:pt-0">
      <AuthorLine review={review} />
      <RatingStars rating={review.rating} />
      {review.text ? (
        <Text size="sm" tone="muted">
          {review.text}
        </Text>
      ) : null}
      {review.googleMapsUri ? (
        <a
          href={review.googleMapsUri}
          target="_blank"
          rel="noopener noreferrer"
          className="w-fit text-sm text-mangrove-fg underline-offset-2 hover:underline"
        >
          View on Google Maps
        </a>
      ) : null}
    </article>
  );
}

/**
 * Homepage Google reviews — server-fetched Place Details `reviews` only.
 * Renders nothing when the key is missing, the request fails, or Google returns zero reviews.
 */
export async function ReviewsSection() {
  const result = await getGoogleReviews();
  if (!result || result.reviews.length === 0) return null;

  return (
    <Section band="wash" fade={false}>
      <Container>
        <Stack gap="lg">
          <div className="max-w-2xl">
            <Heading as="h2" size="section">
              Guest reviews on Google
            </Heading>
            <Text tone="muted" className="mt-2">
              Guest reviews from Google Maps, shown as Google provides them.
            </Text>
          </div>

          <div className="max-w-3xl rounded-lg border border-line bg-surface px-6 py-2">
            {result.reviews.map((review, index) => (
              <ReviewItem
                key={review.name ?? `${review.author.displayName}-${index}`}
                review={review}
              />
            ))}
          </div>

          <p
            className="text-sm text-muted"
            style={{ fontFamily: "Roboto, sans-serif", fontWeight: 400 }}
            translate="no"
          >
            Powered by Google
          </p>
        </Stack>
      </Container>
    </Section>
  );
}
