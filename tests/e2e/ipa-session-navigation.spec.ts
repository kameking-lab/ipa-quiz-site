import { test, expect } from "@playwright/test";
import { ST_QUESTIONS } from "../../data/questions/st";

test.setTimeout(120_000);

test("specialist practice defaults to morning II and switches explicitly", async ({ page }) => {
  await page.goto("/quiz?mode=random&exam=st&limit=3");
  const sessions = page.getByRole("navigation", { name: "試験科目を選択" });
  await expect(sessions.getByRole("link", { name: "午前II（専門）" })).toHaveAttribute("aria-current", "page");
  await expect(page.getByRole("radio").first()).toBeVisible({ timeout: 60_000 });
  await sessions.getByRole("link", { name: "午前I（共通）" }).click();
  await expect(page).toHaveURL(/session=am1/);
  await expect(sessions.getByRole("link", { name: "午前I（共通）" })).toHaveAttribute("aria-current", "page");
  await page.getByRole("button", { name: "モード選択に戻る" }).click();
  await expect(page).toHaveURL(/\/st$/);
});

test("annual page keeps selected session and return target across learning modes", async ({ page }) => {
  await page.goto("/st/2025-spring");
  await page.getByRole("link", { name: "午前I（共通）を解く", exact: true }).click();
  await expect(page).toHaveURL(/session=am1/);
  await expect(page.getByRole("radio").first()).toBeVisible({ timeout: 60_000 });
  await page.getByRole("link", { name: "ストリーム", exact: true }).click();
  await expect(page).toHaveURL(/session=am1/);
  const back = page.locator('a[href="/st/2025-spring"]');
  await expect(back.first()).toBeVisible();
  await back.first().click();
  await expect(page).toHaveURL(/\/st\/2025-spring$/);
});

test("question detail quiz returns to the same question", async ({ page }) => {
  await page.goto("/q/st/2025-spring/am2/q1");
  await page.getByRole("link", { name: /クイズモードで開く/ }).first().click();
  await expect(page).toHaveURL(/session=am2/);
  await expect(page.getByRole("radio").first()).toBeVisible({ timeout: 60_000 });
  await page.getByRole("button", { name: "モード選択に戻る" }).click();
  await expect(page).toHaveURL(/\/q\/st\/2025-spring\/am2\/q1$/);
});

test("ST 2025 spring AM II listing and player expose the same questions", async ({ page }) => {
  await page.goto("/st/2025-spring");
  const am2 = page.locator('a[href^="/q/st/2025-spring/am2/"]');
  await expect(am2).toHaveCount(25);
  await expect(page.locator('a[href="/q/st/2025-spring/am2/q7"]')).toBeVisible();

  await page.goto("/q/st/2025-spring/am2/q4");
  await expect(page.getByAltText("問4の図表1")).toBeVisible();

  await page.goto("/st/2025-spring");

  await page.getByRole("link", { name: "午前II（専門）を解く", exact: true }).click();
  await expect(page).toHaveURL(/session=am2/);
  await expect(page.getByRole("radio").first()).toBeVisible();
  await expect(page.getByRole("progressbar", { name: "クイズ進捗" })).toHaveAttribute("aria-valuemax", "25");
});

test("ST 2024 keeps AM I and AM II separate and renders audited figures", async ({ page }) => {
  await page.goto("/st/2024-spring");

  await expect(page.locator('a[href^="/q/st/2024-spring/am1/"]')).toHaveCount(30);
  await expect(page.locator('a[href^="/q/st/2024-spring/am2/"]')).toHaveCount(25);

  await page.goto("/q/st/2024-spring/am1/q3");
  await expect(page.getByAltText("問3の図表1")).toBeVisible();

  await page.getByRole("link", { name: /クイズモードで開く/ }).first().click();
  await expect(page).toHaveURL(/session=am1/);
  await expect(page.getByRole("progressbar", { name: "クイズ進捗" })).toHaveAttribute("aria-valuemax", "30");
  await page.getByRole("button", { name: "モード選択に戻る" }).click();
  await expect(page).toHaveURL(/\/q\/st\/2024-spring\/am1\/q3$/);
});

for (const [year, session, number] of [
  [2024, "am1", 7], [2024, "am2", 5],
  [2025, "am1", 5], [2025, "am2", 1],
] as const) {
  test(`ST ${year} ${session} shows the selected wrong reason and browser back preserves the question`, async ({ page }) => {
    const question = ST_QUESTIONS.find((row) => row.id === `st-${year}h-${session}-q${number}`)!;
    const detailPath = `/q/st/${year}-spring/${session}/q${number}`;
    await page.goto(detailPath);
    await page.getByRole("link", { name: /クイズモードで開く/ }).first().click();
    await expect(page).toHaveURL(new RegExp(`session=${session}`));
    await expect(page.getByRole("progressbar", { name: "クイズ進捗" })).toHaveAttribute("aria-valuemax", session === "am1" ? "30" : "25");
    // Annual practice starts at Q1; reach the audited question through the player.
    for (let current = 1; current < number; current += 1) {
      await page.getByRole("radio").first().click();
      await page.getByRole("button", { name: "次の問題へ", exact: true }).click();
    }
    const wrong = Object.keys(question.choices!).find((key) => key !== question.answer)!;
    await page.getByRole("radio", { name: new RegExp(`^選択肢 ${wrong}:`) }).click();
    const explanation = page.getByRole("region", { name: "不正解の解説", exact: true });
    await expect(explanation).toBeVisible();
    const selected = explanation.getByRole("region", { name: "あなたが選んだ誤答の理由" });
    await expect(selected).toContainText(question.choiceExplanations![wrong as keyof typeof question.choiceExplanations]!);
    const allChoices = explanation.getByRole("region", { name: "選択肢ごとの解説" });
    await expect(allChoices.locator("dd")).toHaveCount(4);
    for (const reason of Object.values(question.choiceExplanations!)) await expect(allChoices).toContainText(reason!);
    await expect(explanation.locator('a[href$="_qs.pdf"]')).toHaveAttribute("href", question.sourcePdfUrl);
    await expect(explanation.locator('a[href$="_ans.pdf"]')).toHaveAttribute("href", question.sourcePdfUrl.replace("_qs.pdf", "_ans.pdf"));
    await page.goBack();
    await expect(page).toHaveURL(new RegExp(`${detailPath}$`));
  });
}
