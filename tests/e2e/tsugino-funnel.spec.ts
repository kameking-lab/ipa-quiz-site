import { test, expect, type Page } from "@playwright/test";
import { createServer, type Server } from "node:http";
import { gunzipSync } from "node:zlib";
import { join } from "node:path";
import { writeFileSync } from "node:fs";

// Local Redis REST stand-in: the real question route, signed guest cookie and
// client run normally. No account, production DB, provider or remote KV is used.
let kv: Server;
test.beforeAll(async () => {
  const grants = new Map<string, Set<string>>();
  kv = createServer(async (request, response) => {
    let body = "";
    for await (const chunk of request) body += String(chunk);
    const args: string[] = JSON.parse(body);
    const ids = grants.get(args[4]) ?? new Set<string>();
    grants.set(args[4], ids);
    const id = args[7], limit = Number(args[9]);
    let result: { status: string; used: number };
    if (!ids.has(id) && ids.size >= limit) result = { status: "limit", used: ids.size };
    else { ids.add(id); result = { status: "ok", used: ids.size }; }
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ result: JSON.stringify(result) }));
  });
  await new Promise<void>(resolve => kv.listen(3375, "127.0.0.1", resolve));
});
test.afterAll(async () => { if (kv) await new Promise<void>((resolve, reject) => kv.close(error => error ? reject(error) : resolve())); });
test.describe.configure({ mode: "serial", timeout: 120_000 });
test.use({ navigationTimeout: 90_000, serviceWorkers: "block",
  // PostHog intentionally filters the HeadlessChrome bot user agent.
  userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36",
});
test.setTimeout(180_000);

interface Captured { event: string; properties: Record<string, unknown> }
async function isolateNetwork(page: Page): Promise<Captured[]> {
  const captured: Captured[] = [];
  // Exercise real human-traffic capture locally; the SDK also filters webdriver.
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "webdriver", { get: () => false });
    Object.defineProperty(navigator, "userAgentData", { get: () => undefined });
  });
  await page.route("**/*", async route => {
    const request = route.request();
    const url = new URL(request.url());
    if (["127.0.0.1", "localhost"].includes(url.hostname)) return route.continue();
    if (url.hostname === "us-assets.i.posthog.com") {
      if (url.pathname.endsWith("/config.js")) return route.fulfill({ status: 200, contentType: "application/javascript", body: "" });
      return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ supportedCompression: [], hasFeatureFlags: false }) });
    }
    if (url.hostname === "us.i.posthog.com") {
      const buffer = request.postDataBuffer();
      if (buffer) {
        try {
          let text = (buffer[0] === 0x1f && buffer[1] === 0x8b ? gunzipSync(buffer) : buffer).toString();
          if (text.startsWith("data=")) text = Buffer.from(new URLSearchParams(text).get("data")!, "base64").toString();
          const value = JSON.parse(text);
          for (const event of Array.isArray(value) ? value : [value]) if (typeof event.event === "string") captured.push(event);
        } catch { /* Non-event requests (flags/config) have no event payload. */ }
      }
      return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ featureFlags: {}, supportedCompression: [] }) });
    }
    // All other vendor scripts/requests are blocked before leaving the machine.
    return route.fulfill({ status: 200, contentType: request.resourceType() === "script" ? "application/javascript" : "application/json", body: "" });
  });
  return captured;
}
const utm = "utm_source=tsugino_shikaku&utm_medium=referral&utm_campaign=kakomon_crosslink&utm_content=kfun1.hero";
function screenshotPath(name: string) {
  return process.env.KFUN1_EVIDENCE_DIR ? join(process.env.KFUN1_EVIDENCE_DIR, name) : test.info().outputPath(name);
}

for (const width of [390, 1440]) {
  test(`anonymous native practice reaches question ten and the upgrade exit with attributed events (${width})`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const events = await isolateNetwork(page);
    await page.goto(`/fp3/2024-published?${utm}`);
    const welcome = page.getByRole("complementary", { name: "次の資格からお越しの方へ" });
    await expect(welcome).toBeVisible();
    await expect(page.getByRole("dialog")).toHaveCount(0);
    const start = welcome.getByRole("link", { name: "1問目から無料で解く" });
    const href = new URL((await start.getAttribute("href"))!, page.url());
    expect(href.searchParams.get("exam")).toBe("fp3");
    expect(href.searchParams.get("year")).toBe("2024");
    expect(href.searchParams.get("season")).toBe("published");
    await page.screenshot({ path: screenshotPath(`native-welcome-${width}.png`) });
    await start.click();
    await page.waitForURL(/\/quiz\?/);
    for (let index = 0; index < 10; index++) {
      await expect(page.getByRole("complementary", { name: "ログインなしの無料演習枠" })).toContainText(`今日あと${9 - index}問`, { timeout: 30_000 });
      await expect(page.getByRole("radio").first()).toBeEnabled();
      await page.getByRole("radio").first().click();
      await expect(page.getByRole("region", { name: /^(正解|不正解)の解説$/ })).toBeVisible();
      await page.getByRole("button", { name: "次の問題へ", exact: true }).click();
    }
    await expect(page.getByRole("heading", { name: "今日の無料演習はここまで" })).toBeVisible();
    await expect(page.getByRole("radiogroup")).toHaveCount(0);
    expect(new URL(page.url()).searchParams.get("year")).toBe("2024");
    await page.screenshot({ path: screenshotPath(`native-limit-${width}.png`) });
    await page.getByRole("link", { name: "有料にして続きを解く" }).click();
    await expect(page).toHaveURL(/\/billing/);
    await expect.poll(() => events.filter(event => event.event === "practice_upgrade_clicked").length).toBe(1);
    for (const name of ["referral_landed", "quiz_started", "practice_free_limit_reached", "practice_upgrade_clicked"]) {
      const milestones = events.filter(event => event.event === name);
      expect(milestones, name).toHaveLength(1);
      expect(milestones[0].properties.utm_content).toBe("kfun1.hero");
    }
    expect(events.some(event => event.event === "checkout_started")).toBe(false);
    expect(new Set(events.filter(event => event.properties.referral_id).map(event => event.properties.referral_id)).size).toBe(1);
    const funnel = ["referral_landed", "quiz_started", "practice_free_limit_reached", "practice_upgrade_clicked"];
    const indices = funnel.map(name => events.findIndex(event => event.event === name));
    expect(indices.every((index, position) => position === 0 || index > indices[position - 1])).toBe(true);
    if (process.env.KFUN1_EVIDENCE_DIR) writeFileSync(join(process.env.KFUN1_EVIDENCE_DIR, `native-funnel-${width}.json`), JSON.stringify({
      environment: "local mock KV; real guest API and PostHog SDK; all remote traffic intercepted",
      stages: funnel.map(name => ({ event: name, count: events.filter(event => event.event === name).length,
        utm_source: "tsugino_shikaku", utm_content: "kfun1.hero" })), same_referral: true,
    }, null, 2));
  });

  test(`subject/year referral starts the same public exam and keeps UTM (${width})`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const events = await isolateNetwork(page);
    await page.goto(`/e-learning/exams?group=lckohyo&subject=${encodeURIComponent("潜水士")}&year=2025&${utm}`);
    const welcome = page.getByRole("complementary", { name: "次の資格からお越しの方へ" });
    await expect(welcome).toBeVisible();
    const start = welcome.getByRole("link", { name: "1問目から無料で解く" });
    const href = await start.getAttribute("href");
    expect(href).toContain("2025");
    await page.screenshot({ path: screenshotPath(`library-welcome-${width}.png`) });
    await start.click();
    await page.waitForURL(url => url.pathname === new URL(href!, "http://localhost").pathname);
    await expect(page.getByRole("radio").first()).toBeVisible({ timeout: 30_000 });
    await expect.poll(() => events.some(event => event.event === "quiz_started" && event.properties.player === "exam_library")).toBe(true);
    const started = events.find(event => event.event === "quiz_started")!;
    expect(started.properties.exam).toBe("潜水士");
    expect(started.properties.year).toBe("2025");
    expect(started.properties.utm_source).toBe("tsugino_shikaku");
  });
}

test("legacy multi-subject redirect preserves the exact subject, year and UTM", async ({ page }) => {
  await isolateNetwork(page);
  await page.goto(`/e-learning/exams?group=emkohyo&subject=${encodeURIComponent("労働衛生一般")}&year=2026&${utm}`);
  const url = new URL(page.url());
  expect(url.pathname).toBe("/e-learning/exams/qualifications/sagyo-kankyo-sokuteishi");
  expect(url.searchParams.get("subject")).toBe("労働衛生一般");
  expect(url.searchParams.get("year")).toBe("2026");
  expect(url.searchParams.get("utm_content")).toBe("kfun1.hero");
  await expect(page.getByRole("heading", { name: "労働衛生一般", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "作業環境測定関係法令", exact: true })).toHaveCount(0);
  const absentYear = new URL(page.url());
  absentYear.searchParams.set("year", "2025");
  expect((await page.goto(absentYear.toString()))?.status()).toBe(404);
});

test("category starts and continues inside the selected category; dismissed welcome stays closed", async ({ page }) => {
  await isolateNetwork(page);
  const category = "ライフプランニングと資金計画";
  const path = `/fp3/topic/${encodeURIComponent(category)}?${utm}`;
  await page.goto(path);
  const welcome = page.getByRole("complementary", { name: "次の資格からお越しの方へ" });
  const href = new URL((await welcome.getByRole("link").getAttribute("href"))!, page.url());
  expect(href.searchParams.get("category")).toBe(category);
  await welcome.getByRole("link").click();
  await page.waitForURL(/\/quiz\?/);
  await expect(page.getByRole("radio").first()).toBeEnabled({ timeout: 30_000 });
  const responses: string[] = [];
  page.on("response", async response => {
    if (response.url().includes("/api/billing/question") && response.ok()) {
      const payload = await response.json();
      if (payload.question) responses.push(payload.question.category);
    }
  });
  await page.getByRole("radio").first().click();
  await page.getByRole("button", { name: "次の問題へ", exact: true }).click();
  await expect(page.getByRole("radio").first()).toBeEnabled();
  await expect.poll(() => responses.length).toBeGreaterThan(0);
  expect(responses.every(value => value === category)).toBe(true);
  await page.goto(path);
  await expect(page.getByRole("complementary", { name: "次の資格からお越しの方へ" })).toHaveCount(0);
});

test("GSC entry URLs retain their status and canonical", async ({ page }) => {
  await isolateNetwork(page);
  for (const path of ["/sc", "/nw", "/st", "/sa", "/ap", "/blog/it-shikaku-rirekisho-kakikata", "/blog/ipa-shiken-fukusuu-kubun-juken", "/blog/koudo-gozen1-taisaku", "/blog/nw-gogo-jikan-haibun"]) {
    const response = await page.goto(path);
    expect(response?.status(), path).toBe(200);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://www.kakomon-ai.jp${path}`);
    await expect(page.getByRole("complementary", { name: "次の資格からお越しの方へ" })).toHaveCount(0);
  }
});
