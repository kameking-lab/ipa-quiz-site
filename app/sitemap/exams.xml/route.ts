import { renderExamsSitemapXml } from "@/lib/seo/sitemap-xml";

export const dynamic = "force-static";

export async function GET() {
  return new Response(renderExamsSitemapXml(), {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
