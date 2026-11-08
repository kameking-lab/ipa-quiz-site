import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import y2026 from "@/data/qualification-staging/sogo-ryoko/2026.json";
import y2025 from "@/data/qualification-staging/sogo-ryoko/2025.json";
import manifest from "@/data/qualification-staging/sogo-ryoko/manifest.json";

// Independently transcribed from the two official 正解表 (a→ア … d→エ), in question order.
const EXPECTED = {
  2026: {
    hoki: "a c d b d b b b a c bcd ad bc ac abcd bcd bd abd c abcd abc abc cd ac abd",
    yakkan: "a c b d b c a a bcd ab ac ab bcd abcd ab abc ab a ab a b b b a a b a a a b",
  },
  2025: {
    hoki: "a c d b d b c c a a abcd abc ad bd abcd bc cd ab abcd abd abcd bd abcd bc abc",
    yakkan: "d b c c d a a c a b d b abcd abd bcd abc abd ac bd abc b a a b a a b a b a",
  },
} as const;
const KEY = { a: "ア", b: "イ", c: "ウ", d: "エ" } as const;

interface Row {
  id: string; year: number; session: "hoki" | "yakkan"; qNumber: number; sharedContext: string; question: string;
  choices: Record<string, string>; answer: string[]; requiredSelections: number; scoring: string; points: number;
  explanation: string; choiceExplanations: Record<string, string>; publicAllowed: boolean; hasImage: boolean;
  imageUrls?: string[]; sourceTextSha256: string;
}
const years = { 2026: y2026 as Row[], 2025: y2025 as Row[] };

describe("sogo-ryoko staging (旅行業法令・約款 2026/2025, private)", () => {
  it("keeps 25 法令 + 30 約款 questions per year", () => {
    for (const rows of Object.values(years)) {
      expect(rows.filter(q => q.session === "hoki").map(q => q.qNumber)).toEqual(Array.from({ length: 25 }, (_, i) => i + 1));
      expect(rows.filter(q => q.session === "yakkan").map(q => q.qNumber)).toEqual(Array.from({ length: 30 }, (_, i) => i + 1));
      expect(new Set(rows.map(q => q.id)).size).toBe(55);
    }
  });

  it("matches every official answer, including select-all sets", () => {
    for (const y of [2026, 2025] as const) {
      for (const s of ["hoki", "yakkan"] as const) {
        const rows = years[y].filter(q => q.session === s);
        const expected = EXPECTED[y][s].split(" ").map(a => [...a].map(c => KEY[c as keyof typeof KEY]));
        expect(rows.map(q => q.answer)).toEqual(expected);
        for (const q of rows) {
          expect(q.requiredSelections).toBe(q.answer.length);
          if (q.answer.length > 1) expect(q.scoring).toBe("all-selected-exactly");
        }
        expect(rows.reduce((n, q) => n + q.points, 0)).toBe(s === "hoki" ? 100 : 100);
      }
    }
  });

  it("explains every choice, pins source text and stays unpublished", () => {
    for (const rows of Object.values(years)) {
      for (const q of rows) {
        expect(q.publicAllowed).toBe(false);
        expect(q.explanation).toContain("公式正答");
        for (const k of Object.keys(q.choices)) expect(q.choiceExplanations[k]?.trim().length).toBeGreaterThan(5);
        const text = [q.sharedContext, q.question, ...Object.values(q.choices)].join("\n");
        expect(createHash("sha256").update(text).digest("hex")).toBe(q.sourceTextSha256);
        if (q.scoring === "true-false") expect(q.choices).toEqual({ ア: "正しい", イ: "誤っている" });
        for (const u of q.imageUrls ?? []) expect(existsSync(`data/qualification-staging/sogo-ryoko/${u}`)).toBe(true);
      }
    }
    const table = years[2025].find(q => q.id === "sogo-ryoko-2025-yakkan-q10")!;
    expect(table.question).toContain("7 日以上　90 日未満｜10 万円｜5 万円");
    expect(table.hasImage).toBe(true);
  });

  it("records the untranscribed 実務 subjects and stays out of the public registry", () => {
    expect(Object.keys(manifest.notYetIncluded)).toEqual(["kokunai", "kaigai"]);
    expect(readFileSync("data/questions/index.ts", "utf8")).not.toContain("qualification-staging/sogo-ryoko");
  });
});
