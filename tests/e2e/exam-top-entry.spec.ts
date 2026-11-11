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
        const menu = page.getByRole("navigation", { name: "学習メニュー" });
        await expect(menu).toBeInViewport({ ratio: 1 });
        await expect(page.getByRole("link", { name: /^まず10問/ })).toBeInViewport();
        for (const link of await menu.getByRole("link").all()) {
          const box = await link.boundingBox();
          expect(box!.height).toBeGreaterThanOrEqual(44);
          await link.click();
          const hash = new URL(page.url()).hash;
          await expect(page.locator(hash)).toBeInViewport();
        }
        await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", new RegExp(`/${exam}$`));
        await expect(page).toHaveTitle(/過去問・解説とAI質問/);
        const afternoon = page.getByRole("region", { name: /^科目B.*対策/ });
        // Only essay exams offer AI review, and it is labelled as original material.
        if (exam === "st" || exam === "sa") {
          await expect(afternoon.getByRole("link", { name: "オリジナル論述教材でAI添削 →", exact: true })).toHaveAttribute("href", "/essay");
        } else {
          await expect(afternoon.locator('a[href="/essay"]')).toHaveCount(0);
        }
        await expect(afternoon.getByRole("link", { name: "IPA公式の過去問・解答例 →", exact: true })).toBeVisible();
        await expect(page.locator(`main a[href="/${exam}/afternoon"]`)).toHaveCount(0);
        for (const region of [page.locator("#years"), page.locator("#topics"), afternoon]) {
          const href = await region.locator('a[href^="/"]').first().getAttribute("href");
          expect((await request.get(href!)).status()).toBe(200);
        }
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
        await expect(page.getByRole("link", { name: /午前.*の模試で力試し/ })).toHaveAttribute("href", `/mock-exam?exam=${exam}`);
        await expect(page.getByRole("link", { name: "間違えた問題・ブックマークを復習 →", exact: true })).toHaveAttribute("href", `/quiz?mode=review&exam=${exam}&scope=exam`);
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
      const details = page.locator("#topics details");
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
