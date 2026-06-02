import { renderBlogFeedXml } from "@/lib/seo/feed-xml";

export const dynamic = "force-static";

export async function GET() {
  return new Response(renderBlogFeedXml(), {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
