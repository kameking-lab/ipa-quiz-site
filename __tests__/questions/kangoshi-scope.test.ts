import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { ALL_QUESTIONS } from "@/data/questions";
import { KANGOSHI_QUESTIONS } from "@/data/questions/kangoshi";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";
import { choiceDisplayLabel, usesNumberedChoices } from "@/lib/questions/display";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import type { ChoiceKey } from "@/lib/questions/types";
import { EXAM_DESCRIPTIONS, examMetaDescription } from "@/lib/seo/exam-meta";

const evidence = path.join(process.cwd(), "docs/evidence/nurse10-20261010");
const readJson = <T,>(file: string): T => JSON.parse(readFileSync(path.join(evidence, file), "utf8")) as T;

type Transcript = { round: number; session: string; qNumber: number; stem: string; choices: Record<"1" | "2" | "3" | "4", string>; officialAnswer: string }[];
const KEYS: readonly ChoiceKey[] = ["ア", "イ", "ウ", "エ"];
const YEAR_OF_ROUND: Record<number, number> = { 115: 2025, 114: 2024 };
const SCOPE = "第115・114回 午前必修の一部10問収録";
const norm = (s: string) => s.normalize("NFKC").replace(/\s+/g, "");
const transcriptA = readJson<Transcript>("transcriptA.json");
const transcriptB = readJson<Transcript>("transcriptB.json");

describe("看護師国家試験（第115回・第114回 午前 問1〜5のみ）", () => {
  it("範囲: 各回の午前 問1〜5だけを収録し、計10問・40肢", () => {
    const keys = KANGOSHI_QUESTIONS.map((q) => `${q.year}-${q.session}-${q.qNumber}`).sort();
    expect(keys).toEqual([2024, 2025].flatMap((y) => [1, 2, 3, 4, 5].map((n) => `${y}-am-${n}`)).sort());
    expect(KANGOSHI_QUESTIONS.reduce((sum, q) => sum + Object.keys(q.choices ?? {}).length, 0)).toBe(40);
    expect(ALL_QUESTIONS.filter((q) => q.exam === "kangoshi")).toHaveLength(10);
    expect(new Set(KANGOSHI_QUESTIONS.map((q) => q.id)).size).toBe(10);
    expect(EXAM_CONFIGS.kangoshi.yearRange).toEqual({ start: 2024, end: 2025 });
  });

  it("転記: 独立2転記（A・B）が本文・全肢・正答で一致し、公開文面はB稿と一致する", () => {
    expect(transcriptA).toHaveLength(10);
    expect(transcriptB).toHaveLength(10);
    for (const b of transcriptB) {
      const a = transcriptA.find((x) => x.round === b.round && x.qNumber === b.qNumber && x.session === b.session)!;
      expect(a, `${b.round}-${b.qNumber}`).toBeDefined();
      expect(norm(a.stem)).toBe(norm(b.stem));
      for (const c of ["1", "2", "3", "4"] as const) expect(norm(a.choices[c])).toBe(norm(b.choices[c]));
      expect(a.officialAnswer).toBe(b.officialAnswer);

      const q = KANGOSHI_QUESTIONS.find((x) => x.year === YEAR_OF_ROUND[b.round] && x.qNumber === b.qNumber)!;
      expect(q.question).toBe(b.stem);
      KEYS.forEach((k, i) => expect(q.choices?.[k]).toBe(b.choices[String(i + 1) as "1"]));
      expect(q.answer).toBe(KEYS[Number(b.officialAnswer) - 1]);
      expect(q.officialAnswerNumber).toBe(b.officialAnswer);
    }
  });

  it("解説・出典: 4肢すべてに理由があり、正答肢だけが「正しい」。出典と加工表示を各問に持つ", () => {
    for (const q of KANGOSHI_QUESTIONS) {
      const round = q.year === 2025 ? 115 : 114;
      expect(Object.keys(q.choiceExplanations ?? {}).sort()).toEqual([...KEYS].sort());
      for (const k of KEYS) {
        const text = q.choiceExplanations![k]!;
        expect(text.startsWith(k === q.answer ? "正しい" : "誤り"), `${q.id} ${k}`).toBe(true);
        expect(text.length).toBeGreaterThan(30);
      }
      expect(q.sourceAttribution).toContain(`第${round}回看護師国家試験`);
      expect(q.sourceAttribution).toContain(`午前 問${q.qNumber}`);
      expect(q.sourceAttribution).toContain("加工");
      expect(q.sourceAttribution).toContain("厚生労働省とは関係ありません");
      expect(q.sourcePdfUrl).toMatch(round === 115 ? /tp260424-05a_01\.pdf$/ : /tp250428-05a_01\.pdf$/);
      expect(q.sourceAnswerUrl).toMatch(round === 115 ? /tp260424-05seitou\.pdf$/ : /tp250428-05seitou\.pdf$/);
      expect(q.license).toBe("MHLW-attributed");
      expect(isPracticeReadyQuestion(q)).toBe(true);
    }
  });

  it("表示: 選択肢は原本どおり 1〜4 の番号で示す", () => {
    expect(KEYS.map((k) => choiceDisplayLabel("kangoshi", k))).toEqual(["1", "2", "3", "4"]);
    expect(usesNumberedChoices("kangoshi")).toBe(true);
  });

  it("収録範囲の表示: 一部10問であることを明示し、全試験対応をうたわない", () => {
    const entry = getQualificationByExamCode("kangoshi")!;
    expect(entry.status).toBe("live");
    expect(entry.reuseSummary).toContain(SCOPE);
    expect(entry.reuseSummary).not.toMatch(/許諾(を)?取得済み/);
    const copies = [entry.reuseSummary, EXAM_DESCRIPTIONS.kangoshi ?? "", examMetaDescription("kangoshi", 10)];
    for (const text of copies) {
      expect(text).not.toMatch(/全\s*240\s*問|全問(収録|対応)|全試験対応|全回分/);
    }
    expect(EXAM_DESCRIPTIONS.kangoshi).toContain(SCOPE);
  });

  it("査読: 独立一次資料査読がPASSで、blockingの未解決指摘はない", () => {
    const review = readJson<{ verdict: string; findings: { severity: string; resolution?: string }[] }>("review.json");
    expect(review.verdict).toBe("PASS");
    expect(review.findings.filter((f) => f.severity === "blocking" && !f.resolution)).toHaveLength(0);
  });
});
