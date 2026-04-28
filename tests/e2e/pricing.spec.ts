import { test, expect } from "@playwright/test";

test.describe("/pricing", () => {
  test("Educational contribution copy is present", async ({ page }) => {
    await page.goto("/pricing");
    const html = await page.content();
    // 教育貢献ピボット後は /pricing が無料化案内になっていること
    expect(html).toContain("教育貢献プロジェクト");
    expect(html).toContain("全機能を無料");
  });

  test("No paid pricing strings", async ({ page }) => {
    await page.goto("/pricing");
    const html = await page.content();
    // 旧 ¥1,480 / ¥2,980 / 月額 980 等が表示されないこと
    expect(html).not.toMatch(/¥1,480|¥2,980|¥980/);
    expect(html).not.toContain("月額 980");
  });

  test("Sitemap returns 200", async ({ request }) => {
    const res = await request.get("/sitemap.xml");
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toMatch(/xml/);
  });
});
