import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  DOJO_OSEN_STAGING, DOJO_OSEN_STAGED_QUESTIONS as rows,
  DojoOsenQuestionSchema, scoreDojoOsenStagedQuestion, validateDojoOsenStaging,
} from "@/data/qualification-staging/dojo-osen";
import manifest from "@/data/qualification-staging/dojo-osen/source-manifest.json";
import { QUALIFICATION_CATALOG } from "@/lib/qualifications/catalog";
import { ALL_QUESTIONS } from "@/data/questions";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { getHomeDirectory } from "@/lib/home/home-directory";

// Independently transcribed from each official answer sheet; Q30 is blank, not choice 5.
const keys = {
  "2024-am": [5,1,4,4,2,5,3,4,4,4,2,3,2,5,4,2,5,2,4,4,4,1,5,3,2,4,2,1,4,2,3,4,3,2,4],
  "2024-pm": [2,2,3,5,4,3,4,3,2,2,1,2,1,3,3,4,3,3,2,5,2,2,5,3,2,3,1,3,3,3,2,1,2,4,3,2,3,1,4,1,5,5,3,3,3],
  "2025-am": [3,2,1,3,5,5,2,4,3,2,4,2,2,5,2,3,3,2,4,4,4,3,5,4,3,3,2,4,5,null,1,1,4,4,5],
  "2025-pm": [5,2,3,4,2,3,4,3,5,3,4,4,1,5,1,2,4,3,2,2,3,3,2,4,3,5,4,2,4,5,5,2,3,3,5,2,2,3,5,1,3,2,3,5,2],
};
const hash = (path: string) => createHash("sha256").update(readFileSync(path)).digest("hex");

describe("dojo-osen latest two complete official editions, private staging", () => {
  it.each(Object.entries(keys))("retains every official final answer for %s", (edition, answers) => {
    const questions = rows.filter(q => `${q.year}-${q.session}` === edition);
    expect(questions).toHaveLength(answers.length);
    expect(questions.map(q => q.qNumber)).toEqual(answers.map((_, i) => i + 1));
    expect(questions.map(q => q.officialAnswerNumber)).toEqual(answers);
    for (const q of questions) {
      expect(q.scoring.correctChoice).toBe(answers[q.qNumber - 1]);
      for (const selected of [null, 1, 2, 3, 4, 5]) {
        expect(scoreDojoOsenStagedQuestion(q, selected)).toBe(q.scoring.kind === "all-correct" || selected === answers[q.qNumber - 1]);
      }
    }
  });

  it("has all original questions, choices, explanations and category boundaries", () => {
    expect(validateDojoOsenStaging()).toBe(160);
    for (const year of [2024, 2025]) {
      const questions = rows.filter(q => q.year === year);
      expect(questions).toHaveLength(80);
      expect(questions.filter(q => q.category === "調査")).toHaveLength(35);
      expect(questions.filter(q => q.category === "対策")).toHaveLength(25);
      expect(questions.filter(q => q.category === "法令等")).toHaveLength(20);
    }
    for (const q of rows) {
      expect(q.publicAllowed).toBe(false);
      expect(q.choices).toHaveLength(5);
      expect(q.choices.every(c => c.trim())).toBe(true);
      expect(q.choiceExplanations).toHaveLength(5);
      expect(new Set(q.choiceExplanations).size).toBe(5);
      for (const text of q.choiceExplanations) {
        expect(text.trim().length).toBeGreaterThanOrEqual(20);
        expect(text).not.toMatch(/TODO|要確認|解説準備中|公式正答のため正しい/);
      }
      expect(q.sourceAttribution).toContain(`問${q.qNumber}`);
      expect(q.lawReferenceDate).toBe(`${q.year}-09-01`);
    }
  });

  it("retains and authenticates every diagram/table/continuation region", () => {
    expect(manifest.documents).toHaveLength(6);
    expect(manifest.documents.every(d => d.httpStatus === 200)).toBe(true);
    expect(manifest.unavailablePdfUrls).toEqual([]);
    const used = rows.flatMap(q => [...q.sourceImages]);
    expect(used).toHaveLength(169);
    expect(new Set(used).size).toBe(169);
    expect([...used].sort()).toEqual(manifest.assets.map(a => a.path).sort());
    for (const asset of manifest.assets) {
      expect(hash(asset.path)).toBe(asset.sha256);
      const document = manifest.documents.find(d => d.url === asset.pdfUrl)!;
      expect(asset.pdfSha256).toBe(document.sha256);
      expect(asset.pdfPage).toBeLessThanOrEqual(document.pdfPages);
      expect(asset.clipRectPoints[0]).toBe(0); // no cropped-away right-side legend
      expect(asset.clipRectPoints[2]).toBeGreaterThan(590);
      expect(readFileSync(asset.path).subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
    }
    expect(manifest.referenceImages).toHaveLength(6);
    expect(manifest.referenceImages.filter(a => a.purpose === "official-answer-sheet")).toHaveLength(2);
    for (const reference of manifest.referenceImages) {
      expect(hash(reference.path)).toBe(reference.sha256);
      expect(manifest.documents.find(d => d.url === reference.pdfUrl)?.sha256).toBe(reference.pdfSha256);
    }
    for (const q of rows) {
      expect(q.sourcePdfPages).toEqual(q.sourceImages.map(path => manifest.assets.find(a => a.path === path)!.pdfPage));
      expect(q.sourceImages.every(path => manifest.assets.find(a => a.path === path)!.pdfUrl === q.sourcePdfUrl)).toBe(true);
    }
    expect(rows.find(q => q.id === "dojo-osen-2025-am-q14")?.sourceImages).toHaveLength(2);
    expect(rows.find(q => q.id === "dojo-osen-2025-am-q31")?.sourceImages).toHaveLength(2);
    expect(rows.find(q => q.id === "dojo-osen-2024-am-q3")?.sourceImages).toHaveLength(2);
    expect(rows.find(q => q.id === "dojo-osen-2024-am-q31")?.sourceImages).toHaveLength(2);
  });

  it("preserves Q30's original options and all-correct official correction", () => {
    const q = rows.find(q => q.id === "dojo-osen-2025-am-q30")!;
    expect(q.scoring.kind).toBe("all-correct");
    expect(q.officialAnswerNumber).toBeNull();
    expect(q.originalText).toContain("5.5ｍ 4.5ｍ 7.5ｍ");
    expect(q.explanation).toContain("5.0・6.0・6.0m");
    expect(rows.filter(q => q.scoring.kind === "all-correct")).toHaveLength(1);
    expect(DojoOsenQuestionSchema.safeParse({ ...q, scoring: { kind: "single-choice", correctChoice: 2 }, officialAnswerNumber: 2 }).success).toBe(false);
  });

  it("keeps the reconciled diagram arithmetic and distinction between recorder and custodian", () => {
    const q14 = rows.find(q => q.id === "dojo-osen-2025-am-q14")!;
    expect(q14.explanation).toContain("0.09mg/L");
    expect(q14.explanation).toContain("0.090mg/L");
    const q28 = rows.find(q => q.id === "dojo-osen-2025-am-q28")!;
    for (const count of ["12区画", "10区画", "33区画", "21区画"]) expect(q28.explanation).toContain(count);
    const record = rows.find(q => q.id === "dojo-osen-2024-pm-q33")!;
    expect(record.choiceExplanations[1]).toContain("5年間保存するのは土地の所有者等");
    const notification = rows.find(q => q.id === "dojo-osen-2025-am-q8")!;
    expect(notification.officialAnswerNumber).toBe(4);
    expect(notification.choiceExplanations[3]).toContain("通知先は土地所有者等ではなく調査実施者");
    expect(notification.choiceExplanations[3]).not.toContain("条件付きの説明が不適当");
  });

  it("excludes the entire corpus and assets from public registries and navigation", () => {
    expect(DOJO_OSEN_STAGING.publicAllowed).toBe(false);
    expect(DOJO_OSEN_STAGING.sourceImagesAreCanonical).toBe(true);
    const catalog = QUALIFICATION_CATALOG.filter(q => q.slug === "dojo-osen");
    expect(catalog).toHaveLength(1);
    expect(catalog[0].status).toBe("terms-review-required");
    expect(catalog[0].examCode).toBeUndefined();
    expect("dojo-osen" in EXAM_CONFIGS).toBe(false);
    expect(ALL_QUESTIONS.some(q => q.id.startsWith("dojo-osen-"))).toBe(false);
    const cards = getHomeDirectory().flatMap(d => [...d.featured, ...d.compact]);
    expect(cards.some(c => c.href.includes("dojo-osen"))).toBe(false);
    expect(existsSync("public/questions/dojo-osen")).toBe(false);
    expect(existsSync("app/dojo-osen")).toBe(false);
  });
});
