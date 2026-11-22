import { expect, test } from "@playwright/test";
import { LS_KEYS } from "../../lib/storage/keys";

test.use({ viewport: { width: 390, height: 844 }, timezoneId: "Asia/Tokyo", serviceWorkers: "block" });

test("adds weather after loading without moving the hero and reuses it for an hour", async ({ page }) => {
  await page.clock.setFixedTime(new Date("2026-11-23T17:10:00+09:00"));
  let requests = 0;
  let showForecast: () => void = () => {};
  const forecastReady = new Promise<void>(resolve => { showForecast = resolve; });
  await page.route("**/api/home/weather", async route => {
    requests++;
    await forecastReady;
    await route.fulfill({ json: { weather: requests === 1 ? "rain" : "snow" } });
  });
  await page.goto("/");
  const hero = page.locator(".p3-home-scene");
  const layer = hero.locator("[data-home-weather]");
  await expect(page.locator('[data-home-state="new"]')).toBeVisible();
  await page.evaluate(() => document.fonts.ready.then(() => undefined));
  await expect.poll(() => requests).toBe(1);
  await expect(layer).toHaveCount(0);
  const before = await hero.boundingBox();
  showForecast();
  await expect(layer).toHaveAttribute("data-home-weather", "rain");
  await expect(layer).toHaveCSS("position", "absolute");
  expect(await hero.boundingBox()).toEqual(before);
  await expect(page.locator("html")).toHaveAttribute("data-home-scene", "evening");

  await page.clock.setFixedTime(new Date("2026-11-23T18:09:00+09:00"));
  await page.reload();
  await expect(layer).toHaveAttribute("data-home-weather", "rain");
  expect(requests).toBe(1);

  await page.clock.setFixedTime(new Date("2026-11-23T18:10:00+09:00"));
  await page.reload();
  await expect(layer).toHaveAttribute("data-home-weather", "snow");
  expect(requests).toBe(2);
});

test("stops precipitation offscreen and respects reduced motion", async ({ page }) => {
  await page.route("**/api/home/weather", route => route.fulfill({ json: { weather: "snow" } }));
  await page.goto("/");
  const layer = page.locator('[data-home-weather="snow"]');
  const fall = layer.locator(".p3-weather-fall");
  await expect(layer).toHaveAttribute("data-weather-moving", "");
  await expect.poll(() => fall.evaluate(el => getComputedStyle(el, "::before").animationPlayState)).toBe("running");
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await expect(layer).not.toHaveAttribute("data-weather-moving");
  await expect.poll(() => fall.evaluate(el => getComputedStyle(el, "::before").animationPlayState)).toBe("paused");
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(layer).toHaveAttribute("data-weather-moving", "");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect.poll(() => fall.evaluate(el => getComputedStyle(el, "::before").animationName)).toBe("none");
});

test("keeps an undecorated hero for null weather and caches that result", async ({ page }) => {
  let requests = 0;
  await page.route("**/api/home/weather", route => {
    requests++;
    return route.fulfill({ json: { weather: null } });
  });
  await page.goto("/");
  await expect.poll(() => page.evaluate(key => localStorage.getItem(key), LS_KEYS.homeWeather)).toContain('"weather":null');
  await page.reload();
  await expect(page.locator('[data-home-state="new"]')).toBeVisible();
  await expect(page.locator("[data-home-weather]")).toHaveCount(0);
  expect(requests).toBe(1);
});
