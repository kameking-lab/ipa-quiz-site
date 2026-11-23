import { expect, test } from "@playwright/test";

test.use({
  viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true,
  storageState: { cookies: [], origins: [] }, serviceWorkers: "block",
});
test.setTimeout(90_000);
test.beforeEach(async ({ page }) => { await page.route("https://**", route => route.abort()); });

for (const source of ["search", "tsugino"]) {
  const query = source === "tsugino" ? "?utm_source=tsugino&utm_medium=referral" : "";
  for (const exam of ["sc", "nw", "st", "sa", "ap"]) {
    test(`${source} /${exam}: one start tap, one answer tap, inline explanation`, async ({ page }) => {
      const ai: string[] = [];
      page.on("request", request => { if (/\/api\/(copilot|ai|afternoon|essay)/.test(request.url())) ai.push(request.url()); });
      await page.goto(`/${exam}${query}`);
      const start = page.getByRole("region", { name: "今すぐ解く" }).getByRole("link", { name: /^まず10問/ });
      await expect(start).toBeInViewport();
      const box = await start.boundingBox();
      expect(box!.height).toBeGreaterThanOrEqual(44);
      await expect(page.getByRole("dialog")).toHaveCount(0);
      await start.tap();
      for (let index = 0; index < 10; index++) {
        const answer = page.getByRole("radio", { name: /^選択肢 / }).first();
        await expect(answer).toBeEnabled();
        await expect(page.locator('a[href^="/auth/signin"]:visible')).toHaveCount(0);
        const url = page.url();
        await answer.tap();
        await expect(page.getByRole("region", { name: /^(正解|不正解)の解説$/ })).toBeInViewport();
        expect(page.url()).toBe(url);
        await expect(page.getByRole("dialog")).toHaveCount(0);
        await expect(page.getByTestId("achievement-toast")).toHaveCount(0);
        if (index < 9) await page.getByRole("button", { name: /^(次の問題へ|結果を見る)/ }).first().tap();
      }
      expect(await page.evaluate(() => JSON.parse(localStorage.getItem("ipa-quiz:history:v1")!).entries.length)).toBe(10);
      expect(ai).toEqual([]);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    });
  }
  test(`${source} reference article: choose a qualification before answering`, async ({ page }) => {
    await page.goto(`/blog/it-shikaku-rirekisho-kakikata${query}`);
    await expect(page.locator("#article-practice")).toHaveCount(0);
    await page.locator('#article-body a[href="/fe"]').tap();
    await page.getByRole("region", { name: "今すぐ解く" }).getByRole("link", { name: "今すぐ解く", exact: true }).tap();
    const answer = page.getByRole("radio", { name: /^選択肢 / }).first();
    await expect(answer).toBeEnabled();
    await answer.tap();
    await expect(page.getByRole("region", { name: /^(正解|不正解)の解説$/ })).toBeInViewport();
    await expect(page.getByRole("dialog")).toHaveCount(0);
    expect(await page.evaluate(() => JSON.parse(localStorage.getItem("ipa-quiz:history:v1")!).entries.length)).toBe(1);
  });
  for (const slug of ["ipa-shiken-fukusuu-kubun-juken", "koudo-gozen1-taisaku", "nw-gogo-jikan-haibun"]) {
    test(`${source} article ${slug}: read the guide and jump to its practice`, async ({ page }) => {
      await page.goto(`/blog/${slug}${query}`);
      const start = page.getByRole("link", { name: "本文のあとに1問解く", exact: true });
      await expect(start).toBeInViewport();
      await start.tap();
      const url = page.url();
      await page.locator("#article-practice").getByRole("radio").first().tap();
      await expect(page.getByLabel("チャレンジの解答結果")).toBeInViewport();
      expect(page.url()).toBe(url);
      await expect(page.getByRole("dialog")).toHaveCount(0);
      await page.getByRole("link", { name: "同じ分野の演習を続ける", exact: true }).tap();
      for (let index = 0; index < 9; index++) {
        const answer = page.getByRole("radio", { name: /^選択肢 / }).first();
        await expect(answer).toBeEnabled();
        await expect(page.locator('a[href^="/auth/signin"]:visible')).toHaveCount(0);
        await answer.tap();
        await expect(page.getByRole("region", { name: /^(正解|不正解)の解説$/ })).toBeInViewport();
        await expect(page.getByRole("dialog")).toHaveCount(0);
        if (index < 8) await page.getByRole("button", { name: /^(次の問題へ|結果を見る)/ }).first().tap();
      }
      expect(await page.evaluate(() => JSON.parse(localStorage.getItem("ipa-quiz:history:v1")!).entries.length)).toBe(10);
    });
  }
}

test("a fresh visitor can answer ten real questions without account prompts or automatic celebrations", async ({ page }) => {
  const ai: string[] = [];
  page.on("request", request => { if (/\/api\/(copilot|ai|afternoon|essay|feedback-unlock)/.test(request.url())) ai.push(request.url()); });
  await page.goto("/quiz?mode=year&exam=ap&year=2023&season=spring&session=am&utm_source=tsugino");
  for (let index = 0; index < 10; index++) {
    const answer = page.getByRole("radio", { name: /^選択肢 / }).first();
    await expect(answer).toBeEnabled();
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(page.locator('a[href^="/auth/signin"]:visible')).toHaveCount(0);
    const url = page.url();
    await answer.tap();
    await expect(page.getByRole("region", { name: /^(正解|不正解)の解説$/ })).toBeInViewport();
    expect(page.url()).toBe(url);
    await expect(page.getByTestId("achievement-toast")).toHaveCount(0);
    expect(await page.evaluate(() => JSON.parse(localStorage.getItem("ipa-quiz:history:v1")!).entries.length)).toBe(index + 1);
    if (index < 9) await page.getByRole("button", { name: /^(次の問題へ|結果を見る)/ }).first().tap();
  }
  expect(ai).toEqual([]);
});
