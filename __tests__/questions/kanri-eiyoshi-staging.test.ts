import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import am from "@/data/qualification-staging/kanri-eiyoshi/round40-am.json";
import pm from "@/data/qualification-staging/kanri-eiyoshi/round40-pm.json";
import officialAnswers from "@/data/qualification-staging/kanri-eiyoshi/official-answers.json";
import manifest from "@/data/qualification-staging/kanri-eiyoshi/manifest.json";

// Independently transcribed from the official 第40回 正答表 (問1→問200).
const EXPECTED =
  "44355344555211234155254553344212152414524332254253233552215152532241153334525122155132542455244312452431333433554225351245213424541323341522332254511155541313442353342123222142322312244432443431311144";
const KEYS = ["ア", "イ", "ウ", "エ", "オ"] as const;
const DIR = "data/qualification-staging/kanri-eiyoshi";

interface Row {
  id: string; qNumber: number; session: string; question: string; choices: Record<string, string>;
  answer: string; officialAnswerNumber: number; explanation: string; choiceExplanations: Record<string, string>;
  publicAllowed: boolean; hasImage: boolean; imageUrls?: string[]; sharedContext?: string; sourceTextSha256: string;
}
const rows = [...am, ...pm] as Row[];

describe("kanri-eiyoshi staging (第40回, private)", () => {
  it("keeps all 200 questions in order (午前1-97, 午後98-200)", () => {
    expect(am).toHaveLength(97);
    expect(pm).toHaveLength(103);
    expect(rows.map(q => q.qNumber)).toEqual(Array.from({ length: 200 }, (_, i) => i + 1));
    expect(new Set(rows.map(q => q.id)).size).toBe(200);
    for (const q of rows) {
      const n = Object.keys(q.choices).length;
      expect([4, 5]).toContain(n);
      expect(Object.keys(q.choices)).toEqual(KEYS.slice(0, n));
      expect(q.session).toBe(q.qNumber <= 97 ? "am" : "pm");
    }
  });

  it("matches every official answer", () => {
    expect(rows.map(q => q.officialAnswerNumber).join("")).toBe(EXPECTED);
    expect(officialAnswers["40"].join("")).toBe(EXPECTED);
    for (const q of rows) expect(q.answer).toBe(KEYS[q.officialAnswerNumber - 1]);
  });

  it("explains every choice, pins source text and keeps figure pages", () => {
    for (const q of rows) {
      expect(q.publicAllowed).toBe(false);
      expect(q.explanation).toContain("公式正答");
      for (const k of Object.keys(q.choices)) expect(q.choiceExplanations[k]?.trim().length).toBeGreaterThan(5);
      const text = [q.sharedContext ?? "", q.question, ...Object.values(q.choices)].join("\n");
      expect(createHash("sha256").update(text).digest("hex")).toBe(q.sourceTextSha256);
      expect(q.hasImage).toBe(Boolean(q.imageUrls?.length));
      for (const u of q.imageUrls ?? []) expect(existsSync(`${DIR}/${u}`)).toBe(true);
      // Table/figure text layers must not leak into the last choice.
      for (const v of Object.values(q.choices)) expect(v).not.toMatch(/^表　|表　.{10,}$/);
    }
    for (const n of [3, 5, 18, 58, 66, 67, 138, 142, 158, 162, 171, 190]) {
      expect(rows[n - 1].hasImage, `q${n}`).toBe(true);
    }
  });

  it("records the excluded 第39回 and stays out of the public registry", () => {
    expect(manifest.excludedSittings.map(s => s.round)).toEqual([39]);
    expect(readFileSync("data/questions/index.ts", "utf8")).not.toContain("qualification-staging/kanri-eiyoshi");
  });
});
