import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Tsushin1CoverageNote } from "@/components/exam/Tsushin1CoverageNote";
import { TSUSHIN1_QUESTIONS } from "@/data/questions/tsushin1";
import source from "@/data/questions/tsushin1/2025-september.json";
import answers from "@/docs/evidence/tsushin1-2025/complete/OFFICIAL-ANSWERS.json";
import crops from "@/docs/evidence/tsushin1-2025/complete/CROP-RECEIPTS.json";
import provenance from "@/docs/evidence/tsushin1-2025/complete/provenance.json";
import preservation from "@/docs/evidence/tsushin1-2025/complete/2026-PRESERVATION.json";

import { EXAM_CONFIGS } from "@/lib/exam-config";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { getAvailableYears } from "@/lib/questions/load";
import { EXAM_DESCRIPTIONS, examMetaDescription, getQuestionsByExamStrict } from "@/lib/seo/exam-meta";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";

const yearQuestions = TSUSHIN1_QUESTIONS.filter((q) => q.year === 2025);

describe("1級電気通信工事 最新2回全180原問", () => {
  it("2年度それぞれA55問B35問を重複・欠落なく収録する", () => {
    expect(TSUSHIN1_QUESTIONS).toHaveLength(180);
    expect(new Set(TSUSHIN1_QUESTIONS.map((q) => q.id)).size).toBe(180);
    expect(new Set(TSUSHIN1_QUESTIONS.map((q) => `${q.year}/${q.session}/${q.qNumber}`)).size).toBe(180);
    expect(yearQuestions).toHaveLength(90);
    for (const year of [2025, 2026]) {
      for (const [session, count] of [["mondai-a", 55], ["mondai-b", 35]] as const) {
        const questions = TSUSHIN1_QUESTIONS.filter((q) => q.year === year && q.session === session);
        expect(questions.map((q) => q.qNumber)).toEqual(Array.from({ length: count }, (_, i) => i + 1));
      }
    }
    const preservedText = readFileSync(resolve(process.cwd(), preservation.file), "utf8").replace(/\r\n/g, "\n");
    expect(createHash("sha256").update(preservedText).digest("hex")).toBe(preservation.sha256NormalizedLf);
  });

  it("令和7年度の答表90肢と全4肢説明を原問の順序で保持する", () => {
    const keys = ["ア", "イ", "ウ", "エ"];
    for (const q of yearQuestions) {
      const session = q.session as keyof typeof answers;
      expect(q.answer).toBe(keys[answers[session][q.qNumber - 1]! - 1]);
      expect(q.officialAnswerNumber).toBe(String(answers[session][q.qNumber - 1]));
      expect(q.explanation.length).toBeGreaterThanOrEqual(50);
      expect(Object.values(q.choices ?? {})).toHaveLength(4);
      expect(new Set(Object.values(q.choices ?? {})).size).toBe(4);
      expect(Object.keys(q.choiceExplanations ?? {})).toEqual(keys);
      expect(Object.values(q.choiceExplanations ?? {}).every((s) => s && s.length > 15)).toBe(true);
      expect(q.explanationCoverage).toBe("full");
      expect(q.sourceAttribution).toContain("公開保存コピー");
      expect(q.sourceAttribution).toContain("直接取得");
      expect(q.sourcePdfUrl).toMatch(/^https:\/\/dobokujira\.com\//);
      expect([q.question, ...Object.values(q.choices ?? {})].join("\n")).not.toMatch(/[\x00-\x08\x0b\x0c\x0e-\x1f\ue000-\uf8ff]|姶|挨|文章中のの|※\s*問題番号/);
    }
  });

  it("実際の取得元とPDF・図表画像のSHA-256を照合する", () => {
    expect(source.papers.map((p) => p.publishedCount)).toEqual([55, 35]);
    for (const receipt of provenance.files) {
      const file = resolve(process.cwd(), "docs/evidence/tsushin1-2025", receipt.localPath);
      expect(createHash("sha256").update(readFileSync(file)).digest("hex")).toBe(receipt.sha256);
      expect(receipt.sourceUrl).toMatch(/^https:\/\/dobokujira\.com\//);
    }
    for (const crop of crops) {
      const q = yearQuestions.find((q) => q.session === crop.session && q.qNumber === crop.number);
      expect(q?.hasImage).toBe(true);
      expect(q?.imageUrls).toHaveLength(crop.images.length);
      expect(q?.imageAltTexts).toHaveLength(crop.images.length);
      for (const receipt of crop.images) {
        const file = resolve(process.cwd(), "public/images/tsushin1/2025", receipt.file);
        expect(existsSync(file)).toBe(true);
        expect(createHash("sha256").update(readFileSync(file)).digest("hex")).toBe(receipt.sha256);
      }
    }
    for (const q of yearQuestions) {
      if (/下図|図1|図2|図に示|右図|次の図|下表|表に示/.test(q.question)) expect(q.hasImage).toBe(true);
    }
  });
  it("exposes both complete years through public registries and canonical question routes", async () => {
    expect(await getQuestionsForExam("tsushin1")).toHaveLength(180);
    expect(getQuestionsByExamStrict("tsushin1")).toHaveLength(180);
    expect(getAvailableYears("tsushin1")).toEqual([2026, 2025]);
    expect(EXAM_CONFIGS.tsushin1.yearRange).toEqual({ start: 2025, end: 2026 });
    expect(EXAM_CONFIGS.tsushin1.sessions.map((s) => [s.session, s.expectedQuestions])).toEqual([["mondai-a", 55], ["mondai-b", 35]]);
    for (const q of TSUSHIN1_QUESTIONS) {
      const [, , exam, yearSeason, section, qnum] = questionPagePath(q).split("/");
      expect(findQuestionByRoute(TSUSHIN1_QUESTIONS, { exam: exam!, yearSeason: yearSeason!, section: section!, qnum: qnum! })?.id).toBe(q.id);
    }
  });

  it("describes complete coverage without claiming first-party retrieval of the 2025 saved copies", () => {
    const catalog = getQualificationByExamCode("tsushin1")!;
    expect(catalog.remainingWork).toEqual([]);
    expect(catalog.attributionTemplate).not.toContain("令和8年度");
    const descriptions = [catalog.reuseSummary, EXAM_DESCRIPTIONS.tsushin1!, examMetaDescription("tsushin1", 180)];
    for (const text of descriptions) {
      expect(text).toContain("2026");
      expect(text).toContain("2025");
      expect(text).toContain("90原問");
      expect(text).toContain("公開保存コピー");
      expect(text).toContain("直接取得は未確認");
      expect(text).not.toContain("段階的");
      expect(text).not.toContain("確認済みの設問を掲載");
    }
  });


  it("renders the two-year hub notice with source limits and the 90-versus-60 distinction", () => {
    const html = renderToStaticMarkup(createElement(Tsushin1CoverageNote, { questionCount: TSUSHIN1_QUESTIONS.length }));
    expect(html).toContain("2026・2025年度");
    expect(html).toContain("各90原問（問題A55・B35）");
    expect(html).toContain("計180問");
    expect(html).toContain("55問から33問");
    expect(html).toContain("35問から27問");
    expect(html).toContain("各年度の全90原問");
    expect(html).toContain("公開保存コピー");
    expect(html).toContain("公式サイトからの直接取得は未確認");
    expect(html).not.toContain("令和8年度の第一次検定から");
    expect(html).not.toContain("収録済み設問のみ");
  });
});
