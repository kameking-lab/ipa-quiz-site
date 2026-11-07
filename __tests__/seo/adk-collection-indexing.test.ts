import { describe, expect, it } from "vitest";
import { generateMetadata as categoryMetadata, generateStaticParams } from "@/app/[exam]/topic/[topicSlug]/page";
import { generateMetadata as searchMetadata } from "@/app/search/page";
import { generateMetadata as modeMetadata } from "@/app/modes/topic/page";
import { getAvailableExams, getQuestionsByExamStrict, groupByCategory } from "@/lib/seo/exam-meta";
import { renderExamsSitemapXml, renderMainSitemapXml } from "@/lib/seo/sitemap-xml";
import { SITE_BASE_URL } from "@/lib/seo/config";

describe("ADK collection search boundaries", () => {
  it("keeps every category usable but advertises only collections of multiple explained questions", async () => {
    const staticParams = new Set((await generateStaticParams()).map(p => `${p.exam}/${p.topicSlug}`));
    const sitemap = renderExamsSitemapXml();
    let singletonCount = 0;
    let collectionCount = 0;
    for (const exam of getAvailableExams()) {
      for (const { category, count } of groupByCategory(getQuestionsByExamStrict(exam))) {
        const path = `/${exam}/topic/${encodeURIComponent(category)}`;
        const metadata = await categoryMetadata({ params: Promise.resolve({ exam, topicSlug: category }) });
        expect(staticParams.has(`${exam}/${category}`), path).toBe(true);
        expect(metadata.alternates?.canonical, path).toBe(path);
        expect(metadata.robots, path).toEqual({ index: count > 1, follow: true });
        expect(sitemap.includes(`<loc>${SITE_BASE_URL}${path}</loc>`), path).toBe(count > 1);
        if (count === 1) singletonCount++;
        else collectionCount++;
      }
    }
    expect(singletonCount).toBeGreaterThan(0);
    expect(collectionCount).toBeGreaterThan(0);
  });

  it("keeps empty and parameterized search and mode pages crawlable with noindex", async () => {
    for (const params of [{}, { q: "TLS" }, { q: ["TLS", "DNS"] }]) {
      expect((await searchMetadata({ searchParams: Promise.resolve(params) })).robots)
        .toEqual({ index: false, follow: true });
    }
    for (const params of [{}, { exam: "fe" }, { exam: "fp3", session: "gakka" }]) {
      expect((await modeMetadata({ searchParams: Promise.resolve(params) })).robots)
        .toEqual({ index: false, follow: true });
    }
    const sitemap = renderMainSitemapXml();
    expect(sitemap).not.toContain(`<loc>${SITE_BASE_URL}/search</loc>`);
    expect(sitemap).not.toContain(`<loc>${SITE_BASE_URL}/modes/topic</loc>`);
  });
});
