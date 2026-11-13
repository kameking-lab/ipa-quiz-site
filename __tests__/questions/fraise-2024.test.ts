import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";
import { formatQuestionAnswerForDisplay, choiceDisplayLabel } from "@/lib/questions/display";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { isPracticeReadyQuestion, shuffleChoices } from "@/lib/questions/filter";
import { questionPagePath, findQuestionByRoute } from "@/lib/seo/question-url";
import { buildQuestionJsonLd } from "@/lib/seo/question-jsonld";
import { examCatalog, examContent } from "@/mobile/shared/catalog-source";
import type { ExamCode } from "@/lib/questions/types";

// 公式正答表の印字順。JSONのanswerから期待値を作らない。
const officialKeys = {
  fraise1: "○×○××○×○×○××××○××○○○○○○○○ハロハロニロハニニハイロロロハニロイイニロニロニロ",
};
for (const [code, key] of Object.entries(officialKeys)) {
  const exam = code as ExamCode;
  const evidence = JSON.parse(readFileSync(`data/questions/${exam}/2024-early.sources.json`, "utf8"));
  describe(`${exam} 2024年度前期の公式原本との対応`, () => {
    it("全問が出題・詳細ページ・公式正答表示につながる", async () => {
      const rows = await getQuestionsForExam(exam);
      expect(rows).toHaveLength(key.length);
      expect(new Set(rows.map(q => q.id)).size).toBe(key.length);
      expect(QUESTIONS_BY_EXAM[exam]).toEqual(rows);
      expect(rows.filter(isPracticeReadyQuestion)).toHaveLength(key.length);
      expect(EXAM_CONFIGS[exam].sessions[0].expectedQuestions).toBe(key.length);
      expect(getQualificationByExamCode(exam)?.status).toBe("live");
      rows.forEach((q, i) => {
        expect(q.qNumber).toBe(i + 1);
        expect(q.officialAnswerNumber).toBe(key[i]);
        expect(formatQuestionAnswerForDisplay(q, q.answer)).toBe(key[i]);
        expect(Object.keys(q.choices!)).toHaveLength(code.endsWith("3") || i < 25 ? 2 : 4);
        expect(Object.keys(q.choiceExplanations!)).toEqual(Object.keys(q.choices!));
        expect(questionSourceEdition(q)).toBe("2024年度前期");
        expect(shuffleChoices(q)).toBe(q);
        expect(EXAM_CONFIGS[exam].sessions[0].categories).toContain(q.category);
        expect(q.sourcePdfUrl).toBe(`${evidence.sources[0].url}#page=${evidence.review[i].pdfPage}`);
        expect(q.sourceAnswerUrl).toBe(evidence.sources[1].url);
        const [, , routeExam, yearSeason, section, qnum] = questionPagePath(q).split("/");
        expect(findQuestionByRoute(rows, { exam: routeExam, yearSeason, section, qnum })?.id).toBe(q.id);
        const graph = buildQuestionJsonLd({ question: q, pageUrlAbs: `https://www.kakomon-ai.jp${questionPagePath(q)}`, title: exam })["@graph"][0];
        if (!("hasPart" in graph) || !("acceptedAnswer" in graph.hasPart) || Array.isArray(graph.hasPart.acceptedAnswer)) throw new Error("Missing answer");
        expect(graph.hasPart.author.name).toBe("中央職業能力開発協会");
        expect(graph.hasPart.acceptedAnswer.text).toContain(key[i]);
      });
      if (!code.endsWith("3")) expect(["ア", "イ", "ウ", "エ"].map(k => choiceDisplayLabel(exam, k as "ア"))).toEqual(["イ", "ロ", "ハ", "ニ"]);
    });
    it("必要な原図が存在しハッシュと参照が一致する", async () => {
      const rows = await getQuestionsForExam(exam);
      expect(rows.filter(q => q.hasImage)).toHaveLength(evidence.figureCount);
      evidence.figures.forEach((f: { qNumber: number; file: string; sha256: string }) => {
        const q = rows.find(q => q.qNumber === f.qNumber)!;
        expect(q.imageUrls).toContain(f.file);
        expect(q.imageAltTexts?.[0].length).toBeGreaterThan(5);
        expect(createHash("sha256").update(readFileSync(`public${f.file}`)).digest("hex")).toBe(f.sha256);
      });
    });
    it("mobileの本文・件数・リビジョンがWebと一致する", async () => {
      expect(await examContent(exam)).toEqual(await getQuestionsForExam(exam));
      const catalog = JSON.parse(readFileSync("mobile/src/generated/catalog.json", "utf8"));
      expect(catalog.exams.find((e: { code: string }) => e.code === exam)).toEqual(await examCatalog(exam));
    });
  });
}
