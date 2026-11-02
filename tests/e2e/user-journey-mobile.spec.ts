import { test, expect } from "@playwright/test";

// iPhone SE viewport — smallest common smartphone
test.use({ viewport: { width: 375, height: 667 } });

async function hasNoHorizontalOverflow(page: import("@playwright/test").Page): Promise<boolean> {
  return page.evaluate(() => {
    return document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1;
  });
}

test.describe("user journey: mobile viewport (375x667)", () => {
  test("exam index /ap renders without horizontal scroll", async ({ page }) => {
    await page.goto("/ap");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    expect(await hasNoHorizontalOverflow(page)).toBe(true);
  });

  test("quiz question /q/ap/2024-spring/am/q1 choices visible on mobile", async ({ page }) => {
    await page.goto("/q/ap/2024-spring/am/q1");
    const choicesSection = page.locator("[aria-label='選択肢と解答']");
    await expect(choicesSection).toBeVisible();
    expect(await hasNoHorizontalOverflow(page)).toBe(true);
  });

  test("retired SC sample returns 404 with no industry selector on mobile", async ({ page }) => {
    expect((await page.goto("/essays/sc/2025-spring/pm2/q1"))?.status()).toBe(404);
    await expect(page.getByRole("group", { name: "業種選択" })).toHaveCount(0);
    expect(await hasNoHorizontalOverflow(page)).toBe(true);
  });

  for (const [url, text] of [["/essay", "現在、掲載できる論述問題はありません。"], ["/essays", "現在掲載できる答案サンプルはありません。"]] as const) {
    test(`${url} has a readable empty state and home navigation on mobile`, async ({ page }) => {
      expect((await page.goto(url))?.status()).toBe(200);
      const main = page.getByRole("main");
      await expect(main.getByRole("status").filter({ hasText: text })).toHaveText(text);
      await expect(main.locator('a[href^="/essay/"], a[href^="/essays/"]')).toHaveCount(0);
      expect(await hasNoHorizontalOverflow(page)).toBe(true);
      if (url === "/essay") await expect(main.getByRole("link", { name: "これまでの採点履歴を見る" })).toHaveAttribute("href", "/account/essay-history");
      await main.getByRole("link", { name: "ホームから学習内容を選ぶ" }).click();
      await expect(page).toHaveURL(/\/$/);
    });
  }

  test("/stats page renders without horizontal scroll on mobile", async ({ page }) => {
    await page.goto("/stats");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    expect(await hasNoHorizontalOverflow(page)).toBe(true);
  });

  test("/blog index renders without horizontal scroll on mobile", async ({ page }) => {
    await page.goto("/blog");
    expect(await hasNoHorizontalOverflow(page)).toBe(true);
    // Should still have article links on mobile
    const articleLinks = page.locator("a[href^='/blog/']");
    expect(await articleLinks.count()).toBeGreaterThan(0);
  });
});
