import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import BlogArticlePage, { generateMetadata, generateStaticParams } from "@/app/blog/[slug]/page";
import { getAllBlogSlugs, getBlogPostBySlug } from "@/data/blog";
import { buildWorkedExamplesPost } from "@/data/blog/worked-examples";
import { renderBlogSitemapXml } from "@/lib/seo/sitemap-xml";

const routes = [
  ["sa", "sa-yoru-tokurensyu"],
  ["nw", "nw-hinnshutsu-ronten-toppu10"],
  ["ap", "ap-yoru-tokurensyu"],
  ["sc", "sc-yoru-tokurensyu"],
  ["db", "db-hinnshutsu-ronten-toppu10"],
  ["pm", "pm-yoru-tokurensyu"],
] as const;

describe("IT search-entry practice guides", () => {
  it("renders all six existing canonical routes with source citations and exam links", async () => {
    const params = await generateStaticParams();
    const sitemap = renderBlogSitemapXml();
    expect(getAllBlogSlugs()).toHaveLength(192);
    for (const [exam, slug] of routes) {
      const post = getBlogPostBySlug(slug)!;
      expect(params).toContainEqual({ slug });
      expect(sitemap).toContain(`/blog/${slug}</loc>`);
      const metadata = await generateMetadata({ params: Promise.resolve({ slug }) });
      expect(metadata.title).toBe(post.title);
      expect(metadata.description).toBe(post.description);
      expect(metadata.alternates?.canonical).toBe(`/blog/${slug}`);
      const html = renderToStaticMarkup(await BlogArticlePage({ params: Promise.resolve({ slug }) }));
      const document = new DOMParser().parseFromString(html, "text/html");
      expect(document.querySelectorAll("h1")).toHaveLength(1);
      expect(document.querySelector("h1")?.textContent).toBe(post.title);
      const article = document.querySelector("#article-body")!;
      expect(article.querySelector(`a[href="/${exam}"]`)).not.toBeNull();
      expect(article.querySelectorAll("button, a[role=button]")).toHaveLength(0);
      for (const url of post.sourceUrls ?? []) {
        expect(article.querySelector(`a[href="${url}"]`), `${slug}: ${url}`).not.toBeNull();
      }
      const graph = [...document.querySelectorAll('script[type="application/ld+json"]')]
        .flatMap(script => JSON.parse(script.textContent || "{}")["@graph"] ?? []);
      expect(graph).toContainEqual(expect.objectContaining({
        "@type": "Article", headline: post.title, citation: post.sourceUrls,
      }));
      // Cross-article links must resolve without introducing another qualification.
      for (const link of article.querySelectorAll('a[href^="/blog/"]')) {
        const target = getBlogPostBySlug(link.getAttribute("href")!.slice("/blog/".length));
        expect(target, link.getAttribute("href")!).toBeDefined();
        if (target?.exam) expect(target.exam).toBe(exam);
      }
    }
  });

  it("keeps the NW/DB worked explanations and records an actual edit without inventing publication dates", () => {
    for (const exam of ["nw", "db"] as const) {
      const before = buildWorkedExamplesPost(exam, "2026-01-01T00:00:00.000Z");
      const after = getBlogPostBySlug(before.slug)!;
      // Check the explanations verbatim, including both original source/answer links.
      const expectedBody = exam === "db"
        ? before.body.replace("出題頻度の順位や次回の予測を示す記事ではなく、この二問で試験範囲を網羅するものでもありません。", "二問の解法だけで試験範囲を網羅するものではありません。")
        : before.body;
      expect(after.body).toContain(expectedBody);
      expect(after.sourceUrls).toEqual(expect.arrayContaining(before.sourceUrls!));
    }
    for (const [, slug] of routes) {
      const post = getBlogPostBySlug(slug)!;
      expect(post.editorialDates).toEqual({ firstPublishedAt: null, lastEditedAt: "2026-11-17" });
      expect(post.title).toContain("過去問");
      expect(post.body).toContain("以下は練習用の配分例です");
      expect(post.body).not.toContain("類題を3問");
    }
  });
});
