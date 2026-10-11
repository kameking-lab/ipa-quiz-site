// @vitest-environment jsdom
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DescriptiveAnswerCard } from "@/components/quiz/DescriptiveAnswerCard";
import type { Question } from "@/lib/questions/types";

const question: Question = {
  id: "chosashi-2025-am-q11", exam: "chosashi", session: "am", year: 2025, season: "autumn", qNumber: 11,
  type: "descriptive", category: "測量記述", topicTags: [], difficulty: 5,
  question: "座標と図面を記載しなさい。", answer: "独自解答例",
  modelAnswer: "独自の計算過程\n\n![地積の作図例](/images/questions/chosashi/example.svg)",
  scoringCriteria: "座標・辺長・方位を自己確認する。", explanation: "座標法による独自解説。",
  hasImage: false, sourcePdfUrl: "https://www.moj.go.jp/content/001450010.pdf",
  officialReferenceUrls: ["https://www.moj.go.jp/content/001452470.pdf"], license: "MOJ-attributed",
};

describe("記述の独自解答例", () => {
  it("公式解答と混同せず、解答例・作図・自己確認の観点を表示する", () => {
    render(<DescriptiveAnswerCard question={question} defaultOpen />);
    expect(screen.getByText(/法務省の公式解答ではありません/)).toBeTruthy();
    expect(screen.getByText(/自動採点を行いません/)).toBeTruthy();
    expect(screen.getByAltText("地積の作図例").getAttribute("src")).toBe("/images/questions/chosashi/example.svg");
    expect(screen.getByText("座標・辺長・方位を自己確認する。")).toBeTruthy();
  });

  it("公式出題趣旨を正答表として表示しない", () => {
    render(<DescriptiveAnswerCard question={question} />);
    const link = screen.getByRole("link", { name: "公式出題の趣旨（解答ではありません）" });
    expect(link.getAttribute("href")).toBe(question.officialReferenceUrls?.[0]);
    expect(screen.queryByRole("link", { name: /公式正答/ })).toBeNull();
  });

  it("次へ進む操作を呼び出し、解答表示だけでは履歴を記録しない", () => {
    const onNext = vi.fn();
    const storage = vi.spyOn(Storage.prototype, "setItem");
    render(<DescriptiveAnswerCard question={question} onNext={onNext} />);
    fireEvent.click(screen.getByRole("button", { name: "次の問題へ" }));
    expect(onNext).toHaveBeenCalledOnce();
    expect(storage).not.toHaveBeenCalled();
    storage.mockRestore();
  });
});
