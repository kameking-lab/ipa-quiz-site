import { test, expect } from "@playwright/test";

test.use({ viewport: { width: 390, height: 844 } });

const bottomNav = "nav[aria-label='モバイル底タブ']";

const surfaces = [
  {
    path: "/",
    selector: "#home-qualification-directory > summary",
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
    await page.goto(path, { waitUntil: "domcontentloaded" });
    const nav = page.locator(bottomNav);
    const surface = page.locator(selector).last();
    await expect(nav).toBeVisible();
    await expect(surface).toBeVisible();
    // Being inside the viewport can still leave the target behind the fixed nav.
    await surface.evaluate(element => element.scrollIntoView({ block: "center", behavior: "instant" }));
    await expect(surface).toBeInViewport({ ratio: 1 });

    const navBox = await nav.boundingBox();
    const surfaceBox = await surface.boundingBox();
    expect(navBox).not.toBeNull();
    expect(surfaceBox).not.toBeNull();
    expect(navBox!.y - (surfaceBox!.y + surfaceBox!.height)).toBeGreaterThanOrEqual(8);
    await surface.click({ trial: true });
  });
}

test("footer links remain above the fixed mobile nav", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const nav = page.locator(bottomNav);
  const footer = page.locator("footer");
  await footer.locator("summary").filter({ hasText: /^サイトマップ・運営情報$/ }).click();
  const footerLink = footer.getByRole("link", { name: "公式問題の著作権・出典", exact: true });
  await expect(nav).toBeVisible();
  await expect(footerLink).toBeVisible();
  await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "instant" }));
  await expect(footerLink).toBeInViewport({ ratio: 1 });

  const navBox = await nav.boundingBox();
  const linkBox = await footerLink.boundingBox();
  expect(navBox).not.toBeNull();
  expect(linkBox).not.toBeNull();
  expect(navBox!.y - (linkBox!.y + linkBox!.height)).toBeGreaterThanOrEqual(8);
  await footerLink.click({ trial: true });
});
