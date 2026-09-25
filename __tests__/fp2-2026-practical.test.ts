import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import source from "@/data/questions/fp2/practical-2024-2025.json";
import figures from "@/data/questions/fp2/practical-figures-2024-2025.json";
import solutions from "@/data/questions/fp2/practical-explanations-2024-2025.json";
import manifest from "@/docs/evidence/fp2-2026-may-practical/manifest.json";
import coverage from "@/docs/evidence/fp2-2026-may-practical/review-coverage.json";
import { getPracticalEdition, practicalSourceUrls } from "@/lib/fp2/practical";

const edition = source["202605"];
const images = figures["202605"] as Record<string, Array<{ url: string; width: number; height: number }>>;
const explanations = solutions["202605"] as Record<string, {
  explanation: string;
  choiceExplanations: Record<string, string>;
  needsReview: boolean;
}>;

describe("FP2 2026 May official practical publication", () => {
  it("keeps 40 practical questions separate from the 60 academic questions", () => {
    expect(edition.questions.map((question) => question.number)).toEqual(Array.from({ length: 40 }, (_, index) => index + 1));
    expect(getPracticalEdition("202605")?.questions).toHaveLength(40);
    expect(practicalSourceUrls("202605")).toEqual({
      question: "https://www.jafp.or.jp/exam/mohan/files/j2_202605_q.pdf",
      answer: "https://www.jafp.or.jp/exam/mohan/files/j2_202605_a.pdf",
    });
    expect(edition.lawReferenceDate).toBe("公式問題に一律の記載なし");
    expect(manifest.questionCount).toBe(40);
    expect(manifest.answersFound).toBe(40);
    expect(manifest.question.sha256).toMatch(/^[a-f0-9]{64}$/);
    expect(manifest.answer.sha256).toMatch(/^[a-f0-9]{64}$/);
  });

  it("shows the actual 2026 source figures and accepted worked solutions", () => {
    expect(coverage.reviewed).toBe(40);
    expect(coverage.accepted).toBe(40);
    for (const question of edition.questions) {
      expect(question.body.trim().length).toBeGreaterThan(20);
      expect(question.modelAnswer.trim()).not.toBe("");
      const panels = images[String(question.number)];
      expect(panels).toBeDefined();
      for (const panel of panels) {
        expect(panel.width).toBeGreaterThan(100);
        expect(panel.height).toBeGreaterThan(50);
        expect(existsSync(join(process.cwd(), "public", panel.url.replace(/^\//, "")))).toBe(true);
      }
      const answer = explanations[String(question.number)];
      expect(answer.needsReview).toBe(false);
      expect(answer.explanation.length).toBeGreaterThan(30);
      if (/^[1-4]$/.test(question.modelAnswer)) {
        expect(Object.keys(answer.choiceExplanations)).toEqual(["1", "2", "3", "4"]);
      } else {
        expect(Object.keys(answer.choiceExplanations).length).toBeGreaterThan(0);
      }
    }
    expect(images["8"].map((panel) => panel.url)).toEqual(["/fp2/practical/202605/q08-complete-lot.webp"]);
    expect(images["38"].map((panel) => panel.url)).toEqual(["/fp2/practical/202605/q38-complete-calendar.webp"]);
    expect(edition.questions[37]?.body).not.toContain("\n\n2日\n(水)");
  });
});
