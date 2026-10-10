import { describe, expect, it } from "vitest";
import { KANGOSHI_QUESTIONS } from "@/data/questions/kangoshi";
import delta from "@/docs/evidence/nurse-pm-category-correction-20261010/DELTA.json";
import before427 from "@/docs/evidence/nurse-afternoon-three-go-20261010/INTEGRATION.json";
import { historicalNurseHash, nurseObjectHash } from "./nurse-pm-category-hash";

const byId = new Map(KANGOSHI_QUESTIONS.map(question => [question.id, question]));

describe("114th nursing afternoon official section metadata correction", () => {
  it("changes precisely the three classification fields on exactly 32 registered originals", () => {
    expect(delta.baseCommit).toBe("b5c94740aaff2fea7f93174582087dabefbd3b7c");
    expect(delta.affectedCount).toBe(32);
    expect(delta.changes).toHaveLength(32);
    expect(new Set(delta.changes.map(change => change.id)).size).toBe(32);
    expect(KANGOSHI_QUESTIONS).toHaveLength(463);
    for (const change of delta.changes) {
      const question = byId.get(change.id)!;
      expect(question.year, change.id).toBe(2024);
      expect(question.session, change.id).toBe("pm");
      expect(question.qNumber, change.id).toBeGreaterThanOrEqual(26);
      expect(question.qNumber, change.id).toBeLessThanOrEqual(90);
      expect(change.before).toEqual({ subject: "午後（必修問題）", category: "必修問題", topicTags: ["必修問題", "第114回"] });
      expect(change.after).toEqual({ subject: "午後（一般問題）", category: "一般問題", topicTags: ["一般問題", "第114回"] });
      expect(historicalNurseHash(question, change.id)).toBe(change.beforeFullSha256);
      expect(nurseObjectHash(question)).toBe(change.afterFullSha256);
    }
  });

  it("preserves the full object hashes of all other 398 originals, including every 115th original", () => {
    const baseline = [
      ...before427.previous427ObjectHashes,
      ...before427.sourceChecks.map(check => ({ id: check.id, sha256: check.objectSha256 })),
    ];
    expect(baseline).toHaveLength(430);
    expect(new Set(baseline.map(item => item.id)).size).toBe(430);
    const corrected = new Set(delta.changes.map(change => change.id));
    expect(baseline.filter(item => !corrected.has(item.id))).toHaveLength(398);
    for (const item of baseline) {
      const question = byId.get(item.id);
      expect(question, item.id).toBeDefined();
      if (corrected.has(item.id)) expect(historicalNurseHash(question, item.id)).toBe(item.sha256);
      else expect(nurseObjectHash(question), item.id).toBe(item.sha256);
    }
  });

  it("classifies the PM section boundaries and leaves 115th metadata unchanged", () => {
    const category = (year: number, qNumber: number) => byId.get(`kangoshi-${year}-annual-pm-q${qNumber}`)?.category;
    expect(category(2024, 25)).toBe("必修問題");
    expect(category(2024, 26)).toBe("一般問題");
    expect(category(2024, 90)).toBe("一般問題");
    expect(category(2024, 91)).toBe("状況設定問題");
    expect(category(2025, 25)).toBe("必修問題");
    expect(category(2025, 26)).toBe("一般問題");
    expect(category(2025, 90)).toBe("一般問題");
    expect(category(2025, 91)).toBe("状況設定問題");
    expect(byId.has("kangoshi-2025-annual-am-q32")).toBe(false);
    expect(byId.has("kangoshi-2025-annual-pm-q77")).toBe(false);
  });
});
