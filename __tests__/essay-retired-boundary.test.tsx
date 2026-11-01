import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { ALL_ESSAY_QUESTIONS } from "@/data/questions/essay";
import { SC_PM2_QUESTIONS } from "@/data/essays/sc";
import * as singular from "@/lib/essay/load";
import * as plural from "@/lib/essays/load";
import EssayHome from "@/app/essay/page";
import EssaysHome from "@/app/essays/page";
import * as editor from "@/app/essay/[exam]/[questionId]/page";
import * as detail from "@/app/essays/[exam]/[yearSeason]/[section]/[qnum]/page";
import { getContentCounts } from "@/lib/stats/content-count";

vi.mock("next/navigation", () => ({ notFound: () => { throw new Error("NEXT_HTTP_ERROR_FALLBACK;404"); } }));
// Isolate unrelated morning content; the real essay barrels and loaders stay unmocked.
vi.mock("@/data/questions", () => ({ ALL_QUESTIONS: [{ exam: "sc" }], QUESTIONS_BY_EXAM: { sc: [{}] } }));
vi.mock("@/components/essay/EssayEditor", () => ({ EssayEditor: () => null }));
vi.mock("@/components/quiz/InlineBookHint", () => ({ InlineBookHint: () => null }));

const ids = ["st-2024a-pm2-q1", "st-2024a-pm2-q2", "st-2023a-pm2-q1", "sa-2024a-pm2-q1", "sa-2024a-pm2-q2", "pm-2024a-pm2-q1", "pm-2024a-pm2-q2", "pm-2023a-pm2-q1", "sm-2024a-pm2-q1", "sm-2024a-pm2-q2", "au-2024a-pm2-q1", "au-2024a-pm2-q2"];
describe("retired original essay supply (real public loaders)", () => {
  it("keeps both registrations empty and rejects all 15 old IDs", () => {
    expect(ALL_ESSAY_QUESTIONS).toEqual([]);
    expect(SC_PM2_QUESTIONS).toEqual([]);
    expect(singular.getAllEssayQuestions()).toEqual([]);
    for (const id of ids) expect(singular.findEssayQuestion(id)).toBeUndefined();
    for (const year of [2023, 2024, 2025]) expect(plural.findSCpm2Question(`sc-${year}h-pm2-q1`)).toBeUndefined();
    for (const exam of plural.ESSAY_EXAM_CODES) expect(plural.getEssayQuestionsByExam(exam)).toEqual([]);
  });
  it("counts zero essays without removing ordinary SC questions", () => {
    const counts = getContentCounts();
    expect(counts.essay).toBe(0);
    expect(counts.morning).toBe(1);
    expect(counts.byExam.find(row => row.exam === "sc")).toMatchObject({ morning: 1, essay: 0 });
  });
  it("renders truthful empty hubs with home and existing-history navigation", () => {
    const a = document.createElement("div");
    a.innerHTML = renderToStaticMarkup(EssayHome());
    expect(a.querySelector('[role="status"]')?.textContent).toContain("掲載できる論述問題はありません");
    expect(a.querySelector('a[href="/account/essay-history"]')).not.toBeNull();
    expect(a.querySelector('a[href="/"]')).not.toBeNull();
    expect(a.querySelector('script[type="application/ld+json"]')).toBeNull();
    expect(a.querySelector('a[href^="/essay/"]')).toBeNull();
    a.innerHTML = renderToStaticMarkup(EssaysHome());
    expect(a.querySelector('[role="status"]')?.textContent).toContain("掲載できる答案サンプルはありません");
    expect(a.querySelector('a[href^="/essays/"]')).toBeNull();
    expect(a.querySelector('a[href="/"]')).not.toBeNull();
  });
  it("prerenders no old detail and returns notFound before editor/sample rendering", async () => {
    expect(editor.generateStaticParams()).toEqual([]);
    expect(detail.generateStaticParams()).toEqual([]);
    expect(editor.dynamicParams).toBe(false);
    expect(detail.dynamicParams).toBe(false);
    for (const id of ids) await expect(editor.default({ params: Promise.resolve({ exam: id.slice(0, 2), questionId: id }) })).rejects.toThrow(";404");
    for (const year of [2023, 2024, 2025]) await expect(detail.default({ params: Promise.resolve({ exam: "sc", yearSeason: `${year}-spring`, section: "pm2", qnum: "q1" }) })).rejects.toThrow(";404");
  });
});
