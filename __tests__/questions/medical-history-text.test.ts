import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { questionHeading, questionTitle } from "@/lib/seo/question-meta";
import { questionBreadcrumbItems } from "@/lib/seo/question-jsonld";
import { EXAM_DESCRIPTIONS, examMetaDescription, groupByYearSeason } from "@/lib/seo/exam-meta";
import type { ExamCode, Question } from "@/lib/questions/types";

type Receipt = { id: string; sourceQuestionNumber: number; physicalPages: number[]; officialKeyLiteral: string };
type Manifest = {
  year: number; addedQuestionCount: number; addedChoiceExplanationCount: number;
  complete: boolean; coverage: string; officialQuestionCount: number;
  sourceFiles: { url: string; sha256: string; pages: number }[]; receipts: Receipt[];
};
const exams: ExamCode[] = ["rigaku-ryohoshi", "shinryo-hoshasengishi", "shika-ishi"];
const kana = Array.from("アイウエオ");
const editions = {
  "rigaku-ryohoshi": [57, 58, 59],
  "shinryo-hoshasengishi": [74, 75, 76],
  "shika-ishi": [115, 116, 117],
} as const;

describe("medical history: official text excerpts", () => {
  for (const exam of exams) {
    const directory = path.join(process.cwd(), "data/questions", exam);
    it(`${exam}: discloses all three partial editions`, async () => {
      expect(readdirSync(directory).filter((f) => /^202[234]-annual-text.json$/.test(f)).sort())
        .toEqual(["2022-annual-text.json", "2023-annual-text.json", "2024-annual-text.json"]);
      const loaded = await getQuestionsForExam(exam);
      expect(loaded.filter((q) => q.year >= 2022 && q.year <= 2024)).toHaveLength(30);
      expect(EXAM_DESCRIPTIONS[exam]).toContain("2024〜2022年");
      expect(EXAM_DESCRIPTIONS[exam]).toContain("各10問");
      expect(examMetaDescription(exam, loaded.length)).toContain("部分収録");
    });
    for (const file of readdirSync(directory).filter((f) => /^202[234]-annual-text.json$/.test(f))) {
      it(`${exam}/${file}: preserves keys, source identity, and practice registration`, async () => {
        const rows = JSON.parse(readFileSync(path.join(directory, file), "utf8")) as Question[];
        const year = Number(file.slice(0, 4));
        const label = `第${editions[exam as keyof typeof editions][year - 2022]}回（${year}年実施）`;
        expect(groupByYearSeason(rows)).toEqual([
          { key: `${year}-annual`, year, season: "annual", label, count: 10 },
        ]);
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
          expect(questionSourceEdition(q), q.id).toBe(label);
          expect(questionSourceEdition({ ...q, sourcePdfUrl: `${q.sourcePdfUrl}#page=5` }), q.id).toBe(label);
          expect(questionHeading(q), q.id).toContain(label);
          expect(questionTitle(q), q.id).toContain(label.replace(/（[^）]*）$/, ""));
          expect(questionBreadcrumbItems(q)[2]?.name, q.id).toBe(label);
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
