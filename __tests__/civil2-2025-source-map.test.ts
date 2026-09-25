import { readFileSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const evidenceDir = path.join(process.cwd(), "docs/evidence/civil2-2025");
const source = JSON.parse(readFileSync(path.join(evidenceDir, "source-map.json"), "utf8")) as {
  status: string;
  questionUrl: string;
  questionSha256: string;
  questionPdfPages: number;
  answerUrl: string;
  answerSha256: string;
  answerPdfPages: number;
  questions: { number: number; pdfPage: number; officialAnswerNumber: number }[];
};
const firstDraft = JSON.parse(readFileSync(path.join(evidenceDir, "q01-draft.json"), "utf8")) as {
  status: string;
  number: number;
  pdfPage: number;
  choices: string[];
  officialAnswerNumber: number;
  figureRequired: boolean;
  explanationReview: string;
};

describe("2025 October civil2 official source map", () => {
  it("pins the civil paper and the first answer table's complete No.1–66", () => {
    expect(source.status).toBe("source-map-only");
    expect(source.questionUrl).toBe("https://www.jctc.jp/wjctcp/wp-content/uploads/2025/10/20251027d_mondaia1.pdf");
    expect(source.answerUrl).toBe("https://www.jctc.jp/wjctcp/wp-content/uploads/2025/10/20251027d_seitou.pdf");
    expect(source.questionSha256).toBe("594b2771831021cf84a0d06039d66889f7870cf9b57abf39314b5c264253e28b");
    expect(source.answerSha256).toBe("62008080111808123eeddacb15747be7da35e2392983cbd63ae8a9bbdf69ce5e");
    expect(source.questionPdfPages).toBe(25);
    expect(source.answerPdfPages).toBe(2);
    expect(source.questions.map((question) => question.number)).toEqual(Array.from({ length: 66 }, (_, index) => index + 1));
    expect(source.questions.every((question) => question.pdfPage >= 2 && question.pdfPage <= 25)).toBe(true);
    expect(source.questions.every((question) => question.officialAnswerNumber >= 1 && question.officialAnswerNumber <= 4)).toBe(true);
    expect(source.questions[0]).toEqual({ number: 1, pdfPage: 2, officialAnswerNumber: 2 });
    expect(source.questions[65]).toEqual({ number: 66, pdfPage: 25, officialAnswerNumber: 3 });
  });

  it("keeps the first verified transcription out of the published question loader", () => {
    expect(firstDraft.status).toBe("source-transcribed-not-published");
    expect(firstDraft.number).toBe(source.questions[0]?.number);
    expect(firstDraft.pdfPage).toBe(source.questions[0]?.pdfPage);
    expect(firstDraft.officialAnswerNumber).toBe(source.questions[0]?.officialAnswerNumber);
    expect(firstDraft.choices).toHaveLength(4);
    expect(firstDraft.figureRequired).toBe(true);
    expect(firstDraft.explanationReview).toBe("pending");
    expect(statSync(path.join(evidenceDir, "q01-figure.png")).size).toBeGreaterThan(1000);
  });
});
