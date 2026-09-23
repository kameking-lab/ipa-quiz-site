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
    ア: "誤りです。Aは価格や流通ではなく、設問で問われているコミュニケーションの定義に一致しません。",
    イ: "正しいです。Bは顧客との情報伝達を扱うコミュニケーションに該当し、設問の定義と一致します。",
    ウ: "誤りです。Cが表す活動は製品そのものに関する施策であり、情報伝達を扱う概念ではありません。",
    エ: "誤りです。Dが表す活動は販売経路の設計に関する施策であり、顧客との情報伝達とは区別されます。",
  },
  hasImage: false, sourcePdfUrl: "https://www.ipa.go.jp/shiken/", license: "IPA-public",
};
const props = { question, selected: "イ", isCorrect: true, starred: false,
  onToggleStar: vi.fn(), onNext: vi.fn(), onAskAI: vi.fn() };

describe("ExplanationCard learning continuity", () => {
  it("shows a substantive explanation even when it starts with the correct answer", () => {
    render(<ExplanationCard {...props} />);
    expect(screen.getByText(question.explanation)).toBeInTheDocument();
    expect(screen.queryByText(/解説は準備中/)).not.toBeInTheDocument();
  });
  it("shares the same question including its exam section", () => {
    render(<ExplanationCard {...props} />);
    const link = screen.getByRole("link", { name: "X (Twitter) で共有" });
    const url = new URL(link.getAttribute("href")!);
    expect(url.searchParams.get("url")).toBe("https://www.kakomon-ai.jp/q/st/2025-spring/am2/q1");
  });
  it("keeps the exam and category when returning to focused study", () => {
    render(<ExplanationCard {...props} isCorrect={false} selected="ア" />);
    expect(screen.getByRole("link", { name: "分野別で集中対策" })).toHaveAttribute("href", "/st/topic/%E6%83%85%E5%A0%B1%E6%88%A6%E7%95%A5");
  });
  it("puts the selected wrong choice reason before the full list", () => {
    render(<ExplanationCard {...props} isCorrect={false} selected="ア" />);
    const selectedReason = screen.getByRole("region", { name: "あなたが選んだ誤答の理由" });
    expect(selectedReason).toHaveTextContent("あなたが選んだ「ア」が違う理由");
    expect(selectedReason).toHaveTextContent(question.choiceExplanations!.ア!);
    expect(document.querySelector('[data-selected-choice="true"]')).toHaveTextContent("ア");
  });
});
