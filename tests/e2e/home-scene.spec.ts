import { expect, test } from "@playwright/test";

test.use({
  viewport: { width: 390, height: 844 },
  timezoneId: "Pacific/Honolulu",
  serviceWorkers: "block",
  reducedMotion: "reduce",
});

test("selects the local landscape before hydration and refreshes on return", async ({ page }) => {
  // 05:00 in Honolulu, 15:00 UTC. Block React to exercise the document head.
  await page.clock.setFixedTime(new Date("2026-11-22T15:00:00Z"));
  await page.route("**/_next/static/**/*.js", route => route.abort());
  await page.goto("/");
  const root = page.locator("html");
  const hero = page.locator(".p3-home-scene");
  await expect(root).toHaveAttribute("data-home-scene", "morning");
  const morning = await hero.evaluate(element => getComputedStyle(element).backgroundImage);
  await page.clock.setFixedTime(new Date("2026-11-23T05:00:00Z"));
  await expect(root).toHaveAttribute("data-home-scene", "morning");
  await page.evaluate(() => document.dispatchEvent(new Event("visibilitychange")));
  await expect(root).toHaveAttribute("data-home-scene", "night");
  expect(await hero.evaluate(element => getComputedStyle(element).backgroundImage)).not.toBe(morning);
});

test("uses the daytime landscape when JavaScript is disabled", async ({ browser, baseURL }) => {
  const page = await browser.newPage({ javaScriptEnabled: false, baseURL, colorScheme: "light" });
  try {
    await page.goto("/");
    await expect(page.locator("html")).not.toHaveAttribute("data-home-scene");
    await expect(page.locator(".p3-home-scene")).toHaveCSS("background-color", "rgb(191, 227, 242)");
  } finally {
    await page.close();
  }
});
