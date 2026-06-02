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

  // Revenue funnel (P2-4): the hub covers 5 exams so a single book can't be
  // picked, but it should still funnel its 論述 audience to the indexable
  // /recommended-books index (subtle, not pushy). Pin that link so the hub keeps
  // a book funnel symmetric with the deep grading pages' InlineBookHint.
  it("funnels to the /recommended-books index (P2-4 affiliate)", () => {
    expect(SOURCE).toContain('href="/recommended-books"');
  });

  // The flagship landing converts flagship-intent searchers, yet it shipped
  // without the objection-handling FAQ that every strategic blog page carries
  // (sessions 8-11). Pin a FAQPage in the @graph driven by a single ESSAY_FAQ
  // source that also renders a visible <dl>, so the structured data and on-page
  // text can never drift. "崩れたら落ちる".
  it("emits a FAQPage built from a single ESSAY_FAQ source", () => {
    expect(SOURCE).toContain('"@type": "FAQPage"');
    expect(SOURCE).toContain("const ESSAY_FAQ");
    expect(SOURCE).toContain("ESSAY_FAQ.map((f) => ({");
    expect(SOURCE).toContain('"@type": "Question"');
    expect(SOURCE).toContain('"@type": "Answer"');
  });

  it("renders the same ESSAY_FAQ as a visible definition list", () => {
    expect(SOURCE).toContain("ESSAY_FAQ.map((f) => (");
    expect(SOURCE).toContain("よくある質問");
    expect(SOURCE).toContain("<dt");
    expect(SOURCE).toContain("<dd");
  });

  // Hub→spoke completion: the flagship funnels blog → /essay (sessions 3-7) but
  // linked OUT only to deep grading pages / history / books — a dead-end toward
  // the educational 論述 articles. Pin that it now links to the three highest-
  // value guides (write / grading-rank / self-grade) so the wiring can't silently
  // regress and those strategic articles keep their hub inbound. "崩れたら落ちる".
  it("links out to the strategic 論述 guide articles (hub→spoke)", () => {
    expect(SOURCE).toContain("const ESSAY_GUIDE_POSTS");
    expect(SOURCE).toContain("/blog/${p.slug}");
    expect(SOURCE).toContain('slug: "koudo-ronjutsu-kakikata-kotsu"');
    expect(SOURCE).toContain('slug: "koudo-ronbun-jikan-haibun"');
    expect(SOURCE).toContain('slug: "koudo-ronbun-hyouka-rank"');
    expect(SOURCE).toContain('slug: "koudo-ronjutsu-jiko-saiten"');
    expect(SOURCE).toContain("論述の書き方・採点を学ぶ");
  });

  // Anti-exaggeration: the FAQ must not claim AI grading for the mock AP/FE
  // afternoon data (HD-4) and must keep the 参考評価 caveat. Pin the honest
  // framing so a future edit can't quietly over-claim coverage.
  it("keeps the FAQ honest: 参考評価 caveat, no AP/FE grading claim", () => {
    expect(SOURCE).toContain("参考評価");
    expect(SOURCE).not.toContain("応用情報");
    expect(SOURCE).not.toContain("基本情報");
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

  // Hub→spoke at the tightest intent moment: the user is about to write, yet the
  // deep grading page linked out only to the book + IPA source — no path to the
  // "how to write" guide. Pin the contextual link to the writing-cotsu article so
  // this learning path can't silently regress. "崩れたら落ちる".
  it("links to the 書き方コツ guide at the editor (hub→spoke)", () => {
    expect(DEEP_SOURCE).toContain(
      'href="/blog/koudo-ronjutsu-kakikata-kotsu"',
    );
    expect(DEEP_SOURCE).toContain("合格答案の構成と書き方のコツ");
  });
});
