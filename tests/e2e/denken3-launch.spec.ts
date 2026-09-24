import { test, expect } from "@playwright/test";

test.describe.configure({ mode: "serial" });

const SUBJECTS = [
  ["riron", "理論"],
  ["denryoku", "電力"],
  ["kikai", "機械"],
  ["houki", "法規"],
] as const;

for (const year of [2024, 2025] as const) {
  for (const season of ["first", "second"] as const) {
    for (const [session, label] of SUBJECTS) {
      test(`${year} ${season} ${label} card starts the selected paper`, async ({ page }) => {
        await page.goto(`/denken3?year=${year}&season=${season}`);
        await expect(page.getByRole("heading", { name: `${year}年度 ${season === "first" ? "上期" : "下期"}の科目を選ぶ` })).toBeVisible();
        const card = page.getByRole("link", { name: new RegExp(`${label}を解く`) });
        await expect(card).toContainText(/\d+問/);
        await card.click();
        await expect(page).toHaveURL(new RegExp(`/quiz\\?[^#]*exam=denken3[^#]*year=${year}[^#]*season=${season}[^#]*session=${session}`));
        await expect(page.getByText(/1問目 \/ \d+問中/).first()).toBeVisible({ timeout: 15_000 });
        await expect(page.getByRole("radio")).toHaveCount(5);
      });
    }
  }
}

test("branch parts have distinct direct pages and official labels", async ({ page }) => {
  await page.goto("/q/denken3/2025-second/kikai/q15a");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("問15(a)");
  await expect(page.getByRole("radio")).toHaveCount(5);
  await expect(page.getByRole("radio", { name: /選択肢 \(5\)/ })).toBeVisible();
  await page.goto("/q/denken3/2025-second/kikai/q15b");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("問15(b)");
  await expect(page.getByRole("radio")).toHaveCount(5);
});

test("official-summary paper discloses its explanation scope", async ({ page }) => {
  await page.goto("/q/denken3/2025-second/denryoku/q1");
  await expect(page.getByText("公式正答と一般解説").first()).toBeVisible();
  await expect(page.getByRole("radio")).toHaveCount(5);
  await page.getByRole("radio", { name: /選択肢 \(3\)/ }).click();
  await expect(page.getByText(/正答は \(3\)/)).toBeVisible();
  await expect(page.getByRole("heading", { name: "各選択肢の解説" })).toHaveCount(0);
});
