import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ExplanationCard } from "@/components/quiz/ExplanationCard";
import type { Question } from "@/lib/questions/types";

const question: Question = {
  id: "st-2025-spring-am2-q1", exam: "st", session: "am2", year: 2025,
  season: "spring", qNumber: 1, type: "multiple-choice", category: "情報戦略",
  topicTags: [], difficulty: 3, question: "問題文", choices: { ア: "A", イ: "B", ウ: "C", エ: "D" },
  answer: "イ", explanation: "正解はイです。プロモーションに対応するのはコミュニケーションです。",
  choiceExplanations: {
    ア: "誤りです。アは選択した誤答に固有の理由です。正答のイとは対象とする概念が異なります。",
    イ: "正しいです。イは問題が問う概念に対応し、公式正答とも一致します。",
    ウ: "誤りです。ウは別の概念を説明しており、問題が問う対象には当たりません。",
    エ: "誤りです。エは前提条件が異なるため、この設問の答えにはなりません。",
  },
  hasImage: false, sourcePdfUrl: "https://www.ipa.go.jp/shiken/", license: "IPA-public",
};
const props = { question, selected: "イ", isCorrect: true, onNext: vi.fn() };

describe("ExplanationCard learning continuity", () => {
  it("shows a shared fallback source only once", () => {
    render(<ExplanationCard {...props} />);
    expect(screen.getAllByRole("link", { name: /公式問題の公開ページ/ })).toHaveLength(1);
  });
  it("keeps the answer source in collapsed details before the next action", () => {
    render(<ExplanationCard {...props} question={{ ...question, sourceAnswerUrl: "https://example.com/answer.pdf" }} />);
    const answer = document.querySelector('[href="https://example.com/answer.pdf"]');
    expect(answer).toHaveTextContent("公式正答PDF");
    expect(answer?.closest("details")?.open).toBe(false);
    const source = screen.getByRole("link", { name: /公式問題の公開ページ/ });
    const next = screen.getByRole("button", { name: "次の問題へ" });
    expect(source.compareDocumentPosition(next)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  });
  it("shows each dental key in a multiple-selection response as its printed label", () => {
    render(<ExplanationCard {...props} question={{ ...question, exam: "shika-ishi", answer: ["イ", "ウ"] }} selected="イ・ウ" isCorrect={false} />);
    expect(screen.getByText(/正解: b・c \/ あなた: b・c/)).toBeInTheDocument();
  });
  it.each([
    ["tohan", "ウ", "結論: 正解は(3)です。"],
    ["denken3", "ウ", "結論: 正解は(3)です。"],
    ["kaigo", "ウ", "結論: 正解は3です。"],
    ["st", "イ", "結論: 正解はイです。"],
  ] as const)("shows the complete conclusion for %s", (exam, answer, conclusion) => {
    render(<ExplanationCard {...props} question={{ ...question, exam, answer }} />);
    expect(screen.getByText(conclusion, { exact: true })).toBeInTheDocument();
  });
  it("shows a substantive explanation even when it starts with the correct answer", () => {
    render(<ExplanationCard {...props} />);
    expect(screen.getByText(question.explanation)).toBeInTheDocument();
    expect(screen.queryByText(/解説は準備中/)).not.toBeInTheDocument();
  });
  it("shows the selected wrong choice reason before the all-choice list", () => {
    render(<ExplanationCard {...props} isCorrect={false} selected="ア" />);
    const selectedReason = screen.getByRole("region", { name: "あなたが選んだ誤答の理由" });
    expect(selectedReason).toHaveTextContent("選択した誤答に固有の理由");
    expect(screen.getAllByText(question.choiceExplanations!.ア!)).toHaveLength(1);
    expect(screen.getByText(question.choiceExplanations!.イ!)).toBeInTheDocument();
    expect(selectedReason.compareDocumentPosition(screen.getByRole("region", { name: "不正解の解説" }).querySelector('[aria-label="選択肢ごとの解説"]')!))
      .toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  });
});
