import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn(), replace: vi.fn(), prefetch: vi.fn(), back: vi.fn() }) }));
import YearPage from "@/app/[exam]/[yearSeason]/page";
import { QuizPlayer } from "@/components/quiz/QuizPlayer";
import { KANGOSHI_QUESTIONS } from "@/data/questions/kangoshi";
import { isAcceptedAnswer, isCompleteSelectionCorrect } from "@/lib/questions/answers";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { isNumericAnswerCorrect, numericQuestionIssue } from "@/lib/questions/numeric";
import { createHistoryStore } from "@/lib/storage/history";
import { readLastQuestion } from "@/lib/storage/last-question";
import type { ChoiceKey, Question } from "@/lib/questions/types";

const receipt = JSON.parse(readFileSync(path.join(process.cwd(), "docs/evidence/nurse-am-q76-90-20261010/INTEGRATION.json"), "utf8")) as {
  addedIds: string[];
  previousObjectHashes: { id: string; sha256: string }[];
};
const added = KANGOSHI_QUESTIONS.filter(q => receipt.addedIds.includes(q.id));
const numeric = KANGOSHI_QUESTIONS.find(q => q.id === "kangoshi-2025-annual-am-q90")!;
function canonical(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonical);
  if (value !== null && typeof value === "object") return Object.fromEntries(Object.entries(value).sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0).map(([k, v]) => [k, canonical(v)]));
  return value;
}
function objectHash(question: Question): string {
  return createHash("sha256").update(JSON.stringify(canonical(question))).digest("hex");
}

beforeEach(() => {
  cleanup();
  localStorage.clear();
  vi.spyOn(window, "scrollTo").mockImplementation(() => {});
  Object.defineProperty(HTMLElement.prototype, "scrollTo", { configurable: true, value: vi.fn() });
  Object.defineProperty(HTMLElement.prototype, "scrollIntoView", { configurable: true, value: vi.fn() });
});

describe("saved nursing AM Q76–90 local registration", () => {
  it("preserves all 149 previous originals exactly and registers only the 29 ready originals", () => {
    expect(receipt.previousObjectHashes).toHaveLength(149);
    for (const previous of receipt.previousObjectHashes) {
      const actual = KANGOSHI_QUESTIONS.find(q => q.id === previous.id);
      expect(actual, previous.id).toBeDefined();
      expect(objectHash(actual!), previous.id).toBe(previous.sha256);
    }
    expect(added).toHaveLength(29);
    expect(added.filter(q => q.year === 2024)).toHaveLength(15);
    expect(added.filter(q => q.year === 2025)).toHaveLength(14);
    expect(added.reduce((n, q) => n + Object.keys(q.choices ?? {}).length, 0)).toBe(138);
    for (const id of ["kangoshi-2025-annual-am-q32", "kangoshi-2025-annual-am-q79"]) expect(KANGOSHI_QUESTIONS.some(q => q.id === id)).toBe(false);
  });

  it("keeps every choice explanation, source receipt and original answer-selection cardinality", () => {
    for (const q of added) {
      expect(q.id).toBe(`kangoshi-${q.year}-annual-am-q${q.qNumber}`);
      expect(q.sourcePdfUrl).toContain("mhlw.go.jp/");
      expect(q.sourceAnswerUrl).toContain("mhlw.go.jp/");
      expect(q.sourceAttribution).toContain(`午前 問${q.qNumber}`);
      expect(q.needsReview).toBe(false);
      expect(q.explanationCoverage).toBe("full");
      expect(isPracticeReadyQuestion(q)).toBe(true);
      if (q.type === "numeric") continue;
      expect(Object.keys(q.choiceExplanations ?? {}).sort()).toEqual(Object.keys(q.choices ?? {}).sort());
      for (const value of Object.values(q.choiceExplanations ?? {})) expect(value?.trim().length).toBeGreaterThan(0);
      if ((q.requiredSelections ?? 1) >= 2) {
        expect(Array.isArray(q.answer)).toBe(true);
        const expected = q.answer as ChoiceKey[];
        expect(isCompleteSelectionCorrect(expected, [...expected].reverse())).toBe(true);
        expect(isCompleteSelectionCorrect(expected, expected.slice(0, 1))).toBe(false);
      }
    }
    const alternative = added.find(q => q.id === "kangoshi-2025-annual-am-q80")!;
    expect(alternative.requiredSelections).toBe(1);
    expect(alternative.answer).toEqual(["エ", "オ"]);
    expect(isAcceptedAnswer(alternative.answer, "エ")).toBe(true);
    expect(isAcceptedAnswer(alternative.answer, "オ")).toBe(true);
    expect(isAcceptedAnswer(alternative.answer, "ウ")).toBe(false);
  });

  it("registers the original numeric form without choices and grades only strict whole integers", () => {
    expect(numeric.type).toBe("numeric");
    expect(numeric.answer).toBe("42");
    expect(numeric.numericAnswer).toEqual({ format: "integer", unit: "滴/分" });
    expect(numericQuestionIssue(numeric)).toBeUndefined();
    for (const key of ["choices", "choiceExplanations", "choiceImageUrls", "requiredSelections"]) expect(numeric).not.toHaveProperty(key);
    expect(isNumericAnswerCorrect(numeric, "　４２　")).toBe(true);
    expect(isNumericAnswerCorrect(numeric, "42foo")).toBe(false);
    expect(isNumericAnswerCorrect(numeric, "41.67")).toBe(false);
    expect(isNumericAnswerCorrect(numeric, "")).toBe(false);
  });

  it("opens Q90 from its real year list as an unanswered quiz with the correct return target", async () => {
    const html = renderToStaticMarkup(await YearPage({ params: Promise.resolve({ exam: "kangoshi", yearSeason: "2025-annual" }) }));
    const doc = new DOMParser().parseFromString(html, "text/html");
    const link = [...doc.querySelectorAll('a[href^="/quiz?"]')].find(a => new URL(a.getAttribute("href")!, "https://www.kakomon-ai.jp").searchParams.get("question") === numeric.id);
    expect(link).toBeDefined();
    const query = new URL(link!.getAttribute("href")!, "https://www.kakomon-ai.jp").searchParams;
    expect(Object.fromEntries(query)).toMatchObject({ mode: "year", exam: "kangoshi", year: "2025", season: "annual", session: "am", question: numeric.id, returnTo: "/kangoshi/2025-annual" });
    expect(doc.body.textContent).not.toContain("42滴/分");
  });

  it("grades the registered Q90 once on Enter and stores its real id and return position", () => {
    const onNext = vi.fn();
    render(<QuizPlayer question={numeric} index={0} total={2} mode="year" onNext={onNext} />);
    const input = screen.getByRole("textbox", { name: "解答（滴/分）" });
    expect(input).toHaveValue("");
    expect(screen.queryByRole("radiogroup")).toBeNull();
    expect(screen.queryByRole("region", { name: "正解の解説" })).toBeNull();
    fireEvent.change(input, { target: { value: "４２" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(screen.getByRole("region", { name: "正解の解説" })).toHaveTextContent(numeric.explanation);
    expect(createHistoryStore().getAllEntries()).toMatchObject([{ id: numeric.id, selected: "42", correct: true }]);
    expect(readLastQuestion()).toMatchObject({ exam: "kangoshi", year: 2025, session: "am", qNumber: 90 });
    expect(onNext).not.toHaveBeenCalled();
  });
});
