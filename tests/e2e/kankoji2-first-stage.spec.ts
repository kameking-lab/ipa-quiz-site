import { test, expect } from "@playwright/test";

/**
 * 2級管工事施工管理 第一次検定：年度一覧・公式図・「二つとも答えなさい」形式の採点。
 */
test.describe("2級管工事施工管理 第一次検定", () => {
  for (const yearSeason of ["2026-early", "2025-late"]) {
    test(`${yearSeason} の年度一覧に全52問と公式6区分が並ぶ`, async ({ page }) => {
      const res = await page.goto(`/kankoji2/${yearSeason}`);
      expect(res?.status()).toBe(200);
      await expect(page.getByText("52 問", { exact: true })).toBeVisible();
      await expect(page.locator('a[href^="/q/kankoji2/"]')).toHaveCount(52);
      await expect(page.getByRole("link", { name: /施工管理法（基礎的な能力）・必須・各2肢選択 49〜52/ })).toBeVisible();
    });
  }

  test("No.49 は1肢目で採点せず、正答の2肢をそろえると正解", async ({ page }) => {
    await page.goto("/q/kankoji2/2026-early/gakka/q49");
    const choices = page.getByRole("group", { name: /2つ選ぶ/ });
    await expect(choices.getByRole("checkbox")).toHaveCount(4);
    await expect(page.getByTestId("multi-select-hint")).toContainText("0/2");
    await choices.getByRole("checkbox", { name: /選択肢 イ/ }).click();
    await expect(page.getByTestId("multi-select-hint")).toContainText("1/2");
    await expect(page.getByText("正解！")).toHaveCount(0);
    await choices.getByRole("checkbox", { name: /選択肢 エ/ }).click();
    await expect(page.getByText("正解！")).toBeVisible();
    await expect(page).toHaveURL(/\/q\/kankoji2\/2026-early\/gakka\/q49$/);
  });

  test("No.50 で一肢だけ正しい組合せは不正解", async ({ page }) => {
    await page.goto("/q/kankoji2/2026-early/gakka/q50");
    const choices = page.getByRole("group", { name: /2つ選ぶ/ });
    await choices.getByRole("checkbox", { name: /選択肢 ア/ }).click();
    await choices.getByRole("checkbox", { name: /選択肢 イ/ }).click();
    await expect(page.getByText(/不正解 — 正解は ア・エ/)).toBeVisible();
  });

  test("公式図付きの問題は原図を表示し、1肢選択で採点できる", async ({ page }) => {
    await page.goto("/q/kankoji2/2026-early/gakka/q30");
    const figure = page.locator('img[src*="/questions/kankoji2/2026-early/q30-official-figure.png"]').first();
    await expect(figure).toBeVisible();
    expect(await figure.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(100);
    await page.getByRole("radio", { name: /選択肢 ア/ }).click();
    await expect(page.getByText(/不正解 — 正解は イ/)).toBeVisible();
  });
});
