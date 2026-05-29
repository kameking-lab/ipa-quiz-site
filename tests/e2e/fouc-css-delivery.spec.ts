import { test, expect } from "@playwright/test";

/**
 * No-FOUC regression guard (致命傷⑪ — investigation outcome: case Y / not
 * reproducing).
 *
 * The empirical review reported a 2–3s flash of unstyled content on first
 * navigation to /q/*, suspecting CORS-restricted CSS. Investigation found the
 * opposite: the page ships its CSS as render-blocking, same-origin
 * `<link rel="stylesheet" data-precedence="next">` in <head> (the standard
 * Next App Router pipeline) — which prevents FOUC by blocking first paint until
 * CSS is ready. No async/print-swap CSS, no cross-origin stylesheet, no
 * experimental optimizeCss/inlineCss.
 *
 * This guard fails if a future change reintroduces a FOUC risk: async-loaded
 * CSS (media="print" swap), cross-origin app CSS, or Tailwind not applying.
 */
const Q = "/q/ap/2024-autumn/am/q1";

test.describe("no FOUC on /q/*", () => {
  test("head ships render-blocking, same-origin stylesheets (no async swap)", async ({ request }) => {
    const html = await (await request.get(Q)).text();
    const links = [...html.matchAll(/<link[^>]*rel="stylesheet"[^>]*>/gi)].map((m) => m[0]);
    expect(links.length, "at least one render-blocking stylesheet in <head>").toBeGreaterThan(0);
    for (const link of links) {
      // Same-origin Next-managed CSS (not a cross-origin/CORS-restricted sheet).
      expect(link).toMatch(/href="\/_next\/static\//);
      // data-precedence => Next renders it as render-blocking <head> CSS.
      expect(link).toMatch(/data-precedence/);
      // Must NOT be an async "print-then-swap" load (a classic FOUC source).
      expect(link).not.toMatch(/media="print"/);
    }
  });

  test("Tailwind is applied on first render (no unstyled flash)", async ({ page }) => {
    await page.goto(Q);
    const main = page.locator("main").first();
    await expect(main).toBeVisible();
    // The /q main has `max-w-3xl` (48rem = 768px). If Tailwind never applied
    // (FOUC), computed max-width would be "none".
    const maxWidth = await main.evaluate((el) => getComputedStyle(el).maxWidth);
    expect(maxWidth).toBe("768px");
    // And at least one stylesheet is actually attached.
    const sheetCount = await page.evaluate(() => document.styleSheets.length);
    expect(sheetCount).toBeGreaterThan(0);
  });
});
