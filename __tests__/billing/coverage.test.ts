import { describe, it, expect } from "vitest";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { BILLING_SAMPLE_ID } from "@/lib/billing/sample";
describe("existing real content (not generated)", () => {
  it("fixed sample exists, is practice ready and has every choice reason", async () => {
    const q = (await getQuestionsForExam("fp2")).find(q => q.id === BILLING_SAMPLE_ID);
    if (!q) throw new Error("Missing fixed sample");
    expect(isPracticeReadyQuestion(q)).toBe(true);
    expect(Object.keys(q.choices!).every(k => !!q.choiceExplanations?.[k as keyof NonNullable<typeof q.choiceExplanations>])).toBe(true);
  });
  it.each(["ap", "st", "fp2"] as const)("audits %s actual annual pools and per-choice coverage", async exam => {
    const all = await getQuestionsForExam(exam);
    const ready = all.filter(isPracticeReadyQuestion);
    const full = ready.filter(q => q.choices && Object.keys(q.choices).every(k => !!q.choiceExplanations?.[k as keyof NonNullable<typeof q.choiceExplanations>]?.trim()));
    console.info(JSON.stringify({ base: "0a79ccec11f30e0e8cbcea3e7bc660649101fdce", exam, ready: ready.length, allChoiceReasons: full.length,
      sessions: [...new Set(ready.map(q => q.session))].sort(), years: [...new Set(ready.map(q => q.year))].sort(),
      bySession: [...new Set(ready.map(q => q.session))].sort().map(session => ({ session, ready: ready.filter(q => q.session === session).length, allChoiceReasons: full.filter(q => q.session === session).length })),
      example: full[0]?.id ?? null }));
    expect(ready.length).toBeGreaterThan(0);
  });
});
