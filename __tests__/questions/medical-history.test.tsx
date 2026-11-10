import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { KANGOSHI_QUESTIONS } from "@/data/questions/kangoshi";
import { HOKENSHI_QUESTIONS } from "@/data/questions/hokenshi";
import { JOSANSHI_QUESTIONS } from "@/data/questions/josanshi";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { filterQuestions, isPracticeReadyQuestion } from "@/lib/questions/filter";
import { QuestionCard } from "@/components/quiz/QuestionCard";
import type { Question } from "@/lib/questions/types";

type Proof = {
  year: number;
  partial: boolean;
  sources: { exam: string; kind: string; sha256: string; url: string; sourcePage: string }[];
  reviewed: { id: string; pdfPage: number; question: string; choices: Record<string, string>; officialAnswer: string; sourcePdfUrl: string; sourceAnswerUrl: string; questionSha256: string; answerSha256: string }[];
};
const folder = path.join(process.cwd(), "docs/question-sources/medical-history-20261110");
const proofs: Proof[] = readdirSync(folder).filter(name => /^202\d\.json$/.test(name)).map(name => JSON.parse(readFileSync(path.join(folder, name), "utf8")));
const pools = { kangoshi: KANGOSHI_QUESTIONS, hokenshi: HOKENSHI_QUESTIONS, josanshi: JOSANSHI_QUESTIONS };

describe("医療3区分の過年度追加（全年度の全問収録ではない）", () => {
  for (const proof of proofs) {
    it(`${proof.year}年度の原文と公式正答を照合し、全肢を欠かさず演習に出す`, () => {
      expect(proof.partial).toBe(true);
      expect(proof.reviewed).toHaveLength(30);
      for (const [exam, questions] of Object.entries(pools)) {
        const added = questions.filter(q => q.year === proof.year);
        expect(added).toHaveLength(10);
        expect(filterQuestions(questions, { exam: exam as Question["exam"], year: proof.year, mode: "random" })).toHaveLength(10);
        expect(EXAM_CONFIGS[exam as keyof typeof pools].yearRange.start).toBeLessThanOrEqual(proof.year);
        for (const q of added) {
          const source = proof.reviewed.find(row => row.id === q.id)!;
          expect(source, q.id).toBeDefined();
          expect(q.question, q.id).toBe(source.question);
          expect(q.choices, q.id).toEqual(source.choices);
          expect(q.officialAnswerNumber, q.id).toBe(source.officialAnswer);
          expect(q.answer, q.id).toBe("アイウエ"[Number(source.officialAnswer) - 1]);
          expect(q.sourcePdfUrl).toBe(source.sourcePdfUrl);
          expect(q.sourceAnswerUrl).toBe(source.sourceAnswerUrl);
          expect(source.sourcePdfUrl).toMatch(new RegExp(`#page=${source.pdfPage}$`));
          expect(source.questionSha256).toBe(proof.sources.find(row => row.exam === exam && row.kind === "am")!.sha256);
          expect(source.answerSha256).toBe(proof.sources.find(row => row.exam === exam && row.kind === "answers")!.sha256);
          expect(q.explanationCoverage).toBe("full");
          expect(Object.keys(q.choiceExplanations ?? {})).toEqual(Object.keys(q.choices!));
          for (const [key, reason] of Object.entries(q.choiceExplanations!)) {
            expect(reason!.startsWith(key === q.answer ? "正しい。" : "誤り。"), q.id).toBe(true);
            expect(reason!.length).toBeGreaterThan(15);
          }
          expect(isPracticeReadyQuestion(q), q.id).toBe(true);
          expect(q.hasImage).toBe(false);
          expect(q.sourceAttribution).toContain("加工");
          expect(q.question).not.toMatch(/(?:cid:|DKIX|\uFFFD|[\u0080-\u009F])/);
        }
        const caseQuestion = added.find(q => q.question.includes("Aさん")) ?? added[0];
        const markup = renderToStaticMarkup(<QuestionCard question={caseQuestion} />);
        expect(markup).toContain(caseQuestion.question.slice(0, 12));
      }
    });
  }
  it("年度追加でIDが衝突せず、既存の公式正答を維持する", () => {
    for (const questions of Object.values(pools)) {
      expect(new Set(questions.map(q => q.id)).size).toBe(questions.length);
    }
    expect(KANGOSHI_QUESTIONS.filter(q => q.year >= 2024)).toHaveLength(464);
    expect(HOKENSHI_QUESTIONS.filter(q => q.year >= 2024)).toHaveLength(202);
    expect(JOSANSHI_QUESTIONS.filter(q => q.year >= 2024)).toHaveLength(219);
  });
});
