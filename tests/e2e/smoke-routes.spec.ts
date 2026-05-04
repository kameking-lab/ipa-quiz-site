import { test, expect } from "@playwright/test";

// 意図的 404 ルート一覧。lib/seo/expected-404.ts と完全一致させる。
// Playwright テストでは @/ alias を使わない方針のため、ここでも定義をインライン化している。
const INTENTIONAL_404_ROUTES = [
  "/pricing",
  "/commerce",
  "/tokutei",
  "/checkout",
] as const;

// 必須 200 ルート（15）：トップ・ナビゲーション系の基本ページ
const REQUIRED_200_ROUTES = [
  "/",
  "/about",
  "/faq",
  "/privacy",
  "/terms",
  "/operator",
  "/settings",
  "/modes/year",
  "/modes/topic",
  "/referral",
  "/transparency",
  "/review",
  "/recommended-books",
  "/robots.txt",
  "/sitemap.xml",
] as const;

// 試験区分 13：/[exam]
const EXAM_CODES = [
  "ip", "sg", "fe", "ap", "sc", "nw", "db",
  "es", "st", "sa", "pm", "sm", "au",
] as const;

// 書籍 13：/recommended-books/[exam]
const BOOK_ROUTES = EXAM_CODES.map((c) => `/recommended-books/${c}`);
const EXAM_ROUTES = EXAM_CODES.map((c) => `/${c}`);

// （意図的 404 ルートは上で定義済み）

test.describe("smoke: 45 routes", () => {
  test(`必須 200 ルートが ${REQUIRED_200_ROUTES.length} 件すべて 200`, async ({ request }) => {
    expect(REQUIRED_200_ROUTES.length).toBe(15);
    for (const path of REQUIRED_200_ROUTES) {
      const res = await request.get(path);
      expect(res.status(), `${path} が 200 を返さない`).toBe(200);
    }
  });

  test(`試験区分 ${EXAM_ROUTES.length} 件が 200`, async ({ request }) => {
    expect(EXAM_ROUTES.length).toBe(13);
    for (const path of EXAM_ROUTES) {
      const res = await request.get(path);
      expect(res.status(), `${path} が 200 を返さない`).toBe(200);
    }
  });

  test(`書籍 ${BOOK_ROUTES.length} 件が 200`, async ({ request }) => {
    expect(BOOK_ROUTES.length).toBe(13);
    for (const path of BOOK_ROUTES) {
      const res = await request.get(path);
      expect(res.status(), `${path} が 200 を返さない`).toBe(200);
    }
  });

  test(`意図的 404 が ${INTENTIONAL_404_ROUTES.length} 件すべて 404`, async ({ request }) => {
    expect(INTENTIONAL_404_ROUTES.length).toBe(4);
    for (const path of INTENTIONAL_404_ROUTES) {
      const res = await request.get(path);
      expect(res.status(), `${path} が 404 を返さない`).toBe(404);
    }
  });

  test("ルート総数 = 45（必須200×15 + 試験区分13 + 書籍13 + 意図的404×4）", () => {
    const total =
      REQUIRED_200_ROUTES.length +
      EXAM_ROUTES.length +
      BOOK_ROUTES.length +
      INTENTIONAL_404_ROUTES.length;
    expect(total).toBe(45);
  });
});
