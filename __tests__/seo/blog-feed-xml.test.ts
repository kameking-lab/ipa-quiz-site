import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { generateMetadata as blogPostMeta } from "@/app/blog/[slug]/page";
import { metadata as blogIndexMeta } from "@/app/blog/page";
import { getAllBlogSummaries, getBlogPostBySlug } from "@/data/blog";
import { SITE_BASE_URL } from "@/lib/seo/config";
import { renderBlogFeedXml } from "@/lib/seo/feed-xml";

// 127本のブログ記事に RSS フィードが無かった取り残しを解消した route の回帰 pin。
// 崩れたら落ちる property をガードする（item 欠落・死リンク・未エスケープ・順序崩れ）。
describe("renderBlogFeedXml", () => {
  const xml = renderBlogFeedXml();
  const posts = getAllBlogSummaries();

  it("is a well-formed RSS 2.0 channel with a self atom:link", () => {
    expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true);
    expect(xml).toContain('<rss version="2.0"');
    expect(xml).toContain("<channel>");
    expect(xml).toContain("</channel>");
    expect(xml).toContain("<language>ja</language>");
    expect(xml).toContain(
      `<atom:link href="${SITE_BASE_URL}/feed.xml" rel="self" type="application/rss+xml" />`,
    );
  });

  it("emits exactly one <item> per blog post", () => {
    const itemCount = (xml.match(/<item>/g) ?? []).length;
    expect(itemCount).toBe(posts.length);
    expect(itemCount).toBeGreaterThan(100);
  });

  it("every item <link> resolves to an existing /blog/<slug> page", () => {
    const links = [...xml.matchAll(/<link>([^<]+)<\/link>/g)].map((m) => m[1]);
    // channel <link> (→ /blog) + one per post
    const postLinks = links.filter((l) => l.startsWith(`${SITE_BASE_URL}/blog/`));
    expect(postLinks).toHaveLength(posts.length);
    for (const l of postLinks) {
      const slug = l.replace(`${SITE_BASE_URL}/blog/`, "");
      expect(getBlogPostBySlug(slug), `dead feed link: ${l}`).toBeDefined();
    }
  });

  it("every item carries a permalink guid and an RFC-822 pubDate", () => {
    expect((xml.match(/<guid isPermaLink="true">/g) ?? []).length).toBe(posts.length);
    const pubDates = [...xml.matchAll(/<pubDate>([^<]+)<\/pubDate>/g)].map((m) => m[1]);
    expect(pubDates).toHaveLength(posts.length);
    for (const d of pubDates) {
      // toUTCString() always ends in " GMT" and parses back to a valid date.
      expect(d.endsWith(" GMT")).toBe(true);
      expect(Number.isNaN(new Date(d).getTime())).toBe(false);
    }
  });

  it("orders items newest-first (matches the sitemap source ordering)", () => {
    const firstLink = xml.match(
      new RegExp(`<link>${SITE_BASE_URL.replace(/[.]/g, "\\.")}/blog/([^<]+)</link>`),
    );
    expect(firstLink?.[1]).toBe(posts[0]?.slug);
  });

  it("/blog declares feed autodiscovery (alternates.types is shadowed at root)", () => {
    // Nearly every page overrides alternates.canonical, which REPLACES (not
    // merges) the root layout's alternates — so a root-level feed type never
    // renders. The blog index is the semantically correct, reliable host.
    const types = blogIndexMeta.alternates?.types as
      | Record<string, unknown>
      | undefined;
    expect(types?.["application/rss+xml"]).toBe("/feed.xml");
  });

  it("/blog/[slug] also declares feed autodiscovery (subscribe from an article)", async () => {
    const meta = await blogPostMeta({
      params: Promise.resolve({ slug: posts[0].slug }),
    });
    const types = meta.alternates?.types as Record<string, unknown> | undefined;
    expect(types?.["application/rss+xml"]).toBe("/feed.xml");
  });

  it("/blog renders a visible RSS subscribe link for humans", () => {
    const source = readFileSync(join(process.cwd(), "app/blog/page.tsx"), "utf8");
    // plain <a> (not next/link) because /feed.xml is an XML route handler.
    expect(source).toContain('href="/feed.xml"');
    expect(source).toContain("RSS フィードで購読");
  });

  it("escapes ampersands so the XML never contains a raw &", () => {
    // After escaping, the only legal "&" occurrences are entity prefixes.
    const rawAmp = xml.replace(/&(amp|lt|gt|quot|apos|#\d+);/g, "");
    expect(rawAmp.includes("&")).toBe(false);
  });
});
