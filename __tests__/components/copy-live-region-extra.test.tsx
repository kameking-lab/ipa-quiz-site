import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, cleanup, fireEvent, waitFor } from "@testing-library/react";

import { StreamSummary } from "@/components/quiz/stream/StreamSummary";

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

// コピー成功はボタン文言が変わるだけでは SR に告知されない(WCAG 4.1.3
// Status Messages)。各コピーボタンに polite live region を添えて告知する。
describe("コピー成功の SR 通知(追加コンポーネント)", () => {
  it("StreamSummary: テキストコピーで polite live region に成功が反映される", async () => {
    render(
      <StreamSummary
        recentAnswers={[{ questionId: "q1", selected: "ア", correct: true }]}
        totalAnswered={1}
        onContinue={vi.fn()}
        canContinue={false}
      />,
    );

    const status = screen.getByRole("status");
    expect(status).toHaveAttribute("aria-live", "polite");
    expect(status).toHaveTextContent("");

    fireEvent.click(screen.getByRole("button", { name: /テキストをコピー/ }));

    await waitFor(() => {
      expect(screen.getByRole("status")).toHaveTextContent("テキストをコピーしました");
    });
  });

});
