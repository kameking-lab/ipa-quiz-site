import { describe, expect, it } from "vitest";

import { metadata } from "@/app/faq/page";
import { FAQS } from "@/data/faq";

/**
 * /faq advertised FAQ count must track the registry (review K-2).
 *
 * The OG-image body and meta description used to hardcode "79問" while FAQS
 * already held 80 items — an off-by-one that drifts every time a FAQ is added
 * or removed. The page now derives the count from FAQS.length; this pins it so
 * a future hardcode regresses loudly instead of silently going stale.
 */
describe("/faq metadata — advertised FAQ count tracks the registry", () => {
  const desc = String(metadata.description ?? "");
  const ogImage = String(
    (metadata.openGraph?.images as Array<{ url?: string }> | undefined)?.[0]
      ?.url ?? "",
  );

  it("states the live FAQS.length, not a stale literal", () => {
    expect(desc).toContain(`${FAQS.length}問`);
    // the OG image is /api/og?...&body=...{count} 問 — URLSearchParams encodes
    // spaces as "+", so normalise before matching.
    const ogBody = decodeURIComponent(ogImage).replace(/\+/g, " ");
    expect(ogBody).toContain(`${FAQS.length} 問`);
  });
});
