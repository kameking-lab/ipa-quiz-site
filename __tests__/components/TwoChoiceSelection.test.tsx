import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), prefetch: vi.fn(), back: vi.fn() }),
}));

import { QuestionAnswerCard } from "@/components/quiz/QuestionAnswerCard";
import { QuizPlayer } from "@/components/quiz/QuizPlayer";
import { KANKOJI2_2026_QUESTIONS } from "@/data/questions/kankoji2";
import { createHistoryStore } from "@/lib/storage/history";
import { isCompleteSelectionCorrect, isAcceptedAnswer, requiredSelectionCount } from "@/lib/questions/answers";
import type { ChoiceKey } from "@/lib/questions/types";

// 令和8年度前期 No.49：適当でないものを二つ選ぶ。公式正答は2と4（イ・エ）。
const q49 = KANKOJI2_2026_QUESTIONS.find((q) => q.qNumber === 49)!;

function renderCard() {
  return render(
    <QuestionAnswerCard
      questionId={q49.id}
      choices={q49.choices!}
      answerKey={q49.answer as ChoiceKey[]}
      exam={q49.exam}
      year={q49.year}
      season={q49.season}
      session={q49.session}
      qNumber={q49.qNumber}
      requiredSelections={q49.requiredSelections}
    />,
  );
}

beforeEach(() => {
  cleanup();
  window.localStorage.clear();
  createHistoryStore().reset();
});

describe("「二つとも答えなさい」形式の採点", () => {
  it("正答の二肢がそろった場合だけ正解とする", () => {
    expect(requiredSelectionCount(q49)).toBe(2);
    expect(q49.answer).toEqual(["イ", "エ"]);
    expect(isCompleteSelectionCorrect(q49.answer, ["エ", "イ"])).toBe(true);
    expect(isCompleteSelectionCorrect(q49.answer, ["イ"])).toBe(false);
    expect(isCompleteSelectionCorrect(q49.answer, ["イ", "ウ"])).toBe(false);
    // 1肢選択の訂正問題（どちらも正解）は従来どおり1肢で正解。
    expect(isAcceptedAnswer(["イ", "エ"], "エ")).toBe(true);
  });

  it("/q の解答カードは1肢目では採点せず、選び直しのあと2肢目で採点する", () => {
    renderCard();
    expect(screen.getAllByRole("checkbox")).toHaveLength(4);
    expect(screen.getByTestId("multi-select-hint").textContent).toContain("0/2");
    fireEvent.click(screen.getByRole("checkbox", { name: /選択肢 イ/ }));
    expect(screen.getByTestId("multi-select-hint").textContent).toContain("1/2");
    expect(createHistoryStore().getAllEntries()).toHaveLength(0);
    // 選び直し：イを外してウ・エを選ぶと不正解
    fireEvent.click(screen.getByRole("checkbox", { name: /選択肢 イ/ }));
    fireEvent.click(screen.getByRole("checkbox", { name: /選択肢 ウ/ }));
    fireEvent.click(screen.getByRole("checkbox", { name: /選択肢 エ/ }));
    expect(screen.getByText(/不正解 — 正解は イ・エ/)).toBeTruthy();
    expect(createHistoryStore().getAllEntries()[0]).toMatchObject({ id: q49.id, selected: "ウ・エ", correct: false });
  });

  it("/q の解答カードは数字キーで二肢を選ぶと正解になる", () => {
    renderCard();
    fireEvent.keyDown(window, { key: "4" });
    fireEvent.keyDown(window, { key: "2" });
    expect(screen.getByText("正解！")).toBeTruthy();
    expect(createHistoryStore().getAllEntries()[0]).toMatchObject({ selected: "イ・エ", correct: true });
  });

  it("クイズ画面も二肢そろうまで採点しない", () => {
    render(<QuizPlayer question={q49} index={0} total={52} mode="year" onNext={() => {}} />);
    fireEvent.keyDown(window, { key: "2" });
    expect(createHistoryStore().getAllEntries()).toHaveLength(0);
    fireEvent.keyDown(window, { key: "4" });
    expect(createHistoryStore().getAllEntries()[0]).toMatchObject({ id: q49.id, selected: "イ・エ", correct: true });
  });

  it("クイズ画面で一肢だけ正しい組合せは不正解", () => {
    render(<QuizPlayer question={q49} index={0} total={52} mode="year" onNext={() => {}} />);
    fireEvent.keyDown(window, { key: "1" });
    fireEvent.keyDown(window, { key: "2" });
    expect(createHistoryStore().getAllEntries()[0]).toMatchObject({ selected: "ア・イ", correct: false });
  });
});
