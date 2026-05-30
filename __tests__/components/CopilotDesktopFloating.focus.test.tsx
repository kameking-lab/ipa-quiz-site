import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, fireEvent, cleanup, waitFor } from "@testing-library/react";

// next/navigation / posthog などブラウザ依存を stub して jsdom で描画する。
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), prefetch: vi.fn(), back: vi.fn() }),
  usePathname: () => "/quiz",
}));

import { CopilotDesktopFloating } from "@/components/copilot/CopilotPanel";
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
  // jsdom は Element.scrollTo を実装しないため stub(パネルが mount 時に呼ぶ)。
  Element.prototype.scrollTo = vi.fn() as unknown as Element["scrollTo"];
});

// デスクトップ版 AI コパイロットは開いた時にパネル内へフォーカスを移すが、
// 閉じた時にトリガー(FAB)へフォーカスを戻さないと、キーボード利用者が
// document.body に取り残される(WCAG 2.4.3 Focus Order / モーダルのフォーカス復帰)。
describe("CopilotDesktopFloating — 閉じたらトリガーへフォーカス復帰", () => {
  it("Escape で閉じると『AIに聞く』トリガーへフォーカスが戻る", async () => {
    render(
      <CopilotDesktopFloating
        question={question}
        selectedChoice="イ"
        isCorrect
        onRateLimitHit={() => {}}
        defaultOpen
      />,
    );

    // パネルが開いている状態(defaultOpen)から Escape で閉じる
    fireEvent.keyDown(window, { key: "Escape" });

    // 閉じた後、トリガー(FAB)が再描画され、そこへフォーカスが復帰すること
    await waitFor(() => {
      const fab = document.querySelector<HTMLButtonElement>(
        'button[aria-label="AI コパイロットを開く"]',
      );
      expect(fab).not.toBeNull();
      expect(document.activeElement).toBe(fab);
    });
  });
});
