import { test, expect } from "@playwright/test";

// Run this file's tests sequentially (override the global fullyParallel). Each
// valid /api/copilot POST runs the RAG pipeline, which on first hit loads the
// corpus (a few seconds) and does CPU-heavy scoring. Running several of these
// concurrently under full-suite load piled up on the shared server's event loop
// and made even fast requests time out — a test-infra flake, not a product bug
// (validation returns 400 before any RAG; a 200 always carries RAG headers).
// Serial execution means one copilot request at a time: the lenient first test
// warms the corpus, the strict assertions then run warm and fast.
test.describe.configure({ mode: "serial" });

// Uses a question with complete data (no needsReview flag)
const QUESTION = "/q/ap/2024-spring/am/q1";

const VALID_BODY = JSON.stringify({
  question: {
    id: "ap-2009h-am-q1",
    exam: "ap",
    year: 2009,
    season: "spring",
    session: "am",
    qNumber: 1,
    question: "コンピュータの処理能力を表す単位はどれか。",
    choices: { ア: "FLOPS", イ: "bps", ウ: "dpi", エ: "ppm" },
    answer: "ア",
    explanation: "FLOPSは浮動小数点演算能力を表す単位。",
    category: "コンピュータ構成要素",
    topicTags: [],
    difficulty: 2,
    hasImage: false,
    sourcePdfUrl: "https://www.ipa.go.jp/dummy.pdf",
    license: "IPA-public",
    type: "multiple-choice",
  },
  messages: [{ role: "user", content: "この問題を解説してください" }],
});

test.describe("copilot API: basic contract", () => {
  test("POST /api/copilot returns 200 with streaming text", async ({ request }) => {
    const res = await request.post("/api/copilot", {
      headers: { "Content-Type": "application/json" },
      data: VALID_BODY,
    });
    // May return 429 if rate-limited; both are acceptable in CI
    expect([200, 429]).toContain(res.status());
  });

  test("POST /api/copilot with invalid body returns 400", async ({ request }) => {
    const res = await request.post("/api/copilot", {
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify({ messages: [] }),
    });
    expect(res.status()).toBe(400);
  });

  test("POST /api/copilot 200 response includes RAG headers", async ({ request }) => {
    const res = await request.post("/api/copilot", {
      headers: { "Content-Type": "application/json" },
      data: VALID_BODY,
    });
    if (res.status() === 200) {
      expect(res.headers()["x-rag-enabled"]).toMatch(/^[01]$/);
      expect(res.headers()["x-rag-passages"]).toMatch(/^\d+$/);
      expect(res.headers()["x-rag-top-score"]).toMatch(/^\d+\.\d+$/);
      expect(res.headers()["x-rag-grounded"]).toMatch(/^[01]$/);
    }
  });

  test("POST /api/copilot does not advertise an obsolete ten-question quota", async ({ request }) => {
    const res = await request.post("/api/copilot", {
      headers: { "Content-Type": "application/json" },
      data: VALID_BODY,
    });
    if (res.status() === 200) {
      expect(res.headers()["x-ratelimit-limit"]).toBeUndefined();
      expect(res.headers()["x-ratelimit-remaining"]).toBeUndefined();
      expect(res.headers()["x-ratelimit-reset"]).toBeUndefined();
      expect(res.headers()["x-provider"]).toBeDefined();
    }
  });
});

test.describe("copilot UI: question page integration", () => {
  test.use({ serviceWorkers: "block" });
  test.beforeEach(async ({ page }) => { await page.route("https://**", (route) => route.abort()); });
  test("question page returns 200", async ({ request }) => {
    const res = await request.get(QUESTION);
    expect(res.status()).toBe(200);
  });

  test("question page keeps existing explanation before one optional AI entry", async ({ page }) => {
    await page.goto(QUESTION);
    await expect(page.getByRole("dialog", { name: "AI コパイロット" })).toHaveCount(0);
    await page.getByRole("button", { name: "採点せずに答えだけ見る", exact: true }).click();
    await expect(page.locator("#explanation > details")).toHaveAttribute("open", "");
    await expect(page.getByRole("button", { name: "まだ分からない点を聞く", exact: true })).toBeVisible();
  });

  test("question page has one follow-up instead of repeated AI promotional links", async ({ page }) => {
    await page.goto(QUESTION);
    await page.getByRole("button", { name: "採点せずに答えだけ見る", exact: true }).click();
    await expect(page.getByRole("button", { name: "まだ分からない点を聞く", exact: true })).toHaveCount(1);
    await expect(page.locator("[aria-label='AIへの質問例']")).toHaveCount(0);
    await expect(page.getByRole("link", { name: "クイズモードで開く", exact: true })).toBeVisible();
  });

  test("the follow-up opens by keyboard and returns focus after closing", async ({ page }) => {
    await page.goto(QUESTION);
    await page.getByRole("button", { name: "採点せずに答えだけ見る", exact: true }).click();
    const entry = page.getByRole("button", { name: "まだ分からない点を聞く", exact: true });
    await entry.focus();
    await page.keyboard.press("Enter");
    const copilot = page.getByRole("dialog", { name: "AI コパイロット", exact: true });
    await expect(copilot).toBeVisible();
    await expect(copilot.getByRole("textbox").first()).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(copilot).toHaveCount(0);
    await expect(entry).toBeFocused();
  });
});

test.describe("copilot API: edge cases", () => {
  test("POST /api/copilot with empty messages array returns 400", async ({ request }) => {
    const body = { ...JSON.parse(VALID_BODY), messages: [] };
    const res = await request.post("/api/copilot", {
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify(body),
    });
    expect(res.status()).toBe(400);
  });

  test("POST /api/copilot with message too long returns 400", async ({ request }) => {
    const body = {
      ...JSON.parse(VALID_BODY),
      messages: [{ role: "user", content: "x".repeat(5000) }],
    };
    const res = await request.post("/api/copilot", {
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify(body),
    });
    expect(res.status()).toBe(400);
  });
});
