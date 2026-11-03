import { expect, test } from "@playwright/test";

const questionId = "fp3-2026-published-gakka-q11";
const paperPath = "/fp3/2026-published";
const questionPath = "/q/fp3/2026-published/gakka/q11";

test("FP3 question 11 keeps its year-list solve and static explanation links after category correction", async ({ page }) => {
  await page.goto(paperPath);
  const solve = page.getByRole("link", { name: "問11を解く", exact: true });
  await expect(solve).toContainText("金融資産運用");
  await expect(solve).not.toContainText("リスク管理");
  await expect(page.getByRole("link", { name: "問11の解説を見る", exact: true })).toHaveAttribute("href", questionPath);
  await solve.click();
  const selected = new URL(page.url());
  expect(selected.searchParams.get("exam")).toBe("fp3");
  expect(selected.searchParams.get("year")).toBe("2026");
  expect(selected.searchParams.get("season")).toBe("published");
  expect(selected.searchParams.get("session")).toBe("gakka");
  expect(selected.searchParams.get("question")).toBe(questionId);
  expect(selected.searchParams.get("returnTo")).toBe(paperPath);
  await expect(page.getByText("日本銀行の公開市場操作における売りオペレーションには", { exact: false })).toBeVisible();
  await expect(page.getByRole("progressbar", { name: "クイズ進捗" })).toHaveAttribute("aria-valuemax", "60");
  await page.getByRole("radiogroup", { name: /選択肢/ }).getByRole("radio").nth(1).click();
  await expect(page.getByRole("region", { name: "正解の解説" })).toBeVisible();
  await page.goto(questionPath);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://www.kakomon-ai.jp" + questionPath);
  await expect(page.getByRole("link", { name: /^公式問題PDF/ }).first()).toHaveAttribute("href", "https://www.jafp.or.jp/exam/mohan/files/g3_202605_qa.pdf");
});

test("FP3 financial category and topic filters retain the selected 2026 question ID", async ({ page }) => {
  const query = new URLSearchParams({ mode: "topic", exam: "fp3", year: "2026", season: "published", session: "gakka", category: "金融資産運用", topic: "金融資産運用", question: questionId, returnTo: paperPath, order: "1" });
  await page.goto(`/quiz?${query.toString()}`);
  await expect(page.getByText("日本銀行の公開市場操作における売りオペレーションには", { exact: false })).toBeVisible();
  await expect(page.getByRole("progressbar", { name: "クイズ進捗" })).toHaveAttribute("aria-valuemax", "11");
  await page.getByRole("radiogroup", { name: /選択肢/ }).getByRole("radio").nth(1).click();
  await expect(page.getByRole("region", { name: "正解の解説" })).toBeVisible();
  const selected = new URL(page.url());
  expect(selected.searchParams.get("exam")).toBe("fp3");
  expect(selected.searchParams.get("year")).toBe("2026");
  expect(selected.searchParams.get("question")).toBe(questionId);
});
