import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { HOKENSHI_QUESTIONS } from "@/data/questions/hokenshi";
import addition from "@/data/questions/hokenshi/latest-two-completion-20261011.json";
import unchanged from "@/data/questions/hokenshi/medical34-live.json";
import manifest from "@/docs/evidence/hokenshi-latest-two-20261011/manifest.json";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { isNumericAnswerCorrect, numericQuestionIssue } from "@/lib/questions/numeric";
import { QuestionCard } from "@/components/quiz/QuestionCard";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";

describe("保健師 latest two original sittings", () => {
  it("adds exactly 186 new originals and excludes the prior stopped 18", () => {
    expect(addition).toHaveLength(186);
    expect(HOKENSHI_QUESTIONS).toHaveLength(202);
    expect(HOKENSHI_QUESTIONS.filter(isPracticeReadyQuestion)).toHaveLength(202);
    expect(new Set(HOKENSHI_QUESTIONS.map(q => q.id)).size).toBe(202);
    const expected = new Set(manifest.originals.map(q => q.id));
    expect(HOKENSHI_QUESTIONS.every(q => expected.has(q.id))).toBe(true);
    for (const [year, session, count] of [[2025, "am", 37], [2025, "pm", 55], [2024, "am", 55], [2024, "pm", 55]] as const) {
      expect(HOKENSHI_QUESTIONS.filter(q => q.year === year && q.session === session)).toHaveLength(count);
    }
    for (const row of manifest.excludedOriginals) {
      expect(HOKENSHI_QUESTIONS.some(q => q.year === 2025 && q.session === row.session && q.qNumber === row.qNumber)).toBe(false);
    }
    expect(manifest.excludedOriginals).toHaveLength(18);
  });

  it("preserves each existing live question and official answer, with complete choice reasons", () => {
    for (const q of unchanged) expect(HOKENSHI_QUESTIONS.find(row => row.id === q.id)).toEqual(q);
    // Git stores this UTF-8 source with LF; Windows checkouts may use CRLF.
    // Normalize only the platform newline representation, preserving every content byte.
    const liveSource = readFileSync(resolve(process.cwd(), "data/questions/hokenshi/medical34-live.json"), "utf8");
    expect(createHash("sha256").update(liveSource.replace(/\r\n/g, "\n"), "utf8").digest("hex")).toBe(manifest.previousLiveFileSha256);
    const kana = ["ア", "イ", "ウ", "エ", "オ"];
    for (const q of HOKENSHI_QUESTIONS) {
      const evidence = manifest.originals.find(row => row.id === q.id)!;
      expect(q.officialAnswerNumber, q.id).toBe(evidence.officialAnswerNumber);
      expect(q.answer, q.id).toEqual(evidence.answer);
      expect(q.question, q.id).not.toMatch(/�|【草稿|HOLD/);
      expect(q.explanation, q.id).not.toMatch(/HOLD|【草稿|同上|公式正答から/);
      if (q.type === "multiple-choice") {
        const answers = Array.isArray(q.answer) ? q.answer : [q.answer];
        expect(answers.map(a => kana.indexOf(a) + 1).join(""), q.id).toBe(q.officialAnswerNumber);
        expect(answers, q.id).toHaveLength(q.requiredSelections ?? 1);
        expect(Object.keys(q.choices ?? {}), q.id).toEqual(Object.keys(q.choiceExplanations ?? {}));
        for (const explanation of Object.values(q.choiceExplanations ?? {})) {
          expect(explanation, q.id).not.toMatch(/^(正しい|誤り|正解)(です)?[。．]?$/);
        }
      } else expect(numericQuestionIssue(q), q.id).toBeUndefined();
    }
  });

  it("retains the original integer and decimal response formats", () => {
    const numeric = HOKENSHI_QUESTIONS.filter(q => q.type === "numeric");
    expect(numeric).toHaveLength(3);
    const ppv = numeric.find(q => q.year === 2024 && q.session === "pm" && q.qNumber === 52)!;
    expect(ppv.officialAnswerNumber).toBe("20");
    expect(ppv.answer).toBe("2.0");
    expect(ppv.numericAnswer).toEqual({ format: "decimal", precision: 1, unit: "%" });
    expect(isNumericAnswerCorrect(ppv, "２．０")).toBe(true);
    expect(isNumericAnswerCorrect(ppv, "20")).toBe(false);
    const smr = numeric.find(q => q.year === 2025)!;
    expect(isNumericAnswerCorrect(smr, "128")).toBe(true);
    expect(smr.question).not.toContain("0 　0 　0");
  });

  it("renders every faithful source crop and retains each common case", () => {
    const pictured = HOKENSHI_QUESTIONS.filter(q => q.hasImage);
    expect(pictured).toHaveLength(15);
    for (const q of pictured) {
      expect(q.imageUrls).toHaveLength(1);
      expect(q.imageAltTexts).toHaveLength(1);
      const url = q.imageUrls![0]!;
      const path = resolve(process.cwd(), "public", url.slice(1));
      expect(existsSync(path), q.id).toBe(true);
      const source = manifest.figures.find(f => url.endsWith(f.file))!;
      expect(createHash("sha256").update(readFileSync(path)).digest("hex"), q.id).toBe(source.sha256);
      expect(renderToStaticMarkup(<QuestionCard question={q} />), q.id).toContain(q.imageAltTexts![0]);
    }
    for (const number of [39, 40, 41]) {
      expect(HOKENSHI_QUESTIONS.find(q => q.year === 2025 && q.session === "am" && q.qNumber === number)!.question).toContain("長女（生後7 か月）");
    }
    const summary = getQualificationByExamCode("hokenshi")!.reuseSummary;
    expect(summary).toContain("202問を部分収録");
    expect(summary).toContain("18問は未収録");
    expect(manifest.mergeDeployPerformed).toBe(false);
    expect(manifest.permissionAttestation).toBe(false);
  });
});
