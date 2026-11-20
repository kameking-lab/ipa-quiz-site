import { expect, test } from "@playwright/test";
import shino from "../../data/questions/shino-kunrenshi/saved-go34-20261011.json";
import lab from "../../data/questions/rinsho-kensagishi/partial75-20261011.json";
import pharmacy from "../../data/questions/yakuzaishi/2025-2026-reviewed52.json";
import type { Question } from "../../lib/questions/types";

const cases: { name: string; question: Question; officialChoice: number }[] = [
  { name: "視能訓練士", question: shino.find(q => q.id === "shino-kunrenshi-2024-annual-am-q66")!, officialChoice: 2 },
  { name: "臨床検査技師", question: lab.find(q => q.id === "rinsho-kensagishi-2026-annual-am-q98")!, officialChoice: 5 },
  { name: "薬剤師", question: pharmacy.find(q => q.id === "yakuzaishi-2025-annual-theory-q168")!, officialChoice: 1 },
];

for (const viewport of [{ width: 1280, height: 900 }, { width: 390, height: 844 }]) {
  for (const c of cases) {
    test(`${c.name} saved release: native reader and original figures at ${viewport.width}px`, async ({ page }) => {
      await page.setViewportSize(viewport);
      const q = c.question;
      const route = `/q/${q.exam}/${q.year}-${q.season}/${q.session}/q${q.qNumber}`;
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.getByRole("heading", { level: 1 })).toContainText(c.name);
      const source = page.getByRole("group", { name: "出典", exact: true });
      await expect(source.locator(`a[href="${q.sourcePdfUrl}"]`)).toBeVisible();
      await source.getByText("出典の詳細", { exact: true }).click();
      await expect(source.getByRole("link", { name: "公式正答PDF", exact: true })).toHaveAttribute("href", q.sourceAnswerUrl!);
      await page.getByRole("radio", { name: new RegExp(`^選択肢 ${c.officialChoice}:`) }).click();
      await expect(page.getByText("正解！", { exact: true })).toBeVisible();
      for (const url of q.imageUrls ?? []) {
        const image = page.locator(`main img[src="${url}"]`);
        await image.scrollIntoViewIfNeeded();
        await expect(image).toBeVisible();
        await expect.poll(() => image.evaluate(element => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
        await expect(page.locator(`main a[href="${url}"]`)).toHaveAttribute("target", "_blank");
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    });
  }
}
