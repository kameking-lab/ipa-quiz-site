import { test, expect } from "@playwright/test";

const SINGULAR_IDS = [
  "st-2024a-pm2-q1", "st-2024a-pm2-q2", "st-2023a-pm2-q1",
  "sa-2024a-pm2-q1", "sa-2024a-pm2-q2",
  "pm-2024a-pm2-q1", "pm-2024a-pm2-q2", "pm-2023a-pm2-q1",
  "sm-2024a-pm2-q1", "sm-2024a-pm2-q2", "au-2024a-pm2-q1", "au-2024a-pm2-q2",
] as const;
const SC_YEARS = [2023, 2024, 2025] as const;
const RETIRED_ROUTES = [
  ...SINGULAR_IDS.map(id => `/essay/${id.slice(0, 2)}/${id}`),
  ...SC_YEARS.map(year => `/essays/sc/${year}-spring/pm2/q1`),
];

// No remote target or existing developer server may receive these fixed POSTs.
test.beforeEach(({ baseURL }) => {
  expect(process.env.E2E_BASE_URL).toBeUndefined();
  expect(baseURL).toBe("http://127.0.0.1:3000");
  expect(process.env.CI, "Only the candidate-built CI webServer is an admitted target").toBe("true");
});

// Legacy selector interaction coverage remains in the component fixture suite;
// these public URLs must now expose no original question or answer material.
test.describe("retired original essay HTTP boundary", () => {
  for (const url of ["/essays/sc", ...RETIRED_ROUTES, "/essays/sc/2025-spring/pm2/q99", "/essays/sc/1999-spring/pm2/q1"]) {
    test(`${url} returns exact 404`, async ({ request }) => {
      expect((await request.get(url)).status()).toBe(404);
    });
  }
  for (const [url, text] of [["/essay", "現在、掲載できる論述問題はありません。"], ["/essays", "現在掲載できる答案サンプルはありません。"]] as const) {
    test(`${url} explains empty supply and retains home navigation`, async ({ page }) => {
      const res = await page.goto(url);
      expect(res?.status()).toBe(200);
      await expect(page.getByRole("main").getByRole("status").filter({ hasText: text })).toHaveText(text);
      await expect(page.locator('a[href^="/essay/"], a[href^="/essays/"]')).toHaveCount(0);
      await expect(page.getByRole("group", { name: "業種選択" })).toHaveCount(0);
      const home = page.getByRole("link", { name: "ホームから学習内容を選ぶ" });
      await home.focus();
      await expect(home).toBeFocused();
      await page.keyboard.press("Enter");
      await expect(page).toHaveURL(/\/$/);
    });
  }
  test("existing essay history remains reachable without writing an answer", async ({ page }) => {
    await page.goto("/essay");
    await expect(page.getByRole("link", { name: "これまでの採点履歴を見る" })).toHaveAttribute("href", "/account/essay-history");
  });
});

test("all retired IDs return real API 404 only after empty-supply GET preconditions", async ({ request }) => {
  // These GET checks must finish successfully before any POST can be attempted.
  for (const url of RETIRED_ROUTES) expect((await request.get(url)).status(), url).toBe(404);
  for (const [url, message] of [["/essay", "現在、掲載できる論述問題はありません。"], ["/essays", "現在掲載できる答案サンプルはありません。"]] as const) {
    const res = await request.get(url);
    expect(res.status()).toBe(200);
    expect(await res.text()).toContain(message);
  }
  const stats = await request.get("/api/stats/content-count");
  expect(stats.status()).toBe(200);
  const counts = await stats.json() as { essay: number; morning: number; byExam: { exam: string; morning: number; essay: number }[] };
  expect(counts.essay).toBe(0);
  for (const row of counts.byExam) expect(row.essay).toBe(0);
  const sc = counts.byExam.find(row => row.exam === "sc");
  expect(sc).toBeDefined();
  expect(sc!.morning).toBeGreaterThan(0);

  // Actual HTTP status/body; non-consumption is independently asserted by
  // unit spies and the fixed handler's lookup-before-usage/provider ordering.
  for (const questionId of [...SINGULAR_IDS, ...SC_YEARS.map(year => `sc-${year}h-pm2-q1`)]) {
    const res = await request.post("/api/essay-grade", {
      data: { questionId, industry: "it", answers: { ア: "境界検収用の固定入力。".repeat(12), イ: "", ウ: "" } },
    });
    expect(res.status(), questionId).toBe(404);
    const body = await res.json();
    expect(body.error).toBe("not_found");
    for (const key of ["rank", "passProbability", "subResults", "overallAdvice", "gradedAt"]) expect(body).not.toHaveProperty(key);
    expect(res.headers()["x-provider"]).toBeUndefined();
  }
});

test("normal SC morning entry remains available without answering", async ({ page }) => {
  expect((await page.goto("/sc"))?.status()).toBe(200);
  await expect(page.locator('a[href="/quiz?mode=random&exam=sc&session=am1"]').first()).toBeVisible();
  await expect(page.locator('a[href="/quiz?mode=random&exam=sc&session=am2"]').first()).toBeVisible();
});

test("retired pages preserve synthetic existing essay history and drafts", async ({ browser, baseURL }) => {
  // Only this new disposable CI context contains these non-personal records.
  const records = [
    { name: "ipa-quiz:essay-history:v1", value: JSON.stringify([{ id: "ci-preserved", questionId: "st-2024a-pm2-q1", exam: "st", industry: "it", rank: "B", passProbability: 0.6, totalScore: 70, gradedAt: "2024-04-01T00:00:00.000Z", submission: { ア: "固定ア", イ: "固定イ", ウ: "固定ウ" } }]) },
    { name: "ipa-quiz:essay-draft:st-2024a-pm2-q1", value: JSON.stringify({ industry: "it", ア: "固定下書き", イ: "", ウ: "", updatedAt: "2024-04-01T00:00:00.000Z" }) },
  ];
  const context = await browser.newContext({ baseURL, storageState: { cookies: [], origins: [{ origin: "http://127.0.0.1:3000", localStorage: [{ name: "ipa-quiz:onboarded:v1", value: "1" }, ...records] }] } });
  try {
    const page = await context.newPage();
    const gradingRequests: string[] = [];
    page.on("request", req => { if (req.method() === "POST" && /\/api\/(essay-grade|scoring)(?:\?|$)/.test(req.url())) gradingRequests.push(req.url()); });
    for (const [url, status] of [["/essay", 200], ["/essays", 200], ["/essay/st/st-2024a-pm2-q1", 404], ["/essays/sc/2025-spring/pm2/q1", 404]] as const) {
      expect((await page.goto(url))?.status()).toBe(status);
      const storage = (await context.storageState()).origins.find(origin => origin.origin === "http://127.0.0.1:3000")!.localStorage;
      for (const record of records) expect(storage.find(item => item.name === record.name)).toEqual(record);
    }
    expect(gradingRequests).toEqual([]);
  } finally {
    await context.close();
  }
});
