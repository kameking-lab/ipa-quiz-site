import { expect, test } from "@playwright/test";

for (const { name, session, number } of [
  { name: "理論", session: "riron", number: 2 },
  { name: "電力", session: "denryoku", number: 2 },
  { name: "機械", session: "kikai", number: 3 },
  { name: "法規", session: "houki", number: 1 },
]) {
  test(`denken1 ${name} card opens its five selected blanks`, async ({ page }) => {
    await page.goto("/denken1");
    await expect(page.getByRole("heading", { name: "電験一種 一次試験の過去問" })).toBeVisible();
    await expect(page.getByText("収録範囲：理論A問2・電力A問2・機械A問3・法規A問1のみ。同年度の他の原問、過年度、二次試験は未収録です。", { exact: false })).toBeVisible();
    await page.getByRole("link", { name: new RegExp(`${name}.*令和8年度・5空欄`) }).click();
    await expect(page).toHaveURL(new RegExp(`/quiz\\?[^#]*exam=denken1[^#]*session=${session}`), { timeout: 15_000 });
    await expect(page.getByText(`問${number}(1)`, { exact: false }).first()).toBeVisible({ timeout: 15_000 });
    await expect(page.getByRole("progressbar", { name: "クイズ進捗" })).toHaveAttribute("aria-valuemax", "5");
  });
}

test("denken1 question page shows official kana answer options", async ({ page }) => {
  await page.goto("/q/denken1/2026-primary/denryoku/q2-1");
  await expect(page.getByText("交流遮断器の故障遮断", { exact: false }).first()).toBeVisible();
  await expect(page.getByText("(チ)", { exact: true }).first()).toBeVisible();
});

test("denken1 theory question keeps official iroha choice labels", async ({ page }) => {
  await page.goto("/q/denken1/2026-primary/riron/q2-1");
  for (const label of ["(イ)", "(ロ)", "(ヨ)"]) {
    await expect(page.getByText(label, { exact: true }).first()).toBeVisible();
  }
});

test("denken1 unsupported subject stays redirected to the exam index", async ({ page }) => {
  await page.goto("/quiz?mode=year&exam=denken1&year=2026&season=primary&session=am&order=1");
  await expect(page).toHaveURL(/\/denken1$/);
  await expect(page.getByRole("heading", { name: "電験一種 一次試験の過去問" })).toBeVisible();
});
