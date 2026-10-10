import { Children, isValidElement } from "react";
import { describe, expect, it, vi } from "vitest";
vi.mock("@/app/quiz/QuizClient", () => ({ QuizClient: () => null }));
import QuizPage from "@/app/quiz/page";
import QuestionPage, { generateMetadata } from "@/app/q/[exam]/[yearSeason]/[section]/[qnum]/page";
import { SHAROUSHI_QUESTIONS } from "@/data/questions/sharoushi";
import { KANGOSHI_QUESTIONS } from "@/data/questions/kangoshi";
import { questionPagePath } from "@/lib/seo/question-url";

describe("merged labor consultant and nurse routes", () => {
  it.each(["sharoushi", "kangoshi"] as const)("serves every %s question route and keeps quiz pools in the selected session", async (exam) => {
    const questions = exam === "sharoushi" ? SHAROUSHI_QUESTIONS : KANGOSHI_QUESTIONS;
    for (const q of questions) {
      const params = Promise.resolve({ exam, yearSeason: `${q.year}-${q.season}`, section: q.session, qnum: `q${q.qNumber}` });
      expect((await generateMetadata({ params })).alternates?.canonical).toContain(questionPagePath(q));
      expect(isValidElement(await QuestionPage({ params }))).toBe(true);
    }
    const quiz = await QuizPage({ searchParams: Promise.resolve({ exam, mode: "random" }) });
    const client = Children.toArray(quiz.props.children).find((node) => isValidElement<{poolIds?: string[]; exam?: string}>(node) && node.props.poolIds);
    expect(isValidElement<{poolIds: string[]; exam: string}>(client)).toBe(true);
    if (!isValidElement<{poolIds: string[]; exam: string}>(client)) throw Error("missing quiz client");
    expect(client.props.exam).toBe(exam);
    const defaultQuestions = exam === "kangoshi" ? questions.filter((q) => q.session === "am") : questions;
    expect(client.props.poolIds.toSorted()).toEqual(defaultQuestions.map((q) => q.id).toSorted());
    for (const session of new Set(questions.map((q) => q.session))) {
      const sessionQuiz = await QuizPage({ searchParams: Promise.resolve({ exam, mode: "random", session }) });
      const sessionClient = Children.toArray(sessionQuiz.props.children).find((node) => isValidElement<{poolIds?: string[]}>(node) && node.props.poolIds);
      if (!isValidElement<{poolIds: string[]}>(sessionClient)) throw Error("missing session quiz client");
      expect(sessionClient.props.poolIds.toSorted()).toEqual(questions.filter((q) => q.session === session).map((q) => q.id).toSorted());
    }
  });
});
