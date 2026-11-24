import { test, expect, type Locator, type Page } from "@playwright/test";
import { createPacePlan, type PacePlan } from "../../lib/study-plan/pace";
import { LS_KEYS } from "../../lib/storage/keys";

const today = "2026-11-17";
const catalog = Array.from({ length: 200 }, (_, i) => ({ id: `ip-2026h-am-q${i + 1}`, exam: "ip", year: 2026, season: "spring", session: "am", qNumber: i + 1 }));
const fixturePlan = () => ({ ...createPacePlan({ id: "e2e-pace", exam: "ip", sessionId: "test-session", examDate: "2026-11-20", examDateSource: "official", startDate: "2026-11-01" }, catalog, "2026-11-01T00:00:00+09:00"), registration: { label: "テスト日程", start: "2026-11-01", deadline: "2026-11-18", resultDate: "2026-12-01", sourceUrl: "https://www.ipa.go.jp/shiken/", estimated: false } });

test.beforeEach(async ({ page }) => {
  await page.route("**/api/exam-schedule/*", route => route.fulfill({ json: {
    exam: new URL(route.request().url()).pathname.split("/").at(-1), source: "manual", sessions: [],
  } }));
});

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
  const width = page.viewportSize()!.width;
  const hero = page.locator(".p3-home-scene");
  const [main, header, intro, track] = await Promise.all([
    page.locator("main").first().boundingBox(), page.locator(".site-header > div").boundingBox(),
    hero.locator('[data-event-panel="intro"]').boundingBox(), hero.locator(".p3-event-track").boundingBox(),
  ]);
  expect(main!.width).toBe(width === 1280 ? 1024 : width);
  expect(header!.width).toBe(main!.width);
  if (await hero.locator("[data-pace-track=progress]").count()) expect(track!.y).toBeGreaterThanOrEqual(intro!.y + intro!.height);
  else if (width === 1280) expect(track!.x).toBeGreaterThanOrEqual(intro!.x + intro!.width);
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

async function screenshotHero(hero: Locator, path: string) {
  await hero.locator("svg image").evaluateAll(async sprites => {
    await Promise.all(sprites.map(sprite => {
      const image = new Image();
      image.src = (sprite as SVGImageElement).href.baseVal;
      return image.decode();
    }));
    await document.fonts.ready;
    await new Promise(requestAnimationFrame);
    await new Promise(requestAnimationFrame);
  });
  await hero.screenshot({ path, animations: "disabled" });
}

async function calendarContrast(calendar: Locator) {
  const ratios = await calendar.locator("[data-countdown] h2 span, [data-countdown] strong, [data-countdown] p").evaluateAll(elements => {
    function luminance(rgb: string) {
      const channels = rgb.match(/\d+(?:\.\d+)?/g)!.slice(0, 3).map(channel => {
        const value = Number(channel) / 255;
        return value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4;
      });
      return channels[0] * .2126 + channels[1] * .7152 + channels[2] * .0722;
    }
    return elements.map(element => {
      let background = getComputedStyle(element).backgroundColor;
      let ancestor = element.parentElement;
      while (background === "rgba(0, 0, 0, 0)" && ancestor) {
        background = getComputedStyle(ancestor).backgroundColor;
        ancestor = ancestor.parentElement;
      }
      const colors = [luminance(background), luminance(getComputedStyle(element).color)];
      return (Math.max(...colors) + .05) / (Math.min(...colors) + .05);
    });
  });
  return Math.min(...ratios);
}

test("reserves the saved plan before hydration and before the catalog arrives", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const plan = fixturePlan();
  plan.registration.estimated = true;
  await fixtures(page, plan, 62);
  let releaseScripts!: () => void;
  const scripts = new Promise<void>(resolve => { releaseScripts = resolve; });
  let releaseCatalog!: () => void;
  const questions = new Promise<void>(resolve => { releaseCatalog = resolve; });
  let releaseSchedule!: () => void;
  const schedule = new Promise<void>(resolve => { releaseSchedule = resolve; });
  await page.route("**/_next/static/**/*.js", async route => {
    await scripts;
    await route.continue();
  });
  await page.route("**/api/study-plan/catalog/ip", async route => {
    await questions;
    await route.fulfill({ json: { questions: catalog } });
  });
  await page.route("**/api/exam-schedule/ip", async route => {
    await schedule;
    await route.fulfill({ json: { exam: "ip", source: "tsugino", sessions: [{ id: plan.sessionId,
      scheduleStatus: "official", datePrecision: "date", examDate: plan.examDate,
      applicationStart: plan.registration.start, applicationDeadline: plan.registration.deadline,
      sourceUrl: plan.registration.sourceUrl }] } });
  });
  const roomY = async () => (await page.getByTestId("home-study-room").boundingBox())!.y;
  try {
    await page.goto("/", { waitUntil: "commit" });
    await expect(page.locator("#today")).toHaveAttribute("data-home-state", "loading");
    await expect(page.locator("html")).toHaveAttribute("data-home-study-layout", "planned");
    await expect(page.getByText("学習計画を読み込み中…")).toBeVisible();
    await expect(page.getByRole("link", { name: "問題を解く", exact: true })).toHaveCount(0);
    await expect(page.getByPlaceholder("ほかの資格をさがす")).toBeAttached();
    const first = await roomY();
    releaseScripts();
    await expect(page.getByText("問題を読み込み中…")).toBeAttached();
    await expect(page.getByText("学習計画を読み込み中…")).toHaveCount(0);
    const pending = await roomY();
    releaseCatalog();
    await expect(page.locator("[data-pace-track=progress] svg[role=group]")).toBeAttached();
    const loaded = await roomY();
    await expect(page.locator("[data-home-calendar]")).toHaveCount(0);
    const track = page.locator("[data-pace-track=progress]");
    const trackBefore = await track.boundingBox();
    const shiftObserver = await page.evaluateHandle(() => {
      const entries: PerformanceEntry[] = [];
      const observer = new PerformanceObserver(list => entries.push(...list.getEntries()));
      observer.observe({ type: "layout-shift" });
      return { entries, observer };
    });
    releaseSchedule();
    await expect(page.locator("[data-home-calendar]")).toBeVisible();
    await expect(page.getByRole("link", { name: "問題を解く", exact: true })).toBeVisible();
    expect(await track.boundingBox()).toEqual(trackBefore);
    expect(await roomY()).toBe(loaded);
    const cls = await shiftObserver.evaluate(async ({ entries, observer }) => {
      await new Promise(requestAnimationFrame);
      await new Promise(requestAnimationFrame);
      const shifts = [...entries, ...observer.takeRecords()] as Array<PerformanceEntry & { value: number; hadRecentInput: boolean }>;
      observer.disconnect();
      return shifts.reduce((sum, shift) => sum + (shift.hadRecentInput ? 0 : shift.value), 0);
    });
    await shiftObserver.dispose();
    expect(cls).toBe(0);
    expect(Math.abs(first - loaded)).toBeLessThan(4);
    expect(Math.abs(pending - loaded)).toBeLessThan(4);
  } finally {
    releaseScripts();
    releaseCatalog();
    releaseSchedule();
  }
});

for (const hasDate of [true, false]) {
  test(`settles a delayed schedule for an undated plan (${hasDate ? "dated" : "empty"})`, async ({ page }) => {
    test.setTimeout(60_000);
    await page.setViewportSize({ width: 390, height: 844 });
    const { registration, ...saved } = fixturePlan();
    await fixtures(page, { ...saved, examDate: null, examDateSource: undefined }, 100);
    let release!: () => void;
    const gate = new Promise<void>(resolve => { release = resolve; });
    const examDate = "2026-11-28";
    await page.route("**/api/exam-schedule/ip", async route => {
      await gate;
      await route.fulfill({ json: { exam: "ip", source: "tsugino", sessions: hasDate ? [{
        id: saved.sessionId, label: "テスト日程", scheduleStatus: "official", datePrecision: "date", examDate,
        applicationStart: registration.start, applicationDeadline: registration.deadline, sourceUrl: registration.sourceUrl,
      }] : [] } });
    });
    try {
      await page.goto("/");
      await expect(page.getByText("日程を読み込み中…")).toBeVisible({ timeout: 20_000 });
      await expect(page.locator("[data-pace-track=progress] svg[role=group]")).toBeAttached();
      const track = page.locator("[data-pace-track=progress]");
      const room = page.getByTestId("home-study-room");
      const [trackBefore, roomBefore] = await Promise.all([track.boundingBox(), room.boundingBox()]);
      const shifts = await page.evaluateHandle(async () => {
        await new Promise(requestAnimationFrame);
        await new Promise(requestAnimationFrame);
        const entries: Array<PerformanceEntry & { value?: number; hadRecentInput?: boolean; sources?: Array<{ node: Node | null }> }> = [];
        const observer = new PerformanceObserver(list => entries.push(...list.getEntries()));
        observer.observe({ type: "layout-shift" });
        return { entries, observer };
      });
      release();
      await expect(page.getByText("日程を読み込み中…")).toHaveCount(0);
      const cta = page.getByRole("link", { name: "問題を解く", exact: true });
      const setDate = page.getByRole("button", { name: "自分の受験日を設定" });
      if (hasDate) {
        await expect(page.locator(`[data-home-calendar] time[datetime="${examDate}"]`)).toBeVisible();
        await expect(page.getByText("1日の目安 10問正解")).toBeVisible();
        await expect(setDate).toHaveCount(0);
        expect(await track.boundingBox()).toEqual(trackBefore);
        expect((await room.boundingBox())!.y).toBe(roomBefore!.y);
      } else {
        const intro = page.locator('[data-event-panel="intro"]');
        await expect(page.locator("[data-home-calendar]")).toHaveCount(0);
        await expect(track.getByRole("button", { name: "チワワの進み具合" })).toBeVisible();
        await expect(intro.getByRole("button", { name: "自分の受験日を設定" })).toBeVisible();
        await expect(cta).toHaveCount(0);
        expect((await track.boundingBox())!.y).toBeLessThan(trackBefore!.y - 70);
        expect((await room.boundingBox())!.y).toBeLessThan(roomBefore!.y - 70);
      }
      const layout = await shifts.evaluate(async ({ entries, observer }) => {
        await new Promise(requestAnimationFrame);
        await new Promise(requestAnimationFrame);
        const records = [...entries, ...observer.takeRecords()] as typeof entries;
        observer.disconnect();
        const unexpected = records.filter(entry => !entry.hadRecentInput);
        return {
          cls: unexpected.reduce((sum, entry) => sum + (entry.value ?? 0), 0),
          moved: unexpected.flatMap(entry => entry.sources?.map(({ node }) => node instanceof Element
            ? { tag: node.tagName, id: node.id, className: node.getAttribute("class") }
            : node?.nodeName) ?? []),
        };
      });
      expect(layout.cls, JSON.stringify(layout.moved)).toBe(0);
      await shifts.dispose();
      if (hasDate) {
        await cta.click();
        await expect(page).toHaveURL(/\/quiz\/today\?plan=e2e-pace/, { timeout: 20_000 });
        await expect(page.getByRole("heading", { name: "計画の問題 · 10問" })).toBeVisible({ timeout: 20_000 });
      } else {
        await setDate.click();
        await expect(page.getByRole("dialog")).toBeVisible();
      }
    } finally {
      release();
    }
  });
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
      await expect(page.getByText("1日の目安 46問正解")).toBeVisible();
      await expect(page.getByRole("link", { name: /^問題を解く$/ })).toHaveCount(1);
      await expect(page.getByPlaceholder("ほかの資格をさがす")).toBeVisible();
      await expect(page.getByRole("group", { name: "学習の進み具合" })).toBeVisible();
      await expect(page.getByRole("heading", { name: "試験が近い資格" })).toHaveCount(0);
      await expect(page.getByRole("link", { name: /追いつけます/ })).toHaveCount(0);
      await layout(page); await screenshot(page, "01-planned", width);
      if (width === 390) await expectHomeNavGap(page);
      await page.getByPlaceholder("ほかの資格をさがす").fill("ｆｅ");
      await expect(page.locator("#home-qualification-results").getByRole("link")).toHaveAttribute("href", "/fe");
    });
    test("② deadline sheet registers once", async ({ page }) => {
      await fixtures(page, fixturePlan(), 190); await page.goto("/");
      await expect(page.getByText("1日の目安 4問正解")).toBeVisible();
      await expect(page.getByRole("link", { name: /回数無制限で追いつけます/ })).toHaveCount(0);
      await layout(page); await screenshot(page, "02-ahead", width);
      const calendar = page.locator("[data-home-calendar]");
      await expect(calendar.getByRole("heading").first()).toHaveText(/申込締切まで\s*あと\s*1\s*日/);
      await page.getByRole("button", { name: "計画の確認" }).click();
      const details = page.getByRole("dialog", { name: "学習計画", exact: true });
      await expect(details.getByRole("link", { name: /申込ページを開く/ })).toHaveAttribute("href", "https://www.ipa.go.jp/shiken/");
      await details.getByText("申し込み・計画の変更", { exact: true }).click();
      await details.getByRole("button", { name: "申込済みにする" }).click();
      await expect(calendar.getByRole("heading")).toHaveText(/試験まで\s*あと\s*3\s*日/);
      await expect(page.getByRole("button", { name: "計画の確認", exact: true })).toBeVisible();
    });
    test("the chihuahua discloses mastery and the same practice link retries after the first pass", async ({ page }) => {
      await fixtures(page, fixturePlan(), 198);
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto("/");
      const hero = page.locator(".p3-home-scene");
      const track = hero.getByRole("group", { name: "学習の進み具合" });
      const dog = track.getByRole("button", { name: "チワワの進み具合" });
      const bubble = track.getByRole("status");
      await expect(hero.getByRole("link", { name: "問題を解く", exact: true })).toHaveCount(1);
      await expect(dog).toHaveAttribute("aria-expanded", "false");
      await dog.focus();
      await page.keyboard.press("Enter");
      await expect(dog).toHaveAttribute("aria-expanded", "true");
      await expect(bubble).toHaveText("198問 / 200問クリア");
      await page.keyboard.press("Escape");
      await expect(dog).toBeFocused();
      await expect(bubble).toBeEmpty();
      await dog.click();
      await dog.click();
      await expect(bubble).toBeEmpty();
      await dog.click();
      await hero.locator("[data-countdown=exam] h2").click();
      await expect(bubble).toBeEmpty();

      await page.evaluate(({ key, ids }) => {
        const history = JSON.parse(localStorage.getItem(key)!);
        history.entries.push(...ids.map(id => ({ id, correct: false, selected: "イ", at: Date.now() })));
        localStorage.setItem(key, JSON.stringify(history));
        window.dispatchEvent(new Event("study-plan:changed"));
      }, { key: LS_KEYS.history, ids: catalog.slice(-2).map(q => q.id) });
      await expect(hero.getByRole("link", { name: "問題を解く", exact: true })).toHaveCount(0);
      const retry = hero.getByRole("link", { name: "間違えた問題を解き直す" });
      await expect(retry).toHaveAttribute("href", "/quiz/today?plan=e2e-pace");
      await retry.click();
      await expect(page).toHaveURL(/\/quiz\/today\?plan=e2e-pace/);
      await expect(page.getByRole("heading", { name: "計画の問題 · 1問" })).toBeVisible();
      const batch = await page.evaluate(key => JSON.parse(sessionStorage.getItem(key)!).ids, LS_KEYS.paceBatchPrefix + "e2e-pace");
      expect(batch).toEqual([catalog[198].id]);
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
      await expect(track.locator('image[href^="/images/home/pace-run/"]')).toHaveAttribute("href", "/images/home/pace-run/ip.webp");
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
      await expect(page.getByRole("link", { name: /^問題を解く$/ })).toBeVisible();
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
      const track = page.getByRole("group", { name: "学習の進み具合" });
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
      await expect(page.locator("main").getByRole("link", { name: "過去問AIで解く", exact: true })).toHaveCount(1);
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

test.describe("home flip calendar", () => {
  test.use({ timezoneId: "Asia/Tokyo" });

  const scenes = [
    { name: "day", date: "2026-11-27", hour: "12", weather: "clear", colorScheme: "light", width: 390 },
    { name: "night-christmas", date: "2026-12-25", hour: "21", weather: "snow", colorScheme: "dark", width: 1280, event: "christmas" },
  ] as const;
  const states = [
    { name: "before-opening", starts: 3, closes: 6, primary: "申込開始まで", days: 3, secondary: "試験" },
    { name: "open", closes: 2, primary: "申込締切まで", days: 2, secondary: "試験" },
    { name: "deadline-day", closes: 0, primary: "申込締切まで", days: 0, secondary: "試験" },
    { name: "closed", closes: -1, primary: "試験まで", days: 11, secondary: null },
    { name: "registered", closes: 2, registered: true, primary: "試験まで", days: 11, secondary: "申込済み" },
    { name: "exam-day", closes: -1, exam: 0, primary: "今日が受験日", secondary: null },
    { name: "after-exam", closes: -2, exam: -1 },
    { name: "estimated", closes: 2, estimated: true, primary: "申込締切まで", days: 2, secondary: "試験" },
    { name: "no-dates", noDates: true },
  ] as const;
  const screenshotDir = process.env.HOME_COUNTDOWN_SCREENSHOTS;

  for (const initialSource of ["tentative", "official"] as const) {
    test(`uses the updated day for a plan saved as ${initialSource} across home, editing, and practice`, async ({ page }) => {
      const provisionalDate = "2026-11-28";
      const officialDate = "2026-12-05";
      const base = fixturePlan();
      const registration = { ...base.registration, label: "2026年度第1回", start: null, deadline: null, resultDate: null, estimated: true };
      const undated = { ...base, examDate: null, examDateSource: undefined, registration };
      const session = { id: base.sessionId, label: registration.label, examDate: provisionalDate, datePrecision: "date",
        scheduleStatus: initialSource, sourceUrl: registration.sourceUrl, applicationStart: null, applicationDeadline: null, resultDate: null };
      await page.setViewportSize({ width: 390, height: 844 });
      await page.emulateMedia({ reducedMotion: "reduce", colorScheme: "light" });
      await page.clock.setFixedTime(new Date("2026-11-27T12:10:00+09:00"));
      await page.addInitScript(({ key, value }) => {
        if (!localStorage.getItem(key)) localStorage.setItem(key, JSON.stringify([value]));
      }, { key: LS_KEYS.pacePlans, value: undated });
      await page.route("**/api/home/weather", route => route.fulfill({ json: { weather: "clear" } }));
      await page.route("**/api/billing/status", route => route.fulfill({ json: { entitled: false } }));
      await page.route("**/api/study-plan/catalog/ip", route => route.fulfill({ json: { questions: catalog } }));
      let scheduleGate: Promise<void> | undefined;
      let fallback = false;
      await page.route("**/api/exam-schedule/ip", async route => {
        await scheduleGate;
        await route.fulfill({ json: { exam: "ip", source: fallback ? "fallback" : "tsugino",
          sessions: fallback ? [{ ...session, id: "fallback-ip-0", examDate: provisionalDate }] : [session] } });
      });
      const hero = page.locator(".p3-home-scene");
      const calendar = hero.locator("[data-home-calendar]");
      const dialog = page.getByRole("dialog");
      const edit = async () => {
        await hero.getByRole("button", { name: "計画の確認" }).click();
        await dialog.getByRole("button", { name: "計画を変更", exact: true }).click();
      };
      const savedDate = () => page.evaluate(key => JSON.parse(localStorage.getItem(key)!)[0], LS_KEYS.pacePlans);
      await page.goto("/");
      await edit();
      await dialog.getByRole("radio", { name: /2026年度第1回/ }).check();
      await expect(dialog.locator(`time[datetime="${provisionalDate}"]`)).toBeVisible();
      await expect(dialog.locator('input[type="date"]')).toHaveCount(0);
      await dialog.getByRole("button", { name: "変更を保存" }).click();
      await expect(dialog).toHaveCount(0);
      const originalPlan = await savedDate() as PacePlan;
      expect(originalPlan).toMatchObject({ examDate: provisionalDate, examDateSource: initialSource });
      await expect(calendar.getByRole("heading", { name: `試験まで${initialSource === "tentative" ? "（予定）" : ""} あと 1 日` })).toBeVisible();

      Object.assign(session, { examDate: officialDate, scheduleStatus: "official" });
      for (const [day, stage, days, target] of [
        initialSource === "tentative" ? [provisionalDate, "old-day", 7, 29] : ["2026-11-27", "eve", 8, 25],
        ["2026-11-29", "after-old-day", 6, 34],
      ] as const) {
        await page.clock.setFixedTime(new Date(`${day}T12:10:00+09:00`));
        if (initialSource === "official" && stage === "after-old-day") {
          await page.evaluate(({ key, plan }) => localStorage.setItem(key, JSON.stringify([plan])), { key: LS_KEYS.pacePlans, plan: originalPlan });
        }
        const gate = Promise.withResolvers<void>();
        scheduleGate = gate.promise;
        try {
          await page.goto("/", { waitUntil: "domcontentloaded" });
          await expect(hero.getByText("日程を読み込み中…")).toBeVisible();
          await expect(hero.locator("[data-pace-track=progress] svg[role=group]")).toBeAttached();
          await expect(hero.getByRole("group", { name: "結果を記録" })).toHaveCount(0);
          const shifts = await page.evaluateHandle(async () => {
            await document.fonts.ready;
            await new Promise(requestAnimationFrame);
            const entries: Array<PerformanceEntry & { value?: number; hadRecentInput?: boolean }> = [];
            const observer = new PerformanceObserver(list => entries.push(...list.getEntries()));
            observer.observe({ type: "layout-shift" });
            return { entries, observer };
          });
          gate.resolve();
          await expect(calendar.getByRole("heading", { name: `試験まで あと ${days} 日`, exact: true })).toBeVisible();
          await expect(calendar.locator(`time[datetime="${officialDate}"]`)).toBeVisible();
          await expect(hero.getByText(`1日の目安 ${target}問正解`)).toBeVisible();
          await expect(hero.getByRole("group", { name: "結果を記録" })).toHaveCount(0);
          expect(await shifts.evaluate(async ({ entries, observer }) => {
            await new Promise(requestAnimationFrame);
            await new Promise(requestAnimationFrame);
            const records = [...entries, ...observer.takeRecords()] as typeof entries;
            observer.disconnect();
            return records.reduce((sum, entry) => sum + (entry.hadRecentInput ? 0 : entry.value ?? 0), 0);
          })).toBe(0);
          await shifts.dispose();
          expect(await calendarContrast(calendar)).toBeGreaterThanOrEqual(4.5);
          const screenshot = `${screenshotDir}/${initialSource}-${stage}`;
          if (screenshotDir) await screenshotHero(hero, `${screenshot}-home-390.png`);

          await edit();
          const confirmedDate = dialog.locator(`time[datetime="${officialDate}"]`);
          await expect(confirmedDate).toBeVisible();
          await expect(dialog.locator('input[type="date"]')).toHaveCount(0);
          if (screenshotDir) {
            await dialog.locator("fieldset").first().scrollIntoViewIfNeeded();
            await page.screenshot({ path: `${screenshot}-edit-390.png`, animations: "disabled" });
          }
          await page.keyboard.press("Escape");
          await expect(dialog).toHaveCount(0);
          expect(await savedDate()).toMatchObject({ examDate: officialDate, examDateSource: "official" });
          if (stage === "after-old-day") {
            fallback = true;
            await page.reload();
            await expect(calendar.getByRole("heading", { name: "試験まで あと 6 日", exact: true })).toBeVisible();
            await expect(hero.getByText("1日の目安 34問正解")).toBeVisible();
            await expect(hero.getByRole("group", { name: "結果を記録" })).toHaveCount(0);
            if (screenshotDir) await screenshotHero(hero, `${screenshot}-fallback-390.png`);
            await hero.getByRole("button", { name: "資格を切り替える" }).click();
            await expect(dialog.getByRole("button", { name: /ITパスポート/ })).toContainText(officialDate);
            if (screenshotDir) await page.screenshot({ path: `${screenshot}-switch-390.png`, animations: "disabled" });
            await page.keyboard.press("Escape");
            expect(await savedDate()).toMatchObject({ examDate: officialDate, examDateSource: "official" });
          }
          await hero.getByRole("link", { name: "問題を解く", exact: true }).click();
          await expect(page).toHaveURL(/\/quiz\/today\?plan=e2e-pace/, { timeout: 20_000 });
          await expect(page.getByRole("heading", { name: `計画の問題 · ${target}問` })).toBeVisible({ timeout: 20_000 });
        } finally {
          gate.resolve();
        }
      }

      await page.clock.setFixedTime(new Date("2026-12-06T12:10:00+09:00"));
      await page.goto("/");
      await expect(hero.getByRole("heading", { name: "試験、おつかれさまでした" })).toBeVisible();
      await expect(hero.locator(`time[datetime="${officialDate}"]`)).toHaveCount(0);
      await hero.getByRole("button", { name: "計画の確認", exact: true }).click();
      await expect(dialog.locator(`time[datetime="${officialDate}"]`)).toBeVisible();
      await page.keyboard.press("Escape");
      await hero.getByRole("button", { name: "合格", exact: true }).click();
      expect(await savedDate()).toMatchObject({ examDate: officialDate, examDateSource: "official", result: "passed" });
    });
  }

  for (const state of states) {
    for (const scene of scenes) {
      const alternateWidth = ["before-opening", "closed", "registered"].includes(state.name);
      const mobile = (scene.width === 390) !== alternateWidth;
      const width = mobile ? 390 : 1280;
      const morning = state.name === "before-opening" && scene.name === "day";
      const evening = state.name === "closed" && scene.name === "day";
      const sceneName = morning ? "morning" : evening ? "evening" : scene.name;
      const colorScheme = scene.name === "day" && state.name === "registered" ? "dark"
        : state.name === "exam-day" ? "light" : scene.colorScheme;
      test(`${state.name} · ${sceneName} · ${colorScheme} · ${width}px`, async ({ page }) => {
        const hour = morning ? "07" : evening ? "17" : scene.hour;
        const weather = morning ? "cloudy" : evening ? "rain" : scene.weather;
        await page.setViewportSize({ width, height: mobile ? 1040 : 844 });
        await page.emulateMedia({ reducedMotion: "reduce", colorScheme });
        const dateAt = (offset: number) =>
          new Date(Date.parse(scene.date) + 86_400_000 * offset).toISOString().slice(0, 10);
        const estimated = "estimated" in state;
        const basePlan = fixturePlan();
        const scheduledExamDate = dateAt("exam" in state ? state.exam : 11);
        const plan: PacePlan = {
          ...basePlan,
          examDate: estimated || "noDates" in state ? null : scheduledExamDate,
          registered: "registered" in state,
          registration: "noDates" in state ? undefined : { ...basePlan.registration, label: "受験回", estimated,
            start: dateAt("starts" in state ? state.starts : -8), deadline: dateAt(state.closes) },
        };
        await fixtures(page, plan, 100);
        await page.clock.setFixedTime(new Date(`${scene.date}T${hour}:10:00+09:00`));
        await page.route("**/api/home/weather", route => route.fulfill({ json: { weather } }));
        const previousYear = (date: string | null | undefined) => date && `${Number(date.slice(0, 4)) - 1}${date.slice(4)}`;
        await page.route("**/api/exam-schedule/ip", route => route.fulfill({ json: { exam: "ip", source: "tsugino",
          sessions: estimated ? [
            { id: plan.sessionId, qualificationId: "itpassport", label: "2026年度第1回", fiscalYear: "2026",
              scheduleStatus: "tentative", unannounced: true, examDate: null, datePrecision: "unknown" },
            { id: "previous", qualificationId: "itpassport", label: "2025年度第1回", fiscalYear: "2025",
              scheduleStatus: "official", examDate: previousYear(scheduledExamDate), datePrecision: "date",
              applicationStart: previousYear(plan.registration?.start), applicationDeadline: previousYear(plan.registration?.deadline),
              sourceUrl: plan.registration?.sourceUrl },
          ] : [],
        } }));
        await page.goto("/");
        const hero = page.locator(".p3-home-scene");
        const calendar = hero.locator("[data-home-calendar]");
        await expect(hero.getByRole("group", { name: "学習の進み具合" })).toBeVisible();
        await expect(page.locator("html")).toHaveAttribute("data-home-scene", sceneName.split("-")[0]);
        if ("event" in scene) {
          await expect(hero.locator(`[data-home-event-art="${scene.event}"]`)).toHaveAttribute("data-home-event-ready", "true");
        } else {
          await expect(page.locator("html")).not.toHaveAttribute("data-home-event-layout");
        }
        if (weather !== "clear") await expect(hero.locator("[data-home-weather]")).toHaveAttribute("data-home-weather", weather);

        if ("primary" in state) {
          await expect(calendar).toHaveCount(1);
          const heading = calendar.getByRole("heading").first();
          const label = estimated ? `${state.primary}（見込み）` : state.primary;
          await expect(heading).toHaveAccessibleName("days" in state ? `${label} あと ${state.days} 日` : label);
          const primaryDate = state.primary === "申込開始まで" ? plan.registration?.start
            : state.primary === "申込締切まで" ? plan.registration?.deadline : plan.examDate;
          await expect(calendar.locator("time").first()).toHaveAttribute("datetime", primaryDate!);
          if (state.secondary === "試験") {
            await expect(calendar.locator("[data-countdown]")).toHaveCount(2);
            await expect(calendar.locator("[data-countdown=exam] time")).toHaveAttribute("datetime", scheduledExamDate);
            await expect(calendar.locator("[data-countdown=exam] h2")).toContainText(/試験まで.*あと\s*11\s*日/);
          } else {
            await expect(calendar.locator("[data-countdown]")).toHaveCount(1);
            if (state.secondary === "申込済み") await expect(calendar.locator(":scope > p")).toHaveText("申込済み");
            else await expect(calendar.locator(":scope > p")).toHaveCount(0);
          }
          await expect(calendar.locator("h2").getByText(/見込み/)).toHaveCount(estimated ? 2 : 0);
          expect(await calendarContrast(calendar)).toBeGreaterThanOrEqual(4.5);
          const calendarBox = (await calendar.boundingBox())!;
          const trackBox = (await hero.locator("[data-pace-track=progress]").boundingBox())!;
          expect(calendarBox.y + calendarBox.height).toBeLessThanOrEqual(trackBox.y);
          const cta = hero.getByRole("link", { name: "問題を解く", exact: true });
          if (await cta.count()) {
            expect(calendarBox.y + calendarBox.height).toBeLessThanOrEqual((await cta.boundingBox())!.y);
          }
          await expect(calendar.getByRole("button")).toHaveCount(0);
          await expect(calendar.getByRole("link")).toHaveCount(0);
        } else {
          await expect(calendar).toHaveCount(0);
          if ("exam" in state) await expect(hero.getByRole("heading", { name: "試験、おつかれさまでした" })).toBeVisible();
        }
        if (screenshotDir) {
          await screenshotHero(hero, `${screenshotDir}/${state.name}-${sceneName}-${colorScheme}-${width}.png`);
        }
        if (estimated || "noDates" in state) {
          await hero.getByRole("button", { name: "計画の確認" }).click();
          const dialog = page.getByRole("dialog");
          const examDate = dialog.locator("dl > div").filter({ hasText: "受験日" }).locator("dd");
          if (estimated) {
            await expect(examDate.locator("time")).toHaveAttribute("datetime", scheduledExamDate);
            await expect(examDate).toHaveText(await calendar.locator("time").last().textContent() + "（見込み）");
            if (screenshotDir) await page.screenshot({ path: `${screenshotDir}/estimated-${sceneName}-detail-${width}.png`, animations: "disabled" });
          } else await expect(examDate).toHaveText("未発表");
        }
      });
    }
  }

  const savedDateCases = [
    { source: "manual", history: "with-history", eve: "試験まで あと 1 日", today: "今日が受験日", image: "personal" },
    { source: "manual", history: "no-history", eve: "試験まで あと 1 日", today: "今日が受験日", image: "personal" },
    { source: "tentative", history: "with-history", eve: "試験まで（予定） あと 1 日", today: "今日が試験予定日", image: "tentative" },
    { source: "tentative", history: "no-history", eve: "試験まで（予定） あと 1 日", today: "今日が試験予定日", image: "tentative" },
    { source: "official", history: "with-history", eve: "試験まで あと 1 日", today: "今日が受験日", image: "official" },
    { source: undefined, history: "no-history", eve: "試験まで あと 1 日", today: "今日が受験日", image: "legacy" },
  ] as const;
  for (const { source, history, eve: eveHeading, today: todayHeading, image } of savedDateCases) {
    test(`uses the saved ${image} exam date on the eve and exam day (${history})`, async ({ page }) => {
      const eve = "2026-11-27";
      const appointment = "2026-11-28";
      const base = fixturePlan();
      const plan = {
        ...base, id: "r1-plan", examDate: source ? null : appointment, examDateSource: undefined, startDate: "2026-10-30",
        registration: { ...base.registration, label: "受験回", resultDate: null, estimated: true },
      };
      const undated = { id: plan.sessionId, qualificationId: "itpassport", label: "2026年度第1回", fiscalYear: "2026",
        scheduleStatus: "tentative", unannounced: true, examDate: null, datePrecision: "unknown", resultDate: null,
        applicationStart: null, applicationDeadline: null, sourceUrl: null };
      const current = source === "manual" ? undated : {
        ...undated, scheduleStatus: source === "tentative" ? "tentative" : "official", unannounced: false,
        datePrecision: "date", examDate: appointment, sourceUrl: base.registration.sourceUrl, applicationEstimated: true,
      };
      const previous = { ...undated, id: "previous", label: "2025年度第1回", fiscalYear: "2025",
        scheduleStatus: "official", unannounced: false, examDate: "2025-12-08", datePrecision: "date",
        applicationStart: "2025-11-19", applicationDeadline: "2025-11-25", sourceUrl: base.registration.sourceUrl };
      await page.setViewportSize({ width: 390, height: 844 });
      await page.emulateMedia({ reducedMotion: "reduce", colorScheme: "light" });
      await page.clock.setFixedTime(new Date(`${eve}T12:10:00+09:00`));
      await page.addInitScript(({ key, plan }) => {
        if (!localStorage.getItem(key)) localStorage.setItem(key, JSON.stringify([plan]));
      }, { key: LS_KEYS.pacePlans, plan });
      await page.route("**/api/billing/status", route => route.fulfill({ json: { entitled: false } }));
      await page.route("**/api/home/weather", route => route.fulfill({ json: { weather: "clear" } }));
      await page.route("**/api/study-plan/catalog/ip", route => route.fulfill({ json: { questions: catalog } }));
      let scheduleGate: Promise<void> | undefined;
      await page.route("**/api/exam-schedule/ip", async route => {
        await scheduleGate;
        const sessions = history === "with-history" ? [current, previous] : [current];
        await route.fulfill({ json: { exam: "ip", source: "tsugino", sessions } });
      });
      await page.goto("/");
      const hero = page.locator(".p3-home-scene");
      const calendar = hero.locator("[data-home-calendar]");
      const solved = hero.locator("[data-pace-track=progress] svg[role=group]");
      await expect(solved).toBeVisible();
      if (source === "manual" && history === "with-history") {
        await expect(calendar.getByRole("heading", { name: "試験まで（見込み） あと 11 日" })).toBeVisible();
      }
      await page.getByRole("button", { name: "計画の確認", exact: true }).click();
      await page.getByRole("dialog").getByRole("button", { name: "計画を変更", exact: true }).click();
      const dialog = page.getByRole("dialog");
      if (source === "manual") await dialog.locator('input[type="date"]').fill(appointment);
      else {
        await expect(dialog.locator('input[type="date"]')).toHaveCount(0);
        await expect(dialog.locator(`time[datetime="${appointment}"]`)).toBeVisible();
      }
      await dialog.getByRole("button", { name: "変更を保存" }).click();
      await expect(dialog).toHaveCount(0);
      expect(await page.evaluate(key => JSON.parse(localStorage.getItem(key)!)[0], LS_KEYS.pacePlans))
        .toMatchObject({ examDate: appointment, ...(source ? { examDateSource: source } : {}) });
      if (!source) expect(await page.evaluate(key => JSON.parse(localStorage.getItem(key)!)[0], LS_KEYS.pacePlans))
        .not.toHaveProperty("examDateSource");

      for (const [state, date, heading] of [
        ["eve", eve, eveHeading],
        ["today", appointment, todayHeading],
      ]) {
        await page.clock.setFixedTime(new Date(`${date}T12:10:00+09:00`));
        const gate = Promise.withResolvers<void>();
        scheduleGate = gate.promise;
        await page.reload({ waitUntil: "domcontentloaded" });
        let cls: number;
        try {
          await expect(hero.getByText("日程を読み込み中…")).toBeVisible();
          await expect(solved).toBeAttached();
          const shifts = await page.evaluateHandle(async () => {
            await document.fonts.ready;
            await new Promise(requestAnimationFrame);
            const entries: Array<PerformanceEntry & { value?: number; hadRecentInput?: boolean }> = [];
            const observer = new PerformanceObserver(list => entries.push(...list.getEntries()));
            observer.observe({ type: "layout-shift" });
            return { entries, observer };
          });
          gate.resolve();
          await expect(calendar.getByRole("heading", { name: heading, exact: true })).toBeVisible();
          await expect(calendar.locator("time").first()).toHaveAttribute("datetime", appointment);
          await expect(solved).toBeVisible();
          cls = await shifts.evaluate(async ({ entries, observer }) => {
            await new Promise(requestAnimationFrame);
            await new Promise(requestAnimationFrame);
            const all = [...entries, ...observer.takeRecords()] as typeof entries;
            observer.disconnect();
            return all.reduce((sum, entry) => sum + (entry.hadRecentInput ? 0 : entry.value ?? 0), 0);
          });
          await shifts.dispose();
        } finally {
          gate.resolve();
        }
        expect(cls).toBe(0);
        expect(await calendarContrast(calendar)).toBeGreaterThanOrEqual(4.5);
        await expect(calendar.locator(":scope > p")).toHaveCount(0);
        if (state === "eve") await expect(hero.getByText("1日の目安 200問正解")).toBeVisible();
        if (screenshotDir) await screenshotHero(hero, `${screenshotDir}/${image}-${state}-${history}-390.png`);
        await hero.getByRole("button", { name: "計画の確認" }).click();
        const details = (label: string) => dialog.locator("dl > div").filter({ has: page.getByText(label, { exact: true }) }).locator("dd");
        await expect(details("受験日")).toHaveText(appointment + (source === "tentative" ? "（予定）" : ""));
        await expect(details("申込開始")).toHaveText(history === "with-history" ? "11/19（木）（見込み）" : "未発表");
        await expect(details("申込締切")).toHaveText(history === "with-history" ? "11/25（水）（見込み）" : "未発表");
        if (screenshotDir) await page.screenshot({ path: `${screenshotDir}/${image}-${state}-${history}-detail-390.png`, animations: "disabled" });
      }
    });
  }
});
