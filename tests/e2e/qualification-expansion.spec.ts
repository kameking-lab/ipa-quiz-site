import { test, expect, type Page } from "@playwright/test";

import { FP2_2026_MAY_QUESTIONS } from "../../data/questions/fp2";

interface QualificationCase {
  exam: "fp2" | "fp3";
  yearSeason: "2025-published" | "2026-published";
  questionCount: number;
  questionPath: string;
  correctIndex: number;
  choiceCount: number;
  answerUrl: string;
}

const cases: QualificationCase[] = [
  { exam: "fp2", yearSeason: "2026-published", questionCount: FP2_2026_MAY_QUESTIONS.length, questionPath: "/q/fp2/2026-published/gakka/q1", correctIndex: 2, choiceCount: 4, answerUrl: "https://www.jafp.or.jp/exam/mohan/files/g2_202605_qa.pdf" },
  {
    questionCount: 60,
    exam: "fp3",
    yearSeason: "2025-published",
    questionPath: "/q/fp3/2025-published/gakka/q31",
    correctIndex: 2,
    choiceCount: 3,
    answerUrl: "https://www.jafp.or.jp/exam/mohan/files/g3_202505_qa.pdf",
  },
];

async function followBrowseJourney(page: Page, c: QualificationCase): Promise<void> {
  await page.goto(`/${c.exam}`);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

  await page.locator(`a[href='/${c.exam}/${c.yearSeason}']`).click();
  await expect(page).toHaveURL(new RegExp(`/${c.exam}/${c.yearSeason}$`));

  await page.locator(`a[href='${c.questionPath}']`).click();
  await expect(page).toHaveURL(new RegExp(`${c.questionPath}$`));
}

for (const c of cases) {
  test(`${c.exam}: qualification → year/subject → answer → back/progress`, async ({ page }) => {
    await followBrowseJourney(page, c);

    if (c.exam === "fp2") {
      await expect(page.getByText("法令基準日: 2025-04-01（この日の制度で解答）")).toBeVisible();
      await expect(page.getByRole("navigation", { name: "解説の公式根拠" })).toHaveCount(0);
    }
    const choices = page.getByRole("radiogroup", { name: /選択肢/ }).getByRole("radio");
    await expect(choices).toHaveCount(c.choiceCount);
    await choices.nth(c.correctIndex).click();
    await expect(page.getByText("正解！", { exact: true })).toBeVisible();

    const explanations = page.getByRole("heading", { name: "各選択肢の解説" });
    await expect(explanations).toBeVisible();
    await expect(explanations.locator("..").locator("dd")).toHaveCount(c.choiceCount);

    await page.getByText("AI生成", { exact: true }).click();
    const officialAnswer = page.getByRole("link", { name: /公式解答 PDF/ }).first();
    await expect(officialAnswer).toHaveAttribute("href", c.answerUrl);

    await page.goBack();
    await expect(page).toHaveURL(new RegExp(`/${c.exam}/${c.yearSeason}$`));
    await expect(page.getByText(`1 / ${c.questionCount} 解答済み`)).toBeVisible();
    await page.goBack();
    await expect(page).toHaveURL(new RegExp(`/${c.exam}$`));
  });
}

test("denken3 is reachable after content acceptance", async ({ page }) => {
  const response = await page.goto("/denken3");
  expect(response?.status()).toBe(200);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("電験三種の過去問");
});

test("denko2 publishes four full sittings with wrong-choice explanations and return progress", async ({ page }) => {
  const response = await page.goto("/denko2");
  expect(response?.status()).toBe(200);
  for (const sitting of ["2024-first", "2024-second", "2025-first", "2025-second"]) {
    await expect(page.locator(`a[href='/denko2/${sitting}']`)).toBeVisible();
  }
  await expect(page.locator("a[href='/denko2/skill']")).toBeVisible();
  await page.locator("a[href='/denko2/2024-first']").click();
  await page.locator("a[href='/q/denko2/2024-first/gakka/q1']").click();
  // Official answer is ロ (site label イ); choose ア to exercise a wrong answer.
  await page.getByRole("radiogroup", { name: /選択肢/ }).getByRole("radio").first().click();
  const explanations = page.getByRole("heading", { name: "各選択肢の解説" });
  await expect(explanations).toBeVisible();
  await expect(explanations.locator("..").locator("dd")).toHaveCount(4);
  await page.goBack();
  await expect(page).toHaveURL(/\/denko2\/2024-first$/);
  await expect(page.locator("a[href='/q/denko2/2024-first/gakka/q1']")).toBeVisible();
  await page.goBack();
  await expect(page).toHaveURL(/\/denko2$/);
  await expect(page.getByRole("region", { name: "進捗", exact: true })).toContainText(/1\s*\/\s*200 問/);
});

test("denko2 partial 2026 pilot remains unpublished", async ({ page }) => {
  await page.goto("/q/denko2/2026-first/gakka/q10");
  await expect(page.getByRole("heading", { name: "お探しのページが見つかりませんでした" })).toBeVisible({ timeout: 20_000 });
  await expect(page.getByText("低圧屋内配線の分岐回路の設計で")).toHaveCount(0);
});

test("FP2 negative questions explain why a selected true statement is not the answer", async ({ page }) => {
  await page.goto("/q/fp2/2026-published/gakka/q2");
  await page.getByRole("radiogroup", { name: /選択肢/ }).getByRole("radio").first().click();
  await expect(page.getByText("適切な記述なので、本問の正解ではありません。", { exact: false })).toBeVisible();
  await expect(page.getByText("不適切な記述で、本問の正解です。妻は自身の健康保険", { exact: false })).toBeVisible();
  await expect(page.getByRole("navigation", { name: "解説の公式根拠" }).getByRole("link")).toHaveCount(3);
});

test("FP2 uses the common quiz player with its law reference date and each-choice explanations", async ({ page }) => {
  await page.goto("/quiz?mode=year&exam=fp2&year=2026&season=published&session=gakka&order=1");
  await expect(page.getByText("法令基準日: 2025-04-01（この日の制度で解答）")).toBeVisible();
  await page.getByRole("radiogroup", { name: /選択肢/ }).getByRole("radio").nth(2).click();
  await expect(page.getByRole("region", { name: "正解の解説" })).toBeVisible();
  await expect(page.getByRole("region", { name: "選択肢ごとの解説" }).locator("dd")).toHaveCount(4);
  await expect(page.getByRole("link", { name: "公式公開ページ", exact: true })).toHaveCount(0);
  await expect(page.locator('a[href="https://www.jafp.or.jp/exam/mohan/files/g2_202605_qa.pdf"]').first()).toBeVisible();
});
