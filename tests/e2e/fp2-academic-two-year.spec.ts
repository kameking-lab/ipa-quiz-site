import { expect, test } from "@playwright/test";

test("FP2 shows ten academic sessions and preserves the publication labels", async ({ page }) => {
  await page.goto("/fp2");
  await expect(page.getByText("収録 720 問", { exact: true })).toBeVisible();
  const years = page.getByRole("region", { name: "年度別の過去問" });
  await expect(years.getByRole("link")).toHaveCount(4);
  await years.locator("summary").filter({ hasText: "以前の年度・回も見る" }).click();
  await expect(years.getByRole("link")).toHaveCount(12);

  const academicSessions = [
    "2022-september", "2023-january", "2023-may", "2023-september", "2024-january",
    "2024-may", "2024-september", "2025-january", "2025-published", "2026-published",
  ];
  for (const session of academicSessions) {
    const link = years.locator(`a[href="/fp2/${session}"]`);
    await expect(link).toBeVisible();
    await expect(link).toContainText("学科のみ");
    await expect(link).toContainText("60問");
  }
  await expect(years.locator('a[href="/fp2/2025-may"]')).toBeVisible();
  await expect(years.locator('a[href="/fp2/2026-may"]')).toBeVisible();
  await expect(years.getByRole("link", { name: /2025年5月公表問題/ })).toHaveAttribute("href", "/fp2/2025-published");
  await expect(years.getByRole("link", { name: /2026年5月公表問題/ })).toHaveAttribute("href", "/fp2/2026-published");
});

test("FP2 academic question keeps text choices, figure crop and per-choice explanations", async ({ page }) => {
  await page.goto("/q/fp2/2024-may/gakka/q53");
  await expect(page.getByText(/親族関係図/).first()).toBeVisible();
  await expect(page.getByRole("img", { name: /問53|図表/ }).first()).toBeVisible();
  await expect(page.getByText(/妻Cは配偶者なので常に相続人/)).toBeVisible();
  await expect(page.getByText(/代襲相続人/).first()).toBeVisible();
});
