import { test, expect } from "@playwright/test";
import paper from "../../data/exam-library/papers/lckohyo-LC20260415-1.json";

const paperPath = "/e-learning/exams/lckohyo-LC20260415-1";

test("safety answers survive navigation, result links and wrong-answer retry", async ({ page }) => {
  await page.goto(paperPath);
  const first = paper[0]!;
  const second = paper[1]!;
  await page.getByRole("radio", { name: new RegExp(`^選択肢 ${first.correctChoice}:`) }).click();
  await expect(page.getByRole("heading", { name: "正解", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "次の問題へ", exact: true }).click();
  await page.getByRole("radio", { name: new RegExp(`^選択肢 ${second.correctChoice === 1 ? 2 : 1}:`) }).click();
  await expect(page.getByRole("heading", { name: "不正解", exact: true })).toBeVisible();
  await page.getByRole("navigation", { name: "グローバルナビゲーション", exact: true }).getByRole("link", { name: "進捗・復習", exact: true }).click();
  await expect(page.getByText("回答 2問 · 正解 1問", { exact: true })).toBeVisible();
  await page.getByRole("link", { name: "続きから解く →", exact: true }).click();
  await expect(page.getByRole("heading", { name: "不正解", exact: true })).toBeVisible();
  await page.goBack();
  await page.getByRole("link", { name: "結果・間違いを復習 →", exact: true }).click();
  await expect(page.getByRole("heading", { name: "結果と見直し", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "間違えた1問を解き直す", exact: true }).click();
  await page.getByRole("radio", { name: new RegExp(`^選択肢 ${second.correctChoice}:`) }).click();
  await expect(page.getByRole("heading", { name: "正解", exact: true })).toBeVisible();
});

test("safety search opens the exact matched question and keeps safety navigation", async ({ page }) => {
  await page.goto("/e-learning/search");
  await page.getByRole("searchbox", { name: "キーワード" }).fill("衛生管理者");
  await page.getByRole("combobox", { name: "試験・科目" }).selectOption({ label: "第一種衛生管理者" });
  await page.getByRole("button", { name: "検索", exact: true }).click();
  const hit = page.getByRole("region", { name: "検索結果" }).getByRole("link").nth(1);
  const number = /・問(\d+)/.exec(await hit.innerText())?.[1];
  expect(number).toBeTruthy();
  const href = await hit.getAttribute("href");
  expect(href).toContain("?question=");
  const requested = new URL(href!, "http://localhost").searchParams.get("question")!;
  await hit.click();
  await expect(page).toHaveURL(new RegExp(`question=${requested}`));
  await expect(page.getByRole("heading", { name: new RegExp(`^問${number}\\s*（`) })).toBeVisible();
  await expect(page.getByRole("radio").first()).toBeVisible();
  const nav = page.getByRole("navigation", { name: "グローバルナビゲーション", exact: true });
  await expect(nav.getByRole("link", { name: "検索", exact: true })).toHaveAttribute("href", "/e-learning/search");
  await expect(nav.getByRole("link", { name: "模試", exact: true })).toHaveCount(0);
});

test("IPA shows annual selection before long exam guidance", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/ip");
  const yearTab = page.getByRole("tab", { name: "年度別", exact: true });
  await expect(yearTab).toBeVisible();
  const box = await yearTab.boundingBox();
  expect(box!.y).toBeLessThan(844);
  await expect(page.getByRole("link", { name: "今すぐ解く", exact: true })).toBeVisible();
});

test("IPA three-question practice ends on results instead of the home chooser", async ({ page }) => {
  await page.goto("/quiz?mode=random&exam=ap&limit=3");
  for (let index = 0; index < 3; index += 1) {
    await page.getByRole("radio").first().click();
    const next = page.getByRole("button", { name: index === 2 ? "結果を見る" : "次の問題へ", exact: true });
    await expect(next).toHaveCount(1);
    await next.click();
  }
  await expect(page.getByRole("heading", { name: "クイズ完了！", exact: true })).toBeVisible();
  await expect(page.getByRole("navigation", { name: "分野から選ぶ" })).toHaveCount(0);
});


test("mobile safety menu keeps search and progress inside safety learning", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/e-learning/exams");
  await page.locator("header").getByRole("button", { name: "メニューを開く", exact: true }).click();
  const menu = page.getByRole("navigation", { name: "モバイルナビゲーション", exact: true });
  await expect(menu.getByRole("link", { name: "進捗・復習", exact: true })).toHaveAttribute("href", "/e-learning/progress");
  await menu.getByRole("link", { name: "検索", exact: true }).click();
  await expect(page).toHaveURL(/\/e-learning\/search$/);
  await expect(page.getByRole("heading", { name: "安全衛生の問題検索", exact: true })).toBeVisible();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
