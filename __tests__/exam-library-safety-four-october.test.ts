import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { EXAM_CATALOG, findExamEntry } from "@/lib/exam-library-catalog";
import { loadExamPaper } from "@/lib/exam-library-papers";
import verification from "@/data/exam-library/source-packs/safety-four-2026-october/verification.json";
import official from "@/data/exam-library/source-packs/safety-four-2026-october/official-transcription.json";
import catalog from "@/data/exam-library/official-catalog.json";

const base = join(process.cwd(), "data/exam-library");
const read = (file: string) => JSON.parse(readFileSync(join(base, file), "utf8"));
const specs = [
  ["diver", "LC20262119", 40],
  ["blaster", "LC20262111", 20],
  ["xray", "LC20262117", 40],
  ["gas-welding", "LC20262112", 20],
] as const;
const normalize = (text: string) => text.normalize("NFKC").replace(/\s|[○〇◯□]/gu, "");
const reviewedLayouts = new Set([
  "LC20262119-1", "LC20262119-7", "LC20262119-11", "LC20262119-31",
  "LC20262111-3", "LC20262117-5", "LC20262117-10", "LC20262112-6",
]);

describe("reviewed October 2026 diver, blaster, X-ray and gas welding manuscripts", () => {
  for (const [qualification, code, count] of specs) {
    it(`${qualification}: imports all saved questions with independently extracted official keys and choices`, () => {
      const id = `lckohyo-${code}`;
      const entry = findExamEntry(id)!;
      const pin = verification.find((item) => item.paperId === id)!;
      const questions = loadExamPaper(id)!;
      const drafts = read(`source-packs/safety-four-2026-october/${qualification}.json`);
      const source = official[code];
      expect(entry.date).toBe("2026-10");
      expect(entry.dateKind).toBe("publication");
      expect(entry.pdfUrl).toBe(pin.pdfUrl);
      expect(catalog.find((item) => item.id === id)!.pdfSha256).toBe(pin.pdfSha256);
      expect(EXAM_CATALOG.filter((item) => item.pdfUrl === entry.pdfUrl)).toHaveLength(1);
      expect(questions).toHaveLength(count);
      expect(drafts).toHaveLength(count);
      expect(pin.officialKeys).toEqual(source.map((item) => item.answer));
      expect(questions.map((q) => q.correctChoice)).toEqual(pin.officialKeys);
      expect(questions.map((q) => q.sourcePages)).toEqual(pin.sourcePages);
      expect(questions.map((q) => q.sourcePages)).toEqual(source.map((item) => item.pages));
      expect(questions.map((q) => q.number)).toEqual(Array.from({ length: count }, (_, i) => i + 1));
      for (const [index, q] of questions.entries()) {
        const draft = drafts[index];
        expect(draft.sourcePdfUrl).toBe(entry.pdfUrl);
        expect(draft.answer).toBe("アイウエオ"[q.correctChoice! - 1]);
        expect(Number(draft.officialAnswerNumber)).toBe(q.correctChoice);
        expect(q.answerAuthority).toBe("official");
        expect(q.sourceQuestionNumber).toBe(index + 1);
        expect(q.presentation?.sourceHash).toBe(createHash("sha256").update(q.text).digest("hex"));
        expect(q.presentation!.prompt).toBe(draft.question);
        expect(q.presentation!.choices.map((choice) => choice.text))
          .toEqual(Array.from("アイウエオ", (key) => draft.choices[key]));
        expect(q.explanation!.length).toBeGreaterThanOrEqual(120);
        expect(q.explanation).not.toMatch(/解説は独自作成|法令・制度は出題時点|法令の説明は出題時点|準備中/);
        for (const image of [...q.images, ...q.presentation!.figures.map((figure) => figure.src)]) {
          const bytes = readFileSync(join(process.cwd(), "public", image));
          expect(bytes.toString("ascii", 0, 4)).toBe("RIFF");
          expect(bytes.toString("ascii", 8, 12)).toBe("WEBP");
        }
        expect(q.images).toHaveLength(q.sourcePages!.length);
        for (const [pageIndex, image] of q.images.entries()) {
          expect(image).toContain(`-p${q.sourcePages![pageIndex]}-`);
        }
        if (!reviewedLayouts.has(`${code}-${q.number}`)) {
          const draftText = draft.question + Array.from("アイウエオ", (key, i) => `（${i + 1}）${draft.choices[key]}`).join("");
          expect(normalize(source[index]!.text.replace(/^問\s*[0-9０-９]+\s*/u, "")))
            .toBe(normalize(draftText));
        }
      }
    });
  }

  it("keeps source-correct figures, formulas and exemption boundaries, without duplicating April papers", () => {
    const diver = loadExamPaper("lckohyo-LC20262119")!;
    for (const n of [1, 7, 11]) expect(diver[n - 1]!.presentation!.figures).toHaveLength(1);
    expect(diver[30]!.presentation!.choices.map((choice) => choice.text)).toEqual([
      "Ｖ＝40(0.03Ｐ＋0.4)／Ｄ", "Ｖ＝40(0.03Ｄ＋0.4)／Ｐ", "Ｖ＝40(0.4Ｄ＋0.03)／Ｐ",
      "Ｖ＝60(0.03Ｐ＋0.4)／Ｄ", "Ｖ＝60(0.03Ｄ＋0.4)／Ｐ",
    ]);
    const xray = loadExamPaper("lckohyo-LC20262117")!;
    expect(xray[4]!.presentation!.choices.map((choice) => choice.text))
      .toEqual(["B＝1＋IS/IP", "B＝1＋IP/IS", "B＝1−IS/IP", "B＝IP/IS−1", "B＝IP/IS"]);
    for (const n of [10, 28]) expect(xray[n - 1]!.presentation!.figures).toHaveLength(1);
    const sourceOverlay = read("presentation/lckohyo-LC20262117.json");
    expect(sourceOverlay["lckohyo-LC20262117-q28"].figures[0].bbox[1]).toBeGreaterThan(430);
    expect(xray[27]!.explanation).toContain("0.488mSv");
    for (const [paper, index] of [[xray, 19], [xray, 29], [loadExamPaper("lckohyo-LC20262111")!, 9]] as const) {
      const q = paper[index]!;
      expect(q.text).not.toMatch(/免除者|科目が免除/);
      expect(q.sourcePages).toHaveLength(1);
    }
    for (const [id, count] of [["lckohyo-LC20260419-1", 40], ["lckohyo-LC20260411-1", 20], ["lckohyo-LC20260417-1", 40], ["lckohyo-LC20260412-1", 20]] as const) {
      expect(loadExamPaper(id)).toHaveLength(count);
      expect(EXAM_CATALOG.filter((entry) => entry.id === id)).toHaveLength(1);
    }
  });
});
