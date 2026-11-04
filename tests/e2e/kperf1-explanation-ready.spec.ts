import { expect, test } from "@playwright/test";

test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });

test("prepared explanation stays hidden and inert until a real answer, then receives focus without navigation or AI", async ({ page }) => {
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
  const next = page.getByRole("navigation", { name: "解答後の学習操作" }).getByRole("button", { name: "次の1問" });
  const box = await next.boundingBox();
  expect(box!.height).toBeGreaterThanOrEqual(44);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
