import { describe, expect, it } from "vitest";
import { ALL_QUESTIONS } from "@/data/questions";
import { questionNumberLabel } from "@/lib/questions/display";
import { questionHeading, questionSnippet, questionTitle } from "@/lib/seo/question-meta";
import { sessionLabel } from "@/lib/seo/question-jsonld";
import { getSitemapQuestions } from "@/lib/seo/sitemap-pagination";

describe("question source identity", () => {
  it("distinguishes every electrical/thermal answer slot in titles and headings", () => {
    const questions = ALL_QUESTIONS.filter(q => q.exam === "energy-kanri");
    expect(questions.length).toBe(837);
    for (const q of questions) {
      const field = q.topicTags.find(tag => tag === "電気分野" || tag === "熱分野");
      if (field) {
        expect(questionHeading(q)).toContain(field);
        expect(questionTitle(q)).toContain(field);
      }
      expect(questionTitle(q)).toContain(`問${questionNumberLabel(q)}`);
    }
    expect(new Set(questions.map(questionTitle)).size).toBe(questions.length);
    expect(new Set(questions.map(questionHeading)).size).toBe(questions.length);
  });

  it.each([2024, 2025])("retains gyosei %s question numbers instead of the response format", year => {
    const questions = ALL_QUESTIONS.filter(q => q.exam === "gyosei" && q.year === year && q.qNumber >= 41 && q.qNumber <= 43);
    expect(questions.length).toBe(3);
    for (const q of questions) {
      expect(q.nativeB?.officialLabel).toBe("多肢選択式（20語群・4空欄）");
      expect(questionNumberLabel(q)).toBe(String(q.qNumber));
      expect(questionHeading(q)).toContain(`問${q.qNumber}`);
      expect(questionTitle(q)).toContain(`問${q.qNumber}`);
      expect(questionSnippet(q)).toContain(`問${q.qNumber}`);
    }
    expect(new Set(questions.map(questionTitle)).size).toBe(3);
  });

  it("omits only categories that duplicate the session, including in medical stem titles", () => {
    const questions = getSitemapQuestions().filter(q => (q.category === "午前" || q.category === "午後") && q.category === sessionLabel(q.session, q.exam));
    expect(questions.length).toBe(1987);
    expect(new Set(questions.map(q => q.exam)).size).toBe(8);
    for (const q of questions) {
      const number = questionNumberLabel(q);
      expect(questionTitle(q)).not.toContain(`問${number} ${q.category} 解説`);
      expect(questionSnippet(q)).not.toContain(`問${number}・${q.category}`);
      expect(questionHeading(q)).toContain(`${q.category} 問${number}`);
      expect(questionSnippet(q).length).toBeLessThanOrEqual(158);
    }
  });
});
