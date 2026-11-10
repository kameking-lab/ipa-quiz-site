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
import { ExplanationCard } from "@/components/quiz/ExplanationCard";
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

  it("着床と胎盤輸送で誤った記述を否定するだけでなく正しい機序を示す", () => {
    const implantation = JOSANSHI_QUESTIONS.find(q => q.id === "josanshi-2021-annual-am-q6")!;
    expect(implantation.choiceExplanations?.ア).toContain("第2週");
    expect(implantation.choiceExplanations?.イ).toContain("胚盤胞");
    expect(implantation.choiceExplanations?.エ).toContain("黄体");
    const transport = JOSANSHI_QUESTIONS.find(q => q.id === "josanshi-2022-annual-am-q9")!;
    expect(transport.choiceExplanations?.ア).toContain("受容体");
    expect(transport.choiceExplanations?.ウ).toContain("能動輸送");
    expect(transport.choiceExplanations?.エ).toContain("促進拡散");
  });

  it("感染症では宿主と媒介生物を区別する", () => {
    const question = HOKENSHI_QUESTIONS.find(q => q.id === "hokenshi-2022-annual-am-q16")!;
    expect(question.choiceExplanations?.ア).toContain("終宿主は海産哺乳類");
    expect(question.choiceExplanations?.イ).toContain("鳥");
    expect(question.choiceExplanations?.イ).toContain("蚊の媒介");
    expect(question.choiceExplanations?.ウ).toContain("虫卵");
    expect(question.choiceExplanations?.エ).toContain("ネコ科");
  });

  it("LNG-IUSの公式採点を維持し、誤答時にも副作用を否定しない注記と出典を表示する", () => {
    const question = JOSANSHI_QUESTIONS.find(q => q.id === "josanshi-2022-annual-am-q4")!;
    expect(question.answer).toBe("エ");
    expect(question.officialAnswerNumber).toBe("4");
    expect(question.choiceFactTruth?.イ).toBe(true);
    const markup = renderToStaticMarkup(<ExplanationCard question={question} selected="イ" isCorrect={false}
      starred={false} onToggleStar={() => {}} onNext={() => {}} onAskAI={() => {}} />);
    const doc = new DOMParser().parseFromString(markup, "text/html");
    const selectedReason = doc.querySelector('[aria-label="あなたが選んだ誤答の理由"]')?.textContent ?? "";
    expect(selectedReason).toContain("公式採点");
    expect(selectedReason).toContain("過多月経が副作用として記載");
    expect(selectedReason).toContain("否定する意味ではなく");
    expect(selectedReason).toContain("理由は未確認");
    expect(doc.querySelector('a[href="https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/630004_2529710X1027_1_09"]')).not.toBeNull();
    expect(doc.querySelector(`a[href="${question.sourceAnswerUrl}"]`)).not.toBeNull();
  });
});
