import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import { FE_QUESTIONS_2025_CBT_KAMOKU_B } from "@/data/questions/fe/by-year/2025-cbt-kamoku-b";

const targetId = "fe-2025cbt-kamoku-b-q2";
const question = FE_QUESTIONS_2025_CBT_KAMOKU_B.find(q => q.id === targetId)!;

function executeOfficialProgram(n: number, option: string) {
  const accumulation = question.question.match(/count\s*←\s*count\s*\+\s*\(rest\s*÷\s*(\d+)\s*の商\)\s*\+\s*(\d+)/);
  const decrement = question.question.match(/rest\s*←\s*rest\s*-\s*(\d+)/);
  const condition = option.match(/^rest\s*(≥|>)\s*0$/);
  if (!accumulation || !decrement || !condition) throw new Error("Published program or condition changed");
  const divisor = Number(accumulation[1]);
  const extra = Number(accumulation[2]);
  const step = Number(decrement[1]);
  let rest = n;
  let count = 0;
  const trace: [number, number][] = [[rest, count]];
  while (condition[1] === "≥" ? rest >= 0 : rest > 0) {
    count += Math.floor(rest / divisor) + extra;
    rest -= step;
    trace.push([rest, count]);
    if (trace.length > n + 2) throw new Error("Nonterminating program");
  }
  return { count, trace };
}

// Independent check: enumerate coin counts, rather than assuming the loop is right.
function enumerateCombinations(n: number) {
  const combinations: { ten: number; five: number; one: number }[] = [];
  for (let ten = 0; ten * 10 <= n; ten++) {
    for (let five = 0; ten * 10 + five * 5 <= n; five++) {
      combinations.push({ ten, five, one: n - ten * 10 - five * 5 });
    }
  }
  return combinations;
}

describe("FE2025科目B問2の固定解説", () => {
  it("preserves the entire source data except this one explanation", () => {
    // Snapshot of main 386db27f: original prompt, choices, key, metadata and neighbor.
    const protectedData = FE_QUESTIONS_2025_CBT_KAMOKU_B.map(q => q.id === targetId ? { ...q, explanation: "__MUTABLE_EXPLANATION__" } : q);
    expect(createHash("sha256").update(JSON.stringify(protectedData)).digest("hex")).toBe("e8e9f5fd7f79100c616210feb3582f12546521305f6bffd4770fe18f0f68c28e");
    expect(question.answer).toBe("ア");
  });

  it("explains increasing the ten-yen coin count and prechecking the negative remainder", () => {
    expect(question.explanation).toContain("10円玉の使用枚数を1枚ずつ増やすごとに残額を10円ずつ減らします");
    expect(question.explanation).toContain("`rest=0`でも10円玉だけで払う1通り");
    expect(question.explanation).toContain("次のwhile判定で`rest < 0`なら本体を実行せず終了");
    expect(question.explanation).not.toContain("10円玉を減らしていく");
    expect(question.explanation).not.toContain("restが0円未満になるまで処理を続けるのは不適切");
    expect(question.explanation).toContain("2025r07_fe_kamoku_b_qs.pdf#page=6");
    expect(question.explanation).toContain("2025r07_fe_kamoku_b_ans.pdf");
  });

  const tableRows = question.explanation.split("\n").filter(line => /^\| (12|20) \|/.test(line)).map(line => line.split("|").slice(1, -1).map(cell => cell.trim()));
  it("contains exactly the three requested trace examples", () => {
    expect(tableRows.map(row => [Number(row[0]), row[1]?.slice(0, 1), Number(row[3])])).toEqual([[12, "ア", 4], [20, "ア", 9], [20, "エ", 8]]);
  });

  it.each(tableRows)("replays the stored explanation for n=%s, condition=%s", (nCell, optionCell, traceCell, totalCell) => {
    if (!nCell || !optionCell || !traceCell || !totalCell) throw new Error("Missing trace table cell");
    const n = Number(nCell);
    const optionKey = optionCell.slice(0, 1);
    if (optionKey !== "ア" && optionKey !== "エ") throw new Error("Unexpected trace choice");
    const option = question.choices?.[optionKey];
    if (!option) throw new Error("Missing original choice");
    const storedTrace = [...traceCell.matchAll(/\((-?\d+),(\d+)\)/g)].map((match): [number, number] => [Number(match[1]), Number(match[2])]);
    const result = executeOfficialProgram(n, option);
    expect(result.trace).toEqual(storedTrace);
    expect(result.count).toBe(Number(totalCell));
    const all = enumerateCombinations(n);
    if (optionKey === question.answer) expect(result.count).toBe(all.length);
    else {
      expect(all).toContainEqual({ ten: 2, five: 0, one: 0 });
      expect(all.length - result.count).toBe(1);
    }
  });
});
