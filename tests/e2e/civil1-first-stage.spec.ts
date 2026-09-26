import { test, expect } from "@playwright/test";

/**
 * 1級土木施工管理 第一次検定（令和8年度7月実施）：年度一覧の区分、公式図、問題A・Bの採点。
 */
test.describe("1級土木施工管理 第一次検定", () => {
  test("年度一覧に問題A 66問・問題B 34問と公式6区分が並ぶ", async ({ page }) => {
    const res = await page.goto("/civil1/2026-july");
    expect(res?.status()).toBe(200);
    await expect(page.getByText("100 問", { exact: true })).toBeVisible();
    await expect(page.locator('a[href^="/q/civil1/2026-july/mondai-a/"]')).toHaveCount(66);
    await expect(page.locator('a[href^="/q/civil1/2026-july/mondai-b/"]')).toHaveCount(34);
    await expect(page.locator('a[href="/q/civil1/2026-july/mondai-b/q7"]')).toHaveCount(0);
    await expect(page.getByRole("link", { name: /問題B・施工管理法（応用能力）・必須 21〜35/ })).toBeVisible();
  });

  test("問題A No.3 は公式図を表示し、誤答すると正解を示す", async ({ page }) => {
    await page.goto("/q/civil1/2026-july/mondai-a/q3");
    const figure = page.locator('img[src*="/questions/civil1/2026-july/a3-official-figure.png"]').first();
    await expect(figure).toBeVisible();
    expect(await figure.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(100);
    await page.getByRole("radio", { name: /選択肢 ア/ }).click();
    await expect(page.getByText(/不正解 — 正解は ウ/)).toBeVisible();
  });

  test("問題B No.6 は正答エで正解になる", async ({ page }) => {
    await page.goto("/q/civil1/2026-july/mondai-b/q6");
    await page.getByRole("radio", { name: /選択肢 エ/ }).click();
    await expect(page.getByText("正解！")).toBeVisible();
  });
});
