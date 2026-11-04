import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { describe, expect, it } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { SHOHI_SODAN_QUESTIONS } from "@/data/questions/shohi-sodan";
import { REFORM_MGR_QUESTIONS } from "@/data/questions/reform-mgr";
import s24 from "@/data/questions/shohi-sodan/2024.json";
import s25 from "@/data/questions/shohi-sodan/2025.json";
import r25 from "@/data/questions/reform-mgr/2025.json";
import r26 from "@/data/questions/reform-mgr/2026.json";
import skeys from "@/data/questions/shohi-sodan/official-answer-keys.json";
import rkeys from "@/data/questions/reform-mgr/official-answer-keys.json";
import { ALL_EXAM_CODES, ALL_QUIZ_EXAM_CODES } from "@/lib/exam-config";
import { ALL_QUESTIONS, QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam, getRegisteredExamCodes } from "@/lib/questions/get-questions";
import { getQualificationByExamCode, isExamPublished } from "@/lib/qualifications/catalog";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
const all = [...SHOHI_SODAN_QUESTIONS, ...REFORM_MGR_QUESTIONS];
describe("LQ9 private qualification staging", () => {
  it("retains every printed subquestion and matches the separately extracted official answer tables", () => {
    expect(all).toHaveLength(420);
    expect(new Set(all.map(q => q.id)).size).toBe(420);
    for (const source of [s24, s25]) {
      expect(source.questions).toHaveLength(160);
      const table = skeys[String(source.year) as keyof typeof skeys] as Record<string, string[]>;
      const positions: string[] = [];
      for (const q of source.questions) {
        const answer = table[String(q.officialQuestionNumber)][q.subQuestion - 1];
        expect(q.officialAnswer).toBe(answer);
        const expected = q.choices.length === 2 ? (answer === "〇" || answer === "○" ? 1 : 2)
          : q.officialQuestionNumber === 3 || q.officialQuestionNumber === 17 ? Number(answer)
          : q.question.includes("下線部") ? answer === "〇" || answer === "○" ? 1 : answer === "ア" ? 2 : 3
          : "アイウ".indexOf(answer) + 1;
        expect(q.officialAnswerNumber).toBe(expected);
        positions.push(`${q.officialQuestionNumber}-${q.subQuestion}`);
      }
      expect(new Set(positions).size).toBe(160);
      expect(new Set(source.questions.map(q => q.officialQuestionNumber)).size).toBe(20);
    }
    for (const source of [r25, r26]) {
      expect(source.questions.map(q => q.number)).toEqual(Array.from({ length: 50 }, (_, i) => i + 1));
      const table = rkeys[String(source.year) as keyof typeof rkeys] as Record<string, number>;
      for (const q of source.questions) expect(q.officialAnswerNumber).toBe(table[String(q.number)]);
    }
  });
  it("batch1公開後: keeps all public registries, lazy loaders and IPA import tools free of staging qualifications", async () => {
    for (const slug of ["shohi-sodan", "reform-mgr"] as const) {
      expect(getQualificationByExamCode(slug)?.status).toBe("live");
      expect(isExamPublished(slug)).toBe(true);
      expect(ALL_EXAM_CODES as string[]).not.toContain(slug);
      expect(ALL_QUIZ_EXAM_CODES).toContain(slug);
      expect(QUESTIONS_BY_EXAM[slug]).toBeDefined();
      expect(ALL_QUESTIONS.some(q => q.exam === slug)).toBe(true);
      expect(getRegisteredExamCodes()).toContain(slug);
      expect((await getQuestionsForExam(slug)).length).toBeGreaterThan(0);
    }
  });
  it("provides a sourced explanation for every option and preserves legal reference dates", () => {
    for (const q of all) {
      expect(Object.keys(q.choiceExplanations!)).toEqual(Object.keys(q.choices!));
      for (const e of Object.values(q.choiceExplanations!)) expect(e!.length).toBeGreaterThan(15);
      expect(q.sourceAttribution).toContain("PDF");
      expect(q.sourceAnswerUrl).toMatch(/^https:\/\/(www\.)?(kokusen|chord)\.or\.jp\/|^https:\/\/www\.kokusen\.go\.jp\//);
      expect(q.lawReferenceDate).toBe(`${q.year}-${q.exam === "shohi-sodan" ? "05" : "04"}-01`);

    }
  });
  it("renders every source underline as strong emphasis and applies the amended mediation law", () => {
    for (const q of SHOHI_SODAN_QUESTIONS.filter(q => q.question.includes("**"))) {
      const html = renderToStaticMarkup(createElement(ReactMarkdown, { remarkPlugins: [remarkGfm] }, q.question));
      expect(html).not.toContain("**");
      expect((html.match(/<strong>/g) ?? []).length).toBe((q.question.match(/\*\*/g) ?? []).length / 2);
    }
    expect(all.filter(q => q.needsReview)).toHaveLength(0);
    const mediation = all.find(q => q.id === "shohi-sodan-2024-annual-gakka-q1401")!;
    expect(mediation.answer).toBe("イ");
    expect(mediation.choiceExplanations?.ウ).toContain("民事調停法第４条の２");
    expect(isPracticeReadyQuestion(mediation)).toBe(true);
  });
  it("distinguishes off-premises cafe contracts from special-customer sales at business premises", () => {
    const q = SHOHI_SODAN_QUESTIONS.find(q => q.id === "shohi-sodan-2025-annual-gakka-q1102")!;
    expect(q.answer).toBe("イ");
    for (const e of Object.values(q.choiceExplanations!)) {
      expect(e).toContain("営業所等ではない喫茶店");
      expect(e).toContain("第１号");
    }
    expect(q.officialReferenceUrls).toContain("https://www.no-trouble.caa.go.jp/pdf/20201224ra02.pdf");
  });
  it("embeds the exact private figure bytes without creating a public static asset", () => {
    const figures = all.filter(q => q.hasImage);
    expect(figures).toHaveLength(1);
    const asset = readFileSync(join(process.cwd(), "data/qualification-staging/reform-mgr/assets/2025-q3.webp"));
    expect(figures[0].imageUrls).toEqual([`data:image/webp;base64,${asset.toString("base64")}`]);
    expect(existsSync(join(process.cwd(), "public/questions/reform-mgr/2025-q3.webp"))).toBe(false);
  });
});
