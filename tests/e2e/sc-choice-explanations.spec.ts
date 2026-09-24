import { expect, test } from "@playwright/test";

test("SC wrong answer shows its reason, official evidence, and preserves the return route", async ({ page }) => {
  test.setTimeout(120_000);
  await page.goto("/quiz?mode=year&exam=sc&year=2025&season=spring&session=am2&returnTo=/sc/2025-spring");
  await expect(page).toHaveURL(/session=am2/);
  await expect(page.getByRole("progressbar", { name: "クイズ進捗" })).toHaveAttribute("aria-valuemax", "25");

  await page.getByRole("radio", { name: /^選択肢 ア:/ }).click();
  const reason = page.getByRole("region", { name: "あなたが選んだ誤答の理由" });
  await expect(reason).toContainText("ゼロデイ攻撃");
  await expect(page.getByRole("link", { name: "問題PDF" })).toHaveAttribute("href", /2025r07h_sc_am2_qs\.pdf$/);
  await expect(page.getByRole("link", { name: "公式解答PDF" })).toHaveAttribute("href", /2025r07h_sc_am2_ans\.pdf$/);

  await page.getByRole("button", { name: "モード選択に戻る" }).click();
  await expect(page).toHaveURL(/\/sc\/2025-spring$/);
});

test("SC recent papers expose every AM1 and AM2 question without mixing", async ({ page }) => {
  test.setTimeout(180_000);
  const papers = [
    { year: 2024, season: "spring", session: "am1", count: "30" },
    { year: 2024, season: "spring", session: "am2", count: "25" },
    { year: 2024, season: "autumn", session: "am1", count: "30" },
    { year: 2024, season: "autumn", session: "am2", count: "25" },
    { year: 2025, season: "spring", session: "am1", count: "30" },
    { year: 2025, season: "spring", session: "am2", count: "25" },
    { year: 2025, season: "autumn", session: "am1", count: "30" },
    { year: 2025, season: "autumn", session: "am2", count: "25" },
  ] as const;

  for (const paper of papers) {
    await page.goto(`/quiz?mode=year&exam=sc&year=${paper.year}&season=${paper.season}&session=${paper.session}`);
    await expect(page).toHaveURL(new RegExp(`session=${paper.session}`));
    await expect(page.getByRole("progressbar", { name: "クイズ進捗" }))
      .toHaveAttribute("aria-valuemax", paper.count);
  }
});
