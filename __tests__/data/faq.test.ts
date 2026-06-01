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

  // IPA 公式 (about/koudo_menjo.html) では午前I免除は「2年間に実施する試験まで
  // 何度でも申請可能」。旧「前回・前々回」(=約1年・2回)は有効期間を過小提示する
  // 誤りで、不要な午前I再受験を招くため禁止する。
  it("states the 午前I免除 window as 2 years (not the understated 前回・前々回)", () => {
    const menjo = FAQS.filter((f) => f.answer.includes("午前 I を免除"));
    // non-vacuous: 午前I免除を説明する FAQ が実在する
    expect(menjo.length).toBeGreaterThan(0);
    for (const f of menjo) {
      expect(f.answer).not.toContain("前回・前々回");
      expect(f.answer).toContain("2 年間");
    }
  });

  // IPA 公式: FE は 科目A=60問/90分・科目B=20問/100分。旧「科目 A（多肢選択 90 問）」は
  // 90分との取り違えによる誤り (SSOT exam-data は 60問/90分 で正)。
  it("FE 科目A は 60 問（90 問の取り違えを禁止）", () => {
    const fe = FAQS.filter((f) => f.answer.includes("科目 A（多肢選択"));
    // non-vacuous: 科目A の問数を述べる FAQ が実在する
    expect(fe.length).toBeGreaterThan(0);
    for (const f of fe) {
      expect(f.answer).not.toContain("科目 A（多肢選択 90 問");
      expect(f.answer).toContain("科目 A（多肢選択 60 問");
    }
  });
});
