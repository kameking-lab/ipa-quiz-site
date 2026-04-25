import { test, expect } from "@playwright/test";

test.describe("/pricing", () => {
  test("Premium CTA does not link to /mock-exam", async ({ page }) => {
    await page.goto("/pricing");
    const html = await page.content();
    // Premium ボタンは onClick で /api/stripe/checkout を叩くので
    // Premium 文脈のリンクとしての /mock-exam は存在しないこと。
    const mockExamLinks = await page.locator('a[href="/mock-exam"]').count();
    expect(mockExamLinks).toBe(0);
    expect(html).toContain("Premium");
  });

  test("Premium CTA renders as a button (not a link)", async ({ page }) => {
    await page.goto("/pricing");
    const button = page.getByRole("button", { name: /Premium で始める|処理中/ });
    await expect(button).toBeVisible();
  });

  test("Sitemap returns 200", async ({ request }) => {
    const res = await request.get("/sitemap.xml");
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toMatch(/xml/);
  });
});
