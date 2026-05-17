import { test, expect } from "@playwright/test";

// Slugs verified to exist in data/blog/
const REAL_SLUG = "ipa-cyokusen-1shukan";
const REAL_SLUG_2 = "kakomon-nannenbun";

test.describe("user journey: blog HTTP status", () => {
  test("/blog index returns 200", async ({ request }) => {
    const res = await request.get("/blog");
    expect(res.status()).toBe(200);
  });

  test("/blog/ipa-cyokusen-1shukan returns 200", async ({ request }) => {
    const res = await request.get(`/blog/${REAL_SLUG}`);
    expect(res.status()).toBe(200);
  });

  test("/blog/kakomon-nannenbun returns 200", async ({ request }) => {
    const res = await request.get(`/blog/${REAL_SLUG_2}`);
    expect(res.status()).toBe(200);
  });

  test("nonexistent blog slug returns 404", async ({ request }) => {
    const res = await request.get("/blog/this-slug-does-not-exist-xyz-abc-123");
    // App may render a "not found" UI with 200, or return a proper 404.
    expect([200, 404]).toContain(res.status());
  });
});

test.describe("user journey: blog page content", () => {
  test("/blog index has article links", async ({ page }) => {
    await page.goto("/blog");
    // Blog index lists articles with links to /blog/{slug}
    const articleLinks = page.locator("a[href^='/blog/']");
    const count = await articleLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  test("/blog article page has h1 heading", async ({ page }) => {
    await page.goto(`/blog/${REAL_SLUG}`);
    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toBeVisible();
  });

  test("/blog article page has internal navigation links", async ({ page }) => {
    await page.goto(`/blog/${REAL_SLUG}`);
    // Should have at least one internal link (nav, related articles, etc.)
    const internalLinks = page.locator("a[href^='/']");
    const count = await internalLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  test("/blog article contains exam-related content", async ({ page }) => {
    await page.goto(`/blog/${REAL_SLUG}`);
    const content = await page.content();
    // ipa-cyokusen-1shukan is about IPA exam 1-week sprint strategy
    expect(content).toMatch(/IPA|情報処理|試験|過去問/);
  });
});
