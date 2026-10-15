import { describe, expect, it } from "vitest";

import { buildQuestionJsonLd, sessionLabel } from "@/lib/seo/question-jsonld";
import type { Question, Session } from "@/lib/questions/types";
import { SHIKA_ISHI_QUESTIONS } from "@/data/questions/shika-ishi";
import { JUDO_SEIFUKUSHI_QUESTIONS } from "@/data/questions/judo-seifukushi";

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
  it("attributes a published dental question to MHLW without an IPA license URL", () => {
    const dental = SHIKA_ISHI_QUESTIONS[0];
    if (!dental) throw new Error("Missing published dental question");
    const resource = buildQuestionJsonLd({
      question: dental,
      pageUrlAbs: "https://www.kakomon-ai.jp/q/" + dental.exam + "/" + dental.year + "-" + dental.season + "/" + dental.session + "/q" + dental.qNumber,
      title: "Dental exam question",
      lastUpdatedISO: "2026-10-11",
    })["@graph"][0] as {
      hasPart: { author: { name: string; url: string } };
      license?: string;
    };
    expect(resource.hasPart.author).toMatchObject({
      name: "厚生労働省",
      url: "https://www.mhlw.go.jp/",
    });
    expect(resource.license).toBeUndefined();
    expect(JSON.stringify(resource)).not.toContain("https://www.ipa.go.jp/shiken/faq.html");
  });
  it("attributes a published judo question to ZAIJUSEI without inventing a license", () => {
    const judo = JUDO_SEIFUKUSHI_QUESTIONS[0];
    if (!judo) throw new Error("Missing published judo question");
    const resource = buildQuestionJsonLd({
      question: judo,
      pageUrlAbs: `https://www.kakomon-ai.jp/q/${judo.exam}/${judo.year}-${judo.season}/${judo.session}/q${judo.qNumber}`,
      title: "Judo exam question",
      lastUpdatedISO: "2026-10-11",
    })["@graph"][0] as {
      hasPart: { author: { name: string; url: string } };
      creator: { name: string; url: string };
      license?: string;
    };
    const expectedAuthor = {
      name: "公益財団法人柔道整復研修試験財団",
      url: "https://www.zaijusei.com/",
    };
    expect(resource.hasPart.author).toMatchObject(expectedAuthor);
    expect(resource.creator).toMatchObject(expectedAuthor);
    expect(resource.license).toBeUndefined();
    expect(JSON.stringify(resource)).not.toContain("https://www.ipa.go.jp/shiken/faq.html");
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
      rousai: true,
      koyou: true,
      kenpo: true,
      kounen: true,
      kokunen: true,
      ippan: true,
      sentaku: true,
      required: true,
      theory: true,
      practical: true,
          riron: true,
          denryoku: true,
          kikai: true,
          houki: true,
          kogaku: true,
      kiso: true,
      "kogaku-a": true,
      "kogaku-b": true,
      "mondai-a": true,
      "mondai-b": true,
      "mondai-c": true,
      "mondai-d": true,
          kyotsu: true,
          senmon: true,
          "hoiku-genri": true,
          "kyoiku-genri": true,
          "shakaiteki-yougo": true,
          "kodomo-katei-fukushi": true,
          "shakai-fukushi": true,
          "hoiku-shinrigaku": true,
          "kodomo-hoken": true,
          "kodomo-shokueiyou": true,
          "hoiku-jisshu-riron": true,
      keizai: true,
      zaimu: true,
      kigyo: true,
      unei: true,
      "keiei-houmu": true,
      "keiei-joho": true,
      "chusho-seisaku": true,
    };
    for (const session of Object.keys(SESSION_PRESENCE) as Session[]) {
      expect(sessionLabel(session)).not.toBe(session.toUpperCase());
    }
  });
});
