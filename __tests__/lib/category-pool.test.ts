import { describe, it, expect } from "vitest";
import type { Question, Session, ExamCode, QuestionType } from "@/lib/questions/types";
import {
  countApTopicGroups,
  resolveApTopicGroup,
  AP_GROUP_EXAMS,
} from "@/lib/questions/category-pool";

// countApTopicGroups は /modes/topic で AP/FE/IP/SG を横断した分野別プールの
// 出題数（ユーザーに見える母数）を駆動する。14k問超がこの session ホワイトリスト
// （am/am1/am2/kamoku-a の午前知識問題のみ・pm/kamoku-b は意図的除外）を通る。
// 将来 session フィルタを壊して数千問を取りこぼす回帰を CI が捕捉できるよう契約を固定。

function q(
  partial: {
    exam: ExamCode;
    category: string;
    session?: Session;
    type?: QuestionType;
  } & { id: string },
): Question {
  return {
    id: partial.id,
    exam: partial.exam,
    session: partial.session ?? "am",
    year: 2024,
    season: "autumn",
    qNumber: 1,
    type: partial.type ?? "multiple-choice",
    category: partial.category,
    topicTags: [],
    difficulty: 3,
    question: "問題文",
    answer: "ア",
    explanation: "解説",
    hasImage: false,
    sourcePdfUrl: "https://example.com/x.pdf",
    license: "IPA-public",
  };
}

describe("countApTopicGroups — session whitelist", () => {
  it("counts am/am1/am2/kamoku-a morning sessions", () => {
    const groups = countApTopicGroups([
      q({ id: "1", exam: "ap", category: "基礎理論", session: "am" }),
      q({ id: "2", exam: "fe", category: "基礎理論", session: "am1" }),
      q({ id: "3", exam: "fe", category: "基礎理論", session: "am2" }),
      q({ id: "4", exam: "sg", category: "セキュリティ", session: "kamoku-a" }),
    ]);
    const kiso = groups.find((g) => g.label === "基礎理論")!;
    expect(kiso.count).toBe(3);
    const sec = groups.find((g) => g.label === "セキュリティ")!;
    expect(sec.count).toBe(1);
  });

  it("excludes afternoon (pm) and kamoku-b sessions", () => {
    const groups = countApTopicGroups([
      q({ id: "1", exam: "ap", category: "基礎理論", session: "pm" }),
      q({ id: "2", exam: "fe", category: "基礎理論", session: "kamoku-b" }),
    ]);
    expect(groups.find((g) => g.label === "基礎理論")).toBeUndefined();
  });

  it("excludes non multiple-choice questions", () => {
    const groups = countApTopicGroups([
      q({ id: "1", exam: "ap", category: "基礎理論", type: "descriptive" }),
    ]);
    expect(groups).toEqual([]);
  });
});

describe("countApTopicGroups — cross-exam union", () => {
  it("sums synonym categories across exams into one group with a byExam breakdown", () => {
    const groups = countApTopicGroups([
      q({ id: "1", exam: "ap", category: "コンピュータシステム" }),
      q({ id: "2", exam: "ip", category: "コンピュータシステム" }),
      q({ id: "3", exam: "ip", category: "テクノロジ" }), // ip synonym for the same group
    ]);
    const cs = groups.find((g) => g.label === "コンピュータシステム")!;
    expect(cs.count).toBe(3);
    expect(cs.byExam.ap).toBe(1);
    expect(cs.byExam.ip).toBe(2);
    expect(cs.examGroup).toEqual(AP_GROUP_EXAMS);
  });

  it("drops zero-count groups and sorts by count desc", () => {
    const groups = countApTopicGroups([
      q({ id: "1", exam: "ap", category: "ネットワーク" }),
      q({ id: "2", exam: "ap", category: "ネットワーク" }),
      q({ id: "3", exam: "ap", category: "データベース" }),
    ]);
    expect(groups.map((g) => g.label)).toEqual(["ネットワーク", "データベース"]);
  });
});

describe("resolveApTopicGroup", () => {
  it("returns the deduped category union for a known label", () => {
    const r = resolveApTopicGroup("コンピュータシステム")!;
    expect(r.examGroup).toEqual(AP_GROUP_EXAMS);
    expect(r.categories).toContain("コンピュータシステム");
    expect(r.categories).toContain("テクノロジ");
    // deduped: コンピュータシステム appears in ap/fe/ip but only once
    expect(r.categories.filter((c) => c === "コンピュータシステム")).toHaveLength(1);
  });

  it("returns null for an unknown label", () => {
    expect(resolveApTopicGroup("存在しない分野")).toBeNull();
  });
});
