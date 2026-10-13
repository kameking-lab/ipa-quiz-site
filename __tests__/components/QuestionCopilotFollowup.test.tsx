import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import type { Question } from "@/lib/questions/types";
import { createHistoryStore } from "@/lib/storage/history";
import { QuestionAnswerCard } from "@/components/quiz/QuestionAnswerCard";
import { QuestionRevealProvider } from "@/components/quiz/QuestionRevealProvider";
import { QuestionCopilotFollowup } from "@/components/quiz/QuestionCopilotFollowup";

vi.mock("@/components/copilot/CopilotPanel", () => {
  const Panel = ({ surface, selectedChoice, isCorrect, initialPrompt, onDismiss }: { surface: string; selectedChoice?: string; isCorrect?: boolean; initialPrompt?: string; onDismiss?: () => void }) =>
    <div data-testid={`copilot-${surface}`} data-selected={selectedChoice} data-correct={isCorrect === undefined ? undefined : String(isCorrect)} data-prompt={initialPrompt}><button onClick={onDismiss}>質問を閉じる</button></div>;
  return {
    CopilotDesktopFloating: (props: object) => <Panel surface="desktop" {...props} />,
    CopilotMobileSheet: (props: object) => <Panel surface="mobile" {...props} />,
  };
});

const question: Question = {
  id: "ip-2024s-am-q1", exam: "ip", year: 2024, season: "spring", session: "am", qNumber: 1,
  type: "multiple-choice", question: "確認用の選択式問題", choices: { ア: "誤りの肢", イ: "正しい肢", ウ: "別の肢", エ: "残りの肢" },
  answer: "イ", explanation: "既存の学習用解説です。", choiceExplanations: { ア: "アは前提条件が違います。", イ: "イは条件を満たします。" },
  category: "テクノロジ", topicTags: [], difficulty: 1, hasImage: false,
  sourcePdfUrl: "https://www.ipa.go.jp/shiken/mondai-kaiotu/2024r06.html", license: "IPA-public",
};

function Lesson({ q = question }: { q?: Question }) {
  return <QuestionRevealProvider key={q.id}>
    <QuestionAnswerCard question={q} questionId={q.id} choices={q.choices} answerKey={q.answer} exam={q.exam} year={q.year} season={q.season} session={q.session} qNumber={q.qNumber} />
    <div>既存の解説本文と公式出典</div>
    <QuestionCopilotFollowup question={q} />
  </QuestionRevealProvider>;
}

beforeEach(() => {
  cleanup(); localStorage.clear();
  vi.stubGlobal("matchMedia", vi.fn(() => ({ matches: false })));
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

describe("one optional question follow-up after existing explanation", () => {
  it("shows the stored wrong-choice reason before the only AI entry and mounts one mobile panel", async () => {
    render(<Lesson />);
    expect(screen.queryByTestId("copilot-mobile")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("radio", { name: /選択肢 ア:/ }));
    const reason = screen.getByRole("region", { name: "あなたが選んだ誤答の理由" });
    expect(reason).toHaveTextContent("アは前提条件が違います。");
    const entry = screen.getByRole("button", { name: "まだ分からない点を聞く" });
    expect(reason.compareDocumentPosition(entry) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(screen.getAllByRole("button", { name: "まだ分からない点を聞く" })).toHaveLength(1);
    fireEvent.click(entry);
    const panel = await screen.findByTestId("copilot-mobile");
    expect(panel).toHaveAttribute("data-selected", "ア");
    expect(panel).toHaveAttribute("data-correct", "false");
    expect(panel.getAttribute("data-prompt")).toContain("私が選んだ答えがなぜ違うのか");
    expect(screen.queryByTestId("copilot-desktop")).not.toBeInTheDocument();
    expect(createHistoryStore().getAllEntries()).toHaveLength(1);
  });

  it("mounts only the desktop panel for a correct answer without a wrong-answer prompt", async () => {
    vi.stubGlobal("matchMedia", vi.fn(() => ({ matches: true })));
    render(<Lesson />);
    fireEvent.click(screen.getByRole("radio", { name: /選択肢 イ:/ }));
    fireEvent.click(screen.getByRole("button", { name: "まだ分からない点を聞く" }));
    const panel = await screen.findByTestId("copilot-desktop");
    expect(panel).toHaveAttribute("data-selected", "イ");
    expect(panel).toHaveAttribute("data-correct", "true");
    expect(panel).not.toHaveAttribute("data-prompt");
    expect(screen.queryByTestId("copilot-mobile")).not.toBeInTheDocument();
  });

  it("does not invent an attempt or a wrong reason during reading without grading", async () => {
    render(<Lesson />);
    fireEvent.click(screen.getByRole("button", { name: "採点せずに答えだけ見る" }));
    expect(screen.queryByRole("region", { name: "あなたが選んだ誤答の理由" })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "まだ分からない点を聞く" }));
    const panel = await screen.findByTestId("copilot-mobile");
    expect(panel).not.toHaveAttribute("data-selected");
    expect(panel).not.toHaveAttribute("data-correct");
    expect(panel).not.toHaveAttribute("data-prompt");
    expect(createHistoryStore().getAllEntries()).toHaveLength(0);
  });

  it("does not carry the previous answer into the next question", async () => {
    const view = render(<Lesson />);
    fireEvent.click(screen.getByRole("radio", { name: /選択肢 ア:/ }));
    view.rerender(<Lesson q={{ ...question, id: "ip-2024s-am-q2", qNumber: 2 }} />);
    fireEvent.click(screen.getByRole("button", { name: "まだ分からない点を聞く" }));
    const panel = await screen.findByTestId("copilot-mobile");
    expect(panel).not.toHaveAttribute("data-selected");
    expect(panel).not.toHaveAttribute("data-correct");
    expect(createHistoryStore().getAllEntries()).toHaveLength(1);
  });

  it("returns to the single entry after closing and does not automatically resend the wrong-answer prompt", async () => {
    render(<Lesson />);
    fireEvent.click(screen.getByRole("radio", { name: /選択肢 ア:/ }));
    const entry = screen.getByRole("button", { name: "まだ分からない点を聞く" });
    fireEvent.click(entry);
    await screen.findByTestId("copilot-mobile");
    fireEvent.click(screen.getByRole("button", { name: "質問を閉じる" }));
    expect(screen.queryByTestId("copilot-mobile")).not.toBeInTheDocument();
    expect(entry).toHaveFocus();
    expect(screen.getAllByRole("button", { name: "まだ分からない点を聞く" })).toHaveLength(1);
    vi.stubGlobal("matchMedia", vi.fn(() => ({ matches: true })));
    fireEvent.click(entry);
    const panel = await screen.findByTestId("copilot-desktop");
    expect(panel).toHaveAttribute("data-correct", "false");
    expect(panel).not.toHaveAttribute("data-prompt");
    expect(createHistoryStore().getAllEntries()).toHaveLength(1);
  });

  it("advertises four real choice keys and ignores digits while an unrelated modal is open", () => {
    const view = render(<><div role="dialog" aria-modal="true">別の操作</div><Lesson /></>);
    expect(screen.getByRole("radiogroup")).toHaveAccessibleName(/数字キー1〜4/);
    fireEvent.keyDown(window, { key: "1" });
    expect(createHistoryStore().getAllEntries()).toHaveLength(0);
    view.rerender(<Lesson />);
    fireEvent.keyDown(window, { key: "2" });
    expect(createHistoryStore().getAllEntries()).toMatchObject([{ selected: "イ", correct: true }]);
  });

  it("does not manufacture a reason when the stored question has no choice explanation", () => {
    render(<Lesson q={{ ...question, choiceExplanations: undefined }} />);
    fireEvent.click(screen.getByRole("radio", { name: /選択肢 ア:/ }));
    expect(screen.queryByRole("region", { name: "あなたが選んだ誤答の理由" })).not.toBeInTheDocument();
    expect(screen.getByText(/不正解 — 正解は イ/)).toBeInTheDocument();
  });
});
