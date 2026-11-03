import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import drafts from "@/data/questions/khk-kagaku/staging-drafts.json";
import keys from "@/data/questions/khk-kagaku/official-answer-keys.json";
import manifest from "@/data/exam-library/source-packs/khk-kagaku/manifest.json";
import review from "@/data/questions/khk-kagaku/review-progress.json";
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
          const reviewed = review.reviewedPapers.some((record) => record.year === year && record.code === paper.code && record.questions.some((item) => item.number === q.number));
          expect(q.transcriptionVerified).toBe(reviewed);
          expect(q.explanationWritten).toBe(false);
          expect(q.figuresVerified).toBe(reviewed);
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

  it("retains reviewed content digests, shared-table crops, and the exact unfinished counts", () => {
    const questions = drafts.papers.flatMap<(typeof drafts.papers)[number]["questions"][number]>((paper) => paper.questions);
    expect(questions.filter((q) => q.transcriptionVerified)).toHaveLength(review.counts.transcriptionVerified);
    expect(questions.filter((q) => !q.transcriptionVerified)).toHaveLength(review.counts.unreviewed);
    expect(questions.filter((q) => q.explanationWritten)).toHaveLength(0);
    expect(review.counts.originalQuestions).toBe(422);
    expect(review.counts.descriptiveAnswersVerified).toBe(0);
    for (const record of review.reviewedPapers) {
      const paper = drafts.papers.find((p) => p.year === record.year && p.code === record.code)!;
      expect(paper.sourceSha256).toBe(record.sourceSha256);
      expect(record.questions).toHaveLength(paper.expectedQuestions);
      for (const item of record.questions) {
        const q = paper.questions.find((question) => question.number === item.number)!;
        const fields = q as unknown as Record<string, unknown>;
        const content = review.contentDigestFields.map((field) => fields[field]);
        expect(createHash("sha256").update(JSON.stringify(content)).digest("hex")).toBe(item.contentSha256);
        expect(fields.lawInstructionsDraft).toContain(`令和${paper.year - 2018}年4月1日`);
        expect(fields.hasImage).toBe(q.number >= 8);
        const assets = fields.imageAssets as string[];
        expect(assets).toHaveLength(q.number >= 8 ? 1 : 0);
        if (q.number >= 8) {
          expect(fields.sharedPassagePdfPages).toEqual([q.number <= 12 ? 4 : 6]);
          expect(assets.every((file) => review.assets.some((asset) => asset.file === file))).toBe(true);
        }
      }
    }
    for (const asset of review.assets) {
      const png = readFileSync(resolve(root, asset.file));
      expect(png.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
      expect(createHash("sha256").update(png).digest("hex")).toBe(asset.sha256);
      expect(manifest.sources.some((s) => s.url === asset.sourcePdfUrl && s.sha256 === asset.sourceSha256)).toBe(true);
    }
    expect(questions.flatMap((q) => "choicesDraft" in q ? q.choicesDraft : []).some((choice) => /R[67]-[A-D][XYZ]/.test(choice))).toBe(false);
    const byQualification = drafts.papers.reduce<Record<string, number>>((counts, paper) => {
      counts[paper.qualification] = (counts[paper.qualification] ?? 0) + paper.questions.length;
      return counts;
    }, {});
    expect(byQualification).toEqual({ "甲種化学": 82, "乙種化学": 100, "丙種化学（液石）": 120, "丙種化学（特別）": 120 });
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
