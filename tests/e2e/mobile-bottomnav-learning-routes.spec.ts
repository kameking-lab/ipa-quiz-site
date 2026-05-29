import { test, expect } from "@playwright/test";

/**
 * MobileBottomNav must hide on focused learning routes so it stops overlapping
 * their own fixed bottom CTA bar (致命傷⑨).
 *
 * The global bottom tab bar (nav[aria-label="モバイル底タブ"]) and the in-quiz
 * 「次の問題へ」 bar were both fixed bottom-0 z-30 on mobile; the bottom nav (DOM-
 * last) intercepted taps on the next-CTA centre. The nav is now hidden on /quiz*
 * and /q/*, while remaining on primary destinations.
 */
test.use({ viewport: { width: 360, height: 740 } });

const BOTTOM_NAV = "nav[aria-label='モバイル底タブ']";

test.describe("MobileBottomNav visibility by route", () => {
  test("hidden on /quiz, and the next-question CTA is tappable after answering", async ({ page }) => {
    await page.goto("/quiz?mode=random&exam=ap");
    // Bottom tab bar must not be present in the focused quiz flow.
    await expect(page.locator(BOTTOM_NAV)).toHaveCount(0);

    // Answer, then the next-CTA centre must be hit-testable (was intercepted by
    // the bottom nav before). DOM-last 次の問題へ = the fixed bottom bar.
    await page.getByRole("radio").first().click();
    const nextCta = page.getByRole("button", { name: "次の問題へ" }).last();
    await expect(nextCta).toBeVisible();
    await nextCta.click({ trial: true }); // throws if anything overlays it
  });

  test("hidden on /q/* question pages", async ({ page }) => {
    await page.goto("/q/ap/2024-autumn/am/q1");
    await expect(page.locator(BOTTOM_NAV)).toHaveCount(0);
  });

  test("visible on the home page", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(BOTTOM_NAV)).toBeVisible();
  });

  test("visible on /search and /mock-exam (no bottom-CTA collision there)", async ({ page }) => {
    await page.goto("/search");
    await expect(page.locator(BOTTOM_NAV)).toBeVisible();
    await page.goto("/mock-exam");
    await expect(page.locator(BOTTOM_NAV)).toBeVisible();
  });
});
