import { test, expect } from "@playwright/test";

test.describe("技術士 総合技術監理部門 択一式", () => {
  test("the exam top names the source, the law reference dates and the independence notice", async ({ page }) => {
    await page.goto("/soukan");
    await expect(page.getByText(/令和7年度・令和8年度の技術士第二次試験 総合技術監理部門/).first()).toBeVisible();
    await expect(page.getByText(/日本技術士会とは関係ありません/).first()).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });

  test("a question page grades the official answer and shows the attribution", async ({ page }) => {
    // 令和8年度 Ⅰ－1－1 の公式正答は⑤。
    await page.goto("/q/soukan/2026-annual/gakka/q1");
    await expect(page.getByText(/設備の管理特性/).first()).toBeVisible();
    const choices = page.getByRole("radio");
    await expect(choices).toHaveCount(5);
    await expect(choices.nth(4)).toHaveAccessibleName(/A：ウ／B：ア／C：エ／D：イ/);
    await choices.nth(4).click();
    await expect(page.getByText("正解！").first()).toBeVisible();
    await expect(page.getByText(/出典：公益社団法人日本技術士会 令和8年度技術士第二次試験/).filter({ visible: true }).first()).toBeVisible();
  });
});
