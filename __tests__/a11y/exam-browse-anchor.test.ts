import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

// /sitemap deep-links each exam hub's browse views: "年度別一覧" → /<exam>#years
// and "分野別一覧" → /<exam>#topics. Those fragments must (1) resolve to real DOM
// ids on the exam hub so the browser scrolls to the browse section (not the page
// top), and (2) pre-select the matching tab inside the client ExamBrowseTabs.
// Previously the section had no ids and the tabs were uncontrolled (defaultValue),
// so both anchors were soft dead-anchors. Guard both halves of the fix.
describe("/<exam>#years and /<exam>#topics resolve to real browse anchors", () => {
  const sitemap = readFileSync(join(process.cwd(), "app/sitemap/page.tsx"), "utf8");
  const examPage = readFileSync(join(process.cwd(), "app/[exam]/page.tsx"), "utf8");
  const browseTabs = readFileSync(
    join(process.cwd(), "components/exam/ExamBrowseTabs.tsx"),
    "utf8",
  );

  it("sitemap links to #years and #topics on each exam hub", () => {
    expect(sitemap).toContain("/${code}#years");
    expect(sitemap).toContain("/${code}#topics");
  });

  it("the exam hub defines scroll anchors id=years and id=topics", () => {
    expect(examPage).toMatch(/id="years"[^>]*scroll-mt-\d+/);
    expect(examPage).toMatch(/id="topics"[^>]*scroll-mt-\d+/);
  });

  it("ExamBrowseTabs maps the plural hashes onto the singular tab values", () => {
    expect(browseTabs).toMatch(/years:\s*"year"/);
    expect(browseTabs).toMatch(/topics:\s*"topic"/);
  });

  it("ExamBrowseTabs is controlled by the hash (not an uncontrolled defaultValue)", () => {
    expect(browseTabs).toContain("window.location.hash");
    expect(browseTabs).toContain('addEventListener("hashchange"');
    expect(browseTabs).toMatch(/<Tabs value=\{tab\} onValueChange=\{setTab\}/);
    expect(browseTabs).not.toContain('defaultValue="year"');
  });
});
