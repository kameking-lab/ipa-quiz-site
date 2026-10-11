import { createHash } from "node:crypto";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import originalData from "@/data/questions/denken1/native-2026-power.json";
import supplement from "@/data/questions/denken1/choice-reasons-2026-power.json";
import original2025Data from "@/data/questions/denken1/native-2025-power.json";
import supplement2025 from "@/data/questions/denken1/choice-reasons-2025-power.json";
import { NativeAnswer } from "@/components/denken2/NativeAnswer";
import { DENKEN1_NATIVE_PARTS, DENKEN1_PUBLISHED_ORIGINAL_COUNT } from "@/lib/denken1/native";
import { withPowerChoiceReasons } from "@/lib/denken1/power-choice-reasons";

// JSON inference unions the 15- and 20-label banks with optional absent keys.
const original = { ...originalData, questions: originalData.questions.map(question => ({ ...question,
  choiceGroups: Object.fromEntries(Object.entries(question.choiceGroups)
    .filter((entry): entry is [string, string] => typeof entry[1] === "string")),
})) };

function canonical(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonical);
  if (value !== null && typeof value === "object") {
    const object = value as Record<string, unknown>;
    return Object.fromEntries(Object.keys(object).sort().map(key => [key, canonical(object[key])]));
  }
  return value;
}
const copySupplement = () => structuredClone(supplement);
afterEach(cleanup);

describe("Denken1 2025 primary power choice supplement", () => {
  it("covers the differing 15-, 18- and 17-label banks while preserving all original fields", () => {
    expect(createHash("sha256").update(JSON.stringify(canonical(original2025Data))).digest("hex"))
      .toBe(supplement2025.baseNativePartCanonicalSha256);
    const part = DENKEN1_NATIVE_PARTS.find(value => value.year === 2025 && value.subject === "power")!;
    expect(part.questions.map(question => [question.slots.length, Object.keys(question.choiceGroups).length]))
      .toEqual([[5, 15], [5, 15], [5, 15], [5, 15], [8, 18], [7, 17]]);
    let reasons = 0;
    for (const question of part.questions) for (const slot of question.slots) {
      expect(Object.keys(slot.choiceExplanations!)).toEqual(Object.keys(question.choiceGroups));
      expect(slot.choiceExplanations![slot.officialAnswer]).toMatch(/^この空欄では適切。/);
      reasons += Object.keys(slot.choiceExplanations!).length;
    }
    expect(reasons).toBe(563);
    const restored = { ...part, questions: part.questions.map(question => ({ ...question,
      slots: question.slots.map(slot => Object.fromEntries(Object.entries(slot)
        .filter(([key]) => key !== "choiceExplanations"))),
    })) };
    expect(restored).toEqual(original2025Data);
    expect(() => withPowerChoiceReasons(original, supplement2025)).toThrow();
  });

  it("keeps the pi-circuit result consistent with the official phase-voltage choice", () => {
    const question = DENKEN1_NATIVE_PARTS.find(value => value.year === 2025 && value.subject === "power")!.questions[1]!;
    const zy = -20 * 0.001;
    const a = 1 + zy / 2;
    const cImaginary = 0.001 * (1 + zy / 4);
    expect(a * a + 20 * cImaginary).toBeCloseTo(1, 12);
    const receivingPhaseVoltage = (275 / Math.sqrt(3)) / a;
    expect(receivingPhaseVoltage).toBeCloseTo(160.375, 3);
    const choices = Object.entries(question.choiceGroups).filter(([, text]) => /^\d+$/.test(text))
      .sort((left, right) => Math.abs(Number(left[1]) - receivingPhaseVoltage) - Math.abs(Number(right[1]) - receivingPhaseVoltage));
    expect(choices[0]![0]).toBe(question.slots[4]!.officialAnswer);
    expect(question.slots[4]!.choiceExplanations!["ホ"]).toContain("160.4");
  });

  it("reveals all 144 reasons for the eight-field valve original", () => {
    const question = DENKEN1_NATIVE_PARTS.find(value => value.year === 2025 && value.subject === "power")!.questions[4]!;
    const { container } = render(<NativeAnswer question={question} />);
    expect(screen.getAllByRole("combobox")).toHaveLength(8);
    expect(container.querySelectorAll("dd")).toHaveLength(0);
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getAllByText("全選択肢の理由（18肢）")).toHaveLength(8);
    expect(container.querySelectorAll("dd")).toHaveLength(144);
  });
});

describe("Denken1 2026 primary power choice supplement", () => {
  it("binds 580 complete reasons to the verified six originals without changing keys or figures", () => {
    const before = JSON.stringify(original);
    expect(createHash("sha256").update(JSON.stringify(canonical(original))).digest("hex"))
      .toBe(supplement.baseNativePartCanonicalSha256);
    const enriched = withPowerChoiceReasons(original, supplement);
    expect(enriched.questions).toHaveLength(6);
    let reasonCount = 0;
    const changedExplanations: string[] = [];
    for (const [index, enrichedQuestion] of enriched.questions.entries()) {
      const sourceQuestion = original.questions[index]!;
      const { slots, ...questionMetadata } = enrichedQuestion;
      const { slots: originalSlots, ...sourceMetadata } = sourceQuestion;
      expect(questionMetadata).toEqual(sourceMetadata);
      expect(slots).toHaveLength(originalSlots.length);
      for (const [slotIndex, enrichedSlot] of slots.entries()) {
        const sourceSlot = originalSlots[slotIndex]!;
        const reasons = (enrichedSlot as typeof enrichedSlot & { choiceExplanations: Record<string, string> }).choiceExplanations;
        expect(Object.keys(reasons)).toEqual(Object.keys(sourceQuestion.choiceGroups));
        reasonCount += Object.keys(reasons).length;
        for (const [label, reason] of Object.entries(reasons)) {
          expect(reason.startsWith(label === sourceSlot.officialAnswer
            ? "この空欄では適切。" : "この空欄では不適切。")).toBe(true);
        }
        const rest = Object.fromEntries(Object.entries(enrichedSlot).filter(([key]) => key !== "choiceExplanations"));
        if (rest.explanation !== sourceSlot.explanation) changedExplanations.push(`${sourceQuestion.number}:${sourceSlot.slot}`);
        expect({ ...rest, explanation: sourceSlot.explanation }).toEqual(sourceSlot);
      }
    }
    expect(reasonCount).toBe(580);
    expect(changedExplanations).toEqual(["3:1", "5:5", "6:1"]);
    expect(JSON.stringify(original)).toBe(before);
    expect(DENKEN1_PUBLISHED_ORIGINAL_COUNT).toBe(39);
    expect(DENKEN1_NATIVE_PARTS.find(part => part.year === 2026 && part.subject === "power")?.questions)
      .toEqual(enriched.questions);
  });

  it("rejects foreign sources, years and duplicate originals", () => {
    expect(() => withPowerChoiceReasons({ ...original, year: 2025 }, supplement)).toThrow();
    expect(() => withPowerChoiceReasons({ ...original, sourceAnswerPdfSha256: "0".repeat(64) }, supplement)).toThrow();
    const changed = copySupplement();
    changed.questions[1]!.id = changed.questions[0]!.id;
    expect(() => withPowerChoiceReasons(original, changed)).toThrow();
  });

  it("rejects changed answer labels, incomplete banks and duplicated filler", () => {
    const wrongAnswer = copySupplement();
    wrongAnswer.questions[0]!.fields[0]!.officialAnswer = "イ";
    expect(() => withPowerChoiceReasons(original, wrongAnswer)).toThrow();
    const missingReason = copySupplement();
    const incomplete: Record<string, string> = missingReason.questions[0]!.fields[0]!.choiceExplanations;
    delete incomplete["イ"];
    expect(() => withPowerChoiceReasons(original, missingReason)).toThrow();
    const changedBank = copySupplement();
    changedBank.questions[0]!.choiceGroups["イ"] = "異なる用語";
    expect(() => withPowerChoiceReasons(original, changedBank)).toThrow();
    const repeated = copySupplement();
    const reasons: Record<string, string> = repeated.questions[0]!.fields[0]!.choiceExplanations;
    reasons["ロ"] = reasons["イ"]!;
    expect(() => withPowerChoiceReasons(original, repeated)).toThrow();
    const duplicateSlot = copySupplement();
    duplicateSlot.questions[0]!.fields[1]!.slot = duplicateSlot.questions[0]!.fields[0]!.slot;
    expect(() => withPowerChoiceReasons(original, duplicateSlot)).toThrow();
  });

  it("does not overwrite previously authored reasons", () => {
    const source = { ...original, questions: original.questions.map(question => ({ ...question,
      slots: question.slots.map(slot => ({ ...slot, choiceExplanations: { existing: "保存済みの解説" } })),
    })) };
    expect(() => withPowerChoiceReasons(source, supplement)).toThrow(/overwrite existing reasons/);
  });

  it("reveals all 75 Q1 reasons and hides them again when the learner changes an answer", () => {
    const question = DENKEN1_NATIVE_PARTS.find(part => part.year === 2026 && part.subject === "power")!.questions[0]!;
    const { container } = render(<NativeAnswer question={question} />);
    expect(container.querySelectorAll("dd")).toHaveLength(0);
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getAllByText("全選択肢の理由（15肢）")).toHaveLength(5);
    expect(container.querySelectorAll("dd")).toHaveLength(75);
    expect(screen.getByText(question.slots[0]!.choiceExplanations!["ニ"]!)).toBeTruthy();
    fireEvent.change(screen.getByLabelText("空欄1"), { target: { value: "ヲ" } });
    expect(container.querySelectorAll("dd")).toHaveLength(0);
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByText("正解")).toBeTruthy();
    expect(container.querySelectorAll("dd")).toHaveLength(75);
  });
});
