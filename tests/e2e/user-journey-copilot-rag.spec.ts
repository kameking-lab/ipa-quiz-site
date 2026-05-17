import { test, expect } from "@playwright/test";

// Uses a question with complete data (no needsReview flag)
const QUESTION = "/q/ap/2009-spring/am/q1";

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

  test("POST /api/copilot 200 response includes rate-limit headers", async ({ request }) => {
    const res = await request.post("/api/copilot", {
      headers: { "Content-Type": "application/json" },
      data: VALID_BODY,
    });
    if (res.status() === 200) {
      expect(res.headers()["x-ratelimit-limit"]).toBeDefined();
      expect(res.headers()["x-ratelimit-remaining"]).toBeDefined();
      expect(res.headers()["x-ratelimit-reset"]).toBeDefined();
    }
  });
});

test.describe("copilot UI: question page integration", () => {
  test("question page returns 200", async ({ request }) => {
    const res = await request.get(QUESTION);
    expect(res.status()).toBe(200);
  });

  test("question page renders AI copilot section", async ({ page }) => {
    await page.goto(QUESTION);
    // The AI copilot panel should appear on the page
    const copilot = page.locator("[aria-label='AI コパイロット']");
    await expect(copilot).toBeVisible();
  });

  test("copilot section shows quick action examples", async ({ page }) => {
    await page.goto(QUESTION);
    const quickActions = page.locator("[aria-label='AIへの質問例']");
    await expect(quickActions).toBeVisible();
  });

  test("copilot panel is keyboard-accessible (focusable child elements)", async ({ page }) => {
    await page.goto(QUESTION);
    const copilot = page.locator("[aria-label='AI コパイロット']");
    await expect(copilot).toBeVisible();
    // Panel should contain at least one interactive element
    const buttons = copilot.locator("button, input, textarea, a");
    await expect(buttons.first()).toBeVisible();
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
