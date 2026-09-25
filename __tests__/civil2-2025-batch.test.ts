import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { CIVIL2_2025_QUESTIONS, CIVIL2_2026_QUESTIONS, CIVIL2_QUESTIONS } from "@/data/questions/civil2";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";

const evidenceDir = path.join(process.cwd(), "docs/evidence/civil2-2025");
const sourceMap = JSON.parse(readFileSync(path.join(evidenceDir, "source-map.json"), "utf8")) as {
  questionUrl: string;
  answerUrl: string;
  questions: { number: number; pdfPage: number; officialAnswerNumber: number }[];
};
const candidate = JSON.parse(readFileSync(path.join(process.cwd(), "data/questions/civil2/2025-october-batch-06-10.json"), "utf8")) as {
  questionSha256: string;
  answerSha256: string;
  questions: { number: number; pdfPage: number; officialAnswerNumber: number }[];
};
const finalReview = JSON.parse(readFileSync(path.join(evidenceDir, "q06-10-opus-review-final-raw.json"), "utf8")) as {
  modelUsage: Record<string, { canonicalModel: string; provider: string }>;
  result: string;
};
const receipt = JSON.parse(readFileSync(path.join(evidenceDir, "q06-10-release-receipt.json"), "utf8")) as {
  canonicalQuestionsSha256: string;
  questionNumbers: number[];
  officialAnswerNumbers: number[];
  figuresRequired: number;
};

describe("2025年10月2級土木施工管理・照合済みNo.6〜10", () => {
  it("publishes a distinct five-question edition with exact official keys", () => {
    expect(CIVIL2_2026_QUESTIONS).toHaveLength(66);
    expect(CIVIL2_2025_QUESTIONS).toHaveLength(34);
    expect(CIVIL2_QUESTIONS).toHaveLength(100);
    expect(EXAM_CONFIGS.civil2.yearRange).toEqual({ start: 2025, end: 2026 });
    expect(EXAM_CONFIGS.civil2.seasons).toContain("october");
    expect(candidate.questions.map((question) => question.number)).toEqual([6, 7, 8, 9, 10]);
    expect(candidate.questions.map((question) => question.officialAnswerNumber)).toEqual([1, 1, 2, 3, 2]);
    expect(receipt.questionNumbers).toEqual(candidate.questions.map((question) => question.number));
    expect(receipt.officialAnswerNumbers).toEqual(candidate.questions.map((question) => question.officialAnswerNumber));
    expect(receipt.figuresRequired).toBe(0);
    for (const [index, question] of CIVIL2_2025_QUESTIONS.slice(0, 5).entries()) {
      const record = candidate.questions[index]!;
      expect(record).toMatchObject(sourceMap.questions[record.number - 1]!);
      expect(question.qNumber).toBe(record.number);
      expect(question.officialAnswerNumber).toBe(String(record.officialAnswerNumber));
      expect(question.year).toBe(2025);
      expect(question.season).toBe("october");
      expect(question.sourcePdfUrl).toBe(sourceMap.questionUrl);
      expect(question.sourceAnswerUrl).toBe(sourceMap.answerUrl);
      expect(Object.keys(question.choices ?? {})).toEqual(["ア", "イ", "ウ", "エ"]);
      expect(Object.keys(question.choiceExplanations ?? {})).toEqual(["ア", "イ", "ウ", "エ"]);
      expect(Object.values(question.choiceExplanations ?? {}).every((reason) => reason.trim().length > 15)).toBe(true);
      expect(question.hasImage).toBe(false);
      const [, , exam, yearSeason, section, qnum] = questionPagePath(question).split("/");
      expect(findQuestionByRoute(CIVIL2_QUESTIONS, { exam, yearSeason, section, qnum })?.id).toBe(question.id);
    }
  });

  it("uses the pinned official PDFs and an explicit first-party Opus final review", () => {
    expect(candidate.questionSha256).toBe("594b2771831021cf84a0d06039d66889f7870cf9b57abf39314b5c264253e28b");
    expect(candidate.answerSha256).toBe("62008080111808123eeddacb15747be7da35e2392983cbd63ae8a9bbdf69ce5e");
    expect(createHash("sha256").update(JSON.stringify(candidate.questions)).digest("hex")).toBe(receipt.canonicalQuestionsSha256);
    expect(Object.keys(finalReview.modelUsage)).toEqual(["claude-opus-5-5"]);
    expect(finalReview.modelUsage["claude-opus-5-5"]).toMatchObject({ canonicalModel: "claude-opus-5-5", provider: "firstParty" });
    const result = JSON.parse(finalReview.result) as {
      overallVerdict: string;
      reviews: { number: number; verdict: string; issues: string[] }[];
    };
    expect(result.overallVerdict).toBe("PASS");
    expect(result.reviews.map((review) => review.number)).toEqual([6, 7, 8, 9, 10]);
    expect(result.reviews.every((review) => review.verdict === "PASS" && review.issues.length === 0)).toBe(true);
  });
});

describe("2025年10月2級土木施工管理・照合済みNo.37〜39", () => {
  const batch = JSON.parse(readFileSync(path.join(process.cwd(), "data/questions/civil2/2025-october-batch-37-39.json"), "utf8")) as Omit<typeof candidate, "questions"> & {
    questionUrl: string;
    answerUrl: string;
    questions: (typeof candidate.questions[number] & { choices: string[]; choiceExplanations: string[] })[];
  };
  const review = JSON.parse(readFileSync(path.join(evidenceDir, "q37-39-opus-review-final-raw.json"), "utf8")) as typeof finalReview;
  const batchReceipt = JSON.parse(readFileSync(path.join(evidenceDir, "q37-39-release-receipt.json"), "utf8")) as typeof receipt;

  it("maps three legal questions to the official page, keys and routes", () => {
    expect(batch.questions.map((item) => item.number)).toEqual([37, 38, 39]);
    expect(batch.questions.map((item) => item.officialAnswerNumber)).toEqual([1, 4, 2]);
    expect(batch.questions.map((item) => item.pdfPage)).toEqual([15, 15, 15]);
    expect(batch.questions.map((item) => item.number)).toEqual(batchReceipt.questionNumbers);
    expect(batch.questions.map((item) => item.officialAnswerNumber)).toEqual(batchReceipt.officialAnswerNumbers);
    expect(batchReceipt.figuresRequired).toBe(0);
    expect(batch.questionUrl).toBe(sourceMap.questionUrl);
    expect(batch.answerUrl).toBe(sourceMap.answerUrl);
    for (const [index, record] of batch.questions.entries()) {
      const question = CIVIL2_2025_QUESTIONS[index + 31]!;
      expect(record).toMatchObject(sourceMap.questions[record.number - 1]!);
      expect(question.qNumber).toBe(record.number);
      expect(question.officialAnswerNumber).toBe(String(record.officialAnswerNumber));
      expect(Object.values(question.choices ?? {})).toEqual(record.choices);
      expect(Object.values(question.choiceExplanations ?? {})).toEqual(record.choiceExplanations);
      expect(record.choiceExplanations.every((reason) => reason.trim().length > 15)).toBe(true);
      expect(question.hasImage).toBe(false);
      const [, , exam, yearSeason, section, qnum] = questionPagePath(question).split("/");
      expect(findQuestionByRoute(CIVIL2_QUESTIONS, { exam, yearSeason, section, qnum })?.id).toBe(question.id);
    }
  });

  it("pins source hashes and actual first-party Opus 5.5 legal review", () => {
    expect(batch.questionSha256).toBe("594b2771831021cf84a0d06039d66889f7870cf9b57abf39314b5c264253e28b");
    expect(batch.answerSha256).toBe("62008080111808123eeddacb15747be7da35e2392983cbd63ae8a9bbdf69ce5e");
    expect(createHash("sha256").update(JSON.stringify(batch.questions)).digest("hex")).toBe(batchReceipt.canonicalQuestionsSha256);
    expect(Object.keys(review.modelUsage)).toEqual(["claude-opus-5-5"]);
    expect(review.modelUsage["claude-opus-5-5"]).toMatchObject({ canonicalModel: "claude-opus-5-5", provider: "firstParty" });
    const result = JSON.parse(review.result.replace(/^```json\s*|\s*```$/g, "")) as {
      overallVerdict: string;
      reviews: { number: number; verdict: string; issues: string[] }[];
    };
    expect(result.overallVerdict).toBe("PASS");
    expect(result.reviews.map((item) => item.number)).toEqual([37, 38, 39]);
    expect(result.reviews.every((item) => item.verdict === "PASS" && item.issues.length === 0)).toBe(true);
  });
});

describe("2025年10月2級土木施工管理・照合済みNo.33〜36", () => {
  const batches = ([
    { label: "33-35", numbers: [33, 34, 35], answers: [4, 1, 3], pages: [13, 13, 13], offset: 27, figures: 0 },
    { label: "36", numbers: [36], answers: [4], pages: [14], offset: 30, figures: 1 },
  ] as const).map((config) => ({
    ...config,
    data: JSON.parse(readFileSync(path.join(process.cwd(), `data/questions/civil2/2025-october-batch-${config.label}.json`), "utf8")) as {
      questionSha256: string;
      answerSha256: string;
      questionUrl: string;
      answerUrl: string;
      questions: { number: number; pdfPage: number; officialAnswerNumber: number; choices: string[]; choiceExplanations: string[]; imageUrl?: string }[];
    },
    review: JSON.parse(readFileSync(path.join(evidenceDir, `q${config.label}-opus-review-final-raw.json`), "utf8")) as typeof finalReview,
    receipt: JSON.parse(readFileSync(path.join(evidenceDir, `q${config.label}-release-receipt.json`), "utf8")) as typeof receipt & {
      figure?: { publicPath: string; sha256: string; clipRectPdfPoints: number[] };
    },
  }));

  for (const batch of batches) {
    it(`maps No.${batch.label} to the official source and Opus 5.5 receipt`, () => {
      expect(batch.data.questions.map((item) => item.number)).toEqual(batch.numbers);
      expect(batch.data.questions.map((item) => item.officialAnswerNumber)).toEqual(batch.answers);
      expect(batch.data.questions.map((item) => item.pdfPage)).toEqual(batch.pages);
      expect(batch.data.questions.map((item) => item.number)).toEqual(batch.receipt.questionNumbers);
      expect(batch.data.questions.map((item) => item.officialAnswerNumber)).toEqual(batch.receipt.officialAnswerNumbers);
      expect(batch.receipt.figuresRequired).toBe(batch.figures);
      expect(batch.data.questionUrl).toBe(sourceMap.questionUrl);
      expect(batch.data.answerUrl).toBe(sourceMap.answerUrl);
      expect(batch.data.questionSha256).toBe("594b2771831021cf84a0d06039d66889f7870cf9b57abf39314b5c264253e28b");
      expect(batch.data.answerSha256).toBe("62008080111808123eeddacb15747be7da35e2392983cbd63ae8a9bbdf69ce5e");
      expect(createHash("sha256").update(JSON.stringify(batch.data.questions)).digest("hex")).toBe(batch.receipt.canonicalQuestionsSha256);
      for (const [index, record] of batch.data.questions.entries()) {
        const question = CIVIL2_2025_QUESTIONS[batch.offset + index]!;
        expect(record).toMatchObject(sourceMap.questions[record.number - 1]!);
        expect(question.qNumber).toBe(record.number);
        expect(question.officialAnswerNumber).toBe(String(record.officialAnswerNumber));
        expect(Object.values(question.choices ?? {})).toEqual(record.choices);
        expect(Object.values(question.choiceExplanations ?? {})).toEqual(record.choiceExplanations);
        expect(record.choiceExplanations.every((reason) => reason.trim().length > 15)).toBe(true);
        expect(question.hasImage).toBe(Boolean(record.imageUrl));
        const [, , exam, yearSeason, section, qnum] = questionPagePath(question).split("/");
        expect(findQuestionByRoute(CIVIL2_QUESTIONS, { exam, yearSeason, section, qnum })?.id).toBe(question.id);
      }
      expect(Object.keys(batch.review.modelUsage)).toEqual(["claude-opus-5-5"]);
      expect(batch.review.modelUsage["claude-opus-5-5"]).toMatchObject({ canonicalModel: "claude-opus-5-5", provider: "firstParty" });
      const result = JSON.parse(batch.review.result) as { overallVerdict: string; reviews: { number: number; verdict: string; issues: string[] }[] };
      expect(result.overallVerdict).toBe("PASS");
      expect(result.reviews.map((item) => item.number)).toEqual(batch.numbers);
      expect(result.reviews.every((item) => item.verdict === "PASS" && item.issues.length === 0)).toBe(true);
    });
  }

  it("keeps the official No.36 diagram available and byte-pinned", () => {
    const figure = batches[1]!.receipt.figure!;
    expect(figure.publicPath).toBe("/questions/civil2/2025-october/q36-official-figure.png");
    expect(figure.clipRectPdfPoints).toEqual([60, 210, 550, 310]);
    expect(createHash("sha256").update(readFileSync(path.join(process.cwd(), "public", figure.publicPath.slice(1)))).digest("hex")).toBe(figure.sha256);
    expect(CIVIL2_2025_QUESTIONS[30]?.imageUrls).toEqual([figure.publicPath]);
  });
});

describe("2025年10月2級土木施工管理・照合済みNo.29〜32", () => {
  const batch = JSON.parse(readFileSync(path.join(process.cwd(), "data/questions/civil2/2025-october-batch-29-32.json"), "utf8")) as Omit<typeof candidate, "questions"> & {
    questionUrl: string;
    answerUrl: string;
    questions: (typeof candidate.questions[number] & { choices: string[]; choiceExplanations: string[] })[];
  };
  const review = JSON.parse(readFileSync(path.join(evidenceDir, "q29-32-opus-review-raw.json"), "utf8")) as typeof finalReview;
  const batchReceipt = JSON.parse(readFileSync(path.join(evidenceDir, "q29-32-release-receipt.json"), "utf8")) as typeof receipt & {
    ocr: { status: string; requestedModel: string; resolvedModelReportedByCli: string | null };
  };

  it("maps all four questions to the official page, answers and routed explanations", () => {
    expect(batch.questions.map((question) => question.number)).toEqual([29, 30, 31, 32]);
    expect(batch.questions.map((question) => question.officialAnswerNumber)).toEqual([2, 1, 2, 2]);
    expect(batch.questions.map((question) => question.pdfPage)).toEqual([12, 12, 12, 12]);
    expect(batch.questions.map((question) => question.number)).toEqual(batchReceipt.questionNumbers);
    expect(batch.questions.map((question) => question.officialAnswerNumber)).toEqual(batchReceipt.officialAnswerNumbers);
    expect(batchReceipt.figuresRequired).toBe(0);
    expect(batch.questionUrl).toBe(sourceMap.questionUrl);
    expect(batch.answerUrl).toBe(sourceMap.answerUrl);
    for (const [index, record] of batch.questions.entries()) {
      const question = CIVIL2_2025_QUESTIONS[index + 23]!;
      expect(record).toMatchObject(sourceMap.questions[record.number - 1]!);
      expect(question.qNumber).toBe(record.number);
      expect(question.officialAnswerNumber).toBe(String(record.officialAnswerNumber));
      expect(Object.values(question.choices ?? {})).toEqual(record.choices);
      expect(Object.values(question.choiceExplanations ?? {})).toEqual(record.choiceExplanations);
      expect(record.choiceExplanations.every((reason) => reason.trim().length > 15)).toBe(true);
      expect(question.hasImage).toBe(false);
      const [, , exam, yearSeason, section, qnum] = questionPagePath(question).split("/");
      expect(findQuestionByRoute(CIVIL2_QUESTIONS, { exam, yearSeason, section, qnum })?.id).toBe(question.id);
    }
  });

  it("pins actual Antigravity OCR usage and first-party Opus 5.5 review", () => {
    expect(batch.questionSha256).toBe("594b2771831021cf84a0d06039d66889f7870cf9b57abf39314b5c264253e28b");
    expect(batch.answerSha256).toBe("62008080111808123eeddacb15747be7da35e2392983cbd63ae8a9bbdf69ce5e");
    expect(createHash("sha256").update(JSON.stringify(batch.questions)).digest("hex")).toBe(batchReceipt.canonicalQuestionsSha256);
    expect(batchReceipt.ocr).toMatchObject({ status: "SUCCESS", requestedModel: "gemini-3.1-pro-high", resolvedModelReportedByCli: null });
    expect(Object.keys(review.modelUsage)).toEqual(["claude-opus-5-5"]);
    expect(review.modelUsage["claude-opus-5-5"]).toMatchObject({ canonicalModel: "claude-opus-5-5", provider: "firstParty" });
    const result = JSON.parse(review.result) as {
      overallVerdict: string;
      reviews: { number: number; verdict: string; issues: string[] }[];
    };
    expect(result.overallVerdict).toBe("PASS");
    expect(result.reviews.map((item) => item.number)).toEqual([29, 30, 31, 32]);
    expect(result.reviews.every((item) => item.verdict === "PASS" && item.issues.length === 0)).toBe(true);
  });
});

describe("2025年10月2級土木施工管理・照合済みNo.25〜28", () => {
  const batch = JSON.parse(readFileSync(path.join(process.cwd(), "data/questions/civil2/2025-october-batch-25-28.json"), "utf8")) as Omit<typeof candidate, "questions"> & {
    questionUrl: string;
    answerUrl: string;
    questions: (typeof candidate.questions[number] & { choices: string[]; choiceExplanations: string[] })[];
  };
  const review = JSON.parse(readFileSync(path.join(evidenceDir, "q25-28-opus-review-final-raw.json"), "utf8")) as typeof finalReview;
  const batchReceipt = JSON.parse(readFileSync(path.join(evidenceDir, "q25-28-release-receipt.json"), "utf8")) as typeof receipt;

  it("maps all four questions to the official page, answers and routed explanations", () => {
    expect(batch.questions.map((question) => question.number)).toEqual([25, 26, 27, 28]);
    expect(batch.questions.map((question) => question.officialAnswerNumber)).toEqual([1, 1, 4, 4]);
    expect(batch.questions.map((question) => question.pdfPage)).toEqual([11, 11, 11, 11]);
    expect(batch.questions.map((question) => question.number)).toEqual(batchReceipt.questionNumbers);
    expect(batch.questions.map((question) => question.officialAnswerNumber)).toEqual(batchReceipt.officialAnswerNumbers);
    expect(batchReceipt.figuresRequired).toBe(0);
    expect(batch.questionUrl).toBe(sourceMap.questionUrl);
    expect(batch.answerUrl).toBe(sourceMap.answerUrl);
    for (const [index, record] of batch.questions.entries()) {
      const question = CIVIL2_2025_QUESTIONS[index + 19]!;
      expect(record).toMatchObject(sourceMap.questions[record.number - 1]!);
      expect(question.qNumber).toBe(record.number);
      expect(question.officialAnswerNumber).toBe(String(record.officialAnswerNumber));
      expect(Object.values(question.choices ?? {})).toEqual(record.choices);
      expect(Object.values(question.choiceExplanations ?? {})).toEqual(record.choiceExplanations);
      expect(record.choiceExplanations.every((reason) => reason.trim().length > 15)).toBe(true);
      expect(question.hasImage).toBe(false);
      const [, , exam, yearSeason, section, qnum] = questionPagePath(question).split("/");
      expect(findQuestionByRoute(CIVIL2_QUESTIONS, { exam, yearSeason, section, qnum })?.id).toBe(question.id);
    }
  });

  it("pins the official bytes and actual first-party Opus 5.5 review", () => {
    expect(batch.questionSha256).toBe("594b2771831021cf84a0d06039d66889f7870cf9b57abf39314b5c264253e28b");
    expect(batch.answerSha256).toBe("62008080111808123eeddacb15747be7da35e2392983cbd63ae8a9bbdf69ce5e");
    expect(createHash("sha256").update(JSON.stringify(batch.questions)).digest("hex")).toBe(batchReceipt.canonicalQuestionsSha256);
    expect(Object.keys(review.modelUsage)).toEqual(["claude-opus-5-5"]);
    expect(review.modelUsage["claude-opus-5-5"]).toMatchObject({ canonicalModel: "claude-opus-5-5", provider: "firstParty" });
    const result = JSON.parse(review.result.replace(/^```json\s*|\s*```$/g, "")) as {
      overallVerdict: string;
      reviews: { number: number; verdict: string; issues: string[] }[];
    };
    expect(result.overallVerdict).toBe("PASS");
    expect(result.reviews.map((item) => item.number)).toEqual([25, 26, 27, 28]);
    expect(result.reviews.every((item) => item.verdict === "PASS" && item.issues.length === 0)).toBe(true);
  });
});

describe("2025年10月2級土木施工管理・照合済みNo.21〜24", () => {
  const batch = JSON.parse(readFileSync(path.join(process.cwd(), "data/questions/civil2/2025-october-batch-21-24.json"), "utf8")) as Omit<typeof candidate, "questions"> & {
    questionUrl: string;
    answerUrl: string;
    questions: (typeof candidate.questions[number] & { choices: string[]; choiceExplanations: string[] })[];
  };
  const review = JSON.parse(readFileSync(path.join(evidenceDir, "q21-24-opus-review-final-raw.json"), "utf8")) as typeof finalReview;
  const batchReceipt = JSON.parse(readFileSync(path.join(evidenceDir, "q21-24-release-receipt.json"), "utf8")) as typeof receipt;

  it("maps all four questions to the official page, answers and routed explanations", () => {
    expect(batch.questions.map((question) => question.number)).toEqual([21, 22, 23, 24]);
    expect(batch.questions.map((question) => question.officialAnswerNumber)).toEqual([3, 2, 3, 4]);
    expect(batch.questions.map((question) => question.pdfPage)).toEqual([10, 10, 10, 10]);
    expect(batch.questions.map((question) => question.number)).toEqual(batchReceipt.questionNumbers);
    expect(batch.questions.map((question) => question.officialAnswerNumber)).toEqual(batchReceipt.officialAnswerNumbers);
    expect(batchReceipt.figuresRequired).toBe(0);
    expect(batch.questionUrl).toBe(sourceMap.questionUrl);
    expect(batch.answerUrl).toBe(sourceMap.answerUrl);
    for (const [index, record] of batch.questions.entries()) {
      const question = CIVIL2_2025_QUESTIONS[index + 15]!;
      expect(record).toMatchObject(sourceMap.questions[record.number - 1]!);
      expect(question.qNumber).toBe(record.number);
      expect(question.officialAnswerNumber).toBe(String(record.officialAnswerNumber));
      expect(Object.values(question.choices ?? {})).toEqual(record.choices);
      expect(Object.values(question.choiceExplanations ?? {})).toEqual(record.choiceExplanations);
      expect(record.choiceExplanations.every((reason) => reason.trim().length > 15)).toBe(true);
      expect(question.hasImage).toBe(false);
      const [, , exam, yearSeason, section, qnum] = questionPagePath(question).split("/");
      expect(findQuestionByRoute(CIVIL2_QUESTIONS, { exam, yearSeason, section, qnum })?.id).toBe(question.id);
    }
  });

  it("pins the official bytes and actual first-party Opus 5.5 review", () => {
    expect(batch.questionSha256).toBe("594b2771831021cf84a0d06039d66889f7870cf9b57abf39314b5c264253e28b");
    expect(batch.answerSha256).toBe("62008080111808123eeddacb15747be7da35e2392983cbd63ae8a9bbdf69ce5e");
    expect(createHash("sha256").update(JSON.stringify(batch.questions)).digest("hex")).toBe(batchReceipt.canonicalQuestionsSha256);
    expect(Object.keys(review.modelUsage)).toEqual(["claude-opus-5-5"]);
    expect(review.modelUsage["claude-opus-5-5"]).toMatchObject({ canonicalModel: "claude-opus-5-5", provider: "firstParty" });
    const result = JSON.parse(review.result.replace(/^```json\s*|\s*```$/g, "")) as {
      overallVerdict: string;
      reviews: { number: number; verdict: string; issues: string[] }[];
    };
    expect(result.overallVerdict).toBe("PASS");
    expect(result.reviews.map((item) => item.number)).toEqual([21, 22, 23, 24]);
    expect(result.reviews.every((item) => item.verdict === "PASS" && item.issues.length === 0)).toBe(true);
  });
});

describe("2025年10月2級土木施工管理・照合済みNo.17〜20", () => {
  const batch = JSON.parse(readFileSync(path.join(process.cwd(), "data/questions/civil2/2025-october-batch-17-20.json"), "utf8")) as Omit<typeof candidate, "questions"> & {
    questionUrl: string;
    answerUrl: string;
    questions: (typeof candidate.questions[number] & { choices: string[]; choiceExplanations: string[] })[];
  };
  const review = JSON.parse(readFileSync(path.join(evidenceDir, "q17-20-opus-review-final-raw.json"), "utf8")) as typeof finalReview;
  const batchReceipt = JSON.parse(readFileSync(path.join(evidenceDir, "q17-20-release-receipt.json"), "utf8")) as typeof receipt;

  it("maps all four questions to the official page, answers and routed explanations", () => {
    expect(batch.questions.map((question) => question.number)).toEqual([17, 18, 19, 20]);
    expect(batch.questions.map((question) => question.officialAnswerNumber)).toEqual([2, 3, 3, 1]);
    expect(batch.questions.map((question) => question.pdfPage)).toEqual([9, 9, 9, 9]);
    expect(batch.questions.map((question) => question.number)).toEqual(batchReceipt.questionNumbers);
    expect(batch.questions.map((question) => question.officialAnswerNumber)).toEqual(batchReceipt.officialAnswerNumbers);
    expect(batchReceipt.figuresRequired).toBe(0);
    expect(batch.questionUrl).toBe(sourceMap.questionUrl);
    expect(batch.answerUrl).toBe(sourceMap.answerUrl);
    for (const [index, record] of batch.questions.entries()) {
      const question = CIVIL2_2025_QUESTIONS[index + 11]!;
      expect(record).toMatchObject(sourceMap.questions[record.number - 1]!);
      expect(question.qNumber).toBe(record.number);
      expect(question.officialAnswerNumber).toBe(String(record.officialAnswerNumber));
      expect(Object.values(question.choices ?? {})).toEqual(record.choices);
      expect(Object.values(question.choiceExplanations ?? {})).toEqual(record.choiceExplanations);
      expect(record.choiceExplanations.every((reason) => reason.trim().length > 15)).toBe(true);
      expect(question.hasImage).toBe(false);
      const [, , exam, yearSeason, section, qnum] = questionPagePath(question).split("/");
      expect(findQuestionByRoute(CIVIL2_QUESTIONS, { exam, yearSeason, section, qnum })?.id).toBe(question.id);
    }
  });

  it("pins the official bytes and actual first-party Opus 5.5 review", () => {
    expect(batch.questionSha256).toBe("594b2771831021cf84a0d06039d66889f7870cf9b57abf39314b5c264253e28b");
    expect(batch.answerSha256).toBe("62008080111808123eeddacb15747be7da35e2392983cbd63ae8a9bbdf69ce5e");
    expect(createHash("sha256").update(JSON.stringify(batch.questions)).digest("hex")).toBe(batchReceipt.canonicalQuestionsSha256);
    expect(Object.keys(review.modelUsage)).toEqual(["claude-opus-5-5"]);
    expect(review.modelUsage["claude-opus-5-5"]).toMatchObject({ canonicalModel: "claude-opus-5-5", provider: "firstParty" });
    const result = JSON.parse(review.result.replace(/^```json\s*|\s*```$/g, "")) as {
      overallVerdict: string;
      reviews: { number: number; verdict: string; issues: string[] }[];
    };
    expect(result.overallVerdict).toBe("PASS");
    expect(result.reviews.map((item) => item.number)).toEqual([17, 18, 19, 20]);
    expect(result.reviews.every((item) => item.verdict === "PASS" && item.issues.length === 0)).toBe(true);
  });
});

describe("2025年10月2級土木施工管理・照合済みNo.11〜16", () => {
  const batch = JSON.parse(readFileSync(path.join(process.cwd(), "data/questions/civil2/2025-october-batch-11-16.json"), "utf8")) as Omit<typeof candidate, "questions"> & {
    questionUrl: string;
    answerUrl: string;
    questions: (typeof candidate.questions[number] & { choices: string[]; choiceExplanations: string[] })[];
  };
  const review = JSON.parse(readFileSync(path.join(evidenceDir, "q11-16-opus-review-final-raw.json"), "utf8")) as typeof finalReview;
  const batchReceipt = JSON.parse(readFileSync(path.join(evidenceDir, "q11-16-release-receipt.json"), "utf8")) as typeof receipt;

  it("maps all six questions to the official pages, answers and routed explanations", () => {
    expect(batch.questions.map((question) => question.number)).toEqual([11, 12, 13, 14, 15, 16]);
    expect(batch.questions.map((question) => question.officialAnswerNumber)).toEqual([3, 2, 1, 4, 1, 3]);
    expect(batch.questions.map((question) => question.pdfPage)).toEqual([7, 7, 8, 8, 8, 8]);
    expect(batch.questions.map((question) => question.number)).toEqual(batchReceipt.questionNumbers);
    expect(batch.questions.map((question) => question.officialAnswerNumber)).toEqual(batchReceipt.officialAnswerNumbers);
    expect(batchReceipt.figuresRequired).toBe(0);
    expect(batch.questionUrl).toBe(sourceMap.questionUrl);
    expect(batch.answerUrl).toBe(sourceMap.answerUrl);
    for (const [index, record] of batch.questions.entries()) {
      const question = CIVIL2_2025_QUESTIONS[index + 5]!;
      expect(record).toMatchObject(sourceMap.questions[record.number - 1]!);
      expect(question.qNumber).toBe(record.number);
      expect(question.officialAnswerNumber).toBe(String(record.officialAnswerNumber));
      expect(Object.values(question.choices ?? {})).toEqual(record.choices);
      expect(Object.values(question.choiceExplanations ?? {})).toEqual(record.choiceExplanations);
      expect(record.choiceExplanations.every((reason) => reason.trim().length > 15)).toBe(true);
      expect(question.hasImage).toBe(false);
      const [, , exam, yearSeason, section, qnum] = questionPagePath(question).split("/");
      expect(findQuestionByRoute(CIVIL2_QUESTIONS, { exam, yearSeason, section, qnum })?.id).toBe(question.id);
    }
  });

  it("pins the exact source bytes and verified first-party Opus 5.5 review", () => {
    expect(batch.questionSha256).toBe("594b2771831021cf84a0d06039d66889f7870cf9b57abf39314b5c264253e28b");
    expect(batch.answerSha256).toBe("62008080111808123eeddacb15747be7da35e2392983cbd63ae8a9bbdf69ce5e");
    expect(createHash("sha256").update(JSON.stringify(batch.questions)).digest("hex")).toBe(batchReceipt.canonicalQuestionsSha256);
    expect(Object.keys(review.modelUsage)).toEqual(["claude-opus-5-5"]);
    expect(review.modelUsage["claude-opus-5-5"]).toMatchObject({ canonicalModel: "claude-opus-5-5", provider: "firstParty" });
    const result = JSON.parse(review.result) as { overallVerdict: string; reviews: { number: number; verdict: string; issues: string[] }[] };
    expect(result.overallVerdict).toBe("PASS");
    expect(result.reviews.map((item) => item.number)).toEqual([11, 12, 13, 14, 15, 16]);
    expect(result.reviews.every((item) => item.verdict === "PASS" && item.issues.length === 0)).toBe(true);
  });
});
