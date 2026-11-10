import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import type { ExamCode, Question } from "@/lib/questions/types";

type Receipt = { id: string; sourceQuestionNumber: number; physicalPages: number[]; officialKeyLiteral: string };
type Manifest = {
  year: number; addedQuestionCount: number; addedChoiceExplanationCount: number;
  complete: boolean; coverage: string; officialQuestionCount: number;
  sourceFiles: { url: string; sha256: string; pages: number }[]; receipts: Receipt[];
};
const exams: ExamCode[] = ["rigaku-ryohoshi", "shinryo-hoshasengishi", "shika-ishi"];
const kana = Array.from("アイウエオ");

describe("medical history: official text excerpts", () => {
  for (const exam of exams) {
    const directory = path.join(process.cwd(), "data/questions", exam);
    for (const file of readdirSync(directory).filter((f) => /^202[234]-annual-text.json$/.test(f))) {
      it(`${exam}/${file}: preserves keys, source identity, and practice registration`, async () => {
        const rows = JSON.parse(readFileSync(path.join(directory, file), "utf8")) as Question[];
        const manifest = JSON.parse(readFileSync(path.join(directory, file.replace(".json", "-sources.json")), "utf8")) as Manifest;
        expect(manifest.complete).toBe(false);
        expect(manifest.coverage).toBe("partial-text-only");
        expect(rows.length).toBe(manifest.addedQuestionCount);
        expect(rows.length).toBeLessThan(manifest.officialQuestionCount);
        expect(rows.length * 5).toBe(manifest.addedChoiceExplanationCount);
        expect(manifest.receipts.map((r) => r.id)).toEqual(rows.map((q) => q.id));
        const loaded = await getQuestionsForExam(exam);
        expect(new Set(loaded.map((q) => q.id)).size).toBe(loaded.length);
        for (const [i, q] of rows.entries()) {
          const receipt = manifest.receipts[i];
          expect(loaded.find((r) => r.id === q.id)).toEqual(q);
          expect(q.year).toBe(manifest.year);
          expect(q.qNumber).toBe(receipt.sourceQuestionNumber);
          expect(q.officialAnswerNumber).toBe(receipt.officialKeyLiteral);
          const expected = Array.from(receipt.officialKeyLiteral).map((c) =>
            kana[exam === "shika-ishi" ? c.charCodeAt(0) - 65 : Number(c) - 1]);
          expect(Array.isArray(q.answer) ? q.answer : [q.answer]).toEqual(expected);
          expect(q.requiredSelections).toBe(expected.length);
          expect(Object.keys(q.choices!)).toEqual(kana);
          expect(Object.keys(q.choiceExplanations!)).toEqual(kana);
          expect(q.explanation.length).toBeGreaterThan(70);
          for (const reason of Object.values(q.choiceExplanations!)) expect(reason!.length).toBeGreaterThan(20);
          expect(q.hasImage).toBe(false);
          expect(q.question).not.toMatch(/別冊|図に|図を|写真を|表を/);
          expect(q.needsReview).toBe(false);
          expect(isPracticeReadyQuestion(q)).toBe(true);
          for (const url of [q.sourcePdfUrl, q.sourceAnswerUrl]) {
            const source = manifest.sourceFiles.find((s) => s.url === url);
            expect(source).toBeDefined();
            expect(source!.sha256).toMatch(/^[a-f0-9]{64}$/);
          }
          const problem = manifest.sourceFiles.find((s) => s.url === q.sourcePdfUrl)!;
          expect(receipt.physicalPages.every((p) => p > 0 && p <= problem.pages)).toBe(true);
        }
      });
    }
  }
});
