import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import drafts from "@/data/questions/khk-kagaku/staging-drafts.json";
import keys from "@/data/questions/khk-kagaku/official-answer-keys.json";
import manifest from "@/data/exam-library/source-packs/khk-kagaku/manifest.json";
import review from "@/data/questions/khk-kagaku/review-progress.json";
import descriptiveAnswers from "@/data/questions/khk-kagaku/official-descriptive-answer-review.json";
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
          const explanationWritten = review.explanationReviews.some((record) => record.year === year && record.code === paper.code && record.number === q.number);
          expect(q.explanationWritten).toBe(explanationWritten);
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
    expect(questions.filter((q) => q.explanationWritten)).toHaveLength(30);
    expect(review.counts.originalQuestions).toBe(422);
    expect(review.counts.descriptiveAnswersVerified).toBe(12);
    for (const record of review.reviewedPapers) {
      const paper = drafts.papers.find((p) => p.year === record.year && p.code === record.code)!;
      expect(paper.sourceSha256).toBe(record.sourceSha256);
      expect(record.questions).toHaveLength(paper.expectedQuestions);
      for (const item of record.questions) {
        const q = paper.questions.find((question) => question.number === item.number)!;
        const fields = q as unknown as Record<string, unknown>;
        const content = review.contentDigestFields.map((field) => fields[field]);
        expect(createHash("sha256").update(JSON.stringify(content)).digest("hex")).toBe(item.contentSha256);
        if (paper.code.endsWith("X")) {
          expect(fields.lawInstructionsDraft).toContain(`令和${paper.year - 2018}年4月1日`);
        }
        const hasSharedTable = ["AX", "BX", "CX", "DX"].includes(paper.code) && q.number >= 8;
        const hasDescriptiveFigure = paper.code === "AZ" && (
          (paper.year === 2024 && [2, 3, 4].includes(q.number)) ||
          (paper.year === 2025 && q.number === 4)
        );
        const hasOtsuTable = paper.code === "BZ" && (q.number === 6 || (paper.year === 2025 && q.number === 13));
        const hasLpgFigure = paper.code === "CZ" && ((paper.year === 2024 && q.number === 11) || (paper.year === 2025 && q.number === 15));
        const hasSpecialFigure = (paper.code === "DY" && paper.year === 2025 && [2, 12, 16].includes(q.number)) ||
          (paper.code === "DZ" && (paper.year === 2024 ? [3, 13, 17] : [6, 13]).includes(q.number));
        const needsImage = hasSharedTable || hasDescriptiveFigure || hasOtsuTable || hasLpgFigure || hasSpecialFigure;
        expect(fields.hasImage).toBe(needsImage);
        const assets = fields.imageAssets as string[];
        expect(assets).toHaveLength(needsImage ? 1 : 0);
        expect(assets.every((file) => review.assets.some((asset) => asset.file === file))).toBe(true);
        if (hasSharedTable) {
          const page = paper.code === "CX" ? (q.number <= 16 ? 4 : 7) : paper.code === "DX" ? (q.number <= 9 ? 4 : 5) : (q.number <= 12 ? 4 : 6);
          expect(fields.sharedPassagePdfPages).toEqual([page]);
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

  it("retains the 100 reviewed Otsu originals, equation typography, tables and booklet conditions", () => {
    const otsu = drafts.papers.filter((p) => ["BX", "BY", "BZ"].includes(p.code));
    expect(otsu.flatMap<(typeof drafts.papers)[number]["questions"][number]>((p) => p.questions).filter((q) => q.transcriptionVerified)).toHaveLength(100);
    expect(review.counts.transcriptionVerified).toBe(422);
    expect(review.counts.unreviewed).toBe(0);
    expect(review.assets).toHaveLength(36);
    const get = (year: number, code: string, number: number) =>
      drafts.papers.find((p) => p.year === year && p.code === code)!.questions[number - 1] as unknown as Record<string, unknown>;
    expect(get(2024, "BX", 17).pdfPages).toEqual([7]);
    expect(get(2024, "BX", 18).questionDraft).not.toMatch(/\bB\b/);
    expect(get(2024, "BY", 15).pdfPages).toEqual([6]);
    for (const year of [2024, 2025]) {
      expect(get(year, "BZ", 15).pdfPages).toEqual([year === 2024 ? 5 : 6]);
      expect(get(year, "BZ", 6).questionDraft).toContain("| 選択肢 | a | b | c | d |");
      expect(get(year, "BZ", 6).questionDraft).toContain("→");
      expect(get(year, "BZ", 7).questionDraft).toContain("K_c");
      expect((get(year, "BZ", 1).sharedPassagesDraft as string[]).join()).toContain("絶対圧力");
    }
    expect(get(2024, "BZ", 1).questionDraft).toContain("kg･m³･s⁻²");
    expect(get(2025, "BZ", 2).questionDraft).toContain("28.0×10⁻³ kg/mol");
    expect(get(2025, "BZ", 13).questionDraft).toContain("| 水（g） | −242 |");
    expect(get(2024, "BZ", 5).questionDraft).toContain("同一の反応であれば、用いる触媒や反応条件により変わらない。");
  });

  it("retains all 12 checked official descriptive examples as original full-page images", () => {
    expect(descriptiveAnswers.publicAllowed).toBe(false);
    expect(descriptiveAnswers.entries).toHaveLength(12);
    expect(descriptiveAnswers.assets).toHaveLength(13);
    for (const year of [2024, 2025]) {
      expect(descriptiveAnswers.entries.filter((entry) => entry.year === year).map((entry) => entry.number)).toEqual([1, 2, 3, 4, 5, 6]);
    }
    for (const entry of descriptiveAnswers.entries) {
      const { contentSha256, ...content } = entry;
      expect(createHash("sha256").update(JSON.stringify(content)).digest("hex")).toBe(contentSha256);
      const q = drafts.papers.find((paper) => paper.year === entry.year && paper.code === "AZ")!.questions[entry.number - 1] as unknown as Record<string, unknown>;
      expect(q.sourceAnswerUrl).toBe(entry.sourceAnswerUrl);
      expect(q.officialAnswerExampleVerified).toBe(true);
      expect(q.officialAnswerExampleReviewId).toBe(`${entry.year}-AZ-${entry.number}`);
      expect(q.explanationWritten).toBe(false);
      expect(entry.imageAssets).toHaveLength(entry.answerPdfPages.length);
      expect(entry.reviewNotes.length).toBeGreaterThan(0);
      expect(entry.officialAnswerExampleVerified).toBe(true);
      for (const [index, file] of entry.imageAssets.entries()) {
        const asset = descriptiveAnswers.assets.find((candidate) => candidate.file === file)!;
        expect(asset.pdfPage).toBe(entry.answerPdfPages[index]);
        expect(asset.sourcePdfUrl).toBe(entry.sourceAnswerUrl);
        expect(asset.sourceSha256).toBe(entry.sourceAnswerSha256);
      }
    }
    for (const asset of descriptiveAnswers.assets) {
      expect(createHash("sha256").update(readFileSync(resolve(root, asset.file))).digest("hex")).toBe(asset.sha256);
      expect(manifest.sources.some((source) => source.url === asset.sourcePdfUrl && source.sha256 === asset.sourceSha256)).toBe(true);
    }
    expect(descriptiveAnswers.entries.find((entry) => entry.year === 2025 && entry.number === 3)?.answerPdfPages).toEqual([3, 4]);
  });

  it("retains all 900 original common-log cells and the carry at 9.99", () => {
    const paper = drafts.papers.find((p) => p.year === 2024 && p.code === "AZ")!;
    const supplement = paper.supplementalMaterial!;
    expect(supplement.pdfPages).toEqual([8, 9, 10]);
    expect(supplement.imageAssets).toHaveLength(3);
    expect(supplement.numericCellsVerified).toBe(900);
    expect(supplement.originalTableRows).toHaveLength(90);
    for (const row of supplement.originalTableRows) {
      expect(row.values).toHaveLength(10);
      row.values.forEach((value, col) => {
        const x = (Math.round(Number(row.firstDecimal) * 100) + col) / 100;
        expect(value === "1.000" ? 1000 : Number(value)).toBe(Math.round(Math.log10(x) * 1000));
      });
    }
    expect(supplement.originalTableRows.at(-1)?.values.at(-1)).toBe("1.000");
    expect(paper.questions[5].pdfPages).toEqual([7]);
  });

  it("retains all thirty Otsu science explanations and all 150 choice explanations with their official keys", () => {
    expect(review.explanationReviews).toHaveLength(30);
    expect(review.counts.explanationWritten).toBe(30);
    expect(review.counts.explanationPending).toBe(392);
    const expected = {
      2024: [5, 2, 2, 3, 1, 5, 3, 3, 2, 2, 5, 3, 4, 5, 2],
      2025: [5, 3, 2, 2, 2, 5, 5, 3, 1, 4, 4, 4, 2, 1, 3],
    };
    expect(review.explanationReviews.every((record) => record.code === "BZ")).toBe(true);
    for (const record of review.explanationReviews) {
      const q = drafts.papers.find((p) => p.year === record.year && p.code === record.code)!.questions[record.number - 1] as unknown as Record<string, unknown>;
      expect(q.officialAnswerNumber).toBe(expected[record.year as keyof typeof expected][record.number - 1]);
      const choices = q.choiceExplanationsDraft as Record<string, string>;
      expect(Object.keys(choices)).toEqual(["1", "2", "3", "4", "5"]);
      expect(Object.values(choices).every((text) => text.length > 20)).toBe(true);
      expect(createHash("sha256").update(JSON.stringify([q.explanationDraft, choices, q.officialAnswerNumber])).digest("hex")).toBe(record.contentSha256);
    }
    expect((150 + 273.15) / (27 + 273.15)).toBeCloseTo(1.41, 2);
    expect(1 - (27 + 273.15) / (100 + 273.15)).toBeCloseTo(0.196, 3);
    expect(Math.abs(2 * -394 + 3 * -286 - -84)).toBe(1562);
    expect(1 / (0.20 / 5 + 0.30 / 3 + 0.50 / 2)).toBeCloseTo(2.56, 2);
    expect(101300 * 0.028 / (8.31 * 273.15)).toBeCloseTo(1.25, 2);
    expect(22e6 * 2e-3 / (30 * 8.31 * (173 + 273.15))).toBeCloseTo(0.396, 3);
    expect(2.5 / 0.21).toBeCloseTo(11.9, 1);
    expect(2.1 * 2045 / 3891).toBeCloseTo(1.10, 2);
  });

  it("distinguishes the original kinetic wording from the thermodynamic equilibrium explanation", () => {
    const paper = drafts.papers.find((p) => p.year === 2024 && p.code === "BZ")!;
    const q5 = paper.questions[4] as unknown as Record<string, unknown>;
    const q7 = paper.questions[6] as unknown as Record<string, unknown>;
    expect(q5.questionDraft).toContain("ニ．同一の反応であれば、用いる触媒や反応条件により変わらない。");
    expect(q5.explanationDraft).toContain("主語を欠く");
    expect(q7.officialAnswerNumber).toBe(3);
    expect(q7.explanationDraft).toContain("平衡時には両速度は等しい");
    expect(q7.explanationDraft).toContain("実用上");
    expect(q7.questionDraft).toContain("正反応の速度が逆反応の速度に比べて著しく大きく");
  });

  it("preserves all 240 Hei originals including graphic choices, fractions and graph references", () => {
    const get = (year: number, code: string, number: number) =>
      drafts.papers.find((p) => p.year === year && p.code === code)!.questions[number - 1] as unknown as Record<string, unknown>;
    expect(drafts.papers.every((p) => p.questions.every((q) => q.transcriptionVerified && q.figuresVerified))).toBe(true);
    expect(get(2024, "CX", 6).questionDraft).toContain("G＝C/V");
    expect(get(2024, "DX", 5).questionDraft).toContain("G＝C/V");
    expect(get(2024, "CZ", 15).questionDraft).toContain("C₄H₁₀ ＋ 6½ O₂");
    expect(get(2025, "CY", 15).questionDraft).toContain("cm³");
    expect(get(2024, "DZ", 7).questionDraft).toContain("CH₄ ＋ 2 O₂ → CO₂ ＋ 2 H₂O");
    expect(get(2025, "DZ", 7).questionDraft).toContain("(7/2) O₂");
    expect(get(2025, "DZ", 6).choicesDraft).toEqual(["9/2、3、3", "5、3、4", "11/2、4、4", "6、3、3", "13/2、5、4"]);
    expect(get(2025, "DY", 2).choicesDraft).toEqual(["イ－a、ロ－b、ハ－c", "イ－a、ロ－c、ハ－b", "イ－c、ロ－b、ハ－a", "イ－c、ロ－a、ハ－b", "イ－b、ロ－c、ハ－a"]);
    for (const number of [12, 16]) {
      expect(get(2025, "DY", number).choicesDraft).toEqual(["イ－a、ロ－b、ハ－c", "イ－a、ロ－c、ハ－b", "イ－b、ロ－a、ハ－c", "イ－b、ロ－c、ハ－a", "イ－c、ロ－a、ハ－b"]);
    }
    for (const p of drafts.papers.filter((p) => p.code !== "AZ")) {
      for (const q of p.questions) {
        const fields = q as unknown as Record<string, unknown>;
        expect((fields.choicesDraft as string[]).every((choice) => choice.trim().length > 0)).toBe(true);
        expect(fields.questionDraft).not.toMatch(/[\uE000-\uF8FF]|ど\s+[A-D]\s*れか/);
      }
    }
  });

  it("preserves descriptive subquestions, essential figures and exponents without creating choices", () => {
    for (const paper of drafts.papers.filter((p) => p.code === "AZ")) {
      const subquestionCounts = paper.year === 2024 ? [2, 2, 4, 0, 3, 2] : [2, 2, 4, 0, 4, 2];
      for (const q of paper.questions) {
        const fields = q as unknown as Record<string, unknown>;
        expect(fields.answerKind).toBe("descriptive");
        expect(fields.choicesDraft).toBeUndefined();
        expect(fields.officialAnswerNumber).toBeUndefined();
        const text = fields.questionDraft as string;
        expect(text.match(/^\([1-4]\)/gm)?.length ?? 0).toBe(subquestionCounts[q.number - 1]);
        expect(text).not.toMatch(/R[67]-AZ|常用対数表/);
        expect(fields.sharedPassagesDraft).toContain("特に記述のない場合、圧力は絶対圧力を示す。");
      }
    }
    const r6 = drafts.papers.find((p) => p.code === "AZ" && p.year === 2024)!;
    expect((r6.questions[0] as { questionDraft: string }).questionDraft).toContain("3.00×10⁻² kg");
    expect((r6.questions[0] as { questionDraft: string }).questionDraft).toContain("1.00×10⁻² m³");
    expect(r6.questions[5].pdfPages).toEqual([7]);
    const r7 = drafts.papers.find((p) => p.code === "AZ" && p.year === 2025)!;
    expect((r7.questions[4] as { questionDraft: string }).questionDraft).toContain("4.19×10³ kJ/kg");
    const r6ay = drafts.papers.find((p) => p.code === "AY" && p.year === 2024)!;
    expect((r6ay.questions[6] as { questionDraft: string }).questionDraft).toContain("ū＝2gΔh");
    expect(r6ay.questions[14].pdfPages).toEqual([6]);
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
    expect(drafts.publicAllowed).toBe(false);
    const entry = QUALIFICATION_CATALOG.find((q) => q.slug === "khk-kagaku");
    expect(entry?.status).toBe("ready-to-ingest");
    expect(entry?.examCode).toBeUndefined();
    expect(entry?.remainingWork.length).toBeGreaterThan(0);
    expect(Object.values(QUESTIONS_BY_EXAM).flat().some((q) => q.id.startsWith("khk-kagaku-"))).toBe(false);
  });
});
