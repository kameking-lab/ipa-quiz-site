import { test, expect } from "@playwright/test";

/**
 * 第一種電気工事士 学科：令和8年度上期(CBT)の公表出題例 全50問。
 * 一覧・共通の単線結線図・図の選択肢・誤答時の全肢解説を確認する。
 */
test.describe("第一種電気工事士 学科", () => {
  test("試験トップから令和8年度上期の50問一覧へ進める", async ({ page }) => {
    const top = await page.goto("/denko1");
    expect(top?.status()).toBe(200);
    await expect(page.locator("a[href='/denko1/2026-first']").first()).toBeVisible();
    const res = await page.goto("/denko1/2026-first");
    expect(res?.status()).toBe(200);
    await expect(page.locator('a[href^="/quiz?mode=year&exam=denko1&year=2026&season=first&session=gakka&question="]')).toHaveCount(50);
    await page.locator('a[href*="question=denko1-2026-first-gakka-q41&"]').click();
    const url = new URL(page.url());
    expect(url.pathname).toBe("/quiz");
    expect(url.searchParams.get("question")).toBe("denko1-2026-first-gakka-q41");
    expect(url.searchParams.get("returnTo")).toBe("/denko1/2026-first");
    await expect(page.getByText("問41", { exact: true })).toBeVisible();
    await expect(page.getByRole("radiogroup", { name: /選択肢/ }).getByRole("radio")).toHaveCount(4);
    await expect(page.getByRole("progressbar", { name: "クイズ進捗" })).toHaveAttribute("aria-valuemax", "50");
  });

  test("配線図の問題は公式の単線結線図を表示し、誤答で全肢の解説が出る", async ({ page }) => {
    await page.goto("/q/denko1/2026-first/gakka/q41");
    const figure = page.locator('img[src*="single-line.png"]').first();
    await figure.scrollIntoViewIfNeeded();
    await expect(figure).toBeVisible();
    await expect.poll(() => figure.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(300);
    // 公式正答はイ(サイト表示ア)。イ(公式ロ)を選んで誤答を確認する。
    await page.getByRole("radio", { name: /選択肢 イ/ }).click();
    await expect(page.getByText(/不正解 — 正解は ア/)).toBeVisible();
    const explanations = page.getByRole("heading", { name: "各選択肢の解説" });
    await expect(explanations).toBeVisible();
    await expect(explanations.locator("..").locator("dd")).toHaveCount(4);
  });

  test("図の選択肢は4つの図を表示し、正答を選ぶと正解になる", async ({ page }) => {
    await page.goto("/q/denko1/2026-first/gakka/q46");
    await expect(page.locator('img[src*="/images/denko1/2026-first/q46-"]')).toHaveCount(4);
    // 公式正答はロ(サイト表示イ)。
    await page.getByRole("radio", { name: /選択肢 イ/ }).click();
    await expect(page.getByText("正解！")).toBeVisible();
  });
});
