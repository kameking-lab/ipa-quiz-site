import { describe, expect, it } from "vitest";

import { generateMetadata as generateListingMetadata } from "@/app/e-learning/exams/page";
import {
  dynamicParams,
  generateMetadata,
  generateStaticParams,
} from "@/app/e-learning/exams/qualifications/[slug]/page";
import {
  QUALIFICATION_HUBS,
  qualificationHubPath,
} from "@/lib/exam-qualification-hubs";
import { SITE_BASE_URL } from "@/lib/seo/config";
import { renderMainSitemapXml } from "@/lib/seo/sitemap-xml";

describe("qualification hub SEO contract", () => {
  it("pre-renders only the configured qualification slugs", () => {
    expect(dynamicParams).toBe(false);
    expect(generateStaticParams()).toEqual(
      QUALIFICATION_HUBS.map((hub) => ({ slug: hub.slug })),
    );
  });

  it("gives the first-class health supervisor a unique self-canonical metadata set", async () => {
    const hub = QUALIFICATION_HUBS.find(
      (candidate) => candidate.slug === "dai-1-shu-eisei-kanrisha",
    )!;
    const metadata = await generateMetadata({ params: Promise.resolve({ slug: hub.slug }) });
    expect(metadata.title).toContain("第一種衛生管理者");
    expect(metadata.description).toContain("第一種衛生管理者");
    expect(metadata.description).toMatch(/\d+科目・\d+回・[\d,]+問/);
    expect(metadata.alternates?.canonical).toBe(qualificationHubPath(hub.slug));
    expect(metadata.robots).toMatchObject({ index: true, follow: true });
  });

  it("keeps legacy filter views out of the index", async () => {
    const filtered = await generateListingMetadata({
      searchParams: Promise.resolve({ group: "lckohyo", subject: "潜水士" }),
    });
    const clean = await generateListingMetadata({ searchParams: Promise.resolve({}) });
    expect(filtered.alternates?.canonical).toBe("/e-learning/exams");
    expect(filtered.robots).toMatchObject({ index: false, follow: true });
    expect(clean.robots).toMatchObject({ index: true, follow: true });
  });

  it("lists every hub canonical in the sitemap and no filter URL", () => {
    const xml = renderMainSitemapXml();
    for (const hub of QUALIFICATION_HUBS) {
      expect(xml).toContain(
        `<loc>${SITE_BASE_URL}${qualificationHubPath(hub.slug)}</loc>`,
      );
    }
    expect(xml).not.toMatch(/<loc>[^<]*\/e-learning\/exams\?[^<]*<\/loc>/);
  });
});
