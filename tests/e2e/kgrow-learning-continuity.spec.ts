import { expect, test } from "@playwright/test";

test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });

test("mobile: answer → explanation → related → review → next survives reload", async ({ page }, testInfo) => {
  await page.goto("/quiz?mode=year&exam=ip&year=2009&season=autumn&session=am&question=ip-2009a-am-q1");
  await page.getByRole("radio").first().click();
  const actions = page.getByRole("navigation", { name: "解答後の学習操作" });
  await expect(actions).toBeVisible();
  await expect(page.getByRole("region", { name: /^(不正解|正解)の解説$/ })).toBeVisible();
  await actions.getByRole("button", { name: "復習に登録", exact: true }).click();
  await expect(actions.getByRole("button", { name: "復習登録済み" })).toHaveAttribute("aria-pressed", "true");
  await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem("ipa-quiz:history:v1")!).starredIds)).toContain("ip-2009a-am-q1");
  await page.evaluate(() => { document.documentElement.dataset.kgrowDocument = "same"; });
  await actions.getByRole("button", { name: "関連問題", exact: true }).click();
  const related = page.getByRole("region", { name: "同じ科目の関連問題" });
  await expect(related).toBeVisible();
  const suggestion = related.getByRole("button").filter({ hasText: /年 問/ }).first();
  await expect(suggestion).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath("quiz-related-mobile.png") });
  await suggestion.click();
  await expect.poll(() => new URL(page.url()).searchParams.get("question")).not.toBe("ip-2009a-am-q1");
  const relatedId = new URL(page.url()).searchParams.get("question");
  await expect(page.locator("html")).toHaveAttribute("data-kgrow-document", "same");
  await expect(page.getByRole("radio").first()).toBeEnabled();
  const nextId = await page.evaluate((id) => {
    const key = Object.keys(sessionStorage).find((key) => key.startsWith("ipa-quiz:active-pool:"))!;
    const ids = JSON.parse(sessionStorage.getItem(key)!) as string[];
    return ids[ids.indexOf(id!) + 1];
  }, relatedId);
  await page.reload();
  await expect(page.getByRole("radio").first()).toBeEnabled();
  expect(new URL(page.url()).searchParams.get("question")).toBe(relatedId);
  await page.getByRole("radio").first().click();
  await page.getByRole("navigation", { name: "解答後の学習操作" }).getByRole("button", { name: "次の1問" }).click();
  await expect.poll(() => new URL(page.url()).searchParams.get("question")).toBe(nextId);
  await expect(page.getByRole("radio").first()).toBeEnabled();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test("mobile: a submitted short mock reaches scores, progress, weakness and exact review", async ({ page }, testInfo) => {
  await page.goto("/mock-exam?exam=sc&count=10");
  await expect(page.getByRole("combobox", { name: "演習する問題数" })).toHaveValue("10");
  await page.getByRole("button", { name: "模試を開始する", exact: true }).click();
  await page.getByRole("button", { name: /^ア/ }).click();
  await page.getByRole("button", { name: "問10へ移動", exact: true }).click();
  page.once("dialog", (dialog) => dialog.accept());
  await page.getByRole("button", { name: "提出する", exact: true }).click();
  await expect(page.getByRole("navigation", { name: "模試後の学習" })).toBeVisible();
  const result = await page.evaluate(() => {
    const results = JSON.parse(localStorage.getItem("ipa-quiz:mock-exam:v1")!) as { history: Array<{ id: string; answered: number; totalQuestions: number; wrongQuestionIds: string[] }> };
    return results.history[0];
  });
  expect(result.answered).toBe(1);
  expect(result.totalQuestions).toBe(10);
  expect(result.wrongQuestionIds.length).toBeGreaterThanOrEqual(9);
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem("ipa-quiz:history:v1")!).entries.length)).toBe(10);
  await page.screenshot({ path: testInfo.outputPath("mock-result-mobile.png") });
  await page.getByRole("link", { name: "進捗で模試記録を見る" }).click();
  await expect(page.getByRole("tab", { name: "模試記録", exact: true })).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("combobox", { name: "対象試験" })).toHaveValue("sc");
  await expect(page.getByText("未回答 9問", { exact: false })).toBeVisible();
  await page.getByRole("tab", { name: "進捗", exact: true }).click();
  await expect(page.getByRole("region", { name: "直近の模試からの学習" })).toContainText("情報処理安全確保支援士");
  await page.getByRole("tab", { name: "弱点", exact: true }).click();
  await expect(page.getByRole("region", { name: "直近の模試からの学習" })).toContainText("重点分野");
  await page.screenshot({ path: testInfo.outputPath("mock-weakness-mobile.png") });
  await page.getByRole("link", { name: "今回の間違い・未回答を復習" }).click();
  await expect(page.getByRole("radio").first()).toBeVisible();
  expect(new URL(page.url()).searchParams.get("mock")).toBe(result.id);
  expect(result.wrongQuestionIds).toContain(new URL(page.url()).searchParams.get("question"));
});

test("mobile: one calculated plan preserves daily progress and its old result URL", async ({ page }, testInfo) => {
  const aiRequests: string[] = [];
  page.on("request", (request) => { if (/\/api\/(copilot|generate|ai)/.test(request.url())) aiRequests.push(request.url()); });
  await page.goto("/account/study-plan");
  await expect(page).toHaveURL(/\/study-plan$/);
  for (let step = 0; step < 3; step++) await page.getByRole("button", { name: "次へ", exact: true }).click();
  await page.getByRole("button", { name: "学習スケジュールを生成", exact: true }).click();
  await expect(page).toHaveURL(/\/study-plan\/result\//);
  const resultUrl = page.url();
  const saved = await page.evaluate(() => {
    const plans = JSON.parse(localStorage.getItem("ipa-quiz:study-plans:v1")!);
    return { id: plans[0].id as string, key: plans[0].daily[0].tasks[0].key as string };
  });
  await page.getByRole("link", { name: "今日の計画をダッシュボードで進める" }).click();
  await expect(page.getByRole("tab", { name: "今日の計画", exact: true })).toHaveAttribute("aria-selected", "true");
  await page.getByRole("button", { name: "完了にする", exact: true }).first().click();
  await expect.poll(() => page.evaluate(({ id, key }) => JSON.parse(localStorage.getItem("ipa-quiz:study-plan-progress:v1")!)[id].progress[key].done, saved)).toBe(true);
  await page.screenshot({ path: testInfo.outputPath("daily-plan-mobile.png") });
  await page.reload();
  await expect(page.getByRole("button", { name: "未完了にする", exact: true }).first()).toHaveAttribute("aria-pressed", "true");
  await page.goto(resultUrl);
  await expect(page.getByRole("button", { name: "未完了にする", exact: true }).first()).toHaveAttribute("aria-pressed", "true");
  expect(aiRequests).toEqual([]);
});
