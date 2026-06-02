import { describe, expect, it } from "vitest";

import { FEATURE_LANDING_PAGES, getFeatureBySlug } from "@/data/features";
import { getKeywordPageBySlug } from "@/data/keywords";
import { getBlogPostBySlug } from "@/data/blog";

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

  // The CTA + related links cross into dynamicParams=false dynamic routes
  // (/features/[slug], /keywords/[keyword], /blog/[slug]). A typo'd slug there
  // resolves to startsWith("/") yet 404s on a page whose entire purpose is to
  // capture and forward inbound search traffic — the same dead-internal-link
  // class pinned for blog/success-story cross-links. Static single-segment
  // routes (/glossary, /transparency, /essay, ...) are namespace-ambiguous and
  // are not enumerated here; only the three slug namespaces where a dangling
  // slug is a *guaranteed* 404 are checked.
  it("every /features, /keywords, /blog cross-link resolves to a real page (no 404)", () => {
    const dead: string[] = [];
    for (const page of FEATURE_LANDING_PAGES) {
      const hrefs = [
        page.primaryCta.href,
        ...page.relatedLinks.map((l) => l.href),
      ];
      for (const href of hrefs) {
        let m: RegExpMatchArray | null;
        if ((m = href.match(/^\/features\/([^/?#]+)$/))) {
          if (!getFeatureBySlug(m[1])) dead.push(`${page.slug}: ${href}`);
        } else if ((m = href.match(/^\/keywords\/([^/?#]+)$/))) {
          if (!getKeywordPageBySlug(m[1])) dead.push(`${page.slug}: ${href}`);
        } else if ((m = href.match(/^\/blog\/([^/?#]+)$/))) {
          if (!getBlogPostBySlug(m[1])) dead.push(`${page.slug}: ${href}`);
        }
      }
    }
    expect(dead).toEqual([]);
  });
});

// Factuality / 誇大回避: the essay-grading feature hero must not claim the AI
// references IPA's grading criteria ("採点基準") — those are non-public, and the
// flagship /essay disclaimer + this page's own FAQ both frame the basis as IPA
// 公式解答例 (a 参考評価, not the official rubric). Pin the honest framing so the
// hero can't drift back into over-claiming. "崩れたら落ちる".
describe("essay-grading feature hero honesty", () => {
  const page = getFeatureBySlug("essay-grading");

  it("does not claim the AI references IPA 採点基準 (non-public)", () => {
    expect(page).toBeDefined();
    expect(page!.hero.subhead).not.toContain("採点基準を参照");
  });

  it("frames the basis as IPA 公式解答例 + 参考評価 (matches its own FAQ)", () => {
    expect(page!.hero.subhead).toContain("公式解答例");
    expect(page!.hero.subhead).toContain("参考評価");
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
