import { test, expect, type APIResponse } from "@playwright/test";
import { AI_POLICY_VERSION } from "../../lib/ai/access-policy";

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

async function streamsUnderCiConfiguration(response: APIResponse) {
  if (process.env.AI_QUOTA_ROLLOUT === "true") {
    // This job deliberately runs without the credentials for guest identity and usage storage.
    expect(response.status()).toBe(503);
    expect(await response.json()).toMatchObject({ error: "ai_unavailable" });
    expect(response.headers()).toMatchObject({
      "x-ai-policy-version": AI_POLICY_VERSION,
      "x-ai-attempt": "not-started",
      "x-ai-quota-consumed": "0",
    });
    expect(response.headers()["x-provider"]).toBeUndefined();
    return false;
  }
  expect([200, 429]).toContain(response.status());
  return response.status() === 200;
}

test.describe("copilot API: basic contract", () => {
  test("POST /api/copilot respects the configured rollout and credentials", async ({ request }) => {
    const res = await request.post("/api/copilot", {
      headers: { "Content-Type": "application/json" },
      data: VALID_BODY,
    });
    if (await streamsUnderCiConfiguration(res)) expect((await res.text()).length).toBeGreaterThan(0);
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
    if (await streamsUnderCiConfiguration(res)) {
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
    if (await streamsUnderCiConfiguration(res)) {
      expect(res.headers()["x-ratelimit-limit"]).toBeUndefined();
      expect(res.headers()["x-ratelimit-remaining"]).toBeUndefined();
      expect(res.headers()["x-ratelimit-reset"]).toBeUndefined();
      expect(res.headers()["x-provider"]).toBeDefined();
    }
  });
});

test.describe("copilot UI: question page integration", () => {
  test("question page returns 200", async ({ request }) => {
    const res = await request.get(QUESTION);
    expect(res.status()).toBe(200);
  });

  test("question page offers AI follow-up without opening it by default", async ({ page }) => {
    await page.goto(QUESTION);
    await expect(page.locator("summary").filter({ hasText: /^AIに質問$/ })).toBeVisible();
    await expect(page.getByRole("textbox", { name: /^AIへの質問を入力/ })).toHaveCount(0);
  });

  test("keyboard opens the AI follow-up with input focus and a processing notice", async ({ page }) => {
    await page.goto(QUESTION);
    await page.locator("summary").filter({ hasText: /^AIに質問$/ }).press("Enter");
    const copilot = page.getByRole("region", { name: "この問題についてAIに質問", exact: true });
    await expect(copilot).toBeVisible();
    await expect(copilot.getByRole("textbox", { name: /^AIへの質問を入力/ })).toBeFocused();
    await expect(copilot.getByRole("button", { name: "送信", exact: true })).toBeDisabled();
    await expect(copilot.getByText("Google Geminiで処理します", { exact: false })).toBeVisible();
    await expect(copilot.getByRole("link", { name: "プライバシーポリシー" })).toHaveAttribute("href", "/privacy#2");
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
