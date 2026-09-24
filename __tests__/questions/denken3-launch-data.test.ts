import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { DENKEN3_QUESTIONS } from "@/data/questions/denken3";
import manifest from "@/scripts/denken3-source-manifest.json";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import { getSessionNeighbors } from "@/lib/questions/related";

type SourceRow = {
  examDate: string; subject: string; fiscalYear: number; term: string;
  questionNumber: number; part: "a" | "b" | null; question: string;
  choices: Record<string, string>; officialAnswer: string; explanation: string;
  choiceExplanations: Record<string, string>; sourceQuestionPdfUrl: string;
  sourceAnswerPdfUrl: string; figureUrls: string[]; choiceFigureUrls: Record<string, string>;
};

const kana = ["ア", "イ", "ウ", "エ", "オ"] as const;
const questions = DENKEN3_QUESTIONS;
const base = join(process.cwd(), "data", "questions", "denken3");
const reviewed = new Map<string, SourceRow>();
const key = (date: string, subject: string, number: number, part: string | null) =>
  `${date}/${subject}/${number}/${part ?? ""}`;
for (const file of readdirSync(join(base, "reviewed")).filter((name) => name.endsWith(".json"))) {
  const rows = JSON.parse(readFileSync(join(base, "reviewed", file), "utf8")) as SourceRow[];
  for (const row of rows) {
    const id = key(row.examDate, row.subject, row.questionNumber, row.part);
    expect(reviewed.has(id), id).toBe(false);
    reviewed.set(id, row);
  }
}

const papers = manifest.sessions.flatMap((session) => session.subjects.map((paper) => ({ session, paper })));
const official = new Map(papers.flatMap(({ session, paper }) => paper.answerUnits.map((unit) => [
  key(session.examDate, paper.subject, unit.question, unit.part),
  { session, paper, unit },
] as const)));

describe("Denken 3 fixed launch data", () => {
  it("matches 16 official papers and 320 unique answer units", () => {
    expect(papers).toHaveLength(16);
    expect(official.size).toBe(320);
    expect(questions).toHaveLength(320);
    expect(new Set(questions.map((q) => q.id)).size).toBe(320);
    expect(questions.filter(isPracticeReadyQuestion)).toHaveLength(320);
    const paperCounts = new Map<string, number>();
    for (const q of questions) {
      const id = `${q.year}/${q.season}/${q.session}`;
      paperCounts.set(id, (paperCounts.get(id) ?? 0) + 1);
    }
    expect([...paperCounts.values()].sort((a, b) => a - b)).toEqual([16, 16, 16, 16, 20, 20, 20, 20, 22, 22, 22, 22, 22, 22, 22, 22]);
  });

  it("resolves all 320 answer units to distinct playable detail routes", () => {
    const paths = questions.map(questionPagePath);
    expect(new Set(paths).size).toBe(320);
    for (const [index, path] of paths.entries()) {
      const [, , exam, yearSeason, section, qnum] = path.split("/");
      expect(findQuestionByRoute(questions, { exam, yearSeason, section, qnum })?.id, path).toBe(questions[index]!.id);
    }
  });

  it("orders (a) directly before (b) in same-paper navigation", () => {
    const firstPart = questions.find((q) => q.part === "a")!;
    const secondPart = questions.find((q) => q.year === firstPart.year && q.season === firstPart.season && q.session === firstPart.session && q.qNumber === firstPart.qNumber && q.part === "b")!;
    expect(getSessionNeighbors(firstPart, questions).next?.id).toBe(secondPart.id);
    expect(getSessionNeighbors(secondPart, questions).prev?.id).toBe(firstPart.id);
  });

  it("keeps the 318 reviewed stems, choices, answers and explanations byte-for-byte in the adapter", () => {
    expect(reviewed.size).toBe(318);
    for (const q of questions) {
      const subject = q.id.match(/-(theory|power|machinery|law)-/)?.[1];
      const source = official.get(key(q.examDate!, subject!, q.qNumber, q.part ?? null));
      expect(source, q.id).toBeDefined();
      expect(q.id, q.id).toBe(`denken3-${source!.session.fiscalYear}-${source!.session.term}-${subject}-q${String(q.qNumber).padStart(2, "0")}${q.part ? `-${q.part}` : ""}`);
      expect(q.year, q.id).toBe(source!.session.fiscalYear);
      expect(q.fiscalYear, q.id).toBe(source!.session.fiscalYear);
      expect(q.term, q.id).toBe(source!.session.term);
      expect(q.subject, q.id).toBe(subject);
      expect(q.answer, q.id).toBe(kana[Number(source!.unit.answer) - 1]);
      expect(q.officialAnswerNumber, q.id).toBe(source!.unit.answer);
      expect(q.sourcePdfUrl, q.id).toBe(source!.paper.url);
      expect(q.sourceAnswerUrl, q.id).toBe(source!.session.officialAnswer.url);
      expect(Object.keys(q.choices ?? {}), q.id).toEqual([...kana]);
      const row = reviewed.get(key(q.examDate!, subject!, q.qNumber, q.part ?? null));
      if (!row) continue;
      expect(q.question, q.id).toBe(row.question);
      expect(q.explanation, q.id).toBe(row.explanation);
      expect(q.choices, q.id).toEqual(Object.fromEntries(kana.map((letter, i) => [letter, row.choices[String(i + 1)]])));
      expect(q.choiceExplanations, q.id).toEqual(Object.fromEntries(kana.map((letter, i) => [letter, row.choiceExplanations[String(i + 1)]])));
      expect(q.explanationCoverage, q.id).toBe("full");
      expect(q.imageUrls ?? [], q.id).toEqual(row.figureUrls);
      expect(q.choiceImageUrls ?? {}, q.id).toEqual(Object.fromEntries(Object.entries(row.choiceFigureUrls).map(([number, url]) => [kana[Number(number) - 1], url])));
      for (const url of [...(q.imageUrls ?? []), ...Object.values(q.choiceImageUrls ?? {})]) {
        expect(existsSync(join(process.cwd(), "public", url.slice(1))), `${q.id} ${url}`).toBe(true);
      }
    }
  });

  it("publishes two official-answer-only units without draft reasons or internal markers", () => {
    const summary = questions.filter((q) => q.explanationCoverage === "official-summary");
    expect(summary.map((q) => q.id)).toEqual([
      "denken3-2025-lower-power-q01", "denken3-2025-lower-law-q04",
    ]);
    for (const q of summary) {
      expect(q.choiceExplanations).toBeUndefined();
      expect("needsReview" in q).toBe(false);
      expect(q.explanation).toContain("公式正答");
      expect(JSON.stringify(q)).not.toMatch(/\b(?:HOLD|FIX|TODO)\b|未確認|要確認|確認待ち|準備中|仮置き/u);
    }
    expect(questions.filter((q) => q.explanationCoverage === "full")).toHaveLength(318);
  });

  it("would detect a changed answer, source URL or reviewed explanation", () => {
    const original = questions[0]!;
    const source = official.get(key(original.examDate!, original.subject!, original.qNumber, original.part ?? null))!;
    const row = reviewed.get(key(original.examDate!, original.subject!, original.qNumber, original.part ?? null))!;
    const wrongAnswer = original.answer === "ア" ? "イ" : "ア";
    expect({ ...original, answer: wrongAnswer }.answer).not.toBe(kana[Number(source.unit.answer) - 1]);
    expect({ ...original, sourcePdfUrl: "https://example.invalid" }.sourcePdfUrl).not.toBe(source.paper.url);
    expect({ ...original, explanation: "tampered" }.explanation).not.toBe(row.explanation);
  });
});
