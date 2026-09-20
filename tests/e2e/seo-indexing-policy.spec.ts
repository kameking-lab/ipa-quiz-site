import { expect, test } from "@playwright/test";

function robotsContent(html: string): string {
  return html.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']+)["']/i)?.[1]?.toLowerCase() ?? "";
}

test("empty search landing is indexable while filtered results are noindex,follow", async ({ request }) => {
  const landing = await request.get("/search");
  const results = await request.get("/search?q=SQL&exam=ap");
  expect(landing.ok()).toBe(true);
  expect(results.ok()).toBe(true);
  expect(robotsContent(await landing.text())).not.toContain("noindex");
  const resultRobots = robotsContent(await results.text());
  expect(resultRobots).toContain("noindex");
  expect(resultRobots).toContain("follow");
});

test("interactive quiz shells have an H1 and stream mode stays out of the index", async ({ request, page }) => {
  const quiz = await request.get("/quiz?mode=random&exam=st&session=am2&limit=1");
  expect(quiz.ok()).toBe(true);
  expect(await quiz.text()).toMatch(/<h1[^>]*>\s*ITストラテジスト試験 ランダム過去問演習\s*<\/h1>/);

  const stream = await page.goto("/quiz/stream?exam=st&session=am2");
  expect(stream?.ok()).toBe(true);
  await expect(page.locator("h1")).toHaveText("ITストラテジスト試験 ストリーム過去問演習");
  const streamHtml = await stream!.text();
  expect(robotsContent(streamHtml)).toContain("noindex");
});

test("noindex stream player is omitted from the XML sitemap", async ({ request }) => {
  const sitemap = await request.get("/sitemap/main.xml");
  expect(sitemap.ok()).toBe(true);
  expect(await sitemap.text()).not.toContain("/quiz/stream");
});

test("IPA index fallback is not described as a PDF", async ({ request }) => {
  const response = await request.get("/q/ip/2019-autumn/am/q52");
  expect(response.ok()).toBe(true);
  const html = await response.text();
  expect(html).toMatch(/出典:\s*(?:<!-- -->)?IPA公式の過去問一覧/);
});
