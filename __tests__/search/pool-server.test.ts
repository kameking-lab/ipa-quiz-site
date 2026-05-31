import { describe, it, expect, beforeAll, vi } from "vitest";
import type { Question, QuizFilter } from "@/lib/questions/types";

/**
 * lib/questions/pool-server.ts はクイズ母集団をサーバー側で組み立てる入口
 * （getPoolIds が generateStaticParams / quiz API を駆動）。`import "server-only"`
 * を持つため従来テストできなかったが、server-only を vitest alias で no-op 化して
 * 解禁（プロダクションビルドは Next 独自解決のため無変更）。
 *
 * loadServerPool の非履歴フィルタ（exam/examGroup/year/season/session/topicTag/
 * category/categoryGroup/calculationOnly）・描画不能/needsReview 除外・inOrder
 * 並び・findQuestionById の prefix 由来 lookup を、データ増減に強い不変条件で固定。
 */
vi.mock("server-only", () => ({}));

import { getPoolIds, findQuestionById } from "@/lib/questions/pool-server";
import { getQuestionsForExam } from "@/lib/questions/get-questions";

const base: QuizFilter = { mode: "random" };

let apById: Map<string, Question>;
let apYear: number;
let apCategory: string;

beforeAll(async () => {
  const qs = await getQuestionsForExam("ap");
  apById = new Map(qs.map((q) => [q.id, q]));
  // year/category は「実際にプールに残る問題」から採る。pool-server は
  // 絞り込み後に実解説問題が無ければプレースホルダを温存する fallback を持つため
  // (loadServerPool L46-47)、プール外の生問題から採ると部分集合不変条件が崩れる。
  const fullIds = await getPoolIds({ ...base, exam: "ap" });
  const sample = apById.get(fullIds[0]!)!;
  apYear = sample.year;
  apCategory = sample.category;
});

describe("getPoolIds — 基本契約", () => {
  it("exam=ap は非空・全 id が ap- 始まり・重複なし", async () => {
    const ids = await getPoolIds({ ...base, exam: "ap" });
    expect(ids.length).toBeGreaterThan(0);
    expect(ids.every((id) => id.startsWith("ap-"))).toBe(true);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("返る全問は needsReview ではない（除外済み）", async () => {
    const ids = await getPoolIds({ ...base, exam: "ap" });
    expect(ids.every((id) => apById.get(id)?.needsReview !== true)).toBe(true);
  });
});

describe("getPoolIds — facet フィルタ（id→Question 逆引きで検証）", () => {
  it("year フィルタは全問をその年に絞り、全体の部分集合になる", async () => {
    const full = await getPoolIds({ ...base, exam: "ap" });
    const filtered = await getPoolIds({ ...base, exam: "ap", year: apYear });
    expect(filtered.length).toBeGreaterThan(0);
    expect(filtered.every((id) => apById.get(id)?.year === apYear)).toBe(true);
    expect(filtered.every((id) => full.includes(id))).toBe(true);
    expect(filtered.length).toBeLessThanOrEqual(full.length);
  });

  it("category フィルタは全問をそのカテゴリに絞る", async () => {
    const filtered = await getPoolIds({
      ...base,
      exam: "ap",
      category: apCategory,
    });
    expect(filtered.length).toBeGreaterThan(0);
    expect(
      filtered.every((id) => apById.get(id)?.category === apCategory),
    ).toBe(true);
  });

  it("calculationOnly は計算問題のみを返す", async () => {
    // calc プールが全てプレースホルダなら fallback で温存されるため full の
    // 部分集合とは限らない。フィルタ契約（isCalculation のみ）だけを固定する。
    const calc = await getPoolIds({ ...base, exam: "ap", calculationOnly: true });
    expect(calc.every((id) => apById.get(id)?.isCalculation === true)).toBe(true);
  });
});

describe("getPoolIds — examGroup と inOrder", () => {
  it("examGroup=[ap] は exam=ap と同じ id 集合を返す", async () => {
    const viaExam = await getPoolIds({ ...base, exam: "ap" });
    const viaGroup = await getPoolIds({ ...base, examGroup: ["ap"] });
    expect(new Set(viaGroup)).toEqual(new Set(viaExam));
  });

  it("inOrder=true は qNumber 昇順に並ぶ", async () => {
    const ids = await getPoolIds({ ...base, exam: "ap", inOrder: true });
    expect(ids.length).toBeGreaterThan(0);
    const qNums = ids.map((id) => apById.get(id)!.qNumber);
    for (let i = 1; i < qNums.length; i++) {
      expect(qNums[i - 1]).toBeLessThanOrEqual(qNums[i]);
    }
  });
});

describe("findQuestionById", () => {
  it("getPoolIds が返した id をラウンドトリップできる", async () => {
    const ids = await getPoolIds({ ...base, exam: "ap" });
    const q = await findQuestionById(ids[0]!);
    expect(q?.id).toBe(ids[0]);
    expect(q?.exam).toBe("ap");
  });

  it("存在しない id は undefined", async () => {
    const q = await findQuestionById("ap-9999z-am-q999");
    expect(q).toBeUndefined();
  });

  it("完全に無関係な prefix でも throw せず undefined", async () => {
    const q = await findQuestionById("zzz-nonexistent");
    expect(q).toBeUndefined();
  });
});
