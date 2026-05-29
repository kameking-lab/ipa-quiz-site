import { test, expect, type Page } from "@playwright/test";

/**
 * Number-key (1–4) selection must actually work everywhere the ChoiceButton
 * advertises it (致命傷⑩). Every answer surface renders ChoiceButton, which sets
 * aria-keyshortcuts="N" and an aria-label「数字キーN でも選択できます」. Pressing the
 * key must select the matching choice — previously /challenge claimed it without
 * a handler (the label lied to screen-reader users).
 */

/** Load `url`, confirm the first choice advertises a number-key shortcut, press
 *  "1", and confirm it actually selected the first choice (ア). */
async function numberKeySelectsFirst(page: Page, url: string): Promise<void> {
  await page.goto(url);
  const first = page.getByRole("radio").first();
  await expect(first).toBeVisible();
  // Honest advertisement: the button claims number-key 1 as a shortcut…
  await expect(first).toHaveAttribute("aria-keyshortcuts", "1");
  // …and pressing it must actually commit the selection.
  await page.keyboard.press("1");
  await expect(first).toHaveAttribute("aria-checked", "true");
}

test.describe("number-key 1 selects the first choice on every answer surface", () => {
  test("/quiz (QuizPlayer)", async ({ page }) => {
    await numberKeySelectsFirst(page, "/quiz?mode=random&exam=ap");
  });

  test("/q/* (QuestionAnswerCard)", async ({ page }) => {
    await numberKeySelectsFirst(page, "/q/ap/2024-autumn/am/q1");
  });

  test("/challenge (DailyChallengeClient) — the fixed surface", async ({ page }) => {
    await numberKeySelectsFirst(page, "/challenge");
  });

  // NOTE: /quiz/stream (StreamQuizPlayer) renders plain <button> choices — NOT
  // ChoiceButton — so it makes no aria-keyshortcuts「数字キー」 claim and is not
  // part of this 嘘表記 issue (it does have its own number-key handler).
});
