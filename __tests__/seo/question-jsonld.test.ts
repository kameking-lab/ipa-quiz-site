import { describe, expect, it } from "vitest";

import { buildQuestionJsonLd, sessionLabel } from "@/lib/seo/question-jsonld";
import type { Question, Session } from "@/lib/questions/types";

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
  it("models an editorial problem as a LearningResource, never a QAPage", () => {
    const graph = build()["@graph"];
    const types = graph.map((node) => (node as { "@type": string })["@type"]);
    expect(types).toEqual(["LearningResource", "BreadcrumbList"]);
    expect(types).not.toContain("QAPage");
  });

  it("nests the real Question and only its published accepted answer", () => {
    const resource = build()["@graph"][0] as {
      hasPart: {
        "@type": string;
        answerCount?: number;
        suggestedAnswer?: unknown;
        acceptedAnswer: { "@type": string; text: string; url: string };
      };
    };
    expect(resource.hasPart["@type"]).toBe("Question");
    expect(resource.hasPart.acceptedAnswer).toMatchObject({
      "@type": "Answer",
      text: "ウ: 選択肢C",
      url: "https://www.kakomon-ai.jp/q/ap/2024-spring/am/q1#explanation",
    });
    expect(resource.hasPart.suggestedAnswer).toBeUndefined();
    expect(resource.hasPart.answerCount).toBeUndefined();
  });

  it("keeps dates, authorship and publisher metadata on the resource", () => {
    const resource = build()["@graph"][0] as {
      dateModified: string;
      publisher: { "@id": string; name?: string; url?: string };
      hasPart: {
        author: { name: string };
        datePublished?: string;
        dateCreated?: string;
        acceptedAnswer: {
          author: { name: string };
          datePublished: string;
          upvoteCount: number;
        };
      };
    };
    expect(resource.dateModified).toBe("2026-05-23T00:00:00+09:00");
    expect(resource.publisher["@id"]).toMatch(/#organization$/);
    expect(resource.publisher.name).toBe("過去問AI");
    expect(resource.publisher.url).toMatch(/^https?:\/\//);
    expect(resource.hasPart.author.name).toBe("情報処理推進機構 (IPA)");
    expect(resource.hasPart.datePublished).toBeUndefined();
    expect(resource.hasPart.dateCreated).toBeUndefined();
    expect(resource.hasPart.acceptedAnswer.author.name).toBe("過去問AI");
    expect(resource.hasPart.acceptedAnswer.datePublished).toBe("2026-05-23T00:00:00+09:00");
    expect(resource.hasPart.acceptedAnswer.upvoteCount).toBe(0);
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

  it("maps every Session union member to a real label", () => {
    const SESSION_PRESENCE: Record<Session, true> = {
      am: true,
      am1: true,
      am2: true,
      pm: true,
      pm1: true,
      pm2: true,
      "kamoku-a": true,
      "kamoku-b": true,
      gakka: true,
          riron: true,
          denryoku: true,
          kikai: true,
          houki: true,
      "mondai-a": true,
      "mondai-b": true,
    };
    for (const session of Object.keys(SESSION_PRESENCE) as Session[]) {
      expect(sessionLabel(session)).not.toBe(session.toUpperCase());
    }
  });
});
