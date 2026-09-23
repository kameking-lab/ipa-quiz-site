import { describe, expect, it } from "vitest";

import { DENKEN3_QUESTIONS } from "@/data/questions/denken3";
import { FP3_QUESTIONS } from "@/data/questions/fp3";
import { getOfficialAnswerPdfUrl } from "@/lib/exam-config";
import { getChoiceKeys } from "@/lib/questions/answers";
import { shuffleChoices } from "@/lib/questions/filter";
import type { ChoiceKey } from "@/lib/questions/types";
import { buildQuestionJsonLd } from "@/lib/seo/question-jsonld";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";

const EXTERNAL_QUESTIONS = [...FP3_QUESTIONS, ...DENKEN3_QUESTIONS];

describe("official-source qualification pilot data", () => {
  it("contains only the seven transcribed pilot questions", () => {
    expect(FP3_QUESTIONS).toHaveLength(5);
    expect(DENKEN3_QUESTIONS).toHaveLength(2);
  });

  it("keeps Denken3 behind the notification-required publication gate", () => {
    expect(getQualificationByExamCode("denken3")?.status).toBe("notification-required");
    expect(QUESTIONS_BY_EXAM.denken3).toBeUndefined();
    expect(QUESTIONS_BY_EXAM.fp3).toHaveLength(5);
  });

  it.each(EXTERNAL_QUESTIONS)("$id has 3–5 choices, one explanation per choice, and a valid answer", (q) => {
    const choiceKeys = getChoiceKeys(q.choices);
    const explanationKeys = Object.keys(q.choiceExplanations ?? {}).sort();

    expect(choiceKeys.length).toBeGreaterThanOrEqual(3);
    expect(choiceKeys.length).toBeLessThanOrEqual(5);
    expect(explanationKeys).toEqual([...choiceKeys].sort());
    expect(choiceKeys).toContain(q.answer);
    expect(q.sourcePdfUrl).toMatch(/^https:\/\//);
    expect(q.sourceAnswerUrl).toMatch(/^https:\/\//);
    expect(q.sourceAttribution).toMatch(/^出典：/);
    expect(q.officialReferenceUrls?.every((url) => url.startsWith("https://"))).toBe(true);
  });

  it("uses the explicit official answer PDF URL when question and answer files differ", () => {
    const q = DENKEN3_QUESTIONS[0]!;
    expect(getOfficialAnswerPdfUrl(q.sourcePdfUrl, q.sourceAnswerUrl)).toBe(q.sourceAnswerUrl);
    expect(q.sourceAnswerUrl).not.toBe(q.sourcePdfUrl);
  });

  it.each([
    [FP3_QUESTIONS[0]!, "日本ファイナンシャル・プランナーズ協会", "exam_riyou.pdf"],
    [DENKEN3_QUESTIONS[0]!, "一般財団法人 電気技術者試験センター", "faq08/000082.html"],
  ] as const)("$0.id identifies the official author and reuse terms in JSON-LD", (q, author, license) => {
    const graph = buildQuestionJsonLd({
      question: q,
      pageUrlAbs: `https://www.kakomon-ai.jp/q/${q.id}`,
      title: q.id,
      lastUpdatedISO: q.lastUpdated!,
    })["@graph"] as Array<Record<string, unknown>>;
    const resource = graph.find((node) => node["@type"] === "LearningResource")!;
    const entity = resource.hasPart as { author: { name: string } };

    expect(entity.author.name).toBe(author);
    expect(String(resource.license)).toContain(license);
  });

  it.each([FP3_QUESTIONS[0]!, DENKEN3_QUESTIONS[0]!])(
    "$id keeps answer text and each-choice explanations aligned after shuffling",
    (q) => {
      const originalAnswer = (Array.isArray(q.answer) ? q.answer[0]! : q.answer) as ChoiceKey;
      const correctText = q.choices?.[originalAnswer];
      const explanationByText = new Map(
        getChoiceKeys(q.choices).map((key) => [q.choices?.[key], q.choiceExplanations?.[key]]),
      );

      const shuffled = shuffleChoices(q);
      const shuffledAnswer = (Array.isArray(shuffled.answer) ? shuffled.answer[0]! : shuffled.answer) as ChoiceKey;
      expect(shuffled.choices?.[shuffledAnswer]).toBe(correctText);
      for (const key of getChoiceKeys(shuffled.choices)) {
        expect(shuffled.choiceExplanations?.[key]).toBe(explanationByText.get(shuffled.choices?.[key]));
      }
    },
  );
});
