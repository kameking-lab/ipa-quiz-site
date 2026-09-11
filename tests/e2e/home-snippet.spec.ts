import { test, expect } from "@playwright/test";

/**
 * Home SERP-snippet quality (致命傷⑦).
 *
 * Google was synthesising the homepage snippet from the rendered body and
 * pulling the HeroAiDemo widget text (「サンプル. AI 解説デモ. Q: 公開鍵暗号…」).
 * Fix: a clean meta description (also mirrored to og/twitter) + data-nosnippet
 * on the demo so Google never uses its text in a snippet.
 */

function metaContent(html: string, attr: "name" | "property", key: string): string | null {
  const re = new RegExp(
    `<meta[^>]*\\b${attr}="${key}"[^>]*\\bcontent="([^"]*)"[^>]*>|` +
      `<meta[^>]*\\bcontent="([^"]*)"[^>]*\\b${attr}="${key}"[^>]*>`,
    "i",
  );
  const m = html.match(re);
  if (!m) return null;
  // HTML-entity decode the few entities Next escapes in attributes.
  return (m[1] ?? m[2] ?? "")
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

test.describe("home SERP snippet", () => {
  test("meta description is clean and mirrored to og/twitter", async ({ request }) => {
    const html = await (await request.get("/")).text();

    const desc = metaContent(html, "name", "description");
    expect(desc, "meta description must be present").toBeTruthy();

    // No demo-widget wording leaks into the description.
    for (const bad of ["サンプル", "デモ", "公開鍵暗号", "Q:"]) {
      expect(desc!.includes(bad), `description must not contain "${bad}"`).toBe(false);
    }
    // Core value prop present.
    expect(desc!).toMatch(/無料/);

    // og:description and twitter:description match the meta description.
    expect(metaContent(html, "property", "og:description")).toBe(desc);
    expect(metaContent(html, "name", "twitter:description")).toBe(desc);
  });

  test("qualification catalog replaces the demo while preserving IPA structured data", async ({ page }) => {
    await page.goto("/ipa");
    await expect(page.locator(".hero-ai-demo")).toHaveCount(0);
    await expect(page.getByRole("heading", { name: "資格を選ぶ", exact: true })).toBeVisible();
    const nodes = await page.locator('script[type="application/ld+json"]').evaluateAll(scripts => scripts.flatMap(script => {
      const data = JSON.parse(script.textContent ?? "{}");
      return data["@graph"] ?? [data];
    }));
    const list = nodes.find(node => node["@type"] === "ItemList");
    expect(list?.numberOfItems).toBe(13);
    expect(list?.itemListElement).toHaveLength(13);
    expect(list?.itemListElement.some((item: { url: string }) => item.url.endsWith("/ip"))).toBe(true);
  });
});
