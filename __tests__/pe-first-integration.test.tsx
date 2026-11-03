import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import manifest from "@/reports/LQ3-20261104/adoption-manifest.json";
import { PE_FIRST_CATALOG } from "@/lib/exam-library/pe-first-catalog";
import { loadPeFirstPaper } from "@/lib/exam-library/pe-first";
import { findExamEntry } from "@/lib/exam-library-catalog";
import { loadExamPaper, listAvailableExamIds } from "@/lib/exam-library-papers";
import { gradeExamAnswer, isScorableQuestion } from "@/lib/exam-library-model";
import { ExamQuestionPlayer } from "@/components/exam-library/exam-question-player";
import { createExamProgress, parseExamProgress, summarizeExamProgress } from "@/lib/exam-library-progress";
import { PE_FIRST_REFERENCE_ID } from "@/lib/exam-library/survey-assistant-reference-policy";

beforeEach(() => { localStorage.clear(); sessionStorage.clear(); });
afterEach(cleanup);

describe("LQ3 existing manuscript adoption", () => {
  it("connects exactly the 17 accepted sets without importing missing departments or independent practice questions", () => {
    expect(PE_FIRST_CATALOG).toHaveLength(17);
    expect(PE_FIRST_CATALOG.reduce((sum, entry) => sum + entry.questionCount!, 0)).toBe(595);
    expect(PE_FIRST_CATALOG.reduce((sum, entry) => sum + entry.scoredCount!, 0)).toBe(594);
    for (const entry of PE_FIRST_CATALOG) {
      expect(findExamEntry(entry.id)).toEqual(entry);
      expect(listAvailableExamIds()).toContain(entry.id);
      expect(loadExamPaper(entry.id)).toBe(loadPeFirstPaper(entry.id));
      expect(loadExamPaper(entry.id)!.filter(isScorableQuestion)).toHaveLength(entry.scoredCount!);
    }
    expect(loadPeFirstPaper("../../package")).toBeNull();
    expect(loadPeFirstPaper("pe-first-marine-2025")).toBeNull();
    expect(loadPeFirstPaper("pe-first-sanitary-2025")).toBeNull();
  });

  it("keeps each accepted image byte-identical and all 2,975 choice reasons accessible", () => {
    let count = 0;
    for (const pin of manifest) {
      const paper = loadPeFirstPaper(pin.paperId)!;
      expect(paper).toHaveLength(35);
      expect(paper.map(q => q.number)).toEqual(Array.from({length:35}, (_,i) => i+1));
      for (const [url, sha] of Object.entries(pin.assets)) {
        expect(createHash("sha256").update(readFileSync(join(process.cwd(), "public", url))).digest("hex"), url).toBe(sha);
      }
      for (const question of paper) {
        const reasons = question.referenceOnly ? question.referenceReasons : question.choiceExplanation?.choices;
        expect(reasons, question.id).toHaveLength(5);
        expect(reasons!.every(reason => reason.reason.trim().length > 0)).toBe(true);
        count += reasons!.length;
        expect(question.originalPdf).toMatch(/^https:\/\/www\.engineer\.or\.jp\//);
        expect(question.answerPdf).toMatch(/#page=\d+$/);
        expect(question.presentation?.prompt).toBe(question.text);
        if (!question.referenceOnly) {
          expect(question.presentation?.choices).toHaveLength(5);
          expect(gradeExamAnswer(question, question.correctChoice)).toBe("correct");
          expect(gradeExamAnswer(question, question.correctChoice! % 5 + 1)).toBe("incorrect");
        }
      }
    }
    expect(count).toBe(2975);
  });

  it("shows an original-image question, grades it, exposes every reason, and restores its saved answer", () => {
    const entry = PE_FIRST_CATALOG.find(item => item.id === "pe-first-chemical-2025")!;
    const questions = loadPeFirstPaper(entry.id)!;
    const q = questions[0];
    const props = {examId:entry.id, examTitle:entry.subject, pdfUrl:entry.pdfUrl, indexUrl:entry.indexUrl, questions};
    const view = render(<ExamQuestionPlayer {...props} />);
    expect(screen.getByAltText(q.presentation!.figures[0].alt)).toHaveAttribute("src", q.images[0]);
    fireEvent.click(screen.getByRole("radio", {name:new RegExp(`^選択肢 ${q.correctChoice}:`)}));
    expect(screen.getByRole("heading", {name:"正解"})).toBeInTheDocument();
    for (const reason of q.choiceExplanation!.choices) expect(screen.getByText(reason.reason)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("checkbox", {name:"この端末に保存する"}));
    view.unmount();
    render(<ExamQuestionPlayer {...props} />);
    expect(screen.getByRole("heading", {name:"正解"})).toBeInTheDocument();
  });

  it("displays the accepted biotechnology transcription as text and never admits information Q25 to scores or storage", () => {
    const bio = loadPeFirstPaper("pe-first-biotechnology-2025")![0];
    expect(bio.presentation?.prompt).toContain("DNA");
    expect(bio.presentation?.figures).toEqual([]);
    const examId = "pe-first-information-2025";
    const questions = loadPeFirstPaper(examId)!;
    const q = questions[24];
    expect(q.id).toBe(PE_FIRST_REFERENCE_ID);
    const poisoned = createExamProgress(examId, {[q.id]: {choice:3,submitted:true,memo:"old"}}, q.id);
    expect(poisoned.answers).toEqual({});
    expect(parseExamProgress(JSON.stringify(poisoned), examId, questions)?.lastQuestionId).toBeNull();
    expect(summarizeExamProgress(questions, poisoned.answers)).toMatchObject({total:34,scorable:34,answered:0});
    render(<ExamQuestionPlayer examId={examId} examTitle="情報工学" pdfUrl={q.originalPdf!} indexUrl={PE_FIRST_CATALOG[0].indexUrl} questions={questions} initialQuestionId={q.id} />);
    expect(screen.getByRole("region", {name:"参照専用の問題と解説"})).toBeInTheDocument();
    expect(screen.queryAllByRole("radio")).toHaveLength(0);
    expect(screen.getByRole("list", {name:"選択肢ごとの参照理由"}).children).toHaveLength(5);
  });
});
