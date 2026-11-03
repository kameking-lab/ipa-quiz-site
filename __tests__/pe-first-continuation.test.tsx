import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import manifest from "@/reports/LQ3B-20261104/adoption-manifest.json";
import keys2024 from "@/reports/LQ3B-20261104/official-keys-2024.json";
import keys2025 from "@/reports/LQ3B-20261104/official-keys-2025.json";
import { loadPeFirstPaper } from "@/lib/exam-library/pe-first";
import { PE_FIRST_CATALOG } from "@/lib/exam-library/pe-first-catalog";
import { gradeExamAnswer } from "@/lib/exam-library-model";
import { ExamQuestionPlayer } from "@/components/exam-library/exam-question-player";

afterEach(cleanup);

describe("LQ3B complete-paper continuation", () => {
  it("binds every new question and all choice reasons to the official yearly key", () => {
    const ids = new Set<string>();
    for (const pin of manifest) {
      const paper = loadPeFirstPaper(pin.paperId)!;
      const entry = PE_FIRST_CATALOG.find(item => item.id === pin.paperId)!;
      const keys = (pin.year === 2024 ? keys2024 : keys2025) as Record<string, Record<string, number>>;
      expect(paper).toHaveLength(35);
      expect(paper.map(q => q.number)).toEqual(Array.from({length:35}, (_, i) => i + 1));
      expect(entry).toMatchObject({questionCount:35, scoredCount:35});
      expect(createHash("sha256").update(readFileSync(join(process.cwd(), pin.officialPdf))).digest("hex")).toBe(pin.officialPdfSha256);
      expect(createHash("sha256").update(readFileSync(join(process.cwd(), pin.answerPdf))).digest("hex")).toBe(pin.answerPdfSha256);
      for (const [url, sha] of Object.entries(pin.assets)) {
        expect(createHash("sha256").update(readFileSync(join(process.cwd(), "public", url))).digest("hex")).toBe(sha);
      }
      for (const q of paper) {
        expect(ids.has(q.id)).toBe(false);
        ids.add(q.id);
        expect(q.correctChoice).toBe(keys[String(pin.department)][String(q.number)]);
        expect(q.answerPdf).toContain(`attach_4106_${pin.year === 2025 ? 4 : 5}.pdf#page=${pin.answerPage}`);
        expect(q.choiceExplanation?.choices.map(c => c.number)).toEqual([1,2,3,4,5]);
        expect(q.choiceExplanation?.choices.every(c => c.reason.trim().length >= 15)).toBe(true);
        expect(q.presentation?.choices).toHaveLength(5);
        for (let answer = 1; answer <= 5; answer++) {
          expect(gradeExamAnswer(q, answer)).toBe(answer === q.correctChoice ? "correct" : "incorrect");
        }
      }
    }
  });

  it("renders the transcribed sanitary problem and its required diagram, then explains all five choices", () => {
    const examId = "pe-first-sanitary-2025";
    const questions = loadPeFirstPaper(examId)!;
    const q = questions[1];
    render(<ExamQuestionPlayer examId={examId} examTitle="技術士第一次・衛生工学" pdfUrl={q.originalPdf!} indexUrl="https://www.engineer.or.jp/c_categories/index02021.html" questions={questions} initialQuestionId={q.id} />);
    expect(screen.getByText(q.text)).toBeInTheDocument();
    expect(screen.getByAltText(/光度1000cd/)).toHaveAttribute("src", "/exam-library/pe-first-sanitary-2025/q02-figure.png");
    fireEvent.click(screen.getByRole("radio", {name:/^選択肢 5:/}));
    expect(screen.getByRole("heading", {name:"正解"})).toBeInTheDocument();
    for (const reason of q.choiceExplanation!.choices) expect(screen.getByText(reason.reason)).toBeInTheDocument();
  });
});
