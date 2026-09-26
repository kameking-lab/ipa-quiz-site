import { test, expect } from "@playwright/test";

test.describe("社会福祉士 第38回・精神保健福祉士 第28回", () => {
  test("shakai hub lists 129 questions and the year page splits common and specialized subjects", async ({ page }) => {
    await page.goto("/shakai");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("社会福祉士");
    await expect(page.getByText("収録 129 問")).toBeVisible();
    await page.goto("/shakai/2025-annual");
    await expect(page.getByText(/共通科目・医学概論 問題1〜6/).first()).toBeVisible();
    await expect(page.getByText(/専門科目・福祉サービスの組織と経営 問題/).first()).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });

  test("a choose-two question grades only after both official answers are selected", async ({ page }) => {
    await page.goto("/q/shakai/2025-annual/kyotsu/q10");
    const choices = page.getByRole("checkbox");
    await expect(choices).toHaveCount(5);
    await expect(choices.first()).toHaveAccessibleName(/^選択肢 1:/);
    await expect(page.getByText(/正解は2つあります/).first()).toBeVisible();
    await choices.nth(1).click();
    await expect(page.getByText("正解！")).toHaveCount(0);
    await choices.nth(4).click();
    await expect(page.getByText("正解！").first()).toBeVisible();
  });

  test("seishin exposes its specialized paper and points shared common questions to shakai", async ({ page, request }) => {
    await page.goto("/seishin");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("精神保健福祉士");
    await page.goto("/q/seishin/2025-annual/senmon/q1");
    await expect(page.getByRole("radio")).toHaveCount(5);
    const html = await (await request.get("/q/seishin/2025-annual/kyotsu/q1")).text();
    expect(html).toMatch(/<link rel="canonical" href="[^"]*\/q\/shakai\/2025-annual\/kyotsu\/q1"/);
  });
});
