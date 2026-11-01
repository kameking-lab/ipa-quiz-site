import { test, expect } from "@playwright/test";

// Legacy selector interaction coverage remains in the component fixture suite;
// these public URLs must now expose no original question or answer material.
test.describe("retired original essay HTTP boundary", () => {
  for (const url of ["/essays/sc", ...[2023, 2024, 2025].map(year => `/essays/sc/${year}-spring/pm2/q1`), "/essays/sc/2025-spring/pm2/q99", "/essays/sc/1999-spring/pm2/q1", "/essay/st/st-2024a-pm2-q1", "/essay/pm/pm-2024a-pm2-q1"]) {
    test(`${url} returns exact 404`, async ({ request }) => {
      expect((await request.get(url)).status()).toBe(404);
    });
  }
  for (const [url, text] of [["/essay", "現在、掲載できる論述問題はありません。"], ["/essays", "現在掲載できる答案サンプルはありません。"]]) {
    test(`${url} explains empty supply and retains home navigation`, async ({ page }) => {
      const res = await page.goto(url);
      expect(res?.status()).toBe(200);
      await expect(page.getByRole("status")).toHaveText(text);
      await expect(page.locator('a[href^="/essay/"], a[href^="/essays/"]')).toHaveCount(0);
      await expect(page.getByRole("group", { name: "業種選択" })).toHaveCount(0);
      const home = page.getByRole("link", { name: "ホームから学習内容を選ぶ" });
      await home.focus();
      await expect(home).toBeFocused();
      await page.keyboard.press("Enter");
      await expect(page).toHaveURL(/\/$/);
    });
  }
  test("existing essay history remains reachable without writing an answer", async ({ page }) => {
    await page.goto("/essay");
    await expect(page.getByRole("link", { name: "これまでの採点履歴を見る" })).toHaveAttribute("href", "/account/essay-history");
  });
});
