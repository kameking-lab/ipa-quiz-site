import { expect, test } from "@playwright/test";
import raw from "../../data/questions/denken1/secondary-latest-two.json";

test("Denken1 secondary keeps all twenty canonical routes and original subparts", async ({ request }) => {
  for (const q of raw.questions) {
    const path = `/denken1/secondary/${q.year}/${q.subject}/q${q.number}`;
    const response = await request.get(path);
    expect(response.status(), path).toBe(200);
    const html = await response.text();
    const canonical = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/);
    expect(canonical, path).not.toBeNull();
    expect(new URL(canonical![1]!).pathname).toBe(path);
    expect((html.match(/<textarea\b/g) ?? []).length, path).toBe(q.requestedSubparts.length);
    expect(html, path).not.toMatch(/<section[^>]+id="written-solutions"/);
  }
});

test("Denken1 written practice restores notes and hides the next original's solutions", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/denken1");
  await page.getByRole("link", { name: "二次試験の年度・科目一覧へ" }).click();
  await expect(page).toHaveURL(/\/denken1\/secondary$/);
  await expect(page.locator('a[href^="/denken1/secondary/2025/"]')).toHaveCount(10);
  await expect(page.locator('a[href^="/denken1/secondary/2024/"]')).toHaveCount(10);
  await page.goto("/denken1/secondary/2024/machine-control/q3");
  const notes = page.getByLabel("小問（1）の解答");
  await notes.fill("αとβを一般のまま使って波形を書く");
  await page.getByRole("button", { name: "公式標準解答と解説を確認する" }).click();
  await expect(page.getByRole("heading", { name: "小問ごとの解答と考え方" })).toBeVisible();
  await page.getByRole("button", { name: "要復習" }).click();
  await page.reload();
  await expect(notes).toHaveValue("αとβを一般のまま使って波形を書く");
  await expect(page.getByRole("heading", { name: "小問ごとの解答と考え方" })).toHaveCount(0);
  await page.getByRole("button", { name: "公式標準解答と解説を確認する" }).click();
  await expect(page.getByRole("button", { name: "要復習" })).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("link", { name: "次の原問 →" }).click();
  await expect(page).toHaveURL(/\/denken1\/secondary\/2024\/machine-control\/q4$/);
  await expect(page.getByLabel("小問（1）の解答")).toHaveValue("");
  await expect(page.getByRole("heading", { name: "小問ごとの解答と考え方" })).toHaveCount(0);
  const firstImage = page.locator('img[src^="/images/denken1/secondary/"]').first();
  await expect.poll(() => firstImage.evaluate(image => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  const viewportWidth = page.viewportSize()!.width;
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(viewportWidth);
});
