import { test, expect } from "@playwright/test";

// 教育貢献プロジェクト方針により /pricing は恒久削除済み。middleware の GONE_PATHS で
// 410 Gone を返す（404 より強い「もう辿らなくてよい」シグナルでクロール資産を回復）。
// 詳細は middleware.ts と smoke-routes.spec.ts を参照。
test.describe("/pricing は恒久削除（410 Gone）", () => {
  test("/pricing は 410 を返す", async ({ request }) => {
    const res = await request.get("/pricing");
    expect(res.status()).toBe(410);
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
