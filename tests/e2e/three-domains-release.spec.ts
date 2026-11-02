import { expect, test } from "@playwright/test";

test.beforeEach(async ({ baseURL }) => {
  expect(process.env.E2E_BASE_URL, "Use only the candidate CI server").toBeUndefined();
  expect(baseURL).toBe("http://127.0.0.1:3000");
});

test("qualification finder has direct-load styles and both sharoushi discovery contexts", async ({ page }) => {
  for (const width of [320, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/qualifications");
    const search = page.getByRole("searchbox", { name: "資格名・略称で検索" });
    await expect(search).toBeVisible();
    expect(await search.evaluate(el => el.getBoundingClientRect().height)).toBeGreaterThanOrEqual(44);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
    await expect(page.getByRole("link", { name: "IT・情報処理の資格一覧はこちら" })).toHaveAttribute("href", "/ipa");
    for (const context of ["法律から探す方へ", "労務・社会保険から探す方へ"]) {
      const group = page.getByRole("region", { name: context, exact: true });
      await expect(group.getByRole("link", { name: "社会保険労務士試験" })).toHaveAttribute("href", "/sharoushi");
    }
    await page.getByRole("link", { name: /収録している全資格・区分を見る/ }).click();
    await expect(page.locator("#qualification-coverage")).toHaveAttribute("open", "");
  }
});

test("Q05 explanation keeps the optional learning aid behind the reveal control", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto("/denken3/2026-upper/theory/q5");
  const details = page.locator("[data-native-explanation]").first();
  await expect(details).not.toHaveAttribute("open");
  const guide = page.getByRole("region", { name: "等価回路の学習補助" });
  await expect(guide).toHaveCount(0);
  await page.getByRole("button", { name: "答えと解説を見る", exact: true }).click();
  await expect(details).toHaveAttribute("open", "");
  await expect(guide).toBeVisible();
  await expect(guide).toContainText("サイト作成の補助図で、原図ではありません");
  await expect(guide).toContainText("要点");
  await expect(guide).toContainText("詳説");
  expect(await details.evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
});

test("registered difficulty stays qualified and the existing inline draft is retained", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto("/q/fe/2024-cbt/kamoku-a/q1");
  const meaning = page.getByText("難度表示の意味", { exact: true });
  await expect(meaning).toBeVisible();
  await meaning.click();
  await expect(page.getByText("難度は問題ごとの情報です。資格全体の難しさや合格の見込みを示すものではありません。", { exact: true })).toBeVisible();
  const editor = page.locator("textarea");
  await expect(editor).toHaveCount(1);
  await editor.fill("公開候補CI専用・送信しない下書き");
  await page.setViewportSize({ width: 1280, height: 900 });
  await expect(editor).toHaveValue("公開候補CI専用・送信しない下書き");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await editor.clear();
});

test("only the recognized article notice is upright on the existing article route", async ({ page }) => {
  await page.goto("/blog/ipa-gozen1-menjo-jouken");
  const notice = page.locator('blockquote[data-article-notice="true"]');
  await expect(notice).toHaveCount(1);
  await expect(notice).toContainText("学習ガイド");
  await expect(notice).toHaveCSS("font-style", "normal");
  await expect(notice.getByRole("link", { name: "IPA 公式ページ" })).toHaveAttribute("href", /https:\/\/www\.ipa\.go\.jp\//);
});
