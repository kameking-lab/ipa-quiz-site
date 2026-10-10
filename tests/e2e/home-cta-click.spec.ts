import { test, expect, type Locator, type Page } from "@playwright/test";

test.setTimeout(90_000);
test.use({ serviceWorkers: "block" });
test.beforeEach(async ({ page }) => { await page.route("https://**", (route) => route.abort()); });

// Fresh visits must not put an overlay between the user and qualification selection.
test.use({ storageState: { cookies: [], origins: [] } });
async function coordinateClick(page: Page, locator: Locator) {
  await expect(locator).toBeVisible();
  await locator.scrollIntoViewIfNeeded();
  const box = await locator.boundingBox();
  expect(box).not.toBeNull();
  await page.mouse.click(box!.x + box!.width / 2, box!.y + box!.height / 2);
}
for (const width of [360, 1280]) {
  test(`home qualification card -> start works with real clicks at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    // トップの IT・情報処理カードから資格ページへ直接進める。
    await page.locator("#choose-qualification").getByRole("button", { name: /^ITパスポート/ }).click();
    const qualification = page.locator('#choose-qualification a[href="/ip"]:visible');
    await qualification.click({ trial: true });
    await coordinateClick(page, qualification);
    await expect(page).toHaveURL(/\/ip$/, { timeout: 30_000 });
    const start = page.getByRole("link", { name: "今すぐ解く", exact: true });
    await expect(start).toHaveAttribute("href", "/quiz?mode=random&exam=ip");
    await coordinateClick(page, start);
    await expect(page).toHaveURL(/\/quiz\?mode=random&exam=ip/, { timeout: 30_000 });
    await expect(page.getByRole("radio").first()).toBeVisible({ timeout: 30_000 });
  });
}
test("first qualification remains stable through hydration", async ({ page }) => {
  await page.goto("/ipa", { waitUntil: "domcontentloaded" });
  const link = page.locator('main a[href="/ip"]');
  await expect(link).toBeVisible();
  const early = await link.boundingBox();
  await page.waitForLoadState("networkidle");
  const settled = await link.boundingBox();
  expect(early).not.toBeNull();
  expect(settled).not.toBeNull();
  expect(Math.abs(settled!.y - early!.y)).toBeLessThan(8);
  expect(Math.abs(settled!.x - early!.x)).toBeLessThan(8);
});
