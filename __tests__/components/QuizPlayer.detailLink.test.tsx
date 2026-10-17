import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn(), back: vi.fn() }) }));
import { QuizPlayer } from "@/components/quiz/QuizPlayer";
import { IP_QUESTIONS } from "@/data/questions/ip";
import { questionPagePath } from "@/lib/seo/question-url";
import { createHistoryStore } from "@/lib/storage/history";
import type { Question } from "@/lib/questions/types";
const base = IP_QUESTIONS.find((q) => q.id === "ip-2009a-am-q1")!;
beforeEach(() => { localStorage.clear(); });
afterEach(cleanup);
describe("answer to the same public explanation and feedback page", () => {
  it.each([
    { ...base, id: "ip-2024c-am-q1", exam: "ip", year: 2024, season: "cbt", qNumber: 1 },
    { ...base, id: "denken2-test", exam: "denken2", session: "riron", year: 2026, season: "annual", qNumber: 3, part: "2" },
    { ...base, id: "denken3-test", exam: "denken3", session: "kikai", year: 2025, season: "second", qNumber: 15, part: "a" },
  ] as Question[])("$exam link appears only after answering and preserves the original part", (question) => {
    render(<QuizPlayer question={question} index={0} total={2} mode="year" onNext={() => {}} />);
    expect(screen.queryByRole("link", { name: "公開解説・誤り報告を開く" })).not.toBeInTheDocument();
    fireEvent.keyDown(window, { key: "1" });
    expect(screen.getByRole("link", { name: "公開解説・誤り報告を開く" })).toHaveAttribute("href", `${questionPagePath(question)}#explanation`);
    expect(createHistoryStore().getAllEntries()).toHaveLength(1);
    expect(createHistoryStore().getAllEntries()[0]?.id).toBe(question.id);
  });
});
