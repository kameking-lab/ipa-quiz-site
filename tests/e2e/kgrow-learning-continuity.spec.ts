import { expect, test } from "@playwright/test";
import { generateStudyPlan } from "../../lib/study-plan/generator";
import { LS_KEYS } from "../../lib/storage/keys";

test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
test.describe.configure({ timeout: 60_000 });

const dashboardWait = { timeout: 20_000 };

test("mobile: dashboard links open the corresponding sections without horizontal overflow", async ({ page }) => {
  await page.goto("/account/dashboard#weakness");
  await expect(page.locator("#weakness")).toHaveJSProperty("open", true, dashboardWait);
  await expect(page.locator("#weakness > summary")).toBeInViewport();
  await page.evaluate(() => { window.location.hash = "mock-scores"; });
  await expect(page.locator("#mock-scores")).toHaveJSProperty("open", true);
  await expect(page.locator("#mock-scores > summary")).toBeInViewport();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});


test("mobile: a submitted short mock reaches scores, progress, weakness and exact review", async ({ page }, testInfo) => {
  await page.goto("/mock-exam?exam=sc&count=10");
  await expect(page.getByText("10問", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "模試を開始する", exact: true }).click();
  await page.getByRole("button", { name: /^ア/ }).click();
  await page.reload();
  await page.getByRole("button", { name: "再開する", exact: true }).click();
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
  await expect(page).toHaveURL("/account/dashboard#mock-scores", dashboardWait);
  const scores = page.locator("#mock-scores");
  await expect(scores).toHaveJSProperty("open", true, dashboardWait);
  await expect(scores.getByRole("combobox", { name: "対象試験" })).toHaveValue("sc");
  await expect(scores.getByText("未回答 9問", { exact: false })).toBeVisible();
  await expect(scores.getByText(/重点分野/)).toBeVisible();
  await expect(page.locator("#progress")).toBeVisible();
  await page.locator("#weakness > summary").click();
  await expect(page.locator("#weakness")).toHaveJSProperty("open", true);
  await page.reload();
  await expect(scores).toHaveJSProperty("open", true, dashboardWait);
  await page.screenshot({ path: testInfo.outputPath("mock-weakness-mobile.png") });
  await scores.getByRole("link", { name: "今回の間違い・未回答を復習" }).click();
  await expect(page.getByRole("radio").first()).toBeVisible();
  expect(new URL(page.url()).searchParams.get("mock")).toBe(result.id);
  expect(result.wrongQuestionIds).toContain(new URL(page.url()).searchParams.get("question"));
});

test("mobile: a saved legacy plan preserves daily progress and its result URL", async ({ page }, testInfo) => {
  const aiRequests: string[] = [];
  page.on("request", (request) => { if (/\/api\/(copilot|generate|ai)/.test(request.url())) aiRequests.push(request.url()); });
  const examDate = new Date(Date.now() + 28 * 86400_000).toISOString().slice(0, 10);
  const plan = generateStudyPlan({ exam: "ap", examDate, level: "foundation", weekdayMinutes: 60, weekendMinutes: 180, weakCategories: [] });
  await page.addInitScript(({ key, plan }) => localStorage.setItem(key, JSON.stringify([plan])), { key: LS_KEYS.studyPlans, plan });
  const resultUrl = `/study-plan/result/${plan.id}`;
  await page.goto(resultUrl);
  const saved = { id: plan.id, key: plan.daily[0]!.tasks[0]!.key };
  await page.getByRole("link", { name: "今日の計画をダッシュボードで進める" }).click();
  await expect(page).toHaveURL(`/account/dashboard?plan=${encodeURIComponent(plan.id)}#study-plan`, dashboardWait);
  const dailyPlan = page.locator("#study-plan");
  await expect(dailyPlan).toHaveJSProperty("open", true, dashboardWait);
  await page.getByRole("button", { name: "完了にする", exact: true }).first().click();
  await expect.poll(() => page.evaluate(({ storageKey, id, key }) => {
    const plans = JSON.parse(localStorage.getItem(storageKey) ?? "{}");
    return plans[id]?.progress?.[key]?.done;
  }, { storageKey: LS_KEYS.studyPlanProgress, ...saved })).toBe(true);
  await page.screenshot({ path: testInfo.outputPath("daily-plan-mobile.png") });
  await page.reload();
  await expect(dailyPlan).toHaveJSProperty("open", true, dashboardWait);
  await expect(page.getByRole("button", { name: "未完了にする", exact: true }).first()).toHaveAttribute("aria-pressed", "true");
  await page.goto(resultUrl);
  await expect(page.getByRole("button", { name: "未完了にする", exact: true }).first()).toHaveAttribute("aria-pressed", "true");
  expect(aiRequests).toEqual([]);
});
