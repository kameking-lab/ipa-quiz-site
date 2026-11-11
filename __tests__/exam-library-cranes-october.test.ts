import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { EXAM_CATALOG, findExamEntry } from "@/lib/exam-library-catalog";
import { loadExamPaper } from "@/lib/exam-library-papers";
import verification from "@/data/exam-library/source-packs/cranes-2026-october/verification.json";
import official from "@/data/exam-library/source-packs/cranes-2026-october/official-transcription.json";
import catalog from "@/data/exam-library/official-catalog.json";

const base = join(process.cwd(), "data/exam-library");
const read = (file: string) => JSON.parse(readFileSync(join(base, file), "utf8"));
const specs = [
  ["mobile-crane", "LC20262109", 40],
  ["crane-derrick", "LC20262107", 40],
  ["cargo-winch", "LC20262110", 40],
] as const;
const normalize = (text: string) => text.normalize("NFKC").replace(/\s|[○〇◯□]/gu, "");
const reviewedLayouts = new Set(["LC20262109-7", "LC20262109-9", "LC20262109-13", "LC20262109-22", "LC20262109-31", "LC20262109-32", "LC20262109-34", "LC20262109-36", "LC20262109-38", "LC20262109-40", "LC20262107-3", "LC20262107-4", "LC20262107-22", "LC20262107-31", "LC20262107-33", "LC20262107-34", "LC20262107-35", "LC20262107-36", "LC20262107-39", "LC20262107-40", "LC20262110-3", "LC20262110-7", "LC20262110-13", "LC20262110-20", "LC20262110-23", "LC20262110-31", "LC20262110-32", "LC20262110-36", "LC20262110-38", "LC20262110-40"]);

describe("reviewed October 2026 mobile crane, crane derrick and cargo winch manuscripts", () => {
  for (const [qualification, code, count] of specs) {
    it(`${qualification}: imports all saved questions with independently extracted official keys and choices`, () => {
      const id = `lckohyo-${code}`;
      const entry = findExamEntry(id)!;
      const pin = verification.find((item) => item.paperId === id)!;
      const questions = loadExamPaper(id)!;
      const drafts = read(`source-packs/cranes-2026-october/${qualification}.json`);
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

  it("preserves diagrams, correct calculation steps and clean subject boundaries", () => {
    const mobile = loadExamPaper("lckohyo-LC20262109")!;
    const crane = loadExamPaper("lckohyo-LC20262107")!;
    const cargo = loadExamPaper("lckohyo-LC20262110")!;
    expect(mobile[31]!.explanation).toContain("2.5−0.5＝2.0");
    expect(mobile[37]!.explanation).toContain("約23907Ｎ");
    expect(crane[21]!.explanation).toContain("Ｃ点は12÷３＝４Ａ");
    expect(cargo[22]!.explanation).toContain("Ｄ点を流れるのは12÷６＝２Ａ");
    for (const paper of [mobile, cargo]) {
      expect(paper[39]!.explanation).toContain("３段で");
      expect(paper[39]!.explanation).not.toContain("ロープは８本");
    }
    expect(crane[39]!.explanation).toContain("右端の下側の滑車は固定");
    expect(mobile[12]!.presentation!.figures[0]!.width).toBe(510);
    expect(crane[35]!.presentation!.figures[0]!.height).toBe(866);
    expect([mobile, crane, cargo].flat().flatMap((q) => q.presentation!.figures)).toHaveLength(26);
    for (const q of [mobile[29]!, cargo[19]!]) {
      expect(q.text).not.toMatch(/免除者|解答しないでください/u);
      expect(q.sourcePages).toHaveLength(1);
    }
    for (const [id, count] of [["lckohyo-LC20260409-1", 40], ["lckohyo-LC20260407-1", 40], ["lckohyo-LC20260410-1", 40]] as const) {
      expect(loadExamPaper(id)).toHaveLength(count);
      expect(EXAM_CATALOG.filter((entry) => entry.id === id)).toHaveLength(1);
    }
  });
});
