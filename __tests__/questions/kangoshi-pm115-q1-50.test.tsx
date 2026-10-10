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
const pm = KANGOSHI_QUESTIONS.filter(q => q.year === 2025 && q.session === "pm");
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
    for (const held of proof.heldIdsNotRegistered) expect(KANGOSHI_QUESTIONS.some(q => q.id === held)).toBe(false);
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
    expect(filtered.map(q => q.qNumber)).toEqual(readyNumbers);
    expect(filtered.some(q => q.type === "numeric")).toBe(false);
    const am = filterQuestions(KANGOSHI_QUESTIONS, { mode: "year", exam: "kangoshi", year: 2025, season: "annual", session: "am" });
    expect(am).toHaveLength(88);
    expect(am.some(q => q.id === "kangoshi-2025-annual-am-q90")).toBe(true);
    const html = renderToStaticMarkup(await YearPage({ params: Promise.resolve({ exam: "kangoshi", yearSeason: "2025-annual" }) }));
    const doc = new DOMParser().parseFromString(html, "text/html");
    const queries = [...doc.querySelectorAll('a[href^="/quiz?"]')].map(a => new URL(a.getAttribute("href")!, "https://www.kakomon-ai.jp").searchParams);
    const pmQuestions = queries.filter(q => q.get("session") === "pm" && q.has("question"));
    expect(pmQuestions.map(q => q.get("question")).sort()).toEqual(pm.map(q => q.id).sort());
    for (const session of ["am", "pm"]) {
      const query = queries.find(q => q.get("question") === `kangoshi-2025-annual-${session}-q2`);
      expect(query?.get("session")).toBe(session);
      expect(query?.get("returnTo")).toBe("/kangoshi/2025-annual");
    }
  });

  it("reports214 partial originals without advertising two complete sittings", () => {
    expect(KANGOSHI_QUESTIONS).toHaveLength(214);
    expect(getQuestionsByExamStrict("kangoshi")).toHaveLength(214);
    expect(KANGOSHI_QUESTIONS.filter(q => q.year === 2024)).toHaveLength(90);
    expect(KANGOSHI_QUESTIONS.filter(q => q.year === 2025)).toHaveLength(124);
    expect(KANGOSHI_QUESTIONS.reduce((n, q) => n + Object.keys(q.choices ?? {}).length, 0)).toBe(884);
    const catalog = getQualificationByExamCode("kangoshi")!;
    for (const text of [catalog.reuseSummary, EXAM_DESCRIPTIONS.kangoshi ?? "", examMetaDescription("kangoshi", 214)]) {
      expect(text).toContain("214原問");
      expect(text).toMatch(/午後.?14問/);
      expect(text).not.toMatch(/2回分完備|全240問|全問収録|全問対応/);
    }
    expect(EXAM_DESCRIPTIONS.kangoshi).toContain("午前88問・午後36問");
    expect(examMetaDescription("kangoshi", 124, "year")).toContain("124問");
    expect(catalog.remainingWork.join(" ")).toContain("第114回午後は未収録");
  });
});
