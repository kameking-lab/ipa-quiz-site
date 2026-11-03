import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import drafts from "@/data/questions/khk-kagaku/staging-drafts.json";
import keys from "@/data/questions/khk-kagaku/official-answer-keys.json";
import manifest from "@/data/exam-library/source-packs/khk-kagaku/manifest.json";
import { QUALIFICATION_CATALOG } from "@/lib/qualifications/catalog";
import { QUESTIONS_BY_EXAM } from "@/data/questions";

const root = resolve(process.cwd(), "data/exam-library/source-packs/khk-kagaku");
const codes = ["AX", "AY", "BX", "BY", "BZ", "CX", "CY", "CZ", "DX", "DY", "DZ"];

describe("KHK chemistry source staging", () => {
  it("retains the 24 original papers, two answer keys, and two descriptive answer examples", () => {
    expect(manifest.sources).toHaveLength(28);
    expect(manifest.missingPdfUrls).toEqual([]);
    for (const source of manifest.sources) {
      const pdf = readFileSync(resolve(root, source.file));
      expect(pdf.subarray(0, 5).toString()).toBe("%PDF-");
      expect(pdf.length).toBe(source.bytes);
      expect(createHash("sha256").update(pdf).digest("hex")).toBe(source.sha256);
      expect(source.url).toMatch(/^https:\/\/www\.khk\.or\.jp\/Portals\/0\/khk\/exam\//);
    }
  });

  it("retains 422 original-question drafts with consecutive numbers and both source URLs", () => {
    expect(drafts.papers).toHaveLength(24);
    expect(drafts.papers.reduce((count, paper) => count + paper.questions.length, 0)).toBe(422);
    for (const year of [2024, 2025]) {
      const papers = drafts.papers.filter((paper) => paper.year === year);
      expect(papers.map((paper) => paper.expectedQuestions)).toEqual([20, 15, 6, 20, 15, 15, 20, 20, 20, 20, 20, 20]);
      for (const paper of papers) {
        expect(paper.questions.map((q) => q.number)).toEqual(Array.from({ length: paper.expectedQuestions }, (_, i) => i + 1));
        for (const q of paper.questions) {
          expect(q.rawExtractedText.length).toBeGreaterThan(30);
          expect(q.sourcePdfUrl).toBe(paper.sourcePdfUrl);
          expect(q.sourceAnswerUrl).toMatch(/^https:\/\/www\.khk\.or\.jp\//);
          expect(q.transcriptionVerified).toBe(false);
          expect(q.explanationWritten).toBe(false);
          expect(q.figuresVerified).toBe(false);
        }
        if (paper.code.endsWith("X")) {
          expect(paper.lawReferenceDate).toBe(`${year}-04-01`);
          for (const q of paper.questions.filter((q) => q.number >= 8)) {
            expect("sharedPassagesDraft" in q ? q.sharedPassagesDraft?.length : 0).toBeGreaterThan(0);
          }
        }
      }
    }
  });

  it("matches all 410 answer numbers to the stored transcription of each official answer PDF", () => {
    let checked = 0;
    for (const year of [2024, 2025]) {
      const text = readFileSync(resolve(root, `text/R${year - 2018}fy_kaitou.txt`), "utf8");
      const rows = text.split("\n").filter((line) => /(?:法令|保安|学識)\s+[1-5]\s+/.test(line));
      for (const [i, code] of codes.entries()) {
        const official = [...rows[i].matchAll(/(?<!\S)[1-5](?!\S)/g)].map((match) => Number(match[0]));
        const paper = drafts.papers.find((p) => p.year === year && p.code === code)!;
        const retained = keys[`${year}-${code}` as keyof typeof keys];
        expect(retained).toEqual(official);
        expect(paper.questions.map((q) => "officialAnswerNumber" in q ? q.officialAnswerNumber : undefined)).toEqual(official);
        expect(paper.questions.every((q) => "choicesDraft" in q && q.choicesDraft?.length === 5)).toBe(true);
        checked += official.length;
      }
    }
    expect(checked).toBe(410);
  });

  it("keeps unfinished source drafts out of published qualifications and practice questions", () => {
    expect(drafts.status).toBe("source-draft-only");
    const entry = QUALIFICATION_CATALOG.find((q) => q.slug === "khk-kagaku");
    expect(entry?.status).toBe("ready-to-ingest");
    expect(entry?.examCode).toBeUndefined();
    expect(entry?.remainingWork.length).toBeGreaterThan(0);
    expect(Object.values(QUESTIONS_BY_EXAM).flat().some((q) => q.id.startsWith("khk-kagaku-"))).toBe(false);
  });
});
