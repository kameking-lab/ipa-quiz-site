import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
const { push } = vi.hoisted(() => ({ push: vi.fn() }));
vi.mock("next/navigation", () => ({ useRouter: () => ({ push, replace: vi.fn(), prefetch: vi.fn(), back: vi.fn() }) }));
import { QuizPlayer } from "@/components/quiz/QuizPlayer";
import type { Question } from "@/lib/questions/types";
const question: Question = { id: "ap-2024a-am-q1", exam: "ap", session: "am", year: 2024, season: "autumn", qNumber: 1, type: "multiple-choice", category: "テクノロジ", topicTags: [], difficulty: 3, question: "テスト問題", choices: { ア: "一", イ: "二", ウ: "三", エ: "四" }, answer: "イ", explanation: "二が正しい理由を説明します。", hasImage: false, sourcePdfUrl: "https://example.com/q.pdf", license: "IPA-public" };
beforeEach(() => {
  localStorage.clear();
  push.mockClear();
  vi.spyOn(window, "scrollTo").mockImplementation(() => {});
  Object.defineProperty(HTMLElement.prototype, "scrollTo", { configurable: true, value: vi.fn() });
});
describe("QuizPlayer completion", () => {
  it("finishes three questions on a results screen without navigating home", () => {
    const onNext = vi.fn();
    const player = render(<QuizPlayer question={question} index={0} total={3} mode="random" onNext={onNext} />);
    expect(screen.getByText("モード: ランダム")).toBeTruthy();
    for (let index = 0; index < 3; index += 1) {
      if (index > 0) player.rerender(<QuizPlayer question={{ ...question, id: `q${index}`, qNumber: index + 1 }} index={index} total={3} mode="random" onNext={onNext} />);
      fireEvent.click(screen.getByRole("radio", { name: /^選択肢 イ:/ }));
      const buttons = screen.getAllByRole("button", { name: index === 2 ? "結果を見る" : "次の問題へ" });
      expect(buttons).toHaveLength(1);
      fireEvent.click(buttons[0]);
    }
    expect(screen.getByRole("heading", { name: "クイズ完了！" })).toBeTruthy();
    expect(screen.getByText("3/3")).toBeTruthy();
    expect(onNext).toHaveBeenCalledTimes(2);
    expect(push).not.toHaveBeenCalled();
  });

  it("keeps the last question available for AI follow-up and links to the matching schedule and learning hub", () => {
    render(<QuizPlayer question={question} index={0} total={1} mode="random" onNext={vi.fn()} />);
    fireEvent.click(screen.getByRole("radio", { name: /^選択肢 イ:/ }));
    fireEvent.click(screen.getByRole("button", { name: "結果を見る" }));

    expect(screen.getByRole("link", { name: /試験日・申込締切を次の資格で確認/ }).getAttribute("href"))
      .toBe("https://tsugino-shikaku.jp/shikaku/ap");
    expect(screen.getByRole("link", { name: /対応する学習・教材を次の資格で選ぶ/ }).getAttribute("href"))
      .toBe("https://tsugino-shikaku.jp/learn/ap");

    fireEvent.click(screen.getByRole("button", { name: "最後の問題をAIに質問" }));
    expect(screen.getByRole("region", { name: "正解の解説" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "この問題をAIに質問" })).toBeTruthy();
  });
});
