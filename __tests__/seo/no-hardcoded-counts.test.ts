import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { getExamQuestionCount } from "@/lib/constants/exam-question-counts";
import { QUESTIONS_BY_EXAM } from "@/data/questions";

// Question totals must come from lib/constants/question-counts.ts, never as
// literals. These raw/stale values caused the drift the empirical reviews
// flagged: the 3-way home/meta drift (12,652 / 14,402 / 14,082) and the
// blog↔exam-LP mismatch (a stale "2,398" in a blog article vs the SSOT /ip
// count). Guard against regressions.
const FORBIDDEN = [
  "14,402",
  "14402",
  "14,082",
  "14082",
  "12,652",
  "12652",
  "2,398",
  "2398",
];

// The SSOT itself documents the history in comments; exempt it.
const EXEMPT = new Set([
  join("lib", "constants", "question-counts.ts"),
]);

function walk(dir: string, acc: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    const s = statSync(p);
    if (s.isDirectory()) walk(p, acc);
    else if (/\.(ts|tsx)$/.test(entry)) acc.push(p);
  }
  return acc;
}

describe("no hardcoded question-count literals", () => {
  it("uses the SSOT instead of raw/stale count numbers in source", () => {
    const files = [
      ...walk("app"),
      ...walk("components"),
      ...walk("lib"),
      // Blog content is generated in data/blog and was the source of the stale
      // "2,398" count — scan it too (question data under data/questions is not
      // scanned: those files legitimately contain arbitrary numbers).
      ...walk(join("data", "blog")),
    ].filter((f) => !EXEMPT.has(f));

    const offenders: string[] = [];
    for (const f of files) {
      const text = readFileSync(f, "utf8");
      for (const bad of FORBIDDEN) {
        if (text.includes(bad)) offenders.push(`${f} contains "${bad}"`);
      }
    }
    expect(offenders).toEqual([]);
  });
});

// The literal scan above cannot catch the *other* way these counts drifted:
// reading the raw dataset length dynamically (QUESTIONS_BY_EXAM[exam].length /
// ALL_QUESTIONS.length) instead of the indexable SSOT. That rendered IP=2,398
// (raw) vs 2,381 (SSOT) — no literal, so the scan stayed green. Guard the
// user-facing count-advertising pages at the source level (file-scoped, so the
// legitimate raw-length uses in app/admin/stats etc. are unaffected).
//
// Scope note: app/stats and app/transparency intentionally surface a *broader*
// "総収録問題 = 午前+午後+論文" collection metric via getContentCounts(); whether
// its morning component should switch to the indexable SSOT is a separate
// product decision tracked in logs/blog-ip-question-count-stale-2026-05-28.md,
// so those pages are deliberately NOT asserted here.
describe("count-advertising pages derive counts from the SSOT, not the raw dataset", () => {
  const PAGES = [
    join("app", "blog", "[slug]", "page.tsx"),
    join("app", "sitemap", "page.tsx"),
  ];

  for (const page of PAGES) {
    const src = readFileSync(page, "utf8");
    it(`${page} does not read the raw dataset (QUESTIONS_BY_EXAM / ALL_QUESTIONS)`, () => {
      expect(src).not.toMatch(/QUESTIONS_BY_EXAM/);
      expect(src).not.toMatch(/ALL_QUESTIONS/);
    });
    it(`${page} uses the SSOT count helper`, () => {
      expect(src).toMatch(/getExamQuestionCount|TOTAL_QUESTIONS_PUBLISHED/);
    });
  }

  it("the indexable SSOT count genuinely differs from the raw length (so raw would overstate)", () => {
    // If these were ever equal the bug would be invisible; lock that IP's
    // indexable count is strictly below its raw module length (the 17 placeholder
    // /needsReview questions that are noindex/404 and must not be advertised).
    expect(getExamQuestionCount("ip")).toBeLessThan((QUESTIONS_BY_EXAM.ip ?? []).length);
  });
});
