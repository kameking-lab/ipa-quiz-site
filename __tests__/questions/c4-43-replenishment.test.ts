import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { SASSHI2_QUESTIONS } from "@/data/questions/sasshi2";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { choiceDisplayLabel, formatQuestionAnswerForDisplay, questionNumberLabel } from "@/lib/questions/display";
import { isPracticeReadyQuestion, shuffleChoices } from "@/lib/questions/filter";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { buildQuestionJsonLd } from "@/lib/seo/question-jsonld";
import type { ChoiceKey, ExamCode, Question } from "@/lib/questions/types";

// Official answer image transcribed separately in groups of five.
const editions: { exam: ExamCode; year: number; questions: Question[]; a: string; b: string; figures: string[] }[] = [
  { exam: "sasshi2", year: 2024, questions: SASSHI2_QUESTIONS, a: "×○○×× ○×○×○ ×○×○○ ○×○○○ ××○○○", b: "ニロイハロ イロロニイ ロハニロロ ロイハイハ ロイロニイ", figures: ["B群 1", "B群 23"] },
];
const keys: ChoiceKey[] = ["ア", "イ", "ウ", "エ"];

for (const edition of editions) {
  const { exam, year } = edition;
  const questions = edition.questions.filter(q => q.year === year);
  describe(`${exam} ${year}年度前期`, () => {
    it("keeps all official answers, numbering, explanations and playable routes", () => {
      expect(questions).toHaveLength(50);
      const a = edition.a.replaceAll(" ", "");
      const b = edition.b.replaceAll(" ", "");
      expect(a).toHaveLength(25);
      expect(b).toHaveLength(25);
      expect(new Set(questions.map(q => q.id)).size).toBe(50);
      expect(new Set(questions.map(questionPagePath)).size).toBe(50);
      for (const [i, q] of questions.entries()) {
        const n = i % 25 + 1;
        const group = i < 25 ? "A" : "B";
        const official = (i < 25 ? a : b)[n - 1];
        expect(q.id).toBe(`${exam}-${year}-early-gakka-${group.toLowerCase()}-${String(n).padStart(3, "0")}`);
        expect(q.qNumber).toBe(i + 1);
        expect(questionNumberLabel(q)).toBe(`${group}群 ${n}`);
        expect(q.officialAnswerNumber, q.id).toBe(official);
        expect(q.answer, q.id).toBe(i < 25 ? (official === "○" ? "ア" : "イ") : keys["イロハニ".indexOf(official)]);
        expect(formatQuestionAnswerForDisplay(q, q.answer)).toBe(official);
        expect(Object.keys(q.choices ?? {})).toHaveLength(i < 25 ? 2 : 4);
        expect(Object.keys(q.choiceExplanations ?? {})).toEqual(Object.keys(q.choices ?? {}));
        expect(Object.values(q.choiceExplanations ?? {}).every(text => text!.length > 20), q.id).toBe(true);
        expect(isPracticeReadyQuestion(q), q.id).toBe(true);
        expect(shuffleChoices(q)).toBe(q);
        expect(questionSourceEdition(q)).toBe(`${year}年度前期`);
        expect(q.sourcePdfUrl).toMatch(/kentei\.javada\.or\.jp\/pdf\/.*#page=\d+$/);
        const [, , routeExam, yearSeason, section, qnum] = questionPagePath(q).split("/");
        expect(findQuestionByRoute(questions, { exam: routeExam, yearSeason, section, qnum })?.id).toBe(q.id);
      }
      expect(questions.reduce((sum, q) => sum + Object.keys(q.choices ?? {}).length, 0)).toBe(150);
    });

    it("connects sync/lazy loading, original labels and source-backed figures", async () => {
      expect(QUESTIONS_BY_EXAM[exam]?.filter(q => q.year === year)).toEqual(questions);
      expect((await getQuestionsForExam(exam)).filter(q => q.year === year)).toEqual(questions);
      expect(keys.map(k => choiceDisplayLabel(exam, k)).join("")).toBe("イロハニ");
      expect(EXAM_CONFIGS[exam].sessions[0].expectedQuestions).toBe(50);
      expect(questions.every(q => EXAM_CONFIGS[exam].sessions[0].categories.includes(q.category!))).toBe(true);
      expect(questions.filter(q => q.hasImage).map(q => q.officialQuestionLabel)).toEqual(edition.figures);
      for (const q of questions.filter(q => q.hasImage)) {
        expect(q.imageUrls).toHaveLength(1);
        expect(q.imageAltTexts?.[0].length).toBeGreaterThan(20);
        const png = readFileSync(join(process.cwd(), "public", q.imageUrls![0]));
        expect(png.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
      }
      const source = JSON.parse(readFileSync(join(process.cwd(), `data/questions/${exam}/${year}-early.sources.json`), "utf8"));
      expect(source.review).toHaveLength(50);
      expect(source.sources.every((s: { httpStatus: number; sha256: string }) => s.httpStatus === 200 && s.sha256.length === 64)).toBe(true);
      for (const [i, entry] of source.review.entries()) {
        expect(entry.officialAnswer).toBe(questions[i].officialAnswerNumber);
        expect(entry.internalAnswer).toBe(questions[i].answer);
        expect(entry.pdfPage).toBe(Number(questions[i].sourcePdfUrl!.split("#page=")[1]));
      }
      const graph = buildQuestionJsonLd({ question: questions[0], pageUrlAbs: `https://www.kakomon-ai.jp${questionPagePath(questions[0])}`, title: "サッシ施工" })["@graph"][0];
      if (!("hasPart" in graph) || !("acceptedAnswer" in graph.hasPart) || Array.isArray(graph.hasPart.acceptedAnswer)) throw new Error("Missing answer");
      expect(graph.hasPart.author.name).toBe("中央職業能力開発協会");
      expect(graph.hasPart.acceptedAnswer.text).toContain(questions[0].officialAnswerNumber);
    });
  });
}

it("retains the 2024 original dimensions, negative conditions and order", () => {
  const questions = SASSHI2_QUESTIONS.filter(q => q.year === 2024);
  expect(questions[1].question).toContain("3.1mm");
  expect(questions[26].choices?.イ).toContain("沓摺りにモルタルを詰める → 枠をくさびで仮固定する");
  expect(questions[32].choices?.イ).toBe("0.70mm");
  expect(questions[38].choices?.イ).toBe("1／70");
  expect(questions[40].question).toContain("掃き出し窓は除く");
  expect(questions[49].choices?.ア).toContain("85度以下");
});
