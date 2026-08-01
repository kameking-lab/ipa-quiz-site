import { describe, expect, it } from "vitest";

import { metadata as featuresMeta } from "@/app/features/page";
import { metadata as keywordsMeta } from "@/app/keywords/page";
import { metadata as booksMeta } from "@/app/recommended-books/page";

/**
 * Next.js replaces (does NOT deep-merge) the openGraph object when a page
 * defines its own. These three pages each set an openGraph block but used to
 * omit `images`, which silently dropped the site-wide default OG image from the
 * root layout — leaving them with no social/SERP card. The /api/og route even
 * reserves a bespoke type style for each (feature/keyword/books), so the fix is
 * to wire that card explicitly. Guard that the images entry stays present.
 */
const CASES = [
  { name: "/features", meta: featuresMeta, ogType: "feature" },
  { name: "/keywords", meta: keywordsMeta, ogType: "keyword" },
  { name: "/recommended-books", meta: booksMeta, ogType: "books" },
] as const;

describe("pages that override openGraph keep an explicit OG image", () => {
  it.each(CASES)("$name emits a non-empty /api/og card of type $ogType", ({ meta, ogType }) => {
    const images = meta.openGraph?.images as Array<{ url?: string }> | undefined;
    const url = String(images?.[0]?.url ?? "");
    expect(url).toContain("/api/og?");
    expect(url).toContain(`type=${ogType}`);
  });
});
