import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { ALL_QUESTIONS, QUESTIONS_BY_EXAM } from "@/data/questions";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import { getSessionNeighbors } from "@/lib/questions/related";
import type { ExamCode, Question } from "@/lib/questions/types";

// Regression guard for the /q "前の問題・次の問題" sequential navigation
// (app/q/[exam]/[yearSeason]/[section]/[qnum]/page.tsx). The page builds a
// same-session pool sorted by qNumber and links prev/next to the adjacent
// questions, with rel=prev/next link tags for crawlers. Two things MUST hold:
//   (1) every prev/next target is a REAL question page (never a 404), and
//   (2) the first question of a session exposes no "prev" and the last no
//       "next" (boundary correctness).
// This mirrors the page's selection logic so a regression in ordering or
// boundary handling trips the test.

// Same selection logic as the page: same exam+year+season+session, qNumber asc,
// EXCLUDING needsReview (whose pages notFound() → 404). Mirrors getSessionNeighbors.
function sessionPool(q: Question): Question[] {
  const pool = QUESTIONS_BY_EXAM[q.exam] ?? [];
  return pool
    .filter(
      (x) =>
        x.year === q.year &&
        x.season === q.season &&
        x.session === q.session &&
        !x.needsReview,
    )
    .sort((a, b) => a.qNumber - b.qNumber);
}

/** Delegates to the page's real selection function so the test can't drift. */
function siblings(q: Question): { prev: Question | null; next: Question | null } {
  return getSessionNeighbors(q, QUESTIONS_BY_EXAM[q.exam] ?? []);
}

/**
 * Re-resolve a prev/next link the way the page does — must hit a real question
 * that is NOT needsReview (those return notFound()/404 in the page).
 */
function resolves(target: Question): boolean {
  if (target.needsReview) return false;
  const path = questionPagePath(target); // /q/{exam}/{year}-{season}/{session}/q{n}
  const [, , exam, yearSeason, section, qnum] = path.split("/");
  return (
    findQuestionByRoute(ALL_QUESTIONS, { exam, yearSeason, section, qnum })?.id ===
    target.id
  );
}

describe("/q 前後ナビ — リンク先は実在問題のみ (no 404)", () => {
  it("サンプル各回の prev/next は全て実在する問題ページへ解決する", () => {
    // One representative session group per exam (the first encountered with >=2
    // questions) keeps the test fast while covering every exam division.
    const exams = Object.keys(QUESTIONS_BY_EXAM) as ExamCode[];
    let checked = 0;
    for (const exam of exams) {
      const pool = QUESTIONS_BY_EXAM[exam] ?? [];
      const seed = pool.find((q) => sessionPool(q).length >= 2);
      if (!seed) continue;
      for (const q of sessionPool(seed)) {
        const { prev, next } = siblings(q);
        if (prev) expect(resolves(prev), `prev of ${q.id}`).toBe(true);
        if (next) expect(resolves(next), `next of ${q.id}`).toBe(true);
        checked++;
      }
    }
    expect(checked).toBeGreaterThan(0);
  });
});

describe("/q 前後ナビ — 境界の正しさ (最初に前なし・最後に次なし)", () => {
  it("各回の先頭問題は prev=null、末尾問題は next=null", () => {
    const exams = Object.keys(QUESTIONS_BY_EXAM) as ExamCode[];
    let sessionsChecked = 0;
    for (const exam of exams) {
      const pool = QUESTIONS_BY_EXAM[exam] ?? [];
      const seed = pool.find((q) => sessionPool(q).length >= 2);
      if (!seed) continue;
      const ordered = sessionPool(seed);
      const first = ordered[0];
      const last = ordered[ordered.length - 1];

      expect(siblings(first).prev, `${exam} first has no prev`).toBeNull();
      expect(siblings(first).next?.id, `${exam} first has a next`).toBe(
        ordered[1].id,
      );
      expect(siblings(last).next, `${exam} last has no next`).toBeNull();
      expect(siblings(last).prev?.id, `${exam} last has a prev`).toBe(
        ordered[ordered.length - 2].id,
      );
      sessionsChecked++;
    }
    expect(sessionsChecked).toBeGreaterThan(0);
  });

  it("中間問題の prev/next は qNumber 昇順で隣接する", () => {
    const seed = ALL_QUESTIONS.find((q) => sessionPool(q).length >= 3);
    expect(seed).toBeDefined();
    const ordered = sessionPool(seed as Question);
    const mid = ordered[1];
    const { prev, next } = siblings(mid);
    expect(prev?.qNumber).toBe(ordered[0].qNumber);
    expect(next?.qNumber).toBe(ordered[2].qNumber);
    expect(prev!.qNumber).toBeLessThan(mid.qNumber);
    expect(next!.qNumber).toBeGreaterThan(mid.qNumber);
  });
});

describe("/q 前後ナビ — ページ構造ガード (SSR でクローラブル)", () => {
  const source = readFileSync(
    join(
      process.cwd(),
      "app/q/[exam]/[yearSeason]/[section]/[qnum]/page.tsx",
    ),
    "utf8",
  );

  it("rel=prev / rel=next のリンクタグを SSR 出力する", () => {
    expect(source).toMatch(/rel="prev"\s+href=/);
    expect(source).toMatch(/rel="next"\s+href=/);
  });

  it("可視ナビ「前の問題」「次の問題」と境界フォールバックを持つ", () => {
    expect(source).toContain("前の問題");
    expect(source).toContain("次の問題");
    expect(source).toContain("最初の問題です");
    expect(source).toContain("最後の問題です");
  });

  it("前後ナビの選択を getSessionNeighbors に委譲する", () => {
    // The selection contract (year/season/session 絞り・qNumber 昇順・
    // needsReview 除外) now lives in related.ts and is unit-tested there;
    // the page must delegate to it rather than re-inlining the logic.
    expect(source).toMatch(/getSessionNeighbors\(\s*q\s*,\s*examPool\s*\)/);
  });

  it("選択ロジック本体 (related.ts) は year/season/session 絞り・needsReview 除外・qNumber 昇順", () => {
    const related = readFileSync(
      join(process.cwd(), "lib/questions/related.ts"),
      "utf8",
    );
    expect(related).toMatch(/x\.year === current\.year/);
    expect(related).toMatch(/x\.season === current\.season/);
    expect(related).toMatch(/x\.session === current\.session/);
    expect(related).toMatch(/!x\.needsReview/);
    expect(related).toMatch(/a\.qNumber - b\.qNumber/);
  });
});
