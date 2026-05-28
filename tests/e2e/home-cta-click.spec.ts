import { test, expect, type Locator, type Page } from "@playwright/test";

/**
 * Home primary-CTA click regression (empirical review F-2).
 *
 * The empirical review reported that the home hero CTA "まずは3問で試す" did not
 * navigate on a real mouse left-click, even though a synthetic element.click()
 * worked — the textbook signature of an element intercepting pointer events at
 * the CTA's coordinates (an overlay on top of the link).
 *
 * The rest of the suite seeds `ipa-quiz:onboarded:v1=1` via the global
 * storageState, which would mask any first-visit-only overlay. This spec
 * deliberately DROPS that seed so the page renders exactly as it does for a
 * genuine first-time visitor (the CTA's only audience — it retracts once a
 * history record exists).
 *
 * We verify with a true coordinate click (page.mouse.click at the element
 * centre), which performs no actionability retry/scroll, so an intercepting
 * overlay makes the assertion fail instead of silently passing.
 */
test.use({ storageState: { cookies: [], origins: [] } });

const PRIMARY = { name: "まずは3問で試す", path: "/quiz", search: "mode=random&exam=ap&limit=3" };
const SECONDARY = { name: "いきなり1問", path: "/quiz", search: "mode=random&exam=ap&limit=1" };

/** A real left-click at the visual centre of the element — no Playwright
 *  auto-scroll or actionability retry, matching a human/agent mouse click. */
async function coordinateClick(page: Page, locator: Locator): Promise<void> {
  await expect(locator).toBeVisible();
  await locator.scrollIntoViewIfNeeded();
  const box = await locator.boundingBox();
  expect(box, "CTA must have a bounding box").not.toBeNull();
  await page.mouse.click(box!.x + box!.width / 2, box!.y + box!.height / 2);
}

function expectQuizUrl(page: Page, search: string): void {
  const u = new URL(page.url());
  expect(u.pathname).toBe("/quiz");
  expect(u.search).toBe(`?${search}`);
}

test.describe("home primary CTA — real mouse click", () => {
  for (const cta of [PRIMARY, SECONDARY]) {
    test(`"${cta.name}" navigates on a coordinate left-click`, async ({ page }) => {
      await page.goto("/");
      const link = page.getByRole("link", { name: cta.name });

      // 1) Nothing may intercept pointer events at the CTA. trial:true runs the
      //    full actionability/hit-test WITHOUT clicking and throws a descriptive
      //    "intercepts pointer events" error naming the interceptor if covered.
      await link.click({ trial: true });

      // 2) Real coordinate click → must navigate.
      await coordinateClick(page, link);
      await page.waitForURL(/\/quiz\?/, { timeout: 10_000 });
      expectQuizUrl(page, cta.search);
    });
  }

  test("primary CTA works on a mobile viewport (360x740)", async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto("/");
    const link = page.getByRole("link", { name: PRIMARY.name });
    await link.click({ trial: true });
    await coordinateClick(page, link);
    await page.waitForURL(/\/quiz\?/, { timeout: 10_000 });
    expectQuizUrl(page, PRIMARY.search);
  });

  test("primary CTA href is a valid quiz deep-link (has mode → no /quiz→/ redirect)", async ({ page }) => {
    await page.goto("/");
    const href = await page.getByRole("link", { name: PRIMARY.name }).getAttribute("href");
    expect(href).toBe("/quiz?mode=random&exam=ap&limit=3");
    // Guard against the next.config.ts rule that 301s mode-less /quiz to "/".
    expect(href).toContain("mode=");
  });
});

/**
 * Diagnostics for the empirically-reported failure mode. A coordinate-driven
 * agent computes a target point, then clicks it; if the CTA shifts between
 * those two steps (late-hydrating widgets reflowing the hero), the click lands
 * on whatever moved underneath. These tests pin down whether the live page
 * actually exhibits such instability for a first-time visitor.
 */
test.describe("home primary CTA — stability & early-click", () => {
  test("CTA position is stable from DOMContentLoaded through full settle (no shift)", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const link = page.getByRole("link", { name: PRIMARY.name });
    await expect(link).toBeVisible();
    const early = await link.boundingBox();
    expect(early).not.toBeNull();
    // Let every deferred/idle widget mount and any reflow happen.
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(800);
    const settled = await link.boundingBox();
    expect(settled).not.toBeNull();
    // A few px of sub-pixel jitter is fine; a real overlay/reflow moves it far.
    expect(Math.abs(settled!.y - early!.y)).toBeLessThan(8);
    expect(Math.abs(settled!.x - early!.x)).toBeLessThan(8);
  });

  test("CTA navigates even when clicked at the earliest interactive moment", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const link = page.getByRole("link", { name: PRIMARY.name });
    await expect(link).toBeVisible();
    const box = await link.boundingBox();
    expect(box).not.toBeNull();
    await page.mouse.click(box!.x + box!.width / 2, box!.y + box!.height / 2);
    await page.waitForURL(/\/quiz\?/, { timeout: 10_000 });
    expectQuizUrl(page, PRIMARY.search);
  });
});
