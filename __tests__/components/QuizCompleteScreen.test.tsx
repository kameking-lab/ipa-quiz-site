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
