import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { QuestionFigures } from "@/components/quiz/QuestionFigures";
import { YAKUZAISHI_QUESTIONS } from "@/data/questions/yakuzaishi";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import proof from "@/docs/evidence/pharmacy-latest-two-required-figures-manifest.json";

const expected = [
  [2025, 1, "ウ"], [2025, 3, "オ"], [2025, 8, "オ"], [2025, 9, "エ"], [2025, 12, "オ"], [2025, 15, "イ"],
  [2026, 3, "ア"], [2026, 5, "エ"], [2026, 8, "ウ"], [2026, 9, "ウ"],
] as const;

describe("pharmacist required originals with fixed figures", () => {
  it("loads all ten original numbers with the fixed official answers and complete explanations", () => {
    expect(proof.acceptedOriginals).toBe(10);
    expect(proof.originalPixelCrops).toBe(8);
    for (const [year, number, answer] of expected) {
      const id = `yakuzaishi-${year}-annual-required-q${number}`;
      const matches = YAKUZAISHI_QUESTIONS.filter(q => q.id === id);
      expect(matches, id).toHaveLength(1);
      const q = matches[0]!;
      expect(isPracticeReadyQuestion(q), id).toBe(true);
      expect(q.answer, id).toBe(answer);
      expect(Object.keys(q.choiceExplanations ?? {}).sort(), id).toEqual(Object.keys(q.choices ?? {}).sort());
      expect(q.explanationCoverage).toBe("full");
      expect(q.needsReview).toBe(false);
    }
  });

  it("renders each immutable original crop with its source-aligned neutral alt text", () => {
    const figures = proof.questions.filter(r => r.crop);
    expect(figures).toHaveLength(8);
    for (const row of figures) {
      const crop = row.crop!;
      const q = YAKUZAISHI_QUESTIONS.find(q => q.id === row.id)!;
      const url = "/" + crop.path.replace(/^public\//, "");
      expect(q.imageUrls).toEqual([url]);
      expect(createHash("sha256").update(readFileSync(crop.path)).digest("hex")).toBe(crop.sha256);
      const html = renderToStaticMarkup(<QuestionFigures question={q} />);
      const doc = new DOMParser().parseFromString(html, "text/html");
      expect(doc.querySelectorAll("img")).toHaveLength(1);
      expect(doc.querySelector("img")?.getAttribute("src")).toBe(url);
      expect(doc.querySelector("img")?.getAttribute("alt")).toBe(q.imageAltTexts![0]);
      expect(q.imageAltTexts![0]).not.toMatch(/正解|正しい|右下がり|最も|尿酸|ニトロ/);
      expect(q.sourcePdfUrl).toContain(`#page=${row.sourcePhysicalPage}`);
      expect(crop.pixelEqualToSourceCrop).toBe(true);
    }
  });
});
