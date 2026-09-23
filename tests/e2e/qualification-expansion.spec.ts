import { test, expect, type Page } from "@playwright/test";

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
  { exam: "fp2", yearSeason: "2026-published", questionCount: 10, questionPath: "/q/fp2/2026-published/gakka/q1", correctIndex: 2, choiceCount: 4, answerUrl: "https://www.jafp.or.jp/exam/mohan/files/g2_202605_qa.pdf" },
  {
    questionCount: 5,
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

test("denken3 remains unreachable until the required usage notification is complete", async ({ page }) => {
  const response = await page.goto("/denken3");
  expect(response?.status()).toBe(404);
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
