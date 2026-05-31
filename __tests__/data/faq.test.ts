import { describe, expect, it } from "vitest";

import { FAQS, FAQ_CATEGORY_LABELS } from "@/data/faq";

// Characterization tests for data/faq.ts — the FAQ registry. /faq emits every
// item as FAQPage JSON-LD (mainEntity: { name: question, acceptedAnswer.text:
// answer }) and groups items by category, labelling each section with
// FAQ_CATEGORY_LABELS[category]. So: empty question/answer = invalid structured
// data, duplicate questions = a FAQPage rich-result warning, and a category
// with no label entry = a blank section heading / aria-label.

describe("FAQS registry — FAQPage structured-data invariants", () => {
  it("is non-empty and every item has a non-empty question and answer", () => {
    expect(FAQS.length).toBeGreaterThan(0);
    for (const f of FAQS) {
      expect(f.question.trim().length).toBeGreaterThan(0);
      expect(f.answer.trim().length).toBeGreaterThan(0);
    }
  });

  it("has no duplicate questions (FAQPage flags duplicate Question names)", () => {
    const questions = FAQS.map((f) => f.question);
    expect(new Set(questions).size).toBe(questions.length);
  });

  it("every category in use has a FAQ_CATEGORY_LABELS entry (no blank headings)", () => {
    for (const f of FAQS) {
      expect(FAQ_CATEGORY_LABELS[f.category]).toBeTruthy();
    }
  });
});
