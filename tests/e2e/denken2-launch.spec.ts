import { test, expect } from "@playwright/test";

test.describe.configure({ mode: "serial" });

const SUBJECTS = [
  ["denryoku", "電力"],
  ["houki", "法規"],
] as const;

for (const [session, label] of SUBJECTS) {
  test(`denken2 ${label} card starts the 2026 first-stage paper`, async ({ page }) => {
    await page.goto("/denken2");
    await expect(page.getByRole("heading", { name: "令和8年度 一次試験の科目を選ぶ" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "令和8年度 理論・機械の原問を解く" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "2025年度 理論・機械の原問を解く" })).toBeVisible();
    await expect(page.getByText(/法規の問3・問5・問6は未収録です/)).toBeVisible();
    await expect(page.getByRole("link", { name: "二次試験の全20問を見る" })).toHaveAttribute("href", "/denken2/secondary");
    const card = page.getByRole("link", { name: new RegExp(`${label}を解く`) });
    await expect(card).toContainText("35空欄");
    await card.click();
    await expect(page).toHaveURL(new RegExp(`/quiz\\?[^#]*exam=denken2[^#]*year=2026[^#]*season=primary[^#]*session=${session}`));
    await expect(page.getByText(/1問目 \/ 35問中/).first()).toBeVisible({ timeout: 15_000 });
    await expect(page.getByRole("radio")).toHaveCount(15);
    await expect(page.getByRole("radio", { name: /選択肢 \(イ\)/ })).toBeVisible();
    await expect(page.getByRole("radio", { name: /選択肢 \(ヨ\)/ })).toBeVisible();
  });
}

test("blank units have direct pages with official iroha labels and all-choice reasons", async ({ page }) => {
  await page.goto("/q/denken2/2026-primary/houki/q1-2");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("問1(2)");
  await expect(page.getByRole("radio")).toHaveCount(15);
  // 法規 問1(2) の公式正答は (ヘ) 保安教育。誤答 (イ) を選ぶと正答と理由が出る。
  await page.getByRole("radio", { name: /選択肢 \(イ\)/ }).click();
  await expect(page.getByText(/不正解 — 正解は \(ヘ\)/).first()).toBeVisible();
  await expect(page.getByRole("heading", { name: "各選択肢の解説" })).toBeVisible();
  await page.goto("/q/denken2/2026-primary/houki/q1-3");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("問1(3)");
});

test("figure questions render the cropped official figure", async ({ page }) => {
  await page.goto("/q/denken2/2026-primary/denryoku/q3-3");
  await expect(page.locator('img[src*="20260830-power-q03-pv-curve"]').first()).toBeVisible();
});

test("off-scope denken2 quiz links return to the landing page", async ({ page }) => {
  await page.goto("/quiz?mode=random&exam=denken2");
  await expect(page).toHaveURL(/\/denken2$/);
});

test("latest two secondary papers preserve written answers and review status", async ({ page }) => {
  await page.goto("/denken2");
  await page.getByRole("link", { name: "二次試験の全20問を見る" }).click();
  await expect(page).toHaveURL(/\/denken2\/secondary$/);
  await expect(page.locator('a[href^="/denken2/secondary/"]')).toHaveCount(20);
  await page.goto("/denken2/secondary/2024/power-management/q3");
  const input = page.getByLabel("小問（3）の解答");
  await expect(input).toBeEnabled();
  await expect(page.locator("textarea")).toHaveCount(3);
  await expect(page.getByText("許容地絡電流342 A", { exact: true })).toHaveCount(0);
  await input.fill("430/(2πfMD)=342 A");
  await page.getByRole("button", { name: "公式標準解答と解説を確認する" }).click();
  await expect(page.getByText("許容地絡電流342 A", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "要復習", exact: true }).click();
  await page.reload();
  await expect(input).toBeEnabled();
  await expect(input).toHaveValue("430/(2πfMD)=342 A");
  await page.getByRole("button", { name: "公式標準解答と解説を確認する" }).click();
  await expect(page.getByRole("button", { name: "要復習", exact: true })).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("link", { name: "次の原問 →" }).click();
  await expect(page).toHaveURL(/\/denken2\/secondary\/2024\/power-management\/q4$/);
  await expect(page.getByLabel("小問（3）の解答")).toBeEnabled();
  await expect(page.getByLabel("小問（3）の解答")).toHaveValue("");
});
