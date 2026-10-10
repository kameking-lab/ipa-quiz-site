import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import { AHAKI_ANMA_QUESTIONS, AHAKI_HARI_KYUU_QUESTIONS } from "@/data/questions/ahaki";
import proof from "@/docs/evidence/ahaki-literal67-20261010/INTEGRATION.json";

const all = [...AHAKI_ANMA_QUESTIONS, ...AHAKI_HARI_KYUU_QUESTIONS];
const byId = new Map(all.map((question) => [question.id, question]));
function canonical(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(canonical).join(",")}]`;
  if (value !== null && typeof value === "object") {
    const record = value as Record<string, unknown>;
    return `{${Object.keys(record).sort().map((key) => `${JSON.stringify(key)}:${canonical(record[key])}`).join(",")}}`;
  }
  return JSON.stringify(value) ?? "null";
}
const hash = (value: unknown) => createHash("sha256").update(canonical(value)).digest("hex");

describe("Ahaki original-image literal delta", () => {
  it("preserves all 608 previous full objects and freezes precisely 67 added originals", () => {
    expect(Object.keys(proof.old608ObjectHashes)).toHaveLength(608);
    for (const [id, expected] of Object.entries(proof.old608ObjectHashes)) {
      expect(byId.has(id), id).toBe(true);
      expect(hash(byId.get(id)), id).toBe(expected);
    }
    expect(proof.newRows).toHaveLength(67);
    for (const row of proof.newRows) {
      expect(hash(byId.get(row.siteId)), row.siteId).toBe(row.objectSha256);
      expect(row.reviewedPages.length, row.siteId).toBeGreaterThan(0);
      expect(row.officialAcceptedChoices, row.siteId).toHaveLength(1);
    }
    expect(all).toHaveLength(678);
  });
  it("renders each single-question case after its question exactly once", () => {
    const rows = proof.newRows.filter((row) => row.mode === "inline_case_once_in_official_order");
    expect(rows).toHaveLength(8);
    for (const row of rows) {
      const question = byId.get(row.siteId)!.question;
      expect(question.split("「")).toHaveLength(2);
      expect(question.indexOf("どれか。")).toBeLessThan(question.indexOf("「"));
      expect(question.endsWith("」")).toBe(true);
    }
    const pair = byId.get("ahaki-anma-2025-annual-am-q77")!.question;
    expect(pair.startsWith("次の症例について、問題77、78")).toBe(true);
    expect(pair).toContain("脳梗塞");
    expect(pair.split("78 歳の男性")).toHaveLength(2);
  });
  it("retains verified Greek glyphs and excludes separately owned or material-held originals", () => {
    expect(byId.get("ahaki-anma-2025-annual-am-q29")!.choices).toEqual({ ア: "α 波", イ: "β 波", ウ: "θ 波", エ: "δ 波" });
    expect(byId.get("ahaki-hari-kyu-2026-annual-pm-q179")!.choices?.ウ).toBe("Aδ線維");
    for (const id of ["ahaki-hari-kyu-2025-annual-pm-q156", "ahaki-anma-2025-annual-pm-q124"]) {
      expect(byId.has(id), id).toBe(false);
    }
    expect(proof.newModelRequests).toBe(0);
    expect(proof.publication).toBe(false);
  });
});
