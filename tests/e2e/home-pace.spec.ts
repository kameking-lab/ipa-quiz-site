import { test, expect, type Page } from "@playwright/test";
import { createPacePlan, type PacePlan } from "../../lib/study-plan/pace";
import { LS_KEYS } from "../../lib/storage/keys";

const today = "2026-11-17";
const catalog = Array.from({ length: 200 }, (_, i) => ({ id: `ip-2026h-am-q${i + 1}`, exam: "ip", year: 2026, season: "spring", session: "am", qNumber: i + 1 }));
const fixturePlan = () => ({ ...createPacePlan({ id: "e2e-pace", exam: "ip", sessionId: "test-session", examDate: "2026-11-20", startDate: "2026-11-01" }, catalog, "2026-11-01T00:00:00+09:00"), registration: { label: "テスト日程", start: "2026-11-01", deadline: "2026-11-18", resultDate: "2026-12-01", sourceUrl: "https://www.ipa.go.jp/shiken/", estimated: false } });
async function fixtures(page: Page, plan?: PacePlan, correct = 0, returning = false, recent = false) {
  await page.clock.setFixedTime(new Date(`${today}T12:00:00+09:00`));
  await page.route("**/api/billing/status", r => r.fulfill({ json: { entitled: false } }));
  await page.route("**/api/study-plan/catalog/ip", r => r.fulfill({ json: { questions: catalog } }));
  await page.route("**/api/exam-schedule/ip", r => r.fulfill({ json: { exam: "ip", source: "tsugino", sessions: [{ id: "cbt", label: "随時受験", scheduleStatus: "ondemand", examDate: null, examDateEnd: null, applicationStart: null, applicationDeadline: null, resultDate: null, sourceUrl: "https://www.ipa.go.jp/shiken/", qualificationId: "ip", verifiedDate: today, examPhaseWindows: [] }] } }));
  await page.route("**/api/home/resume?**", r => r.fulfill({ json: { exam: "ip", name: "ITパスポート", href: "/quiz?mode=year&exam=ip&year=2026&season=spring&session=am", caption: "2026年度 · 問1" } }));
  await page.addInitScript(({ keys, value, count, returning, catalog, recent }) => {
    localStorage.removeItem(keys.pacePlans); localStorage.removeItem(keys.history); localStorage.removeItem(keys.lastQuestion);
    if (value) localStorage.setItem(keys.pacePlans, JSON.stringify([value]));
    const entries = catalog.slice(0, count).map(q => ({ id: q.id, selected: "ア", correct: true, at: Date.parse("2026-11-16T12:00:00+09:00") }));
    if (recent) entries.push(...[
      ["ip-1", "2026-11-17T11:00:00+09:00"], ["fe-1", "2026-11-16T23:59:00+09:00"],
      ["ap-1", "2026-11-14T23:59:00+09:00"], ["sc-1", "2026-11-12T23:59:00+09:00"],
      ["fe-2", "2026-11-11T23:59:00+09:00"], ["fp2-1", "2026-11-10T23:59:00+09:00"],
      ["fp2-2", "2026-11-10T23:45:00+09:00"], ["fp2-3", "2026-11-10T23:30:00+09:00"],
    ].map(([id, date]) => ({ id, selected: "ア", correct: true, at: Date.parse(date) })));
    if (entries.length) localStorage.setItem(keys.history, JSON.stringify({ entries, starredIds: [] }));
    if (returning) localStorage.setItem(keys.lastQuestion, JSON.stringify({ exam: "ip", year: 2026, season: "spring", session: "am", qNumber: 1, answeredAt: Date.parse("2026-11-17T11:00:00+09:00") }));
  }, { keys: LS_KEYS, value: plan, count: correct, returning, catalog, recent });
}
async function layout(page: Page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(await page.locator("main").first().evaluate(el => el.getBoundingClientRect().width)).toBeLessThanOrEqual(640);
}
async function expectHomeNavGap(page: Page) {
  const directory = page.locator("#home-qualification-directory > summary");
  const nav = page.getByRole("navigation", { name: "モバイル底タブ" });
  await expect(nav).toBeVisible();
  await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "instant" }));
  await expect(directory).toBeInViewport({ ratio: 1 });
  const navBox = (await nav.boundingBox())!;
  const directoryBox = (await directory.boundingBox())!;
  expect(navBox.y - (directoryBox.y + directoryBox.height)).toBeGreaterThanOrEqual(8);
}
async function screenshot(page: Page, name: string, width: number) {
  const dir = process.env.KP2_SCREENSHOTS;
  if (!dir) return;
  await page.waitForFunction(async () => {
    if (![...document.querySelectorAll<HTMLImageElement>("header img, main img")].every(img => img.complete && img.naturalWidth > 0)) return false;
    const images = [...document.querySelectorAll<SVGImageElement>("main svg image")];
    return (await Promise.all(images.map(element => new Promise<boolean>(resolve => {
      const img = new Image(); img.onload = () => resolve(true); img.onerror = () => resolve(false); img.src = element.href.baseVal;
    })))).every(Boolean);
  });
  await page.evaluate(async () => {
    await Promise.all([...document.querySelectorAll<HTMLImageElement>("header img, main img")].map(img => img.decode()));
    await new Promise(requestAnimationFrame); await new Promise(requestAnimationFrame);
  });
  await page.screenshot({ path: `${dir}/${name}-${width}.png`, fullPage: process.env.PACE_SCREENSHOT_VIEWPORT !== "1", animations: "disabled" });
}
for (const width of [390, 1280]) {
  test.describe(`home pace ${width}px`, () => {
    test.use({ viewport: { width, height: 844 } });
    test("① large target: one CTA with no monthly offer", async ({ page }) => {
      await fixtures(page, fixturePlan(), 62); await page.goto("/");
      await expect(page.getByText("1回の目安　46問正解")).toBeVisible();
      await expect(page.getByRole("link", { name: /計画の問題を解く/ })).toHaveCount(1);
      await expect(page.getByPlaceholder("ほかの資格をさがす")).toBeVisible();
      await expect(page.getByRole("img", { name: "正解済み 62 / 200問" })).toBeVisible();
      await expect(page.getByRole("heading", { name: "試験が近い資格" })).toHaveCount(0);
      await expect(page.getByRole("link", { name: /追いつけます/ })).toHaveCount(0);
      await layout(page); await screenshot(page, "01-planned", width);
      if (width === 390) await expectHomeNavGap(page);
      await page.getByPlaceholder("ほかの資格をさがす").fill("ｆｅ");
      await expect(page.locator("#home-qualification-results").getByRole("link")).toHaveAttribute("href", "/fe");
    });
    test("② deadline sheet registers once", async ({ page }) => {
      await fixtures(page, fixturePlan(), 190); await page.goto("/");
      await expect(page.getByText("1回の目安　4問正解")).toBeVisible();
      await expect(page.getByRole("link", { name: /回数無制限で追いつけます/ })).toHaveCount(0);
      await layout(page); await screenshot(page, "02-ahead", width);
      await page.getByRole("button", { name: /学習計画の詳細.*申込締切/ }).click();
      const details = page.getByRole("dialog", { name: "学習計画", exact: true });
      await expect(details.getByRole("link", { name: /申込ページを開く/ })).toHaveAttribute("href", "https://www.ipa.go.jp/shiken/");
      await details.getByText("申し込み・計画の変更", { exact: true }).click();
      await details.getByRole("button", { name: "申込済みにする" }).click();
      await expect(page.getByRole("button", { name: "学習計画の詳細", exact: true })).toBeVisible();
    });
    test("③ returning: one resume action, start track, search, and up to three recent qualifications", async ({ page }) => {
      await fixtures(page, undefined, 0, true, true); await page.goto("/");
      const resume = page.getByRole("link", { name: /続きを解く/ });
      await expect(resume).toHaveCount(1);
      await expect(resume).toHaveAttribute("href", /\/quiz\?mode=year&exam=ip/);
      await expect(page.getByText("前回 2026年度 · 問1")).toBeVisible();
      await expect(page.getByText("今日 1問", { exact: true })).toBeVisible();
      const track = page.getByRole("img", { name: "チワワがスタートで待機中" });
      await expect(track.getByText("ゴール")).toBeVisible();
      await expect(track.locator("image")).toHaveAttribute("href", "/images/home/pace-run/ip.webp");
      await expect(page.getByRole("button", { name: "学習計画を作る", exact: true })).toBeVisible();
      await expect(page.locator('[data-home-state="returning"]')).toBeVisible();
      const search = page.getByPlaceholder("ほかの資格をさがす");
      await expect(search).toBeVisible();
      await expect(page.getByRole("heading", { name: "試験が近い資格" })).toHaveCount(0);
      const rows = page.getByRole("list", { name: "最近解いた資格" }).getByRole("link");
      await expect(rows).toHaveCount(3);
      for (const [index, [href, label]] of [["/fe", "昨日"], ["/ap", "3日前"], ["/sc", "5日前"]].entries()) {
        await expect(rows.nth(index)).toHaveAttribute("href", href);
        await expect(rows.nth(index)).toContainText(label);
      }
      await layout(page); await screenshot(page, "03-returning", width);
      if (width === 390) await expectHomeNavGap(page);
      await search.fill("あいぱす");
      await expect(page.locator("#home-qualification-results").getByRole("link")).toHaveAttribute("href", "/ip");
      await expect(rows).toHaveCount(0);
    });
    test("④ create: choose day, save, return to pace card", async ({ page }) => {
      await fixtures(page, undefined, 0, true); await page.goto("/");
      await expect(page.getByRole("heading", { name: "最近解いた資格" })).toHaveCount(0);
      await page.getByRole("button", { name: "学習計画を作る", exact: true }).click();
      await expect(page.getByRole("dialog", { name: "学習計画を作る" })).toBeVisible();
      await page.getByRole("combobox", { name: "受ける資格" }).selectOption("ip");
      await expect(page.getByRole("radio", { name: "随時受験" })).toBeChecked();
      await page.getByLabel("予約した日・受けたい日").fill("2026-12-20");
      await layout(page); await screenshot(page, "04-create", width);
      await page.getByRole("button", { name: "この計画で始める" }).click();
      await expect(page.getByRole("link", { name: /計画の問題を解く/ })).toBeVisible();
      expect(await page.evaluate(key => JSON.parse(localStorage.getItem(key)!)[0].examDate, LS_KEYS.pacePlans)).toBe("2026-12-20");
    });
    test("⑤ new: search and three picks, three bottom tabs", async ({ page }) => {
      await fixtures(page); await page.goto("/");
      await expect(page.locator('[data-home-state="new"]')).toBeVisible();
      await expect(page.getByRole("heading", { name: "今日も、ひと問ずつ。" })).toBeVisible();
      await expect(page.getByPlaceholder("受ける資格は？")).toBeVisible();
      await expect(page.locator("#home-qualification-results li")).toHaveCount(3);
      const create = page.getByRole("button", { name: "学習計画を作る" });
      await expect(create.locator('svg[aria-label^="チワワがスタートで待機中"]')).toBeVisible();
      await layout(page); await screenshot(page, "05-new", width);
      if (width === 390) {
        await expect(page.getByRole("navigation", { name: "モバイル底タブ" }).getByRole("link")).toHaveCount(3);
        await expectHomeNavGap(page);
      }
      await page.getByRole("searchbox", { name: "資格名・略称で検索" }).fill("ITパスポート");
      await expect(page.locator("#home-qualification-results li")).toHaveCount(1);
      await create.click();
      await expect(page.getByRole("dialog", { name: "学習計画を作る" })).toBeVisible();
    });
    test("post-exam: one-tap result and one next qualification", async ({ page }) => {
      await fixtures(page, { ...fixturePlan(), examDate: "2026-11-16" }, 62); await page.goto("/");
      await expect(page.locator('[data-home-state="post-exam"]')).toBeVisible();
      const search = page.getByRole("searchbox");
      const track = page.getByRole("img", { name: "正解済み 62 / 200問" });
      await expect(search).toHaveCount(1);
      await expect(track).toHaveCount(1);
      await expect(track.getByText("今日の目標")).toHaveCount(0);
      for (const label of ["合格", "不合格", "受けなかった"]) {
        await expect(page.getByRole("button", { name: label, exact: true })).toBeVisible();
      }
      await layout(page); await screenshot(page, "06-post-exam", width);
      if (width === 390) await expectHomeNavGap(page);
      await page.getByRole("button", { name: "合格", exact: true }).click();
      await expect(page.getByRole("heading", { name: "合格おめでとう！" })).toBeVisible();
      await expect(page.locator("main").getByRole("link", { name: /次は/ })).toHaveCount(1);
      await expect(search).toHaveCount(1);
      await expect(track).toHaveCount(1);
    });
    test("plan uses real questions, puts incorrect answers first, and survives reload", async ({ page, request }) => {
      const response = await request.get("/api/study-plan/catalog/ip");
      expect(response.ok()).toBe(true);
      const real = (await response.json()).questions.slice(0, 20) as typeof catalog;
      const due = real[4], confirmation = real[8];
      const p = createPacePlan({ id: "real-today", exam: "ip", sessionId: null, examDate: "2026-11-20", startDate: "2026-11-01" }, real, "2026-11-17T00:00:00+09:00");
      await page.clock.setFixedTime(new Date(`${today}T12:00:00+09:00`));
      await page.route("**/api/billing/status", r => r.fulfill({ json: { entitled: false } }));
      await page.route("**/api/study-plan/catalog/ip", route => route.fulfill({ json: { questions: real } }));
      await page.route("**/api/billing/question", async route => {
        const { id } = route.request().postDataJSON() as { id: string };
        const coords = real.find(q => q.id === id)!;
        const question = { ...coords, type: "multiple-choice", topicTags: [], category: "テクノロジ系", difficulty: 1,
          question: "確認用の問題", answer: "ア", choices: { ア: "正答", イ: "誤答" }, explanation: "確認用の解説" };
        await route.fulfill({ json: { question, access: { kind: "pass", remaining: null,
          freeDaily: 10, resetAt: "2026-11-18T00:00:00+09:00", retryAfter: null } } });
      });
      await page.addInitScript(({ keys, p, real, due, confirmation }) => {
        if (sessionStorage.getItem("home-pace-real-today-seeded")) return;
        sessionStorage.setItem("home-pace-real-today-seeded", "1");
        localStorage.setItem(keys.pacePlans, JSON.stringify([p]));
        localStorage.setItem(keys.history, JSON.stringify({ entries: [{ id: due.id, correct: false, selected: "ア", at: Date.parse("2026-11-16T12:00:00+09:00") }, { id: confirmation.id, correct: true, selected: "ア", at: Date.parse("2026-11-16T12:00:00+09:00") }], starredIds: [] }));
        localStorage.setItem(keys.spacedRepetition, JSON.stringify({ cards: { [due.id]: { id: due.id, dueAt: 1 } } }));
        localStorage.setItem(keys.lastQuestion, JSON.stringify({ ...real[0], answeredAt: Date.parse("2026-11-16T12:00:00+09:00") }));
      }, { keys: LS_KEYS, p, real, due, confirmation });
      await page.goto("/quiz/today?plan=real-today");
      await expect(page.getByRole("radio").first()).toBeVisible();
      expect(new URL(page.url()).searchParams.get("question")).toBe(due.id);
      await expect(page.getByRole("heading", { name: "計画の問題 · 7問" })).toBeVisible();
      await page.getByRole("radio").first().click();
      await page.reload();
      await expect(page.getByRole("radio").first()).toBeVisible();
      expect(new URL(page.url()).searchParams.get("question")).toBe(real[0].id);
      expect(await page.evaluate(({ key, id }) => JSON.parse(localStorage.getItem(key)!).entries
        .filter((entry: { id: string }) => entry.id === id).length, { key: LS_KEYS.history, id: due.id })).toBe(2);
      await page.getByRole("radio").first().click();
      await page.getByRole("button", { name: "次の問題へ", exact: true }).first().click();
      await expect.poll(() => new URL(page.url()).searchParams.get("question")).toBe(real[1].id);
    });
    test("library today uses the existing paper grant and records the official result", async ({ page }) => {
      const library = [{ id: "lckohyo-TEST-q1", exam: "dai-1-shu-eisei-kanrisha", year: 2026, season: "published", session: "テスト", qNumber: 1,
        paperId: "lckohyo-TEST", paperTitle: "テスト回", number: 1, choiceCount: 4, answerAuthority: "official", scorable: true,
        pdfUrl: "https://www.exam.or.jp/", indexUrl: "https://www.exam.or.jp/" }];
      const p = createPacePlan({ id: "library-today", exam: library[0].exam, sessionId: null, examDate: "2026-11-18", startDate: today }, library, `${today}T00:00:00+09:00`);
      await page.clock.setFixedTime(new Date(`${today}T12:00:00+09:00`));
      await page.route("**/api/billing/status", r => r.fulfill({ json: { entitled: false } }));
      await page.route("**/api/study-plan/catalog/dai-1-shu-eisei-kanrisha", r => r.fulfill({ json: { questions: library } }));
      let grants = 0;
      await page.route("**/api/billing/question", r => {
        expect(r.request().headers()["x-kakomon-paper"]).toBe("lckohyo-TEST"); grants++;
        return r.fulfill({ json: { question: { id: library[0].id, number: 1, text: "テスト用の問い", images: [], correctChoice: 3, choiceCount: 4, answerAuthority: "official", explanation: "テスト用の解説" },
          access: { kind: "guest", remaining: 9, freeDaily: 10, resetAt: "2026-11-18T00:00:00+09:00", retryAfter: null } } });
      });
      await page.addInitScript(({ key, p }) => localStorage.setItem(key, JSON.stringify([p])), { key: LS_KEYS.pacePlans, p });
      await page.goto("/quiz/today?plan=library-today");
      await page.getByRole("radio", { name: /^選択肢 3:/ }).click();
      await expect(page.getByRole("heading", { name: "正解", exact: true })).toBeVisible();
      expect(grants).toBeGreaterThan(0);
      expect(await page.evaluate(key => JSON.parse(localStorage.getItem(key)!).actions.at(-1).correct, LS_KEYS.learningActivity)).toBe(true);
      await page.getByRole("button", { name: /次の問題|結果を見る/ }).first().click();
      await expect(page.getByRole("heading", { name: "1問中1問正解" })).toBeVisible();
    });
  });
}
