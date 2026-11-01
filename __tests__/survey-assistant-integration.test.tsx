import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ExamQuestionPlayer } from "@/components/exam-library/exam-question-player";
import { loadSurveyAssistantPaper } from "@/lib/exam-library/survey-assistant-candidate";
import { createExamProgress, examProgressKey, parseExamProgress, saveExamProgress, summarizeExamProgress, wrongQuestionIds } from "@/lib/exam-library-progress";
import { listExamLearningSummaries, readExamTabProgress, writeExamTabProgress } from "@/lib/exam-library-session";
import { SURVEY_ASSISTANT_REFERENCE_ID } from "@/lib/exam-library/survey-assistant-reference-policy";
import * as rewards from "@/lib/study-reward";
const examId = "survey-assistant-2026";
const questions = loadSurveyAssistantPaper(examId)!;
const q11 = questions[10];
const q12 = questions[11];
const q13 = questions[12];
const answer = { choice: q11.correctChoice, submitted: true, memo: "通常問の保存確認" };
beforeEach(() => { localStorage.clear(); sessionStorage.clear(); });
afterEach(() => { cleanup(); vi.restoreAllMocks(); });

describe("survey assistant composed application acceptance", () => {
  it("drops injected Q12 from parse/create/localStorage/sessionStorage and dashboard/review", () => {
    const answers = { [q11.id]: answer, [q12.id]: { choice: 3, submitted: true, memo: "stale reference" } };
    const poisoned = { version: 1 as const, examId, answers, lastQuestionId: q12.id, updatedAt: new Date().toISOString(), summary: { total: 28, answered: 2, correct: 2, incorrect: 0, unscored: 0, scorable: 28, examTitle: "測量士補2026" } };
    expect(parseExamProgress(JSON.stringify(poisoned), examId, questions)?.answers).toEqual({ [q11.id]: answer });
    expect(parseExamProgress(JSON.stringify(poisoned), examId, questions)?.lastQuestionId).toBeNull();
    expect(createExamProgress(examId, answers, q12.id).answers).toEqual({ [q11.id]: answer });
    expect(saveExamProgress(localStorage, poisoned)).toBe(true);
    const saved = JSON.parse(localStorage.getItem(examProgressKey(examId))!);
    expect(saved.answers).toEqual({ [q11.id]: answer });
    expect(saved.lastQuestionId).toBeNull();
    expect(saved.summary).toMatchObject({ total: 27, scorable: 27, answered: 1, correct: 1 });
    writeExamTabProgress(poisoned, questions, "測量士補2026");
    expect(readExamTabProgress(examId, questions)?.answers).toEqual({ [q11.id]: answer });
    expect(listExamLearningSummaries()[0]).toMatchObject({ total: 27, answered: 1, correct: 1, lastQuestionId: null });
    expect(wrongQuestionIds(questions, answers)).not.toContain(q12.id);
    expect(summarizeExamProgress(questions, answers)).toMatchObject({ total: 27, answered: 1, correct: 1 });
  });

  it("shows reference immediately with no answer/memo/AI/reward admission and moves onward", () => {
    const reward = vi.spyOn(rewards, "recordStudyReward");
    render(<ExamQuestionPlayer examId={examId} examTitle="測量士補2026" pdfUrl={q11.originalPdf} indexUrl="https://www.gsi.go.jp/LAW/SHIKEN/SHIKEN-kakomon.html" questions={questions} initialQuestionId={q12.id} />);
    expect(screen.getByRole("region", { name: "参照専用の問題と解説" })).toBeInTheDocument();
    expect(screen.getByRole("list", { name: "選択肢ごとの参照理由" }).children).toHaveLength(5);
    expect(screen.queryAllByRole("radio")).toHaveLength(0);
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /この問題をAI/ })).not.toBeInTheDocument();
    fireEvent.keyDown(document.body, { key: "3" });
    expect(reward).not.toHaveBeenCalled();
    fireEvent.keyDown(document.body, { key: "ArrowRight" });
    expect(screen.getByRole("heading", { name: /問13/ })).toBeInTheDocument();
    expect(screen.getAllByRole("radio")).toHaveLength(5);
    const tabProgress = readExamTabProgress(examId, questions);
    expect(tabProgress?.answers[SURVEY_ASSISTANT_REFERENCE_ID]).toBeUndefined();
    expect(reward).not.toHaveBeenCalled();
  });

  it("saves and restores an ordinary choice through the actual player controls", () => {
    const view = render(<ExamQuestionPlayer examId={examId} examTitle="測量士補2026" pdfUrl={q11.originalPdf} indexUrl="https://www.gsi.go.jp/LAW/SHIKEN/SHIKEN-kakomon.html" questions={questions} initialQuestionId={q11.id} />);
    fireEvent.click(screen.getByRole("radio", { name: new RegExp(`^選択肢 ${q11.correctChoice}:`) }));
    expect(screen.getByRole("heading", { name: "正解" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("checkbox", { name: "この端末に保存する" }));
    expect(parseExamProgress(localStorage.getItem(examProgressKey(examId)), examId, questions)?.answers[q11.id]?.submitted).toBe(true);
    view.unmount();
    render(<ExamQuestionPlayer examId={examId} examTitle="測量士補2026" pdfUrl={q11.originalPdf} indexUrl="https://www.gsi.go.jp/LAW/SHIKEN/SHIKEN-kakomon.html" questions={questions} initialQuestionId={q11.id} />);
    expect(screen.getByRole("heading", { name: "正解" })).toBeInTheDocument();
    expect(readExamTabProgress(examId, questions)?.answers[q11.id]?.submitted).toBe(true);
    expect(localStorage.getItem(examProgressKey(examId))).not.toContain(SURVEY_ASSISTANT_REFERENCE_ID);
    expect(q13.referenceOnly).toBe(false);
  });
});
