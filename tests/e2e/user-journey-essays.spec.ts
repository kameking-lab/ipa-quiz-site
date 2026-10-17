import { test, expect } from "@playwright/test";

const ESSAY_EXAM = "/essays/sc";
const ESSAY_QUESTION = "/essays/sc/2025-spring/pm2/q1";
const OFFICIAL_INDEX = "https://www.ipa.go.jp/shiken/mondai-kaiotu/index.html";
const OFFICIAL_YEARS = [
  ["2025年度", "https://www.ipa.go.jp/shiken/mondai-kaiotu/2025r07.html"],
  ["2024年度", "https://www.ipa.go.jp/shiken/mondai-kaiotu/2024r06.html"],
  ["2023年度", "https://www.ipa.go.jp/shiken/mondai-kaiotu/2023r05.html"],
] as const;

test.describe("user journey: essays HTTP status", () => {
  test("essays exam index redirects to the official guide", async ({ request }) => {
    const res = await request.get(ESSAY_EXAM);
    expect(res.status()).toBe(200);
    expect(new URL(res.url()).pathname).toBe("/essay");
  });

  test("retired essay question redirects to the official guide", async ({ request }) => {
    const res = await request.get(ESSAY_QUESTION);
    expect(res.status()).toBe(200);
    expect(new URL(res.url()).pathname).toBe("/essay");
  });

  test("retired unknown question URL redirects to the official guide", async ({ request }) => {
    const res = await request.get("/essays/sc/2025-spring/pm2/q99");
    expect(res.status()).toBe(200);
    expect(new URL(res.url()).pathname).toBe("/essay");
  });

  test("retired unknown year URL redirects to the official guide", async ({ request }) => {
    const res = await request.get("/essays/sc/1999-spring/pm2/q1");
    expect(res.status()).toBe(200);
    expect(new URL(res.url()).pathname).toBe("/essay");
  });
});

test.describe("retired essay URLs: official past-paper guide", () => {
  test("the retired question opens the official guide", async ({ page }) => {
    await page.goto(ESSAY_QUESTION);
    await expect(page).toHaveURL(/\/essay$/);
    await expect(page.getByRole("heading", { name: "午後II 論述の公式過去問", exact: true })).toBeVisible();
  });

  test("the guide keeps all official annual source links", async ({ page }) => {
    await page.goto(ESSAY_QUESTION);
    for (const [year, href] of OFFICIAL_YEARS) {
      await expect(page.getByRole("link", { name: `${year}の公式過去問`, exact: true })).toHaveAttribute("href", href);
    }
    await expect(page.getByRole("link", { name: "IPA の過去問題一覧", exact: true })).toHaveAttribute("href", OFFICIAL_INDEX);
  });

  test("retired industry buttons and generated sample answers remain unpublished", async ({ page }) => {
    await page.goto(ESSAY_QUESTION);
    await expect(page.getByRole("group", { name: "業種選択" })).toHaveCount(0);
    await expect(page.getByRole("heading", { name: /の参考答案例/ })).toHaveCount(0);
    await expect(page.getByRole("button", { name: "製造業", exact: true })).toHaveCount(0);
  });

  test("the guide does not offer AI essay grading", async ({ page }) => {
    await page.goto(ESSAY_QUESTION);
    const guide = page.getByRole("main");
    await expect(guide.getByRole("textbox")).toHaveCount(0);
    await expect(guide.getByRole("button", { name: /採点|送信/ })).toHaveCount(0);
    await expect(guide.getByText(/現在、このページでは論述の自動採点を受け付けていません/)).toBeVisible();
  });

  test("past-question search remains available without an account gate", async ({ page }) => {
    await page.goto(ESSAY_QUESTION);
    const search = page.getByRole("link", { name: "問題検索へ", exact: true });
    await expect(search).toBeVisible();
    await expect(search).toHaveAttribute("href", "/search");
    await search.click();
    await expect(page).toHaveURL(/\/search$/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});
