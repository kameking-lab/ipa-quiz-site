// @vitest-environment node
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { copyFileSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";

const roots: string[] = [];
const paperId = "cskohyo-CS20211901";
const questionId = `${paperId}-q1`;
const question = {
  id: questionId,
  number: 1,
  text: "問1 誤っているものはどれか。",
  extractionStatus: "complete",
  sourceQuestionNumber: 1,
  sourcePages: [1],
  answerAuthority: "official",
  choiceCount: 5,
  correctChoice: 3,
  images: [`/exam-library/${paperId}/q1-p1-1.webp`],
};
const validOverlay = {
  sourceHash: createHash("sha256").update(question.text).digest("hex"),
  correctChoice: 3,
  summary: "各選択肢を根拠規定と照合し、この設問で誤っている記述を特定します。",
  choices: [1, 2, 3, 4, 5].map((number) => ({
    number,
    verdict: number === 3 ? "correct" : "incorrect",
    reason: `選択肢${number}の具体的な記述を政府資料の要件と照合し、この設問における正誤の理由を十分な長さで説明します。`,
  })),
  sources: [{ title: "労働安全衛生法", url: "https://laws.e-gov.go.jp/law/347AC0000000057" }],
};

function runValidator(choiceExplanations: unknown) {
  const root = mkdtempSync(join(tmpdir(), "safety-validator-test-"));
  roots.push(root);
  const data = join(root, "data", "exam-library");
  mkdirSync(join(root, "scripts"), { recursive: true });
  mkdirSync(join(data, "papers"), { recursive: true });
  mkdirSync(join(root, "public", "exam-library", paperId), { recursive: true });
  copyFileSync(
    join(process.cwd(), "scripts", "validate-safety-exams.mjs"),
    join(root, "scripts", "validate-safety-exams.mjs"),
  );
  writeFileSync(join(data, "official-catalog.json"), JSON.stringify([{
    id: paperId,
    group: "cskohyo",
    subject: "機械安全",
    sourceMode: "official-pdf",
    answerMode: "official-choice",
    pdfUrl: "https://www.exam.or.jp/example.pdf",
    indexUrl: "https://www.exam.or.jp/example/",
    indexSha256: "a".repeat(64),
    pdfSha256: "b".repeat(64),
    dateKind: "exam",
    date: "2021-10-19",
    questionCount: 1,
    scoredCount: 1,
    pageCount: 1,
  }]));
  writeFileSync(join(data, "papers", `${paperId}.json`), JSON.stringify([question]));
  writeFileSync(join(data, "explanations.json"), "{}");
  writeFileSync(join(data, "choice-explanations.json"), JSON.stringify(choiceExplanations));
  writeFileSync(join(data, "coverage-contract.json"), JSON.stringify({
    structuredChoiceExplanations: { requiredPaperIds: [paperId] },
    consultant: { years: [2021], subjects: ["機械安全"] },
  }));
  // The publication gate checks only the WebP container signature and a non-empty payload.
  writeFileSync(
    join(root, "public", "exam-library", paperId, "q1-p1-1.webp"),
    Buffer.from("52494646080000005745425000000000", "hex"),
  );

  const result = spawnSync(
    process.execPath,
    [join(root, "scripts", "validate-safety-exams.mjs"), "--require-explanations"],
    { encoding: "utf8" },
  );
  return { status: result.status, report: JSON.parse(result.stdout) };
}

afterEach(() => {
  for (const root of roots.splice(0)) rmSync(root, { recursive: true, force: true });
});

describe("safety explanation publication gate", () => {
  it("accepts a complete structured five-choice explanation without duplicate narrative text", () => {
    const result = runValidator({ [questionId]: validOverlay });

    expect(result.status).toBe(0);
    expect(result.report.ok).toBe(true);
    expect(result.report.explanations).toBe(0);
    expect(result.report.structuredChoiceExplanations).toBe(1);
    expect(result.report.totalExplainedQuestions).toBe(1);
  });

  it.each([
    ["stale", { ...validOverlay, sourceHash: "0".repeat(64) }, "Stale choice explanation source"],
    ["incomplete", { ...validOverlay, choices: validOverlay.choices.slice(0, 4) }, "must contain five choices"],
  ])("rejects a %s structured overlay even though its question ID exists", (_label, overlay, error) => {
    const result = runValidator({ [questionId]: overlay });

    expect(result.status).toBe(1);
    expect(result.report.ok).toBe(false);
    expect(result.report.errors.join(" ")).toContain(error);
  });
});
