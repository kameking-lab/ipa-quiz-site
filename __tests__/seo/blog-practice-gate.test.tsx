import { afterEach, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import BlogArticlePage from "@/app/blog/[slug]/page";
import { getBlogPractice } from "@/lib/blog/practice";

afterEach(() => vi.unstubAllEnvs());
// A teaching article with a selected exercise; reference articles omit it.
const slug = "db-sql-taisaku";

it("keeps the inline blog practice on public web deployments", async () => {
  vi.stubEnv("WEB_STRICT_CONTENT_GATE", "false");
  vi.stubEnv("MOBILE_IAP_ENABLED", "true");
  const html = renderToStaticMarkup(await BlogArticlePage({ params: Promise.resolve({ slug }) }));
  expect(html).toContain('aria-label="チャレンジの選択肢"');
  expect(html).toContain("無料・登録不要です。");
});

it("never serializes the new practice question or explanation when the web strict gate is enabled", async () => {
  vi.stubEnv("WEB_STRICT_CONTENT_GATE", "true");
  const practice = getBlogPractice(slug)!;
  const html = renderToStaticMarkup(await BlogArticlePage({ params: Promise.resolve({ slug }) }));
  const practiceSection = html.split('id="article-practice"')[1].split("</section>")[0];
  expect(practiceSection).toContain("利用枠を確認して1問解く");
  expect(practiceSection).toContain(`question=${practice.question.id}`);
  expect(practiceSection).not.toContain('role="radiogroup"');
  expect(practiceSection).not.toContain("無料・登録不要");
  expect(html).not.toContain(practice.question.question);
  expect(html).not.toContain(practice.question.explanation);
  for (const choice of Object.values(practice.question.choices!)) expect(practiceSection).not.toContain(choice);
});
