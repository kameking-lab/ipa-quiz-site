import { test, expect, type Page } from "@playwright/test";
import { createPacePlan, type PacePlan } from "../../lib/study-plan/pace";
import { LS_KEYS } from "../../lib/storage/keys";

const today = "2026-11-17";
const catalog = Array.from({ length: 200 }, (_, i) => ({ id: `ip-2026h-am-q${i + 1}`, exam: "ip", year: 2026, season: "spring", session: "am", qNumber: i + 1 }));
const fixturePlan = () => ({ ...createPacePlan({ id: "e2e-pace", exam: "ip", sessionId: "test-session", examDate: "2026-11-20", startDate: "2026-11-01" }, catalog, "2026-11-01T00:00:00+09:00"), registration: { label: "テスト日程", start: "2026-11-01", deadline: "2026-11-18", resultDate: "2026-12-01", sourceUrl: "https://www.ipa.go.jp/shiken/", estimated: false } });
async function fixtures(page: Page, plan?: PacePlan, correct = 0, returning = false) {
  await page.clock.setFixedTime(new Date(`${today}T12:00:00+09:00`));
  await page.route("**/api/billing/status", r => r.fulfill({ json: { entitled: false } }));
  await page.route("**/api/study-plan/catalog/ip", r => r.fulfill({ json: { questions: catalog } }));
  await page.route("**/api/exam-schedule/ip", r => r.fulfill({ json: { exam: "ip", source: "tsugino", sessions: [{ id: "cbt", label: "随時受験", scheduleStatus: "ondemand", examDate: null, examDateEnd: null, applicationStart: null, applicationDeadline: null, resultDate: null, sourceUrl: "https://www.ipa.go.jp/shiken/", qualificationId: "ip", verifiedDate: today, examPhaseWindows: [] }] } }));
  await page.route("**/api/home/resume?**", r => r.fulfill({ json: { exam: "ip", name: "ITパスポート", href: "/quiz?mode=year&exam=ip&year=2026&season=spring&session=am", caption: "2026年度 · 問1" } }));
  await page.addInitScript(({ keys, value, count, returning, catalog }) => {
    localStorage.removeItem(keys.pacePlans); localStorage.removeItem(keys.history); localStorage.removeItem(keys.paceOffer); localStorage.removeItem(keys.lastQuestion);
    if (value) localStorage.setItem(keys.pacePlans, JSON.stringify([value]));
    if (count) localStorage.setItem(keys.history, JSON.stringify({ entries: catalog.slice(0, count).map(q => ({ id: q.id, selected: "ア", correct: true, at: Date.parse("2026-11-16T12:00:00+09:00") })), starredIds: [] }));
    if (returning) localStorage.setItem(keys.lastQuestion, JSON.stringify({ exam: "ip", year: 2026, season: "spring", session: "am", qNumber: 1, answeredAt: Date.parse("2026-11-16T12:00:00+09:00") }));
  }, { keys: LS_KEYS, value: plan, count: correct, returning, catalog });
}
async function layout(page: Page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(await page.locator("main").first().evaluate(el => el.getBoundingClientRect().width)).toBeLessThanOrEqual(640);
}
async function screenshot(page: Page, name: string, width: number) {
  const dir = process.env.KP2_SCREENSHOTS;
  if (dir) await page.screenshot({ path: `${dir}/${name}-${width}.png`, fullPage: true, animations: "disabled" });
}
for (const width of [390, 1280]) {
  test.describe(`home pace ${width}px`, () => {
    test.use({ viewport: { width, height: 844 } });
    test("① behind: one CTA and dismissible daily offer", async ({ page }) => {
      await fixtures(page, fixturePlan(), 62); await page.goto("/");
      await expect(page.getByText("少し遅れ", { exact: true })).toBeVisible();
      await expect(page.getByRole("link", { name: /今日の問題を解く/ })).toHaveCount(1);
      await expect(page.getByRole("link", { name: /1日46問必要です/ })).toBeVisible();
      await layout(page); await screenshot(page, "01-behind", width);
      await page.getByRole("button", { name: "月額プランの案内を閉じる" }).click();
      await expect(page.getByRole("link", { name: /1日46問必要です/ })).toHaveCount(0);
      expect(await page.evaluate(key => JSON.parse(localStorage.getItem(key)!).dismissedOn, LS_KEYS.paceOffer)).toBe(today);
    });
    test("② ahead: deadline sheet registers once", async ({ page }) => {
      await fixtures(page, fixturePlan(), 190); await page.goto("/");
      await expect(page.getByText("いいペース", { exact: true })).toBeVisible();
      await expect(page.getByRole("link", { name: /回数無制限で追いつけます/ })).toHaveCount(0);
      await layout(page); await screenshot(page, "02-ahead", width);
      await page.getByRole("button", { name: /申込締切は明日/ }).click();
      await expect(page.getByRole("link", { name: /申込ページを開く/ })).toHaveAttribute("href", "https://www.ipa.go.jp/shiken/");
      await page.getByRole("button", { name: "申込済みにする" }).click();
      await expect(page.getByRole("button", { name: /申込締切は明日/ })).toHaveCount(0);
    });
    test("③ returning: resume and create only", async ({ page }) => {
      await fixtures(page, undefined, 0, true); await page.goto("/");
      await expect(page.getByRole("link", { name: /続きを解く/ })).toBeVisible();
      await expect(page.getByRole("button", { name: "学習計画を作成", exact: true })).toBeVisible();
      await expect(page.locator('[data-home-state="returning"]')).toBeVisible();
      await layout(page); await screenshot(page, "03-returning", width);
    });
    test("④ create: choose day, save, return to pace card", async ({ page }) => {
      await fixtures(page, undefined, 0, true); await page.goto("/");
      await page.getByRole("button", { name: "学習計画を作成", exact: true }).click();
      await page.getByRole("combobox", { name: "受ける資格" }).selectOption("ip");
      await expect(page.getByRole("combobox", { name: "受ける回" })).toBeVisible();
      await page.getByLabel("予約した日・受けたい日").fill("2026-12-20");
      await layout(page); await screenshot(page, "04-create", width);
      await page.getByRole("button", { name: "この回で作成" }).click();
      await expect(page.getByRole("link", { name: /今日の問題を解く/ })).toBeVisible();
      expect(await page.evaluate(key => JSON.parse(localStorage.getItem(key)!)[0].examDate, LS_KEYS.pacePlans)).toBe("2026-12-20");
    });
    test("⑤ new: search and three picks, three bottom tabs", async ({ page }) => {
      await fixtures(page); await page.goto("/");
      await expect(page.locator('[data-home-state="new"]')).toBeVisible();
      await expect(page.getByRole("heading", { name: "今日も、ひと問ずつ。" })).toBeVisible();
      await expect(page.locator("main li")).toHaveCount(3);
      await layout(page); await screenshot(page, "05-new", width);
      if (width === 390) await expect(page.getByRole("navigation", { name: "モバイル底タブ" }).getByRole("link")).toHaveCount(3);
      await page.getByRole("searchbox", { name: "資格名・略称で検索" }).fill("ITパスポート");
      await expect(page.locator("main li")).toHaveCount(1);
    });
    test("post-exam: one-tap result and one next qualification", async ({ page }) => {
      await fixtures(page, { ...fixturePlan(), examDate: "2026-11-16" }); await page.goto("/");
      await page.getByRole("button", { name: "合格", exact: true }).click();
      await expect(page.getByRole("heading", { name: "合格おめでとう！" })).toBeVisible();
      await expect(page.locator("main").getByRole("link", { name: /次は/ })).toHaveCount(1);
    });
  });
}
