import { expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import ExamTopPage from "@/app/[exam]/page";

it.each(["db", "es"])("%s shows no afternoon AI grading offer or link", async exam => {
  const html = renderToStaticMarkup(await ExamTopPage({ params: Promise.resolve({ exam }) }));
  expect(html).not.toContain('aria-label="AI 午後問題対策"');
  expect(html).not.toContain('href="/essay"');
  expect(html).not.toContain(`href="/${exam}/afternoon"`);
});
