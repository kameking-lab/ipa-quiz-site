import { Children, isValidElement } from "react";
import { describe, expect, it, vi } from "vitest";
vi.mock("@/app/quiz/QuizClient", () => ({ QuizClient: () => null }));
import QuizPage from "@/app/quiz/page";
import QuestionPage, { generateMetadata } from "@/app/q/[exam]/[yearSeason]/[section]/[qnum]/page";
import { SHAROUSHI_QUESTIONS } from "@/data/questions/sharoushi";
import { KANGOSHI_QUESTIONS } from "@/data/questions/kangoshi";
import { questionPagePath } from "@/lib/seo/question-url";

const exams = ["sharoushi", "kangoshi"] as const;
const questionsForExam = (exam: (typeof exams)[number]) =>
  exam === "sharoushi" ? SHAROUSHI_QUESTIONS : KANGOSHI_QUESTIONS;
const allQuestions = [...SHAROUSHI_QUESTIONS, ...KANGOSHI_QUESTIONS];
const questionsById = new Map(allQuestions.map((q) => [q.id, q] as const));
const routeCases = allQuestions.map((q) => [
  q.id,
  { exam: q.exam, yearSeason: q.year + "-" + q.season, section: q.session, qnum: "q" + q.qNumber },
] as const);
const poolCases = exams.flatMap((exam) => [
  { label: exam + ":default", exam, session: undefined },
  ...[...new Set(questionsForExam(exam).map((q) => q.session))].map((session) => ({
    label: exam + ":" + session,
    exam,
    session,
  })),
]);

describe("merged labor consultant and nurse routes", () => {
  it.each(routeCases)("%s serves its question route", async (id, route) => {
    const q = questionsById.get(id);
    if (!q) throw new Error("Missing question: " + id);
    const params = Promise.resolve(route);
    expect((await generateMetadata({ params })).alternates?.canonical).toContain(questionPagePath(q));
    expect(isValidElement(await QuestionPage({ params }))).toBe(true);
  });

  it.each(poolCases)("$label keeps the selected quiz pool", async ({ exam, session }) => {
    const quiz = await QuizPage({
      searchParams: Promise.resolve({ exam, mode: "random", ...(session ? { session } : {}) }),
    });
    const client = Children.toArray(quiz.props.children).find(
      (node) => isValidElement<{ poolIds?: string[]; exam?: string }>(node) && node.props.poolIds,
    );
    expect(isValidElement<{ poolIds: string[]; exam: string }>(client)).toBe(true);
    if (!isValidElement<{ poolIds: string[]; exam: string }>(client)) throw Error("missing quiz client");
    expect(client.props.exam).toBe(exam);
    const selectedSession = session ?? (exam === "kangoshi" ? "am" : "gakka");
    expect(client.props.poolIds.toSorted()).toEqual(
      questionsForExam(exam).filter((q) => q.session === selectedSession).map((q) => q.id).toSorted(),
    );
  });
});
