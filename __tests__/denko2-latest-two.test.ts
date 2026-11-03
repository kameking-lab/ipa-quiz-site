import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { QuestionCard } from "@/components/quiz/QuestionCard";
import { ChoiceButton } from "@/components/quiz/ChoiceButton";
import { DENKO2_2026_QUESTIONS, DENKO2_QUESTIONS } from "@/data/questions/denko2";
import { filterQuestions, isPracticeReadyQuestion } from "@/lib/questions/filter";
import rows from "@/docs/evidence/denko2-20260524/20260524-official-rows.json";
import previousRows from "@/docs/evidence/denko2-20260524/20251026-official-rows.json";
import manifest from "@/docs/evidence/denko2-20260524/manifest.json";
import authorProof from "@/docs/evidence/denko2-20260524/author-provenance.json";

const keys = ["ア", "イ", "ウ", "エ"] as const;
const officialMap: Record<string, string> = { イ: "ア", ロ: "イ", ハ: "ウ", ニ: "エ" };
describe("第二種電気工事士の最新2回", () => {
  it("keeps 50 unique questions and all four explanations in the full 2026 draft", () => {
    expect(DENKO2_2026_QUESTIONS.map((q) => q.qNumber)).toEqual(Array.from({ length: 50 }, (_, i) => i + 1));
    expect(new Set(DENKO2_2026_QUESTIONS.map((q) => q.id)).size).toBe(50);
    for (const q of DENKO2_2026_QUESTIONS) {
      const row = rows.rows.find((item) => item.number === q.qNumber)!;
      expect(q.answer, q.id).toBe(officialMap[row.officialAnswer]);
      expect(Object.keys(q.choices!), q.id).toEqual(keys);
      expect(Object.keys(q.choiceExplanations!), q.id).toEqual(keys);
      expect(Object.values(q.choices!).every((v) => typeof v === "string" && v.trim().length > 0)).toBe(true);
      expect(Object.values(q.choiceExplanations!).every((v) => typeof v === "string" && v.trim().length > 0)).toBe(true);
      expect(q.explanation.trim().length, q.id).toBeGreaterThan(20);
    }
  });
  it("reuses the already registered 2025 lower sitting without duplicating it", () => {
    const registered = DENKO2_QUESTIONS.filter((q) => q.year === 2025 && q.season === "second");
    expect(registered).toHaveLength(50);
    for (const row of previousRows.rows) {
      expect(registered.find((q) => q.qNumber === row.number)?.answer).toBe(officialMap[row.officialAnswer]);
    }
    expect(new Set(DENKO2_QUESTIONS.map((q) => q.id)).size).toBe(DENKO2_QUESTIONS.length);
  });
  it("makes all 50 source-checked questions available after resolving the Q47 photo count", () => {
    expect(DENKO2_QUESTIONS).toHaveLength(250);
    expect(DENKO2_2026_QUESTIONS.filter((q) => q.needsReview)).toHaveLength(0);
    expect(DENKO2_2026_QUESTIONS.filter(isPracticeReadyQuestion)).toHaveLength(50);
    expect(filterQuestions(DENKO2_QUESTIONS, { mode: "year", exam: "denko2", year: 2026, season: "first", session: "gakka" })).toHaveLength(50);
    expect(manifest.independentlyAccepted2026).toBe(0);
    expect(manifest.rightsReceipt).toBeNull();
    expect(manifest.isolatedReviewQuestionNumbers).toEqual([]);
  });
  it("pins every original row and figure crop to its saved bytes", () => {
    const canonicalCandidate = readFileSync(resolve("data/questions/denko2/drafts/20260524.json"), "utf8").replace(/\r\n/g, "\n");
    expect(createHash("sha256").update(canonicalCandidate).digest("hex")).toBe(manifest.candidateUTF8NormalizedNewlinesSha256);
    for (const [path, expected] of Object.entries(manifest.assets)) {
      expect(existsSync(resolve(path)), path).toBe(true);
      expect(createHash("sha256").update(readFileSync(resolve(path))).digest("hex"), path).toBe(expected);
    }
    for (const q of DENKO2_2026_QUESTIONS) {
      for (const path of [...(q.imageUrls ?? []), ...Object.values(q.choiceImageUrls ?? {})]) {
        if (path) expect(existsSync(resolve(path.startsWith("/") ? `public${path}` : path)), path).toBe(true);
      }
    }
  });
  it("shows original photographs and all shared circuit conditions", () => {
    for (const q of DENKO2_2026_QUESTIONS.filter((q) => q.qNumber >= 31)) {
      expect(q.imageUrls).toHaveLength(3);
      expect(q.imageAltTexts).toHaveLength(3);
    }
    for (const number of [27, 35, 37, ...Array.from({ length: 10 }, (_, i) => i + 41)]) {
      expect(Object.keys(DENKO2_2026_QUESTIONS.find((q) => q.qNumber === number)!.choiceImageUrls!)).toEqual(keys);
    }
  });
  it("maps answer references without renaming original circuit designations", () => {
    expect(DENKO2_2026_QUESTIONS.find((q) => q.qNumber === 13)!.explanation).toContain("誤りはエ");
    expect(DENKO2_2026_QUESTIONS.find((q) => q.qNumber === 50)!.explanation).toContain("ウは表示灯を内蔵した3路");
    expect(DENKO2_2026_QUESTIONS.find((q) => q.qNumber === 50)!.explanation).toContain("ハの照明");
  });
  it("renders the shared wiring, conditions and four original Q47 photos in the existing player components", () => {
    const q = DENKO2_2026_QUESTIONS.find((item) => item.qNumber === 47)!;
    const html = renderToStaticMarkup(createElement("div", {},
      createElement(QuestionCard, { question: q }),
      ...keys.map((key) => createElement(ChoiceButton, {
        key, choiceKey: key, text: q.choices![key]!,
        imageUrl: q.choiceImageUrls![key], revealed: false,
        selected: false, correct: false, disabled: false, onClick: () => {},
      })),
    ));
    const doc = new DOMParser().parseFromString(html, "text/html");
    expect(doc.querySelectorAll("figure img")).toHaveLength(3);
    expect(doc.querySelectorAll('button[role="radio"] img')).toHaveLength(4);
    expect(doc.body.textContent).not.toContain("正解");
    expect(doc.body.textContent).toContain("刻印は「○」が3個、「小」が1個");
  });
  it("records actual first-party Opus authorship for the 35 newly produced questions", () => {
    const complete = authorProof.filter((proof) => proof.terminalReason === "completed" && !proof.resultIsError);
    expect(complete).toHaveLength(7);
    expect(complete.flatMap((proof) => proof.scope).sort((a, b) => a - b)).toEqual(Array.from({ length: 35 }, (_, i) => i + 16));
    for (const proof of complete) {
      expect(proof.actualInitModel).toBe("claude-opus-5-5");
      expect(proof.modelUsageKeys).toEqual(["claude-opus-5-5"]);
      expect(proof.authCategories).toEqual({ loggedIn: true, authMethod: "claude.ai", apiProvider: "firstParty" });
    }
  });
});
