import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import YearPage from "@/app/[exam]/[yearSeason]/page";
import { KANGOSHI_QUESTIONS } from "@/data/questions/kangoshi";
import { filterQuestions, isPracticeReadyQuestion } from "@/lib/questions/filter";
import { EXAM_DESCRIPTIONS, examMetaDescription, getQuestionsByExamStrict } from "@/lib/seo/exam-meta";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";

const proof = JSON.parse(readFileSync(path.join(process.cwd(), "docs/evidence/nurse-pm115-q1-50-20261010/INTEGRATION.json"), "utf8")) as {
  addedIds: string[]; heldIdsNotRegistered: string[]; previousObjectHashes: { id: string; sha256: string }[];
};
const pm = KANGOSHI_QUESTIONS.filter(q => proof.addedIds.includes(q.id));
const readyNumbers = [2, 4, 6, 8, 9, 10, 11, 12, 13, 14, 16, 17, 18, 19, 23, 24, 25, 26, 27, 29, 30, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 46, 47, 49, 50];
function canonical(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonical);
  if (value !== null && typeof value === "object") return Object.fromEntries(Object.entries(value).sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0).map(([k, v]) => [k, canonical(v)]));
  return value;
}

describe("saved 115th afternoon Q1–50 registration", () => {
  it("preserves previous178 and excludes every held original, including unverified figures", () => {
    expect(proof.previousObjectHashes).toHaveLength(178);
    for (const previous of proof.previousObjectHashes) {
      const q = KANGOSHI_QUESTIONS.find(q => q.id === previous.id);
      expect(q, previous.id).toBeDefined();
      expect(createHash("sha256").update(JSON.stringify(canonical(q))).digest("hex"), previous.id).toBe(previous.sha256);
    }
    expect(pm.map(q => q.qNumber).sort((a, b) => a - b)).toEqual(readyNumbers);
    expect(proof.heldIdsNotRegistered).toHaveLength(14);
    expect(proof.heldIdsNotRegistered).toContain("kangoshi-2025-annual-pm-q20");
    expect(proof.heldIdsNotRegistered).toContain("kangoshi-2025-annual-pm-q28");
    for (const held of proof.heldIdsNotRegistered.filter(id => ![1,3,5,15,20,21,22,28,31,32,44,45,48].some(n => id === `kangoshi-2025-annual-pm-q${n}`))) expect(KANGOSHI_QUESTIONS.some(q => q.id === held)).toBe(false);
  });

  it("retains all146 choice reasons and matching official keys in the original PM numbering", () => {
    expect(pm.reduce((n, q) => n + Object.keys(q.choices ?? {}).length, 0)).toBe(146);
    for (const q of pm) {
      expect(q.id).toBe(`kangoshi-2025-annual-pm-q${q.qNumber}`);
      expect(q.sourceAttribution).toContain(`午後 問${q.qNumber}`);
      expect(q.sourcePdfUrl).toMatch(/tp260424-05c_01\.pdf#page=\d+$/);
      expect(q.answer).toBe(["ア", "イ", "ウ", "エ", "オ"][Number(q.officialAnswerNumber) - 1]);
      expect(Object.keys(q.choiceExplanations ?? {}).sort()).toEqual(Object.keys(q.choices ?? {}).sort());
      for (const explanation of Object.values(q.choiceExplanations ?? {})) expect(explanation?.trim().length).toBeGreaterThan(0);
      expect(q.hasImage).toBe(false);
      expect(isPracticeReadyQuestion(q)).toBe(true);
    }
  });

  it("keeps AM/PM pools and same-number year links distinct", async () => {
    const filtered = filterQuestions(KANGOSHI_QUESTIONS, { mode: "year", exam: "kangoshi", year: 2025, season: "annual", session: "pm", inOrder: true });
    expect(filtered.every(q => q.session === "pm")).toBe(true);
    expect(filtered.filter(q => proof.addedIds.includes(q.id)).map(q => q.qNumber)).toEqual(readyNumbers);
    expect(filtered.some(q => q.type === "numeric")).toBe(false);
    const am = filterQuestions(KANGOSHI_QUESTIONS, { mode: "year", exam: "kangoshi", year: 2025, season: "annual", session: "am" });
    expect(am.filter(q => q.qNumber <= 90)).toHaveLength(88);
    expect(am.some(q => q.id === "kangoshi-2025-annual-am-q90")).toBe(true);
    const html = renderToStaticMarkup(await YearPage({ params: Promise.resolve({ exam: "kangoshi", yearSeason: "2025-annual" }) }));
    const doc = new DOMParser().parseFromString(html, "text/html");
    const queries = [...doc.querySelectorAll('a[href^="/quiz?"]')].map(a => new URL(a.getAttribute("href")!, "https://www.kakomon-ai.jp").searchParams);
    const pmQuestions = queries.filter(q => q.get("session") === "pm" && proof.addedIds.includes(q.get("question") ?? ""));
    expect(pmQuestions.map(q => q.get("question")).sort()).toEqual(pm.map(q => q.id).sort());
    for (const session of ["am", "pm"]) {
      const query = queries.find(q => q.get("question") === `kangoshi-2025-annual-${session}-q2`);
      expect(query?.get("session")).toBe(session);
      expect(query?.get("returnTo")).toBe("/kangoshi/2025-annual");
    }
  });

  it("reports the current partial originals without advertising two complete sittings", () => {
    const total = KANGOSHI_QUESTIONS.length;
    expect(new Set(KANGOSHI_QUESTIONS.map(q => q.id)).size).toBe(total);
    expect(getQuestionsByExamStrict("kangoshi")).toHaveLength(total);
    expect(KANGOSHI_QUESTIONS.filter(q => q.year === 2024 && q.session === "am" && q.qNumber <= 90)).toHaveLength(90);
    expect(KANGOSHI_QUESTIONS.filter(q => q.year === 2025 && q.session === "am" && q.qNumber <= 90)).toHaveLength(88);
    expect(KANGOSHI_QUESTIONS.filter(q => q.year === 2025 && q.session === "pm")).toHaveLength(116);
    expect(KANGOSHI_QUESTIONS.filter(q => q.year === 2024 && q.session === "pm")).toHaveLength(116);
    const choiceCount = KANGOSHI_QUESTIONS.reduce((n, q) => n + Object.keys(q.choices ?? {}).length, 0);
    const catalog = getQualificationByExamCode("kangoshi")!;
    for (const text of [catalog.reuseSummary, EXAM_DESCRIPTIONS.kangoshi ?? "", examMetaDescription("kangoshi", total)]) {
      expect(text).toContain(`${total}原問`);
      expect(text).toMatch(/未収録/);
      expect(text).not.toMatch(/2回分完備|全240問|全問収録|全問対応/);
    }
    expect(EXAM_DESCRIPTIONS.kangoshi).toContain(`午前${KANGOSHI_QUESTIONS.filter(q => q.year === 2025 && q.session === "am").length}問・午後${KANGOSHI_QUESTIONS.filter(q => q.year === 2025 && q.session === "pm").length}問`);
    expect(EXAM_DESCRIPTIONS.kangoshi).toContain(`${choiceCount}肢`);
    const yearCount = KANGOSHI_QUESTIONS.filter(q => q.year === 2025).length;
    expect(examMetaDescription("kangoshi", yearCount, "year")).toContain(`${yearCount}問`);
    expect(catalog.remainingWork.join(" ")).toContain("未収録");
  });
});
