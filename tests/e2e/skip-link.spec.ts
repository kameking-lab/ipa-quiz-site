import { test, expect } from "@playwright/test";

// WCAG 2.4.1 Bypass Blocks (empirical review F-5). A single Tab from page load
// must reach the "skip to main content" link, and activating it must move focus
// into the main content region.
test.describe("skip link", () => {
  test("first Tab focuses the skip link, Enter jumps to #main-content", async ({ page }) => {
    await page.goto("/");

    await page.keyboard.press("Tab");
    const skip = page.locator('a[href="#main-content"]');
    await expect(skip).toBeFocused();
    await expect(skip).toBeVisible(); // focus:not-sr-only makes it visible

    await page.keyboard.press("Enter");
    // The target wrapper receives focus (tabIndex=-1).
    const main = page.locator("#main-content");
    await expect(main).toBeFocused();
  });
});
