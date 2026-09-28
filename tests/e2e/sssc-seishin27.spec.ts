import { test, expect } from "@playwright/test";

test.describe("精神保健福祉士 第27回", () => {
  test("the 2024 year page lists the specialized and common subjects and names the held questions", async ({ page }) => {
    await page.goto("/seishin/2024-annual");
    await expect(page.getByText(/第27回（試験日 令和7年2月1日・2日）/).first()).toBeVisible();
    await expect(page.getByText(/問題4・69・76/).first()).toBeVisible();
    await expect(page.getByText(/専門科目・精神医学と精神医療 問題/).first()).toBeVisible();
    await expect(page.getByText(/共通科目・医学概論 問題/).first()).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });

  test("a choose-two specialized question grades only after both official answers are selected", async ({ page }) => {
    await page.goto("/q/seishin/2024-annual/senmon/q2");
    const choices = page.getByRole("checkbox");
    await expect(choices).toHaveCount(5);
    await choices.nth(0).click();
    await expect(page.getByText("正解！")).toHaveCount(0);
    await choices.nth(2).click();
    await expect(page.getByText("正解！").first()).toBeVisible();
  });

  test("common questions are self-canonical and held questions are not published", async ({ request }) => {
    const html = await (await request.get("/q/seishin/2024-annual/kyotsu/q1")).text();
    expect(html).toMatch(/<link rel="canonical" href="[^"]*\/q\/seishin\/2024-annual\/kyotsu\/q1"/);
    for (const n of [4, 69, 76]) {
      expect((await request.get(`/q/seishin/2024-annual/kyotsu/q${n}`)).status(), `q${n}`).toBe(404);
    }
  });
});
