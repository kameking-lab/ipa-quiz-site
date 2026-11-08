// @vitest-environment node
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { describe, expect, it, vi } from "vitest";
vi.mock("server-only", () => ({}));
import { AUTOMOTIVE_PRIOR_SITTING_IDS, AUTOMOTIVE_QUESTIONS, getAutomotiveQuestions } from "@/data/questions/automotive";
import metadata from "@/data/questions/automotive/qualifications.json";
import prior from "@/data/questions/automotive/prior-sittings.json";
import reviewed from "@/data/questions/automotive/reviewed.json";
import official from "@/data/qualification-staging/automotive/prior-sittings/official-answers.json";
import manifest from "@/data/qualification-staging/automotive/prior-sittings/source-manifest.json";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import type { AutomotiveExamCode } from "@/lib/questions/types";

const STAGING = "data/qualification-staging/automotive/prior-sittings/review";
const SITTINGS: Record<string, string> = {
  "1-small-written": "jaspa-2024-second",
  "2-chassis": "jaspa-2024-second",
  "3-motorcycle": "jaspa-2024-second",
  electrical: "jaspa-2024-second",
  "2-motorcycle": "jaspa-2025-first",
};
const KANA = ["ア", "イ", "ウ", "エ"] as const;

describe("automotive previous sittings (W2)", () => {
  it("adds one complete official paper per subject without touching the recovered set", () => {
    const ids = new Set(prior.map((q) => q.id));
    expect(ids.size).toBe(prior.length);
    for (const q of reviewed) expect(ids.has(q.id), q.id).toBe(false);
    for (const [subject, table] of Object.entries(SITTINGS)) {
      const row = metadata.find((m) => m.subject === subject)!;
      const rows = prior.filter((q) => q.subject === subject);
      expect(rows.map((q) => q.qNumber), subject).toEqual(Array.from({ length: row.questionsPerPaper }, (_, i) => i + 1));
      expect(new Set(rows.map((q) => `jaspa-${q.fiscalYear}-${q.term}`)), subject).toEqual(new Set([table]));
      expect(new Set(rows.map((q) => q.category)), subject).toEqual(new Set(reviewed.filter((r) => r.subject === subject).map((r) => r.category)));
    }
    expect(prior.length).toBe(190);
  });

  it("matches the official answer sheet and keeps four original explanations per question", () => {
    const tables = official.tables as Record<string, Record<string, { answers: Array<{ qNumber: number; officialAnswerNumber: string; answer: string }> }>>;
    for (const q of prior) {
      const key = tables[`jaspa-${q.fiscalYear}-${q.term}`][q.subject].answers.find((a) => a.qNumber === q.qNumber)!;
      expect(q.answer, q.id).toBe(key.answer);
      expect(q.officialAnswerNumber, q.id).toBe(key.officialAnswerNumber);
      expect(q.answer, q.id).toBe(KANA[Number(q.officialAnswerNumber) - 1]);
      KANA.forEach((k, i) => {
        expect(q.choices[k].startsWith(`(${i + 1})`), `${q.id} ${k}`).toBe(true);
        expect(q.choiceExplanations[k].trim().length, `${q.id} ${k}`).toBeGreaterThan(0);
      });
      expect(q.explanation.trim().length, q.id).toBeGreaterThan(0);
    }
  });

  it("cites hashed official PDFs and binds page figures by content hash", () => {
    const bySha = new Map(manifest.rows.map((r) => [r.url, r.sha256]));
    for (const q of prior) {
      expect(bySha.has(q.sourcePdfUrl), q.id).toBe(true);
      expect(bySha.has(q.sourceAnswerUrl), q.id).toBe(true);
      for (const ref of q.sourcePageReferences) expect(ref.pdfSha256, q.id).toBe(bySha.get(q.sourcePdfUrl));
      const released = AUTOMOTIVE_QUESTIONS.find((r) => r.id === q.id)!;
      expect(isPracticeReadyQuestion(released), q.id).toBe(true);
      expect(released.question, q.id).toBe(q.question);
      if (q.sourceFigureRequired) expect(released.imageUrls?.length, q.id).toBeGreaterThan(0);
      else expect(released.imageUrls ?? [], q.id).toHaveLength(0);
      for (const url of released.imageUrls ?? []) {
        const bytes = fs.readFileSync(path.join(process.cwd(), "public", url));
        expect(createHash("sha256").update(bytes).digest("hex") + ".webp", q.id).toBe(path.basename(url));
      }
    }
  });

  it("is backed by an independent review that passed every question after fixes", () => {
    const files = fs.readdirSync(STAGING).filter((f) => /^review-.*\.json$/.test(f));
    const verdicts = new Map<string, string>();
    for (const file of files) {
      const review = JSON.parse(fs.readFileSync(path.join(STAGING, file), "utf8"));
      const subject = file.replace(/^review-/, "").replace(/(-[ab])?\.json$/, "");
      for (const row of review.rows) verdicts.set(`${subject}-q${String(row.qNumber).padStart(2, "0")}`, row.verdict);
    }
    const reReview = JSON.parse(fs.readFileSync(path.join(STAGING, "re-review-fixes.json"), "utf8"));
    for (const row of reReview.rows) expect(row.verdict, row.id).toBe("PASS");
    const reReviewed = new Set(reReview.rows.map((row: { id: string }) => row.id));
    for (const q of prior) {
      const key = `${q.subject}-q${String(q.qNumber).padStart(2, "0")}`;
      expect(verdicts.has(key), q.id).toBe(true);
      if (verdicts.get(key) !== "PASS") expect(reReviewed.has(q.id), q.id).toBe(true);
    }
  });

  it("serves the new sitting through the per-exam loader", () => {
    for (const subject of Object.keys(SITTINGS)) {
      const exam = `jidosha-${subject}` as AutomotiveExamCode;
      const questions = getAutomotiveQuestions(exam);
      expect(questions.filter((q) => AUTOMOTIVE_PRIOR_SITTING_IDS.has(q.id)).length, exam).toBe(prior.filter((q) => q.subject === subject).length);
      expect(new Set(questions.map((q) => `${q.year}-${q.season}`)).size, exam).toBe(2);
    }
  });
});
