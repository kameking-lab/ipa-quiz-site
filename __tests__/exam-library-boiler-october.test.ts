import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { EXAM_CATALOG, findExamEntry } from "@/lib/exam-library-catalog";
import { loadExamPaper } from "@/lib/exam-library-papers";
import verification from "@/data/exam-library/source-packs/boiler-2026-october/verification.json";
import official from "@/data/exam-library/source-packs/boiler-2026-october/official-transcription.json";

const base = join(process.cwd(), "data/exam-library");
const read = (file: string) => JSON.parse(readFileSync(join(base, file), "utf8"));
const specs = [
  ["boiler1", "LC20262102", 40],
  ["boiler2", "LC20262103", 40],
  ["boiler-maintenance", "LC20262106", 30],
] as const;
const normalize = (text: string) => text.normalize("NFKC").replace(/\s|[○〇◯□]/gu, "");
const reviewedLayouts = new Set([
  "LC20262102-6", "LC20262102-10", "LC20262102-20",
  "LC20262106-22", "LC20262106-25",
]);

describe("reviewed October 2026 boiler manuscripts", () => {
  for (const [qualification, code, count] of specs) {
    it(`${qualification}: loads every existing manuscript with its independent official key and all five choices`, () => {
      const id = `lckohyo-${code}`;
      const entry = findExamEntry(id)!;
      const pin = verification.find((item) => item.paperId === id)!;
      const questions = loadExamPaper(id)!;
      const drafts = read(`source-packs/boiler-2026-october/${qualification}.json`);
      const source = official[code];
      expect(entry.date).toBe("2026-10");
      expect(entry.dateKind).toBe("publication");
      expect(entry.pdfUrl).toBe(pin.pdfUrl);
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
        expect(draft.season).toBe("autumn");
        expect(draft.answer).toBe("アイウエオ"[q.correctChoice! - 1]);
        expect(q.answerAuthority).toBe("official");
        expect(q.sourceQuestionNumber).toBe(index + 1);
        expect(q.presentation?.sourceHash).toBe(createHash("sha256").update(q.text).digest("hex"));
        expect(normalize(q.presentation!.prompt)).toBe(normalize(draft.question));
        expect(q.presentation!.choices.map((choice) => normalize(choice.text)))
          .toEqual(Array.from("アイウエオ", (key) => normalize(draft.choices[key])));
        expect(q.explanation!.length).toBeGreaterThanOrEqual(120);
        expect(q.explanation).not.toMatch(/解説は独自作成|法令は出題時点|準備中/);
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

  it("keeps the fraction choices and required diagrams, and excludes the exemption notice from Q20", () => {
    const boiler = loadExamPaper("lckohyo-LC20262102")!;
    expect(boiler[5]!.presentation!.choices.map((choice) => choice.text))
      .toEqual(["dL/dt", "πdL", "π(dt)L", "πdt²/4", "πd²/4"]);
    expect(boiler[5]!.correctChoice).toBe(4);
    expect(boiler[5]!.presentation!.figures).toHaveLength(1);
    expect(boiler[9]!.presentation!.figures).toHaveLength(1);
    const maintenance = loadExamPaper("lckohyo-LC20262106")!;
    expect(maintenance[19]!.text).not.toContain("免除者");
    expect(maintenance[19]!.presentation!.choices[4]!.text).not.toContain("免除者");
    expect(maintenance[21]!.presentation!.figures).toHaveLength(1);
    expect(maintenance[24]!.presentation!.figures).toHaveLength(1);
    expect(loadExamPaper("lckohyo-LC20262103")!.every((q) => q.presentation!.figures.length === 0)).toBe(true);
    for (const id of ["lckohyo-LC20260402-1", "lckohyo-LC20260403", "lckohyo-LC20260406"]) {
      expect(existsSync(join(base, "papers", `${id}.json`))).toBe(true);
      expect(EXAM_CATALOG.filter((entry) => entry.id === id)).toHaveLength(1);
    }
  });
});
