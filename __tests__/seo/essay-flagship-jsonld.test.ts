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

const DEEP_SOURCE = readFileSync(
  join(process.cwd(), "app", "essay", "[exam]", "[questionId]", "page.tsx"),
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

  // The flagship is the surface the whole site funnels toward, yet it shipped
  // with no openGraph/twitter metadata while blog posts and /[exam] hubs all emit
  // rich /api/og social cards. Without these, social shares of the flagship show
  // no preview image. Pin that it emits an OG + Twitter card backed by the
  // dedicated type=essay /api/og image. "崩れたら落ちる".
  it("emits openGraph + twitter social cards backed by /api/og?type=essay", () => {
    expect(SOURCE).toContain("openGraph:");
    expect(SOURCE).toContain("twitter:");
    expect(SOURCE).toContain('card: "summary_large_image"');
    expect(SOURCE).toContain("/api/og?");
    expect(SOURCE).toContain('type: "essay"');
  });
});

// The per-question grading pages (now in the sitemap) are the most specific
// flagship surface; they should carry their own structured data derived from the
// question (no hardcoded claims) just like the hub. "崩れたら落ちる".
describe("flagship /essay/[exam]/[questionId] structured data", () => {
  it("emits a LearningResource + BreadcrumbList JSON-LD graph", () => {
    expect(DEEP_SOURCE).toContain('"@type": "LearningResource"');
    expect(DEEP_SOURCE).toContain('"@type": "BreadcrumbList"');
    expect(DEEP_SOURCE).toContain('"@context": "https://schema.org"');
  });

  it("renders it via JsonLd and derives fields from the question (not hardcoded)", () => {
    expect(DEEP_SOURCE).toContain('import { JsonLd }');
    expect(DEEP_SOURCE).toContain("<JsonLd data={jsonLd} />");
    expect(DEEP_SOURCE).toContain("examLabel(question.exam)");
    expect(DEEP_SOURCE).toContain("isBasedOn: question.pdfUrl");
  });

  // Soft-404 guard: invalid /essay/{exam}/{id} must return a real 404, not a
  // 200 with the not-found UI. generateStaticParams + dynamicParams=false makes
  // Next 404 unknown params before rendering (the /blog/[slug] pattern). If this
  // regresses, stale/external essay URLs become crawl-wasting soft-404s again.
  it("prerenders only real questions and 404s unknown params (no soft-404)", () => {
    expect(DEEP_SOURCE).toContain("export function generateStaticParams");
    expect(DEEP_SOURCE).toContain("getAllEssayQuestions()");
    expect(DEEP_SOURCE).toContain("export const dynamicParams = false");
  });

  // Same OG gap as the hub: deep grading pages are the most specific flagship
  // surface and were shipped without social cards. Pin a question-derived OG +
  // Twitter card backed by /api/og?type=essay (no hardcoded claims). "崩れたら落ちる".
  it("emits openGraph + twitter social cards backed by /api/og?type=essay", () => {
    expect(DEEP_SOURCE).toContain("openGraph:");
    expect(DEEP_SOURCE).toContain("twitter:");
    expect(DEEP_SOURCE).toContain('card: "summary_large_image"');
    expect(DEEP_SOURCE).toContain("/api/og?");
    expect(DEEP_SOURCE).toContain('type: "essay"');
  });

  // Revenue funnel: the indexable flagship grading page funnels its high-intent
  // 論述 audience to the per-exam 合格論文 book via the existing InlineBookHint
  // (category="論文"). The /essays plural pages already do this with "午後"; this
  // pins the indexable /essay deep page keeps its natural, exam-scoped book link.
  it("funnels to the per-exam 論文 book via InlineBookHint (P2-4 affiliate)", () => {
    expect(DEEP_SOURCE).toContain("import { InlineBookHint }");
    expect(DEEP_SOURCE).toContain(
      'InlineBookHint exam={question.exam} category="論文"',
    );
  });
});
