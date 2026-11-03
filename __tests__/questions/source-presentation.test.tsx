import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import type { Question } from "@/lib/questions/types";
import { QuestionSourcePresentation } from "@/components/quiz/QuestionSourcePresentation";
import { practiceSessionLabel } from "@/lib/questions/practice-session";
import { buildQuestionJsonLd, sessionLabel } from "@/lib/seo/question-jsonld";
import { SITE_NAME } from "@/lib/seo/config";

const sentinel = {
  id: "sentinel-display-only",
  exam: "josanshi",
  sourcePdfUrl: "https://example.invalid/question.pdf",
  sourceAnswerUrl: "https://example.invalid/answer.pdf",
  originalContent: {
    body: "本文末尾の条件まで表示",
    choices: { ア: "第一の選択肢", イ: "第二の選択肢" },
    sharedPassages: [{ label: "共通設例", text: "設例の全行" }],
    tables: [{ caption: "数量表", rows: [["区分", "数値"], ["A", "123"]] }],
    postOptionNote: "選択肢後の注記",
  },
  sourcePresentation: {
    documentTitle: "架空の問題紙",
    originalAuthor: "架空の原作成者",
    processor: "架空の加工者",
    termsUrl: "https://example.invalid/terms",
    licenseUrl: "https://example.invalid/pdl",
    processedParts: ["文字起こし", "表の構造化"],
  },
  questionNotice: "設問の適用範囲に注意",
  explanationSections: [{ label: "命題の検討", text: "選択肢とは独立した説明" }],
} as unknown as Question;

describe("original source presentation", () => {
  it("shows the shared stimulus, full source fields and attribution before answering", () => {
    const html = renderToStaticMarkup(<QuestionSourcePresentation question={sentinel} phase="before" />);
    for (const text of ["共通設例", "設例の全行", "数量表", "123", "本文末尾の条件まで表示", "第一の選択肢", "第二の選択肢", "選択肢後の注記", "架空の原作成者", "架空の加工者", "文字起こし", "公共データ利用規約（PDL）", "設問の適用範囲に注意"]) {
      expect(html).toContain(text);
    }
    expect(html).toContain("<details");
    expect(html).toContain('<dt class="font-semibold">1</dt>');
    expect(html).toContain('<dt class="font-semibold">2</dt>');
    expect(html).not.toContain('<dt class="font-semibold">ア</dt>');
    expect(html).toContain('href="https://example.invalid/question.pdf"');
    expect(html).toContain('href="https://example.invalid/answer.pdf"');
    expect(html).toContain("問題PDF");
    expect(html).toContain("公式正答PDF");
    expect(html).not.toContain("命題の検討");
  });

  it("shows every explanation section and repeats the notice after answering", () => {
    const html = renderToStaticMarkup(<QuestionSourcePresentation question={sentinel} phase="after" />);
    expect(html).toContain("命題の検討");
    expect(html).toContain("選択肢とは独立した説明");
    expect(html).toContain("設問の適用範囲に注意");
    expect(html).toContain("政府機関が作成したものではありません");
    expect(html).not.toContain("第一の選択肢");
  });

  it("keeps legacy questions untouched and suppresses unsafe links", () => {
    expect(renderToStaticMarkup(<QuestionSourcePresentation question={{} as Question} phase="before" />)).toBe("");
    const unsafe = {
      ...sentinel,
      sourcePdfUrl: "javascript:alert(1)",
      sourceAnswerUrl: "http://example.invalid/answer.pdf",
      sourcePresentation: { ...sentinel.sourcePresentation, termsUrl: "javascript:alert(1)", licenseUrl: "http://example.invalid/pdl" },
    } as Question;
    const html = renderToStaticMarkup(<QuestionSourcePresentation question={unsafe} phase="before" />);
    expect(html).not.toContain("href=");
  });
});

describe("exam-aware public labels and source authorship", () => {
  it("separates the shared session keys by exam", () => {
    expect(practiceSessionLabel("kigyo", "kaikeishi")).toBe("企業法");
    expect(practiceSessionLabel("zaimu", "kaikeishi")).toBe("財務会計論");
    expect(practiceSessionLabel("kigyo", "chusho-kigyo-shindanshi")).not.toBe("企業法");
    expect(sessionLabel("kigyo", "kaikeishi")).toBe("企業法");
    expect(sessionLabel("zaimu", "kaikeishi")).toBe("財務会計論");
  });

  it("attributes original questions to their agency and the learning resource to this site", () => {
    for (const [exam, author] of [["kanteishi", "国土交通省"], ["kaikeishi", "公認会計士・監査審査会"]] as const) {
      const question = {
        exam, id: `sentinel-${exam}`, year: 2026, season: "round1", session: "kigyo", qNumber: 1,
        type: "single", answer: "ア", question: "架空の設問", choices: { ア: "架空の選択肢" },
        category: "架空の分野", topicTags: [], sourcePdfUrl: "https://example.invalid/question.pdf",
        sourcePresentation: { ...sentinel.sourcePresentation, originalAuthor: author },
      } as unknown as Question;
      const graph = buildQuestionJsonLd({ question, pageUrlAbs: `https://example.invalid/q/${exam}`, title: "架空の問題", lastUpdatedISO: "2026-01-01" });
      const resource = graph["@graph"][0] as { creator: { name: string }; hasPart: { author: { name: string } } };
      expect(resource.hasPart.author.name).toBe(author);
      expect(resource.creator.name).toBe(SITE_NAME);
    }
  });
});
