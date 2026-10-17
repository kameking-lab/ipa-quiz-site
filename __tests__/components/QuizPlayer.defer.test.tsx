import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { QuizPlayer } from "@/components/quiz/QuizPlayer";
import { createHistoryStore } from "@/lib/storage/history";
import type { Question } from "@/lib/questions/types";

vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn() }) }));

const first: Question = {
  id: "ap-2024a-am-q1", exam: "ap", session: "am", year: 2024,
  season: "autumn", qNumber: 1, type: "multiple-choice", category: "テクノロジ",
  topicTags: [], difficulty: 3, question: "保留操作の確認問題",
  choices: { ア: "一", イ: "二", ウ: "三", エ: "四" }, answer: "イ",
  explanation: "イが正解です。", hasImage: false,
  sourcePdfUrl: "https://www.ipa.go.jp/shiken/mondai-kaiotu/2024r06.html", license: "IPA-public",
};

beforeEach(() => {
  localStorage.clear();
  vi.spyOn(window, "scrollTo").mockImplementation(() => {});
});

describe("QuizPlayerの保留操作", () => {
  it("分からないを誤答として記録し、後回しを未回答に残して最後まで進める", () => {
    const onNext = vi.fn();
    const view = render(<QuizPlayer question={first} index={0} total={2} mode="year" onNext={onNext} />);

    fireEvent.click(screen.getByRole("button", { name: /分からない（解説を見る/ }));
    expect(screen.getByRole("region", { name: "不正解の解説" })).toBeInTheDocument();
    expect(screen.getByText(/あなた: 分からない/)).toBeInTheDocument();
    expect(createHistoryStore().getAllEntries()).toMatchObject([
      { id: first.id, selected: "分からない", correct: false },
    ]);

    fireEvent.click(screen.getByRole("button", { name: "次の問題へ" }));
    expect(onNext).toHaveBeenCalledOnce();
    const second = { ...first, id: "ap-2024a-am-q2", qNumber: 2, question: "後回しにする問題" };
    view.rerender(<QuizPlayer question={second} index={1} total={2} mode="year" onNext={onNext} />);
    fireEvent.click(screen.getByRole("button", { name: /後回し（未回答のまま次へ/ }));

    expect(screen.getByRole("heading", { name: "クイズ完了！" })).toBeInTheDocument();
    expect(screen.getByText(/後回し: 1問/)).toBeInTheDocument();
    expect(createHistoryStore().getAnsweredIds()).toEqual([first.id]);
    expect(onNext).toHaveBeenCalledOnce();
  });

  it("最後の一問を後回しにしても結果画面へ進める", () => {
    render(<QuizPlayer question={first} index={0} total={1} mode="year" onNext={vi.fn()} />);
    fireEvent.click(screen.getByRole("button", { name: /後回し（未回答のまま次へ/ }));
    expect(screen.getByRole("heading", { name: "クイズ完了！" })).toBeInTheDocument();
    expect(screen.getByText("未採点")).toBeInTheDocument();
    expect(screen.queryByText("結果をシェアする")).not.toBeInTheDocument();
    expect(createHistoryStore().getAllEntries()).toEqual([]);
  });
});
