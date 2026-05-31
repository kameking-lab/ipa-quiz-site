import { describe, it, expect } from "vitest";
import { assembleCopilotPrompt } from "@/lib/copilot/prompt-assembly";
import type { PromptAssemblyInput } from "@/lib/copilot/prompt-assembly";
import { COPILOT_SYSTEM_PROMPT } from "@/lib/ai/prompts";
import type { Question, ExamCode, Season, Session } from "@/lib/questions/types";

// assembleCopilotPrompt は AI コパイロット（B軸＝差別化中核）の system プロンプトと
// user メッセージ列を組み立てる純関数。セクションの順序・条件付き挿入（キャラクター/
// 応答長/RAG/プロフィール）・クイックアクションの先頭付与・入力非破壊は、崩れると
// モデルへ渡る文脈が静かにずれ（誤った口調・出典逸脱・プロフィール誤適用）るため、
// 現挙動を回帰固定する。依存（prompts.ts / characters.ts）の文言ではなく組み立てロジックを検証。

function q(partial: Partial<Question> & { id?: string } = {}): Question {
  return {
    id: partial.id ?? "ap-2024a-am-q1",
    exam: (partial.exam ?? "ap") as ExamCode,
    session: (partial.session ?? "am") as Session,
    year: partial.year ?? 2024,
    season: (partial.season ?? "autumn") as Season,
    qNumber: partial.qNumber ?? 1,
    type: partial.type ?? "multiple-choice",
    category: partial.category ?? "テクノロジ系",
    topicTags: partial.topicTags ?? [],
    difficulty: partial.difficulty ?? 3,
    question: partial.question ?? "問題文です",
    choices: partial.choices,
    answer: partial.answer ?? "ア",
    explanation: partial.explanation ?? "これは十分に長い実際の解説文です。",
    hasImage: partial.hasImage ?? false,
    sourcePdfUrl: "https://example.com/x.pdf",
    license: "IPA-public",
    isCalculation: partial.isCalculation,
    needsReview: partial.needsReview,
    lastUpdated: partial.lastUpdated,
  };
}

// 依存モジュールの安定した目印（assembly ロジックの分岐を観測するための marker）。
const QUESTION_CONTEXT_MARK = "# 現在の問題";
const CHARACTER_HARU_MARK = "今回のキャラクター: ハル";
const LENGTH_SHORT_MARK = "3行以内・150字以内";
// COPILOT_SYSTEM_PROMPT も「学習者プロフィール」に言及するため、profile セクション固有の
// 行（buildLearnerProfileContext のみが出力）を marker にする。
const PROFILE_MARK = "- 累計回答:";
const TERM_QUICK_PROMPT = "この問題に登場する重要用語を3〜5個挙げ";

function baseInput(over: Partial<PromptAssemblyInput> = {}): PromptAssemblyInput {
  return {
    question: q(),
    messages: [{ role: "user", content: "これは何ですか" }],
    ragDirective: null,
    ragContextBlock: "",
    ...over,
  };
}

describe("assembleCopilotPrompt - minimal", () => {
  it("system は COPILOT_SYSTEM_PROMPT で始まり、常に問題コンテキストを含む", () => {
    const out = assembleCopilotPrompt(baseInput());
    expect(out.system.startsWith(COPILOT_SYSTEM_PROMPT)).toBe(true);
    expect(out.system).toContain(QUESTION_CONTEXT_MARK);
  });

  it("オプション未指定なら character/length/profile セクションは含まれない", () => {
    const out = assembleCopilotPrompt(baseInput());
    expect(out.system).not.toContain(CHARACTER_HARU_MARK);
    expect(out.system).not.toContain(LENGTH_SHORT_MARK);
    expect(out.system).not.toContain(PROFILE_MARK);
  });

  it("quickAction 無しなら userMessages は入力メッセージと一致する", () => {
    const input = baseInput();
    const out = assembleCopilotPrompt(input);
    expect(out.userMessages).toEqual(input.messages);
  });
});

describe("assembleCopilotPrompt - セクション順序", () => {
  it("COPILOT → character → length → ragDirective → 問題コンテキスト の順で並ぶ", () => {
    const out = assembleCopilotPrompt(
      baseInput({
        character: "haru",
        characterEnabled: true,
        responseLength: "short",
        ragDirective: "<<RAG_DIRECTIVE_SENTINEL>>",
      }),
    );
    const iSystem = out.system.indexOf(COPILOT_SYSTEM_PROMPT);
    const iChar = out.system.indexOf(CHARACTER_HARU_MARK);
    const iLen = out.system.indexOf(LENGTH_SHORT_MARK);
    const iRag = out.system.indexOf("<<RAG_DIRECTIVE_SENTINEL>>");
    const iQ = out.system.indexOf(QUESTION_CONTEXT_MARK);
    expect(iSystem).toBe(0);
    expect(iSystem).toBeLessThan(iChar);
    expect(iChar).toBeLessThan(iLen);
    expect(iLen).toBeLessThan(iRag);
    expect(iRag).toBeLessThan(iQ);
  });

  it("profile と ragContextBlock は問題コンテキストの後に置かれる", () => {
    const out = assembleCopilotPrompt(
      baseInput({
        learnerProfile: { totalAnswered: 10, uniqueAnswered: 8, accuracy: 0.7, weakCategories: [] },
        ragContextBlock: "<<RAG_BLOCK_SENTINEL>>",
      }),
    );
    const iQ = out.system.indexOf(QUESTION_CONTEXT_MARK);
    const iProfile = out.system.indexOf(PROFILE_MARK);
    const iBlock = out.system.indexOf("<<RAG_BLOCK_SENTINEL>>");
    expect(iQ).toBeLessThan(iProfile);
    expect(iProfile).toBeLessThan(iBlock);
  });
});

describe("assembleCopilotPrompt - キャラクター付与の門番", () => {
  it("characterEnabled かつ有効 id のときのみ characterPrompt を入れる", () => {
    const out = assembleCopilotPrompt(baseInput({ character: "haru", characterEnabled: true }));
    expect(out.system).toContain(CHARACTER_HARU_MARK);
  });

  it("characterEnabled=false なら有効 id でも入れない", () => {
    const out = assembleCopilotPrompt(baseInput({ character: "haru", characterEnabled: false }));
    expect(out.system).not.toContain(CHARACTER_HARU_MARK);
  });

  it("不正な character id は無視される", () => {
    const out = assembleCopilotPrompt(baseInput({ character: "unknown-x", characterEnabled: true }));
    expect(out.system).not.toContain(CHARACTER_HARU_MARK);
  });
});

describe("assembleCopilotPrompt - 応答長・RAG・プロフィールの条件付き挿入", () => {
  it("responseLength を指定すると応答長ディレクティブが入る", () => {
    const out = assembleCopilotPrompt(baseInput({ responseLength: "short" }));
    expect(out.system).toContain(LENGTH_SHORT_MARK);
  });

  it("ragDirective が null のときは挿入されない / 文字列ならそのまま入る", () => {
    expect(assembleCopilotPrompt(baseInput({ ragDirective: null })).system).not.toContain(
      "<<RAG_DIRECTIVE_SENTINEL>>",
    );
    expect(
      assembleCopilotPrompt(baseInput({ ragDirective: "<<RAG_DIRECTIVE_SENTINEL>>" })).system,
    ).toContain("<<RAG_DIRECTIVE_SENTINEL>>");
  });

  it("ragContextBlock が空文字なら挿入されない / 非空ならそのまま入る", () => {
    expect(assembleCopilotPrompt(baseInput({ ragContextBlock: "" })).system).not.toContain(
      "<<RAG_BLOCK_SENTINEL>>",
    );
    expect(
      assembleCopilotPrompt(baseInput({ ragContextBlock: "<<RAG_BLOCK_SENTINEL>>" })).system,
    ).toContain("<<RAG_BLOCK_SENTINEL>>");
  });

  it("プロフィールは回答 5 件以上のときのみ挿入（4 件以下は null 経路で除外）", () => {
    const enough = assembleCopilotPrompt(
      baseInput({
        learnerProfile: { totalAnswered: 5, uniqueAnswered: 5, accuracy: 0.5, weakCategories: [] },
      }),
    );
    expect(enough.system).toContain(PROFILE_MARK);
    const tooFew = assembleCopilotPrompt(
      baseInput({
        learnerProfile: { totalAnswered: 4, uniqueAnswered: 4, accuracy: 0.5, weakCategories: [] },
      }),
    );
    expect(tooFew.system).not.toContain(PROFILE_MARK);
  });
});

describe("assembleCopilotPrompt - クイックアクションの先頭付与", () => {
  it("最後が user メッセージなら quickPrompt を先頭に連結する", () => {
    const out = assembleCopilotPrompt(
      baseInput({ messages: [{ role: "user", content: "もとの質問" }], quickAction: "term" }),
    );
    const last = out.userMessages[out.userMessages.length - 1];
    expect(last.content.startsWith(TERM_QUICK_PROMPT)).toBe(true);
    expect(last.content).toContain("もとの質問");
  });

  it("最後が assistant メッセージなら quickPrompt は付与されない", () => {
    const out = assembleCopilotPrompt(
      baseInput({
        messages: [
          { role: "user", content: "もとの質問" },
          { role: "assistant", content: "回答" },
        ],
        quickAction: "term",
      }),
    );
    expect(out.userMessages.some((m) => m.content.includes(TERM_QUICK_PROMPT))).toBe(false);
  });

  it("入力 messages 配列を破壊しない（コピーして組み立てる）", () => {
    const messages = [{ role: "user" as const, content: "もとの質問" }];
    assembleCopilotPrompt(baseInput({ messages, quickAction: "term" }));
    expect(messages[0].content).toBe("もとの質問");
  });
});
