import { expect, test } from "@playwright/test";

import { FP2_2026_MAY_QUESTIONS } from "../../data/questions/fp2";

test("FP2 academic papers expose four complete official sessions and preserve the 2026 pilot label", async ({ page }) => {
  await page.goto("/fp2");
  await expect(page.getByText(`収録 ${240 + FP2_2026_MAY_QUESTIONS.length} 問`)).toBeVisible();
  await expect(page.getByRole("link", { name: /2024年5月試験/ }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: /2024年9月試験/ }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: /2025年1月試験/ }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: /2025年5月公表問題/ }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: /2026年5月公表問題/ }).first()).toBeVisible();
});

test("FP2 academic question keeps text choices, figure crop and per-choice explanations", async ({ page }) => {
  await page.goto("/q/fp2/2024-may/gakka/q53");
  await expect(page.getByText(/親族関係図/).first()).toBeVisible();
  await expect(page.getByRole("img", { name: /問53|図表/ }).first()).toBeVisible();
  await expect(page.getByText(/妻Cは配偶者なので常に相続人/)).toBeVisible();
  await expect(page.getByText(/代襲相続人/).first()).toBeVisible();
});
