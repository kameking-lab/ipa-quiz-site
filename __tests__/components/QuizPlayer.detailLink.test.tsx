import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn(), back: vi.fn() }) }));
import { QuizPlayer } from "@/components/quiz/QuizPlayer";
import { IP_QUESTIONS } from "@/data/questions/ip";
import { createHistoryStore } from "@/lib/storage/history";
import { getBookmark, toggleBookmark, updateBookmarkTags } from "@/lib/storage/bookmarks";
import type { Question } from "@/lib/questions/types";
const base = IP_QUESTIONS.find((q) => q.id === "ip-2009a-am-q1")!;
beforeEach(() => { localStorage.clear(); });
afterEach(cleanup);
describe("answer to the same public explanation and feedback page", () => {
  it("leaves saved bookmarks available while removing the in-quiz editor", () => {
    toggleBookmark(base);
    updateBookmarkTags(base.id, ["保存済み"]);
    render(<QuizPlayer question={base} index={0} total={2} mode="year" onNext={() => {}} />);
    fireEvent.keyDown(window, { key: "1" });
    expect(screen.queryByRole("button", { name: "ブックマークから外す" })).toBeNull();
    expect(getBookmark(base.id)?.tags).toEqual(["保存済み"]);
  });

  it.each([
    { ...base, id: "ip-2024c-am-q1", exam: "ip", year: 2024, season: "cbt", qNumber: 1 },
    { ...base, id: "denken2-test", exam: "denken2", session: "riron", year: 2026, season: "annual", qNumber: 3, part: "2" },
    { ...base, id: "denken3-test", exam: "denken3", session: "kikai", year: 2025, season: "second", qNumber: 15, part: "a" },
  ] as Question[])("$exam keeps grading without a report link", (question) => {
    render(<QuizPlayer question={question} index={0} total={2} mode="year" onNext={() => {}} />);
    expect(screen.queryByRole("link", { name: "誤りを報告" })).not.toBeInTheDocument();
    fireEvent.keyDown(window, { key: "1" });
    expect(screen.queryByRole("link", { name: "誤りを報告" })).toBeNull();
    expect(createHistoryStore().getAllEntries()).toHaveLength(1);
    expect(createHistoryStore().getAllEntries()[0]?.id).toBe(question.id);
  });
});
