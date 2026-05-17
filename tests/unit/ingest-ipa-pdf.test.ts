import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  ingestPdfText,
  parseAnswers,
  splitQuestions,
} from "@/scripts/ingest-ipa-pdf";

const FIX = join(__dirname, "fixtures");
const qsText = readFileSync(join(FIX, "sample-qs.txt"), "utf-8");
const ansText = readFileSync(join(FIX, "sample-ans.txt"), "utf-8");

describe("splitQuestions", () => {
  it("extracts 4 questions from the sample text", () => {
    const out = splitQuestions(qsText);
    expect(out).toHaveLength(4);
    expect(out.map((q) => q.qNumber)).toEqual([1, 2, 3, 4]);
  });

  it("captures all 4 choices per question", () => {
    const out = splitQuestions(qsText);
    for (const q of out) {
      expect(Object.keys(q.choices).sort()).toEqual(["ア", "イ", "ウ", "エ"].sort());
    }
  });

  it("detects figure references via the hasImage hint", () => {
    const out = splitQuestions(qsText);
    const q3 = out.find((q) => q.qNumber === 3)!;
    expect(q3.hasImage).toBe(true);
    const q1 = out.find((q) => q.qNumber === 1)!;
    expect(q1.hasImage).toBe(false);
  });

  it("preserves the question text without the 問N header", () => {
    const out = splitQuestions(qsText);
    const q1 = out.find((q) => q.qNumber === 1)!;
    expect(q1.question).not.toMatch(/^問\s*1/);
    expect(q1.question).toMatch(/論理積/);
  });

  it("returns choices without the leading 'ア' marker", () => {
    const out = splitQuestions(qsText);
    const q1 = out.find((q) => q.qNumber === 1)!;
    expect(q1.choices["ア"]).toBe("00010010");
    expect(q1.choices["エ"]).toBe("01111110");
  });

  it("returns an empty list for text with no 問 markers", () => {
    expect(splitQuestions("これはテストです。問題ではありません。")).toEqual([]);
  });
});

describe("parseAnswers", () => {
  it("extracts all 4 answers", () => {
    const a = parseAnswers(ansText);
    expect(a).toEqual({ 1: "ア", 2: "ア", 3: "エ", 4: "イ" });
  });

  it("handles plain '1 ア' lines without 問", () => {
    const a = parseAnswers("1 ア\n2 イ\n3 ウ\n");
    expect(a).toEqual({ 1: "ア", 2: "イ", 3: "ウ" });
  });

  it("ignores noise lines", () => {
    const a = parseAnswers("ヘッダ\n問1 ア\nfooter text\n問2 エ\n");
    expect(a).toEqual({ 1: "ア", 2: "エ" });
  });
});

describe("ingestPdfText", () => {
  it("assembles validated Question objects with stable IDs", () => {
    const r = ingestPdfText({
      qsText,
      ansText,
      exam: "ap",
      year: 2023,
      season: "spring",
      session: "am",
    });
    expect(r.stats.extracted).toBe(4);
    expect(r.stats.accepted).toBe(4);
    expect(r.questions.map((q) => q.id)).toEqual([
      "ap-2023h-am-q1",
      "ap-2023h-am-q2",
      "ap-2023h-am-q3",
      "ap-2023h-am-q4",
    ]);
    for (const q of r.questions) {
      expect(q.exam).toBe("ap");
      expect(q.year).toBe(2023);
      expect(q.season).toBe("spring");
      expect(q.session).toBe("am");
      expect(q.license).toBe("IPA-public");
      expect(q.type).toBe("multiple-choice");
      expect(q.sourcePdfUrl).toMatch(/^https:\/\/www\.jitec\.ipa\.go\.jp\//);
      expect(q.explanation.length).toBeGreaterThan(0);
    }
  });

  it("matches the snapshot for the question shape", () => {
    const r = ingestPdfText({
      qsText,
      ansText,
      exam: "ap",
      year: 2023,
      season: "spring",
      session: "am",
    });
    const slim = r.questions.map((q) => ({
      id: q.id,
      qNumber: q.qNumber,
      answer: q.answer,
      hasImage: q.hasImage,
      choiceKeys: Object.keys(q.choices ?? {}).sort(),
    }));
    expect(slim).toMatchInlineSnapshot(`
      [
        {
          "answer": "ア",
          "choiceKeys": [
            "ア",
            "イ",
            "ウ",
            "エ",
          ],
          "hasImage": false,
          "id": "ap-2023h-am-q1",
          "qNumber": 1,
        },
        {
          "answer": "ア",
          "choiceKeys": [
            "ア",
            "イ",
            "ウ",
            "エ",
          ],
          "hasImage": false,
          "id": "ap-2023h-am-q2",
          "qNumber": 2,
        },
        {
          "answer": "エ",
          "choiceKeys": [
            "ア",
            "イ",
            "ウ",
            "エ",
          ],
          "hasImage": true,
          "id": "ap-2023h-am-q3",
          "qNumber": 3,
        },
        {
          "answer": "イ",
          "choiceKeys": [
            "ア",
            "イ",
            "ウ",
            "エ",
          ],
          "hasImage": false,
          "id": "ap-2023h-am-q4",
          "qNumber": 4,
        },
      ]
    `);
  });

  it("reports issues when answers are missing", () => {
    const r = ingestPdfText({
      qsText,
      ansText: "問1 ア\n問2 ア",
      exam: "ap",
      year: 2023,
      season: "spring",
      session: "am",
    });
    expect(r.stats.accepted).toBe(2);
    expect(r.stats.skipped).toBe(2);
    expect(r.issues.filter((i) => i.message.includes("answer missing"))).toHaveLength(2);
  });

  it("flags an answer that does not match the extracted choices", () => {
    const r = ingestPdfText({
      qsText,
      ansText: "問1 オ\n問2 ア\n問3 エ\n問4 イ",
      exam: "ap",
      year: 2023,
      season: "spring",
      session: "am",
    });
    const offending = r.issues.find((i) => i.qNumber === 1);
    expect(offending?.message).toMatch(/not in extracted choices/);
    expect(r.stats.accepted).toBe(3);
  });

  it("throws on an unknown exam code", () => {
    expect(() =>
      ingestPdfText({
        qsText,
        ansText,
        // @ts-expect-error testing runtime guard
        exam: "xx",
        year: 2023,
        season: "spring",
        session: "am",
      }),
    ).toThrow(/Unknown exam code/);
  });

  it("throws when the session does not belong to the exam", () => {
    expect(() =>
      ingestPdfText({
        qsText,
        ansText,
        exam: "ap",
        year: 2023,
        season: "spring",
        // AP only has "am", not "am1"
        session: "am1",
      }),
    ).toThrow(/Unknown session/);
  });
});
