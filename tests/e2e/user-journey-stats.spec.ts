import { test, expect } from "@playwright/test";

test.describe("user journey: /stats page", () => {
  test("/stats returns 200", async ({ request }) => {
    const res = await request.get("/stats");
    expect(res.status()).toBe(200);
  });

  test("/stats page has public statistics heading", async ({ page }) => {
    await page.goto("/stats");
    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toBeVisible();
    await expect(h1).toContainText("公開統計");
  });

  test("/stats page has content sections with data", async ({ page }) => {
    await page.goto("/stats");
    // The page shows content counts (questions, essays, etc.)
    // getContentCounts() is always available (static data), so these should render
    const content = await page.content();
    expect(content).toMatch(/収録問題数|問題|コンテンツ/);
  });

  test("/stats page has IPA source attribution", async ({ page }) => {
    await page.goto("/stats");
    const content = await page.content();
    expect(content).toMatch(/IPA|情報処理技術者/);
  });
});
