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

  test("retired essay page opens the official past-paper guide on mobile", async ({ page }) => {
    await page.goto("/essays/sc/2025-spring/pm2/q1");
    await expect(page).toHaveURL(/\/essay$/);
    await expect(page.getByRole("heading", { name: "午後II 論述の公式過去問", exact: true })).toBeVisible();
    await expect(page.getByRole("group", { name: "業種選択" })).toHaveCount(0);
    await expect(page.getByRole("link", { name: "IPA の過去問題一覧", exact: true })).toHaveAttribute("href", "https://www.ipa.go.jp/shiken/mondai-kaiotu/index.html");
    expect(await hasNoHorizontalOverflow(page)).toBe(true);
  });

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
