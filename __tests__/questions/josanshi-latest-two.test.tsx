import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { QuestionCard } from "@/components/quiz/QuestionCard";
import { ChoiceButton } from "@/components/quiz/ChoiceButton";
import { JOSANSHI_QUESTIONS } from "@/data/questions/josanshi";
import baseline from "@/data/questions/josanshi/medical34-live.json";
import additions from "@/data/questions/josanshi/latest-two-additions.json";
import excluded from "@/docs/evidence/josanshi-latest-two-20261011/EXCLUDED.json";
import figures from "@/docs/evidence/josanshi-latest-two-20261011/FIGURES.json";
import sourceQuestions from "@/docs/evidence/josanshi-latest-two-20261011/SOURCE-QUESTIONS.json";
import manifest from "@/docs/evidence/josanshi-latest-two-20261011/MANIFEST.json";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";

const kana = ["ア", "イ", "ウ", "エ", "オ"];
const sources = new Map(sourceQuestions.map(question => [question.id, question]));
const normalize = (text: string) => text.replace(/\s+/g, "").replaceAll("Ａ", "A");

describe("midwife rounds 109 and 108 official-source completion", () => {
  it("retains 220 original identities and completes every officially scored slot", () => {
    expect(sourceQuestions).toHaveLength(220);
    expect(new Set(sourceQuestions.map(question => question.id)).size).toBe(220);
    expect(JOSANSHI_QUESTIONS).toHaveLength(219);
    expect(new Set(JOSANSHI_QUESTIONS.map(question => question.id)).size).toBe(219);
    expect(additions).toHaveLength(201);
    expect(manifest.pendingReview).toEqual([]);
    for (const year of [2024, 2025]) {
      for (const session of ["am", "pm"] as const) {
        const paper = JOSANSHI_QUESTIONS.filter(question => question.year === year && question.session === session);
        const expected = Array.from({ length: 55 }, (_, i) => i + 1).filter(n => !(year === 2025 && session === "pm" && n === 31));
        expect(paper.map(question => question.qNumber), `${year}/${session}`).toEqual(expected);
        expect(paper.every(question => question.examDate === (year === 2025 ? "2026-02-12" : "2025-02-13"))).toBe(true);
      }
    }
    for (const previous of baseline) {
      expect(JOSANSHI_QUESTIONS.find(question => question.id === previous.id)).toEqual(previous);
    }
  });

  it("uses official answers, selection counts, full choice reasons and readable originals", () => {
    const baselineIds = new Set(baseline.map(question => question.id));
    for (const question of JOSANSHI_QUESTIONS) {
      const source = sources.get(question.id)!;
      const answers = Array.isArray(question.answer) ? question.answer : [question.answer];
      expect(answers.map(key => String(kana.indexOf(key) + 1)).join(""), question.id).toBe(source.officialKey);
      expect(answers, question.id).toHaveLength(question.requiredSelections ?? 0);
      expect(Object.keys(question.choiceExplanations ?? {}).sort(), question.id).toEqual(Object.keys(question.choices ?? {}).sort());
      expect(Object.values(question.choiceExplanations ?? {}).every(reason => reason.trim().length >= 12), question.id).toBe(true);
      expect(question.explanationCoverage, question.id).toBe("full");
      expect(question.needsReview, question.id).toBe(false);
      expect(isPracticeReadyQuestion(question), question.id).toBe(true);
      expect(question.sourcePdfUrl).toMatch(/^https:\/\/www\.mhlw\.go\.jp\//);
      expect(question.sourceAnswerUrl).toMatch(/^https:\/\/www\.mhlw\.go\.jp\//);
      if (!baselineIds.has(question.id)) {
        expect(normalize(question.question), question.id).toBe(normalize(source.question));
        if (Object.keys(source.choices).length) {
          expect(question.choices, question.id).toEqual(source.choices);
        } else {
          expect(Object.values(question.choices ?? {}), question.id).toEqual(kana.slice(0, Object.keys(question.choices ?? {}).length).map((_, i) => `図${i + 1}`));
        }
      }
    }
  });

  it("keeps excluded PM31 unscored without inventing an answer", () => {
    expect(excluded).toHaveLength(1);
    expect(excluded[0]?.id).toBe("josanshi-2025-annual-pm-q31");
    expect(excluded[0]?.officialAnswer).toBeNull();
    expect(excluded[0]?.runtimeIncluded).toBe(false);
    expect(excluded[0]?.officialExclusionUrl).toBe("https://www.mhlw.go.jp/general/sikaku/successlist/2026/siken03_04_05/dl/josanshi_pm31.pdf");
    expect(JOSANSHI_QUESTIONS.some(question => question.id === excluded[0]?.id)).toBe(false);
    expect(sources.get(excluded[0]!.id)?.officialKey).toBeNull();
  });

  it("ships every source figure with a reproducible checksum and the correct question mapping", () => {
    expect(figures).toHaveLength(12);
    expect(JOSANSHI_QUESTIONS.filter(question => question.hasImage)).toHaveLength(14);
    for (const figure of figures) {
      const path = resolve(process.cwd(), "public", figure.publicPath.replace(/^\//, ""));
      expect(existsSync(path), path).toBe(true);
      expect(createHash("sha256").update(readFileSync(path)).digest("hex")).toBe(figure.sha256);
      expect(figure.sourcePdfUrl).toMatch(/^https:\/\/www\.mhlw\.go\.jp\//);
      for (const id of figure.ids) {
        const question = JOSANSHI_QUESTIONS.find(question => question.id === id)!;
        expect(question.imageUrls, id).toEqual([figure.publicPath]);
        expect(question.imageAltTexts, id).toHaveLength(1);
        expect(question.sourceAttribution, id).toContain("切り出し");
      }
    }
    const pictured = JOSANSHI_QUESTIONS.find(question => question.id === "josanshi-2025-annual-am-q30")!;
    const markup = renderToStaticMarkup(<QuestionCard question={pictured} />);
    expect(markup).toContain(pictured.imageUrls![0]);
    expect(markup).not.toContain("小泉門が恥骨側");
    const choiceMarkup = renderToStaticMarkup(<ChoiceButton choiceKey="イ" text={pictured.choices!.イ!} revealed={false} selected={false} correct={false} disabled={false} onClick={() => {}} />);
    expect(choiceMarkup).toContain("図2");
    expect(choiceMarkup).not.toContain("小泉門が恥骨側");
  });
});
