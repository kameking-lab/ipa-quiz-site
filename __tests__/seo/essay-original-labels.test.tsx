import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

import EssayHomePage from "@/app/essay/page";
import EssayEditorPage, {
  generateMetadata as gradingMetadata,
} from "@/app/essay/[exam]/[questionId]/page";
import EssaysExamPage from "@/app/essays/[exam]/page";
import EssaysDetailPage, {
  generateMetadata as referenceMetadata,
} from "@/app/essays/[exam]/[yearSeason]/[section]/[qnum]/page";
import { getAllEssayQuestions } from "@/lib/essay/load";
import {
  ESSAY_EXAM_CODES,
  getEssayQuestionsByExam,
  questionToUrlParts,
} from "@/lib/essays/load";

vi.mock("@/components/essay/EssayEditor", () => ({ EssayEditor: () => null }));
vi.mock("@/components/quiz/InlineBookHint", () => ({ InlineBookHint: () => null }));
vi.mock("@/components/analytics/ViewTracker", () => ({ ViewTracker: () => null }));

describe("independent essay material attribution", () => {
  it("is backed by material marked original in both essay catalogs", () => {
    expect(getAllEssayQuestions().length).toBeGreaterThan(0);
    expect(getAllEssayQuestions().every((question) => question.license === "original")).toBe(true);
    const references = ESSAY_EXAM_CODES.flatMap(getEssayQuestionsByExam);
    expect(references.length).toBeGreaterThan(0);
    expect(references.every((question) => question.license === "original")).toBe(true);
  });

  it("labels years as catalog labels next to links on the grading index", () => {
    const markup = renderToStaticMarkup(<EssayHomePage />);
    expect(markup).toContain("AI 論述添削 β版・月3回まで無料");
    expect(markup).toContain("独自練習・教材整理用ラベル");
  });

  it("labels the grading question itself as original practice", async () => {
    const question = getAllEssayQuestions()[0]!;
    const params = { exam: question.exam, questionId: question.id };
    const markup = renderToStaticMarkup(await EssayEditorPage({
      params: Promise.resolve(params),
    }));
    const metadata = await gradingMetadata({ params: Promise.resolve(params) });
    expect(markup).toContain("教材整理用ラベル:");
    expect(markup).toContain("実際の試験で出題された問題ではありません");
    expect(metadata.title).toContain("教材整理用ラベル:");
    expect(metadata.description).toContain("実際のIPA過去問ではありません");
  });

  it("labels the reference answer cards and detail header", async () => {
    const exam = "sc";
    const question = getEssayQuestionsByExam(exam)[0]!;
    const parts = questionToUrlParts(question, exam);
    const examMarkup = renderToStaticMarkup(await EssaysExamPage({
      params: Promise.resolve({ exam }),
    }));
    const detailParams = parts;
    const detailMarkup = renderToStaticMarkup(await EssaysDetailPage({
      params: Promise.resolve(detailParams),
    }));
    const metadata = await referenceMetadata({ params: Promise.resolve(detailParams) });
    expect(examMarkup).toContain("教材整理用ラベル:");
    expect(examMarkup).toContain("独自練習・午後 II 問");
    expect(detailMarkup).toContain("教材整理用ラベル:");
    expect(detailMarkup).toContain("独自練習・午後 II 問");
    expect(metadata.title).toContain("教材整理用ラベル:");
    expect(metadata.description).toContain("実際のIPA過去問・公式解答ではありません");
  });
});
