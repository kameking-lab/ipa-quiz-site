import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { QuestionFigures } from "@/components/quiz/QuestionFigures";
import { KANGOSHI_QUESTIONS } from "@/data/questions/kangoshi";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import proof from "@/docs/evidence/nurse-afternoon-figure-go-20261010/INTEGRATION.json";

const canonical = (value: unknown): unknown => Array.isArray(value) ? value.map(canonical) : value && typeof value === "object" ? Object.fromEntries(Object.entries(value).sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0).map(([key, item]) => [key, canonical(item)])) : value;
const sha = (value: string | Buffer) => createHash("sha256").update(value).digest("hex");
const hash = (value: unknown) => sha(JSON.stringify(canonical(value)));
const byId = new Map(KANGOSHI_QUESTIONS.map(question => [question.id, question]));

describe("nursing PM original figures added after 416 originals", () => {
  it("retains all 416 previous question objects and adds exactly the two documented originals", () => {
    expect(proof.previous416ObjectHashes).toHaveLength(416);
    for (const old of proof.previous416ObjectHashes) expect(hash(byId.get(old.id)), old.id).toBe(old.sha256);
    expect(KANGOSHI_QUESTIONS).toHaveLength(427);
    expect(new Set(KANGOSHI_QUESTIONS.map(question => question.id)).size).toBe(427);
    expect(proof.figures.map(figure => figure.id).sort()).toEqual([
      "kangoshi-2024-annual-pm-q19", "kangoshi-2025-annual-pm-q58",
    ]);
    expect(byId.has("kangoshi-2025-annual-am-q32")).toBe(false);
    expect(byId.has("kangoshi-2025-annual-pm-q77")).toBe(false);
  });

  it("uses each official source stem, all four choices, official key and exact original figure bytes", () => {
    for (const figure of proof.figures) {
      const question = byId.get(figure.id)!;
      expect(hash(question), figure.id).toBe(figure.objectSha256);
      expect(question.year).toBe(figure.year);
      expect(question.session).toBe("pm");
      expect(question.qNumber).toBe(figure.qNumber);
      expect(question.question).toBe(figure.sourceStem);
      expect(Object.values(question.choices ?? {})).toEqual(figure.sourceChoices);
      expect(question.officialAnswerNumber).toBe(figure.officialKey[0]);
      expect(question.answer).toBe(Object.keys(question.choices ?? {})[Number(figure.officialKey[0]) - 1]);
      expect(Object.keys(question.choiceExplanations ?? {}).sort()).toEqual(Object.keys(question.choices ?? {}).sort());
      expect(question.imageUrls).toEqual(["/" + figure.assetPath.replace(/^public\//, "")]);
      expect(question.imageAltTexts).toEqual([figure.altText]);
      expect(question.sourcePdfUrl).toContain(`#page=${figure.sourcePdfPhysicalPage}`);
      expect(isPracticeReadyQuestion(question)).toBe(true);

      const asset = readFileSync(figure.assetPath);
      expect(sha(asset)).toBe(figure.assetSha256);
      expect(asset.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
      expect(asset.readUInt32BE(16)).toBeGreaterThan(390);
      const html = renderToStaticMarkup(<QuestionFigures question={question} />);
      const img = new DOMParser().parseFromString(html, "text/html").querySelector("img");
      expect(img?.getAttribute("src")).toBe(question.imageUrls?.[0]);
      expect(img?.getAttribute("alt")).toBe(figure.altText);
    }
  });
});
