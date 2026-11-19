import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { QuizCompleteScreen } from "@/components/quiz/QuizPlayer";

describe("演習完了画面", () => {
  it("戻るボタンを1つ表示し、日程リンクは閉じた詳細に置く", () => {
    const onBack = vi.fn();
    const { container } = render(<QuizCompleteScreen
      stats={{ answered: 10, correct: 7 }}
      elapsed={120}
      exam="ap"
      mode="random"
      scheduleUrl="https://tsugino-shikaku.jp/calendar"
      onBack={onBack}
    />);
    const back = screen.getByRole("button", { name: "モード選択に戻る" });
    expect(screen.getAllByRole("button")).toEqual([back]);
    fireEvent.click(back);
    expect(onBack).toHaveBeenCalledOnce();
    const details = container.querySelector("details");
    expect(details).not.toHaveAttribute("open");
    expect(details?.querySelector("a")).toHaveAttribute("href", "https://tsugino-shikaku.jp/calendar");
  });
});

describe("QuizCompleteScreen — 旗艦=午後論述AI採点への導線", () => {
  it("論述区分(pm)では /essay への旗艦導線を出す", () => {
    render(
      <QuizCompleteScreen
        stats={{ answered: 10, correct: 7 }}
        elapsed={120}
        exam="pm"
        mode="random"
        onBack={vi.fn()}
      />,
    );
    const link = screen.getByRole("link", { name: /論述の練習問題を見る/ });
    expect(link).toHaveAttribute("href", "/essay");
  });

  it("非論述区分(ap)では旗艦導線を出さない", () => {
    render(
      <QuizCompleteScreen
        stats={{ answered: 10, correct: 7 }}
        elapsed={120}
        exam="ap"
        mode="random"
        onBack={vi.fn()}
      />,
    );
    expect(
      screen.queryByRole("link", { name: /論述の練習問題を見る/ }),
    ).toBeNull();
  });
});
