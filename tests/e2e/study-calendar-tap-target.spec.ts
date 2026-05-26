import { test, expect } from "@playwright/test";

// Empirical review A-5 / G-3: the dashboard learning heatmap cells were 12–14px,
// below the WCAG 2.5.8 (24px) minimum tap-target size. (A prior fix had only
// touched the home calendar, not this 365-day heatmap.)
test.describe("learning heatmap tap targets", () => {
  test("dashboard heatmap cells are at least 24x24px", async ({ page }) => {
    await page.goto("/account/dashboard");
    const heatmap = page.locator('[aria-label="過去365日の学習ヒートマップ"]');
    await expect(heatmap).toBeVisible({ timeout: 15000 });
    const cell = heatmap.locator("button").first();
    await expect(cell).toBeVisible();
    const box = await cell.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.width).toBeGreaterThanOrEqual(24);
    expect(box!.height).toBeGreaterThanOrEqual(24);
  });
});
