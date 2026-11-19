import { expect, test } from "@playwright/test";

const exams = ["sc", "nw", "st", "sa", "ap"] as const;

for (const width of [320, 390, 1440]) {
  test.describe(`exam top at ${width}px`, () => {
    test.use({ viewport: { width, height: width === 1440 ? 900 : 844 }, storageState: { cookies: [], origins: [] }, serviceWorkers: "block" });
    for (const exam of exams) {
      test(`${exam}: visible menu, real destinations and accurate afternoon scope`, async ({ page, request }) => {
        const ai: string[] = [];
        page.on("request", req => { if (/\/api\/(copilot|essay|afternoon|ai)/.test(req.url())) ai.push(req.url()); });
        await page.route("https://**", route => route.abort());
        await page.goto(`/${exam}`);
        const start = page.getByRole("link", { name: /^まず10問/ });
        await expect(start).toBeInViewport();
        await expect(page.getByRole("navigation", { name: "学習メニュー" })).toHaveCount(0);
        const topics = page.locator("details#topics");
        await expect(topics).not.toHaveAttribute("open", "");
        await topics.locator("summary").click();
        const href = await topics.locator("a").first().getAttribute("href");
        expect(href).toContain("/topic/");
        expect((await request.get(href!)).ok()).toBeTruthy();
        const afternoon = page.locator("details#afternoon");
        await afternoon.locator("summary").click();
        await expect(afternoon.getByRole("link", { name: "IPA公式の過去問・解答例 →", exact: true })).toBeVisible();
        expect(ai).toEqual([]);
        await page.locator("#years a").first().click();
        await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
        expect(ai).toEqual([]);
      });
    }
  });
}

test.describe("native exam navigation before JavaScript", () => {
  test.use({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  for (const exam of exams) {
    test(`${exam}: browse older years and every field without hydration`, async ({ page }) => {
      await page.goto(`/${exam}#topics`);
      await expect(page.locator("#topics")).toBeInViewport();
      const details = page.locator("details#topics");
      if (await details.count()) {
        await details.locator("summary").click();
        await expect(details.locator("a").first()).toBeVisible();
      }
      const yearDetails = page.locator("#years details");
      if (await yearDetails.count()) {
        await yearDetails.locator("summary").click();
        await expect(yearDetails.locator("a").first()).toBeVisible();
      }
      await page.locator("#topics a").first().click();
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    });
  }
});
