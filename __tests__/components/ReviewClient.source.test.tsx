import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { ReviewClient } from "@/app/review/ReviewClient";
import type { Question } from "@/lib/questions/types";

const fpQuestion: Question = {
  id: "fp3-2026-published-academic-q1", exam: "fp3", session: "theory",
  year: 2026, season: "published", qNumber: 1, type: "multiple-choice",
  category: "ライフプランニング", topicTags: [], difficulty: 2,
  question: "法令基準日の表示確認", choices: { ア: "一", イ: "二" },
  answer: "ア", explanation: "一が正解です。", hasImage: false,
  sourcePdfUrl: "https://www.jafp.or.jp/exam/mohan/files/g3_202605_qa.pdf",
  lawReferenceDate: "2025-04-01", sourceAttribution: "日本FP協会", license: "JAFP-reuse-with-attribution",
};

beforeEach(() => localStorage.clear());
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

function mockDueQuestion(question: Question) {
  vi.stubGlobal("fetch", vi.fn(async () => new Response(JSON.stringify({
    questions: [question], seenCount: 1, scheduledCount: 0, nextReviewDate: null,
  }), { status: 200, headers: { "Content-Type": "application/json" } })));
}

describe("復習画面の出題根拠", () => {
  it("既存の法令基準日、年度、出典を表示する", async () => {
    mockDueQuestion(fpQuestion);
    render(<ReviewClient examFromQuery="fp3" />);
    await screen.findByText(fpQuestion.question);
    expect(screen.getByText(/法令基準日: 2025-04-01/)).toBeInTheDocument();
    expect(screen.getByText(/出題: .*2026年.*問1/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "問題PDF" })).toHaveAttribute("href", fpQuestion.sourcePdfUrl);
    expect(screen.getByText(/日本FP協会/)).toBeInTheDocument();
  });

  it("法令資格で基準日がない場合は未確認と示す", async () => {
    mockDueQuestion({ ...fpQuestion, lawReferenceDate: undefined });
    render(<ReviewClient examFromQuery="fp3" />);
    await screen.findByText(fpQuestion.question);
    expect(screen.getByText(/法令基準日: 未確認/)).toBeInTheDocument();
  });

  it("法令基準日を持たない情報処理試験へ不要な未確認表示を出さない", async () => {
    mockDueQuestion({ ...fpQuestion, exam: "ap", lawReferenceDate: undefined });
    render(<ReviewClient examFromQuery="ap" />);
    await screen.findByText(fpQuestion.question);
    expect(screen.queryByText(/法令基準日:/)).not.toBeInTheDocument();
  });

  it("非IPA問題で出典URLが未確認ならIPA一覧を出典と偽らない", async () => {
    mockDueQuestion({ ...fpQuestion, sourcePdfUrl: "未確認" });
    render(<ReviewClient examFromQuery="fp3" />);
    await screen.findByText(fpQuestion.question);
    expect(screen.getByText(/出典資料リンク未確認/)).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /IPA公式の過去問一覧/ })).not.toBeInTheDocument();
  });
});
