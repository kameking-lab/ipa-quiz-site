import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { ExplanationCard } from "@/components/quiz/ExplanationCard";
import { createHistoryStore } from "@/lib/storage/history";
import { getAllBookmarks } from "@/lib/storage/bookmarks";
import type { Question } from "@/lib/questions/types";

const question: Question = { id: "ap-2024a-am-q1", exam: "ap", session: "am", year: 2024, season: "autumn", qNumber: 1, type: "multiple-choice", category: "テクノロジ", topicTags: [], difficulty: 3, question: "保存操作の確認", choices: { ア: "A", イ: "B", ウ: "C", エ: "D" }, answer: "イ", explanation: "正解はイです。", hasImage: false, sourcePdfUrl: "https://www.ipa.go.jp/shiken/", license: "IPA-public" };
beforeEach(() => localStorage.clear());
describe("review star and saved reference have separate purposes", () => {
  it("shows both names and saves to distinct stores", () => {
    const history = createHistoryStore();
    render(<ExplanationCard question={question} selected="イ" isCorrect starred={false} onToggleStar={() => history.toggleStar(question.id)} onNext={vi.fn()} onAskAI={vi.fn()} />);
    const star = screen.getByRole("button", { name: "苦手復習に追加（Rキー）" });
    const saved = screen.getByRole("button", { name: "資料保存（ブックマークに追加）" });
    expect(star).toHaveTextContent("苦手復習"); expect(saved).toHaveTextContent("資料保存");
    fireEvent.click(saved);
    expect(getAllBookmarks().map((entry) => entry.questionId)).toEqual([question.id]);
    expect(history.getStarredIds()).toEqual([]);
    fireEvent.click(star);
    expect(history.getStarredIds()).toEqual([question.id]);
    expect(getAllBookmarks().map((entry) => entry.questionId)).toEqual([question.id]);
    fireEvent.click(screen.getByRole("button", { name: "資料保存（ブックマークから外す）" }));
    expect(getAllBookmarks()).toEqual([]);
    expect(history.getStarredIds()).toEqual([question.id]);
  });
});
