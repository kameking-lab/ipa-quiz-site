import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";

import { EssayEditor } from "@/components/essay/EssayEditor";
import type { EssayQuestion } from "@/lib/essay/types";

function makeQuestion(): EssayQuestion {
  const sub = (key: "ア" | "イ" | "ウ") => ({
    key,
    prompt: `設問${key}の本文`,
    targetChars: 700,
    minChars: 600,
    maxChars: 800,
    modelOutline: "骨子",
  });
  return {
    id: "st-2024a-pm2-q1",
    exam: "st",
    year: 2024,
    season: "autumn",
    qNumber: 1,
    title: "論述テスト",
    context: "背景。",
    subPrompts: [sub("ア"), sub("イ"), sub("ウ")],
    officialReview: "講評",
    pdfUrl: "https://example.com/q.pdf",
    license: "IPA-public",
  };
}

beforeEach(() => {
  cleanup();
  window.localStorage.clear();
});

// 各論述 textarea は CardTitle「設問X」と紐づかない裸のコントロールだった。
// アクセシブルネーム（aria-label）と字数目安の説明（aria-describedby）を付与し、
// スクリーンリーダーがどの設問の入力欄かを読み上げられるようにする。
describe("EssayEditor — 論述 textarea のアクセシブルネーム", () => {
  it("設問ア・イ・ウ の textarea がそれぞれ aria-label を持つ", () => {
    render(<EssayEditor question={makeQuestion()} />);

    for (const key of ["ア", "イ", "ウ"] as const) {
      const textarea = screen.getByLabelText(`設問${key}の論述`);
      expect(textarea.tagName).toBe("TEXTAREA");
      // 字数目安への aria-describedby が実在 idref を指す
      const describedby = textarea.getAttribute("aria-describedby");
      expect(describedby).toBe(`essay-${key}-count`);
      expect(document.getElementById(describedby as string)).not.toBeNull();
    }
  });

  // 業種選択 <select> も CardTitle「業種を選択」とは紐づかない裸のコントロールで、
  // textarea 群と違い aria-label が抜けていた（同じ a11y クラスの取りこぼし）。
  it("業種選択 select がアクセシブルネームを持つ", () => {
    render(<EssayEditor question={makeQuestion()} />);
    const select = screen.getByLabelText("業種を選択");
    expect(select.tagName).toBe("SELECT");
  });
});

// ヒントの表示/非表示ボタンはコンテンツ領域を開閉する disclosure だが、
// aria-expanded が無く SR 利用者に開閉状態がプログラム的に伝わらなかった（WCAG 4.1.2）。
describe("EssayEditor — ヒント開閉ボタンの aria-expanded", () => {
  it("初期状態は aria-expanded='false'、クリックで 'true' に同期しヒントが表示される", () => {
    render(<EssayEditor question={makeQuestion()} />);

    const toggles = screen.getAllByRole("button", { name: "論述要素のヒントを表示" });
    expect(toggles.length).toBeGreaterThan(0);
    for (const btn of toggles) {
      expect(btn.getAttribute("aria-expanded")).toBe("false");
    }

    fireEvent.click(toggles[0]);

    const opened = screen.getByRole("button", { name: "ヒントを隠す" });
    expect(opened.getAttribute("aria-expanded")).toBe("true");
  });
});
