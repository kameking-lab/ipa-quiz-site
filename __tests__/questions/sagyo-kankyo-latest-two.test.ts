import { describe, expect, it } from "vitest";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { SAGYO_KANKYO_SOKUTEISHI_QUESTIONS as questions } from "@/data/questions/sagyo-kankyo-sokuteishi";
import audit from "@/data/questions/sagyo-kankyo-sokuteishi/source-audit.json";
import reviewedKeys from "@/data/exam-library/reviewed-answer-keys.json";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { ALL_QUIZ_EXAM_CODES } from "@/lib/exam-config";
import { getQualificationByExamCode, isExamPublished } from "@/lib/qualifications/catalog";

const code = "sagyo-kankyo-sokuteishi";
const letters = "アイウエオ";

describe("作業環境測定士の科目別直近2回ステージング", () => {
  it("全360原問を科目別の公式掲載回に保持し、問番号の衝突を防ぐ", () => {
    expect(questions).toHaveLength(360);
    expect(new Set(questions.map(q => q.id)).size).toBe(360);
    expect(audit).toHaveLength(18);
    for (const subject of new Set(questions.map(q => q.subject))) {
      const rows = questions.filter(q => q.subject === subject);
      expect(rows).toHaveLength(40);
      expect([...new Set(rows.map(q => q.examDate))].sort()).toEqual(
        ["労働衛生一般", "労働衛生関係法令", "デザイン・サンプリング", "分析に関する概論"].includes(subject!)
          ? ["2026-02-17", "2026-08-19"] : ["2025-08-21", "2026-08-20"],
      );
    }
  });

  it("原本ハッシュ・目視確認済み正答・原文テキストの照合履歴を保持する", () => {
    for (const paper of audit) {
      const key = reviewedKeys.find(k => k.paperId === paper.paperId)!;
      expect(paper.pdfSha256).toBe(key.pdfSha256);
      expect(paper.answers).toEqual(key.answers);
      const raw = JSON.parse(readFileSync(`data/exam-library/papers/${paper.paperId}.json`, "utf8"));
      const presentation = JSON.parse(readFileSync(`data/exam-library/presentation/${paper.paperId}.json`, "utf8"));
      for (const [i, source] of paper.questions.entries()) {
        const q = questions.find(q => q.id === source.id)!;
        const original = raw.find((r: { id: string }) => r.id === source.sourceQuestionId);
        const text = presentation[source.sourceQuestionId];
        expect(source.sourceTextSha256).toBe(createHash("sha256").update(original.text).digest("hex"));
        expect(q.question).toBe(text.prompt);
        expect(q.choices).toEqual(Object.fromEntries(text.choices.map((c: { number: number; text: string }) => [letters[c.number - 1], c.text])));
        expect(q.answer).toBe(letters[key.answers[i] - 1]);
        expect(q.officialAnswerNumber).toBe(String(i + 1));
        expect(q.sourcePdfUrl).toBe(paper.pdfUrl);
        expect(q.sourceAnswerUrl).toBe(paper.pdfUrl);
        expect(q.explanation).toContain(`出題時点（${paper.examDate}）`);
        expect(q.explanation).not.toMatch(/正答が公表されていない|参考解答|自力で判断/);
        expect(q.hasImage).toBe(text.figures.length > 0);
        expect(q.imageUrls ?? []).toEqual(text.figures.map((f: { src: string }) => f.src));
        for (const image of q.imageUrls ?? []) expect(existsSync(`public${image}`)).toBe(true);
      }
    }
  });

  it("公開資格一覧・通常演習・遅延ローダーに出さない", async () => {
    expect(getQualificationByExamCode(code)?.status).toBe("terms-review-required");
    expect(isExamPublished(code)).toBe(false);
    expect(ALL_QUIZ_EXAM_CODES).not.toContain(code);
    expect(QUESTIONS_BY_EXAM[code]).toBeUndefined();
    expect(await getQuestionsForExam(code)).toEqual([]);
  });
});
