import { test, expect, type APIRequestContext } from "@playwright/test";

/**
 * 致命傷③: a blog article rendered the RAW per-exam count (IP = 2,398) and the
 * RAW grand total (14,402) while every other surface shows the indexable SSOT
 * counts (IP = 2,381 / total 12,653). The blog page read
 * QUESTIONS_BY_EXAM[...].length / ALL_QUESTIONS.length instead of the SSOT.
 *
 * This guards the behaviour, not a literal: the blog CTA count and the home
 * exam-list count both derive from the same SSOT, so they MUST be equal. No
 * hardcoded number — the assertion auto-follows the SSOT as the dataset grows,
 * and it would have failed pre-fix (2,398 ≠ 2,381).
 */

/** Pull the IP exam's advertised count out of the home page ItemList JSON-LD. */
async function homeIpCount(request: APIRequestContext): Promise<number | null> {
  const html = await (await request.get("/")).text();
  const blocks = [
    ...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs),
  ].map((m) => m[1]);
  for (const raw of blocks) {
    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch {
      continue;
    }
    const graph = (parsed as { "@graph"?: unknown[] })["@graph"] ?? [parsed];
    for (const node of graph as Array<Record<string, unknown>>) {
      if (node["@type"] !== "ItemList") continue;
      for (const item of (node.itemListElement as Array<Record<string, unknown>>) ?? []) {
        if (typeof item.url === "string" && /\/ip$/.test(item.url)) {
          const m = String(item.name).replace(/,/g, "").match(/(\d+)\s*問/);
          if (m) return Number(m[1]);
        }
      }
    }
  }
  return null;
}

test.describe("blog ↔ exam-list question-count consistency (SSOT)", () => {
  test("IP blog CTA count equals the home exam-list IP count", async ({ request }) => {
    const home = await homeIpCount(request);
    expect(home, "home JSON-LD must advertise the IP exam count").not.toBeNull();

    const blogHtml = await (await request.get("/blog/ip-nani-kara-benkyou")).text();
    // React splits text around interpolations with <!-- --> comment markers —
    // strip them so 「この試験を演習する（<!-- -->2,381<!-- -->問）」 matches.
    const clean = blogHtml.replace(/<!--[^>]*-->/g, "");
    const m = clean.match(/この試験を演習する（([\d,]+)問）/);
    expect(m, "blog IP CTA must render a 「この試験を演習する（N問）」 count").not.toBeNull();
    const blog = Number(m![1].replace(/,/g, ""));

    // The whole point: the blog must show the SSOT (indexable) count, identical
    // to the rest of the site — not the raw dataset length.
    expect(blog).toBe(home);
  });
});
