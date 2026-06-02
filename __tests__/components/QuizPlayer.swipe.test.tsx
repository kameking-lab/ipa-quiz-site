import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, fireEvent, createEvent, cleanup } from "@testing-library/react";

// QuizPlayer uses next/navigation's useRouter; stub it so it renders in jsdom.
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), prefetch: vi.fn(), back: vi.fn() }),
}));

import { QuizPlayer } from "@/components/quiz/QuizPlayer";
import { createHistoryStore } from "@/lib/storage/history";
import type { Question } from "@/lib/questions/types";

const question: Question = {
  id: "ap-2024a-am-q1",
  exam: "ap",
  session: "am",
  year: 2024,
  season: "autumn",
  qNumber: 1,
  type: "multiple-choice",
  category: "テクノロジ",
  topicTags: [],
  difficulty: 3,
  question: "これはテスト問題です。",
  choices: { ア: "選択肢ア", イ: "選択肢イ", ウ: "選択肢ウ", エ: "選択肢エ" },
  answer: "イ",
  explanation: "正解はイです。",
  hasImage: false,
  sourcePdfUrl: "https://example.com/q.pdf",
  license: "IPA-public",
};

beforeEach(() => {
  cleanup();
  window.localStorage.clear();
  createHistoryStore().reset();
});

// A left-swipe after revealing advances to the next question. The browser fires
// a synthetic click after touchend; if it is not suppressed, that click lands on
// the next question's (now-enabled) choice and selects an answer the user never
// intended. The handler must call preventDefault() on a real swipe — and must
// NOT consume plain taps (those still need to select a choice).
describe("QuizPlayer — swipe suppresses the synthetic click", () => {
  function revealAndGetMain() {
    const { container } = render(
      <QuizPlayer question={question} index={0} total={10} mode="random" onNext={onNext} />,
    );
    // Reveal the explanation (so the swipe-to-next handler becomes active).
    fireEvent.keyDown(window, { key: "1" });
    const main = container.querySelector("main")!;
    expect(main).toBeTruthy();
    return main;
  }

  let onNext: ReturnType<typeof vi.fn>;
  beforeEach(() => {
    onNext = vi.fn();
  });

  it("left-swipe advances AND calls preventDefault (synthetic click killed)", () => {
    const main = revealAndGetMain();
    fireEvent.touchStart(main, { touches: [{ clientX: 240, clientY: 100 }] });
    const touchEnd = createEvent.touchEnd(main, {
      changedTouches: [{ clientX: 60, clientY: 108 }],
    });
    const preventDefault = vi.spyOn(touchEnd, "preventDefault");
    fireEvent(main, touchEnd);

    expect(onNext).toHaveBeenCalledTimes(1);
    expect(preventDefault).toHaveBeenCalled();
  });

  it("a plain tap (no horizontal travel) neither advances nor preventDefaults", () => {
    const main = revealAndGetMain();
    fireEvent.touchStart(main, { touches: [{ clientX: 200, clientY: 100 }] });
    const touchEnd = createEvent.touchEnd(main, {
      changedTouches: [{ clientX: 204, clientY: 101 }],
    });
    const preventDefault = vi.spyOn(touchEnd, "preventDefault");
    fireEvent(main, touchEnd);

    expect(onNext).not.toHaveBeenCalled();
    expect(preventDefault).not.toHaveBeenCalled();
  });
});
