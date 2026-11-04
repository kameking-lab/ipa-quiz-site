import { test, expect } from "@playwright/test";

// KUX1: continuous practice records achievements without automatically showing
// a toast over the explanation. The toast component's placement and timer are
// still covered by __tests__/components/AchievementToast.test.tsx.
test.use({ viewport: { width: 375, height: 667 }, storageState: { cookies: [], origins: [] } });

async function answerFirst(page: import("@playwright/test").Page) {
  await page.goto("/quiz?mode=year&exam=ap&year=2023&season=spring&session=am");
  const firstChoice = page.getByRole("radio").first();
  await expect(firstChoice).toBeVisible();
  await firstChoice.click();
  await expect(page.getByRole("region", { name: /^(正解|不正解)の解説$/ })).toBeVisible();
}

test.describe("quiet achievements / post-answer controls", () => {
  test("the first badge is recorded without covering the explanation", async ({ page }) => {
    await answerFirst(page);
    await expect(page.getByTestId("achievement-toast")).toHaveCount(0);
    const unlocked = await page.evaluate(() => JSON.parse(localStorage.getItem("ipa-quiz:achievements:v1")!).unlocked);
    expect(unlocked.some((badge: { id: string }) => badge.id === "study-first")).toBe(true);
  });

  test("the next-question CTA bar is usable immediately", async ({ page }) => {
    await answerFirst(page);
    await expect(page.getByTestId("achievement-toast")).toHaveCount(0);
    const next = page.getByRole("navigation", { name: "解答後の学習操作" }).getByRole("button", { name: "次の1問" });
    await next.click();
    await expect(page.getByRole("progressbar", { name: "クイズ進捗" })).toHaveAttribute("aria-valuenow", "2");
    await expect(page.getByRole("radio").first()).toBeEnabled();
  });

  test("no delayed badge interrupts reading the first explanation", async ({ page }) => {
    await answerFirst(page);
    await page.waitForTimeout(6000);
    await expect(page.getByTestId("achievement-toast")).toHaveCount(0);
    await expect(page.getByRole("region", { name: /^(正解|不正解)の解説$/ })).toBeVisible();
  });

  test("review registration stays clickable after a badge unlock", async ({ page }) => {
    await answerFirst(page);
    const review = page.getByRole("navigation", { name: "解答後の学習操作" }).getByRole("button", { name: "復習に登録", exact: true });
    await review.click();
    await expect(page.getByRole("button", { name: "復習登録済み", exact: true })).toHaveAttribute("aria-pressed", "true");
  });
});
