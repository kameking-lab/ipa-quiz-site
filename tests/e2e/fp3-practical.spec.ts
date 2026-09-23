import { expect, test } from "@playwright/test";

test("FP3 offers two complete practical years with readable choices and explanations", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/fp3");
  await expect(page.getByRole("link", { name: /学科を解く/ })).toBeVisible();
  await page.getByRole("link", { name: /実技の問題と模範解答（40問）/ }).click();
  await expect(page.getByRole("heading", { name: "FP3級 実技の過去問" })).toBeVisible();
  await expect(page.getByRole("link", { name: /2024年5月公表/ })).toBeVisible();
  await expect(page.getByRole("link", { name: /2025年5月公表/ })).toBeVisible();

  await page.getByRole("link", { name: /2024年5月公表/ }).click();
  await expect(page.getByRole("heading", { name: "2024年5月公表 実技20問" })).toBeVisible();
  await expect(page.getByRole("link", { name: /^問20 / })).toBeVisible();
  await page.getByRole("link", { name: /^問3 / }).click();
  await expect(page.getByRole("heading", { name: "2024年5月公表 実技 問3" })).toBeVisible();
  await expect(page.getByRole("img", { name: /問3 原典の資料/ }).first()).toBeVisible();
  await page.getByText("公式模範解答を見る").click();
  await expect(page.getByText(/^1\. 正解$|^2\. 正解$|^3\. 正解$/)).toBeVisible();
  await expect(page.getByRole("link", { name: "次の問題" })).toBeVisible();
  await expect(page.getByRole("link", { name: "問題一覧" })).toBeVisible();
});

test("FP3 final practical question keeps back navigation and official sources", async ({ page }) => {
  await page.goto("/fp3/practical/202505/20");
  await expect(page.getByRole("heading", { name: "2025年5月公表 実技 問20" })).toBeVisible();
  await expect(page.getByRole("link", { name: "前の問題" })).toBeVisible();
  await expect(page.getByRole("link", { name: "問題一覧" })).toBeVisible();
  await expect(page.getByRole("link", { name: /公式問題PDF/ })).toHaveAttribute("href", /j3_202505_q\.pdf#page=/);
  await expect(page.getByRole("link", { name: /公式模範解答PDF/ })).toHaveAttribute("href", /j3_202505_a\.pdf$/);
});
