import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

// The flagship page (app/essay/page.tsx) is the strategic centerpiece the site
// funnels toward, yet it shipped with no structured data while blog posts and
// /faq emit rich JSON-LD. These guards pin that the flagship keeps a
// LearningResource + BreadcrumbList @graph, renders it, and derives the covered
// exams from ESSAY_EXAM_CODES (the single source) rather than a hardcoded list,
// so the "teaches" claim can't drift into exaggeration. "崩れたら落ちる".

const SOURCE = readFileSync(
  join(process.cwd(), "app", "essay", "page.tsx"),
  "utf8",
);

describe("flagship /essay structured data", () => {
  it("emits a LearningResource + BreadcrumbList JSON-LD graph", () => {
    expect(SOURCE).toContain('"@type": "LearningResource"');
    expect(SOURCE).toContain('"@type": "BreadcrumbList"');
    expect(SOURCE).toContain('"@context": "https://schema.org"');
  });

  it("renders the JSON-LD via the JsonLd component", () => {
    expect(SOURCE).toContain('import { JsonLd }');
    expect(SOURCE).toContain("<JsonLd data={jsonLd} />");
  });

  it("derives covered exams from ESSAY_EXAM_CODES (no hardcoded exaggeration)", () => {
    expect(SOURCE).toContain("ESSAY_EXAM_CODES.map((exam) => examLabel(exam))");
    expect(SOURCE).toContain("teaches:");
  });
});
