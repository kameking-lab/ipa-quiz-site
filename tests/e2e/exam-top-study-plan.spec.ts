import { expect, test, type Page } from "@playwright/test";
import { createPacePlan } from "../../lib/study-plan/pace";
import { LS_KEYS } from "../../lib/storage/keys";

const now = "2026-11-22T00:15:00+09:00";
const publishedDate = "2027-02-28";
const linkedDate = "2027-03-12";
const planButton = "この日で学習計画を作る";
const officialSession = {
  id: "fixed", label: "試験日程", scheduleStatus: "official", examDate: publishedDate, examDateEnd: null,
  applicationStart: null, applicationDeadline: "2027-01-22", resultDate: null, examPhaseWindows: [],
  sourceUrl: "https://www.ipa.go.jp/shiken/", qualificationId: "kihon-joho", verifiedDate: "2026-11-22",
};

async function mockSchedule(page: Page, sessions: unknown[]) {
  await page.route("**/api/exam-schedule/fe", route => route.fulfill({
    json: { exam: "fe", source: "tsugino", sessions },
  }));
}

test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime(new Date(now));
});

test("an official date opens the shared sheet on the exam hub", async ({ page }) => {
  await mockSchedule(page, [officialSession]);
  await page.goto("/fe");
  const row = page.getByRole("region", { name: "試験日程" });
  await expect(row).toContainText("試験日 2月28日（あと98日）");
  await expect(row.getByRole("link", { name: "申込方法は次の資格で確認" }))
    .toHaveAttribute("href", /tsugino-shikaku\.jp\/shikaku\/kihon-joho\?/);
  await expect(row).not.toContainText("申込締切");
  const trigger = row.getByRole("button", { name: planButton });
  await trigger.click();
  await expect(page).toHaveURL(/\/fe$/);
  const sheet = page.getByRole("dialog", { name: "学習計画を作る" });
  await expect(sheet.getByRole("combobox", { name: "受ける資格" })).toHaveValue("fe");
  await expect(sheet.locator("time")).toHaveAttribute("datetime", publishedDate);
  await page.keyboard.press("Escape");
  await expect(sheet).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("the incoming date takes priority and the saved plan hides the row on return", async ({ page }) => {
  await mockSchedule(page, [officialSession]);
  const existing = createPacePlan({ id: "ap-plan", exam: "ap", examDate: publishedDate, sessionId: null,
    startDate: "2026-11-22" }, [], now);
  await page.addInitScript(({ key, plan }) => {
    if (!localStorage.getItem(key)) localStorage.setItem(key, JSON.stringify([plan]));
  }, { key: LS_KEYS.pacePlans, plan: existing });
  const url = "/fe?examDate=" + linkedDate + "&utm_source=tsugino";
  await page.goto(url);
  const row = page.getByRole("region", { name: "試験日程" });
  await expect(row).toContainText("試験日 3月12日（あと110日）");
  await row.getByRole("button", { name: planButton }).click();
  const sheet = page.getByRole("dialog", { name: "学習計画を作る" });
  await expect(sheet.getByRole("combobox", { name: "受ける資格" })).toHaveValue("fe");
  await expect(sheet.getByLabel("受験日", { exact: true })).toHaveValue(linkedDate);
  await sheet.getByRole("button", { name: "この計画で始める" }).click();
  await expect(page.getByRole("status").filter({ hasText: "学習計画を作りました" })).toBeVisible();
  await expect(page.getByRole("button", { name: "カレンダーに追加（.ics）" })).toBeVisible();
  await expect.poll(() => page.evaluate(key => JSON.parse(localStorage.getItem(key) ?? "[]")
    .find((plan: { exam: string }) => plan.exam === "fe")?.examDate, LS_KEYS.pacePlans)).toBe(linkedDate);
  await page.goto(url);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(row).toBeHidden();
  await expect(page.getByRole("button", { name: planButton })).toBeHidden();
});

test("a missing date leaves the exam hub without a schedule row", async ({ page }) => {
  await mockSchedule(page, []);
  const schedule = page.waitForResponse("**/api/exam-schedule/fe");
  await page.goto("/fe?examDate=2027-02-30");
  expect((await schedule).ok()).toBe(true);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("region", { name: "試験日程" })).toBeHidden();
  await expect(page.getByRole("button", { name: planButton })).toBeHidden();
  await expect(page.getByRole("link", { name: "申込方法は次の資格で確認" })).toBeHidden();
});
