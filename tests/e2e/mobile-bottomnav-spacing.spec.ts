import { test, expect } from "@playwright/test";

test.use({ viewport: { width: 390, height: 844 } });

const bottomNav = "nav[aria-label='モバイル底タブ']";

const surfaces = [
  {
    path: "/",
    // The trust links (運営者情報など) are the final CTA on the home page.
    selector: "main section[aria-labelledby='home-trust-title'] a",
  },
  {
    path: "/ipa",
    // AU is the final card in the stable exam-card order.
    selector: "main a[href='/au']",
  },
  {
    path: "/recommended-books/ap",
    // BookCard exposes its stable book id on the outer card.
    selector: "main [id]",
  },
] as const;

for (const { path, selector } of surfaces) {
  test(`${path} keeps its final card/CTA at least 8px above the mobile nav`, async ({ page }) => {
    await page.goto(path);
    const nav = page.locator(bottomNav);
    const surface = page.locator(selector).last();
    await expect(nav).toBeVisible();
    await expect(surface).toBeVisible();
    await surface.scrollIntoViewIfNeeded();

    const navBox = await nav.boundingBox();
    const surfaceBox = await surface.boundingBox();
    expect(navBox).not.toBeNull();
    expect(surfaceBox).not.toBeNull();
    expect(navBox!.y - (surfaceBox!.y + surfaceBox!.height)).toBeGreaterThanOrEqual(8);
  });
}

test("footer links remain above the fixed mobile nav", async ({ page }) => {
  await page.goto("/");
  const nav = page.locator(bottomNav);
  const footerLink = page.locator("footer a").last();
  await expect(nav).toBeVisible();
  await footerLink.scrollIntoViewIfNeeded();
  await expect(footerLink).toBeVisible();

  const navBox = await nav.boundingBox();
  const linkBox = await footerLink.boundingBox();
  expect(navBox).not.toBeNull();
  expect(linkBox).not.toBeNull();
  expect(navBox!.y - (linkBox!.y + linkBox!.height)).toBeGreaterThanOrEqual(8);
});
