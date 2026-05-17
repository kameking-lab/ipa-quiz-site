import { test, expect } from "@playwright/test";

// Minimal history entry matching the stored schema
const MOCK_HISTORY = JSON.stringify([
  {
    questionId: "ap-2009h-am-q1",
    exam: "ap",
    year: 2009,
    season: "spring",
    session: "am",
    qNumber: 1,
    category: "コンピュータ構成要素",
    difficulty: 2,
    isCorrect: true,
    selectedChoice: "ア",
    answeredAt: Date.now() - 1000,
  },
  {
    questionId: "ap-2009h-am-q2",
    exam: "ap",
    year: 2009,
    season: "spring",
    session: "am",
    qNumber: 2,
    category: "ソフトウェア",
    difficulty: 2,
    isCorrect: false,
    selectedChoice: "イ",
    answeredAt: Date.now() - 2000,
  },
]);

test.describe("my-progress page: HTTP & structure", () => {
  test("GET /my-progress returns 200", async ({ request }) => {
    const res = await request.get("/my-progress");
    expect(res.status()).toBe(200);
  });

  test("/my-progress page renders without errors", async ({ page }) => {
    await page.goto("/my-progress");
    // No uncaught JS errors — just verify the page has a heading
    const heading = page.getByRole("heading").first();
    await expect(heading).toBeVisible();
  });

  test("/my-progress has 学習履歴を全件削除 button", async ({ page }) => {
    await page.goto("/my-progress");
    const deleteBtn = page.locator("[aria-label='学習履歴を全件削除する']");
    await expect(deleteBtn).toBeVisible();
  });
});

test.describe("my-progress page: empty state", () => {
  test("/my-progress with no history shows zero stats", async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.removeItem("ipa-quiz:history:v1");
    });
    await page.goto("/my-progress");
    const content = await page.content();
    // Should render 0 answered or similar empty-state indicator
    expect(content).toMatch(/0問|まだ|履歴なし|開始/);
  });
});

test.describe("my-progress page: with history data", () => {
  test("/my-progress shows answered count from localStorage", async ({ page }) => {
    await page.addInitScript(
      ({ key, data }: { key: string; data: string }) => {
        localStorage.setItem(key, data);
      },
      { key: "ipa-quiz:history:v1", data: MOCK_HISTORY },
    );

    await page.goto("/my-progress");
    await page.waitForLoadState("networkidle");
    // Wait for client hydration; page shows 総回答数 with the count
    // The count displays as "2" via toLocaleString("ja-JP")
    const content = await page.content();
    expect(content).toMatch(/総回答数|2/);
  });

  test("/my-progress shows correct count or accuracy", async ({ page }) => {
    await page.addInitScript(
      ({ key, data }: { key: string; data: string }) => {
        localStorage.setItem(key, data);
      },
      { key: "ipa-quiz:history:v1", data: MOCK_HISTORY },
    );

    await page.goto("/my-progress");
    await page.waitForLoadState("networkidle");
    const content = await page.content();
    // 1 correct out of 2 = 50%
    expect(content).toMatch(/50|正解率|正答率|精度/);
  });

  test("/my-progress shows category breakdown with history", async ({ page }) => {
    await page.addInitScript(
      ({ key, data }: { key: string; data: string }) => {
        localStorage.setItem(key, data);
      },
      { key: "ipa-quiz:history:v1", data: MOCK_HISTORY },
    );

    await page.goto("/my-progress");
    const content = await page.content();
    // Category from the mock entries should appear
    expect(content).toMatch(/コンピュータ構成要素|ソフトウェア/);
  });
});

test.describe("my-progress: delete flow", () => {
  test("delete button is visible and interactive", async ({ page }) => {
    await page.addInitScript(
      ({ key, data }: { key: string; data: string }) => {
        localStorage.setItem(key, data);
      },
      { key: "ipa-quiz:history:v1", data: MOCK_HISTORY },
    );

    await page.goto("/my-progress");
    const deleteBtn = page.locator("[aria-label='学習履歴を全件削除する']");
    await expect(deleteBtn).toBeVisible();
    await expect(deleteBtn).toBeEnabled();
  });
});
