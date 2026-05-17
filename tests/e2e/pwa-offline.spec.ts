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
    // CSS selector instead of getByRole — the first-visit WelcomeModal is a
    // Radix dialog which marks the rest of the document aria-hidden, so
    // role-based queries return nothing while the modal is on screen.
    await expect(page.locator("h1", { hasText: "オフライン演習" })).toBeAttached();
  });

  test("apple-mobile-web-app meta tags are present in the document head", async ({
    page,
  }) => {
    await page.goto("/");
    // Next.js 16 emits `title` and `status-bar-style` (the W3C-deprecated
    // `capable` tag is no longer emitted by the framework; the manifest's
    // `display: standalone` covers that signal instead).
    await expect(
      page.locator('meta[name="apple-mobile-web-app-title"]'),
    ).toHaveCount(1);
    await expect(
      page.locator('meta[name="apple-mobile-web-app-status-bar-style"]'),
    ).toHaveCount(1);
    await expect(page.locator('link[rel="manifest"]')).toHaveCount(1);
  });
});
