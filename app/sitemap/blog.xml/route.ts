import { renderBlogSitemapXml } from "@/lib/seo/sitemap-xml";

export const dynamic = "force-static";

export async function GET() {
  return new Response(renderBlogSitemapXml(), {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
