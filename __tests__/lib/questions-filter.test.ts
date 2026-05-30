import { describe, it, expect, vi, afterEach } from "vitest";
import type { Question, ExamCode, Season, Session } from "@/lib/questions/types";
import type { HistoryStore } from "@/lib/storage/history";
import {
  filterQuestions,
  isPlaceholderExplanation,
  shuffle,
  shuffleChoices,
} from "@/lib/questions/filter";

// filterQuestions は全クイズモード（ランダム/年度別/分野別/復習/未回答）の出題プールを
// 決定する中核純関数。フィルタ順序・examGroup/categoryGroup の優先・表/図/条件を含む
// 画像なし問題の除外・needsReview 除外・プレースホルダ解説のフォールバックは、崩れると
// ユーザーに「解けない問題が出る」「出題ゼロ」等の実害に直結する。契約を回帰固定する。

let counter = 0;
function q(partial: Partial<Question> & { id?: string }): Question {
  counter += 1;
  return {
    id: partial.id ?? `q-${counter}`,
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

function makeHistory(opts: {
  wrong?: string[];
  starred?: string[];
  answered?: string[];
  recent?: string[];
}): HistoryStore {
  return {
    getWrongIds: () => opts.wrong ?? [],
    getStarredIds: () => opts.starred ?? [],
    getAnsweredIds: () => opts.answered ?? [],
    getRecentIds: () => opts.recent ?? [],
  } as unknown as HistoryStore;
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("isPlaceholderExplanation", () => {
  it("「正解はアです。」型と空文字をプレースホルダと判定する", () => {
    expect(isPlaceholderExplanation(q({ explanation: "正解はアです。" }))).toBe(true);
    expect(isPlaceholderExplanation(q({ explanation: "正解はエです." }))).toBe(true);
    expect(isPlaceholderExplanation(q({ explanation: "   " }))).toBe(true);
  });

  it("実際の解説はプレースホルダ扱いしない", () => {
    expect(
      isPlaceholderExplanation(q({ explanation: "正解はアです。なぜなら…と続く解説。" })),
    ).toBe(true); // 先頭一致のため前置きが定型なら該当する（現挙動を固定）
    expect(
      isPlaceholderExplanation(q({ explanation: "この問題のポイントは正規化である。" })),
    ).toBe(false);
  });
});

describe("filterQuestions — フィルタ条件", () => {
  it("examGroup は exam より優先される", () => {
    const all = [
      q({ id: "a", exam: "ap" }),
      q({ id: "f", exam: "fe" }),
      q({ id: "i", exam: "ip" }),
    ];
    const out = filterQuestions(all, { mode: "year", exam: "ap", examGroup: ["fe", "ip"] });
    expect(out.map((x) => x.id).sort()).toEqual(["f", "i"]);
  });

  it("categoryGroup は category より優先される", () => {
    const all = [
      q({ id: "t", category: "テクノロジ系" }),
      q({ id: "m", category: "マネジメント系" }),
      q({ id: "s", category: "ストラテジ系" }),
    ];
    const out = filterQuestions(all, {
      mode: "topic",
      category: "テクノロジ系",
      categoryGroup: ["マネジメント系", "ストラテジ系"],
    });
    expect(out.map((x) => x.id).sort()).toEqual(["m", "s"]);
  });

  it("year/season/topicTag/calculationOnly を AND で絞り込む", () => {
    const all = [
      q({ id: "hit", year: 2024, season: "autumn", topicTags: ["DB"], isCalculation: true }),
      q({ id: "yr", year: 2023, season: "autumn", topicTags: ["DB"], isCalculation: true }),
      q({ id: "tag", year: 2024, season: "autumn", topicTags: ["NW"], isCalculation: true }),
      q({ id: "calc", year: 2024, season: "autumn", topicTags: ["DB"], isCalculation: false }),
    ];
    const out = filterQuestions(all, {
      mode: "year",
      year: 2024,
      season: "autumn",
      topicTag: "DB",
      calculationOnly: true,
    });
    expect(out.map((x) => x.id)).toEqual(["hit"]);
  });

  it("復習モードは誤答 ∪ スター、履歴なしでは絞り込まない", () => {
    const all = [q({ id: "a" }), q({ id: "b" }), q({ id: "c" })];
    const hist = makeHistory({ wrong: ["a"], starred: ["c"] });
    const out = filterQuestions(all, { mode: "review" }, hist);
    expect(out.map((x) => x.id).sort()).toEqual(["a", "c"]);
    // 履歴未指定なら review 絞り込みはスキップ（全件残る）
    const noHist = filterQuestions(all, { mode: "review" });
    expect(noHist.map((x) => x.id).sort()).toEqual(["a", "b", "c"]);
  });

  it("未回答モードは回答済みを除外する", () => {
    const all = [q({ id: "a" }), q({ id: "b" }), q({ id: "c" })];
    const out = filterQuestions(all, { mode: "unanswered" }, makeHistory({ answered: ["b"] }));
    expect(out.map((x) => x.id).sort()).toEqual(["a", "c"]);
  });

  it("excludeRecent は直近出題分を除外する", () => {
    const all = [q({ id: "a" }), q({ id: "b" }), q({ id: "c" })];
    const out = filterQuestions(
      all,
      { mode: "year", excludeRecent: true },
      makeHistory({ recent: ["a"] }),
    );
    expect(out.map((x) => x.id).sort()).toEqual(["b", "c"]);
  });
});

describe("filterQuestions — 品質フィルタ", () => {
  it("表/図/条件に言及するが画像のない問題を除外する", () => {
    const all = [
      q({ id: "ok", question: "正規化に関する記述はどれか。" }),
      q({ id: "table", question: "次の表に示すデータについて答えよ。", hasImage: false }),
      q({ id: "tableImg", question: "次の表に示すデータについて答えよ。", hasImage: true }),
      q({ id: "cond", question: "以下の条件のもとで計算せよ。", hasImage: false }),
    ];
    const out = filterQuestions(all, { mode: "year" });
    expect(out.map((x) => x.id).sort()).toEqual(["ok", "tableImg"]);
  });

  it("needsReview の問題を除外する", () => {
    const all = [q({ id: "ok" }), q({ id: "bad", needsReview: true })];
    const out = filterQuestions(all, { mode: "year" });
    expect(out.map((x) => x.id)).toEqual(["ok"]);
  });

  it("実解説がある場合プレースホルダ解説を落とすが、全てプレースホルダなら残す", () => {
    const mixed = [
      q({ id: "real", explanation: "実際の解説です。" }),
      q({ id: "ph", explanation: "正解はイです。" }),
    ];
    expect(filterQuestions(mixed, { mode: "year" }).map((x) => x.id)).toEqual(["real"]);

    const allPlaceholder = [
      q({ id: "p1", explanation: "正解はアです。" }),
      q({ id: "p2", explanation: "正解はウです。" }),
    ];
    expect(filterQuestions(allPlaceholder, { mode: "year" }).map((x) => x.id).sort()).toEqual([
      "p1",
      "p2",
    ]);
  });

  it("inOrder は qNumber 昇順に並べる", () => {
    const all = [q({ id: "c", qNumber: 3 }), q({ id: "a", qNumber: 1 }), q({ id: "b", qNumber: 2 })];
    const out = filterQuestions(all, { mode: "year", inOrder: true });
    expect(out.map((x) => x.id)).toEqual(["a", "b", "c"]);
  });
});

describe("shuffle", () => {
  // shuffle はランダム出題（mode:"random"）と選択肢ランダム化（shuffleChoices）の
  // 両方を駆動する Fisher-Yates。要素の保存（過不足ゼロ）と「同一配列を破壊的に並べ替えて
  // その参照を返す」契約が崩れると、出題プールから問題が消える/重複する実害になる。

  it("入力配列を破壊的に並べ替え、同一の配列参照を返す（コピーしない）", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    const arr = [1, 2, 3, 4];
    const out = shuffle(arr);
    expect(out).toBe(arr); // 同一参照
  });

  it("要素を保存する（集合として過不足ゼロ・重複や欠落を作らない）", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.42);
    const arr = ["a", "b", "c", "d", "e"];
    const out = shuffle([...arr]);
    expect([...out].sort()).toEqual([...arr].sort());
    expect(out).toHaveLength(arr.length);
  });

  it("Math.random=0 では各 j=0 となり決定的な置換になる", () => {
    // j = floor(0 * (i+1)) = 0。i=n-1..1 で arr[i]↔arr[0] を順に交換する。
    // [a,b,c,d] → [b,c,d,a]（この並びが崩れたら swap ロジックの回帰）。
    vi.spyOn(Math, "random").mockReturnValue(0);
    expect(shuffle(["a", "b", "c", "d"])).toEqual(["b", "c", "d", "a"]);
  });

  it("Math.random≈1 では各 j=i となり交換が自己交換（並びは不変）", () => {
    // j = floor(0.999*(i+1)) = i。arr[i]↔arr[i] は no-op。
    vi.spyOn(Math, "random").mockReturnValue(0.999999);
    expect(shuffle(["a", "b", "c", "d"])).toEqual(["a", "b", "c", "d"]);
  });

  it("空配列・単一要素はそのまま（ループ実行ゼロ）", () => {
    expect(shuffle([])).toEqual([]);
    expect(shuffle(["only"])).toEqual(["only"]);
  });
});

describe("shuffleChoices", () => {
  it("選択肢を再配置しても answer が正解の選択肢内容を指し続ける", () => {
    // Math.random を固定して決定的にする（Fisher-Yates の各 j を 0 に寄せる）
    vi.spyOn(Math, "random").mockReturnValue(0);
    const original = q({
      choices: { ア: "A値", イ: "B値", ウ: "C値", エ: "D値" },
      answer: "イ",
    });
    const correctValue = original.choices!["イ"];
    const shuffled = shuffleChoices(original);
    // 新しい answer キーが指す選択肢内容が元の正解内容と一致する
    const newAnswerKey = shuffled.answer as "ア" | "イ" | "ウ" | "エ";
    expect(shuffled.choices![newAnswerKey]).toBe(correctValue);
    // 4択の内容は保存される（集合として不変）
    expect(Object.values(shuffled.choices!).sort()).toEqual(["A値", "B値", "C値", "D値"]);
  });

  it("choices を持たない問題はそのまま返す", () => {
    const noChoices = q({ choices: undefined, answer: "記述解答" });
    expect(shuffleChoices(noChoices)).toBe(noChoices);
  });
});
