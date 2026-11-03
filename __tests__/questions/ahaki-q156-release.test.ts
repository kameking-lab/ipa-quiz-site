import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import { AHAKI_HARI_KYUU_QUESTIONS } from "@/data/questions/ahaki";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import receipt from "@/docs/evidence/hari-kyu-q156-20261023/INTEGRATION.json";

function canonical(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(canonical).join(",")}]`;
  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    return `{${Object.keys(record).sort().map(key => `${JSON.stringify(key)}:${canonical(record[key])}`).join(",")}}`;
  }
  return JSON.stringify(value) ?? "null";
}
describe("accepted Q156 integration", () => {
  it("retains all 359 baseline objects and registers the one independently accepted original", async () => {
    const previous = AHAKI_HARI_KYUU_QUESTIONS.filter(q => q.id !== receipt.id)
      .sort((a, b) => a.year - b.year || a.qNumber - b.qNumber);
    expect(previous).toHaveLength(359);
    expect(createHash("sha256").update(canonical(previous)).digest("hex")).toBe(receipt.preservedExistingCanonicalSha256);
    const pool = await getQuestionsForExam("ahaki-hari-kyu");
    expect(pool).toHaveLength(360);
    expect(new Set(pool.map(q => q.id)).size).toBe(360);
    const added = pool.find(q => q.id === receipt.id)!;
    expect(added.answer).toBe("エ");
    expect(added.choices?.エ).toBe("上巨虚");
    expect(added.hasImage).toBe(false);
    expect(added.needsReview).not.toBe(true);
    expect(receipt.acceptedScopeOnly.decision).toBe("ACCEPT_CONTENT");
    expect(receipt.productionPublished).toBe(false);
  });
});
