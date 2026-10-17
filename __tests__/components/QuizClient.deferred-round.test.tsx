import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { QuizClient } from "@/app/quiz/QuizClient";
import { createHistoryStore } from "@/lib/storage/history";
import { LS_KEYS } from "@/lib/storage/keys";
import type { Question } from "@/lib/questions/types";

vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn() }) }));

const first: Question = {
  id: "ap-2024a-am-q1", exam: "ap", session: "am", year: 2024,
  season: "autumn", qNumber: 1, type: "multiple-choice", category: "テクノロジ",
  topicTags: [], difficulty: 3, question: "最初の問題",
  choices: { ア: "一", イ: "二", ウ: "三", エ: "四" }, answer: "イ",
  explanation: "イが正解です。", hasImage: false,
  sourcePdfUrl: "https://www.ipa.go.jp/shiken/mondai-kaiotu/2024r06.html", license: "IPA-public",
};
const second: Question = { ...first, id: "ap-2024a-am-q2", qNumber: 2, question: "次の問題" };
const questions = new Map([first, second].map((question) => [question.id, question]));

beforeEach(() => {
  localStorage.clear();
  sessionStorage.clear();
  localStorage.setItem(LS_KEYS.settings, JSON.stringify({ recordHistory: false }));
  window.history.replaceState(null, "", "/quiz?mode=year&exam=ap");
  vi.spyOn(window, "scrollTo").mockImplementation(() => {});
  vi.stubGlobal("fetch", vi.fn(async (input: string) => {
    const id = new URL(input, window.location.origin).searchParams.get("id");
    const question = id ? questions.get(id) : undefined;
    return question ? new Response(JSON.stringify(question), { status: 200 }) : new Response("", { status: 404 });
  }));
});
afterEach(() => vi.unstubAllGlobals());

describe("QuizClientの後回しラウンド", () => {
  it("履歴OFFでも同じプール内の後回し問題を取り戻し、再度後回しした分だけ残す", async () => {
    render(<QuizClient poolIds={[first.id, second.id]} mode="year" backHref="/ap" exam="ap" />);
    await screen.findByText(first.question);
    fireEvent.click(screen.getByRole("button", { name: /後回し（未回答のまま次へ/ }));
    await screen.findByText(second.question);
    fireEvent.click(screen.getByRole("button", { name: /後回し（未回答のまま次へ/ }));

    expect(screen.getByText("未採点")).toBeInTheDocument();
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
