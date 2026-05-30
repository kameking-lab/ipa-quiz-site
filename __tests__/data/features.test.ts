import { describe, expect, it } from "vitest";

import { FEATURE_LANDING_PAGES, getFeatureBySlug } from "@/data/features";

// Characterization tests for data/features.ts — the differentiation feature
// landing pages. FEATURE_LANDING_PAGES.map(p => ({ slug: p.slug })) feeds
// generateStaticParams for /features/[slug], and getFeatureBySlug resolves the
// page at render. A duplicate slug would silently collide (the .find returns
// the first, the second SSG page never renders its own content), so we pin slug
// uniqueness + round-trip resolution. The faqs array is also emitted as
// FAQPage JSON-LD, so an empty faqs would produce invalid structured data.

describe("FEATURE_LANDING_PAGES registry", () => {
  it("is non-empty and has unique slugs (no SSG slug collisions)", () => {
    expect(FEATURE_LANDING_PAGES.length).toBeGreaterThan(0);
    const slugs = FEATURE_LANDING_PAGES.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("every page carries the structural fields the route + JSON-LD depend on", () => {
    for (const page of FEATURE_LANDING_PAGES) {
      expect(page.slug.length).toBeGreaterThan(0);
      expect(page.title.length).toBeGreaterThan(0);
      expect(page.description.length).toBeGreaterThan(0);
      // "特長3点" / 仕組み / FAQPage schema each render from these arrays.
      expect(page.benefits.length).toBeGreaterThan(0);
      expect(page.howItWorks.length).toBeGreaterThan(0);
      expect(page.faqs.length).toBeGreaterThan(0);
      // primaryCta + every related link must be an internal route (a 404 CTA on
      // an SEO landing page wastes the inbound click).
      expect(page.primaryCta.href.startsWith("/")).toBe(true);
      for (const link of page.relatedLinks) {
        expect(link.href.startsWith("/")).toBe(true);
      }
    }
  });
});

describe("getFeatureBySlug", () => {
  it("resolves every registered slug back to its own page (round-trip)", () => {
    for (const page of FEATURE_LANDING_PAGES) {
      expect(getFeatureBySlug(page.slug)?.slug).toBe(page.slug);
    }
  });

  it("returns undefined for an unknown slug (drives the route's notFound)", () => {
    expect(getFeatureBySlug("no-such-feature")).toBeUndefined();
    expect(getFeatureBySlug("")).toBeUndefined();
  });
});
