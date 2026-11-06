import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import round33 from "@/data/qualification-staging/career-consultant/round33.json";
import round32 from "@/data/qualification-staging/career-consultant/round32.json";
import officialAnswers from "@/data/qualification-staging/career-consultant/official-answers.json";
import manifest from "@/data/qualification-staging/career-consultant/manifest.json";

// Independently transcribed from the two official 正答表 (問1→問50).
const EXPECTED = {
  33: "41321143123142324314211432143134311231224411324144",
  32: "22243244213244242324341344331444442431113232323331",
} as const;
const KEYS = ["ア", "イ", "ウ", "エ"] as const;
const rounds = { 33: round33, 32: round32 } as const;

describe("career-consultant staging (学科 第33回・第32回, private)", () => {
  it("keeps 50 four-choice questions per sitting with unique ids", () => {
    const ids = new Set<string>();
    for (const [rnd, rows] of Object.entries(rounds)) {
      expect(rows).toHaveLength(50);
      rows.forEach((q, i) => {
        expect(q.qNumber).toBe(i + 1);
        expect(q.id).toBe(`career-consultant-2026-r${rnd}-q${i + 1}`);
        expect(Object.keys(q.choices)).toEqual([...KEYS]);
        expect(q.question.length).toBeGreaterThan(10);
        ids.add(q.id);
      });
    }
    expect(ids.size).toBe(100);
  });

  it("matches every official answer", () => {
    for (const rnd of [33, 32] as const) {
      const rows = rounds[rnd];
      expect(rows.map(q => q.officialAnswerNumber).join("")).toBe(EXPECTED[rnd]);
      expect(officialAnswers[String(rnd) as "33" | "32"].join("")).toBe(EXPECTED[rnd]);
      for (const q of rows) expect(q.answer).toBe(KEYS[q.officialAnswerNumber - 1]);
    }
  });

  it("has an original explanation for every choice and stays unpublished", () => {
    for (const rows of Object.values(rounds)) {
      for (const q of rows) {
        expect(q.publicAllowed).toBe(false);
        expect(q.publicationStatus).toBe("staging");
        expect(q.explanationCoverage).toBe("full");
        expect(q.explanation).toContain("公式正答");
        for (const k of KEYS) expect((q.choiceExplanations as Record<string, string>)[k]?.trim().length).toBeGreaterThan(5);
        expect(q.sourcePdfUrl).toMatch(/^https:\/\/www\.career-shiken\.org\//);
        expect(q.sourceAnswerUrl).toMatch(/^https:\/\/www\.career-shiken\.org\//);
        const text = [q.question, ...Object.values(q.choices)].join("\n");
        expect(createHash("sha256").update(text).digest("hex")).toBe(q.sourceTextSha256);
      }
    }
  });

  it("is not wired into the public question registry", () => {
    expect(manifest.publicAllowed).toBe(false);
    expect(readFileSync("data/questions/index.ts", "utf8")).not.toContain("qualification-staging/career-consultant");
  });
});
