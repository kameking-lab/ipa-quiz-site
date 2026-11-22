import { expect, test } from "@playwright/test";

test.use({ viewport: { width: 390, height: 844 }, timezoneId: "Asia/Tokyo", serviceWorkers: "block" });

test("loads only today's ornament and adds it over the weather without moving the hero", async ({ page }) => {
  await page.clock.setFixedTime(new Date("2026-10-31T17:10:00+09:00"));
  await page.addInitScript(() => {
    let loaded = false;
    window.addEventListener("load", () => { loaded = true; });
    const observer = new MutationObserver(() => {
      if (!document.querySelector("img[data-home-event]")) return;
      Object.assign(window, { ornamentInsertedAfterLoad: loaded });
      observer.disconnect();
    });
    observer.observe(document, { childList: true, subtree: true });
  });
  await page.route("**/api/home/weather", route => route.fulfill({ json: { weather: "snow" } }));
  await page.route("**/api/auth/session", route => route.fulfill({ json: null }));
  const images: string[] = [];
  let releaseImage = () => {};
  const imageMayLoad = new Promise<void>(resolve => { releaseImage = resolve; });
  await page.route("**/images/home/events/*.webp", async route => {
    images.push(new URL(route.request().url()).pathname);
    await imageMayLoad;
    await route.continue();
  });

  await page.goto("/");
  const hero = page.locator(".p3-home-scene");
  const ornament = hero.locator("img[data-home-event]");
  const trail = hero.locator(".p3-pace-track");
  await expect(ornament).toHaveAttribute("data-home-event", "halloween");
  await expect(ornament).toHaveAttribute("alt", "");
  await expect(ornament).toHaveAttribute("loading", "lazy");
  await expect(ornament).toHaveAttribute("fetchpriority", "low");
  await expect.poll(() => images).toEqual(["/images/home/events/halloween.webp"]);
  await expect(hero.locator("[data-home-weather]")).toHaveAttribute("data-home-weather", "snow");
  await expect(page.locator("html")).toHaveAttribute("data-home-scene", "evening");
  await page.evaluate(() => document.fonts.ready.then(() => undefined));
  const before = await hero.boundingBox();
  const trailBefore = await trail.boundingBox();
  releaseImage();
  await expect.poll(() => ornament.evaluate(image => (image as HTMLImageElement).naturalWidth)).toBe(96);
  expect(await hero.boundingBox()).toEqual(before);
  expect(await trail.boundingBox()).toEqual(trailBefore);
  expect(await page.evaluate(() =>
    (window as Window & { ornamentInsertedAfterLoad?: boolean }).ornamentInsertedAfterLoad,
  )).toBe(true);
});

for (const { width, file, motion } of [
  { width: 390, file: "christmas.webp", motion: "reduce" },
  { width: 1280, file: "christmas-wide.webp", motion: "no-preference" },
] as const) {
  test(`decodes only the selected event background at ${width}px without shifting content`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.emulateMedia({ reducedMotion: motion });
    await page.clock.setFixedTime(new Date("2026-12-25T21:10:00+09:00"));
    await page.route("**/api/home/weather", route => route.fulfill({ json: { weather: "snow" } }));
    await page.route("**/api/auth/session", route => route.fulfill({ json: null }));
    const imageRequests: string[] = [];
    let releaseImage = () => {};
    const imageMayLoad = new Promise<void>(resolve => { releaseImage = resolve; });
    await page.route(/\/images\/home\/(events|event-scenes)\/.*\.webp$/, async route => {
      imageRequests.push(new URL(route.request().url()).pathname);
      await imageMayLoad;
      await route.continue();
    });

    await page.goto("/");
    const hero = page.locator(".p3-home-scene");
    const art = hero.locator("[data-home-event-art]");
    const trail = hero.locator(".p3-pace-track");
    try {
      await expect(art).toHaveAttribute("data-home-event-art", "christmas");
      await expect(art).toHaveCSS("opacity", "0");
      await expect(art.locator("img")).toHaveAttribute("fetchpriority", "low");
      await expect(art).toHaveCSS("transition-property", motion === "reduce" ? "none" : "opacity");
      if (motion !== "reduce") await expect(art).toHaveCSS("transition-duration", "0.16s");
      await expect.poll(() => imageRequests).toEqual([`/images/home/event-scenes/${file}`]);
      await expect(hero.locator("[data-home-event]")).toHaveCount(0);
      await expect(hero.locator("[data-home-weather]")).toHaveAttribute("data-home-weather", "snow");
      await page.evaluate(() => document.fonts.ready.then(() => undefined));
      const before = await hero.boundingBox();
      const trailBefore = await trail.boundingBox();
      releaseImage();
      await expect(art).toHaveAttribute("data-home-event-ready", "true");
      await expect(art).toHaveCSS("opacity", "1");
      expect(await hero.boundingBox()).toEqual(before);
      expect(await trail.boundingBox()).toEqual(trailBefore);
      expect(imageRequests).toEqual([`/images/home/event-scenes/${file}`]);
    } finally {
      releaseImage();
    }
  });
}

test("keeps the CSS landscape when event art fails to load", async ({ page }) => {
  await page.clock.setFixedTime(new Date("2026-04-01T12:00:00+09:00"));
  await page.route("**/api/home/weather", route => route.fulfill({ json: { weather: "clear" } }));
  await page.route("**/api/auth/session", route => route.fulfill({ json: null }));
  await page.route("**/event-scenes/sakura.webp", route => route.fulfill({ status: 404 }));
  const imageResponse = page.waitForResponse("**/event-scenes/sakura.webp");
  await page.goto("/");
  await imageResponse;
  const hero = page.locator(".p3-home-scene");
  await expect(hero.locator("[data-home-event-art='sakura']")).toHaveCSS("opacity", "0");
  await expect(hero.locator("[data-home-event-ready], [data-home-event]")).toHaveCount(0);
  await expect(hero.getByRole("heading", { name: "今日も、ひと問ずつ。" })).toBeVisible();
});

test("switches from an ornament to a background at midnight and clears on ordinary dates", async ({ page }) => {
  await page.clock.install({ time: new Date("2026-12-31T23:59:58+09:00") });
  await page.clock.pauseAt(new Date("2026-12-31T23:59:59+09:00"));
  await page.route("**/api/home/weather", route => route.fulfill({ json: { weather: null } }));
  await page.route("**/api/auth/session", route => route.fulfill({ json: null }));
  await page.goto("/");
  await page.clock.runFor(10);
  const ornament = page.locator(".p3-home-scene [data-home-event]");
  await expect(ornament).toHaveAttribute("data-home-event", "new-years-eve");
  await page.clock.runFor(1000);
  const art = page.locator(".p3-home-scene [data-home-event-art]");
  await expect(ornament).toHaveCount(0);
  await expect(art).toHaveAttribute("data-home-event-art", "new-year");

  await page.clock.setSystemTime(new Date("2027-01-15T12:00:00+09:00"));
  await page.evaluate(() => window.dispatchEvent(new Event("pageshow")));
  await expect(ornament).toHaveCount(0);
  await expect(art).toHaveCount(0);
});

for (const colorScheme of ["light", "dark"] as const) {
  test(`uses the home sky for the header in ${colorScheme} mode only`, async ({ page }) => {
    await page.setViewportSize({ width: 820, height: 790 });
    await page.emulateMedia({ colorScheme });
    await page.clock.setFixedTime(new Date("2026-12-25T21:10:00+09:00"));
    await page.route("**/api/home/weather", route => route.fulfill({ json: { weather: null } }));
    await page.route("**/api/auth/session", route => route.fulfill({ json: null }));
    await page.goto("/");
    const header = page.locator(".site-header");
    const sky = await page.locator(".p3-home-scene").evaluate(hero => getComputedStyle(hero).getPropertyValue("--p3-sky").trim());
    const color = await page.evaluate(value => {
      const element = document.createElement("div");
      document.body.append(element);
      element.style.color = value;
      const color = getComputedStyle(element).color;
      element.remove();
      return color;
    }, sky);
    await expect(header).toHaveCSS("background-color", color);
    const textColor = "rgb(244, 247, 245)";
    await expect(header.getByText("過去問AI", { exact: true })).toHaveCSS("color", textColor);
    await expect(header.getByRole("link", { name: "メニュー" })).toHaveCSS("color", textColor);

    await header.getByRole("link", { name: "さがす" }).click();
    await expect(page).toHaveURL(/\/search$/);
    await expect(header).not.toHaveCSS("background-color", color);
  });
}
