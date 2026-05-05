import { notFound } from "next/navigation";
import { getIndexNowKeyFileContent } from "@/lib/seo/indexnow";

export const dynamic = "force-static";

/**
 * IndexNow key verification file at /indexnow-key.txt.
 * Reference this URL via `keyLocation` when posting to IndexNow.
 */
export async function GET() {
  const content = getIndexNowKeyFileContent();
  if (!content) notFound();
  return new Response(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
