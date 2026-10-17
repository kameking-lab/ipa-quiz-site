import { expect, test } from "@playwright/test";

test("FP3 offers three complete practical years with readable choices and explanations", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/fp3");
  await expect(page.getByRole("link", { name: /学科を解く/ })).toBeVisible();
  await page.getByRole("link", { name: /実技の問題と模範解答（60問）/ }).click();
  await expect(page.getByRole("heading", { name: "FP3級 実技の過去問" })).toBeVisible();
  await expect(page.getByRole("link", { name: /2024年5月公表/ })).toBeVisible();
  await expect(page.getByRole("link", { name: /2025年5月公表/ })).toBeVisible();
  await expect(page.getByRole("link", { name: /2026年5月公表/ })).toBeVisible();

  await page.getByRole("link", { name: /2024年5月公表/ }).click();
  await expect(page.getByRole("heading", { name: "2024年5月公表 実技20問" })).toBeVisible();
  await expect(page.getByRole("link", { name: /^問20 / })).toBeVisible();
  await page.getByRole("link", { name: /^問3 / }).click();
  await expect(page.getByRole("heading", { name: "2024年5月公表 実技 問3" })).toBeVisible();
  await expect(page.getByRole("img", { name: /問3 原典の資料/ }).first()).toBeVisible();
  await page.getByText("解答と解説を見る").click();
  await expect(page.getByRole("region", { name: "公式模範解答", exact: true })).toContainText(/設問で選ぶ番号：[123]/);
  await expect(page.getByText(/^[123]\. 公式解答で選ぶ肢$/)).toBeVisible();
  await expect(page.getByRole("region", { name: "当サイト独自の解説", exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "次の問題" })).toBeVisible();
  await expect(page.getByRole("link", { name: "問題一覧" })).toBeVisible();
});

test("FP3 incorrect-statement question separates answer number from statement truth", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/fp3/practical/202605/2");
  await page.getByText("解答と解説を見る", { exact: true }).click();
  const official = page.getByRole("region", { name: "公式模範解答", exact: true });
  await expect(official).toContainText("設問で選ぶ番号：3");
  await expect(official).toContainText("選んだ記述そのものが正しいという意味ではありません");
  await expect(page.getByRole("region", { name: "当サイト独自の解説", exact: true })).toBeVisible();
  await expect(page.getByText("3. 公式解答で選ぶ肢", { exact: true })).toBeVisible();
  await expect(page.getByText("3. 正解", { exact: true })).toHaveCount(0);
  await expect(page.getByRole("link", { name: /公式模範解答PDF/ })).toHaveAttribute("href", /j3_202605_a\.pdf$/);
});

test("FP3 final practical question keeps back navigation and official sources", async ({ page }) => {
  await page.goto("/fp3/practical/202505/20");
  await expect(page.getByRole("heading", { name: "2025年5月公表 実技 問20" })).toBeVisible();
  await expect(page.getByRole("link", { name: "前の問題" })).toBeVisible();
  await expect(page.getByRole("link", { name: "問題一覧" })).toBeVisible();
  await expect(page.getByRole("link", { name: /公式問題PDF/ })).toHaveAttribute("href", /j3_202505_q\.pdf#page=/);
  await expect(page.getByRole("link", { name: /公式模範解答PDF/ })).toHaveAttribute("href", /j3_202505_a\.pdf$/);
});
