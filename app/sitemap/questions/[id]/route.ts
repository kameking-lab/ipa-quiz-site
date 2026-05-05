import { notFound } from "next/navigation";
import { getSitemapChunkCount } from "@/lib/seo/sitemap-pagination";
import { renderQuestionsSitemapChunkXml } from "@/lib/seo/sitemap-xml";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const count = getSitemapChunkCount();
  return Array.from({ length: count }, (_, i) => ({ id: `${i}.xml` }));
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const match = /^(\d+)\.xml$/.exec(id);
  if (!match) notFound();
  const pageIndex = Number(match[1]);
  if (pageIndex < 0 || pageIndex >= getSitemapChunkCount()) notFound();
  return new Response(renderQuestionsSitemapChunkXml(pageIndex), {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
