import { describe, it, expect } from "vitest";
import { buildMarkdown } from "@/lib/chat/export-markdown";
import type { ChatSession } from "@/lib/chat/types";
import type { Question } from "@/lib/questions/types";
import { SITE_BASE_URL } from "@/lib/seo/config";
import { examLabel, formatYearSeason } from "@/lib/utils";

/**
 * buildMarkdown は AI コパイロット会話の Markdown エクスポート（フェーズ2 履歴保存/
 * エクスポート機能）の整形純関数。崩れるとユーザーがダウンロードする .md の見出し・
 * 出典・正解・会話ログの構造が壊れる。downloadMarkdown（Blob/DOM 副作用）は対象外。
 */
function makeQuestion(overrides: Partial<Question> = {}): Question {
  return {
    id: "ap-2023s-am-q1",
    exam: "ap",
    session: "am",
    year: 2023,
    season: "spring",
    qNumber: 7,
    type: "multiple-choice",
    category: "テクノロジ",
    topicTags: [],
    difficulty: 3,
    question: "問題文ほんぶん",
    choices: { ア: "選択肢ア", イ: "選択肢イ", ウ: "選択肢ウ", エ: "選択肢エ" },
    answer: "イ",
    explanation: "解説ほんぶん",
    hasImage: false,
    sourcePdfUrl: "https://example.com/q.pdf",
    license: "IPA-public",
    ...overrides,
  };
}

function makeSession(messages: ChatSession["messages"] = []): ChatSession {
  return {
    id: "s1",
    questionId: "ap-2023s-am-q1",
    examCode: "ap",
    year: 2023,
    season: "spring",
    qNumber: 7,
    questionText: "問題文ほんぶん",
    questionCategory: "テクノロジ",
    messages,
    createdAt: "2023-04-01T00:00:00.000Z",
    updatedAt: "2023-04-01T00:00:00.000Z",
  };
}

describe("buildMarkdown", () => {
  it("見出しに試験名・年度季節・問番号を含む", () => {
    const q = makeQuestion();
    const md = buildMarkdown(makeSession(), q);
    expect(md).toContain(
      `# IPA過去問 - ${examLabel(q.exam)} ${formatYearSeason(q.year, q.season)} 問${q.qNumber}`,
    );
  });

  it("出典行・問題文・解説を常に含む", () => {
    const md = buildMarkdown(makeSession(), makeQuestion());
    expect(md).toContain("**出典**: IPA情報処理技術者試験");
    expect(md).toContain("## 問題");
    expect(md).toContain("問題文ほんぶん");
    expect(md).toContain("## 解説");
    expect(md).toContain("解説ほんぶん");
  });

  it("選択肢があれば箇条書きで描画する", () => {
    const md = buildMarkdown(makeSession(), makeQuestion());
    expect(md).toContain("## 選択肢");
    expect(md).toContain("- **ア**: 選択肢ア");
    expect(md).toContain("- **エ**: 選択肢エ");
  });

  it("選択肢が無ければ選択肢セクションを出さない（記述式など）", () => {
    const md = buildMarkdown(
      makeSession(),
      makeQuestion({ choices: undefined, type: "descriptive" }),
    );
    expect(md).not.toContain("## 選択肢");
  });

  it("正解が文字列ならそのまま太字で出す", () => {
    const md = buildMarkdown(makeSession(), makeQuestion({ answer: "ウ" }));
    expect(md).toContain("## 正解");
    expect(md).toContain("**ウ**");
  });

  it("正解が配列なら『・』で連結する", () => {
    const md = buildMarkdown(makeSession(), makeQuestion({ answer: ["ア", "ウ"] }));
    expect(md).toContain("**ア・ウ**");
  });

  it("会話ログを role 別ラベルで描画する", () => {
    const md = buildMarkdown(
      makeSession([
        { role: "user", content: "これは何", createdAt: "2023-04-01T00:00:00.000Z" },
        { role: "assistant", content: "こう答える", createdAt: "2023-04-01T00:00:01.000Z" },
      ]),
      makeQuestion(),
    );
    expect(md).toContain("## AIコパイロットとの会話");
    expect(md).toContain("**ユーザー**: これは何");
    expect(md).toContain("**過去問AI**:");
    expect(md).toContain("こう答える");
  });

  it("フッターにサイト URL を含む", () => {
    const md = buildMarkdown(makeSession(), makeQuestion());
    expect(md.trimEnd().endsWith(`*過去問AI - ${SITE_BASE_URL}*`)).toBe(true);
  });
});
