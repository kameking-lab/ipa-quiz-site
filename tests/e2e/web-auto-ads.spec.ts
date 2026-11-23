import { expect, test, type Page } from "@playwright/test";
import { WEB_ADS_SCRIPT_FAILED, WEB_ADS_SCRIPT_ID, WEB_ADS_SCRIPT_URL } from "../../lib/ads/web-ads";

test.use({ serviceWorkers: "block" });

const tag = (page: Page) => page.locator(`#${WEB_ADS_SCRIPT_ID}`);
const fakeAd = (page: Page) => page.locator("[data-test-auto-ad]");

test.beforeEach(async ({ context }) => {
  await context.route(WEB_ADS_SCRIPT_URL, route => route.fulfill({
    contentType: "text/javascript",
    body: `const ad = document.createElement("div");
      ad.className = "google-auto-placed";
      ad.dataset.testAutoAd = "";
      const hero = document.querySelector("[data-home-event-art]");
      if (hero) ad.dataset.heroOpacity = getComputedStyle(hero).opacity;
      ad.textContent = "Test Auto Ad";
      document.body.appendChild(ad);`,
  }));
});

test("loads once after the free result, including after client navigation", async ({ page }) => {
  let scriptRequests = 0;
  page.on("request", request => { if (request.url() === WEB_ADS_SCRIPT_URL) scriptRequests += 1; });
  let allow!: () => void;
  const pending = new Promise<void>(resolve => { allow = resolve; });
  await page.route("**/api/billing/status", async route => {
    await pending;
    await route.fulfill({ json: { error: "sign_in_required" }, status: 401 });
  });
  const check = page.waitForRequest("**/api/billing/status");
  await page.goto("/");
  await check;
  await expect(tag(page)).toHaveCount(0);
  allow();
  await expect(tag(page)).toHaveCount(1);
  await expect(fakeAd(page)).toBeVisible();
  await page.getByText("サイトマップ・運営情報", { exact: true }).click();
  await page.locator('footer a[href="/blog"]').click();
  await expect(page).toHaveURL(/\/blog$/);
  await expect(tag(page)).toHaveCount(1);
  await expect(fakeAd(page)).toHaveCount(1);
  expect(scriptRequests).toBe(1);
});

test("keeps the script out of a paid member's first page", async ({ page }) => {
  await page.route("**/api/billing/status", route => route.fulfill({ json: { entitled: true } }));
  const checked = page.waitForResponse("**/api/billing/status");
  await page.goto("/about");
  await checked;
  await page.evaluate(() => new Promise<void>(resolve => requestIdleCallback(() => resolve())));
  await expect(tag(page)).toHaveCount(0);
});

test("allows the seasonal home hero to paint before ads", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.clock.setFixedTime(new Date("2026-10-31T12:00:00Z"));
  let releaseImage!: () => void;
  const pendingImage = new Promise<void>(resolve => { releaseImage = resolve; });
  const background = "**/images/home/event-scenes/halloween.webp";
  await page.route(background, async route => {
    await pendingImage;
    await route.fulfill({ contentType: "image/gif", body: Buffer.from("R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", "base64") });
  });
  await page.route("**/api/billing/status", route => route.fulfill({ json: { entitled: false } }));
  const imageRequested = page.waitForRequest(background);
  const membershipChecked = page.waitForResponse("**/api/billing/status");
  await page.goto("/", { waitUntil: "domcontentloaded" });
  try {
    await Promise.all([imageRequested, membershipChecked]);
    await page.evaluate(() => new Promise<void>(resolve => requestIdleCallback(() => resolve())));
    await expect(tag(page)).toHaveCount(0);
  } finally {
    releaseImage();
  }
  await expect(page.locator('[data-home-event-art="halloween"]')).toHaveAttribute("data-home-event-ready", "true");
  await expect(fakeAd(page)).toBeVisible();
  await expect(fakeAd(page)).toHaveAttribute("data-hero-opacity", "1");
});

test("keeps the script out of the app WebView", async ({ page }) => {
  await page.addInitScript(() => { Object.assign(window, { Capacitor: { isNativePlatform: () => true } }); });
  await page.route("**/api/billing/status", route => route.fulfill({ json: { entitled: false } }));
  await page.goto("/about");
  await expect(page.locator("html")).toHaveClass(/\bnative-app\b/);
  await expect(tag(page)).toHaveCount(0);
});

for (const path of ["/quiz?mode=random&exam=ap&limit=3", "/auth/signin", "/billing/terms", "/settings", "/q/ad-test-missing/2009-spring/am/q1"]) {
  test(`keeps the script out of ${path}`, async ({ page }) => {
    await page.route("**/api/billing/status", route => route.fulfill({ json: { entitled: false } }));
    await page.goto(path);
    await expect(page).toHaveURL(url => url.pathname === path.split("?")[0]);
    await page.evaluate(() => new Promise<void>(resolve => requestIdleCallback(() => resolve())));
    await expect(tag(page)).toHaveCount(0);
  });
}

test("clears a running script on a client-side transition to billing", async ({ page }) => {
  await page.route("**/api/billing/status", route => route.fulfill({ json: { entitled: false } }));
  await page.goto("/about");
  await expect(fakeAd(page)).toBeVisible();
  const documentRequest = page.waitForRequest(request => request.isNavigationRequest() &&
    new URL(request.url()).pathname === "/billing/terms");
  await page.getByRole("link", { name: "月額プランの条件" }).click();
  await documentRequest;
  await page.waitForLoadState("load");
  await expect(tag(page)).toHaveCount(0);
  await expect(fakeAd(page)).toHaveCount(0);
});

test("keeps client navigation after a blocked script", async ({ page }) => {
  await page.route(WEB_ADS_SCRIPT_URL, route => route.abort());
  await page.route("**/api/billing/status", route => route.fulfill({ json: { entitled: false } }));
  await page.goto("/about");
  await expect(tag(page)).toHaveAttribute(WEB_ADS_SCRIPT_FAILED, "");
  await page.getByRole("link", { name: "月額プランの条件" }).click();
  await expect(page).toHaveURL(/\/billing\/terms$/);
  await expect(tag(page)).toHaveAttribute(WEB_ADS_SCRIPT_FAILED, "");
  await expect(fakeAd(page)).toHaveCount(0);
});

test("clears ads when purchase confirmation in another tab changes eligibility", async ({ context, page }) => {
  let entitled = false;
  await page.route("**/api/billing/status", route => route.fulfill({ json: { entitled } }));
  await page.goto("/about");
  await expect(fakeAd(page)).toBeVisible();
  const reload = page.waitForRequest(request => request.isNavigationRequest() &&
    new URL(request.url()).pathname === "/about");

  const order = "ca570a11-78e4-4b70-b1ec-85ed89b76a01";
  const purchase = await context.newPage();
  await purchase.route(url => url.pathname === "/api/billing/status" && url.searchParams.get("order") === order,
    route => {
      entitled = true;
      return route.fulfill({ json: { entitled, purchase: { id: order, status: "paid" } } });
    });
  await purchase.goto(`/billing/success?order=${order}`);
  await expect(purchase.getByRole("heading", { name: "購入が完了しました" })).toBeVisible();
  await expect(tag(purchase)).toHaveCount(0);

  await reload;
  await page.waitForLoadState("load");
  await expect(tag(page)).toHaveCount(0);
  await expect(fakeAd(page)).toHaveCount(0);
});
