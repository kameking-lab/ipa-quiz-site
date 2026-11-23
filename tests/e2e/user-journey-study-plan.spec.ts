import { test, expect } from "@playwright/test";
import { createPacePlan } from "../../lib/study-plan/pace";
import { LS_KEYS } from "../../lib/storage/keys";
test.beforeEach(async ({ page }) => {
  await page.route("**/api/exam-schedule/**", route => route.fulfill({ status: 503, json: { error: "unavailable" } }));
});
test("GET /study-plan returns 200", async ({ request }) => {
  expect((await request.get("/study-plan", { maxRetries: 1 })).status()).toBe(200);
});
test("study plan opens the date-based creation sheet", async ({ page }) => {
  await page.goto("/study-plan");
  const sheet = page.getByRole("region", { name: "学習計画を作る" });
  await expect(sheet).toBeVisible();
  await expect(sheet.getByRole("combobox", { name: "受ける資格" })).toBeVisible();
  await expect(sheet.getByLabel("受験日", { exact: true })).toBeVisible();
  await expect(sheet.getByRole("button", { name: "この計画で始める" })).toBeDisabled();
});
test("a stored pace plan remains visible when the creation sheet closes", async ({ page }) => {
  const now = new Date();
  const today = new Date(now.getTime()+9*3600000).toISOString().slice(0,10);
  const next = new Date(now.getTime()+30*86400000).toISOString().slice(0,10);
  const plan = createPacePlan({ id: "saved-pace", exam: "ip", examDate: next, sessionId: null, startDate: today }, [{ id: "ip-2011a-am-q1", exam: "ip", year: 2011 }], now.toISOString());
  await page.addInitScript(({ key, plan }) => localStorage.setItem(key, JSON.stringify([plan])), { key: LS_KEYS.pacePlans, plan });
  await page.goto("/study-plan");
  await page.goto("/");
  await expect(page.getByRole("link", { name: /計画の問題を解く/ })).toBeVisible();
  await page.getByRole("button", { name: /^学習計画の詳細/ }).click();
  await page.locator("summary").filter({ hasText: "申し込み・計画の変更" }).click();
  await expect(page.getByRole("button", { name: "計画を削除" })).toBeVisible();
});
test("legacy result pages remain reachable without rewriting their saved payload", async ({ page }) => {
  const legacy = [{ id: "legacy-test", createdAt: new Date().toISOString(), input: { exam: "ap", dailyMinutes: 30 }, summary: { daysRemaining: 90 }, daily: [] }];
  await page.addInitScript(({ key, legacy }) => localStorage.setItem(key, JSON.stringify(legacy)), { key: LS_KEYS.studyPlans, legacy });
  await page.goto("/study-plan");
  expect(await page.evaluate(key => JSON.parse(localStorage.getItem(key)!), LS_KEYS.studyPlans)).toEqual(legacy);
  await page.goto("/study-plan/result/legacy-test");
  await expect(page.locator("main")).toContainText(/学習|スケジュール|プラン/);
});
test("missing legacy result fails safely", async ({ request }) => {
  expect([200,404]).toContain((await request.get("/study-plan/result/nonexistent-id", { maxRetries: 1 })).status());
});
