import { describe, it, expect } from "vitest";
import { buildQuestionContext, buildRAGDirective } from "@/lib/ai/prompts";
import type { Question, ExamCode, Season, Session } from "@/lib/questions/types";

/**
 * prompts.ts の buildQuestionContext / buildRAGDirective は AI コパイロット（B軸）
 * へ渡る「現在の問題」コンテキストと RAG 出典ディレクティブを組み立てる純関数。
 * assembleCopilotPrompt が両者を取り込むが、ここでは各関数固有の契約を直接固定する:
 *  - buildQuestionContext: セクション構成・空 topicTags/選択肢の出し分け・answer の
 *    配列/スカラ整形・採点状態（正解/不正解/未採点）の表記。
 *  - buildRAGDirective: passageCount<=0 で null（出典なしでディレクティブを付けない）・
 *    [1]..[N] の番号列・件数の埋め込み。
 * 崩れるとモデルに渡る文脈が静かにずれ、口調や出典逸脱・選択肢提示漏れを招く。
 */

function q(partial: Partial<Question> = {}): Question {
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

describe("buildQuestionContext", () => {
  it("見出しセクションを順に含む（現在の問題→問題文→正解→標準解説）", () => {
    const out = buildQuestionContext(q());
    expect(out).toContain("# 現在の問題");
    expect(out).toContain("## 問題文");
    expect(out).toContain("## 正解");
    expect(out).toContain("## 標準解説（参考）");
    // 順序: 問題文 → 正解 → 標準解説
    expect(out.indexOf("## 問題文")).toBeLessThan(out.indexOf("## 正解"));
    expect(out.indexOf("## 正解")).toBeLessThan(out.indexOf("## 標準解説（参考）"));
  });

  it("topicTags が空ならタグ行を出さない／あれば , 連結で出す", () => {
    expect(buildQuestionContext(q({ topicTags: [] }))).not.toContain("- タグ:");
    expect(buildQuestionContext(q({ topicTags: ["DB", "正規化"] }))).toContain(
      "- タグ: DB, 正規化",
    );
  });

  it("choices が無ければ選択肢ブロックを出さない", () => {
    expect(buildQuestionContext(q({ choices: undefined }))).not.toContain("## 選択肢");
  });

  it("choices があれば存在するキーのみア〜エ順で列挙", () => {
    const out = buildQuestionContext(
      q({ choices: { ア: "A選択", イ: "B選択", ウ: "", エ: "D選択" } }),
    );
    expect(out).toContain("## 選択肢");
    expect(out).toContain("- ア: A選択");
    expect(out).toContain("- イ: B選択");
    expect(out).toContain("- エ: D選択");
    // 空文字の選択肢（ウ）は出さない
    expect(out).not.toContain("- ウ:");
    // ア が エ より前
    expect(out.indexOf("- ア:")).toBeLessThan(out.indexOf("- エ:"));
  });

  it("answer が配列なら , 連結、スカラなら文字列化", () => {
    expect(buildQuestionContext(q({ answer: ["ア", "ウ"] }))).toContain("ア, ウ");
    expect(buildQuestionContext(q({ answer: "イ" }))).toContain("イ");
  });

  it("selectedChoice 未指定なら『ユーザーの回答』を出さない", () => {
    expect(buildQuestionContext(q())).not.toContain("## ユーザーの回答");
  });

  it("採点状態: isCorrect true→正解 / false→不正解 / undefined→未採点", () => {
    expect(buildQuestionContext(q(), "ア", true)).toContain("選択: ア / 正解");
    expect(buildQuestionContext(q(), "イ", false)).toContain("選択: イ / 不正解");
    expect(buildQuestionContext(q(), "ウ", undefined)).toContain("選択: ウ / 未採点");
  });
});

describe("buildRAGDirective", () => {
  it("passageCount<=0 は null（出典なしでディレクティブを付けない）", () => {
    expect(buildRAGDirective(0)).toBeNull();
    expect(buildRAGDirective(-1)).toBeNull();
  });

  it("件数を埋め込み、[1]..[N] の番号列を生成", () => {
    const out = buildRAGDirective(3);
    expect(out).not.toBeNull();
    // 番号列 nums は「N 件のパッセージ … を提供します」行に埋め込まれる
    expect(out).toContain("3 件のパッセージ [1] [2] [3] を提供します");
    // 4件目は出さない
    expect(out).not.toContain("[4]");
  });

  it("1件なら番号列は [1] のみ（本文の例示 [1] [2] とは別行）", () => {
    const out = buildRAGDirective(1);
    expect(out).toContain("1 件のパッセージ [1] を提供します");
  });
});
