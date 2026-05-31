import { describe, it, expect } from "vitest";
import {
  ESSAY_EXAM_CODES,
  isEssayExamCode,
  getEssayQuestionsByExam,
  getSCpm2Questions,
  findEssayQuestion,
  findSCpm2Question,
  getEssayQuestionByYearSeason,
  getSCpm2QuestionByYearSeason,
  getIndustryEssay,
  parseYearSeason,
  questionToUrlParts,
} from "@/lib/essays/load";
import type { SCpm2Question } from "@/lib/essays/types";

// 論述（午後II/論文）コンテンツのアクセサ純関数の特性化テスト。
// 期待値はライブデータ（getSCpm2Questions）から導出し、ハードコードを避ける。

describe("isEssayExamCode / ESSAY_EXAM_CODES", () => {
  it("accepts exactly the six essay exam codes", () => {
    expect([...ESSAY_EXAM_CODES].sort()).toEqual(
      ["au", "pm", "sa", "sc", "sm", "st"].sort(),
    );
    for (const code of ESSAY_EXAM_CODES) {
      expect(isEssayExamCode(code)).toBe(true);
    }
  });

  it("rejects non-essay exam codes and junk", () => {
    expect(isEssayExamCode("ap")).toBe(false);
    expect(isEssayExamCode("nw")).toBe(false); // 論述形式でない＝対象外
    expect(isEssayExamCode("")).toBe(false);
    expect(isEssayExamCode("SC")).toBe(false); // 大文字は別物
  });
});

describe("getEssayQuestionsByExam('sc') / getSCpm2Questions", () => {
  it("returns the curated SC corpus (non-empty, identical via both accessors)", () => {
    const a = getEssayQuestionsByExam("sc");
    const b = getSCpm2Questions();
    expect(a.length).toBeGreaterThan(0);
    expect(b).toEqual(a);
  });

  it("every SC question has a spring/autumn season, unique id, and at least one industry", () => {
    const qs = getSCpm2Questions();
    const ids = qs.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length); // id 重複なし
    for (const q of qs) {
      expect(["spring", "autumn"]).toContain(q.season);
      expect(q.industries.length).toBeGreaterThan(0);
    }
  });
});

describe("findEssayQuestion / findSCpm2Question", () => {
  const sample = getSCpm2Questions()[0];

  it("finds an SC question by its id", () => {
    expect(findEssayQuestion("sc", sample.id)?.id).toBe(sample.id);
    expect(findSCpm2Question(sample.id)?.id).toBe(sample.id);
  });

  it("returns undefined for an unknown id", () => {
    expect(findEssayQuestion("sc", "sc-9999z-pm2-q9")).toBeUndefined();
    expect(findSCpm2Question("does-not-exist")).toBeUndefined();
  });
});

describe("getEssayQuestionByYearSeason / getSCpm2QuestionByYearSeason", () => {
  const sample = getSCpm2Questions()[0];

  it("matches on year + season + qNumber together", () => {
    const hit = getEssayQuestionByYearSeason(
      "sc",
      sample.year,
      sample.season,
      sample.qNumber,
    );
    expect(hit?.id).toBe(sample.id);
    expect(
      getSCpm2QuestionByYearSeason(sample.year, sample.season, sample.qNumber)?.id,
    ).toBe(sample.id);
  });

  it("returns undefined when any of the three keys disagrees", () => {
    expect(
      getEssayQuestionByYearSeason("sc", sample.year + 100, sample.season, sample.qNumber),
    ).toBeUndefined();
    const otherSeason = sample.season === "spring" ? "autumn" : "spring";
    expect(
      getEssayQuestionByYearSeason("sc", sample.year, otherSeason, sample.qNumber),
    ).toBeUndefined();
    expect(
      getEssayQuestionByYearSeason("sc", sample.year, sample.season, sample.qNumber + 999),
    ).toBeUndefined();
  });
});

describe("getIndustryEssay", () => {
  const sample = getSCpm2Questions()[0];

  it("returns the industry answer matching the given industryId", () => {
    const first = sample.industries[0];
    expect(getIndustryEssay(sample, first.industryId)?.industryId).toBe(
      first.industryId,
    );
  });

  it("returns undefined when the question has no answer for that industry", () => {
    const present = new Set(sample.industries.map((e) => e.industryId));
    const missing = (["it", "finance", "telecom", "public"] as const).find(
      (id) => !present.has(id),
    );
    // SC 問題は全業種を備えるため合成オブジェクトで「不在」契約を固定する。
    const synthetic: SCpm2Question = { ...sample, industries: [] };
    expect(getIndustryEssay(synthetic, missing ?? "it")).toBeUndefined();
  });
});

describe("parseYearSeason", () => {
  it("parses a well-formed year-season string", () => {
    expect(parseYearSeason("2024-spring")).toEqual({ year: 2024, season: "spring" });
    expect(parseYearSeason("2025-autumn")).toEqual({ year: 2025, season: "autumn" });
  });

  it("rejects malformed input (anchored, season-restricted)", () => {
    expect(parseYearSeason("2024-winter")).toBeNull(); // 季節は spring/autumn のみ
    expect(parseYearSeason("24-spring")).toBeNull(); // 4桁年のみ
    expect(parseYearSeason("2024-spring-extra")).toBeNull(); // 末尾アンカー
    expect(parseYearSeason("x2024-spring")).toBeNull(); // 先頭アンカー
    expect(parseYearSeason("")).toBeNull();
  });
});

describe("questionToUrlParts", () => {
  it("builds the URL segment parts for an SC question", () => {
    const q = getSCpm2Questions()[0];
    expect(questionToUrlParts(q, "sc")).toEqual({
      exam: "sc",
      yearSeason: `${q.year}-${q.season}`,
      section: "pm2",
      qnum: `q${q.qNumber}`,
    });
  });
});

// no-404 ラウンドトリップ: 一覧ページ (app/essays/[exam]/page.tsx) は
// questionToUrlParts でリンクを組み立て、詳細ページ
// (app/essays/[exam]/[yearSeason]/[section]/[qnum]/page.tsx, dynamicParams=false)
// は parseYearSeason と qnum 正規表現 /^q(\d+)$/ でパースして resolveQuestion で
// 元の問題を引き当てる。個別関数は上でピン済みだが、両者を繋ぐ「一覧リンクが
// 詳細の静的生成パラメータに必ず解決する（=404 を出さない）」契約は未固定だった。
// この正規表現は詳細ページにインライン複製されているため、ここで同じ式を持ち、
// ライブコーパス全件で往復が壊れないことを保証する。
describe("essays index→detail URL round-trip (no dead internal links)", () => {
  // 詳細ページ resolveQuestion 内の qnum パーサと同一の式。
  const QNUM_RE = /^q(\d+)$/;

  it("every SC question's link parts parse back to the same question", () => {
    const dead: string[] = [];
    for (const q of getSCpm2Questions()) {
      const parts = questionToUrlParts(q, "sc");

      // section は詳細ページが "pm2" 固定で照合する。
      if (parts.section !== "pm2") {
        dead.push(`${q.id}: section=${parts.section}`);
        continue;
      }

      const parsed = parseYearSeason(parts.yearSeason);
      if (!parsed) {
        dead.push(`${q.id}: yearSeason 解析不能 (${parts.yearSeason})`);
        continue;
      }

      const m = parts.qnum.match(QNUM_RE);
      if (!m) {
        dead.push(`${q.id}: qnum 解析不能 (${parts.qnum})`);
        continue;
      }
      const qNumber = parseInt(m[1], 10);

      // 詳細ページと同じ解決ロジック（year+season+qNumber 一致）で引き当てる。
      const resolved = getEssayQuestionByYearSeason(
        "sc",
        parsed.year,
        parsed.season,
        qNumber,
      );
      if (resolved?.id !== q.id) {
        dead.push(`${q.id}: 往復先=${resolved?.id ?? "なし"}`);
      }
    }
    expect(dead).toEqual([]);
  });

  it("link parts equal the detail page's generateStaticParams shape", () => {
    // 詳細ページ generateStaticParams は `${q.year}-${q.season}` / `q${q.qNumber}`
    // をインラインで組む。questionToUrlParts がその形と一致しなければ
    // dynamicParams=false 下で一覧リンクが 404 になる。
    for (const q of getSCpm2Questions()) {
      expect(questionToUrlParts(q, "sc")).toEqual({
        exam: "sc",
        yearSeason: `${q.year}-${q.season}`,
        section: "pm2",
        qnum: `q${q.qNumber}`,
      });
    }
  });

  // /essays インデックス (app/essays/page.tsx) は ESSAY_EXAM_CODES 全件を
  // 無条件に `/essays/{exam}` へリンクするが、詳細インデックス
  // (app/essays/[exam]/page.tsx) は questions.length===0 のとき notFound() する。
  // したがって「問題が 1 件もない試験区分」が ESSAY_EXAM_CODES に入ると、
  // インデックスから 404 への死リンク（かつ "0問" カード）が生まれる。
  // 現状は 6 区分すべてに答案があり latent だが、将来データ未整備の区分が
  // 追加された際に死リンクを出す前にここで気付けるよう固定する。
  it("every ESSAY_EXAM_CODES entry has at least one question (index links never 404)", () => {
    const empty = ESSAY_EXAM_CODES.filter(
      (exam) => getEssayQuestionsByExam(exam).length === 0,
    );
    expect(empty).toEqual([]);
  });
});
