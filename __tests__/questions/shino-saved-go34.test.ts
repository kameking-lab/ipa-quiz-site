import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import saved from "@/data/questions/shino-kunrenshi/saved-go34-20261011.json";
import { SHINO_KUNRENSHI_QUESTIONS } from "@/data/questions/shino-kunrenshi";
import source from "@/docs/evidence/shino-saved-go34-20261011/source-review-snapshots.json";
import assets from "@/docs/evidence/shino-saved-go34-20261011/assets.json";
import { hasUnrenderableContent } from "@/lib/questions/content-quality";
import type { Question } from "@/lib/questions/types";

const keys = ["ア", "イ", "ウ", "エ", "オ"] as const;
const sha = (text: string) => createHash("sha256").update(text).digest("hex");
const rows = saved as Question[];

describe("saved orthoptist originals: literal source and accepted review contract", () => {
  it("adds the exact 34 reviewed identities once, with all 170 choices", () => {
    expect(rows).toHaveLength(34);
    expect(rows.map(q => q.id).sort()).toEqual(source.map(q => q.identity).sort());
    expect(new Set(SHINO_KUNRENSHI_QUESTIONS.map(q => q.id)).size).toBe(SHINO_KUNRENSHI_QUESTIONS.length);
    for (const q of rows) expect(SHINO_KUNRENSHI_QUESTIONS.filter(r => r.id === q.id)).toHaveLength(1);
    expect(rows.reduce((sum, q) => sum + Object.keys(q.choiceExplanations ?? {}).length, 0)).toBe(170);
  });

  it.each(source)("preserves the printed fields and accepted reason hashes: $identity", s => {
    const q = rows.find(q => q.id === s.identity)!;
    expect(q.question).toBe(s.stem);
    expect(keys.map(k => q.choices?.[k])).toEqual(Object.values(s.choices));
    const answer = Array.isArray(q.answer) ? q.answer : [q.answer];
    expect(answer.map(k => String(keys.indexOf(k as typeof keys[number]) + 1))).toEqual(s.officialAnswer);
    expect(q.officialAnswerNumber).toBe(s.officialAnswer.join(""));
    expect(q.requiredSelections).toBe(s.requiredSelections);
    expect(answer).toHaveLength(s.requiredSelections);
    expect(q.sourcePdfUrl).toBe(s.sourcePdfUrl);
    expect(q.sourceAnswerUrl).toBe(s.sourceAnswerUrl);
    expect(sha(q.explanation)).toBe(s.explanationSha256);
    for (const [n, k] of keys.entries()) {
      expect(sha(q.choiceExplanations?.[k] ?? "")).toBe(s.choiceReasonSha256[String(n + 1) as keyof typeof s.choiceReasonSha256]);
    }
    expect(q.year).toBe(s.canonicalYear);
    expect(q.examDate).toBe(s.actualExamDate);
    expect(q.examDate).toBe(s.edition === 56 ? "2026-02-19" : "2025-02-20");
    expect(q.needsReview).toBe(false);
    expect(hasUnrenderableContent(q)).toBe(false);
  });

  it("ships all 15 figure references as the 14 pinned original image hashes", () => {
    expect(assets).toHaveLength(15);
    expect(new Set(assets.map(a => a.sha256)).size).toBe(14);
    const referenced = rows.flatMap(q => q.imageUrls ?? []);
    expect(referenced.sort()).toEqual(assets.map(a => a.publicUrl).sort());
    for (const a of assets) {
      const bytes = readFileSync(resolve(process.cwd(), "public", a.publicUrl.slice(1)));
      expect(createHash("sha256").update(bytes).digest("hex")).toBe(a.sha256);
      expect(bytes.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
    }
  });

  it("keeps explicit source exclusions and unresolved drafts outside the runtime", () => {
    const ids = new Set(SHINO_KUNRENSHI_QUESTIONS.map(q => q.id));
    for (const id of [
      "shino-kunrenshi-2024-annual-am-q73", "shino-kunrenshi-2024-annual-pm-q52",
      "shino-kunrenshi-2025-annual-am-q1", "shino-kunrenshi-2025-annual-am-q37",
      "shino-kunrenshi-2025-annual-pm-q69", "shino-kunrenshi-2025-annual-pm-q58",
    ]) expect(ids.has(id)).toBe(false);
  });


});
