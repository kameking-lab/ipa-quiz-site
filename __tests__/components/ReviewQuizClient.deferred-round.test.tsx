import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { ReviewQuizClient } from "@/app/quiz/review/ReviewQuizClient";
import { createHistoryStore } from "@/lib/storage/history";
import { LS_KEYS } from "@/lib/storage/keys";
import type { Question } from "@/lib/questions/types";

vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn() }) }));
vi.mock("@/lib/learning/spaced-repetition", () => ({
  getDueCards: () => [
    { id: "ap-2024a-am-q1", dueAt: 1 },
    { id: "ap-2024a-am-q2", dueAt: 2 },
  ],
  getCards: () => [],
  recordReview: vi.fn(),
}));

const first: Question = {
  id: "ap-2024a-am-q1", exam: "ap", session: "am", year: 2024,
  season: "autumn", qNumber: 1, type: "multiple-choice", category: "テクノロジ",
  topicTags: [], difficulty: 3, question: "復習の最初の問題",
  choices: { ア: "一", イ: "二", ウ: "三", エ: "四" }, answer: "イ",
  explanation: "イが正解です。", hasImage: false,
  sourcePdfUrl: "https://www.ipa.go.jp/shiken/mondai-kaiotu/2024r06.html", license: "IPA-public",
};
const second: Question = { ...first, id: "ap-2024a-am-q2", qNumber: 2, question: "復習の次の問題" };
const questions = new Map([first, second].map((question) => [question.id, question]));

beforeEach(() => {
  localStorage.clear();
  sessionStorage.clear();
  localStorage.setItem(LS_KEYS.settings, JSON.stringify({ recordHistory: false }));
  vi.spyOn(window, "scrollTo").mockImplementation(() => {});
  vi.stubGlobal("fetch", vi.fn(async (input: string) => {
    const id = new URL(input, window.location.origin).searchParams.get("id");
    const question = id ? questions.get(id) : undefined;
    return question ? new Response(JSON.stringify(question), { status: 200 }) : new Response("", { status: 404 });
  }));
});
afterEach(() => vi.unstubAllGlobals());

describe("復習演習の後回しラウンド", () => {
  it("履歴OFFでも復習プール内の残件のみ再開し、再後回しと回答済みを区別する", async () => {
    render(<ReviewQuizClient />);
    await screen.findByText(first.question);
    fireEvent.click(screen.getByRole("button", { name: /後回し（未回答のまま次へ/ }));
    await screen.findByText(second.question);
    fireEvent.click(screen.getByRole("button", { name: /後回し（未回答のまま次へ/ }));

    fireEvent.click(screen.getByRole("button", { name: "後回しの問題を解く（2問）" }));
    await screen.findByText(first.question);
    fireEvent.click(screen.getByRole("radio", { name: /^選択肢 イ:/ }));
    fireEvent.click(screen.getByRole("button", { name: "次の問題へ" }));
    await screen.findByText(second.question);
    fireEvent.click(screen.getByRole("button", { name: /後回し（未回答のまま次へ/ }));

    fireEvent.click(screen.getByRole("button", { name: "後回しの問題を解く（1問）" }));
    await screen.findByText(second.question);
    fireEvent.click(screen.getByRole("radio", { name: /^選択肢 イ:/ }));
    fireEvent.click(screen.getByRole("button", { name: "結果を見る" }));
    expect(screen.queryByRole("button", { name: /後回しの問題を解く/ })).not.toBeInTheDocument();
    expect(createHistoryStore().getAllEntries()).toEqual([]);
    expect(screen.getByText("2/2")).toBeInTheDocument();
  });
});
