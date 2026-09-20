import { expect, test } from "@playwright/test";

const FIRST_HUB = "/e-learning/exams/qualifications/dai-1-shu-eisei-kanrisha";

function jsonLd(html: string): unknown[] {
  return [...html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
    .flatMap((match) => {
      const parsed: unknown = JSON.parse(match[1]);
      return Array.isArray(parsed) ? parsed : [parsed];
    });
}

test.describe("safety qualification hubs", () => {
  test("first-class health supervisor has unique SEO signals and real paper links", async ({ page }) => {
    const response = await page.goto(FIRST_HUB);
    expect(response?.status()).toBe(200);
    await expect(
      page.getByRole("heading", { level: 1, name: "第一種衛生管理者の過去問" }),
    ).toBeVisible();
    await expect(page).toHaveTitle(/第一種衛生管理者/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /第一種衛生管理者/,
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `https://www.kakomon-ai.jp${FIRST_HUB}`,
    );
    await expect(page.locator('a[href^="/e-learning/exams/lckohyo-"]').first()).toBeVisible();

    const html = await page.content();
    const schemas = jsonLd(html) as Array<Record<string, unknown>>;
    const collection = schemas.find((schema) => schema["@type"] === "CollectionPage");
    const breadcrumb = schemas.find((schema) => schema["@type"] === "BreadcrumbList");
    expect(collection?.name).toBe("第一種衛生管理者の過去問");
    expect(collection?.url).toBe(`https://www.kakomon-ai.jp${FIRST_HUB}`);
    expect(breadcrumb).toBeTruthy();
  });

  test("measurement and consultant item lists never cross qualification boundaries", async ({ request }) => {
    const measurementHtml = await (
      await request.get("/e-learning/exams/qualifications/sagyo-kankyo-sokuteishi")
    ).text();
    const safetyHtml = await (
      await request.get("/e-learning/exams/qualifications/rodo-anzen-consultant")
    ).text();
    const healthHtml = await (
      await request.get("/e-learning/exams/qualifications/rodo-eisei-consultant")
    ).text();

    const itemUrls = (html: string): string[] => {
      const collection = (jsonLd(html) as Array<Record<string, unknown>>).find(
        (schema) => schema["@type"] === "CollectionPage",
      );
      const list = collection?.mainEntity as { itemListElement?: Array<{ url?: string }> } | undefined;
      return (list?.itemListElement ?? []).flatMap((item) => item.url ? [item.url] : []);
    };
    expect(itemUrls(measurementHtml).length).toBeGreaterThan(0);
    expect(itemUrls(measurementHtml).every((url) => url.includes("/emkohyo-"))).toBe(true);
    expect(itemUrls(safetyHtml).every((url) => url.includes("/cskohyo-"))).toBe(true);
    expect(itemUrls(healthHtml).every((url) => url.includes("/cskohyo-"))).toBe(true);
    expect(safetyHtml).not.toContain("<h3 id=\"subject-労働衛生一般\"");
    expect(healthHtml).not.toContain("<h3 id=\"subject-産業安全一般\"");
  });

  test("legacy filters redirect to canonical hubs and invalid filters recover cleanly", async ({ request }) => {
    const legacy = await request.get(
      "/e-learning/exams?group=lckohyo&subject=%E7%AC%AC%E4%B8%80%E7%A8%AE%E8%A1%9B%E7%94%9F%E7%AE%A1%E7%90%86%E8%80%85",
      { maxRedirects: 0 },
    );
    expect(legacy.status()).toBe(308);
    expect(legacy.headers().location).toBe(FIRST_HUB);

    const invalid = await request.get("/e-learning/exams?group=unknown&subject=unknown", {
      maxRedirects: 0,
    });
    expect(invalid.status()).toBe(308);
    expect(invalid.headers().location).toBe("/e-learning/exams");

    const nonHub = await request.get(
      "/e-learning/exams?group=lckohyo&subject=%E6%BD%9C%E6%B0%B4%E5%A3%AB",
    );
    expect(nonHub.status()).toBe(200);
    const html = await nonHub.text();
    expect(html).toMatch(/<meta[^>]+name="robots"[^>]+noindex/);
    expect(html).toContain(
      'rel="canonical" href="https://www.kakomon-ai.jp/e-learning/exams"',
    );
  });

  test("unknown qualification slug is a real 404", async ({ request }) => {
    const response = await request.get("/e-learning/exams/qualifications/not-a-real-qualification");
    expect(response.status()).toBe(404);
  });
});
