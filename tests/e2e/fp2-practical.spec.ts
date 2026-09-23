import { expect, test } from "@playwright/test";

test("FP2 practical papers remain separate from academic practice and show exact model answers", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/fp2");
  await expect(page.getByRole("link", { name: /学科を解く/ })).toBeVisible();
  await page.getByRole("link", { name: /実技の問題と模範解答/ }).click();
  await expect(page.getByRole("heading", { name: "FP2級 実技の過去問" })).toBeVisible();
  await page.getByRole("link", { name: /2024年5月試験/ }).click();
  await expect(page.getByRole("heading", { name: "2024年5月試験 実技40問" })).toBeVisible();
  await page.getByRole("link", { name: /^問7 / }).click();
  await expect(page.getByRole("heading", { name: "2024年5月試験 実技 問7" })).toBeVisible();
  await expect(page.getByRole("img", { name: /問7 の図表/ }).first()).toBeVisible();
  await page.getByText("公式模範解答を見る").click();
  await expect(page.getByText("260(㎡)")).toBeVisible();
  await page.getByRole("link", { name: "次の問題" }).click();
  await expect(page.getByRole("heading", { name: "2024年5月試験 実技 問8" })).toBeVisible();
  await expect(page.getByRole("img", { name: /問8 の図表/ })).toHaveCount(0);
});

test("FP2 CBT published practical paper exposes its final model answer", async ({ page }) => {
  await page.goto("/fp2/practical/202505/40");
  await expect(page.getByRole("heading", { name: "2025年5月公表 実技 問40" })).toBeVisible();
  await page.getByText("公式模範解答を見る").click();
  await expect(page.getByText("(ア)× (イ)× (ウ)×")).toBeVisible();
  await expect(page.getByRole("link", { name: /公式問題PDF/ })).toHaveAttribute("href", /j2_202505_q\.pdf#page=29$/);
});

test("FP2 numeric practical choices are separate cards and the answer includes the choice text", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/fp2/practical/202405/40");
  await expect(page.getByRole("heading", { name: "2024年5月試験 実技 問40" })).toBeVisible();
  const choices = page.getByLabel("選択肢").locator(":scope > div");
  await expect(choices).toHaveCount(4);
  await expect(choices.nth(0)).toContainText("17,560円");
  await page.getByText("公式模範解答を見る").click();
  await expect(page.getByText("3. 43,900円")).toBeVisible();
});

test("FP2 practical solutions show every option reason and preserve shared source tables", async ({ page }) => {
  await page.goto("/fp2/practical/202405/2");
  await page.getByText("公式模範解答を見る").click();
  await expect(page.getByRole("heading", { name: "各選択肢の理由" })).toBeVisible();
  await expect(page.getByLabel("解法と各肢の理由").locator("p.rounded-lg")).toHaveCount(4);
  await page.goto("/fp2/practical/202405/23");
  await expect(page.getByRole("img", { name: /問23 の図表/ })).toBeVisible();
  await page.getByText("公式模範解答を見る").click();
  await expect(page.getByText(/384×1\.02\^2/)).toBeVisible();
});
