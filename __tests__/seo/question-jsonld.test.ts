import { describe, expect, it } from "vitest";

import { buildQuestionJsonLd, sessionLabel } from "@/lib/seo/question-jsonld";
import type { Question } from "@/lib/questions/types";

const baseQuestion: Question = {
  id: "ap-2024s-am-q1",
  exam: "ap",
  session: "am",
  year: 2024,
  season: "spring",
  qNumber: 1,
  type: "multiple-choice",
  category: "基礎理論",
  topicTags: ["情報量・符号化"],
  difficulty: 3,
  question: "可変長符号化に関する説明として適切なものはどれか。",
  choices: { ア: "選択肢A", イ: "選択肢B", ウ: "選択肢C", エ: "選択肢D" },
  answer: "ウ",
  explanation: "可変長符号化は出現頻度の高いシンボルに短い符号を割り当てる。",
  hasImage: false,
  sourcePdfUrl: "https://www.ipa.go.jp/example.pdf",
  license: "IPA-public",
};

function build(q: Question = baseQuestion) {
  return buildQuestionJsonLd({
    question: q,
    pageUrlAbs: "https://www.kakomon-ai.jp/q/ap/2024-spring/am/q1",
    title: "テストタイトル",
    lastUpdatedISO: "2026-05-23",
  });
}

describe("buildQuestionJsonLd", () => {
  it("emits exactly QAPage, LearningResource, and BreadcrumbList (no Quiz)", () => {
    const graph = build()["@graph"];
    const types = graph.map((n) => (n as { "@type": string })["@type"]);
    expect(types).toEqual(["QAPage", "LearningResource", "BreadcrumbList"]);
    expect(types).not.toContain("Quiz");
  });

  it("does not list the accepted answer inside suggestedAnswer", () => {
    const graph = build()["@graph"];
    const qapage = graph[0] as {
      mainEntity: {
        acceptedAnswer: { text: string };
        suggestedAnswer: { text: string }[];
      };
    };
    expect(qapage.mainEntity.acceptedAnswer.text).toBe("ウ: 選択肢C");

    const suggested = qapage.mainEntity.suggestedAnswer.map((a) => a.text);
    // The correct choice (ウ) must be excluded; the other three remain.
    expect(suggested).toHaveLength(3);
    expect(suggested.some((t) => t.startsWith("ウ:"))).toBe(false);
    expect(suggested).toContain("ア: 選択肢A");
  });

  it("omits suggestedAnswer when there are no other choices", () => {
    const single: Question = { ...baseQuestion, choices: { ウ: "選択肢C" } };
    const qapage = build(single)["@graph"][0] as {
      mainEntity: Record<string, unknown>;
    };
    expect(qapage.mainEntity.suggestedAnswer).toBeUndefined();
  });

  it("carries dateModified on the QAPage node", () => {
    const qapage = build()["@graph"][0] as { dateModified: string };
    expect(qapage.dateModified).toBe("2026-05-23");
  });
});

describe("sessionLabel", () => {
  it("maps known sessions to Japanese labels", () => {
    expect(sessionLabel("am")).toBe("午前");
    expect(sessionLabel("am2")).toBe("午前II");
    expect(sessionLabel("kamoku-b")).toBe("科目B");
  });

  it("falls back to upper-cased input for unknown sessions", () => {
    expect(sessionLabel("xyz")).toBe("XYZ");
  });
});
