import { expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import ExamTopPage from "@/app/[exam]/page";

it.each(["db", "es"])("%s preserves the incoming unsupported-afternoon guidance without a grading link", async exam => {
  const html = renderToStaticMarkup(await ExamTopPage({ params: Promise.resolve({ exam }) }));
  const guidance = html.split('aria-label="AI 午後問題対策"')[1].split("</section>")[0];
  expect(guidance).toContain("午後記述のAI採点は未対応です");
  expect(guidance).toContain("IPA公式資料");
  expect(guidance).not.toContain('href="/essay"');
  expect(guidance).not.toContain(`href="/${exam}/afternoon"`);
});
