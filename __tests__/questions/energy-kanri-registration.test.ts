import { describe, expect, it } from "vitest";
import { ENERGY_KANRI_REGISTRATION as registration, scoreEnergyKanriItem } from "@/data/qualification-staging/energy-kanri";
import official from "@/data/qualification-staging/energy-kanri/official-answers.json";
import { QUESTIONS_BY_EXAM } from "@/data/questions";

describe("エネルギー管理士の全件未公開登録と公式採点", () => {
  it("全62原問842公式欄を重複なく登録し、各欄の公式配点を保持する", () => {
    expect(registration.publicAllowed).toBe(false);
    expect(registration.status).toBe("ready-to-ingest");
    expect(Object.keys(QUESTIONS_BY_EXAM)).not.toContain(registration.slug);
    expect(registration.records).toHaveLength(838);
    expect(new Set(registration.records.map((r) => r.question.id)).size).toBe(838);
    const expected = official.flatMap((table) => table.questions.flatMap((q) => q.slots.map((slot) =>
      `${table.year}/${table.packet}/${q.questionNumber}/${slot.label}/${slot.points}`)));
    const actual = registration.records.flatMap((record) => {
      const q = record.question;
      const packet = q.sourcePdfUrl.match(/r0[78]_(\d)\.pdf#/)![1];
      return record.officialSlots.map((slot) => `${q.year}/${packet}/${q.qNumber}/${slot.label}/${slot.points}`);
    });
    expect(actual.sort()).toEqual(expected.sort());
    expect(new Set(actual).size).toBe(842);
    expect(registration.records.filter((r) => r.scoring === "all-correct")).toHaveLength(1);
  });

  it("唯一の正答がない欄は全選択肢・空欄を含め公式配点の全点を与える", () => {
    const record = registration.records.find((r) => r.scoring === "all-correct")!;
    expect(record.question.id).toBe("energy-kanri-2026-6-q08-s08");
    expect("answer" in record.question).toBe(false);
    const table = official.find((t) => t.year === 2026 && t.packet === 6)!;
    const slot = table.questions.find((q) => q.questionNumber === 8)!.slots.find((s) => s.label === "8")!;
    for (const response of [undefined, "", [], "ア", "イ", "ウ", "エ", "オ", ["ア", "オ"]]) {
      expect(scoreEnergyKanriItem(record, response)).toEqual({ correct: true, earnedPoints: slot.points, maxPoints: slot.points });
    }
  });

  it("通常欄の未回答・誤答は0点とし、個別許容正答と順序不問を区別する", () => {
    for (const record of registration.records.filter((r) => r.scoring === "answer")) {
      const q = record.question;
      const expected = record.officialSlots.reduce((sum, s) => sum + s.points, 0);
      const response = Array.isArray(q.answer) && !q.requiredSelections ? q.answer[0] : q.answer;
      expect(scoreEnergyKanriItem(record, response).earnedPoints, q.id).toBe(expected);
      expect(scoreEnergyKanriItem(record).earnedPoints, q.id).toBe(0);
      expect(scoreEnergyKanriItem(record, "invalid").earnedPoints, q.id).toBe(0);
      if (q.requiredSelections === 2 && Array.isArray(q.answer)) {
        expect(scoreEnergyKanriItem(record, [...q.answer].reverse()).correct).toBe(true);
        expect(scoreEnergyKanriItem(record, [q.answer[0]]).correct).toBe(false);
        expect(scoreEnergyKanriItem(record, [q.answer[0], q.answer[0]]).correct).toBe(false);
      } else if (Array.isArray(q.answer)) {
        for (const answer of q.answer) expect(scoreEnergyKanriItem(record, answer).correct).toBe(true);
        expect(scoreEnergyKanriItem(record, q.answer).correct).toBe(false);
      }
    }
  });
});
