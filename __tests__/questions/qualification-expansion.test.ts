import { describe, expect, it, vi } from "vitest";

import { DENKEN3_QUESTIONS } from "@/data/questions/denken3";
import { FP2_2026_MAY_QUESTIONS, FP2_QUESTIONS } from "@/data/questions/fp2";
import { FP3_QUESTIONS } from "@/data/questions/fp3";
import { DENKO2_2026_PILOT, DENKO2_QUESTIONS } from "@/data/questions/denko2";
import { getOfficialAnswerPdfUrl } from "@/lib/exam-config";
import { getChoiceKeys } from "@/lib/questions/answers";
import { shuffleChoices } from "@/lib/questions/filter";
import { hasUnrenderableContent } from "@/lib/questions/content-quality";
import type { ChoiceKey } from "@/lib/questions/types";
import { buildQuestionJsonLd } from "@/lib/seo/question-jsonld";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";

const EXTERNAL_QUESTIONS = [...FP2_QUESTIONS, ...FP3_QUESTIONS, ...DENKEN3_QUESTIONS, ...DENKO2_QUESTIONS];
const FP2_PILOT = FP2_QUESTIONS.filter((q) => q.year === 2026);

describe("official-source qualification pilot data", () => {
  it("contains the transcribed FP sets and the complete gated electrician academic papers", () => {
    expect(FP2_QUESTIONS).toHaveLength(240 + FP2_2026_MAY_QUESTIONS.length);
    expect(FP2_PILOT).toEqual(FP2_2026_MAY_QUESTIONS);
    expect(FP2_PILOT.length).toBeGreaterThanOrEqual(10);
    expect(FP3_QUESTIONS).toHaveLength(120);
    expect(DENKEN3_QUESTIONS).toHaveLength(320);
    expect(DENKO2_QUESTIONS).toHaveLength(200);
  });

  it("publishes complete Denken3 and electrician papers", () => {
    expect(getQualificationByExamCode("denken3")?.status).toBe("live");
    expect(QUESTIONS_BY_EXAM.denken3).toHaveLength(320);
    expect(getQualificationByExamCode("denko2")?.status).toBe("live");
    expect(QUESTIONS_BY_EXAM.denko2).toHaveLength(200);
    expect(QUESTIONS_BY_EXAM.fp2).toHaveLength(240 + FP2_2026_MAY_QUESTIONS.length);
    expect(QUESTIONS_BY_EXAM.fp3).toHaveLength(120);
  });

  it.each(EXTERNAL_QUESTIONS)("$id has 2–5 choices, one explanation per choice, and a valid answer", (q) => {
    const choiceKeys = getChoiceKeys(q.choices);
    const explanationKeys = Object.keys(q.choiceExplanations ?? {}).sort();

    expect(choiceKeys.length).toBeGreaterThanOrEqual(2);
    expect(choiceKeys.length).toBeLessThanOrEqual(5);
    if (q.explanationCoverage === "official-summary") {
      expect(q.exam).toBe("denken3");
      expect(explanationKeys).toEqual([]);
    } else {
      expect(explanationKeys).toEqual([...choiceKeys].sort());
    }
    expect(choiceKeys).toContain(q.answer);
    expect(q.sourcePdfUrl).toMatch(/^https:\/\//);
    expect(q.sourceAnswerUrl).toMatch(/^https:\/\//);
    expect(q.sourceAttribution).toMatch(/^出典：/);
    expect((q.officialReferenceUrls ?? []).every((url) => url.startsWith("https://"))).toBe(true);
  });

  it("keeps FP2 explanation sources government-only and separates the mathematical question's source PDF", () => {
    expect(FP2_PILOT[0]!.officialReferenceUrls ?? []).toHaveLength(0);
    expect(FP2_PILOT[0]!.sourcePdfUrl).toContain("jafp.or.jp");
    for (const q of FP2_PILOT.slice(1, 10)) {
      expect(q.officialReferenceUrls?.length).toBeGreaterThan(0);
      for (const url of q.officialReferenceUrls ?? []) {
        expect(new URL(url).hostname).toMatch(/\.(?:mhlw|nta|meti|mlit)\.go\.jp$/);
      }
    }
  });

  it("matches the official FP2 answer sequence and 2025 law reference date", () => {
    expect(FP2_PILOT.map((q) => q.qNumber)).toEqual(Array.from({ length: FP2_PILOT.length }, (_, i) => i + 1));
    expect(FP2_PILOT.slice(0, 10).map((q) => q.answer)).toEqual(["ウ","エ","エ","ウ","ウ","エ","ウ","ア","イ","ウ"]);
    expect(FP2_PILOT.every((q) => q.lawReferenceDate === "2025-04-01")).toBe(true);
  });

  it("holds 50 consecutive academic questions in each 2024–2025 sitting", () => {
    for (const year of [2024, 2025]) {
      for (const season of ["first", "second"]) {
        const sitting = DENKO2_QUESTIONS.filter((q) => q.year === year && q.season === season);
        expect(sitting.map((q) => q.qNumber)).toEqual(Array.from({ length: 50 }, (_, index) => index + 1));
      }
    }
    expect(DENKO2_QUESTIONS.every((q) => Object.keys(q.choices ?? {}).length === 4)).toBe(true);
    expect(DENKO2_QUESTIONS.every((q) => Object.keys(q.choiceExplanations ?? {}).length === 4)).toBe(true);
    expect(DENKO2_QUESTIONS.every((q) => !hasUnrenderableContent(q))).toBe(true);
  });

  it("keeps the incomplete 2026 electrician pilot outside the 2024–2025 release set", () => {
    expect(DENKO2_2026_PILOT.map((q) => q.qNumber)).toEqual([1,2,3,4,5,6,7,8,9,10]);
    expect(DENKO2_2026_PILOT.map((q) => q.answer)).toEqual(["ア","イ","ウ","エ","イ","イ","エ","イ","ア","ウ"]);
    expect(Object.keys(DENKO2_2026_PILOT[9]!.choiceImageUrls ?? {})).toEqual(["ア","イ","ウ","エ"]);
    for (const q of DENKO2_2026_PILOT.slice(7)) {
      expect(q.officialReferenceUrls).toEqual(["https://www.meti.go.jp/policy/safety_security/industrial_safety/law/files/dengikaishaku.pdf"]);
    }
  });

  it("keeps each electrician choice image with its text and explanation after shuffling", () => {
    const q = DENKO2_QUESTIONS[9]!;
    const before = new Map(getChoiceKeys(q.choices).map((key) => [q.choices?.[key], [q.choiceImageUrls?.[key], q.choiceExplanations?.[key]]]));
    const random = vi.spyOn(Math, "random").mockReturnValue(0);
    const shuffled = shuffleChoices(q);
    random.mockRestore();
    for (const key of getChoiceKeys(shuffled.choices)) {
      expect([shuffled.choiceImageUrls?.[key], shuffled.choiceExplanations?.[key]]).toEqual(before.get(shuffled.choices?.[key]));
    }
  });

  it("uses the explicit official answer PDF URL when question and answer files differ", () => {
    const q = DENKEN3_QUESTIONS[0]!;
    expect(getOfficialAnswerPdfUrl(q.sourcePdfUrl, q.sourceAnswerUrl)).toBe(q.sourceAnswerUrl);
    expect(q.sourceAnswerUrl).not.toBe(q.sourcePdfUrl);
  });

  it.each([
    [FP2_QUESTIONS[0]!, "日本ファイナンシャル・プランナーズ協会", "exam_riyou.pdf"],
    [FP3_QUESTIONS[0]!, "日本ファイナンシャル・プランナーズ協会", "exam_riyou.pdf"],
    [DENKEN3_QUESTIONS[0]!, "一般財団法人 電気技術者試験センター", "faq08/000082.html"],
    [DENKO2_QUESTIONS[0]!, "一般財団法人 電気技術者試験センター", "faq08/000082.html"],
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

  it.each([FP2_QUESTIONS[0]!, FP3_QUESTIONS[0]!, DENKEN3_QUESTIONS[0]!, DENKO2_QUESTIONS[0]!])(
    "$id keeps answer text and each-choice explanations aligned after shuffling",
    (q) => {
      const originalAnswer = (Array.isArray(q.answer) ? q.answer[0]! : q.answer) as ChoiceKey;
      const correctText = q.choices?.[originalAnswer];
      const explanationByText = new Map(
        getChoiceKeys(q.choices).map((key) => [q.choices?.[key], q.choiceExplanations?.[key]]),
      );

      const random = vi.spyOn(Math, "random").mockReturnValue(0);
      const shuffled = shuffleChoices(q);
      random.mockRestore();
      const shuffledAnswer = (Array.isArray(shuffled.answer) ? shuffled.answer[0]! : shuffled.answer) as ChoiceKey;
      expect(shuffled.choices?.[shuffledAnswer]).toBe(correctText);
      for (const key of getChoiceKeys(shuffled.choices)) {
        expect(shuffled.choiceExplanations?.[key]).toBe(explanationByText.get(shuffled.choices?.[key]));
      }
    },
  );
});
