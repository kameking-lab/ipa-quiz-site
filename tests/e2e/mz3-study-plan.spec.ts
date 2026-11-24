import { expect, test, type Page } from "@playwright/test";
import { LS_KEYS } from "../../lib/storage/keys";
import { createPacePlan, type PacePlan } from "../../lib/study-plan/pace";

test.use({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce", serviceWorkers: "block" });
const date = "2026-11-17";
const time = new Date(date + "T12:00:00+09:00");
const catalog = Array.from({ length: 12 }, (_, i) => ({
  id: "ip-2026h-am-q" + (i + 1), exam: "ip", year: 2026, season: "spring", session: "am", qNumber: i + 1,
}));
const plans = (weekdays?: number[], examDate = "2026-11-27") => createPacePlan({ id: "mz3", exam: "ip",
  sessionId: null, examDate, startDate: date, studyWeekdays: weekdays }, catalog, time.toISOString());
type Attempt = { id: string; selected: string; correct: boolean; at: number };
const answer = (index: number, correct: boolean): Attempt => ({
  id: catalog[index].id, selected: correct ? "ア" : "イ", correct, at: time.getTime() - 10_000,
});

async function boot(page: Page, plan?: PacePlan, entries: Attempt[] = [], stars: string[] = []) {
  await page.clock.setFixedTime(time);
  await page.addInitScript(({ plan, entries, stars, keys }) => {
    if (sessionStorage.getItem("mz3-seeded")) return;
    sessionStorage.setItem("mz3-seeded", "1");
    localStorage.setItem("ipa-quiz:onboarded:v1", "1");
    if (plan) localStorage.setItem(keys.pacePlans, JSON.stringify([plan]));
    localStorage.setItem(keys.history, JSON.stringify({ entries, starredIds: stars }));
  }, { plan, entries, stars, keys: LS_KEYS });
  await page.route("**/api/study-plan/catalog/ip", route => route.fulfill({ json: { questions: catalog } }));
  await page.route("**/api/exam-schedule/ip", route => route.fulfill({ json: { sessions: [] } }));
  await page.route("**/api/billing/status", route => route.fulfill({ json: { entitled: false } }));
}
async function shot(page: Page, name: string) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  const output = process.env.MZ3_SCREENSHOTS;
  if (output) await page.screenshot({ path: output + "/" + name + ".png", animations: "disabled", style: "nextjs-portal { visibility: hidden !important }" });
}

test("mobile home with no plan and create a plan with a custom week", async ({ page }) => {
  await boot(page);
  await page.route("**/api/study-plan/catalog/ip", route => route.fulfill({ json: { questions:
    Array.from({ length: 8 }, (_, i) => catalog.map(q => ({ ...q, id: q.id + "-" + i, year: 2026 - i }))).flat(),
  } }));
  await page.goto("/");
  await expect(page.getByRole("button", { name: "学習計画を作る" })).toBeEnabled();
  await shot(page, "01-home-no-plan");
  await page.getByRole("button", { name: "学習計画を作る" }).click();
  const dialog = page.getByRole("dialog", { name: "学習計画を作る" });
  await dialog.getByRole("combobox", { name: "受ける資格" }).selectOption("ip");
  await dialog.getByLabel("受験日", { exact: true }).fill("2026-11-27");
  const short = dialog.getByRole("radio", { name: "直近5年分（60問）" });
  const full = dialog.getByRole("radio", { name: "全8年分（96問）" });
  await expect(full).toBeChecked();
  await short.check();
  await full.check();
  await dialog.getByRole("radio", { name: "曜日を選ぶ" }).check();
  for (const day of ["火", "木", "土", "日"]) await dialog.getByRole("checkbox", { name: day, exact: true }).uncheck();
  await expect(dialog.getByText("月・水・金（週3回）")).toBeVisible();
  await expect(dialog.getByText("1回の目安　24問正解")).toBeVisible();
  await dialog.getByText("月・水・金（週3回）").scrollIntoViewIfNeeded();
  await shot(page, "06-create-eight-years-weekdays");
  await dialog.getByRole("button", { name: "この計画で始める" }).click();
  await expect(page.getByRole("link", { name: "問題を解く", exact: true })).toBeVisible();
  const saved = await page.evaluate(key => JSON.parse(localStorage.getItem(key)!)[0], LS_KEYS.pacePlans);
  expect(saved.studyWeekdays.sort()).toEqual([1, 3, 5]);
  await page.getByRole("button", { name: "計画の確認", exact: true }).click();
  await page.getByRole("dialog").getByRole("button", { name: "計画を変更", exact: true }).click();
  await page.getByRole("radio", { name: "毎日" }).check();
  await page.getByRole("button", { name: "変更を保存" }).click();
  await expect(page.getByText("2019年度以降")).toHaveCount(0);
  expect(await page.evaluate(key => Math.min(...JSON.parse(localStorage.getItem(key)!)[0].range.years), LS_KEYS.pacePlans)).toBe(2019);
  expect(await page.evaluate(key => JSON.parse(localStorage.getItem(key)!).map((plan: PacePlan) => plan.id), LS_KEYS.pacePlans)).toEqual([saved.id]);
});

for (const [years, image] of [[3, "07-create-three-years"], [12, "08-create-twelve-years"]] as const) {
  test("available ranges with " + years + " years", async ({ page }) => {
    await boot(page);
    await page.route("**/api/study-plan/catalog/ip", route => route.fulfill({ json: { questions:
      Array.from({ length: years }, (_, i) => ({ ...catalog[0], id: "fixture" + i, year: 2026 - i })),
    } }));
    await page.goto("/study-plan");
    await page.getByRole("combobox", { name: "受ける資格" }).selectOption("ip");
    await page.getByLabel("受験日", { exact: true }).fill("2026-11-27");
    if (years < 5) await expect(page.getByRole("radio", { name: "全3年分（3問）" })).toBeChecked();
    else {
      await expect(page.getByRole("radio", { name: "直近5年分（5問）" })).toBeChecked();
      await expect(page.getByRole("radio", { name: "直近10年分（10問）" })).toBeVisible();
    }
    await shot(page, image);
  });
}

for (const [name, plan, count, label] of [
  ["02-home-plan", plans(), 4, "1日の目安 1問正解"],
  ["03-home-outside-day", plans([6, 0]), 4, "次の勉強日は土曜日です"],
  ["04-home-complete", plans(), 12, "全12問に正解しました"],
  ["05-home-post-exam", plans(undefined, "2026-11-16"), 4, "試験、おつかれさまでした"],
] as const) {
  test(name, async ({ page }) => {
    await boot(page, plan, catalog.slice(0, count).map((_, index) => answer(index, true)));
    await page.goto("/");
    await expect(page.getByText(label, { exact: true })).toBeVisible();
    await expect(page.getByRole("group", { name: "学習の進み具合" })).toBeVisible();
    await expect(page.getByRole("link", { name: /月額で|追いつ/ })).toHaveCount(0);
    if (name === "05-home-post-exam") await expect(page.getByRole("group", { name: "結果を記録" })).toBeVisible();
    await shot(page, name);
  });
}

test("empty list works without a saved plan", async ({ page }) => {
  await boot(page);
  await page.goto("/review?mode=weak&exam=ip");
  await expect(page.getByText("苦手リストは空です")).toBeVisible();
  await expect(page.getByRole("link", { name: "年度を選んで解く", exact: true })).toHaveAttribute("href", "/ip");
  await shot(page, "09-weak-empty");
});

const question = (id: string) => ({
  ...catalog.find(q => q.id === id), id, type: "multiple-choice", difficulty: 1, category: "テクノロジ系",
  topicTags: [], question: "学習確認用の問題", choices: { ア: "正しい選択肢", イ: "別の選択肢", ウ: "別の回答", エ: "その他" },
  answer: "ア", explanation: "動作確認用の解説", sourcePdfUrl: "https://www.ipa.go.jp/shiken/", license: "IPA-public",
});
async function enableGate(page: Page) {
  if (process.env.MZ3_LOCAL_GATE === "1") return;
  await page.route("**/quiz/today?**", async route => {
    if (route.request().resourceType() !== "document") return route.continue();
    const response = await route.fetch(), html = await response.text();
    const marker = 'billingGateEnabled\\":false';
    await route.fulfill({ response, body: html.replaceAll(marker, marker.replace("false", "true")) });
  });
}
async function mockQuiz(page: Page, startUsed = 0) {
  const grants: string[] = [];
  await page.route("**/api/questions/next?**", route => {
    const id = new URL(route.request().url()).searchParams.get("id") ?? catalog[0].id;
    return route.fulfill({ json: question(id) });
  });
  await page.route("**/api/billing/question", route => {
    const { id } = route.request().postDataJSON() as { id: string };
    const used = new Set(grants).size + startUsed;
    const allowed = grants.includes(id) || used < 10;
    if (allowed) grants.push(id);
    const access = { kind: "guest", freeDaily: 10, resetAt: "2026-11-18T00:00:00+09:00", remaining: Math.max(0, 10 - startUsed - new Set(grants).size), retryAfter: null };
    return allowed ? route.fulfill({ json: { question: question(id), access } })
      : route.fulfill({ status: 429, json: { error: "daily_limit", access } });
  });
  return grants;
}

test("weak list has four unique rows and a score is recorded before next", async ({ page }) => {
  await boot(page, plans(), [answer(0, false), answer(1, false), answer(2, true)], [catalog[1].id, catalog[2].id, catalog[3].id]);
  await enableGate(page);
  const grants = await mockQuiz(page);
  await page.goto("/review?mode=weak&exam=ip");
  await expect(page.getByText(/全年度　4問/)).toBeVisible();
  await expect(page.getByText("前回不正解", { exact: true })).toHaveCount(2);
  await shot(page, "10-weak-four");
  const href = await page.getByRole("link", { name: "苦手4問をまとめて解く" }).getAttribute("href");
  await page.goto(href!);
  const before = page.getByRole("button", { name: "苦手の印を付ける" });
  await expect(before).toBeVisible();
  await shot(page, "11-question-mark");
  await page.getByRole("radio", { name: /正しい選択肢/ }).click();
  await expect(page.getByRole("button", { name: "次の問題へ" })).toBeVisible();
  expect(await page.evaluate(({ key, id }) => JSON.parse(localStorage.getItem(key)!).entries.filter((entry: Attempt) => entry.id === id).map((entry: Attempt) => entry.correct),
    { key: LS_KEYS.history, id: catalog[0].id })).toEqual([false, true]);
  await page.reload();
  await expect(page).toHaveURL(new RegExp("question=" + catalog[1].id + "$"));
  await expect(page.getByRole("button", { name: "苦手の印を外す" })).toBeVisible();
  await page.getByRole("radio", { name: /正しい選択肢/ }).click();
  await expect(page.getByRole("button", { name: "苦手の印を外す" })).toBeVisible();
  await page.goto("/");
  await expect(page.getByRole("group", { name: "学習の進み具合" })).toBeVisible();
  await expect(page.getByRole("link", { name: "苦手リスト（3問）" })).toBeVisible();
  expect(grants).toEqual([catalog[0].id, catalog[1].id]);
});

test("the 10th answer is normal and only the next blocked question presents equal actions", async ({ page }) => {
  await boot(page, plans(undefined, "2026-11-18"));
  await enableGate(page);
  const grants = await mockQuiz(page, 9);
  await page.goto("/quiz/today?plan=mz3");
  await page.getByRole("radio", { name: /正しい選択肢/ }).click();
  await expect(page.getByText("今日の無料10問はここまで")).toHaveCount(0);
  await page.getByRole("button", { name: "次の問題へ" }).click();
  const apply = page.getByRole("link", { name: "月額プランに申し込む" });
  const stop = page.getByRole("link", { name: "今日はここまで" });
  await expect(page.getByRole("heading", { name: "今日の無料10問はここまで" })).toBeVisible();
  await expect(apply).toHaveAttribute("href", /returnTo=/);
  expect(grants).toEqual([catalog[0].id]);
  const [a, b] = await Promise.all([apply.boundingBox(), stop.boundingBox()]);
  expect([a?.width, a?.height]).toEqual([b?.width, b?.height]);
  expect(await apply.evaluate(el => getComputedStyle(el).fontSize)).toBe(await stop.evaluate(el => getComputedStyle(el).fontSize));
  await shot(page, "12-daily-limit");
  await apply.focus();
  await page.keyboard.press("Tab");
  await expect(stop).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/$/);
});

test("scheduled review records the grade before leaving and keeps weak practice independent of the due date", async ({ page }) => {
  await boot(page, plans(), [answer(0, false)]);
  await page.route("**/api/review/due", route => route.fulfill({ json: {
    questions: [question(catalog[0].id)], seenCount: 1, scheduledCount: 0, nextReviewDate: null,
  } }));
  await page.goto("/review?exam=ip");
  await expect(page.getByRole("heading", { name: "今日の復習" })).toBeVisible();
  await page.getByRole("radio", { name: /正しい選択肢/ }).click();
  await page.goto("/review?mode=weak&exam=ip");
  await expect(page.getByText("苦手リストは空です")).toBeVisible();
  await page.goto("/");
  await expect(page.getByRole("group", { name: "学習の進み具合" })).toBeVisible();
});

test("paper weak practice crosses papers once and preserves the original grant header", async ({ page }) => {
  const exam = "dai-1-shu-eisei-kanrisha";
  const papers = ["lckohyo-SAMPLE-ONE", "lckohyo-SAMPLE-TWO"].map((paperId, index) => ({
    id: paperId + "-q1", exam, year: 2026 - index, season: "published", session: "公表試験", qNumber: 1,
    paperId, paperTitle: "確認用の冊子 " + (index + 1), number: 1, choiceCount: 2, answerAuthority: "official", scorable: true,
    pdfUrl: "https://example.invalid/paper.pdf", indexUrl: "https://example.invalid/papers",
  }));
  await boot(page, undefined, [], papers.map(q => q.id));
  await page.route("**/api/study-plan/catalog/" + exam, route => route.fulfill({ json: { questions: papers } }));
  const requested: string[] = [];
  await page.route("**/api/billing/question", route => {
    const { id } = route.request().postDataJSON() as { id: string };
    const q = papers.find(item => item.id === id)!;
    expect(route.request().headers()["x-kakomon-paper"]).toBe(q.paperId);
    requested.push(id);
    return route.fulfill({ json: {
      question: { ...q, text: "冊子の確認問題", images: [], correctChoice: 2, explanation: "確認用の解説" },
      access: { kind: "pass", freeDaily: 10, resetAt: "2026-11-18T00:00:00+09:00", remaining: null, retryAfter: null },
    } });
  });
  await page.goto("/quiz/today?list=weak&exam=" + exam);
  for (const q of papers) {
    await expect(page.getByRole("heading", { name: q.paperTitle, exact: true })).toBeVisible();
    await page.getByRole("radio", { name: /^選択肢 2:/ }).click();
    if (q === papers[0]) await page.reload();
    else await page.getByRole("button", { name: "結果を見る", exact: true }).click();
  }
  await expect(page.getByRole("heading", { name: "2問中2問正解" })).toBeVisible();
  expect(requested).toEqual(papers.map(q => q.id));
  expect(new URL(page.url()).searchParams.has("question")).toBe(false);
});

test("studying with no selected date before an exam has a direct edit action", async ({ page }) => {
  await boot(page, plans([6, 0], "2026-11-18"));
  await page.goto("/");
  await expect(page.getByText("試験前に勉強日がありません")).toBeVisible();
  await expect(page.getByRole("link", { name: "問題を解く", exact: true })).toHaveCount(0);
  await expect(page.getByRole("link", { name: "年度を選ぶ" })).toBeVisible();
  await page.getByRole("button", { name: "勉強する日を変更" }).click();
  await expect(page.getByRole("button", { name: "変更を保存" })).toBeDisabled();
  await page.getByRole("radio", { name: "毎日" }).check();
  await expect(page.getByRole("button", { name: "変更を保存" })).toBeEnabled();
});
