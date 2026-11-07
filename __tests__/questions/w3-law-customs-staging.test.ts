import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Unpublished staging sets added by the W3 replenishment run:
 * 司法試験 短答式 (shiho-tanto), 司法試験予備試験 短答式 (yobi-tanto), 通関士 (tsukanshi).
 * Rebuild with scripts/build-moj-tanto-staging.py and scripts/build-tsukanshi-staging.py.
 */
const STAGING = path.join(process.cwd(), "data", "qualification-staging");
const read = <T,>(...p: string[]): T => JSON.parse(readFileSync(path.join(STAGING, ...p), "utf8")) as T;

interface StagedRecord {
  id: string;
  exam: string;
  session: string;
  year: number;
  qNumber: number;
  part?: string;
  type: string;
  question: string;
  choices?: Record<string, string>;
  answer: string | string[];
  requiredSelections?: number;
  officialAnswerNumber: string;
  explanation: string;
  choiceExplanations?: Record<string, string>;
  publicAllowed: boolean;
  license: string;
  sourcePdfUrl: string;
  sourceAnswerUrl: string;
}
interface SourceQuestion { q: number; nos: number[]; officialAnswers: Record<string, string> }
interface SourcePacket { subjectSlug: string; questions: SourceQuestion[] }

const MOJ_SUBJECTS: Record<string, string[]> = {
  "shiho-tanto": ["constitution", "civil-law", "criminal-law"],
  "yobi-tanto": ["constitution", "admin-law", "civil-law", "commercial-law", "civil-procedure", "criminal-law", "criminal-procedure"],
};
const EXPECTED: Record<string, { units: number; questions: number }> = {
  "shiho-tanto": { units: 109, questions: 77 },
  "yobi-tanto": { units: 137, questions: 95 },
};

function expectWellFormed(r: StagedRecord) {
  expect(r.publicAllowed).toBe(false);
  expect(r.explanation.length).toBeGreaterThan(40);
  if (r.type === "numeric") return;
  const keys = Object.keys(r.choices ?? {});
  expect(keys.length).toBeGreaterThanOrEqual(2);
  for (const a of Array.isArray(r.answer) ? r.answer : [r.answer]) expect(keys).toContain(a);
  if (Array.isArray(r.answer)) expect(r.requiredSelections).toBe(r.answer.length);
  for (const k of keys) expect((r.choiceExplanations?.[k] ?? "").length, `${r.id} ${k}`).toBeGreaterThan(10);
}

describe("司法試験・予備試験 短答式 staging", () => {
  for (const exam of Object.keys(MOJ_SUBJECTS)) {
    for (const year of [2025, 2026]) {
      it(`${exam} ${year}: every answer-sheet No. matches the official answer table`, () => {
        const records = read<StagedRecord[]>(exam, `${year}.json`);
        expect(records).toHaveLength(EXPECTED[exam].units);
        expect(new Set(records.map((r) => `${r.session}-${r.qNumber}`)).size).toBe(EXPECTED[exam].questions);
        expect(new Set(records.map((r) => r.id)).size).toBe(records.length);
        for (const subject of MOJ_SUBJECTS[exam]) {
          const packet = read<SourcePacket>(exam, "sources", `${year}-${subject}.json`);
          for (const q of packet.questions) {
            const recs = records.filter((r) => r.session === subject && r.qNumber === q.q)
              .sort((a, b) => Number(a.part ?? 0) - Number(b.part ?? 0));
            const official = q.nos.map((n) => q.officialAnswers[String(n)]);
            expect(recs.length, `${subject} 第${q.q}問`).toBeGreaterThan(0);
            if (recs.length === q.nos.length) {
              expect(recs.map((r) => r.officialAnswerNumber)).toEqual(official);
            } else {
              // 順不同で複数選ぶ問は1レコードにまとめる
              expect(recs).toHaveLength(1);
              expect(recs[0].officialAnswerNumber.split("・").sort()).toEqual([...official].sort());
            }
            for (const r of recs) {
              expect(r.license).toBe("MOJ-attributed");
              expect(r.sourcePdfUrl).toMatch(/^https:\/\/www\.moj\.go\.jp\/content\/\d+\.pdf$/);
              expectWellFormed(r);
            }
          }
        }
      });
    }
  }
});

describe("通関士 staging", () => {
  it("第59回: 65原問・105解答単位が公式正答と一致し、全肢解説を持つ", () => {
    const records = read<StagedRecord[]>("tsukanshi", "2025.json");
    const official = read<{ "59": Record<string, Record<string, string[]>> }>("tsukanshi", "official-answers.json")["59"];
    expect(records).toHaveLength(105);
    expect(new Set(records.map((r) => `${r.session}-${r.qNumber}`)).size).toBe(65);
    const subjectOf: Record<string, string> = { "tsukan-law": "通関業法", "customs-law": "関税法等", "tsukan-practical": "通関実務" };
    for (const r of records) {
      const ans = official[subjectOf[r.session]][String(r.qNumber)];
      if (r.part) expect(r.officialAnswerNumber).toBe(ans[Number(r.part) - 1]);
      else expect(r.officialAnswerNumber).toBe(ans.join(","));
      expectWellFormed(r);
    }
  });
  it("第60回は問題文のみ（正答公表前）", () => {
    const t60 = read<{ officialAnswers: unknown }[]>("tsukanshi", "sources", "transcription-60.json");
    expect(t60).toHaveLength(59);
    expect(t60.every((x) => x.officialAnswers === null)).toBe(true);
  });
});
