import { describe, expect, it, vi } from "vitest";
vi.mock("server-only", () => ({}));

import { ALL_QUESTIONS, QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam, getRegisteredExamCodes } from "@/lib/questions/get-questions";
import { ALL_EXAM_CODES, ALL_QUIZ_EXAM_CODES, EXAM_CONFIGS } from "@/lib/exam-config";
import { getExamQuestionCount } from "@/lib/constants/exam-question-counts";
import { getQuestionById } from "@/lib/questions/load";
import { filterQuestions, shuffleChoices } from "@/lib/questions/filter";
import { defaultPracticeSession, practiceSessionLabel } from "@/lib/questions/practice-session";
import { GET } from "@/app/api/search/questions/route";
import { questionSourceExam } from "@/lib/questions/source-label";
import { choiceDisplayLabel } from "@/lib/questions/display";
import { sessionLabel } from "@/lib/seo/question-jsonld";
import { getHomeDirectory } from "@/lib/home/home-directory";

const exam = "kenchiku-setsubishi";
const excluded = `${exam}-2026-annual-am2-q18`;

describe("Building equipment public integration", () => {
  it("serves the same 209 originals through eager/lazy loaders and public counts", async () => {
    const questions = await getQuestionsForExam(exam);
    expect(questions).toEqual(QUESTIONS_BY_EXAM[exam]);
    expect(questions).toHaveLength(209);
    expect(getExamQuestionCount(exam)).toBe(209);
    const construction = getHomeDirectory().find(domain => domain.id === "construction")!;
    expect([...construction.featured, ...construction.compact]).toContainEqual(expect.objectContaining({
      key: exam, href: `/${exam}`, name: "建築設備士", questionCount: 209,
    }));
    expect(questions.filter(q => q.year === 2025)).toHaveLength(105);
    expect(questions.filter(q => q.year === 2026)).toHaveLength(104);
    expect(getRegisteredExamCodes()).toContain(exam);
    expect(ALL_QUIZ_EXAM_CODES).toContain(exam);
    expect(ALL_EXAM_CODES).not.toContain(exam);
    expect(getQuestionById(excluded)).toBeUndefined();
    expect(ALL_QUESTIONS.some(q => q.id === excluded)).toBe(false);
    expect(defaultPracticeSession(exam)).toBe("am1");
    expect(questionSourceExam(questions.find(q => q.session === "am1")!)).toBe("建築設備士");
    expect(sessionLabel("am1", exam)).toBe("建築一般知識");
    expect(choiceDisplayLabel(exam, "イ")).toBe("2");
    expect(EXAM_CONFIGS[exam].sessions.map(s => practiceSessionLabel(s.session, exam)))
      .toEqual(["建築一般知識", "建築法規", "建築設備"]);
    expect(filterQuestions(ALL_QUESTIONS, { mode: "year", exam, year: 2026, session: "am2" })).toHaveLength(17);
    for (const q of questions) {
      expect(Object.keys(q.choiceExplanations ?? {})).toEqual(["ア", "イ", "ウ", "エ"]);
      expect(shuffleChoices(q)).toBe(q);
    }
  });

  it("accepts public search filters and never indexes Q18", async () => {
    const response = await GET(new Request(`http://localhost/api/search/questions?exam=${exam}&year=2026&session=am2&limit=60`));
    expect(response.status).toBe(200);
    const result = await response.json();
    expect(result.total).toBe(17);
    expect(result.hits.some((q: { id: string }) => q.id === excluded)).toBe(false);
    expect(result.hits.every((q: { exam: string }) => q.exam === exam)).toBe(true);
  });

  it("retains the official Q17 text correction and unambiguous Q1 commentary", () => {
    const q17 = getQuestionById(`${exam}-2025-annual-am2-q17`)!;
    expect(q17.choices?.イ).toContain("使用電圧に対する");
    expect(q17.choices?.イ).not.toContain("対1する");
    expect(q17.answer).toBe("イ");
    const q1 = getQuestionById(`${exam}-2025-annual-am2-q1`)!;
    expect(q1.choiceExplanations?.エ).toContain("設問では1/2");
    expect(q1.explanation).toContain("2025年4月1日時点");
  });
});
