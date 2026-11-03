import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * /admin/exam-usage の「資格別回答数」は次の回答イベントを合算する:
 *   - question_answered (QuizPlayer の通常クイズ + /q/* 個別問題ページの QuestionAnswerCard)
 *   - exam_library_answered (公表試験問題ライブラリ)
 * ここではクライアント側が正しいイベント名・最小限のプロパティ (PII なし) で送ることを固定する。
 */

const { posthogCapture } = vi.hoisted(() => ({ posthogCapture: vi.fn() }));
vi.mock("@/lib/posthog", () => ({ posthogCapture }));

import { QuestionAnswerCard } from "@/components/quiz/QuestionAnswerCard";
import { ExamQuestionPlayer } from "@/components/exam-library/exam-question-player";
import { ExamLibraryCopilot } from "@/components/exam-library/exam-copilot";
import type { ExamQuestion } from "@/lib/exam-library-model";

// 実在するカタログ項目 (第一種衛生管理者 → ハブ dai-1-shu-eisei-kanrisha)
const EXAM_ID = "lckohyo-LC20260415-1";
const HUB_SLUG = "dai-1-shu-eisei-kanrisha";

function libraryQuestion(number: number): ExamQuestion {
  return {
    id: `${EXAM_ID}-q${number}`,
    number,
    text: `問 ${number} テキスト版`,
    images: [`/exam-library/${EXAM_ID}/q${number}.webp`],
    correctChoice: 3,
    choiceCount: 5,
    answerAuthority: "official",
    sourcePages: [number + 1],
  };
}

beforeEach(() => {
  cleanup();
  posthogCapture.mockClear();
  window.localStorage.clear();
  window.sessionStorage.clear();
});

describe("QuestionAnswerCard (/q/*) — question_answered", () => {
  const props = {
    questionId: "ip-2024s-am-q1",
    choices: { ア: "選択肢ア", イ: "選択肢イ", ウ: "選択肢ウ", エ: "選択肢エ" },
    answerKey: "イ" as const,
    exam: "ip" as const,
    year: 2024,
    season: "spring" as const,
    session: "am" as const,
    qNumber: 1,
  };

  it("emits question_answered with only exam / questionId / correct when a choice is answered", () => {
    render(<QuestionAnswerCard {...props} />);
    fireEvent.keyDown(window, { key: "2" });
    const calls = posthogCapture.mock.calls.filter(([name]) => name === "question_answered");
    expect(calls).toHaveLength(1);
    expect(calls[0]?.[1]).toEqual({ questionId: "ip-2024s-am-q1", exam: "ip", correct: true });
  });

  it("does NOT emit question_answered for the reveal-only (no answer) path", () => {
    render(<QuestionAnswerCard {...props} />);
    fireEvent.click(screen.getByRole("button", { name: /答えだけ見る/ }));
    expect(posthogCapture.mock.calls.some(([name]) => name === "question_answered")).toBe(false);
  });
});

describe("ExamQuestionPlayer — exam_library_answered", () => {
  it("emits exam_library_answered with examId and the qualification hub slug only", () => {
    render(
      <ExamQuestionPlayer
        examId={EXAM_ID}
        examTitle="第一種衛生管理者 令和8年4月掲載"
        pdfUrl="https://www.exam.or.jp/wp-content/uploads/2026/04/TEST.pdf"
        indexUrl="https://www.exam.or.jp/lckohyo/"
        questions={[libraryQuestion(1), libraryQuestion(2)]}
      />,
    );
    fireEvent.click(screen.getByRole("radio", { name: /^選択肢 3:/ }));
    const calls = posthogCapture.mock.calls.filter(([name]) => name === "exam_library_answered");
    expect(calls).toHaveLength(1);
    expect(calls[0]?.[1]).toEqual({ examId: EXAM_ID, hubSlug: HUB_SLUG });
  });
});

describe("ExamLibraryCopilot — exam_library_ai_query", () => {
  it("emits exam_library_ai_query with examId and hub slug only (never the question text)", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, json: async () => ({ message: "x" }) }));
    render(<ExamLibraryCopilot examId={EXAM_ID} questionId={`${EXAM_ID}-q1`} selectedChoice={null} />);
    fireEvent.click(screen.getByRole("button", { name: /この問題をAIに質問/ }));
    fireEvent.change(screen.getByLabelText(/どこが分からないですか/), { target: { value: "個人的な質問文" } });
    fireEvent.click(screen.getByRole("button", { name: "AIに聞く" }));
    const calls = posthogCapture.mock.calls.filter(([name]) => name === "exam_library_ai_query");
    expect(calls).toHaveLength(1);
    expect(calls[0]?.[1]).toEqual({ examId: EXAM_ID, hubSlug: HUB_SLUG });
    expect(JSON.stringify(calls[0]?.[1])).not.toContain("個人的な質問文");
    await screen.findByRole("alert");
    vi.unstubAllGlobals();
  });
});
