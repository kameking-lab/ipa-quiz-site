import { test, expect } from "@playwright/test";

// A URL that will never match any static or dynamic route
const NONEXISTENT = "/this-page-does-not-exist-xyz-abc-123";

test.describe("user journey: 404 and error pages", () => {
  test("nonexistent URL returns 404", async ({ request }) => {
    const res = await request.get(NONEXISTENT);
    expect(res.status()).toBe(404);
  });

  test("nonexistent exam code returns 404", async ({ request }) => {
    // "zz" is not a valid exam code — dynamic [exam] route calls notFound()
    const res = await request.get("/zz");
    expect(res.status()).toBe(404);
  });

  test("nonexistent year/season for valid exam returns 404", async ({ request }) => {
    const res = await request.get("/ap/1900-spring");
    expect(res.status()).toBe(404);
  });

  test("404 page renders navigable HTML (has links)", async ({ page }) => {
    const res = await page.goto(NONEXISTENT);
    expect(res?.status()).toBe(404);
    // The custom not-found page should provide navigation out
    const links = page.locator("a[href]");
    const count = await links.count();
    expect(count).toBeGreaterThan(0);
  });

  test("404 page does not show a blank screen", async ({ page }) => {
    await page.goto(NONEXISTENT);
    // Body must have non-empty text content
    const bodyText = await page.locator("body").textContent();
    expect((bodyText ?? "").trim().length).toBeGreaterThan(0);
  });
});
