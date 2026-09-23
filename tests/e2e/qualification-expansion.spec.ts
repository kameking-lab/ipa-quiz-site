import { test, expect, type Page } from "@playwright/test";

interface QualificationCase {
  exam: "fp3";
  yearSeason: "2025-published";
  questionPath: string;
  correctIndex: number;
  choiceCount: number;
  answerUrl: string;
}

const cases: QualificationCase[] = [
  {
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
    await expect(page.getByText("1 / 5 解答済み")).toBeVisible();
    await page.goBack();
    await expect(page).toHaveURL(new RegExp(`/${c.exam}$`));
  });
}

test("denken3 remains unreachable until the required usage notification is complete", async ({ page }) => {
  const response = await page.goto("/denken3");
  expect(response?.status()).toBe(404);
});
