import { describe, it, expect } from "vitest";
import {
  QUICK_ACTIONS,
  INITIAL_QUESTION_EXAMPLES,
  type QuickActionId,
} from "@/lib/ai/prompts";
import type { Question } from "@/lib/questions/types";

/**
 * QUICK_ACTIONS / INITIAL_QUESTION_EXAMPLES は AI コパイロット（CopilotPanel）の
 * ワンタップ送信ボタンを駆動する手書き copy データ。CopilotPanel は
 * QUICK_ACTIONS[id].label を表示し prompt(q) の戻り値をそのままユーザー発話として
 * LLM へ送る（§13）。label/prompt が空文字だと「空メッセージ送信＝無駄な API 呼び出し
 * ＋無言ボタン」になるが、型（string）では空文字を弾けない。prompt は関数なので
 * 呼び出し時に throw しないことも型では保証されない。これらデータ不変条件を固定する。
 */

function sampleQuestion(): Question {
  return {
    id: "ap-2024a-am-q1",
    exam: "ap",
    session: "am",
    year: 2024,
    season: "autumn",
    qNumber: 1,
    type: "multiple-choice",
    category: "テクノロジ系",
    topicTags: [],
    difficulty: 3,
    question: "問題文です",
    choices: { ア: "A", イ: "B", ウ: "C", エ: "D" },
    answer: "ア",
    explanation: "これは十分に長い実際の解説文です。",
    hasImage: false,
    sourcePdfUrl: "https://example.com/x.pdf",
    license: "IPA-public",
  };
}

describe("QUICK_ACTIONS データ不変条件", () => {
  const q = sampleQuestion();
  const entries = Object.entries(QUICK_ACTIONS) as Array<
    [QuickActionId, (typeof QUICK_ACTIONS)[QuickActionId]]
  >;

  it("各アクションは非空の label を持つ", () => {
    for (const [, action] of entries) {
      expect(action.label.trim().length).toBeGreaterThan(0);
    }
  });

  it("各 prompt(q) は throw せず非空文字列を返す（空メッセージ送信の防止）", () => {
    for (const [id, action] of entries) {
      const text = action.prompt(q);
      expect(typeof text, id).toBe("string");
      expect(text.trim().length, id).toBeGreaterThan(0);
    }
  });
});

describe("INITIAL_QUESTION_EXAMPLES データ不変条件", () => {
  it("各サンプルは非空の label と prompt を持つ", () => {
    for (const ex of INITIAL_QUESTION_EXAMPLES) {
      expect(ex.label.trim().length).toBeGreaterThan(0);
      expect(ex.prompt.trim().length).toBeGreaterThan(0);
    }
  });

  it("label は重複しない（同一ボタンの二重表示を防ぐ）", () => {
    const labels = INITIAL_QUESTION_EXAMPLES.map((e) => e.label);
    expect(new Set(labels).size).toBe(labels.length);
  });
});
