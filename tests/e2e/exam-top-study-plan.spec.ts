import { expect, test, type Page } from "@playwright/test";
import { readFile } from "node:fs/promises";
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
  await expect(row).toContainText("試験日 2027-02-28");
  await expect(row).toContainText("試験まであと98日");
  await expect(row.getByRole("link", { name: "申込方法は次の資格で確認" }))
    .toHaveAttribute("href", /tsugino-shikaku\.jp\/shikaku\/kihon-joho\?/);
  await expect(row).toContainText("申込締切まであと61日");
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
  await expect(row).toContainText("受験予定日 2027-03-12");
  await expect(row).toContainText("試験まであと110日");
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

const current = { ...officialSession, fiscalYear: "2026", label: "2026年度第1回",
  applicationStart: "2026-11-18", applicationDeadline: "2026-11-26" };
const projected = [
  { ...current, scheduleStatus: "tentative", unannounced: true, datePrecision: "unknown",
    examDate: null, applicationStart: null, applicationDeadline: null, sourceUrl: null },
  { ...current, id: "prior", label: "2025年度第1回", fiscalYear: "2025",
    examDate: "2026-02-28", applicationStart: "2025-11-18", applicationDeadline: "2025-11-26" },
];

for (const scenario of [
  { name: "01-confirmed", sessions: [officialSession], status: "申込締切まであと61日" },
  { name: "02-estimated", sessions: projected, status: "受付中（見込み）", estimated: true },
  { name: "03-before-opening", sessions: [{ ...current, applicationStart: "2026-11-24" }], status: "あと2日で申込開始" },
  { name: "04-open", sessions: [current], status: "受付中" },
  { name: "05-closed", sessions: [{ ...current, applicationDeadline: "2026-11-21" }], status: "受付終了" },
] as const) {
  test(`qualification schedule at 390px: ${scenario.name}`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await mockSchedule(page, [...scenario.sessions]);
    await page.goto("/fe");
    const row = page.getByRole("region", { name: "試験日程" });
    await expect(row.getByRole("heading", { name: "次の試験" })).toBeVisible();
    await expect(row.getByText(scenario.status, { exact: true })).toBeVisible();
    await expect(row.getByRole("link")).toHaveCount(1);
    await expect(row.getByRole("button")).toHaveCount(1);
    if ("estimated" in scenario) {
      await expect(row.getByText("試験まであと98日（見込み）", { exact: true })).toBeVisible();
      await expect(row.getByText("2025年度の同じ回をもとに推定", { exact: true })).toHaveCount(1);
    }
    if (scenario.name === "04-open") {
      await expect(row).toContainText("申込期間 2026-11-18〜2026-11-26");
      await expect(row.getByText("申込締切まであと4日", { exact: true })).toBeVisible();
    }
    if (scenario.name === "05-closed") await expect(row.getByText(/申込締切まであと/)).toHaveCount(0);
    const screenshots = process.env.EXAM_SCHEDULE_SCREENSHOTS;
    if (screenshots) {
      await row.scrollIntoViewIfNeeded();
      await page.evaluate(() => document.fonts.ready.then(() => undefined));
      await page.screenshot({ path: `${screenshots}/${scenario.name}.png`, animations: "disabled" });
    }
  });
}

for (const estimated of [false, true]) {
  test(`downloads the study calendar with ${estimated ? "estimated" : "confirmed"} registration events`, async ({ page }) => {
    await mockSchedule(page, estimated ? projected : [current]);
    await page.route("**/api/study-plan/catalog/fe", route => route.fulfill({
      json: { questions: [{ id: "fixture-question", exam: "fe", year: 2026 }] },
    }));
    await page.goto("/fe");
    await page.getByRole("button", { name: planButton }).click();
    const sheet = page.getByRole("dialog", { name: "学習計画を作る" });
    if (estimated) await expect(sheet.getByLabel("受験日", { exact: true })).toHaveValue(publishedDate);
    await sheet.getByRole("button", { name: "この計画で始める" }).click();
    const calendar = page.getByRole("button", { name: "カレンダーに追加（.ics）" });
    const [download] = await Promise.all([page.waitForEvent("download"), calendar.click()]);
    expect(download.suggestedFilename()).toBe("kakomon-study-plan.ics");
    const ics = (await readFile((await download.path())!, "utf8")).replaceAll("\r\n ", "");
    expect(ics.match(/BEGIN:VEVENT/g)).toHaveLength(4);
    const suffix = estimated ? "（見込み）" : "";
    expect(ics).toContain("DTSTART;VALUE=DATE:20270228\r\nSUMMARY:基本情報技術者の試験" + suffix);
    expect(ics).toContain("DTSTART;VALUE=DATE:20261118\r\nSUMMARY:基本情報技術者の申込開始" + suffix);
    expect(ics).toContain("DTSTART;VALUE=DATE:20261126\r\nSUMMARY:基本情報技術者の申込締切" + suffix);
    expect(ics).toContain("BEGIN:VALARM\r\nTRIGGER:-P1D");
    expect(ics).toContain("BEGIN:VALARM\r\nTRIGGER:-P3D");
    expect(ics).toContain("\\nhttps://tsugino-shikaku.jp/shikaku/kihon-joho?utm_source=kakomon&utm_campaign=exam_schedule");
    if (estimated) {
      await page.getByRole("button", { name: "計画を変更", exact: true }).click();
      const edit = page.getByRole("dialog", { name: "学習計画を変更" });
      const [fromEdit] = await Promise.all([page.waitForEvent("download"),
        edit.getByRole("button", { name: "カレンダーに追加（.ics）" }).click()]);
      const editedIcs = (await readFile((await fromEdit.path())!, "utf8")).replaceAll("\r\n ", "");
      expect(editedIcs).toContain("DTSTART;VALUE=DATE:20261126\r\nSUMMARY:基本情報技術者の申込締切（見込み）");
    }
  });
}
