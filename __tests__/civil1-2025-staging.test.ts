import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { CIVIL1_QUESTIONS, toCivil1Questions, type Civil1Source } from "@/data/questions/civil1";

const reportDir = join(process.cwd(), "reports/civil1-2025-july");
const read = <T,>(name: string): T => JSON.parse(readFileSync(join(reportDir, name), "utf8")) as T;
type Candidate = {
  paper: "A" | "B"; number: number; question: string; choices: string[];
  officialAnswerNumber: number; choiceExplanations: string[]; publicAcceptance: boolean;
};
const candidate = read<{ questions: Candidate[] }>("candidate-questions.json");
const transcription = read<{ answersA: Record<string, number>; answersB: Record<string, number> }>("source-copy-transcription.json");
const ledger = read<{
  requiredOriginals: number; publicOriginals: number; acceptedNewOriginals: number;
  remainingUnpublishedOriginals: number; originalDataLfSha256: Record<string, string>;
  newDraftCandidateLfSha256: string; sourceTranscriptionLfSha256: string;
}>("completion-ledger.json");

describe("civil1 2025 held staging", () => {
  it("preserves all 101 unique originals and 404 explained choices against the acquired answer table", () => {
    expect(candidate.questions).toHaveLength(101);
    expect(new Set(candidate.questions.map((q) => `${q.paper}-${q.number}`)).size).toBe(101);
    for (const [paper, count] of [["A", 66], ["B", 35]] as const) {
      expect(candidate.questions.filter((q) => q.paper === paper).map((q) => q.number)).toEqual(
        Array.from({ length: count }, (_, index) => index + 1),
      );
    }
    for (const q of candidate.questions) {
      expect(q.officialAnswerNumber).toBe(transcription[q.paper === "A" ? "answersA" : "answersB"][String(q.number)]);
      expect(q.choices).toHaveLength(4);
      expect(q.choiceExplanations).toHaveLength(4);
      expect(q.choiceExplanations.every((reason) => reason.trim().length >= 20)).toBe(true);
      expect(q.question + q.choices.join("")).not.toMatch(/[\u0000-\u001f\u007f]/);
      expect(q.publicAcceptance).toBe(false);
    }
  });

  it("keeps pending source copies out of the 100-question public pool", () => {
    expect(ledger.requiredOriginals).toBe(202);
    expect(ledger.publicOriginals).toBe(100);
    expect(ledger.acceptedNewOriginals).toBe(0);
    expect(ledger.remainingUnpublishedOriginals).toBe(102);
    expect(CIVIL1_QUESTIONS).toHaveLength(100);
    for (const paper of ["a", "b"]) {
      const source = read<Civil1Source>(`2025-july-${paper}.draft.json`);
      expect(source.publicationStatus).toBe("held");
      expect(() => toCivil1Questions(source)).toThrow("Unaccepted civil1");
    }
  });

  it("pins unchanged public data and all nine saved figure crops by checksum", () => {
    for (const [file, expected] of Object.entries(ledger.originalDataLfSha256)) {
      const normalized = readFileSync(join(process.cwd(), "data/questions/civil1", file), "utf8").replace(/\r\n/g, "\n");
      expect(createHash("sha256").update(normalized).digest("hex")).toBe(expected);
    }
    for (const [file, expected] of [
      ["candidate-questions.json", ledger.newDraftCandidateLfSha256],
      ["source-copy-transcription.json", ledger.sourceTranscriptionLfSha256],
    ] as const) {
      const normalized = readFileSync(join(reportDir, file), "utf8").replace(/\r\n/g, "\n");
      expect(createHash("sha256").update(normalized).digest("hex")).toBe(expected);
    }
    const figures = read<Record<string, { path: string; sha256: string; officialHostVerified: boolean }>>("figures-ledger.json");
    expect(Object.keys(figures)).toHaveLength(9);
    for (const figure of Object.values(figures)) {
      expect(createHash("sha256").update(readFileSync(join(process.cwd(), figure.path))).digest("hex")).toBe(figure.sha256);
      expect(figure.officialHostVerified).toBe(false);
    }
  });
});
