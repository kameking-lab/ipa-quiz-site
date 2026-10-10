import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { ALL_QUESTIONS } from "@/data/questions";
import { SHAROUSHI_QUESTIONS } from "@/data/questions/sharoushi";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";
import { choiceDisplayLabel } from "@/lib/questions/display";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import type { ChoiceKey } from "@/lib/questions/types";

const evidence = path.join(process.cwd(), "docs/evidence/sharoushi10-20261010");
const readJson = <T,>(file: string): T => JSON.parse(readFileSync(path.join(evidence, file), "utf8")) as T;

type Manifest = {
  officialIndexUrl: string;
  sittings: {
    year: number; sittingNumber: number; legalReferenceDate: string;
    questionSource: { url: string }; answerSource: { url: string };
    questions: { questionNumber: number; selectionIntent: "correct" | "incorrect"; officialAnswer: string }[];
  }[];
};
type Transcript = {
  questions: { year: number; questionNumber: number; stem: string; choices: Record<string, string>; officialAnswer: string }[];
};
type Explanations = { questions: Record<string, { choices: Record<string, { verdict: "正しい" | "誤り"; text: string }> }> };

const manifest = readJson<Manifest>("PUBLIC-SOURCE-MANIFEST.json");
const transcriptA = readJson<Transcript>("transcriptA.json");
const transcriptB = readJson<Transcript>("transcriptB.json");
const explanations = readJson<Explanations>("explanations.json");
const review = readJson<{ result: string; findings: { severity: string; status?: string }[] }>("review.json");

const KEYS: readonly ChoiceKey[] = ["ア", "イ", "ウ", "エ", "オ"];
const LETTERS = ["A", "B", "C", "D", "E"];
const commas = (s: string) => s.replace(/(?<=\d)，(?=\d{3})/g, ",");
const nfkc = (s: string) => s.normalize("NFKC").replace(/\s/g, "");

describe("社会保険労務士試験 第58・57回 労働基準法及び労働安全衛生法 択一の一部10問", () => {
  const expected = manifest.sittings.flatMap((s) => s.questions.map((q) => ({ sitting: s, q })));

  it("公開するのはマニフェストの10問50肢だけ", () => {
    expect(expected).toHaveLength(10);
    expect(SHAROUSHI_QUESTIONS.map((q) => `${q.year}-${q.qNumber}`).sort()).toEqual(expected.map(({ sitting, q }) => `${sitting.year}-${q.questionNumber}`).sort());
    expect(ALL_QUESTIONS.filter((q) => q.exam === "sharoushi")).toHaveLength(10);
    expect(SHAROUSHI_QUESTIONS.reduce((sum, q) => sum + Object.keys(q.choices ?? {}).length, 0)).toBe(50);
    expect(getQualificationByExamCode("sharoushi")?.status).toBe("live");
  });

  it("独立転記A・Bが一致し、独立内容確認がPASS", () => {
    for (const b of transcriptB.questions) {
      const a = transcriptA.questions.find((x) => x.year === b.year && x.questionNumber === b.questionNumber);
      expect(a, `${b.year}-${b.questionNumber}`).toBeDefined();
      expect(nfkc(a!.stem)).toBe(nfkc(b.stem));
      for (const letter of LETTERS) expect(nfkc(a!.choices[letter])).toBe(nfkc(b.choices[letter]));
      expect(a!.officialAnswer).toBe(b.officialAnswer);
    }
    expect(["PASS", "PASS_AFTER_FIX"]).toContain(review.result);
    expect(review.findings.filter((f) => f.severity === "blocking" && f.status !== "resolved")).toEqual([]);
  });

  for (const { sitting, q: source } of expected) {
    it(`第${sitting.sittingNumber}回 問${source.questionNumber}: 原文・公式正答・全肢解説・出典・法令基準日`, () => {
      const q = SHAROUSHI_QUESTIONS.find((x) => x.year === sitting.year && x.qNumber === source.questionNumber)!;
      const t = transcriptB.questions.find((x) => x.year === sitting.year && x.questionNumber === source.questionNumber)!;
      expect(q.question).toBe(commas(t.stem));
      KEYS.forEach((key, i) => expect(q.choices?.[key]).toBe(commas(t.choices[LETTERS[i]])));
      expect(choiceDisplayLabel("sharoushi", q.answer as ChoiceKey)).toBe(source.officialAnswer);
      expect(q.officialAnswerNumber).toBe(source.officialAnswer);
      expect(q.sourcePdfUrl).toBe(sitting.questionSource.url);
      expect(q.sourceAnswerUrl).toBe(sitting.answerSource.url);
      expect(q.lawReferenceDate).toBe(sitting.legalReferenceDate);
      expect(q.license).toBe("SHAROSI-attributed");
      expect(q.sourceAttribution).toContain(`第${sitting.sittingNumber}回`);
      expect(q.sourceAttribution).toContain(`問${source.questionNumber}（問題・正答）`);
      expect(q.officialReferenceUrls).toContain(manifest.officialIndexUrl);
      expect(q.explanationCoverage).toBe("full");
      expect(q.needsReview).toBe(false);
      expect(isPracticeReadyQuestion(q)).toBe(true);
      const target = source.selectionIntent === "correct" ? "正しい" : "誤り";
      const ex = explanations.questions[`${sitting.year}-${source.questionNumber}`];
      KEYS.forEach((key, i) => {
        const letter = LETTERS[i];
        expect(q.choiceExplanations?.[key]?.length ?? 0, `${letter}`).toBeGreaterThan(40);
        expect(ex.choices[letter].verdict === target, `${letter} の正誤方向`).toBe(letter === source.officialAnswer);
      });
    });
  }

  it("選択肢は原本どおりA〜Eで表示する", () => {
    expect(KEYS.map((key) => choiceDisplayLabel("sharoushi", key))).toEqual(LETTERS);
  });
});
