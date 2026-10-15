import { describe, it, expect } from "vitest";
import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import raw from "../../data/questions/riku-tech2/two-sittings.json";
import { QuestionAnswerCard } from "@/components/quiz/QuestionAnswerCard";
import { ExplanationCard } from "@/components/quiz/ExplanationCard";
import { getChoiceKeys } from "@/lib/questions/answers";
import { isPracticeReadyQuestion, shuffleChoices } from "@/lib/questions/filter";
import type { ChoiceKey } from "@/lib/questions/types";
import { normalizeQuestionData } from "@/lib/questions/native-b";
import { buildQuestionJsonLd } from "@/lib/seo/question-jsonld";

const questions = raw.map(normalizeQuestionData);
const ordinary = questions.filter((question) => question.type === "multiple-choice");
const escaped = (text: string) => text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

describe("second-class land engineer ordinary-question consumers", () => {
  it("exposes every original choice and aligned reason through the real key consumer", () => {
    expect(ordinary).toHaveLength(150);
    let choices = 0;
    for (const question of ordinary) {
      expect(Array.isArray(question.choices)).toBe(false);
      const keys = getChoiceKeys(question.choices);
      expect(keys.length === 4 || keys.length === 5).toBe(true);
      expect(keys).toEqual(Object.keys(question.choices!));
      expect(Object.keys(question.choiceExplanations!)).toEqual(keys);
      for (const key of keys) {
        expect(typeof question.choices![key]).toBe("string");
        expect(question.choices![key]!.trim()).not.toBe("");
        expect(typeof question.choiceExplanations![key]).toBe("string");
        expect(question.choiceExplanations![key]!.trim()).not.toBe("");
        choices++;
      }
      expect(shuffleChoices(question)).toBe(question);
    }
    expect(choices).toBe(720);
  });

  it("puts each correct option's original text in the actual structured-data answer", () => {
    for (const question of ordinary) {
      const graph = buildQuestionJsonLd({ question, pageUrlAbs: "https://example.test/question", title: "Consumer regression", lastUpdatedISO: "2026-10-15" });
      const resource = JSON.parse(JSON.stringify(graph["@graph"].find((node) => node["@type"] === "LearningResource"))) as { hasPart: { text: string; acceptedAnswer: { text: string } } };
      expect(resource.hasPart.acceptedAnswer.text).toBe(`${question.officialAnswerNumber}: ${question.choices![question.answer as ChoiceKey]}`);
      expect(resource.hasPart.text).toBe(question.question);
    }
  });

  it("renders original four/five choice buttons and all their explanations using real components", () => {
    for (const count of [4, 5]) {
      const question = ordinary.find((candidate) => Object.keys(candidate.choices!).length === count)!;
      const answerHtml = renderToStaticMarkup(<QuestionAnswerCard question={question} questionId={question.id} choices={question.choices} answerKey={question.answer} exam={question.exam} year={question.year} season={question.season} session={question.session} qNumber={question.qNumber} />);
      expect((answerHtml.match(/aria-checked=/g) ?? [])).toHaveLength(count);
      for (const text of Object.values(question.choices!)) expect(answerHtml).toContain(escaped(text!));
      const explanationHtml = renderToStaticMarkup(<ExplanationCard question={question} selected={String(question.answer)} isCorrect starred={false} onToggleStar={() => {}} onNext={() => {}} onAskAI={() => {}} />);
      for (const text of Object.values(question.choiceExplanations!)) expect(explanationHtml).toContain(escaped(text!));
    }
  });

  it("retains 190 originals and 189 practice-ready originals with only the existing native-B hold", () => {
    expect(questions).toHaveLength(190);
    expect(questions.filter((question) => question.type === "native-b")).toHaveLength(40);
    expect(questions.filter(isPracticeReadyQuestion)).toHaveLength(189);
    expect(questions.filter((question) => !isPracticeReadyQuestion(question)).map((question) => question.id)).toEqual(["radio21-riku-tech2-2026-01-kogaku-b-q25"]);
  });
});
