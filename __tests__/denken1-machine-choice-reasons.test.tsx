import { createHash } from "node:crypto";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import source2025 from "@/data/questions/denken1/native-2025-machine.json";
import source2026 from "@/data/questions/denken1/native-2026-machine.json";
import reasons2025 from "@/data/questions/denken1/choice-reasons-2025-machine.json";
import reasons2026 from "@/data/questions/denken1/choice-reasons-2026-machine.json";
import { NativeAnswer } from "@/components/denken2/NativeAnswer";
import { DENKEN1_NATIVE_PARTS } from "@/lib/denken1/native";
import { withNativeChoiceReasons, type NativeChoiceSourcePart } from "@/lib/denken1/native-choice-reasons";

function canonical(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonical);
  if (value !== null && typeof value === "object") {
    const object = value as Record<string, unknown>;
    return Object.fromEntries(Object.keys(object).sort().map(key => [key, canonical(object[key])]));
  }
  return value;
}
function normalize(source: typeof source2025 | typeof source2026): NativeChoiceSourcePart {
  return { ...source, questions: source.questions.map(question => ({ ...question,
    choiceGroups: Object.fromEntries(Object.entries(question.choiceGroups)
      .filter((entry): entry is [string, string] => typeof entry[1] === "string")),
  })) };
}
afterEach(cleanup);
const datasets = [
  { year: 2025, source: source2025, reasons: reasons2025, fields: 40, count: 655, corrections: ["2:5", "3:3"], derivations: ["2:5"] },
  { year: 2026, source: source2026, reasons: reasons2026, fields: 41, count: 647, corrections: ["2:3", "4:1", "4:2", "5:2", "6:3", "7:3"], derivations: ["3:3", "5:2", "7:3"] },
];

describe("Denken1 latest two primary machine originals: all-choice reasons", () => {
  for (const data of datasets) it(`preserves seven ${data.year} originals and completes every field/bank`, () => {
    const before = JSON.stringify(data.source);
    expect(createHash("sha256").update(JSON.stringify(canonical(data.source))).digest("hex"))
      .toBe(data.reasons.baseNativePartCanonicalSha256);
    const part = DENKEN1_NATIVE_PARTS.find(value => value.year === data.year && value.subject === "machine")!;
    expect(part.questions).toHaveLength(7);
    expect(part.questions.flatMap(question => question.slots)).toHaveLength(data.fields);
    const changed: string[] = [];
    const changedDerivations: string[] = [];
    const changedFigures: number[] = [];
    let count = 0;
    for (const [index, question] of part.questions.entries()) {
      const original = data.source.questions[index]!;
      const { slots, ...metadata } = question;
      const { slots: originalSlots, ...originalMetadata } = original;
      if (JSON.stringify(metadata.figures) !== JSON.stringify(originalMetadata.figures)) changedFigures.push(question.number);
      expect({ ...metadata, figures: originalMetadata.figures }).toEqual(originalMetadata);
      for (const [fieldIndex, field] of slots.entries()) {
        const originalField = originalSlots[fieldIndex]!;
        const reasons = field.choiceExplanations!;
        expect(Object.keys(reasons)).toEqual(Object.keys(question.choiceGroups));
        expect(new Set(Object.values(reasons)).size).toBe(Object.keys(question.choiceGroups).length);
        for (const [label, reason] of Object.entries(reasons)) expect(reason.startsWith(
          label === field.officialAnswer ? "この空欄では適切。" : "この空欄では不適切。",
        )).toBe(true);
        count += Object.keys(reasons).length;
        const restored = Object.fromEntries(Object.entries(field).filter(([key]) => key !== "choiceExplanations"));
        if (restored.explanation !== originalField.explanation) changed.push(`${question.number}:${field.slot}`);
        if (restored.derivation !== originalField.derivation) changedDerivations.push(`${question.number}:${field.slot}`);
        expect({ ...restored, explanation: originalField.explanation, derivation: originalField.derivation }).toEqual(originalField);
      }
    }
    expect(count).toBe(data.count);
    expect(changed).toEqual(data.corrections);
    expect(changedDerivations).toEqual(data.derivations);
    expect(changedFigures).toEqual(data.year === 2026 ? [4] : []);
    expect(part.questions[5]!.alternateQuestionRule).toBeTruthy();
    expect(part.questions[6]!.alternateQuestionRule).toBe(part.questions[5]!.alternateQuestionRule);
    expect(JSON.stringify(data.source)).toBe(before);
  });

  it("rejects foreign subjects, duplicate originals, absent alternatives and missing reasons", () => {
    const original = normalize(source2026);
    expect(() => withNativeChoiceReasons(original, reasons2026, "power")).toThrow();
    expect(() => withNativeChoiceReasons({ ...original, sourcePacketSha256: "0".repeat(64) }, reasons2026, "machine")).toThrow();
    const duplicate = structuredClone(reasons2026);
    duplicate.questions[6]!.id = duplicate.questions[5]!.id;
    expect(() => withNativeChoiceReasons(original, duplicate, "machine")).toThrow();
    const absent = structuredClone(reasons2026);
    absent.questions.pop();
    expect(() => withNativeChoiceReasons(original, absent, "machine")).toThrow();
    const incomplete = structuredClone(reasons2026);
    delete (incomplete.questions[6]!.fields[7]!.choiceExplanations as Record<string, string>)["ツ"];
    expect(() => withNativeChoiceReasons(original, incomplete, "machine")).toThrow();
  });

  it("rejects changed answer keys, altered source banks and overwrite of saved reasons", () => {
    const original = normalize(source2025);
    const wrong = structuredClone(reasons2025);
    wrong.questions[5]!.fields[4]!.officialAnswer = "イ";
    expect(() => withNativeChoiceReasons(original, wrong, "machine")).toThrow();
    const bank = structuredClone(reasons2025);
    bank.questions[5]!.choiceGroups["ホ"] = "改変した数値";
    expect(() => withNativeChoiceReasons(original, bank, "machine")).toThrow();
    const existing = { ...original, questions: original.questions.map(question => ({ ...question,
      slots: question.slots.map(field => ({ ...field, choiceExplanations: { saved: "保存済み" } })),
    })) };
    expect(() => withNativeChoiceReasons(existing, reasons2025, "machine")).toThrow(/overwrite/);
  });

  it("shows all 160 reasons for the eight-field 2025 alternative and hides them on change", () => {
    const question = DENKEN1_NATIVE_PARTS.find(value => value.year === 2025 && value.subject === "machine")!.questions[6]!;
    const { container } = render(<NativeAnswer question={question} />);
    expect(screen.getAllByRole("combobox")).toHaveLength(8);
    expect(container.querySelectorAll("dd")).toHaveLength(0);
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getAllByText("全選択肢の理由（20肢）")).toHaveLength(8);
    expect(container.querySelectorAll("dd")).toHaveLength(160);
    fireEvent.change(screen.getByLabelText("空欄8"), { target: { value: "イ" } });
    expect(container.querySelectorAll("dd")).toHaveLength(0);
  });

  it("shows all 152 reasons for the nineteen-label 2026 alternative", () => {
    const question = DENKEN1_NATIVE_PARTS.find(value => value.year === 2026 && value.subject === "machine")!.questions[6]!;
    const { container } = render(<NativeAnswer question={question} />);
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getAllByText("全選択肢の理由（19肢）")).toHaveLength(8);
    expect(container.querySelectorAll("dd")).toHaveLength(152);
  });

  it("keeps lighting, battery and parallel-transformer choices consistent with the original values", () => {
    const part2025 = DENKEN1_NATIVE_PARTS.find(value => value.year === 2025 && value.subject === "machine")!;
    const needed = 750 * 18 * 6 / (3800 * 0.69 * 0.81);
    expect(needed).toBeCloseTo(38.1388, 4);
    expect(Math.ceil(needed)).toBe(Number(part2025.questions[3]!.choiceGroups[part2025.questions[3]!.slots[4]!.officialAnswer]));
    expect(27 * 7.1 / 87).toBeCloseTo(2.203448, 6);
    const oxygen = (6.5 / 65) * 2 / 4 * 32;
    expect(oxygen).toBe(Number(part2025.questions[5]!.choiceGroups[part2025.questions[5]!.slots[4]!.officialAnswer]));
    const part2026 = DENKEN1_NATIVE_PARTS.find(value => value.year === 2026 && value.subject === "machine")!;
    expect(part2026.questions[1]!.slots.map(field => field.officialAnswer)).toEqual(["ヌ", "ル", "カ", "イ", "ニ"]);
    const shareA = (20 / 5) / (20 / 5 + 30 / 3);
    expect(30 / (1 - shareA)).toBeCloseTo(42);
    expect(40 * shareA).toBeCloseTo(11.428571, 6);
    expect((20 / 5) / (20 / 5 + 30 / 6)).toBeGreaterThan(shareA);
  });
});
