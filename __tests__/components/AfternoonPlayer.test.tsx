import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, cleanup, fireEvent, waitFor } from "@testing-library/react";

import { AfternoonPlayer } from "@/components/afternoon/AfternoonPlayer";
import type { AfternoonQuestion } from "@/lib/afternoon/types";

function makeQuestion(): AfternoonQuestion {
  return {
    id: "ap-2024a-pm-q1",
    exam: "ap",
    year: 2024,
    season: "autumn",
    qNumber: 1,
    type: "descriptive",
    category: "情報セキュリティ",
    title: "テスト大問",
    context: "背景説明テキスト。",
    subQuestions: [
      {
        // 字数制限あり → aria-describedby が付与されるべき設問
        label: "設問1",
        prompt: "30字以内で述べよ。",
        type: "short-text",
        maxLength: 30,
        modelAnswer: "模範解答",
        scoringRubric: "ルーブリック",
      },
      {
        // 字数制限なし → aria-describedby は付与されないべき設問
        label: "設問2",
        prompt: "選択せよ。",
        type: "fill-blank",
        modelAnswer: "模範解答2",
        scoringRubric: "ルーブリック2",
      },
    ],
    pdfUrl: "https://example.com/q.pdf",
    license: "IPA-public",
  };
}

beforeEach(() => {
  cleanup();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

// 字数制限つき設問の textarea は aria-invalid だけでなく、なぜ無効かを
// スクリーンリーダーが説明できるよう、字数カウンタを aria-describedby で参照する。
describe("AfternoonPlayer — 字数制限の aria-describedby 連携", () => {
  it("字数制限つき設問の textarea がカウンタ span を aria-describedby で参照する", () => {
    render(<AfternoonPlayer questions={[makeQuestion()]} />);

    const textarea = screen.getByLabelText("設問1 の解答");
    const describedby = textarea.getAttribute("aria-describedby");
    expect(describedby).toBe("afternoon-設問1-count");

    // 参照先の要素が実在する（壊れた idref でない）こと
    const counter = document.getElementById(describedby as string);
    expect(counter).not.toBeNull();
    expect(counter?.textContent).toContain("30");
  });

  it("字数制限のない設問の textarea には aria-describedby を付けない", () => {
    render(<AfternoonPlayer questions={[makeQuestion()]} />);

    const textarea = screen.getByLabelText("設問2 の解答");
    expect(textarea.getAttribute("aria-describedby")).toBeNull();
  });
});

// 採点(数秒の AI 呼び出し)中は送信ボタンが disabled で a11y ツリーから消えるため、
// 進行状況を常設 live region でスクリーンリーダーに通知する(WCAG 4.1.3 status messages)。
describe("AfternoonPlayer — 採点進行状況の live region 通知", () => {
  it("初期は通知が空で、採点中は role=status が進行を読み上げる", async () => {
    // fetch を保留させ、isSubmitting=true の状態を維持する
    const pending = new Promise<never>(() => {});
    vi.stubGlobal(
      "fetch",
      vi.fn(() => pending),
    );

    render(<AfternoonPlayer questions={[makeQuestion()]} />);

    const status = screen.getByRole("status");
    // 採点前は無通知（常設だが空）
    expect(status.textContent).toBe("");

    fireEvent.click(screen.getByRole("button", { name: /採点する/ }));

    await waitFor(() => expect(status).toHaveTextContent("採点中"));
  });
});
