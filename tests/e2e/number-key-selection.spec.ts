import { test, expect, type Page } from "@playwright/test";

// Every displayed ChoiceButton shortcut must select the matching answer.
async function numberKeySelectsFirst(page: Page, url: string): Promise<void> {
  await page.goto(url);
  const first = page.getByRole("radio").first();
  await expect(first).toBeVisible();
  await expect(first).toHaveAttribute("aria-keyshortcuts", "1");
  if (url.startsWith("/q/")) {
    await expect(page.getByRole("radiogroup")).toHaveAttribute("data-shortcuts-ready", "true");
  }
  await page.keyboard.press("1");
  await expect(first).toHaveAttribute("aria-checked", "true");
}

test.describe("number-key 1 selects the first displayed choice", () => {
  test("/quiz (QuizPlayer)", async ({ page }) => {
    await numberKeySelectsFirst(page, "/quiz?mode=random&exam=ap");
  });

  test("/q/* (QuestionAnswerCard)", async ({ page }) => {
    await numberKeySelectsFirst(page, "/q/ap/2024-autumn/am/q1");
  });

  test("/challenge starts with choosing an exam", async ({ page }) => {
    await page.goto("/challenge");
    await expect(page.getByRole("radiogroup")).toHaveCount(0);
    await page.getByRole("searchbox").fill("AP");
    const exam = page.getByRole("link", { name: /応用情報技術者/ });
    await expect(exam).toHaveCount(1);
    await expect(exam).toHaveAttribute("href", "/ap");
    await exam.click();
    await expect(page).toHaveURL(/\/ap$/);
  });

  test("/challenge with a selected exam starts that exam's five-question quiz", async ({ page }) => {
    await numberKeySelectsFirst(page, "/challenge?exam=ap");
    const redirected = new URL(page.url());
    expect(redirected.pathname).toBe("/quiz");
    expect(redirected.searchParams.get("mode")).toBe("random");
    expect(redirected.searchParams.get("exam")).toBe("ap");
    expect(redirected.searchParams.get("limit")).toBe("5");
  });
});
