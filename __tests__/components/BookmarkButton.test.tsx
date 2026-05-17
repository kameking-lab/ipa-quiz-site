import { describe, it, expect, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { BookmarkButton } from "@/components/BookmarkButton";
import type { Question } from "@/lib/questions/types";

const mockQuestion: Question = {
  id: "ap-2023s-am-q1",
  exam: "ap",
  session: "am",
  year: 2023,
  season: "spring",
  qNumber: 1,
  type: "multiple-choice",
  category: "テクノロジ",
  topicTags: ["アルゴリズム"],
  difficulty: 3,
  question: "テスト問題です。",
  choices: { ア: "選択肢ア", イ: "選択肢イ", ウ: "選択肢ウ", エ: "選択肢エ" },
  answer: "ア",
  explanation: "解説テキストです。",
  hasImage: false,
  sourcePdfUrl: "https://example.com/test.pdf",
  license: "IPA-public",
};

beforeEach(() => {
  localStorage.clear();
});

describe("BookmarkButton", () => {
  it("renders as un-bookmarked by default", () => {
    const { container } = render(<BookmarkButton question={mockQuestion} />);
    expect(container).toMatchSnapshot();
  });

  it("renders with correct aria-label when not bookmarked", () => {
    const { getByRole } = render(<BookmarkButton question={mockQuestion} />);
    const btn = getByRole("button");
    expect(btn).toHaveAttribute("aria-label", "ブックマークに追加");
    expect(btn).toHaveAttribute("aria-pressed", "false");
  });
});
