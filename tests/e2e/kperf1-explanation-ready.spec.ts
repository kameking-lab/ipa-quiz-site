import { expect, test } from "@playwright/test";
import { allowLoopbackWebKit } from "./helpers/local-webkit";

test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, serviceWorkers: "block" });
test.beforeEach(async ({ page, browserName }) => allowLoopbackWebKit(page, browserName));

for (const width of [320, 390]) for (const reducedMotion of ["reduce", "no-preference"] as const)
test(`prepared explanation receives focus without navigation or AI (${width}px, ${reducedMotion})`, async ({ page }) => {
  await page.setViewportSize({ width, height: 844 });
  await page.emulateMedia({ reducedMotion });
  let aiCalls = 0;
  await page.route("**/api/copilot**", route => { aiCalls++; return route.abort(); });
  await page.goto("/quiz?mode=year&exam=ap&year=2023&season=spring&session=am");
  const choice = page.getByRole("radio").first();
  await expect(choice).toBeVisible();
  const result = page.locator('[aria-label="解答結果"]');
  await expect(result).toHaveAttribute("inert", "");
  await expect(result).toBeHidden();
  await expect(result).toHaveCSS("height", "0px");
  await expect(page.getByRole("region", { name: /正解の解説/ })).toHaveCount(0);
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem("ipa-quiz:history:v1") ?? '{"entries":[]}').entries.length)).toBe(0);
  const url = page.url();
  await choice.tap();
  await expect(result).toBeVisible();
  await expect(result).not.toHaveAttribute("inert");
  await expect(result).toBeFocused();
  await expect(page.getByRole("region", { name: /正解の解説/ })).toBeInViewport();
  expect(page.url()).toBe(url);
  expect(aiCalls).toBe(0);
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem("ipa-quiz:history:v1")!).entries.length)).toBe(1);
  const next = page.getByRole("button", { name: /^(次の問題へ|結果を見る)/ }).first();
  const box = await next.boundingBox();
  expect(box!.height).toBeGreaterThanOrEqual(44);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  // Root overflow clipping can hide a wider flex item without increasing the
  // document scrollWidth. Check the actual result's edges as well.
  const resultBox = await result.boundingBox();
  expect(resultBox!.x).toBeGreaterThanOrEqual(0);
  expect(resultBox!.x + resultBox!.width).toBeLessThanOrEqual(width);
});
