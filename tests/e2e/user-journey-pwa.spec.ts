import { test, expect } from "@playwright/test";

test.describe("PWA: manifest & service worker", () => {
  test("GET /manifest.webmanifest returns 200", async ({ request }) => {
    const res = await request.get("/manifest.webmanifest");
    expect(res.status()).toBe(200);
  });

  test("manifest.webmanifest has required PWA fields", async ({ request }) => {
    const res = await request.get("/manifest.webmanifest");
    const manifest = await res.json();
    expect(manifest.name).toBeTruthy();
    expect(manifest.short_name).toBeTruthy();
    expect(manifest.start_url).toBeTruthy();
    expect(manifest.display).toBe("standalone");
    expect(manifest.theme_color).toBeTruthy();
    expect(Array.isArray(manifest.icons)).toBe(true);
    expect(manifest.icons.length).toBeGreaterThan(0);
  });

  test("manifest.webmanifest has correct app name", async ({ request }) => {
    const res = await request.get("/manifest.webmanifest");
    const manifest = await res.json();
    expect(manifest.name).toContain("過去問");
  });

  test("manifest.webmanifest includes shortcut entries", async ({ request }) => {
    const res = await request.get("/manifest.webmanifest");
    const manifest = await res.json();
    expect(Array.isArray(manifest.shortcuts)).toBe(true);
    expect(manifest.shortcuts.length).toBeGreaterThan(0);
  });

  test("GET /sw.js returns 200 with correct headers", async ({ request }) => {
    const res = await request.get("/sw.js");
    expect(res.status()).toBe(200);
    // Service workers must not be stale-cached by the browser
    const cacheControl = res.headers()["cache-control"] ?? "";
    const swAllowed = res.headers()["service-worker-allowed"] ?? "";
    // Either must-revalidate or no-cache is valid for preventing SW stale caching
    expect(cacheControl).toMatch(/must-revalidate|no-cache|no-store/);
    // Service-Worker-Allowed header must scope to root
    expect(swAllowed).toBe("/");
  });

  test("GET /sw.js content includes fetch event listener", async ({ request }) => {
    const res = await request.get("/sw.js");
    if (res.status() === 200) {
      const text = await res.text();
      expect(text).toMatch(/addEventListener.*fetch|fetch.*addEventListener/i);
    }
  });
});

test.describe("PWA: offline page", () => {
  test("GET /offline returns 200", async ({ request }) => {
    const res = await request.get("/offline");
    expect(res.status()).toBe(200);
  });

  test("/offline page renders offline mode heading", async ({ page }) => {
    // Prevent WelcomeModal from opening — its aria-modal hides H1 from getByRole.
    await page.addInitScript(() => {
      localStorage.setItem("ipa-quiz:onboarded:v1", "1");
    });
    await page.goto("/offline");
    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toBeVisible();
    await expect(h1).toContainText("オフライン演習");
  });

  test("/offline page has bookmarks section", async ({ page }) => {
    await page.goto("/offline");
    const section = page.locator("[aria-labelledby='offline-bookmarks-heading']");
    await expect(section).toBeVisible();
  });

  test("/offline page has recent questions section", async ({ page }) => {
    await page.goto("/offline");
    const section = page.locator("[aria-labelledby='offline-recent-heading']");
    await expect(section).toBeVisible();
  });
});

test.describe("PWA: meta tags in document", () => {
  test("home page has manifest link tag", async ({ page }) => {
    await page.goto("/");
    const manifestLink = await page.$("link[rel='manifest']");
    expect(manifestLink).not.toBeNull();
  });

  test("home page has apple-mobile-web-app meta tags", async ({ page }) => {
    await page.goto("/");
    const title = await page.$("meta[name='apple-mobile-web-app-title']");
    const capable = await page.$("meta[name='apple-mobile-web-app-capable']");
    // At least one of the Apple PWA meta tags should be present
    expect(title !== null || capable !== null).toBe(true);
  });

  test("home page has theme-color meta tag", async ({ page }) => {
    await page.goto("/");
    const themeColor = await page.$("meta[name='theme-color']");
    expect(themeColor).not.toBeNull();
  });
});
