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

  it("carries a timezone-qualified dateModified on the QAPage node", () => {
    const qapage = build()["@graph"][0] as { dateModified: string };
    expect(qapage.dateModified).toBe("2026-05-23T00:00:00+09:00");
  });
});

// Google Q&A rich-result compliance — the critical error (missing answerCount)
// plus the recommended-field warnings (author / datePublished / upvoteCount /
// url) on the Question and every Answer (phase 14 / 致命傷⑥).
describe("buildQuestionJsonLd — Q&A rich-result compliance", () => {
  type Answer = {
    "@type": "Answer";
    text: string;
    url?: string;
    author?: { "@type": string; name: string; url: string };
    datePublished?: string;
    upvoteCount?: number;
  };
  type QuestionNode = {
    answerCount?: number;
    author?: { "@type": string; name: string; url: string };
    datePublished?: string;
    dateCreated?: string;
    upvoteCount?: number;
    url?: string;
    acceptedAnswer: Answer;
    suggestedAnswer?: Answer[];
  };

  const question = () =>
    (build()["@graph"][0] as { mainEntity: QuestionNode }).mainEntity;

  it("sets the required answerCount = correct + distractors", () => {
    expect(question().answerCount).toBe(4); // 1 accepted + 3 suggested
  });

  it("answerCount is 1 when the question has only the correct choice", () => {
    const single: Question = { ...baseQuestion, choices: { ウ: "選択肢C" } };
    const q = (build(single)["@graph"][0] as { mainEntity: QuestionNode }).mainEntity;
    expect(q.answerCount).toBe(1);
    expect(q.suggestedAnswer).toBeUndefined();
  });

  it("the Question carries every recommended field (clears the warnings)", () => {
    const q = question();
    expect(q.author).toMatchObject({ "@type": "Organization", name: "情報処理推進機構 (IPA)" });
    expect(q.upvoteCount).toBe(0);
    expect(q.url).toBe("https://www.kakomon-ai.jp/q/ap/2024-spring/am/q1");
    // datePublished/dateCreated are timezone-qualified ISO 8601 datetimes
    // anchored to the exam year (clears Google's "no timezone" warnings).
    expect(q.datePublished).toMatch(/^2024-\d{2}-\d{2}T00:00:00\+09:00$/);
    expect(q.dateCreated).toBe(q.datePublished);
  });

  it("the accepted answer carries author/date/upvote and links to #explanation", () => {
    const a = question().acceptedAnswer;
    expect(a.url).toBe("https://www.kakomon-ai.jp/q/ap/2024-spring/am/q1#explanation");
    expect(a.author).toMatchObject({ "@type": "Organization", name: "過去問AI" });
    expect(a.datePublished).toBe("2026-05-23T00:00:00+09:00");
    expect(a.upvoteCount).toBe(0);
  });

  it("every suggested answer also carries the recommended fields", () => {
    const suggested = question().suggestedAnswer ?? [];
    expect(suggested).toHaveLength(3);
    for (const a of suggested) {
      expect(typeof a.url).toBe("string");
      expect(a.author).toMatchObject({ "@type": "Organization", name: "過去問AI" });
      expect(a.datePublished).toBe("2026-05-23T00:00:00+09:00");
      expect(a.upvoteCount).toBe(0);
    }
  });

  it("no Question/Answer recommended field is left undefined (zero-warning guard)", () => {
    const q = question();
    const required = (a: Answer) =>
      [a.text, a.url, a.author, a.datePublished, a.upvoteCount].every(
        (v) => v !== undefined && v !== null,
      );
    expect(required(q.acceptedAnswer)).toBe(true);
    for (const a of q.suggestedAnswer ?? []) expect(required(a)).toBe(true);
    for (const v of [q.answerCount, q.author, q.datePublished, q.dateCreated, q.upvoteCount, q.url]) {
      expect(v).not.toBeUndefined();
    }
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
