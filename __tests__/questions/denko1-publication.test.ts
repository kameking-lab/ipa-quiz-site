import { describe, expect, it, vi } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { createElement } from "react";
import { render, screen } from "@testing-library/react";
import { DENKO1_QUESTIONS } from "@/data/questions/denko1";
import { ExplanationCard } from "@/components/quiz/ExplanationCard";
import { buildQuestionContext } from "@/lib/ai/prompts";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";
import { ALL_EXAM_CODES, ALL_QUIZ_EXAM_CODES, EXAM_CONFIGS } from "@/lib/exam-config";
import { getChoiceKeys } from "@/lib/questions/answers";
import { hasUnrenderableContent } from "@/lib/questions/content-quality";
import { shuffleChoices } from "@/lib/questions/filter";
import { buildQuestionJsonLd } from "@/lib/seo/question-jsonld";

// 公式解答PDF(20260401_co_first_a01.pdf)の正答。イロハニ→アイウエ。
const OFFICIAL = "ハロハニニロイハニイ" + "ニニニニイニハハハイ" + "ニロニイニニニイイハ" + "ニハロイニロロロハニ" + "イロイニイロロロイハ";
const OFFICIAL_2025_LOWER = "ニニハハイイハロロロ" + "ロロニイイニイイニニ" + "ロロニイイニロニロハ" + "ロロニハハロハイイイ" + "ロロイニニニハニロニ";
const TO_SITE: Record<string, string> = { イ: "ア", ロ: "イ", ハ: "ウ", ニ: "エ" };
const FIRST = DENKO1_QUESTIONS.filter((q) => q.year === 2026 && q.season === "first");
const SECOND = DENKO1_QUESTIONS.filter((q) => q.year === 2025 && q.season === "second");

describe("第一種電気工事士 令和8年度上期学科(出題例)", () => {
  it("is live and publishes two complete 50-question papers", () => {
    expect(getQualificationByExamCode("denko1")?.status).toBe("live");
    expect(DENKO1_QUESTIONS).toHaveLength(100);
    expect(FIRST.map((q) => q.qNumber)).toEqual(Array.from({ length: 50 }, (_, index) => index + 1));
    expect(SECOND.map((q) => q.qNumber)).toEqual(Array.from({ length: 50 }, (_, index) => index + 1));
    expect(new Set(DENKO1_QUESTIONS.map((q) => q.id)).size).toBe(100);
    expect(QUESTIONS_BY_EXAM.denko1).toHaveLength(100);
    expect(ALL_QUIZ_EXAM_CODES).toContain("denko1");
    expect(ALL_EXAM_CODES).not.toContain("denko1");
    expect(EXAM_CONFIGS.denko1.sessions[0]?.expectedQuestions).toBe(50);
  });

  it("matches both official answer keys", () => {
    expect(FIRST.map((q) => q.answer).join("")).toBe([...OFFICIAL].map((kana) => TO_SITE[kana]).join(""));
    expect(SECOND.map((q) => q.answer).join("")).toBe([...OFFICIAL_2025_LOWER].map((kana) => TO_SITE[kana]).join(""));
  });

  it.each(DENKO1_QUESTIONS)("$id has four choices, four reasons, attribution and rendered figures", (q) => {
    expect(getChoiceKeys(q.choices)).toEqual(["ア", "イ", "ウ", "エ"]);
    expect(Object.keys(q.choiceExplanations ?? {}).sort()).toEqual(["ア", "イ", "ウ", "エ"]);
    expect(Object.values(q.choiceExplanations ?? {}).every((reason) => reason.trim().length > 10)).toBe(true);
    expect(q.explanation.trim().length).toBeGreaterThanOrEqual(40);
    expect(q.sourceAttribution).toMatch(/^出典：令和[78]年度.*第一種電気工事士.*問\d+（電気技術者試験センター）/);
    const paperDate = q.year === 2025 ? "20251005" : "20260401";
    expect(q.sourcePdfUrl).toBe(`https://www.shiken.or.jp/construction/upload/${paperDate}_co_first_q01.pdf`);
    expect(q.sourceAnswerUrl).toBe(`https://www.shiken.or.jp/construction/upload/${paperDate}_co_first_a01.pdf`);
    expect(hasUnrenderableContent(q)).toBe(false);
    for (const url of [...(q.imageUrls ?? []), ...Object.values(q.choiceImageUrls ?? {})]) {
      expect(existsSync(join(process.cwd(), "public", url)), url).toBe(true);
    }
  });

  it("covers the wiring-diagram questions with the shared official diagrams", () => {
    for (const q of DENKO1_QUESTIONS.filter((item) => item.qNumber >= 30 && item.qNumber <= 34)) {
      const suffix = q.year === 2025 ? "2025-second" : "2026-first";
      expect(q.imageUrls).toContain(`/images/denko1/${suffix}/facility-plan.png`);
    }
    for (const q of DENKO1_QUESTIONS.filter((item) => item.qNumber >= 41)) {
      const suffix = q.year === 2025 ? "2025-second" : "2026-first";
      expect(q.imageUrls).toContain(`/images/denko1/${suffix}/single-line.png`);
    }
  });

  it("keeps choice images with their text and explanation after shuffling", () => {
    const q = DENKO1_QUESTIONS.find((item) => item.qNumber === 46)!;
    const before = new Map(getChoiceKeys(q.choices).map((key) => [q.choices?.[key], [q.choiceImageUrls?.[key], q.choiceExplanations?.[key]]]));
    const random = vi.spyOn(Math, "random").mockReturnValue(0);
    const shuffled = shuffleChoices(q);
    random.mockRestore();
    for (const key of getChoiceKeys(shuffled.choices)) {
      expect([shuffled.choiceImageUrls?.[key], shuffled.choiceExplanations?.[key]]).toEqual(before.get(shuffled.choices?.[key]));
    }
  });

  it("shows 2025 lower explanations and passes all four reasons to the paid Gemini context", () => {
    const q = SECOND.find((item) => item.qNumber === 25)!;
    const context = buildQuestionContext(q, "イ", false);
    expect(context).toContain("2025");
    for (const reason of Object.values(q.choiceExplanations ?? {})) {
      expect(context).toContain(reason);
    }
    render(createElement(ExplanationCard, { question: q, selected: "イ", isCorrect: false, starred: false,
      onToggleStar: () => {}, onNext: () => {}, onAskAI: () => {} }));
    expect(screen.getByRole("region", { name: "不正解の解説" })).toBeTruthy();
    expect(screen.getByRole("region", { name: "不正解の解説" }).textContent).toContain(q.choiceExplanations?.イ);
    expect(screen.getByText("選択肢ごとの解説")).toBeTruthy();
  });

  it("names the examination center as author without a reuse-terms link in JSON-LD", () => {
    const q = DENKO1_QUESTIONS[0]!;
    const graph = buildQuestionJsonLd({
      question: q,
      pageUrlAbs: `https://www.kakomon-ai.jp/q/${q.id}`,
      title: q.id,
      lastUpdatedISO: q.lastUpdated!,
    });
    const text = JSON.stringify(graph);
    expect(text).toContain("一般財団法人 電気技術者試験センター");
    expect(text).not.toContain("faq08/000082.html");
  });
});
