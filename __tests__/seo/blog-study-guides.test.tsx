import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import BlogArticlePage, { generateMetadata, generateStaticParams } from "@/app/blog/[slug]/page";
import { TOPIC_STUDY_GUIDES, TOPIC_GUIDE_INCOMING_LINKS } from "@/data/blog/topic-study-guides";
import { QUALIFICATION_STUDY_GUIDES } from "@/data/blog/qualification-study-guides";
import { getRelatedPosts } from "@/data/blog";
import { getRelatedBlogPosts } from "@/lib/blog/related-content";
import { renderBlogSitemapXml } from "@/lib/seo/sitemap-xml";
import { ALL_EXAM_CODES } from "@/lib/exam-config";

const guides = [...TOPIC_STUDY_GUIDES, ...QUALIFICATION_STUDY_GUIDES];

describe("new qualification study articles", () => {
  it("exposes all ten articles through real static routes, metadata, structured data and the sitemap", async () => {
    expect(guides).toHaveLength(10);
    const params = await generateStaticParams();
    const sitemap = renderBlogSitemapXml();
    for (const guide of guides) {
      expect(params).toContainEqual({ slug: guide.slug });
      expect(sitemap).toContain(`/blog/${guide.slug}</loc>`);
      const metadata = await generateMetadata({ params: Promise.resolve({ slug: guide.slug }) });
      expect(metadata.description).toBe(guide.description);
      expect(metadata.alternates?.canonical).toBe(`/blog/${guide.slug}`);
      const html = renderToStaticMarkup(await BlogArticlePage({ params: Promise.resolve({ slug: guide.slug }) }));
      const document = new DOMParser().parseFromString(html, "text/html");
      const graphs = [...document.querySelectorAll('script[type="application/ld+json"]')]
        .flatMap(script => JSON.parse(script.textContent || "{}")["@graph"] ?? []);
      expect(graphs).toContainEqual(expect.objectContaining({ "@type": "Article", headline: guide.title, description: guide.description }));
      expect(graphs).toContainEqual(expect.objectContaining({ "@type": "BreadcrumbList" }));
      expect(document.querySelectorAll("h1")).toHaveLength(1);
      expect(document.querySelector(`#article-body a[href="/${guide.exam}"]`)).not.toBeNull();
      for (const source of guide.sourceUrls ?? []) {
        expect(document.querySelector(`#article-body a[href="${source}"]`), `${guide.slug}: ${source}`).not.toBeNull();
      }
      const bookLinks = [...document.querySelectorAll('a[href^="/recommended-books/"]')];
      if (ALL_EXAM_CODES.some(exam => exam === guide.exam)) {
        expect(bookLinks.length).toBeGreaterThan(0);
      } else {
        expect(bookLinks, `${guide.slug} must not link to an unavailable book page`).toHaveLength(0);
      }
    }
  });

  it("links existing articles to details and non-IPA exam pages back to their own guide", () => {
    for (const [slug, details] of Object.entries(TOPIC_GUIDE_INCOMING_LINKS)) {
      expect(getRelatedPosts(slug).map(post => post.slug)[0]).toBe(details[0]);
    }
    for (const guide of QUALIFICATION_STUDY_GUIDES) {
      expect(getRelatedBlogPosts(guide.exam!, 3).map(post => post.slug)).toContain(guide.slug);
    }
  });
});
