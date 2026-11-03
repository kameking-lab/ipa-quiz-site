import { describe, expect, it } from "vitest";
import { gradeNativeB, NativeBDataSchema, normalizeQuestionData, nativeBQuestionIssue, serializeNativeBSelections } from "@/lib/questions/native-b";
import { formatQuestionAnswerForDisplay } from "@/lib/questions/display";
import { nativeBQuestion } from "@/__tests__/fixtures/native-b-question";
import { createHistoryStore } from "@/lib/storage/history";

for (const mode of ["binary", "shared-bank"] as const) describe(mode, () => {
  const question = nativeBQuestion(mode);
  const data = question.nativeB!;
  const all = Object.fromEntries(data.slots.map((slot) => [slot.label, slot.answer]));
  it("grades five slots as one original; repeated bank candidates remain valid", () => {
    expect(gradeNativeB(data, all)).toMatchObject({ isCorrect: true, correctSlots: 5, totalSlots: 5 });
    expect(new Set(Object.values(all)).size).toBe(2);
    expect(question.answer).toBe("");
    expect(nativeBQuestionIssue(question)).toBeNull();
    expect(formatQuestionAnswerForDisplay(question, question.answer)).toBe("L1: 1 / L2: 2 / L3: 1 / L4: 2 / L5: 1");
  });
  it("distinguishes partial, empty and invalid selections", () => {
    const partial = gradeNativeB(data, { L1: "1", L2: "1", L3: "UNKNOWN" });
    expect(partial.isCorrect).toBe(false);
    expect(partial.correctSlots).toBe(1);
    expect(partial.slotResults.map((slot) => slot.status)).toEqual(["correct", "incorrect", "invalid", "unanswered", "unanswered"]);
    expect(gradeNativeB(data, {}).correctSlots).toBe(0);
    expect(() => gradeNativeB(data, { ...all, WRONG_SLOT: "1" })).toThrow("Unknown native B slot");
  });
  it("rejects wrong keys, missing slot reasons, duplicate slot/IDs and invalid pool size", () => {
    const altered = structuredClone(data); altered.slots[0]!.answer = "99";
    expect(NativeBDataSchema.safeParse(altered).success).toBe(false);
    altered.slots[0]!.answer = "1"; altered.slots[0]!.explanation = " ";
    expect(NativeBDataSchema.safeParse(altered).success).toBe(false);
    const slots = structuredClone(data); slots.slots[0]!.label = "L2";
    expect(NativeBDataSchema.safeParse(slots).success).toBe(false);
    const ids = structuredClone(data); ids.candidates[0]!.id = "2";
    expect(NativeBDataSchema.safeParse(ids).success).toBe(false);
    expect(NativeBDataSchema.safeParse({ ...data, candidates: data.candidates.slice(1) }).success).toBe(false);
    expect(() => normalizeQuestionData({ ...question, choices: { ア: "flattened" } })).toThrow();
    expect(() => normalizeQuestionData({ ...question, answer: "1" })).toThrow();
  });
  it("preserves one history entry with per-slot details and old selected-string compatibility", () => {
    localStorage.clear(); const history = createHistoryStore();
    const old = { id: "old-mc", selected: "ア", correct: true, at: 1 };
    history.record(old);
    const result = gradeNativeB(data, all);
    history.record({ id: question.id, selected: serializeNativeBSelections(data, all), correct: result.isCorrect, at: 2, nativeBResult: result });
    const exported = history.exportJson(); history.reset(); expect(history.importJson(exported)).toBe(true);
    expect(history.getAllEntries()[0]).toEqual(old);
    expect(history.getAllEntries()[1]?.nativeBResult).toEqual(result);
    expect(history.getStats()).toMatchObject({ total: 2, correct: 2, uniqueAnswered: 2 });
  });
});
it("allows existing binary statement reasons and shared definitions without a matrix gate", () => {
  const binary = nativeBQuestion().nativeB!;
  binary.candidates.forEach((candidate) => delete candidate.explanation);
  expect(NativeBDataSchema.safeParse(binary).success).toBe(true);
  const bank = nativeBQuestion("shared-bank").nativeB!;
  expect(bank.slots.every((slot) => !slot.candidateExplanations)).toBe(true);
  expect(NativeBDataSchema.safeParse(bank).success).toBe(true);
  delete bank.candidates[0]!.explanation;
  expect(NativeBDataSchema.safeParse(bank).success).toBe(false);
});

it("keeps held and malformed originals out of practice pools without changing flags", async () => {
  const { isPracticeReadyQuestion } = await import("@/lib/questions/filter");
  const question = nativeBQuestion();
  expect(isPracticeReadyQuestion(question)).toBe(true);
  const held = { ...question, needsReview: true };
  expect(isPracticeReadyQuestion(held)).toBe(false); expect(held.needsReview).toBe(true);
  const broken = structuredClone(question); broken.nativeB!.slots.pop();
  expect(isPracticeReadyQuestion(broken)).toBe(false);
});
it("JSON-LD retains one original and all five official answers instead of the empty shim", async () => {
  const { buildQuestionJsonLd } = await import("@/lib/seo/question-jsonld");
  const graph = buildQuestionJsonLd({ question: nativeBQuestion(), pageUrlAbs: "https://example.org/q", title: "structural", lastUpdatedISO: "2026-10-15" });
  const serialized = JSON.stringify(graph);
  expect(serialized).toContain("L1: 1 / L2: 2 / L3: 1 / L4: 2 / L5: 1");
});

it("uses the printed B label without renumbering the original or its route", async () => {
  const { questionNumberLabel } = await import("@/lib/questions/display");
  const { questionPagePath } = await import("@/lib/seo/question-url");
  const question = nativeBQuestion(); question.qNumber = 21; question.nativeB!.officialLabel = "B1";
  expect(questionNumberLabel(question)).toBe("B1"); expect(question.qNumber).toBe(21);
  expect(questionPagePath(question)).toContain("q21");
  const { buildQuestionJsonLd } = await import("@/lib/seo/question-jsonld");
  expect(JSON.stringify(buildQuestionJsonLd({ question, pageUrlAbs: "https://example.org/q21", title: "structural", lastUpdatedISO: "2026-10-15" }))).toContain('"name":"問B1"');
});
