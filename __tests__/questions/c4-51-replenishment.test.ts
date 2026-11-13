import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { FUTSU_SENBAN3_QUESTIONS } from "@/data/questions/futsu-senban3";
import { SHASHUTSU3_QUESTIONS } from "@/data/questions/shashutsu3";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { choiceDisplayLabel, formatQuestionAnswerForDisplay, questionNumberLabel } from "@/lib/questions/display";
import { isPracticeReadyQuestion, shuffleChoices } from "@/lib/questions/filter";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { buildQuestionJsonLd } from "@/lib/seo/question-jsonld";
import { examCatalog, examContent } from "@/mobile/shared/catalog-source";
import type { Question } from "@/lib/questions/types";

// Independently read from the three official answer-table images, five per group.
const editions = [
  { exam: "futsu-senban3", season: "early", all: FUTSU_SENBAN3_QUESTIONS, answers: "○○××○ ○○○○× ○×○×○ ○×××○ ×××○× ○○×××", figures: [18, 24, 30] },
  { exam: "futsu-senban3", season: "late", all: FUTSU_SENBAN3_QUESTIONS, answers: "○○×○○ ×○××× ×○×○○ ○×○○○ ×○××× ○××○×", figures: [9, 17, 20] },
  { exam: "shashutsu3", season: "late", all: SHASHUTSU3_QUESTIONS, answers: "○○×○○ ○×○×○ ×××○× ○○○×○ ○○×○× ×××○×", figures: [] },
] as const;

for (const { exam, season, all, answers, figures } of editions) {
  const qs = all.filter(q => q.season === season);
  const official = answers.replaceAll(" ", "");
  describe(`${exam} 2025 ${season}`, () => {
    it("preserves all official answers and numbering through scoring, display and routes", () => {
      expect(qs).toHaveLength(30);
      expect(official).toHaveLength(30);
      expect(new Set(qs.map(q => q.id)).size).toBe(30);
      expect(new Set(all.map(questionPagePath)).size).toBe(all.length);
      qs.forEach((q, i) => {
        expect(q.id).toBe(`${exam}-2025-${season}-gakka-a-${String(i + 1).padStart(3, "0")}`);
        expect(q.qNumber).toBe(i + 1);
        expect(questionNumberLabel(q)).toBe(String(i + 1));
        expect(q.officialAnswerNumber, q.id).toBe(official[i]);
        expect(q.answer, q.id).toBe(official[i] === "○" ? "ア" : "イ");
        expect(formatQuestionAnswerForDisplay(q, q.answer), q.id).toBe(official[i]);
        expect(Object.keys(q.choices ?? {})).toEqual(["ア", "イ"]);
        expect(Object.keys(q.choiceExplanations ?? {})).toEqual(["ア", "イ"]);
        expect(q.explanation.length, q.id).toBeGreaterThanOrEqual(50);
        expect(isPracticeReadyQuestion(q), q.id).toBe(true);
        expect(shuffleChoices(q)).toBe(q);
        expect(questionSourceEdition(q)).toBe(`2025年度${season === "early" ? "前期" : "後期"}`);
        const [, , routeExam, yearSeason, section, qnum] = questionPagePath(q).split("/");
        expect(findQuestionByRoute(all, { exam: routeExam, yearSeason, section, qnum })?.id).toBe(q.id);
      });
    });

    it("loads the edition and exposes its categories and original source in JSON-LD", async () => {
      expect(QUESTIONS_BY_EXAM[exam]).toEqual(all);
      expect(await getQuestionsForExam(exam)).toEqual(all);
      expect([choiceDisplayLabel(exam, "ア"), choiceDisplayLabel(exam, "イ")]).toEqual(["○", "×"]);
      expect(EXAM_CONFIGS[exam].sessions[0].expectedQuestions).toBe(30);
      expect(EXAM_CONFIGS[exam].seasons).toContain(season);
      expect(qs.every(q => EXAM_CONFIGS[exam].sessions[0].categories.includes(q.category))).toBe(true);
      const source = JSON.parse(readFileSync(join(process.cwd(), `data/questions/${exam}/2025-${season}.sources.json`), "utf8"));
      expect(source.review).toHaveLength(30);
      expect(source.sources.every((s: { httpStatus: number; sha256: string }) => s.httpStatus === 200 && s.sha256.length === 64)).toBe(true);
      for (const [i, entry] of source.review.entries()) {
        const q = qs[i];
        expect(entry.officialAnswer).toBe(official[i]);
        expect(entry.internalAnswer).toBe(q.answer);
        expect(q.sourcePdfUrl).toMatch(/kentei\.javada\.or\.jp\/pdf\/.*#page=\d+$/);
        expect(entry.pdfPage).toBe(Number(q.sourcePdfUrl.split("#page=")[1]));
        const graph = buildQuestionJsonLd({ question: q, pageUrlAbs: `https://www.kakomon-ai.jp${questionPagePath(q)}`, title: exam })["@graph"][0];
        if (!("hasPart" in graph) || !("acceptedAnswer" in graph.hasPart) || Array.isArray(graph.hasPart.acceptedAnswer)) throw new Error("Missing answer");
        expect(graph.hasPart.author.name).toBe("中央職業能力開発協会");
        expect(graph.hasPart.acceptedAnswer.text).toContain(official[i]);
      }
    });

    it("retains every required official figure and usable alternative text", () => {
      expect(qs.filter(q => q.hasImage).map(q => q.qNumber)).toEqual(figures);
      for (const q of qs.filter(q => q.hasImage)) {
        expect(q.imageUrls).toHaveLength(1);
        expect(q.imageAltTexts).toHaveLength(1);
        expect(q.imageAltTexts![0].length).toBeGreaterThan(10);
        const path = join(process.cwd(), "public", q.imageUrls![0]);
        expect(existsSync(path), q.id).toBe(true);
        const png = readFileSync(path);
        expect(png.readUInt32BE(16), q.id).toBeGreaterThan(100);
        expect(png.readUInt32BE(20), q.id).toBeGreaterThan(100);
      }
    });
  });
}

it("includes both qualifications in the mobile catalog with the same question content", async () => {
  const generated = JSON.parse(readFileSync(join(process.cwd(), "mobile/src/generated/catalog.json"), "utf8"));
  for (const [exam, all] of [["futsu-senban3", FUTSU_SENBAN3_QUESTIONS], ["shashutsu3", SHASHUTSU3_QUESTIONS]] as const) {
    const entry = await examCatalog(exam);
    expect(await examContent(exam)).toEqual(all as Question[]);
    expect(entry?.count).toBe(all.length);
    expect(generated.exams.find((e: { code: string }) => e.code === exam)).toEqual(entry);
  }
});
