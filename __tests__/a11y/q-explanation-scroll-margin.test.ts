import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import QuestionPage from "@/app/q/[exam]/[yearSeason]/[section]/[qnum]/page";
import ExamYearSeasonPage from "@/app/[exam]/[yearSeason]/page";

// 検索結果や保存済みリンクからの #explanation を引き続き受け付ける。
describe("/q 解説アンカー — sticky header(56px) 下に隠れない", () => {
  const source = readFileSync(
    join(
      process.cwd(),
      "app/q/[exam]/[yearSeason]/[section]/[qnum]/page.tsx",
    ),
    "utf8",
  );

  it('id="explanation" セクションが scroll-mt-20 を持つ', () => {
    expect(source).toMatch(/id="explanation"[^>]*className="[^"]*scroll-mt-20[^"]*"/);
  });

  it("ヘッダー(56px)未満の不十分な scrollMarginTop:1rem が残っていない", () => {
    expect(source).not.toContain('scrollMarginTop: "1rem"');
  });
});

it("問題詳細のHTMLに解説、原典、次問、関連資料を順に含める", async () => {
  const page = await QuestionPage({ params: Promise.resolve({ exam: "ap", yearSeason: "2025-autumn", section: "am", qnum: "q12" }) });
  const html = new DOMParser().parseFromString(renderToStaticMarkup(page), "text/html");
  const explanation = html.querySelector("#explanation")!;
  const source = html.querySelector("#question-source")!;
  const next = html.querySelector('nav[aria-label="解説のあとに学ぶ"] a')!;
  expect(explanation.querySelector("summary")).toBeNull();
  expect(explanation.compareDocumentPosition(source) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  expect(source.querySelector(':scope > a[href*=".pdf"]')?.textContent).toContain("公式問題PDF");
  const sourceDetails = source.querySelector("details")!;
  expect(sourceDetails.open).toBe(false);
  expect(sourceDetails.querySelector('a[href*=".pdf"]')?.textContent).toContain("公式正答PDF");
  expect(source.compareDocumentPosition(next) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  expect(next.getAttribute("href")).toBe("/q/ap/2025-autumn/am/q13");
  const related = [...html.querySelectorAll("details")].find((element) => element.querySelector("summary")?.textContent === "関連資料")!;
  expect(related.open).toBe(false);
  expect(related.querySelector('a[href^="/q/"]')).not.toBeNull();
  expect(related.querySelector('a[href^="/blog/"]')).not.toBeNull();
});

it("年度一覧のHTMLに問指定の演習と閉じた独立解説URLを含める", async () => {
  const page = await ExamYearSeasonPage({ params: Promise.resolve({ exam: "ap", yearSeason: "2025-autumn" }) });
  const html = new DOMParser().parseFromString(renderToStaticMarkup(page), "text/html");
  const link = html.querySelector('a[href="/q/ap/2025-autumn/am/q12"]')!;
  expect(link.closest("details")?.open).toBe(false);
  expect(link.closest("details")?.querySelector("summary")?.textContent).toBe("問題別の解説");
  expect(html.querySelectorAll('a[aria-label="問12を解く"]')).toHaveLength(1);
  expect(html.querySelector('a[aria-label="問12を解く"]')?.getAttribute("href")).toContain("question=");
});
