import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";
import { formatQuestionAnswerForDisplay, choiceDisplayLabel, questionNumberLabel } from "@/lib/questions/display";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { isPracticeReadyQuestion, shuffleChoices } from "@/lib/questions/filter";
import { questionPagePath, findQuestionByRoute } from "@/lib/seo/question-url";
import { buildQuestionJsonLd } from "@/lib/seo/question-jsonld";
import { examCatalog, examContent } from "@/mobile/shared/catalog-source";
import type { ExamCode } from "@/lib/questions/types";

// 公式正答表の画像から独立に読んだ印字順。データのanswerから作らない。
const editions: { exam: ExamCode; season: "late"; key: string; figures: number[] }[] = [
  { exam: "kogyo-hoso1", season: "late", key: "○×○×× ○○×○○ ○×○○× ×○○×× ××○×× ロハニロハ ニニイイハ ハハハハニ ハイニハロ ロイイロロ", figures: [16,22,23,24,27,44] },
];
for (const { exam, season, key, figures } of editions) {
  const code = exam as ExamCode;
  const official = key.replaceAll(" ", "");
  const evidence = JSON.parse(readFileSync(`data/questions/${exam}/2025-${season}.sources.json`, "utf8"));
  describe(`${exam} 2025年度後期`, () => {
    it("公式正答を採点・表示・個別URLまで維持し全問を配信する", async () => {
      const corpus = await getQuestionsForExam(code);
      const rows = corpus.filter(q => q.year === 2025 && q.season === season);
      expect(rows).toHaveLength(official.length);
      expect(QUESTIONS_BY_EXAM[code]).toEqual(corpus);
      expect(new Set(corpus.map(q => q.id)).size).toBe(corpus.length);
      expect(new Set(corpus.map(questionPagePath)).size).toBe(corpus.length);
      expect(getQualificationByExamCode(code)?.status).toBe("live");
      expect(EXAM_CONFIGS[code].yearRange.start).toBeLessThanOrEqual(2025);
      expect(EXAM_CONFIGS[code].seasons).toContain(season);
      rows.forEach((q, i) => {
        const isB = !exam.endsWith("3") && i >= 25;
        expect(q.qNumber).toBe(i + 1);
        expect(q.officialAnswerNumber, q.id).toBe(official[i]);
        expect(formatQuestionAnswerForDisplay(q, q.answer)).toBe(official[i]);
        expect(q.answer).toBe(isB ? "アイウエ"["イロハニ".indexOf(official[i])] : official[i] === "○" ? "ア" : "イ");
        expect(questionNumberLabel(q)).toBe(exam.endsWith("3") ? String(i + 1) : `${isB ? "B" : "A"}群 ${isB ? i - 24 : i + 1}`);
        expect(Object.keys(q.choices!)).toHaveLength(isB ? 4 : 2);
        expect(Object.keys(q.choiceExplanations!)).toEqual(Object.keys(q.choices!));
        expect(isPracticeReadyQuestion(q)).toBe(true);
        expect(shuffleChoices(q)).toBe(q);
        expect(EXAM_CONFIGS[code].sessions[0].categories).toContain(q.category);
        expect(questionSourceEdition(q)).toBe("2025年度後期");
        expect(q.sourcePdfUrl).toBe(`${evidence.sources[0].url}#page=${evidence.review[i].pdfPage}`);
        expect(q.sourceAnswerUrl).toBe(evidence.sources[1].url);
        const [, , routeExam, yearSeason, section, qnum] = questionPagePath(q).split("/");
        expect(findQuestionByRoute(corpus, { exam: routeExam, yearSeason, section, qnum })?.id).toBe(q.id);
        const graph = buildQuestionJsonLd({ question: q, pageUrlAbs: `https://www.kakomon-ai.jp${questionPagePath(q)}`, title: exam })["@graph"][0];
        if (!("hasPart" in graph) || !("acceptedAnswer" in graph.hasPart) || Array.isArray(graph.hasPart.acceptedAnswer)) throw new Error("Missing answer");
        expect(graph.hasPart.author.name).toBe("中央職業能力開発協会");
        expect(graph.hasPart.acceptedAnswer.text).toContain(official[i]);
      });
      if (!exam.endsWith("3")) expect(["ア", "イ", "ウ", "エ"].map(k => choiceDisplayLabel(code, k as "ア"))).toEqual(["イ", "ロ", "ハ", "ニ"]);
    });
    it("必要な原図の参照とハッシュが一致する", async () => {
      const rows = (await getQuestionsForExam(code)).filter(q => q.year === 2025);
      expect(rows.filter(q => q.hasImage).map(q => q.qNumber)).toEqual(figures);
      evidence.figures.forEach((f: { qNumber: number; file: string; sha256: string }) => {
        expect(rows.find(q => q.qNumber === f.qNumber)?.imageUrls).toContain(f.file);
        expect(createHash("sha256").update(readFileSync(`public${f.file}`)).digest("hex")).toBe(f.sha256);
      });
    });
    it("mobile本文・件数・リビジョンがWebと一致する", async () => {
      expect(await examContent(exam)).toEqual(await getQuestionsForExam(code));
      const catalog = JSON.parse(readFileSync("mobile/src/generated/catalog.json", "utf8"));
      expect(catalog.exams.find((e: { code: string }) => e.code === exam)).toEqual(await examCatalog(exam));
    });
  });
}
