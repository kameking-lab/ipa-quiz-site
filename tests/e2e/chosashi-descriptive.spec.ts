import { test, expect } from "@playwright/test";

test("土地家屋調査士の記述を独自解答例として閲覧し、同じ問をクイズで開ける", async ({ page }) => {
  await page.goto("/q/chosashi/2025-autumn/am/q11");
  const model = page.getByRole("region", { name: "記述の独自解答例" });
  await expect(model.getByText(/法務省の公式解答ではありません/)).toBeVisible();
  await expect(model.getByText(/自動採点を行いません/)).toBeVisible();
  await expect(model.locator('img[src$=".svg"]')).toHaveCount(1);
  await expect(model.getByRole("link", { name: "法務省の公式問題PDF" })).toHaveAttribute("href", "https://www.moj.go.jp/content/001450010.pdf");
  await page.getByRole("link", { name: /クイズモードで開く/ }).first().click();
  await expect(page).toHaveURL(/exam=chosashi/);
  const practice = page.getByRole("region", { name: "記述の独自解答例" });
  await expect(practice.getByText(/法務省の公式解答ではありません/)).toBeVisible();
  await practice.locator("summary").click();
  await expect(practice.locator('img[src$=".svg"]')).toBeVisible();
});

test("土地家屋調査士の建物記述に計算図と公式出題趣旨を表示する", async ({ page }) => {
  await page.goto("/q/chosashi/2024-autumn/pm/q22");
  const model = page.getByRole("region", { name: "記述の独自解答例" });
  await expect(model.locator('img[src$=".svg"]')).toHaveCount(2);
  await expect(model.getByRole("link", { name: "公式出題の趣旨（公式解答ではありません）" })).toHaveAttribute("href", "https://www.moj.go.jp/content/001429852.pdf");
  await expect(model.getByRole("heading", { name: "自己確認の観点（独自作成）" })).toBeHidden();
  await model.locator("summary").click();
  await expect(model.getByRole("heading", { name: "自己確認の観点（独自作成）" })).toBeVisible();
  await expect(model.locator('img[src$=".svg"]')).toHaveCount(2);
  for (const figure of await model.locator('img[src$=".svg"]').all()) {
    await expect(figure).toBeVisible();
  }
});
