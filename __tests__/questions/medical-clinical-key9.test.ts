import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import { RIGAKU_RYOHOUSHI_QUESTIONS } from "@/data/questions/rigaku-ryohoshi";
import { SAGYO_RYOHOSHI_QUESTIONS } from "@/data/questions/sagyo-ryohoshi";
import pt2025 from "@/data/questions/rigaku-ryohoshi/2025-clinical-key9-ready.json";
import pt2026 from "@/data/questions/rigaku-ryohoshi/2026-clinical-key9-ready.json";
import ot from "@/data/questions/sagyo-ryohoshi/2024-2025-clinical-key9-ready.json";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { isAcceptedAnswer, isCompleteSelectionCorrect, requiredSelectionCount } from "@/lib/questions/answers";
import type { ChoiceKey, ExamCode, Question } from "@/lib/questions/types";

const keys = ["ア", "イ", "ウ", "エ", "オ"] as const;
const specs = [
  ["rigaku-ryohoshi-2025-annual-pm-q31", "124", "88f855824e4f3898b3da046a65a4c8cf3fe3855d3dbb3e59ee1ea89403c52851"],
  ["rigaku-ryohoshi-2025-annual-pm-q46", "24", "5fad0286a826f21e49943cb3d69cff6680c2c0f5cc23d8024b2c7ce796ee1c74"],
  ["rigaku-ryohoshi-2025-annual-pm-q53", "23", "b588cb72dbd734a8f13651d151daffd613dfe4fc8324de13bec0f0d8275f3aea"],
  ["rigaku-ryohoshi-2026-annual-pm-q57", "14", "0461d0f90f22889e89dedc2e60045324b7108bc00d7af2b04aab0a693d939dc6"],
  ["rigaku-ryohoshi-2026-annual-pm-q68", "24", "96947219037268133ac57944c2c123c6b6b3c5b09cba6055dc367321706f0190"],
  ["sagyo-ryohoshi-2024-annual-pm-q53", "23", "b56ea89ebbfed95fdbb349ca963935ae00de89eba8922ab69903ef7226807700"],
  ["sagyo-ryohoshi-2025-annual-am-q50", "24", "79a26f0abbb019c9c0bd5a5b46b9ef08306379ffb8960ea63b6dd03f33c9f0b8"],
  ["sagyo-ryohoshi-2025-annual-am-q60", "34", "ae046fdd496963c38cc1af9cff589e1728bf86b90c8ea7f56ebe1732aec4936e"],
  ["sagyo-ryohoshi-2025-annual-am-q98", "13", "57e791d22ebcd9bf9e458abd0cfe5681393b25bada2ba1428d47741601feec9a"],
] as const;

function textDigest(q: Question): string {
  const text = [
    q.question,
    ...keys.map(key => q.choices?.[key]),
    q.explanation,
    ...keys.map(key => q.choiceExplanations?.[key]),
  ];
  return createHash("sha256").update(JSON.stringify(text)).digest("hex");
}

describe("nine QA-approved PT/OT single-choice alternative originals", () => {
  it("registers exactly nine new IDs once, and retains unknown-exam fallback", async () => {
    const staged = [...pt2025, ...pt2026, ...ot];
    expect(staged).toHaveLength(9);
    expect(staged.map(q => q.id).sort()).toEqual(specs.map(([id]) => id).sort());
    const pt = await getQuestionsForExam("rigaku-ryohoshi");
    const sagyo = await getQuestionsForExam("sagyo-ryohoshi");
    expect(pt).toEqual(RIGAKU_RYOHOUSHI_QUESTIONS);
    expect(sagyo).toEqual(SAGYO_RYOHOSHI_QUESTIONS);
    expect(pt).toHaveLength(184);
    expect(sagyo).toHaveLength(303);
    const all = [...pt, ...sagyo];
    expect(new Set(all.map(q => q.id)).size).toBe(all.length);
    for (const [id] of specs) expect(all.filter(q => q.id === id)).toHaveLength(1);
    expect(await getQuestionsForExam("unknown-medical-exam" as ExamCode)).toEqual([]);
  });

  it.each(specs)("preserves approved text and grades alternatives as one choice: %s", (id, digits, expectedDigest) => {
    const rows: Question[] = [...RIGAKU_RYOHOUSHI_QUESTIONS, ...SAGYO_RYOHOSHI_QUESTIONS];
    const q = rows.find(row => row.id === id);
    expect(q).toBeDefined();
    const question = q!;
    expect(question.officialAnswerNumber).toBe(digits);
    expect(question.requiredSelections).toBe(1);
    expect(requiredSelectionCount(question)).toBe(1);
    expect(question.hasImage).toBe(false);
    expect(question.needsReview).toBe(false);
    expect(Object.keys(question.choices ?? {})).toEqual(keys);
    expect(Object.keys(question.choiceExplanations ?? {})).toEqual(keys);
    for (const key of keys) {
      expect(question.choices?.[key]?.trim()).not.toBe("");
      expect(question.choiceExplanations?.[key]?.trim()).not.toBe("");
    }
    expect(textDigest(question)).toBe(expectedDigest);
    expect(question.sourcePdfUrl).toMatch(/^https:\/\/www\.mhlw\.go\.jp\//);
    expect(question.sourceAnswerUrl).toMatch(/^https:\/\/www\.mhlw\.go\.jp\//);
    const accepted = [...digits].map(n => keys[Number(n) - 1] as ChoiceKey);
    expect(question.answer).toEqual(accepted);
    for (const choice of keys) {
      expect(isAcceptedAnswer(question.answer, choice)).toBe(accepted.includes(choice));
      expect(isCompleteSelectionCorrect(question.answer, [choice], 1)).toBe(accepted.includes(choice));
    }
    expect(isCompleteSelectionCorrect(question.answer, accepted, 1)).toBe(false);
    expect(isCompleteSelectionCorrect(question.answer, [], 1)).toBe(false);
    if (id === "rigaku-ryohoshi-2025-annual-pm-q31") {
      expect(isCompleteSelectionCorrect(question.answer, [accepted[0]!, accepted[1]!], 1)).toBe(false);
      expect(isCompleteSelectionCorrect(question.answer, [accepted[0]!, accepted[2]!], 1)).toBe(false);
      expect(isCompleteSelectionCorrect(question.answer, [accepted[1]!, accepted[2]!], 1)).toBe(false);
    }
    expect(isAcceptedAnswer(question.answer, accepted.join(""))).toBe(false);
  });
});
