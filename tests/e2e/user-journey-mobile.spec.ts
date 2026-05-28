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

  test("essay page /essays/sc/2025-spring/pm2/q1 industry tabs visible on mobile", async ({ page }) => {
    await page.goto("/essays/sc/2025-spring/pm2/q1");
    const tablist = page.getByRole("tablist");
    await expect(tablist).toBeVisible();
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
