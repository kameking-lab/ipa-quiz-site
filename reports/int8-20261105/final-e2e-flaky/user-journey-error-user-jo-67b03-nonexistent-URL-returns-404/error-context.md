# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: user-journey-error.spec.ts >> user journey: 404 and error pages >> nonexistent URL returns 404
- Location: tests\e2e\user-journey-error.spec.ts:7:7

# Error details

```
Error: apiRequestContext.get: read ECONNRESET
Call log:
  - → GET http://127.0.0.1:3000/this-page-does-not-exist-xyz-abc-123
    - user-agent: Playwright/1.60.0 (x64; windows 10.0) node/24.13 CI/1
    - accept: */*
    - accept-encoding: gzip,deflate,br

```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | // A URL that will never match any static or dynamic route
  4  | const NONEXISTENT = "/this-page-does-not-exist-xyz-abc-123";
  5  | 
  6  | test.describe("user journey: 404 and error pages", () => {
  7  |   test("nonexistent URL returns 404", async ({ request }) => {
> 8  |     const res = await request.get(NONEXISTENT);
     |                               ^ Error: apiRequestContext.get: read ECONNRESET
  9  |     expect(res.status()).toBe(404);
  10 |   });
  11 | 
  12 |   test("nonexistent exam code returns 404", async ({ request }) => {
  13 |     // "zz" is not a valid exam code — dynamic [exam] route calls notFound()
  14 |     const res = await request.get("/zz");
  15 |     expect(res.status()).toBe(404);
  16 |   });
  17 | 
  18 |   test("nonexistent year/season for valid exam returns 404", async ({ request }) => {
  19 |     const res = await request.get("/ap/1900-spring");
  20 |     expect(res.status()).toBe(404);
  21 |   });
  22 | 
  23 |   test("404 page renders navigable HTML (has links)", async ({ page }) => {
  24 |     const res = await page.goto(NONEXISTENT);
  25 |     expect(res?.status()).toBe(404);
  26 |     // The custom not-found page should provide navigation out
  27 |     const links = page.locator("a[href]");
  28 |     const count = await links.count();
  29 |     expect(count).toBeGreaterThan(0);
  30 |   });
  31 | 
  32 |   test("404 page does not show a blank screen", async ({ page }) => {
  33 |     await page.goto(NONEXISTENT);
  34 |     // Body must have non-empty text content
  35 |     const bodyText = await page.locator("body").textContent();
  36 |     expect((bodyText ?? "").trim().length).toBeGreaterThan(0);
  37 |   });
  38 | });
  39 | 
```