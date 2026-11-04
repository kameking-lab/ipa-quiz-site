import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it, vi } from "vitest";
import { KUKAKU_SEIRI_STAGING as staging, scoreKukakuSeiriStagedQuestion } from "@/data/qualification-staging/kukaku-seiri";
import officialKeys from "@/data/qualification-staging/kukaku-seiri/official-answers.json";
import manifest from "@/data/qualification-staging/kukaku-seiri/source-manifest.json";
import audit from "@/reports/cq7-20261104/original-audit.json";
import { validateKukakuSeiri } from "@/scripts/validate-kukaku-seiri";
import { ALL_QUESTIONS } from "@/data/questions";
import { ALL_QUIZ_EXAM_CODES } from "@/lib/exam-config";
import { QUALIFICATION_CATALOG } from "@/lib/qualifications/catalog";
import { getHomeDirectory } from "@/lib/home/home-directory";

// Independently transcribed from the red-number rows of both official tables.
const EXPECTED_2026 = [3,4,4,3,4,1,3,2,1,2,3,1,4,4,3,3,1,1,4,2,3,4,2,4,2,2,2,4,2,2,1,2,3,3,2,3,3,4,1,3];
const EXPECTED_2025 = [4,3,4,3,1,1,3,4,2,4,2,4,3,1,2,3,2,4,3,3,4,2,2,1,3,3,3,2,4,1,1,2,4,4,3,1,4,4,2,3];
const hash = (path: string) => createHash("sha256").update(readFileSync(path)).digest("hex");
const question = (n: number) => staging.questions[n - 1];

describe("CQ7 土地区画整理士・未公開の部分収録", () => {
  it("validates acquired originals, official answers, all choices, and every source image", () => {
    const log = vi.spyOn(console, "log").mockImplementation(() => {});
    try {
      expect(validateKukakuSeiri(["kukaku-seiri"])).toBe(40);
      expect(validateKukakuSeiri(["ap"])).toBe(0);
    } finally { log.mockRestore(); }
  });

  it("fixes both official tables and scores each printed choice independently", () => {
    expect(officialKeys["2026"].answers).toEqual(EXPECTED_2026);
    expect(officialKeys["2025"].answers).toEqual(EXPECTED_2025);
    expect(staging.questions.map(q => q.officialAnswerNumber)).toEqual(EXPECTED_2026);
    for (const q of staging.questions) {
      for (const selected of [null, 0, 1, 2, 3, 4, 5, 1.5, NaN]) {
        expect(scoreKukakuSeiriStagedQuestion(q, selected)).toBe(selected === EXPECTED_2026[q.qNumber - 1]);
      }
    }
  });

  it("reports 2025 as missing originals rather than claiming 80-question completion", () => {
    expect(manifest.expectedQuestionCount).toBe(80);
    expect(manifest.ingestedQuestionCount).toBe(40);
    expect(staging.twoRoundComplete).toBe(false);
    expect(staging.questions.every(q => q.year === 2026)).toBe(true);
    expect(manifest.latestExamRounds[1]).toMatchObject({ year: 2025, ingestedQuestions: 0, status: "answer-only-question-unavailable" });
    expect(manifest.requests.find(r => r.url.endsWith("20250908t_mondaia.pdf"))?.status).toBe(404);
    expect(existsSync("data/qualification-staging/kukaku-seiri/2025-annual.json")).toBe(false);
  });

  it("keeps the independent PDF text/character/answer audit tied to the reviewed snapshot", () => {
    expect(audit.status).toBe("PASS");
    expect(audit.errors).toEqual([]);
    expect(hash("data/qualification-staging/kukaku-seiri/2026-annual.json")).toBe(audit.questionsSha256);
    expect(hash("data/qualification-staging/kukaku-seiri/assets.json")).toBe(audit.assetsManifestSha256);
    expect(audit.independentTextMatchedQuestions).toEqual(Array.from({ length: 40 }, (_, i) => i + 1).filter(n => n !== 24));
    expect(audit.sourceCharactersCoveredByImages).toBeGreaterThan(11000);
    expect(audit.officialAnswerAudits.map(a => a.count)).toEqual([40, 40]);
  });

  it("preserves the formula and the table headers without mixing statement and answer labels", () => {
    expect(question(24).question).toContain("V＝R×（A/ℓ の修正奥行百分率）×修正係数×A");
    expect(question(24).question).toContain("＠＝V/A");
    expect(question(24).choices).toEqual({ ア: "台形地", イ: "袋地", ウ: "三角地", エ: "不整形地" });
    expect(question(24).sourceImages).toContain("assets/2026-q24.png");
    expect(question(15).question).toContain("（イ）");
    expect(question(15).question).toContain("（ロ）");
    expect(question(15).answer).toBe("ウ");
    expect(question(15).choices.ウ.replace(/\s+/g, "")).toBe("誤正");
    expect(question(15).choiceExplanations.ウ).toContain("総指数");
    expect(question(17).question).toContain("（ハ）");
    expect(question(17).choices.ア).toContain("街区別換地対照表");
    expect(question(22).choices.エ).toContain("（イ）標準画地");
    expect(question(25).choices.イ).toContain("（ニ）");
  });

  it("retains shared exclusions, 160 individual rationales, source attribution and unknown law date", () => {
    expect(staging.questions.flatMap(q => Object.values(q.choiceExplanations))).toHaveLength(160);
    for (const q of staging.questions) {
      expect(q.sharedContext).toContain("第136条の3");
      expect(q.sharedContext).toContain("第32条");
      expect(q.lawReferenceDate).toBeNull();
      expect(q.needsReview).toBe(true);
      expect(q.publicAllowed).toBe(false);
      expect(q.explanationReferences.length).toBeGreaterThan(0);
    }
    expect(question(3).choiceExplanations.エ).toContain("地積要件");
    expect(question(19).choiceExplanations.エ).toContain("縦覧期間内");
    expect(question(35).choiceExplanations.イ).toContain("都道府県知事又は市町村長");
    expect(question(39).choiceExplanations.ア).toContain("棄却");
  });

  it("points to the independently verified 50ha and public-facility provisions", () => {
    expect(question(1).explanationReferences).toContainEqual({
      url: "https://laws.e-gov.go.jp/law/344CO0000000158",
      locator: "第10条第1号（大規模な土地区画整理事業）",
    });
    expect(question(12).explanationReferences).toContainEqual({
      url: "https://laws.e-gov.go.jp/law/330CO0000000047",
      locator: "第67条（公共施設）",
    });
  });

  it("excludes the corpus from public question pools, exam codes, routes, and home navigation", () => {
    const entry = QUALIFICATION_CATALOG.find(q => q.slug === "kukaku-seiri")!;
    expect(entry.status).toBe("live");
    expect(entry.examCode).toBe("kukaku-seiri");
    expect(entry.administrator).toBe("一般財団法人全国建設研修センター");
    expect(entry.reuseSummary).toContain("2026年度のみ");
    expect(ALL_QUESTIONS.some(q => (q.exam as string) === "kukaku-seiri" || q.id.startsWith("kukaku-seiri-"))).toBe(true);
    expect(ALL_QUIZ_EXAM_CODES as readonly string[]).toContain("kukaku-seiri");
    expect(getHomeDirectory().flatMap(g => [...g.featured, ...g.compact]).some(c => c.href.includes("kukaku-seiri"))).toBe(true);
    for (const path of ["app/kukaku-seiri", "public/questions/kukaku-seiri"]) expect(existsSync(path)).toBe(false);
  });

  it.each([
    ["answer", "ア", "公式正答不一致"],
    ["publicAllowed", true, "公開状態"],
    ["question", "原文の一部を削った問題文として改変されたもの。", "原文の欠落"],
    ["sharedContext", "", "共通指示欠落"],
  ])("rejects corrupted %s", (field, value, message) => {
    const q = question(1) as unknown as Record<string, unknown>;
    const previous = q[field];
    q[field] = value;
    try { expect(() => validateKukakuSeiri()).toThrow(String(message)); }
    finally { q[field] = previous; }
  });
});
