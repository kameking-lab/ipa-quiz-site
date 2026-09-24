import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import {
  isGovernmentPrimarySourceUrl,
  parseExamChoiceExplanation,
} from "@/lib/exam-library-choice-explanations";
import type { ExamQuestion } from "@/lib/exam-library-model";

const question: ExamQuestion = {
  id: "cskohyo-TEST-q1",
  number: 1,
  text: "問1 正しいものはどれか。",
  images: ["/exam-library/cskohyo-TEST/q1-p1-0.webp"],
  correctChoice: 3,
  choiceCount: 5,
  answerAuthority: "official",
};
const sourceHash = createHash("sha256").update(question.text).digest("hex");
const reason = (number: number) =>
  `選択肢${number}について、設問の条件と根拠規定を照合し、正誤の理由を個別に説明する十分な長さの本文です。`;
const valid = {
  sourceHash,
  correctChoice: 3,
  summary: "設問の判断基準を示し、正答と四つの誤答を順に確認します。",
  choices: [1, 2, 3, 4, 5].map((number) => ({
    number,
    verdict: number === 3 ? "correct" : "incorrect",
    reason: reason(number),
  })),
  sources: [
    { title: "e-Gov 労働安全衛生法", url: "https://laws.e-gov.go.jp/law/347AC0000000057" },
    { title: "厚生労働省資料", url: "https://www.mhlw.go.jp/stf/example.html" },
  ],
};

describe("structured choice explanations", () => {
  it("accepts all five choice reasons tied to the current source and official answer", () => {
    expect(parseExamChoiceExplanation(valid, question, sourceHash)).toMatchObject({
      correctChoice: 3,
      choices: [
        { number: 1, verdict: "incorrect" },
        { number: 2, verdict: "incorrect" },
        { number: 3, verdict: "correct" },
        { number: 4, verdict: "incorrect" },
        { number: 5, verdict: "incorrect" },
      ],
    });
  });

  it.each([
    { ...valid, sourceHash: "0".repeat(64) },
    { ...valid, correctChoice: 2 },
    { ...valid, choices: valid.choices.slice(0, 4) },
    { ...valid, choices: valid.choices.map((choice) => ({ ...choice, verdict: "correct" })) },
    { ...valid, choices: valid.choices.map((choice) => choice.number === 5 ? { ...choice, number: 4 } : choice) },
    { ...valid, choices: valid.choices.map((choice) => choice.number === 2 ? { ...choice, reason: "短い" } : choice) },
  ])("rejects stale, incomplete or answer-inconsistent overlays", (candidate) => {
    expect(parseExamChoiceExplanation(candidate, question, sourceHash)).toBeNull();
  });

  it("accepts only HTTPS Japanese government hosts for explanatory evidence", () => {
    for (const url of [
      "https://laws.e-gov.go.jp/law/347AC0000000057",
      "https://www.mhlw.go.jp/stf/example.html",
      "https://www.jniosh.johas.go.jp/publication/example.html",
    ]) {
      expect(isGovernmentPrimarySourceUrl(url)).toBe(true);
    }
    for (const url of [
      "http://www.mhlw.go.jp/example",
      "https:/www.mhlw.go.jp/example",
      "https:www.mhlw.go.jp/example",
      "https:///www.mhlw.go.jp/example",
      "https://www.exam.or.jp/example.pdf",
      "https://www.jaish.gr.jp/example",
      "https://webdesk.jsa.or.jp/example.pdf",
      "https://go.jp.example.com/phishing",
      "https://go.jp/",
      " https://www.mhlw.go.jp/example",
      "https://www.mhlw.go.jp/example ",
    ]) {
      expect(isGovernmentPrimarySourceUrl(url)).toBe(false);
      expect(parseExamChoiceExplanation({
        ...valid,
        sources: [{ title: "不許可の資料", url }],
      }, question, sourceHash)).toBeNull();
    }
  });

  it("does not attach choice overlays to unscored or descriptive questions", () => {
    expect(parseExamChoiceExplanation(valid, { ...question, answerAuthority: "unconfirmed", correctChoice: null }, sourceHash)).toBeNull();
    expect(parseExamChoiceExplanation(valid, { ...question, answerAuthority: "descriptive", correctChoice: null, choiceCount: 0 }, sourceHash)).toBeNull();
  });

  it("keeps every clickable evidence link in the validated sources list", () => {
    expect(parseExamChoiceExplanation({
      ...valid,
      summary: "判断基準は[外部資料](https://example.com/unsafe)を参照します。",
    }, question, sourceHash)).toBeNull();
    expect(parseExamChoiceExplanation({
      ...valid,
      choices: valid.choices.map((choice) => choice.number === 1
        ? { ...choice, reason: `${choice.reason} https://example.com/unsafe` }
        : choice),
    }, question, sourceHash)).toBeNull();
  });

  it("uses verdicts for answer selection even when the stem asks for the incorrect statement", () => {
    const negativeQuestion = { ...question, text: "問1 誤っているものはどれか。" };
    const hash = createHash("sha256").update(negativeQuestion.text).digest("hex");
    expect(parseExamChoiceExplanation({ ...valid, sourceHash: hash }, negativeQuestion, hash)?.choices)
      .toEqual(valid.choices);
    expect(parseExamChoiceExplanation(valid, negativeQuestion, hash)).toBeNull();
  });

  it("rejects duplicate evidence and any out-of-range official answer", () => {
    expect(parseExamChoiceExplanation({ ...valid, sources: [valid.sources[0], valid.sources[0]] }, question, sourceHash)).toBeNull();
    expect(parseExamChoiceExplanation({
      ...valid,
      correctChoice: 6,
      choices: valid.choices.map((choice) => ({ ...choice, verdict: "incorrect" })),
    }, { ...question, correctChoice: 6 }, sourceHash)).toBeNull();
  });

  it("rejects a repeated reason copied across two choices", () => {
    const choices = valid.choices.map((choice) => choice.number === 2
      ? { ...choice, reason: valid.choices[0]!.reason }
      : choice);
    expect(parseExamChoiceExplanation({ ...valid, choices }, question, sourceHash)).toBeNull();
  });

  it("normalizes unordered complete choices and rejects credentialed or nonstandard-port sources", () => {
    expect(parseExamChoiceExplanation({ ...valid, choices: [...valid.choices].reverse() }, question, sourceHash)?.choices)
      .toEqual(valid.choices);
    for (const url of ["https://user:pass@www.mhlw.go.jp/", "https://www.mhlw.go.jp:8443/", "javascript:alert(1)"]) {
      expect(isGovernmentPrimarySourceUrl(url)).toBe(false);
    }
  });
});
