// @vitest-environment node
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { ST_QUESTIONS, ST_PR757_ADOPTED_IDS } from "@/data/questions/st";
import { ST_ACCEPTED_399_DELTA } from "@/data/questions/st/accepted399-20261024";
import receipts from "@/docs/evidence/st-residual11-20261011/source-corrections.json";
import adoption from "@/docs/evidence/st-residual11-20261011/RECHECK-20261110.json";
import conflicts from "@/docs/evidence/st-residual11-20261011/unresolved.json";

describe("PR757 source corrections on current main", () => {
  it("corrects six remaining originals with 24 reasons and preserves official answers", () => {
    expect(ST_PR757_ADOPTED_IDS.sort()).toEqual([...adoption.adoptedIds].sort());
    expect(ST_PR757_ADOPTED_IDS).toHaveLength(6);
    for (const id of ST_PR757_ADOPTED_IDS) {
      const q = ST_QUESTIONS.find(q => q.id === id)!;
      const row = receipts.find(row => row.id === id)!;
      expect(q.answer).toBe(row.officialAnswer);
      expect(q).toMatchObject(row.after);
      expect(Object.keys(q.choiceExplanations ?? {})).toHaveLength(4);
      const path = `public${row.after.imageUrls[0]}`;
      expect(createHash("sha256").update(readFileSync(path)).digest("hex")).toBe(row.cropSha256);
    }
  });
  it("retains all 399 newer accepted originals, including the two overlapping corrections", () => {
    for (const q of ST_ACCEPTED_399_DELTA) expect(ST_QUESTIONS.find(current => current.id === q.id)).toEqual(q);
    expect(adoption.alreadyAcceptedIds).toEqual(["st-2010a-am2-q6", "st-2021h-am2-q17"]);
  });
  it("leaves source-conflict questions out of the incoming complete explanations", () => {
    for (const row of conflicts) {
      expect(ST_PR757_ADOPTED_IDS).not.toContain(row.id);
      const q = ST_QUESTIONS.find(q => q.id === row.id);
      if (row.id === "st-2009a-am2-q23") expect(q).toBeUndefined();
      else {
        expect(q?.answer).toBe(row.officialAnswer);
        expect(q?.choiceExplanations).toBeUndefined();
      }
    }
    expect(ST_QUESTIONS.filter(q => q.choiceExplanations)).toHaveLength(877);
  });
});
