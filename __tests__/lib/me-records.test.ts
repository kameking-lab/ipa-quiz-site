import { describe, expect, it } from "vitest";
import { buildMeRecords, plannedPaceBehind, recordExam, studyMinutesFromHistory } from "@/lib/me/records";
import { lifetimePetStage, passedPlanExams } from "@/lib/me/pet";
import { emptyPetProfiles, newPetProfile } from "@/lib/pet/v1/profile";
import type { HistoryEntry } from "@/lib/storage/history";

const now = new Date("2026-11-17T01:00:00+09:00");
function entry(id: string, at: string, correct = true): HistoryEntry { return { id, at: Date.parse(at), correct, selected: "ア" }; }
describe("わたしの記録", () => {
  it("renders an empty 84-day calendar without NaN", () => {
    const records = buildMeRecords([], {}, now);
    expect(records).toMatchObject({ total: 0, minutes: 0, averageQuestions: 0, averageMinutes: 0, streak: 0 });
    expect(records.calendar).toHaveLength(84); expect(records.calendar.at(-1)?.date).toBe("2026-11-17");
  });
  it("groups by the JST day and qualification; reattempts keep their own grades", () => {
    const entries = [entry("ap-q1", "2026-11-16T15:01:00Z"), entry("ap-q1", "2026-11-16T15:02:00Z", false), entry("fp2-q1", "2026-11-16T14:59:00Z")];
    const result = buildMeRecords(entries, {}, now);
    expect(result.records.map(record => [record.date, record.exam, record.entries.length, record.correct])).toEqual([["2026-11-17", "ap", 2, 1], ["2026-11-16", "fp2", 1, 1]]);
    expect(result.streak).toBe(2);
    expect(result.averageQuestions).toBe(1.5); expect(result.averageMinutes).toBe(4.5);
  });
  it("keeps older heatmap totals after history truncation, without double counting overlapping days", () => {
    const records = buildMeRecords([entry("ap-q1", "2026-11-16T18:00:00+09:00")], { "2026-11-01": 2000, "2026-11-16": 10, "2026-11-17": 0 }, now);
    expect(records.total).toBe(2010); expect(records.minutes).toBe(6030); expect(records.averageQuestions).toBe(1005);
    expect(records.streak).toBe(1); expect(records.records).toHaveLength(1);
  });
  it("does not credit rapid submissions or idle wall-clock time", () => {
    const entries = [0, 1000, 2000, 8000, 86400000].map((offset, i) => ({ id: `ap-q${i}`, at: 10000 + offset, correct: true, selected: "ア" }));
    expect(studyMinutesFromHistory(entries)).toBe(9);
    expect(studyMinutesFromHistory([])).toBe(0);
  });
  it("uses measured minutes for overlapping answers and preserves legacy and synced activity", () => {
    const legacy = entry("ap-old", "2026-11-16T18:00:00+09:00");
    const recent = entry("ap-new", "2026-11-17T00:30:00+09:00");
    const base = { exam: "ap", questionId: recent.id, at: recent.at + 1 };
    const records = buildMeRecords([legacy, recent], {}, now, {}, [
      { ...base, id: "rapid", kind: "answer", activeMs: 50, correct: recent.correct },
      { ...base, id: "read", kind: "explanation-read" },
      { ...base, id: "synced", questionId: "ap-essay", kind: "answer", questionType: "essay", activeMs: 9000, correct: true },
    ]);
    expect(records.total).toBe(3);
    expect(records.minutes).toBe(34);
    expect(records.records[0].entries).toHaveLength(2);
  });
  it("decays a lapsed streak and ignores future/invalid saved counters", () => {
    const records = buildMeRecords([], { "2026-11-14": 1, "2026-11-15": 1, "2026-12-01": 200, junk: 100, "2026-11-16": -2 }, now);
    expect(records.total).toBe(2); expect(records.streak).toBe(0);
  });
  it("resolves long qualification keys, original JASPA IDs and authoritative metadata", () => {
    expect(recordExam("jidosha-2025-first-2-gasoline-q1")).toBe("jidosha-2-gasoline");
    expect(recordExam("chusho-kigyo-shindanshi-2024-am-q1")).toBe("chusho-kigyo-shindanshi");
    expect(buildMeRecords([entry("legacy-q1", "2026-11-16T18:00:00+09:00")], {}, now, { "legacy-q1": "ap" }).records[0].exam).toBe("ap");
  });
  it("uses the current qualification's dated plan for the expression, independent of lifetime growth", () => {
    const plans = [{ createdAt: "2026-11-15T00:00:00+09:00", input: { exam: "ap" }, daily: [{ date: "2026-11-16", tasks: [{ kind: "questions", estimatedMinutes: 6 }] }] }];
    const answers = [entry("ap-q1", "2026-11-16T18:00:00+09:00"), entry("ap-q2", "2026-11-16T18:01:00+09:00")];
    expect(plannedPaceBehind(plans, answers, "ap", now)).toBe(false);
    expect(plannedPaceBehind(plans, answers.slice(0, 1), "ap", now)).toBe(true);
    expect(plannedPaceBehind(plans, answers, "fp2", now)).toBeUndefined();
  });
  it("does not infer a plan pace from malformed or undated result records", () => {
    expect(plannedPaceBehind([{ input: { exam: "ap" }, result: "passed" }], [], "ap", now)).toBeUndefined();
    expect(plannedPaceBehind(null, [], "ap", now)).toBeUndefined();
  });
});
describe("累計のチワワ", () => {
  it("grows across qualifications and never drops below an already earned stage", () => {
    const doc = emptyPetProfiles("guest", "Asia/Tokyo");
    doc.profiles = [newPetProfile("guest", "ap"), newPetProfile("guest", "fp2")];
    expect(lifetimePetStage(doc, 14)).toBe("puppy"); expect(lifetimePetStage(doc, 15)).toBe("partner"); expect(lifetimePetStage(doc, 90)).toBe("expert");
    doc.profiles[0].unlockedStages.push("partner", "expert");
    expect(lifetimePetStage(doc, 0)).toBe("expert");
    expect(doc.profiles[1].selectedStage).toBe("puppy");
  });
  it("only frames an explicitly recorded pass", () => {
    expect(passedPlanExams([{ input: { exam: "ap" }, result: "passed" }, { input: { exam: "fp2" }, result: "failed" }, { input: { exam: "fe" } }, { input: { exam: "ap" }, result: "passed" }])).toEqual(["ap"]);
    expect(passedPlanExams(null)).toEqual([]);
    expect(passedPlanExams([{ input: { exam: "ip" }, result: "passed" }], [
      { exam: "ap", result: "passed" }, { exam: "fp2", result: "failed" }, { exam: "ip", result: "passed" },
    ])).toEqual(["ap", "ip"]);
  });
});
