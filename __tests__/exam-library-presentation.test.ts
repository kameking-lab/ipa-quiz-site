import { describe, expect, it } from "vitest";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { parseExamPaper } from "@/lib/exam-library-model";
import { parseExamPresentation } from "@/lib/exam-library-presentation";

const base = join(process.cwd(), "data", "exam-library");
const papers = readdirSync(join(base, "papers")).filter((name) => name.endsWith(".json"));
const read = (path: string): unknown => JSON.parse(readFileSync(path, "utf8"));

describe("safety text presentation", () => {
  it("has a complete source-matched transcription for every question and all five choices", () => {
    let count = 0;
    let choiceCount = 0;
    for (const name of papers) {
      const questions = parseExamPaper(read(join(base, "papers", name)), name.slice(0, -5));
      const overlay = read(join(base, "presentation", name));
      for (const question of questions) {
        const hash = createHash("sha256").update(question.text).digest("hex");
        const presentation = parseExamPresentation(overlay, question, hash);
        expect(presentation, question.id).not.toBeNull();
        expect(parseExamPresentation(overlay, question, "stale-source"), question.id).toBeNull();
        for (const figure of presentation!.figures) {
          expect(existsSync(join(process.cwd(), "public", figure.src)), figure.src).toBe(true);
          expect(question.images).not.toContain(figure.src);
        }
        count += 1;
        if (question.choiceCount === 5) choiceCount += 1;
      }
    }
    expect(count).toBe(1972);
    expect(choiceCount).toBe(1868);
  });

  it("preserves the deliberate wrong axis and wrong chemical structure in the official question", () => {
    const vibration = read(join(base, "presentation", "emkohyo-EM20261801.json")) as Record<string, { choices: { text: string }[] }>;
    expect(vibration["emkohyo-EM20261801-q12"]!.choices[1]!.text).toContain("aₓ²＋aₓ²＋a_z²");
    const chemistry = read(join(base, "presentation", "emkohyo-EM20251807.json")) as Record<string, { choices: { text: string }[] }>;
    expect(chemistry["emkohyo-EM20251807-q15"]!.choices[3]!.text).toContain("−O−C≡N");
  });
});
