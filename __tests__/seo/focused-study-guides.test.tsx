import { Children, isValidElement, type ReactNode } from "react";
import { describe, expect, it } from "vitest";
import BlogArticlePage, { generateMetadata, generateStaticParams } from "@/app/blog/[slug]/page";
import { JsonLd } from "@/components/seo/JsonLd";
import { getBlogPostBySlug, getRelatedPosts } from "@/data/blog";
import { renderBlogSitemapXml } from "@/lib/seo/sitemap-xml";
import { SITE_BASE_URL } from "@/lib/seo/config";

const guides = [
  ["sc-access-rights-lifecycle", "sc", "sc-ronbun-taisaku"],
  ["db-join-sum-granularity", "db", "db-sql-taisaku"],
  ["fe-sql-join-column-reading", "fe", "fe-goukaku-benkyouhou"],
] as const;

function findJsonLd(node: ReactNode): unknown {
  for (const child of Children.toArray(node)) {
    if (!isValidElement<{ data?: unknown; children?: ReactNode }>(child)) continue;
    if (child.type === JsonLd) return child.props.data;
    const found = findJsonLd(child.props.children);
    if (found) return found;
  }
}

describe("focused guides use the existing article publishing path", () => {
  for (const [slug, exam, parent] of guides) {
    it(`${slug}: emits metadata, Article JSON-LD and a sitemap URL with live internal links`, async () => {
      const post = getBlogPostBySlug(slug)!;
      const params = Promise.resolve({ slug });
      expect(await generateStaticParams()).toContainEqual({ slug });
      const metadata = await generateMetadata({ params });
      expect(metadata.description).toBe(post.description);
      expect(metadata.alternates?.canonical).toBe(`/blog/${slug}`);
      const graph = findJsonLd(await BlogArticlePage({ params })) as { "@graph": object[] };
      expect(graph["@graph"]).toContainEqual(expect.objectContaining({
        "@type": "Article", headline: post.title, description: post.description,
        url: `${SITE_BASE_URL}/blog/${slug}`, dateModified: "2026-11-11",
      }));
      expect(renderBlogSitemapXml()).toContain(`<loc>${SITE_BASE_URL}/blog/${slug}</loc>`);
      expect(post.body).toContain(`](/${exam})`);
      expect(post.body).toContain(`](/blog/${parent})`);
      expect(getBlogPostBySlug(parent)?.body).toContain(`](/blog/${slug})`);
      expect(getRelatedPosts(slug).some(p => p.slug === parent)).toBe(true);
      for (const [, linked] of post.body.matchAll(/\]\(\/blog\/([^)#?]+)\)/g)) {
        expect(getBlogPostBySlug(linked), `${slug} -> ${linked}`).toBeDefined();
      }
    });
  }
});
