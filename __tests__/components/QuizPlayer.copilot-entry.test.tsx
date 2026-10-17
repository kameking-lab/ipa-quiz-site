import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import type { Question } from "@/lib/questions/types";
import { QuizPlayer } from "@/components/quiz/QuizPlayer";

vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn() }) }));
vi.mock("@/components/copilot/CopilotPanel", () => {
  const Panel = ({ surface, initialPrompt, onDismiss }: { surface: string; initialPrompt?: string; onDismiss?: () => void }) =>
    <div data-testid={`copilot-${surface}`} data-prompt={initialPrompt}><button onClick={onDismiss}>質問を閉じる</button></div>;
  return {
    CopilotDesktopFloating: (props: object) => <Panel surface="desktop" {...props} />,
    CopilotMobileSheet: (props: object) => <Panel surface="mobile" {...props} />,
  };
});
const question: Question = {
  id: "ip-2024s-am-q1", exam: "ip", year: 2024, season: "spring", session: "am", qNumber: 1,
  type: "multiple-choice", question: "確認用の問題", choices: { ア: "誤りの肢", イ: "正しい肢", ウ: "別の肢", エ: "残りの肢" },
  answer: "イ", explanation: "正答に至る既存の解説です。", choiceExplanations: { ア: "アは条件が違います。", イ: "イは条件を満たします。" },
  category: "テクノロジ", topicTags: [], difficulty: 1, hasImage: false,
  sourcePdfUrl: "https://www.ipa.go.jp/shiken/mondai-kaiotu/2024r06.html", license: "IPA-public",
};
const mediaResult = (matches: boolean) => ({ matches, addEventListener: vi.fn(), removeEventListener: vi.fn(), addListener: vi.fn(), removeListener: vi.fn() });
beforeEach(() => {
  cleanup(); localStorage.clear();
  vi.stubGlobal("matchMedia", vi.fn(() => mediaResult(false)));
  vi.spyOn(window, "scrollTo").mockImplementation(() => {});
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); vi.restoreAllMocks(); });

describe("practice explanation owns one optional AI entry", () => {
  it.each([false, true])("dismisses on a viewport breakpoint change and restores the entry (desktop=%s)", (desktop) => {
    const listeners = new Set<(event: MediaQueryListEvent) => void>();
    vi.stubGlobal("matchMedia", vi.fn((query: string) => query === "(min-width: 640px)"
      ? ({ ...mediaResult(desktop), addEventListener: (_: string, listener: (event: MediaQueryListEvent) => void) => listeners.add(listener), removeEventListener: (_: string, listener: (event: MediaQueryListEvent) => void) => listeners.delete(listener) })
      : mediaResult(false)));
    render(<QuizPlayer question={question} index={0} total={2} mode="year" onNext={vi.fn()} />);
    fireEvent.click(screen.getByRole("radio", { name: /選択肢 ア:/ }));
    const entry = screen.getByRole("button", { name: "まだ分からない点を聞く" });
    entry.focus(); fireEvent.click(entry);
    act(() => { for (const listener of listeners) listener({ matches: !desktop } as MediaQueryListEvent); });
    expect(screen.queryByTestId("copilot-mobile")).not.toBeInTheDocument();
    expect(screen.queryByTestId("copilot-desktop")).not.toBeInTheDocument();
    expect(entry).toHaveFocus();
    expect(listeners.size).toBe(0);
  });

  it("keeps AI closed before an answer, then opens only the mobile panel after existing explanations", () => {
    render(<QuizPlayer question={question} index={0} total={2} mode="year" onNext={vi.fn()} />);
    expect(screen.queryByTestId("copilot-mobile")).not.toBeInTheDocument();
    expect(screen.queryByTestId("copilot-desktop")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("radio", { name: /選択肢 ア:/ }));
    const reason = screen.getByRole("region", { name: "あなたが選んだ誤答の理由" });
    const entry = screen.getByRole("button", { name: "まだ分からない点を聞く" });
    expect(reason.compareDocumentPosition(entry) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    fireEvent.click(entry);
    expect(screen.getByTestId("copilot-mobile").getAttribute("data-prompt")).toContain("私が選んだ答えがなぜ違うのか");
    expect(screen.queryByTestId("copilot-desktop")).not.toBeInTheDocument();
  });

  it("reopens the same question without automatically sending the wrong-answer prompt again", () => {
    render(<QuizPlayer question={question} index={0} total={2} mode="year" onNext={vi.fn()} />);
    fireEvent.click(screen.getByRole("radio", { name: /選択肢 ア:/ }));
    const entry = screen.getByRole("button", { name: "まだ分からない点を聞く" });
    entry.focus(); fireEvent.click(entry);
    fireEvent.click(screen.getByRole("button", { name: "質問を閉じる" }));
    expect(entry).toHaveFocus();
    expect(screen.queryByTestId("copilot-mobile")).not.toBeInTheDocument();
    fireEvent.click(entry);
    expect(screen.getByTestId("copilot-mobile")).not.toHaveAttribute("data-prompt");
  });

  it("opens only the desktop panel after a correct answer", () => {
    vi.stubGlobal("matchMedia", vi.fn(() => mediaResult(true)));
    render(<QuizPlayer question={question} index={0} total={2} mode="year" onNext={vi.fn()} />);
    fireEvent.click(screen.getByRole("radio", { name: /選択肢 イ:/ }));
    fireEvent.click(screen.getByRole("button", { name: "まだ分からない点を聞く" }));
    expect(screen.getByTestId("copilot-desktop")).not.toHaveAttribute("data-prompt");
    expect(screen.queryByTestId("copilot-mobile")).not.toBeInTheDocument();
  });
});
