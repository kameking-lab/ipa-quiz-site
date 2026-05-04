import { test, expect } from "@playwright/test";

// 教育貢献プロジェクト方針により /pricing は意図的に 404 を返す。
// 詳細は lib/seo/expected-404.ts と smoke-routes.spec.ts を参照。
test.describe("/pricing は意図的 404", () => {
  test("/pricing は 404 を返す", async ({ request }) => {
    const res = await request.get("/pricing");
    expect(res.status()).toBe(404);
  });

  test("/about の料金についてセクションが教育貢献ピボットを伝えている", async ({ page }) => {
    await page.goto("/about");
    const html = await page.content();
    expect(html).toContain("教育貢献プロジェクト");
    expect(html).toContain("料金プラン");
  });

  test("Sitemap returns 200", async ({ request }) => {
    const res = await request.get("/sitemap.xml");
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toMatch(/xml/);
  });
});
