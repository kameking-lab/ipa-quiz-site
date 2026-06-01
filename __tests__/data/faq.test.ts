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

  // IPA 公式 (kubun/sc.html) では、SC 合格・登録後に名乗れる国家資格名は
  // 「情報処理安全確保支援士（登録セキスペ）」。「登録セキュリティスペシャリスト」は
  // IPA が用いない不正確な称号で、/faq の FAQPage JSON-LD (acceptedAnswer.text)
  // にそのまま露出するため誤りを禁止する。
  it("names the registered SC title with the official IPA term (not an invented 称号)", () => {
    const scRegistration = FAQS.filter(
      (f) =>
        f.answer.includes("情報処理安全確保支援士") ||
        f.answer.includes("登録セキスペ") ||
        f.answer.includes("RISS"),
    );
    // non-vacuous: SC 登録系の FAQ が実在する
    expect(scRegistration.length).toBeGreaterThan(0);
    for (const f of FAQS) {
      expect(f.answer).not.toContain("登録セキュリティスペシャリスト");
    }
    // RISS に言及する回答は必ず正式名称も併記している
    for (const f of FAQS) {
      if (f.answer.includes("RISS")) {
        expect(f.answer).toContain("情報処理安全確保支援士");
      }
    }
  });
});
