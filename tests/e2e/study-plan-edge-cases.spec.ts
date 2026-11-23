import { expect, test, type Page } from "@playwright/test";
import { createPacePlan, type PacePlan } from "../../lib/study-plan/pace";
import { LS_KEYS } from "../../lib/storage/keys";

const today = "2026-11-17";
const catalog = Array.from({ length: 200 }, (_, i) => ({ id: `ip-2026h-am-q${i + 1}`, exam: "ip", year: 2026,
  season: "spring", session: "am", qNumber: i + 1 }));
const makePlan = () => createPacePlan({ id: "edge-plan", exam: "ip", sessionId: null,
  startDate: "2026-11-07", examDate: "2026-11-27" }, catalog, "2026-11-07T12:00:00+09:00");

async function setup(page: Page, plan?: PacePlan, count = 0) {
  await page.clock.setFixedTime(new Date(`${today}T12:00:00+09:00`));
  await page.route("https://**", r => r.abort());
  await page.route("**/api/billing/status", r => r.fulfill({ json: { entitled: false } }));
  await page.route("**/api/study-plan/catalog/ip", r => r.fulfill({ json: { questions: catalog } }));
  await page.addInitScript(({ keys, plan, catalog, count }) => {
    localStorage.setItem("ipa-quiz:onboarded:v1", "1");
    if (plan) localStorage.setItem(keys.pacePlans, JSON.stringify([plan]));
    localStorage.setItem(keys.history, JSON.stringify({ entries: catalog.slice(0, count).map(q => ({
      id: q.id, correct: true, selected: "ア", at: Date.parse("2026-11-16T12:00:00+09:00"),
    })), starredIds: [] }));
  }, { keys: LS_KEYS, plan, catalog, count });
}

test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, serviceWorkers: "block" });

test("a saved plan without an appointment shows no invented target or paid nudge", async ({ page }) => {
  await setup(page, { ...makePlan(), examDate: null });
  await page.goto("/");
  await expect(page.getByRole("img", { name: "正解済み 0 / 200問" })).toBeVisible();
  await expect(page.getByText(/^1回の目安/)).toHaveCount(0);
  await expect(page.getByRole("link", { name: "計画の問題を解く" })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "自分の受験日を設定" })).toBeVisible();
  await expect(page.getByRole("link", { name: /回数無制限で追いつけます/ })).toHaveCount(0);
});

for (const [result, label] of [["failed", "不合格"], ["absent", "受けなかった"]] as const) {
  test(`a past exam records ${result} and offers the next plan`, async ({ page }) => {
    await setup(page, { ...makePlan(), examDate: "2026-11-16" });
    await page.route("**/api/exam-schedule/ip", route => route.fulfill({ json: { exam: "ip", source: "tsugino", sessions: [{
      id: "retry-fixture", label: "次回の日程", qualificationId: "itpassport", scheduleStatus: "official",
      examDate: "2026-12-20", examDateEnd: null, examPhaseWindows: [], datePrecision: "date",
      applicationStart: null, applicationDeadline: null, resultDate: null, sourceUrl: "https://www.ipa.go.jp/shiken/",
    }] } }));
    await page.goto("/");
    await page.getByRole("button", { name: label, exact: true }).click();
    expect(await page.evaluate(key => JSON.parse(localStorage.getItem(key)!)[0].result, LS_KEYS.pacePlans)).toBe(result);
    await expect(page.getByRole("link", { name: /計画の問題を解く/ })).toHaveCount(0);
    await page.getByRole("button", { name: "次回日程で計画を作り直す", exact: true }).click();
    const sheet = page.getByRole("dialog", { name: "学習計画を作る" });
    await expect(sheet.getByRole("combobox", { name: "受ける資格" })).toHaveValue("ip");
    await expect(sheet.locator("time")).toHaveText("2026-12-20");
  });
}

for (const percent of [0, 50, 100]) {
  test(`track at ${percent}% keeps the flag and dog inside the track`, async ({ page }) => {
    const plan = makePlan();
    await setup(page, plan, percent * 2);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const track = page.getByRole("img", { name: `正解済み ${percent * 2} / 200問` });
    await expect(track).toBeVisible();
    for (const width of [320, 390, 1280]) {
      await page.setViewportSize({ width, height: 844 });
      const geometry = await track.evaluate(el => {
        const image = el.querySelector("image")!, flag = el.querySelector<SVGPathElement>('path.p3-trail-flag')!;
        const frame = image.closest("svg")!, runner = frame.closest<SVGGElement>("g")!;
        const position = runner.transform.baseVal.getItem(0).matrix;
        const viewport = runner.ownerSVGElement!.viewBox.baseVal;
        const frameLeft = position.e + frame.x.baseVal.value;
        const flagBox = flag.getBBox();
        return { dogCenter: position.e,
          flagX: Number(flag.getAttribute("d")!.match(/^M([\d.]+)/)![1]),
          inside: frameLeft >= viewport.x && frameLeft + frame.width.baseVal.value <= viewport.x + viewport.width
            && flagBox.x + flagBox.width <= viewport.x + viewport.width,
          dogInFront: !!(flag.compareDocumentPosition(runner) & Node.DOCUMENT_POSITION_FOLLOWING),
          spriteOffset: image.getAttribute("x") };
      });
      expect(geometry.dogCenter).toBeCloseTo(39 + percent * 2.44);
      expect(geometry.flagX).toBeCloseTo(294);
      expect(geometry.inside).toBe(true);
      expect(geometry.dogInFront).toBe(true);
      expect(geometry.spriteOffset).toBe("0");
    }
    await page.setViewportSize({ width: 320, height: 844 });
    const labelSizes = await track.locator("text").evaluateAll(labels => labels.map(label =>
      parseFloat(getComputedStyle(label).fontSize) * (label as SVGTextElement).getScreenCTM()!.a));
    expect(Math.min(...labelSizes)).toBeGreaterThanOrEqual(12);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}

for (const suspension of ["hidden", "offscreen"] as const) {
  test(`the new runner cycles through poses and settles when ${suspension}`, async ({ page }) => {
    await setup(page, makePlan(), 100);
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.addInitScript(mode => {
      const poses = new Set<number>();
      const observer = new MutationObserver(() => {
        const image = document.querySelector('[data-pace-sprite="v2"][data-pace-running] image');
        if (!image) return;
        observer.disconnect();
        function observePose() {
          if (!image?.closest("[data-pace-running]")) return;
          const transform = getComputedStyle(image).transform;
          if (transform !== "none") poses.add(new DOMMatrixReadOnly(transform).m41);
          if (poses.size < 3) {
            requestAnimationFrame(observePose);
            return;
          }
          document.documentElement.dataset.runnerAnimated = String([...poses].every(x => x % 72 === 0));
          if (mode === "hidden") {
            Object.defineProperty(document, "hidden", { value: true, configurable: true });
            document.dispatchEvent(new Event("visibilitychange"));
          } else {
            // Keep the scroll target below the whole track even on a short home page.
            document.body.style.paddingBottom = "100vh";
            window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "instant" });
          }
        }
        requestAnimationFrame(observePose);
      });
      observer.observe(document, { attributes: true, subtree: true, attributeFilter: ["data-pace-running"] });
    }, suspension);
    await page.goto("/");
    const track = page.getByRole("img", { name: "正解済み 100 / 200問" });
    await expect(track.locator("image")).toHaveAttribute("href", "/images/home/pace-run/v2/ip.webp");
    await expect(page.locator("html")).toHaveAttribute("data-runner-animated", "true");
    if (suspension === "offscreen") await expect(track).not.toBeInViewport();
    await expect(track.locator("image")).toHaveCSS("transform", "none");
    await expect(track.locator("line.p3-trail-progress")).toHaveAttribute("x2", "161");
  });
}

test("idle refresh does not change mastery or learning points, failed confirmation lowers mastery", async ({ page }) => {
  await setup(page, makePlan(), 100);
  await page.clock.install({ time: new Date(`${today}T12:00:00+09:00`) });
  await page.goto("/");
  await expect(page.getByRole("img", { name: "正解済み 100 / 200問" })).toBeVisible();
  const before = await page.evaluate(key => localStorage.getItem(key), LS_KEYS.learningPoints);
  await page.clock.fastForward("01:00:00");
  await expect(page.getByRole("img", { name: "正解済み 100 / 200問" })).toBeVisible();
  expect(await page.evaluate(key => localStorage.getItem(key), LS_KEYS.learningPoints)).toBe(before);
  await page.evaluate(({ key, id }) => {
    const state = JSON.parse(localStorage.getItem(key)!);
    state.entries.push({ id, correct: false, at: Date.now() });
    localStorage.setItem(key, JSON.stringify(state));
    window.dispatchEvent(new Event("study-plan:changed"));
  }, { key: LS_KEYS.history, id: catalog[0].id });
  await expect(page.getByRole("img", { name: "正解済み 99 / 200問" })).toBeVisible();
  await expect.poll(async () => Number(await page.locator('svg line.stroke-primary').getAttribute("x2"))).toBeCloseTo(159.78);
});

for (const source of ["failure", "manual", "fallback", "ondemand", "past-only"] as const) {
  test(`create plan with ${source} schedule keeps manual/appointment fallback usable`, async ({ page }) => {
    await setup(page);
    await page.route("**/api/exam-schedule/ip", r => source === "failure" ? r.fulfill({ status: 503, json: {} }) : r.fulfill({ json: {
      exam: "ip", source: source === "fallback" ? "fallback" : source === "manual" ? "manual" : "tsugino",
      sessions: source === "manual" ? [] : [{ id: "session", label: source === "ondemand" ? "随時受験" : "次回",
        scheduleStatus: source === "ondemand" ? "ondemand" : "official", examDate: source === "fallback" ? "2026-12-20" : source === "past-only" ? "2026-11-16" : null,
        applicationStart: null, applicationDeadline: null, examDateEnd: null, resultDate: null,
        sourceUrl: "https://www.ipa.go.jp/shiken/", examPhaseWindows: [] }],
    } }));
    await page.goto("/study-plan");
    const save = page.getByRole("button", { name: "この計画で始める" });
    await expect(page.getByRole("region", { name: "学習計画を作る" })).toBeVisible();
    await page.getByRole("combobox", { name: "受ける資格" }).selectOption("ip");
    if (source === "failure") await expect(page.getByText(/日程を取得できませんでした/)).toBeVisible();
    if (source !== "fallback") {
      await expect(save).toBeDisabled();
      await page.getByLabel(source === "ondemand" ? "予約した日・受けたい日" : "受験日", { exact: true }).fill("2026-12-20");
    }
    await expect(save).toBeEnabled();
    await save.click();
    await expect(page.getByRole("link", { name: /計画の問題を解く/ })).toBeVisible();
    await expect(page.getByRole("button", { name: "カレンダーに追加（.ics）" })).toBeVisible();
    await expect(page.getByRole("button", { name: /申込締切/ })).toHaveCount(0);
    expect(await page.evaluate(key => JSON.parse(localStorage.getItem(key)!)[0].examDate, LS_KEYS.pacePlans)).toBe("2026-12-20");
  });
}

test("iOS WebView safe areas keep the create sheet and date field usable", async ({ page }) => {
  await setup(page);
  await page.addInitScript(() => {
    document.addEventListener("DOMContentLoaded", () => {
      document.documentElement.classList.add("native-app");
      document.documentElement.style.setProperty("--native-safe-top", "59px");
      document.documentElement.style.setProperty("--native-safe-bottom", "34px");
    });
  });
  await page.route("**/api/exam-schedule/ip", r => r.fulfill({ json: { exam: "ip", source: "manual", sessions: [] } }));
  await page.goto("/");
  await page.getByRole("button", { name: "学習計画を作る" }).first().click();
  await page.getByRole("combobox", { name: "受ける資格" }).selectOption("ip");
  const input = page.getByLabel("受験日", { exact: true });
  await expect(input).toBeVisible();
  await input.fill("2026-12-20");
  expect(await input.evaluate(el => Number.parseFloat(getComputedStyle(el).fontSize))).toBeGreaterThanOrEqual(16);
  const dialog = page.getByRole("dialog");
  expect(await dialog.evaluate(el => Number.parseFloat(getComputedStyle(el).paddingBottom))).toBeGreaterThanOrEqual(34);
  const save = page.getByRole("button", { name: "この計画で始める" });
  await save.scrollIntoViewIfNeeded();
  const box = (await save.boundingBox())!;
  expect(box.y + box.height).toBeLessThanOrEqual(844 - 34);
  expect((await dialog.boundingBox())!.y).toBeGreaterThanOrEqual(59);
  await save.click();
  await expect(page.getByRole("link", { name: /計画の問題を解く/ })).toBeVisible();
});

for (const native of [false, true]) {
  test(`today's eleventh question preserves the existing ${native ? "App Store" : "web"} monthly offer`, async ({ page }) => {
    await setup(page, { ...makePlan(), examDate: "2026-11-20" });
    await page.addInitScript(({ historyKey, native }) => {
      localStorage.setItem(historyKey, JSON.stringify({ entries: Array.from({ length: 10 }, (_, i) => ({
        id: `ap-other-${i}`, correct: false, at: Date.now() - i * 1000,
      })), starredIds: [] }));
      if (native) document.addEventListener("DOMContentLoaded", () => document.documentElement.classList.add("native-app"));
    }, { historyKey: LS_KEYS.history, native });
    if (process.env.MZ3_LOCAL_GATE !== "1") await page.route("**/quiz/today?**", async route => {
      if (route.request().resourceType() !== "document") return route.continue();
      const response = await route.fetch(), html = await response.text();
      const marker = 'billingGateEnabled\\":false';
      expect(html).toContain(marker);
      await route.fulfill({ response, body: html.replaceAll(marker, marker.replace("false", "true")) });
    });
    let grants = 0;
    let restored = false;
    await page.route("**/api/billing/question", r => {
      grants++;
      const access = { kind: restored ? "pass" : "guest", remaining: restored ? null : 0, freeDaily: 10,
        resetAt: "2026-11-18T00:00:00+09:00", retryAfter: null };
      if (!restored) return r.fulfill({ status: 429, json: { error: "daily_limit", access } });
      const { id } = r.request().postDataJSON() as { id: string };
      return r.fulfill({ json: { access, question: { id, exam: "ip", year: 2026,
        season: "spring", session: "am", qNumber: 1, type: "multiple-choice", difficulty: 1, category: "テクノロジ系",
        topicTags: [], question: "復元後の確認問題", choices: { ア: "選択肢A", イ: "選択肢B", ウ: "選択肢C", エ: "選択肢D" },
        answer: "ア", explanation: "動作確認用の解説", sourcePdfUrl: "https://www.ipa.go.jp/shiken/", license: "IPA-public" } } });
    });
    await page.goto("/quiz/today?plan=edge-plan");
    await expect(page.getByRole("heading", { name: "今日の無料10問はここまで" })).toBeVisible();
    await expect(page.getByRole("link", { name: "月額プランに申し込む", exact: true })).toHaveAttribute("href", /returnTo=/);
    await expect(page.getByRole("radio")).toHaveCount(0);
    expect(grants).toBeGreaterThan(0);
    await expect(page.getByText("月額プランは演習回数無制限。", { exact: true })).toBeVisible();
    await expect(page.getByText(/初回7日間無料/)).toBeVisible({ visible: !native });
    restored = true;
    await page.evaluate(() => window.dispatchEvent(new Event("mobile:entitlement-changed")));
    await expect(page.getByRole("radio").first()).toBeVisible();
    await expect(page.getByRole("heading", { name: "今日の無料10問はここまで" })).toHaveCount(0);
  });
}
