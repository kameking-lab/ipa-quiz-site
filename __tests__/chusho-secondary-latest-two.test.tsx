import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { CHUSHO_SECONDARY_CASES, CHUSHO_SECONDARY_QUESTIONS, CHUSHO_SECONDARY_ORIGINAL_COUNT, CHUSHO_SECONDARY_SOLUTION_COUNT, chushoSitemapPaths, getChushoQuestion, INDEPENDENT_EXAMPLE_NOTICE } from "@/lib/chusho-secondary/data";
import { getHomeDirectory } from "@/lib/home/home-directory";
import { renderExamsSitemapXml } from "@/lib/seo/sitemap-xml";
import Page from "@/app/chusho-secondary/page";
import QualificationsPage, { metadata as qualificationsMetadata } from "@/app/qualifications/page";

describe("SME consultant secondary latest-two source and example contract", () => {
  it("covers two complete years with 100-point cases and no repeated original", () => {
    expect(CHUSHO_SECONDARY_CASES.map(p => `${p.year}:${p.case}:${p.questions.length}`)).toEqual(["2025:case1:4","2025:case2:4","2025:case3:4","2025:case4:4","2024:case1:4","2024:case2:4","2024:case3:5","2024:case4:4"]);
    expect(CHUSHO_SECONDARY_ORIGINAL_COUNT).toBe(33);
    expect(CHUSHO_SECONDARY_SOLUTION_COUNT).toBe(54);
    for (const p of CHUSHO_SECONDARY_CASES) expect(p.questions.reduce((sum,q) => sum+q.points,0)).toBe(100);
    expect(new Set(CHUSHO_SECONDARY_QUESTIONS.map(q => q.id)).size).toBe(33);
    expect(getChushoQuestion(2026,"case1",1)).toBeUndefined();
    expect(getChushoQuestion(2025,"case3",5)).toBeUndefined();
  });
  it("preserves source hashes and rendered diagram/table pages", () => {
    let pages = 0;
    for (const p of CHUSHO_SECONDARY_CASES) {
      expect(p.sourcePdfUrl).toMatch(/jf-cmca.jp/);
      expect(p.sourceIntentUrl).toMatch(/2ji_shushi/);
      expect(p.context.length).toBeGreaterThan(1000);
      for (const page of p.sourcePages) {
        const bytes = readFileSync(join(process.cwd(), "public", page.url));
        expect(createHash("sha256").update(bytes).digest("hex")).toBe(page.sha256);
        pages += 1;
      }
    }
    expect(pages).toBe(40);
  });
  it("keeps every answer within its stated limit and only editorial provenance", () => {
    for (const q of CHUSHO_SECONDARY_QUESTIONS) {
      expect(q.solutionProvenance).toBe("independent-editorial-example");
      expect(q.questionText).toMatch(/第[１-５]問/);
      expect(q.intentSummary.length).toBeGreaterThan(10);
      for (const s of q.solutions) {
        if (s.maxChars) expect(Array.from(s.example).length).toBeLessThanOrEqual(s.maxChars);
        expect(s.reasoning.length).toBeGreaterThanOrEqual(40);
        expect(s.checkpoints.length).toBeGreaterThanOrEqual(2);
      }
    }
    expect(INDEPENDENT_EXAMPLE_NOTICE).toContain("公式の模範解答や採点基準ではなく");
  });
  it("indexes all 42 paths and gives the native exam a working homepage link", () => {
    const paths=chushoSitemapPaths();
    expect(paths).toHaveLength(42);
    expect(new Set(paths).size).toBe(42);
    const sitemap=renderExamsSitemapXml();
    for (const path of paths) expect(sitemap).toContain(path);
    expect(getHomeDirectory().flatMap(d=>[...d.featured,...d.compact]).find(p=>p.key==="chusho-secondary")).toMatchObject({href:"/chusho-secondary",questionCount:33});
    const html=renderToStaticMarkup(<Page />);
    expect(html).toContain("独自解答例");
    expect(html).toContain("得点を保証するものではありません");
  });
  it("distinguishes editorial secondary examples from official answer material in the qualification directory", () => {
    const html = renderToStaticMarkup(<QualificationsPage />);
    const document = new DOMParser().parseFromString(html, "text/html");
    const articles = Array.from(document.querySelectorAll("article"));
    const secondary = articles.find(article => article.querySelector('a[href="/chusho-secondary"]'));
    expect(secondary).toBeDefined();
    const sourceLink = secondary!.querySelector('a[target="_blank"]')!;
    expect(sourceLink.getAttribute("href")).toMatch(/jf-cmca.jp/);
    expect(sourceLink.textContent).toContain("\u516c\u5f0f\u554f\u984c");
    expect(sourceLink.textContent).not.toContain("\u6b63\u7b54");
    expect(document.body.textContent).toContain("\u4e2d\u5c0f\u4f01\u696d\u8a3a\u65ad\u58eb\u4e8c\u6b21\u306e\u89e3\u7b54\u4f8b\u306f\u5f53\u30b5\u30a4\u30c8\u306e\u72ec\u81ea\u4f5c\u6210");
    expect(qualificationsMetadata.description).toContain("\u72ec\u81ea\u89e3\u7b54\u4f8b");
    const multipleChoice = articles.find(article => article.querySelector('a[href="/fp3"]'));
    expect(multipleChoice!.querySelector('a[target="_blank"]')!.textContent).toContain("\u6b63\u7b54");
  });
  it("retains explicit year-end cash flow and separates sunk cost decisions", () => {
    const q25=getChushoQuestion(2025,"case4",3)!;
    expect(q25.solutions[2]!.example).toContain("13,868,220");
    const q24=getChushoQuestion(2024,"case4",3)!;
    expect(q24.solutions[2]!.reasoning).toContain("埋没");
    expect(q24.solutions[2]!.example).toContain("ある");
    expect(q24.solutions[2]!.example).not.toContain("マイナス");
  });
});
