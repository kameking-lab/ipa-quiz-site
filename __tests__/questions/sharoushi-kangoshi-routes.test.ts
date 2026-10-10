import { Children, isValidElement } from "react";
import { describe, expect, it, vi } from "vitest";
vi.mock("@/app/quiz/QuizClient", () => ({ QuizClient: () => null }));
import QuizPage from "@/app/quiz/page";
import QuestionPage, { generateMetadata } from "@/app/q/[exam]/[yearSeason]/[section]/[qnum]/page";
import { SHAROUSHI_QUESTIONS } from "@/data/questions/sharoushi";
import { KANGOSHI_QUESTIONS } from "@/data/questions/kangoshi";
import { questionPagePath } from "@/lib/seo/question-url";

describe("merged labor consultant and nurse routes", () => {
  it.each(["sharoushi", "kangoshi"] as const)("serves each %s question route and its own ten-question quiz pool", async (exam) => {
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
    expect(client.props.poolIds.toSorted()).toEqual(questions.map((q) => q.id).toSorted());
  });
});
