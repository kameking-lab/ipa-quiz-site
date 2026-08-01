import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, cleanup, fireEvent, waitFor } from "@testing-library/react";

import { QuizCompleteScreen } from "@/components/quiz/QuizPlayer";

beforeEach(() => {
  cleanup();
  localStorage.clear();
  Object.assign(navigator, {
    clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

// クイズ完了画面の結果URLコピーは、成功時にボタン文言が「コピーしました」へ
// 変わるだけで polite live region を持たず、ボタンのアクセシブル名変更は
// SR に自動告知されない取りこぼしだった(WCAG 4.1.3 Status Messages)。
describe("QuizCompleteScreen — コピー成功の SR 通知", () => {
  it("結果URLコピーで polite live region に成功が反映される", async () => {
    render(
      <QuizCompleteScreen
        stats={{ answered: 10, correct: 7 }}
        elapsed={120}
        exam="ap"
        mode="random"
        onRetry={vi.fn()}
        onBack={vi.fn()}
      />,
    );

    const status = screen.getByRole("status");
    expect(status).toHaveAttribute("aria-live", "polite");
    expect(status).toHaveTextContent("");

    fireEvent.click(screen.getByRole("button", { name: /URLコピー/ }));

    await waitFor(() => {
      expect(screen.getByRole("status")).toHaveTextContent("結果 URL をコピーしました");
    });
  });
});

// クイズ完了画面は最大エンゲージメントの単発タイミング。論述区分(ST/SA/PM/SM/AU)を
// 解き終えた読者にだけ旗艦=午後II論述AI採点(/essay)への導線を 1 回だけ出す
// (解説カードと違い問題ごとに繰り返さない)。ゲートは AfternoonEssayHint 内の
// ESSAY_EXAM_CODES 単一情報源。非論述区分には出さない(誇大回避)。
describe("QuizCompleteScreen — 旗艦=午後論述AI採点への導線", () => {
  it("論述区分(pm)では /essay への旗艦導線を出す", () => {
    render(
      <QuizCompleteScreen
        stats={{ answered: 10, correct: 7 }}
        elapsed={120}
        exam="pm"
        mode="random"
        onRetry={vi.fn()}
        onBack={vi.fn()}
      />,
    );
    const link = screen.getByRole("link", { name: /午後論述 AI 添削を試す/ });
    expect(link).toHaveAttribute("href", "/essay");
  });

  it("非論述区分(ap)では旗艦導線を出さない", () => {
    render(
      <QuizCompleteScreen
        stats={{ answered: 10, correct: 7 }}
        elapsed={120}
        exam="ap"
        mode="random"
        onRetry={vi.fn()}
        onBack={vi.fn()}
      />,
    );
    expect(
      screen.queryByRole("link", { name: /午後論述 AI 添削を試す/ }),
    ).toBeNull();
  });
});
