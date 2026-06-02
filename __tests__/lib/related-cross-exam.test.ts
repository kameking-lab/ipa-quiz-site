import { describe, it, expect } from "vitest";
import type { Question, ExamCode, Session } from "@/lib/questions/types";
import {
  getCrossExamRelatedQuestions,
  getSameExamOtherYears,
  getSameExamRelatedQuestions,
  getSessionNeighbors,
} from "@/lib/questions/related";

// getCrossExamRelatedQuestions drives the「他試験区分の関連問題」rail on every
// /q/* page (the largest crawl surface). Two contracts matter for SEO link
// equity and for not shipping broken links:
//  1. topicTag mode ranks by shared-tag count, not ALL_QUESTIONS array order.
//  2. With tags unset corpus-wide it falls back to the AP/FE/IP/SG common-skill
//     category groups so the rail still emits cross-exam links — and it must
//     never link to needsReview (404) or placeholder targets.
// These tests fail if either contract regresses.

function q(partial: {
  id: string;
  exam: ExamCode;
  category?: string;
  topicTags?: string[];
  session?: Session;
  year?: number;
  qNumber?: number;
  needsReview?: boolean;
  explanation?: string;
}): Question {
  return {
    id: partial.id,
    exam: partial.exam,
    session: partial.session ?? "am",
    year: partial.year ?? 2024,
    season: "autumn",
    qNumber: partial.qNumber ?? 1,
    type: "multiple-choice",
    category: partial.category ?? "基礎理論",
    topicTags: partial.topicTags ?? [],
    difficulty: 3,
    question: "問題文",
    answer: "ア",
    explanation: partial.explanation ?? "きちんとした解説です。",
    hasImage: false,
    needsReview: partial.needsReview,
    sourcePdfUrl: "https://example.com/x.pdf",
    license: "IPA-public",
  };
}

describe("getCrossExamRelatedQuestions — topic mode", () => {
  const current = q({ id: "ap-self", exam: "ap", topicTags: ["A", "B", "C"] });

  it("ranks by shared-tag count, not array position (relevance-leak guard)", () => {
    const pool = [
      q({ id: "fe-weak", exam: "fe", topicTags: ["A"] }),
      q({ id: "fe-mid", exam: "fe", topicTags: ["A", "B"] }),
      q({ id: "sc-strong", exam: "sc", topicTags: ["A", "B", "C"] }),
    ];
    const { questions, mode } = getCrossExamRelatedQuestions(current, pool, 5);
    expect(mode).toBe("topic");
    expect(questions.map((r) => r.id)).toEqual(["sc-strong", "fe-mid", "fe-weak"]);
  });

  it("excludes self, same-exam, and non-linkable (needsReview/placeholder) targets", () => {
    const pool = [
      q({ id: "ap-self", exam: "ap", topicTags: ["A"] }), // self
      q({ id: "ap-sib", exam: "ap", topicTags: ["A"] }), // same exam
      q({ id: "fe-review", exam: "fe", topicTags: ["A"], needsReview: true }),
      q({ id: "fe-ph", exam: "fe", topicTags: ["A"], explanation: "正解はアです。" }),
      q({ id: "fe-ok", exam: "fe", topicTags: ["A"] }),
    ];
    const { questions } = getCrossExamRelatedQuestions(current, pool, 5);
    expect(questions.map((r) => r.id)).toEqual(["fe-ok"]);
  });
});

describe("getCrossExamRelatedQuestions — category-group fallback (tags unset)", () => {
  // AP「経営戦略」 maps to the ストラテジ group; FE/IP use 「ストラテジ」.
  const current = q({ id: "ap-self", exam: "ap", category: "経営戦略" });

  it("links one representative per shared-curriculum exam, newest first", () => {
    const pool = [
      q({ id: "fe-old", exam: "fe", category: "ストラテジ", year: 2022 }),
      q({ id: "fe-new", exam: "fe", category: "ストラテジ", year: 2024 }),
      q({ id: "ip-x", exam: "ip", category: "ストラテジ", year: 2023 }),
      q({ id: "sc-off", exam: "sc", category: "経営戦略", year: 2024 }), // not in group
    ];
    const { questions, mode } = getCrossExamRelatedQuestions(current, pool, 5);
    expect(mode).toBe("category");
    // one per exam (newest fe rep), sc excluded (not a common-curriculum exam)
    expect(questions.map((r) => r.id)).toEqual(["fe-new", "ip-x"]);
  });

  it("never links needsReview/placeholder targets in fallback mode", () => {
    const pool = [
      q({ id: "fe-review", exam: "fe", category: "ストラテジ", needsReview: true }),
      q({ id: "fe-ph", exam: "fe", category: "ストラテジ", explanation: "正解はイです。" }),
      q({ id: "ip-ok", exam: "ip", category: "ストラテジ" }),
    ];
    const { questions } = getCrossExamRelatedQuestions(current, pool, 5);
    expect(questions.map((r) => r.id)).toEqual(["ip-ok"]);
  });

  it("returns empty for non-common-curriculum exams (e.g. high-level)", () => {
    const highLevel = q({ id: "nw-self", exam: "nw", category: "ネットワーク" });
    const pool = [q({ id: "ap-x", exam: "ap", category: "ネットワーク" })];
    const { questions } = getCrossExamRelatedQuestions(highLevel, pool, 5);
    expect(questions).toEqual([]);
  });

  it("only matches morning knowledge questions, not afternoon", () => {
    const pmCurrent = q({ id: "ap-pm", exam: "ap", category: "経営戦略", session: "pm" });
    const pool = [q({ id: "fe-x", exam: "fe", category: "ストラテジ" })];
    expect(getCrossExamRelatedQuestions(pmCurrent, pool, 5).questions).toEqual([]);
  });
});

// The same-exam rails (「関連する問題」「他年度の…問題」) historically did NOT
// filter targets, so they shipped 106 dead 404 links (needsReview) + ~14k
// noindex (placeholder) links corpus-wide. These guard that both rails now link
// to linkable targets only — and that excluded slots refill with real questions.
describe("getSameExamRelatedQuestions", () => {
  const current = q({ id: "ap-self", exam: "ap", category: "基礎理論" });

  it("excludes self, other categories, and non-linkable targets; refills the slot", () => {
    const pool = [
      q({ id: "ap-self", exam: "ap", category: "基礎理論" }), // self
      q({ id: "ap-review", exam: "ap", category: "基礎理論", needsReview: true }), // 404
      q({ id: "ap-ph", exam: "ap", category: "基礎理論", explanation: "正解はアです。" }), // noindex
      q({ id: "ap-other", exam: "ap", category: "ネットワーク" }), // different category
      q({ id: "ap-ok1", exam: "ap", category: "基礎理論" }),
      q({ id: "ap-ok2", exam: "ap", category: "基礎理論" }),
    ];
    expect(getSameExamRelatedQuestions(current, pool, 5).map((r) => r.id)).toEqual([
      "ap-ok1",
      "ap-ok2",
    ]);
  });
});

describe("getSameExamOtherYears", () => {
  const current = q({ id: "ap-self", exam: "ap", category: "基礎理論", year: 2025 });

  it("one linkable representative per year, newest first, excluding current year", () => {
    const pool = [
      q({ id: "ap-self", exam: "ap", category: "基礎理論", year: 2025 }), // current year
      q({ id: "ap-2025b", exam: "ap", category: "基礎理論", year: 2025 }), // current year
      q({ id: "ap-2023", exam: "ap", category: "基礎理論", year: 2023 }),
      q({ id: "ap-2024-review", exam: "ap", category: "基礎理論", year: 2024, needsReview: true }),
      q({ id: "ap-2024-ok", exam: "ap", category: "基礎理論", year: 2024 }), // refills past the 404
    ];
    expect(getSameExamOtherYears(current, pool, 5).map((r) => r.id)).toEqual([
      "ap-2024-ok",
      "ap-2023",
    ]);
  });
});

describe("getSessionNeighbors", () => {
  const pool = [
    q({ id: "ap-q1", exam: "ap", qNumber: 1 }),
    q({ id: "ap-q2", exam: "ap", qNumber: 2 }),
    q({ id: "ap-q3", exam: "ap", qNumber: 3, needsReview: true }), // 404 page
    q({ id: "ap-q4", exam: "ap", qNumber: 4 }),
    // different session — must not bleed into neighbors
    q({ id: "ap-am2-q1", exam: "ap", session: "am2", qNumber: 1 }),
  ];

  it("skips needsReview questions so prev/next never point at a 404", () => {
    const onQ2 = getSessionNeighbors(q({ id: "ap-q2", exam: "ap", qNumber: 2 }), pool);
    expect(onQ2.prev?.id).toBe("ap-q1");
    expect(onQ2.next?.id).toBe("ap-q4"); // q3 (needsReview) skipped

    const onQ4 = getSessionNeighbors(q({ id: "ap-q4", exam: "ap", qNumber: 4 }), pool);
    expect(onQ4.prev?.id).toBe("ap-q2"); // q3 skipped
    expect(onQ4.next).toBeNull();
  });

  it("stays within the same year/season/session", () => {
    const onAm2 = getSessionNeighbors(
      q({ id: "ap-am2-q1", exam: "ap", session: "am2", qNumber: 1 }),
      pool,
    );
    expect(onAm2.prev).toBeNull();
    expect(onAm2.next).toBeNull();
  });
});
