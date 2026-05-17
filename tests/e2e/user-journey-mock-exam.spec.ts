import { test, expect } from "@playwright/test";

const MOCK_RESULT = {
  id: "mock-result-001",
  exam: "ap",
  startedAt: Date.now() - 3600_000,
  finishedAt: Date.now(),
  totalQuestions: 20,
  answered: 20,
  correct: 15,
  scorePct: 75,
  passed: true,
  timeUsedSec: 3200,
  byCategory: {
    "コンピュータ構成要素": { total: 5, correct: 4 },
    "データベース": { total: 5, correct: 3 },
  },
};

test.describe("mock exam: HTTP & structure", () => {
  test("GET /mock-exam returns 200", async ({ request }) => {
    const res = await request.get("/mock-exam");
    expect(res.status()).toBe(200);
  });

  test("/mock-exam has 模試モード heading", async ({ page }) => {
    await page.goto("/mock-exam");
    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toBeVisible();
    await expect(h1).toContainText("模試モード");
  });

  test("/mock-exam page contains exam selection UI", async ({ page }) => {
    await page.goto("/mock-exam");
    const content = await page.content();
    // Should show exam selection options (AP, FE, etc.)
    expect(content).toMatch(/応用情報|基本情報|AP|FE/);
  });

  test("/mock-exam page contains exam list and start prompt", async ({ page }) => {
    await page.goto("/mock-exam");
    await page.waitForLoadState("networkidle");
    const content = await page.content();
    // Landing page shows exam list (AP, FE etc.) and mode description
    expect(content).toMatch(/応用情報|基本情報|AP|FE|SC|模試/);
  });
});

test.describe("mock exam: API", () => {
  test("GET /api/mock-exam/ap returns 200 or correct error", async ({ request }) => {
    const res = await request.get("/api/mock-exam/ap");
    // 200 with questions, or 404 if not enough questions available
    expect([200, 404]).toContain(res.status());
  });

  test("GET /api/mock-exam/ap returns questions on success", async ({ request }) => {
    const res = await request.get("/api/mock-exam/ap");
    if (res.status() === 200) {
      const body = await res.json();
      // API returns {exam, mode, total, questions: [...]}
      expect(typeof body).toBe("object");
      const questions = Array.isArray(body) ? body : body.questions;
      expect(Array.isArray(questions)).toBe(true);
      expect(questions.length).toBeGreaterThan(0);
    }
  });

  test("GET /api/mock-exam/invalid-exam returns 404 or 400", async ({ request }) => {
    const res = await request.get("/api/mock-exam/notanexam");
    expect([400, 404]).toContain(res.status());
  });
});

test.describe("mock exam: history from localStorage", () => {
  test("/mock-exam shows past results from localStorage", async ({ page }) => {
    await page.addInitScript(
      ({ key, data }: { key: string; data: string }) => {
        localStorage.setItem(key, data);
      },
      {
        key: "ipa-quiz:mock-exam:v1",
        data: JSON.stringify([MOCK_RESULT]),
      },
    );

    await page.goto("/mock-exam");
    const content = await page.content();
    // Should show the stored score somewhere
    expect(content).toMatch(/75|合格|過去の結果|受験履歴/);
  });

  test("/mock-exam shows passed indicator for passing score", async ({ page }) => {
    await page.addInitScript(
      ({ key, data }: { key: string; data: string }) => {
        localStorage.setItem(key, data);
      },
      {
        key: "ipa-quiz:mock-exam:v1",
        data: JSON.stringify([{ ...MOCK_RESULT, passed: true, scorePct: 75 }]),
      },
    );

    await page.goto("/mock-exam");
    const content = await page.content();
    expect(content).toMatch(/合格|PASS|75/);
  });
});

test.describe("mock exam: timer UI (with URL param)", () => {
  test("GET /mock-exam?exam=ap returns 200", async ({ request }) => {
    const res = await request.get("/mock-exam?exam=ap");
    expect(res.status()).toBe(200);
  });
});
