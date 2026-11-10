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
  status: "DRAFT" | "HOLD"; sourceCopyVerifiedAgainstOfficialHost: boolean;
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

// Technical completion remains separate from the official-source/publication gate.
describe("civil1 bounded technical followup", () => {
  it("records all 37 decisions while preserving the original stems, answers and figure bytes", () => {
    const resolution = read<{
      reviewedTechnicalHoldQuestions: number; reviewedChoices: number;
      technicalResolvedKeys: string[]; technicalHoldItems: { key: string }[];
      publicAcceptance: boolean; independentAcceptance: boolean; runtimeImport: boolean;
    }>("technical-hold-resolution.json");
    const resolved = new Set(resolution.technicalResolvedKeys);
    const held = new Set(resolution.technicalHoldItems.map((q) => q.key));
    expect(resolution.reviewedTechnicalHoldQuestions).toBe(37);
    expect(resolution.reviewedChoices).toBe(148);
    expect(resolved.size + held.size).toBe(37);
    expect([...resolved].every((key) => !held.has(key))).toBe(true);
    expect(resolution.publicAcceptance).toBe(false);
    expect(resolution.independentAcceptance).toBe(false);
    expect(resolution.runtimeImport).toBe(false);
    const correction = read<{
      beforeChoiceDescriptions: string[]; afterChoiceDescriptions: string[];
      sourceFigurePath: string; sourceFigureSha256: string;
      originalFigureBytesUnchanged: boolean; officialAnswerUnchanged: boolean;
    }>("a25-transcription-correction-receipt.json");
    const a25 = candidate.questions.find((q) => q.paper === "A" && q.number === 25);
    expect(a25?.choices).toEqual(correction.afterChoiceDescriptions);
    expect(a25?.officialAnswerNumber).toBe(2);
    expect(correction.originalFigureBytesUnchanged).toBe(true);
    expect(correction.officialAnswerUnchanged).toBe(true);
    expect(createHash("sha256").update(readFileSync(join(process.cwd(), correction.sourceFigurePath))).digest("hex")).toBe(correction.sourceFigureSha256);
    // Restoring only the authored A25 diagram descriptions must recover the original checkpoint.
    const originalTriples = candidate.questions.map((q) => ({
      paper: q.paper, number: q.number, question: q.question,
      choices: q.paper === "A" && q.number === 25 ? correction.beforeChoiceDescriptions : q.choices,
      officialAnswerNumber: q.officialAnswerNumber,
    }));
    expect(createHash("sha256").update(JSON.stringify(originalTriples)).digest("hex")).toBe(
      "14860181f75d672916813febe8e6d996fed79b097bfa479232549e539c3d2ff0",
    );
    for (const key of [...resolved, ...held]) {
      const q = candidate.questions.find((item) => `2025-${item.paper}${item.number}` === key) as
        (Candidate & { technicalValidation: { decision: string; evidenceFile: string } }) | undefined;
      expect(q).toBeDefined();
      expect(q?.technicalValidation.decision).toBe(resolved.has(key) ? "TECHNICALLY_RESOLVED" : "HOLD");
      const evidence = read<{
        items?: { key: string; choiceChecks: { choice: number; sources: unknown[]; remainingGap: unknown }[] }[];
        questions?: { key: string; choiceChecks: { choice: number; sources: unknown[]; remainingGap: unknown }[] }[];
        patches?: { key: string; choiceChecks: { choice: number; sources: unknown[]; remainingGap: unknown }[] }[];
      }>(q!.technicalValidation.evidenceFile);
      const item = (evidence.items ?? evidence.questions ?? evidence.patches ?? []).find((row) =>
        `2025-${row.key.replace(/^2025-/, "")}` === key,
      );
      expect(item?.choiceChecks.map((c) => c.choice).sort()).toEqual([1, 2, 3, 4]);
      if (resolved.has(key)) {
        expect(item?.choiceChecks.every((c) => c.sources.length > 0 && c.remainingGap == null)).toBe(true);
      }
    }
  });
  it("keeps the prepared and remaining selections disjoint behind the source and acceptance gates", () => {
    const readiness = read<{
      technicallyPreparedSourceIds: string[]; technicalHoldSourceIds: string[];
      missingChoiceCount: number; runtimeImport: boolean; publicAcceptance: boolean;
      independentPublicationAcceptance: boolean; firstPartyOpusAcceptanceReceipt: unknown;
    }>("integration-readiness.json");
    const prepared = new Set(readiness.technicallyPreparedSourceIds);
    const remaining = new Set(readiness.technicalHoldSourceIds);
    expect(prepared.size).toBe(85);
    expect(remaining.size).toBe(16);
    expect([...prepared].every((key) => !remaining.has(key))).toBe(true);
    expect(new Set([...prepared, ...remaining])).toEqual(
      new Set(candidate.questions.map((q) => `2025-${q.paper}${q.number}`)),
    );
    for (const q of candidate.questions) {
      const key = `2025-${q.paper}${q.number}`;
      expect(q.status).toBe(remaining.has(key) ? "HOLD" : "DRAFT");
      expect(q.sourceCopyVerifiedAgainstOfficialHost).toBe(false);
    }
    expect(readiness.missingChoiceCount).toBe(38);
    expect(readiness.runtimeImport).toBe(false);
    expect(readiness.publicAcceptance).toBe(false);
    expect(readiness.independentPublicationAcceptance).toBe(false);
    expect(readiness.firstPartyOpusAcceptanceReceipt).toBeNull();
    const delta = read<{
      newlySupportedChoices: { key: string; choice: number }[];
      items: { choiceChecks: { remainingGap: unknown }[] }[];
    }>("primary-evidence/continuation-20261011-choice-assessment.json");
    expect(delta.newlySupportedChoices.map((c) => `${c.key}:${c.choice}`).sort()).toEqual([
      "2025-A19:1", "2025-A32:2",
    ]);
    expect(delta.items.reduce((count, item) => count + item.choiceChecks.filter((c) => c.remainingGap != null).length, 0)).toBe(38);
  });

});
