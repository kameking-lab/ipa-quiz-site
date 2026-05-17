import { test, expect } from "@playwright/test";

test.describe("PWA offline support", () => {
  test("manifest is served with PWA-required fields", async ({ request }) => {
    const res = await request.get("/manifest.webmanifest");
    expect(res.status()).toBe(200);
    const manifest = (await res.json()) as Record<string, unknown>;

    expect(manifest.name).toBeTruthy();
    expect(manifest.short_name).toBeTruthy();
    expect(manifest.start_url).toBe("/");
    expect(manifest.display).toBe("standalone");
    expect(manifest.theme_color).toBeTruthy();
    expect(manifest.background_color).toBeTruthy();
    expect(Array.isArray(manifest.icons)).toBe(true);
    expect((manifest.icons as unknown[]).length).toBeGreaterThanOrEqual(2);
    expect(Array.isArray(manifest.shortcuts)).toBe(true);
  });

  test("service worker is served with no-cache + scope headers", async ({ request }) => {
    const res = await request.get("/sw.js");
    expect(res.status()).toBe(200);
    const cacheControl = res.headers()["cache-control"] || "";
    expect(cacheControl).toContain("must-revalidate");
    expect(res.headers()["service-worker-allowed"]).toBe("/");
    const body = await res.text();
    // Sanity-check that core SW lifecycle handlers are present.
    expect(body).toContain("'install'");
    expect(body).toContain("'activate'");
    expect(body).toContain("'fetch'");
    // The offline fallback target must be wired in.
    expect(body).toContain("/offline");
  });

  test("/offline page renders the offline shell", async ({ page }) => {
    const res = await page.goto("/offline");
    expect(res?.status()).toBe(200);
    await expect(page.getByRole("heading", { name: "オフライン演習" })).toBeVisible();
  });

  test("apple-mobile-web-app meta tags are present in the document head", async ({ page }) => {
    await page.goto("/");
    const capable = page.locator('meta[name="apple-mobile-web-app-capable"]');
    await expect(capable).toHaveCount(1);
    const title = page.locator('meta[name="apple-mobile-web-app-title"]');
    await expect(title).toHaveCount(1);
  });
});
