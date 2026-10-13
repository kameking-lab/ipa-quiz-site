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

describe("QuizCompleteScreen — 検索演習の共有文脈", () => {
  it("試験横断検索をAPと誤表示せず、検索結果URLを共有する", async () => {
    render(
      <QuizCompleteScreen
        stats={{ answered: 2, correct: 1 }}
        elapsed={30}
        exam="search"
        mode="random"
        labelOverride="検索結果から選んだ問題"
        shareHref="/search?q=SQL&recent=1"
        onRetry={vi.fn()}
        onBack={vi.fn()}
      />,
    );

    const xShare = screen.getByRole("link", { name: /X でシェア/ });
    expect(decodeURIComponent(xShare.getAttribute("href") ?? "")).toContain(
      "検索結果から選んだ問題の過去問",
    );
    expect(decodeURIComponent(xShare.getAttribute("href") ?? "")).toContain(
      "/search?q=SQL&recent=1",
    );

    fireEvent.click(screen.getByRole("button", { name: /URLコピー/ }));
    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        expect.stringMatching(/\/search\?q=SQL&recent=1$/),
      );
    });
  });
});

// 論述区分に限り、IPA公式の問題・解答例を探す導線を表示する。
// 解答のAI採点は提供せず、他の区分には論述の案内を出さない。
describe("QuizCompleteScreen — 公式論述過去問への導線", () => {
  it("論述区分(pm)では公式問題・解答例を案内し、点数と再挑戦を保つ", () => {
    const onRetry = vi.fn();
    render(
      <QuizCompleteScreen
        stats={{ answered: 10, correct: 7 }}
        elapsed={120}
        exam="pm"
        mode="random"
        onRetry={onRetry}
        onBack={vi.fn()}
      />,
    );
    expect(screen.getByRole("complementary", { name: /公式過去問/ })).toHaveTextContent("IPAが公開する問題と解答例");
    const link = screen.getByRole("link", { name: "公式過去問を見る" });
    expect(link).toHaveAttribute("href", "/essay");
    expect(screen.queryByRole("link", { name: /AI.*採点|AI.*添削/ })).toBeNull();
    expect(screen.getByText("7/10")).toBeInTheDocument();
    expect(screen.getByText("2:00")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "もう一度挑戦" }));
    expect(onRetry).toHaveBeenCalledOnce();
  });

  it("非論述区分(ap)では論述の案内を出さない", () => {
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
    expect(screen.queryByRole("complementary", { name: /公式過去問/ })).toBeNull();
    expect(screen.queryByRole("link", { name: "公式過去問を見る" })).toBeNull();
  });
});
