import { beforeEach, describe, expect, it } from "vitest";
import { listExamLearningSummaries, readExamTabProgress, writeExamTabProgress } from "@/lib/exam-library-session";
import { createExamProgress, saveExamProgress, summarizeExamProgress } from "@/lib/exam-library-progress";
import { LS_KEYS } from "@/lib/storage/keys";
import type { ExamQuestion } from "@/lib/exam-library-model";
const questions: ExamQuestion[] = [{ id: "test-q1", number: 1, text: "問題", images: [], correctChoice: 2, choiceCount: 5, answerAuthority: "official" }];
const progress = createExamProgress("test", { "test-q1": { choice: 2, memo: "メモ", submitted: true } }, "test-q1");
beforeEach(() => { localStorage.clear(); sessionStorage.clear(); });
describe("safety tab progress", () => {
  it("restores validated answers without writing localStorage", () => {
    writeExamTabProgress(progress, questions, "テスト試験");
    expect(readExamTabProgress("test", questions)?.answers).toEqual(progress.answers);
    expect(localStorage.length).toBe(0);
    expect(listExamLearningSummaries()[0]).toMatchObject({ examTitle: "テスト試験", answered: 1, correct: 1 });
  });
  it("retains opted-in summaries across a new tab and prefers newer tab answers", () => {
    saveExamProgress(localStorage, { ...progress, summary: { ...summarizeExamProgress(questions, progress.answers), examTitle: "テスト試験" } });
    expect(listExamLearningSummaries()[0]?.correct).toBe(1);
    writeExamTabProgress(createExamProgress("test", {}, "test-q1"), questions, "テスト試験");
    expect(listExamLearningSummaries()).toHaveLength(1);
    expect(listExamLearningSummaries()[0]?.answered).toBe(0);
  });
  it("revalidates answer numbers when loading a tab snapshot", () => {
    writeExamTabProgress({ ...progress, answers: { "test-q1": { choice: 99, memo: "", submitted: true } } }, questions, "テスト");
    expect(readExamTabProgress("test", questions)?.answers).toEqual({});
  });
  it("ignores corrupt unrelated and malformed summaries", () => {
    sessionStorage.setItem(LS_KEYS.examLibrarySessionPrefix + "bad", "{");
    sessionStorage.setItem(LS_KEYS.examLibrarySessionPrefix + "bad2", JSON.stringify({ summary: { examId: "bad", answered: -1 } }));
    localStorage.setItem(LS_KEYS.examLibraryPrefix + "bad", "null");
    expect(listExamLearningSummaries()).toEqual([]);
    expect(readExamTabProgress("bad", questions)).toBeNull();
  });
});
