import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it, vi } from "vitest";
import { BIYOSHI_CANDIDATES, BIYOSHI_QUESTIONS } from "@/data/questions/biyoshi";
import { ALL_QUESTIONS, QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam, getRegisteredExamCodes } from "@/lib/questions/get-questions";
import { ALL_EXAM_CODES, ALL_QUIZ_EXAM_CODES, getSafePdfUrl } from "@/lib/exam-config";
import { getQuestionsByExamStrict } from "@/lib/seo/exam-meta";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { choiceDisplayLabel } from "@/lib/questions/display";
import provenance from "@/docs/evidence/biyoshi-latest-two-20261011/PROVENANCE.json";
import corrections from "@/docs/evidence/biyoshi-latest-two-20261011/LOCAL-CORRECTIONS.json";
import assets from "@/docs/evidence/biyoshi-latest-two-20261011/IMAGE-CROPS.json";

const keys = ["ア", "イ", "ウ", "エ"] as const;
const canonical = (value: unknown): string => {
  if (Array.isArray(value)) return `[${value.map(canonical).join(",")}]`;
  if (value !== null && typeof value === "object") {
    const record = value as Record<string, unknown>;
    return `{${Object.keys(record).sort().map(k => `${JSON.stringify(k)}:${canonical(record[k])}`).join(",")}}`;
  }
  return JSON.stringify(value);
};
const hash = (v: unknown) => createHash("sha256").update(canonical(v)).digest("hex");

describe("美容師最新2回の保存原問", () => {
  it("has exactly 55 original numbers per official round and 440 explained choices", () => {
    expect(BIYOSHI_CANDIDATES).toHaveLength(110);
    expect(new Set(BIYOSHI_CANDIDATES.map(q => [q.exam, q.year, q.season, q.session, q.qNumber].join(":"))).size).toBe(110);
    for (const season of ["first", "second"] as const) {
      const paper = BIYOSHI_CANDIDATES.filter(q => q.season === season);
      expect(paper.map(q => q.qNumber)).toEqual(Array.from({ length: 55 }, (_, i) => i + 1));
      for (const q of paper) {
        const record = provenance.records.find(r => r.questionId === q.id)!;
        expect(Object.keys(q.choices ?? {})).toEqual(keys);
        expect(Object.keys(q.choiceExplanations ?? {})).toEqual(keys);
        for (const k of keys) {
          expect(q.choices?.[k]?.trim()).toBeTruthy();
          expect(q.choiceExplanations?.[k]?.trim()).toBeTruthy();
        }
        expect(q.requiredSelections).toBe(1);
        expect(q.officialAnswerNumber).toBe(record.officialAnswerNumber);
        expect(choiceDisplayLabel("biyoshi", q.answer as typeof keys[number])).toBe(record.officialAnswerNumber);
        expect(q.examDate).toBe(season === "first" ? "2026-03-01" : "2026-09-06");
        expect(q.lawReferenceDate).toBeUndefined();
        expect(questionSourceEdition(q)).toContain(season === "first" ? "第53回" : "第54回");
        expect(q.sourcePdfUrl).toContain(`#page=${record.physicalPage}`);
        expect(getSafePdfUrl(q.sourcePdfUrl)).toBe(q.sourcePdfUrl);
      }
    }
  });

  it("keeps every unapproved original out of direct, lazy, random and SEO pools", async () => {
    expect(BIYOSHI_QUESTIONS).toEqual([]);
    expect(QUESTIONS_BY_EXAM.biyoshi).toBeUndefined();
    expect(await getQuestionsForExam("biyoshi")).toEqual([]);
    expect(getQuestionsByExamStrict("biyoshi")).toEqual([]);
    expect(getRegisteredExamCodes()).not.toContain("biyoshi");
    expect(ALL_QUIZ_EXAM_CODES).not.toContain("biyoshi");
    expect(ALL_EXAM_CODES).not.toContain("biyoshi");
    expect(ALL_QUESTIONS.some(q => q.exam === "biyoshi")).toBe(false);
  });

  it("preserves unchanged saved objects and records each of thirteen local corrections", () => {
    expect(corrections.changes).toHaveLength(13);
    expect(corrections.changes.filter(c => c.beforeNeedsReview && !c.afterNeedsReview)).toHaveLength(10);
    for (const q of BIYOSHI_CANDIDATES) {
      const correction = corrections.changes.find(c => c.questionId === q.id);
      const prior = provenance.beforeImportedObjects.find(c => c.id === q.id)!;
      expect(hash(q)).toBe(correction?.afterObjectSha256 ?? prior.sha256);
      if (correction) expect(correction.beforeObjectSha256).toBe(prior.sha256);
    }
    expect(BIYOSHI_CANDIDATES.filter(q => q.needsReview).map(q => q.id)).toEqual(corrections.currentKnownHolds);
    expect(corrections.currentKnownHolds).toHaveLength(3);
    expect(BIYOSHI_CANDIDATES.find(q => q.id === corrections.retainedSessionStop)?.needsReview).toBe(true);
    const marked = BIYOSHI_CANDIDATES.find(q => q.id === corrections.retainedEmbeddedAnswerStop)!;
    expect(marked.needsReview).toBe(true);
    expect(marked.imageUrls).toBeUndefined();
  });

  it("corrects the return deadline to the applicable source and restores printed ruby", () => {
    const q = BIYOSHI_CANDIDATES.find(q => q.id === "biyoshi-2026-first-gakka-q2")!;
    expect(q.choiceExplanations?.エ).toContain("速やかに");
    const source = corrections.sources.find(s => s.date === "2026-03-01" && s.name === "biyoshi-rule")!;
    expect(source.articles.find(a => a.number === "7")?.text).toContain("速やかに");
    expect(q.needsReview).toBe(false);
    expect(BIYOSHI_CANDIDATES.find(q => q.id === "biyoshi-2026-second-gakka-q35")?.question).not.toContain("【皮膚科学】");
    expect(BIYOSHI_CANDIDATES.find(q => q.id === "biyoshi-2026-first-gakka-q55")?.choices?.ア).toContain("つむぎ");
  });

  it("keeps the three official figure crops byte-for-byte", () => {
    expect(assets.images).toHaveLength(3);
    for (const a of assets.images) {
      const bytes = readFileSync(join(process.cwd(), "public", a.url));
      expect(createHash("sha256").update(bytes).digest("hex")).toBe(a.sha256);
      expect(bytes.subarray(1, 4).toString()).toBe("PNG");
      expect(bytes.readUInt32BE(16)).toBe(a.size[0]);
      expect(bytes.readUInt32BE(20)).toBe(a.size[1]);
    }
  });

  it("still needs reviewed IDs after approval and rejects any unresolved original", async () => {
    vi.resetModules();
    const ready = BIYOSHI_CANDIDATES.find(q => !q.needsReview)!;
    const held = BIYOSHI_CANDIDATES.find(q => q.needsReview)!;
    vi.doMock("@/lib/qualifications/catalog", () => ({ isExamPublished: () => true }));
    vi.doMock("@/data/questions/biyoshi/release.json", () => ({ default: { approved: true, reviewedQuestionIds: [ready.id, held.id] } }));
    const { getReleasedBiyoshiQuestions } = await import("@/data/questions/biyoshi/publication");
    expect(getReleasedBiyoshiQuestions(BIYOSHI_CANDIDATES)).toEqual([ready]);
    vi.doUnmock("@/lib/qualifications/catalog");
    vi.doUnmock("@/data/questions/biyoshi/release.json");
    vi.resetModules();
  });
});
