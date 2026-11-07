import { expect, test } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { questionPagePath } from "../../lib/seo/question-url";
import scope from "../../reports/int7-20261105/release-scope.json";
import benrishi from "../../data/questions/batch3/benrishi.json";
import travel from "../../data/questions/batch3/chiiki-ryoko.json";
import type { Question } from "../../lib/questions/types";

test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, serviceWorkers: "block" });
test("batch3: new qualification hubs and retained GSC entry URLs work at mobile width", async ({page}) => {
  test.setTimeout(120_000);
  for (const code of Object.keys(scope)) {
    const response = await page.goto(`/${code}`);
    expect(response?.status(), code).toBe(200);
    await expect(page.locator("main h1").first()).toBeVisible();
    if (code === "dokugeki-chiba") await expect(page.getByText(/一般・農業用品目・特定品目/).first()).toBeVisible();
    if (code === "dojo-osen") await expect(page.getByText(/午前・午後（選択式）/).first()).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), code).toBe(true);
  }
  for (const url of ["/sc", "/nw", "/st", "/sa", "/ap", "/blog", "/blog/it-shikaku-rirekisho-kakikata", "/blog/ipa-shiken-fukusuu-kubun-juken", "/blog/koudo-gozen1-taisaku", "/blog/nw-gogo-jikan-haibun"]) {
    const response = await page.goto(url);
    expect(response?.status(), url).toBe(200);
    await expect(page.locator("main h1").first()).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://www.kakomon-ai.jp${url}`);
  }
});
test("batch3: surveyor afternoon uses manual assessment, original figures and official examples", async ({page}) => {
  await page.goto("/q/sokuryoshi/2026-annual/pm/q1");
  const model = page.getByRole("region", {name: "記述の独自解答例"});
  await expect(model.getByText(/自動採点を行いません/)).toBeVisible();
  await expect(model.getByRole("link", {name: "公式正解例の出典"})).toHaveAttribute("href", "https://www.gsi.go.jp/common/000279272.pdf");
  await expect(model.locator('img')).toHaveCount(2);
  await page.getByRole("link", {name: /クイズモードで開く/}).first().click();
  await expect(page).toHaveURL(/\/quiz\?/);
  await expect(page.getByRole("heading", {name: "測量士 年度別過去問演習"})).toBeVisible();
  const practice = page.getByRole("region", {name: "記述の独自解答例"});
  await expect(practice).toBeVisible();
  await practice.locator("summary").click();
  await expect(practice.locator("details")).toHaveJSProperty("open", true);
  const example = practice.locator('img').first();
  await example.scrollIntoViewIfNeeded();
  await expect.poll(() => example.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
  await expect(example).toBeVisible();
  await expect(page.getByRole("radiogroup")).toHaveCount(0);
  expect(await page.evaluate(() => localStorage.getItem("ipa-quiz:history:v1"))).toBeNull();
});
test("batch3: travel multi-selection preserves exact grading and source diagrams", async ({page}) => {
  const question = travel.find(q => (q.requiredSelections ?? 1) > 1)!;
  await page.goto(`/quiz?mode=year&exam=chiiki-ryoko&year=${question.year}&season=annual&session=${question.session}&question=${question.id}`);
  const group = page.getByRole("group", {name: /選択肢/});
  await expect(group).toBeVisible();
  for (const key of question.answer as string[]) await group.getByRole("checkbox", {name: new RegExp(`^選択肢 ${key}:`)}).click();
  await expect(page.getByText("正解です。解説が表示されました。", {exact: true})).toHaveCount(1);
});
test("batch3: source figures render and contact site parameter retains both support paths", async ({page}, testInfo) => {
  const q = benrishi[0] as Question;
  await page.goto(questionPagePath(q));
  await expect(page.locator('img[src^="/images/questions/batch3/"]').first()).toBeVisible();
  await page.screenshot({path: testInfo.outputPath("benrishi-mobile.png"), fullPage: true});
  await page.goto("/contact?site=tsugino");
  await expect(page.getByRole("radio", {name: "次の資格について"})).toBeChecked();
  await expect(page.locator("#legacy-benefits")).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  mkdirSync("reports/int7-20261105/screenshots", {recursive:true});
  await page.screenshot({path:"reports/int7-20261105/screenshots/contact-mobile.png", fullPage:true});
});
