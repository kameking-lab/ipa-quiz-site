import { describe, it, expect, beforeEach } from "vitest";
import {
  readLastQuestion,
  writeLastQuestion,
  clearLastQuestion,
  type LastQuestionState,
} from "@/lib/storage/last-question";

/**
 * last-question.ts は「最後に解いた問題」の継続再開ポインタ。readLastQuestion は
 * 6 フィールド全ての型が揃っていなければ null を返す厳格バリデーションに依存する
 * （1 つでも欠落/型違いなら null）。崩れると壊れた継続ポインタで再開導線が誤動作する。
 */
const KEY = "ipa-quiz:last-question:v1";

function makeState(): LastQuestionState {
  return {
    exam: "ap",
    year: 2024,
    season: "autumn",
    session: "am",
    qNumber: 1,
    answeredAt: 1_700_000_000_000,
  };
}

beforeEach(() => {
  window.localStorage.clear();
});

describe("readLastQuestion", () => {
  it("未保存なら null", () => {
    expect(readLastQuestion()).toBeNull();
  });

  it("破損 JSON は null（fail-soft）", () => {
    window.localStorage.setItem(KEY, "{broken");
    expect(readLastQuestion()).toBeNull();
  });

  it("全フィールドが揃った正常値はそのまま読める", () => {
    window.localStorage.setItem(KEY, JSON.stringify(makeState()));
    expect(readLastQuestion()).toEqual(makeState());
  });

  it("数値フィールドが欠落していれば null", () => {
    const partial = { ...makeState() } as Partial<LastQuestionState>;
    delete partial.qNumber;
    window.localStorage.setItem(KEY, JSON.stringify(partial));
    expect(readLastQuestion()).toBeNull();
  });

  it("型違い（year が文字列）なら null", () => {
    window.localStorage.setItem(KEY, JSON.stringify({ ...makeState(), year: "2024" }));
    expect(readLastQuestion()).toBeNull();
  });
});

describe("writeLastQuestion / clearLastQuestion", () => {
  it("保存→読み戻し→クリアで null に戻る", () => {
    writeLastQuestion(makeState());
    expect(readLastQuestion()?.qNumber).toBe(1);
    clearLastQuestion();
    expect(readLastQuestion()).toBeNull();
  });
});
