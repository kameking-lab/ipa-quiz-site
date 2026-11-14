import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Keep the original URL/scope so browsers with the old worker upgrade in place.
// Prerender once per build: idle worker restarts must not change cache names.
export const dynamic = "force-static";

export async function GET() {
  const source = await readFile(join(process.cwd(), "lib/pwa/sw.js"), "utf8");
  return new Response(source.replace("__PWA_BUILD_ID__", process.env.NEXT_PUBLIC_PWA_BUILD_ID ?? "development"), {
    headers: {
      "Content-Type": "application/javascript; charset=utf-8",
      "Cache-Control": "no-cache, max-age=0, must-revalidate",
      "Service-Worker-Allowed": "/",
    },
  });
}
