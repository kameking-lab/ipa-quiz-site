import followup from "@/docs/evidence/nurse-latest-two-followup-20261011/INTEGRATION.json";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { QuestionFigures } from "@/components/quiz/QuestionFigures";
import { KANGOSHI_QUESTIONS } from "@/data/questions/kangoshi";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import proof from "@/docs/evidence/nurse-original-pm-figures-20261010/INTEGRATION.json";

const canonical = (value: unknown): unknown => Array.isArray(value) ? value.map(canonical) : value && typeof value === "object" ? Object.fromEntries(Object.entries(value).sort(([a],[b]) => a.localeCompare(b)).map(([key, v]) => [key,canonical(v)])) : value;
const sha = (value: string | Buffer) => createHash("sha256").update(value).digest("hex");

describe("original nursing PM figures", () => {
  it("keeps every previous279 object and the exact two new original ids", () => {
    expect(proof.previous279ObjectHashes).toHaveLength(279);
    for (const old of proof.previous279ObjectHashes) {
      const current = KANGOSHI_QUESTIONS.find(q => q.id === old.id);
      expect(current, old.id).toBeDefined();
      expect(sha(JSON.stringify(canonical(current))),old.id).toBe(old.sha256);
    }
    expect(proof.addedIds.slice().sort()).toEqual(["kangoshi-2025-annual-pm-q20","kangoshi-2025-annual-pm-q28"]);
    expect(new Set(KANGOSHI_QUESTIONS.map(q => q.id)).size).toBe(KANGOSHI_QUESTIONS.length);
    expect(KANGOSHI_QUESTIONS.some(q => q.id === "kangoshi-2025-annual-am-q32")).toBe(false);
    expect(KANGOSHI_QUESTIONS.some(q => q.id === "kangoshi-2025-annual-pm-q7")).toBe(followup.addedIds.includes("kangoshi-2025-annual-pm-q7"));
  });

  it("renders the original assets with accessible figure content and unchanged official keys", () => {
    for (const figure of proof.figures) {
      const q = KANGOSHI_QUESTIONS.find(q => q.id === figure.id)!;
      expect(isPracticeReadyQuestion(q)).toBe(true);
      expect(q.imageUrls).toEqual(["/"+figure.assetPath.replace(/^public\//, "")]);
      expect(q.imageAltTexts).toEqual([figure.altText]);
      expect(sha(readFileSync(figure.assetPath))).toBe(figure.assetSha256);
      const html = renderToStaticMarkup(<QuestionFigures question={q} />);
      const doc = new DOMParser().parseFromString(html, "text/html");
      const img = doc.querySelector("img")!;
      expect(img.getAttribute("src")).toBe(q.imageUrls?.[0]);
      expect(img.getAttribute("alt")).toBe(figure.altText);
      expect(img.getAttribute("loading")).toBe("lazy");
      expect(q.answer).toBe(q.qNumber === 20 ? "ウ" : "エ");
      expect(Object.keys(q.choiceExplanations ?? {})).toEqual(Object.keys(q.choices ?? {}));
      expect(q.sourcePdfUrl).toContain(`#page=${figure.sourcePdfPhysicalPage}`);
    }
  });

  it("keeps an alt text aligned to the original image index when empty URLs are skipped", () => {
    const q = KANGOSHI_QUESTIONS.find(q => q.id === proof.addedIds[0])!;
    const html = renderToStaticMarkup(<QuestionFigures question={{...q,imageUrls:["",q.imageUrls![0]!],imageAltTexts:["skip","original second entry"]}} />);
    const doc = new DOMParser().parseFromString(html, "text/html");
    expect(doc.querySelectorAll("img")).toHaveLength(1);
    expect(doc.querySelector("img")?.getAttribute("alt")).toBe("original second entry");
  });

  it("retains the existing generic alt fallback for older figure questions", () => {
    const q = KANGOSHI_QUESTIONS.find(q => q.id === proof.addedIds[0])!;
    const html = renderToStaticMarkup(<QuestionFigures question={{...q,imageAltTexts:undefined}} />);
    const doc = new DOMParser().parseFromString(html, "text/html");
    expect(doc.querySelector("img")?.getAttribute("alt")).toBe(`問${q.qNumber}の図表1`);
  });
});
