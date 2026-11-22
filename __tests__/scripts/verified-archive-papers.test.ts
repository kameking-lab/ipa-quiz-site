import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { AiTransparencyDisclaimer } from "@/components/quiz/AiTransparencyDisclaimer";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import type { ExamCode } from "@/lib/questions/types";
import { loadArchiveEvidence, verifiedArchiveSource } from "../../scripts/lib/question-archive-evidence";

describe("保存版から復元した公開問題", () => {
  const evidence = loadArchiveEvidence(process.cwd());

  it("出典台帳の全問を公開ローダーから取得でき、試験期・科目・正答が記録と一致する", async () => {
    expect(evidence.size).toBeGreaterThan(0);
    const exams = new Set([...evidence.values()].map(({ paper }) => paper.exam as ExamCode));
    for (const exam of exams) {
      const config = EXAM_CONFIGS[exam];
      const loaded = new Map((await getQuestionsForExam(exam)).map(q => [q.id, q]));
      const records = [...evidence].filter(([, { paper }]) => paper.exam === exam);
      for (const [id] of records) {
        const q = loaded.get(id);
        expect(q, id).toBeDefined();
        if (!q) continue;
        expect(verifiedArchiveSource(q, evidence), id).toBe(true);
        expect(config.yearRange.start, id).toBeLessThanOrEqual(q.year);
        expect(config.yearRange.end, id).toBeGreaterThanOrEqual(q.year);
        expect(config.seasons, id).toContain(q.season);
        expect(config.sessions.some(session => session.session === q.session), id).toBe(true);
      }
    }
  });

  it("問題画面の出典から日時固定の公式PDFを開ける", async () => {
    const fixture = [...evidence.values()].find(({ paper }) => paper.answer.archiveUrl !== paper.question.archiveUrl && paper.answer.archiveUrl);
    expect(fixture).toBeDefined();
    if (!fixture) return;
    const q = (await getQuestionsForExam(fixture.paper.exam as ExamCode)).find(q => q.id === fixture.entry.id);
    expect(q).toBeDefined();
    if (!q) return;
    const html = renderToStaticMarkup(createElement(AiTransparencyDisclaimer, { question: q }));
    expect(html).toContain("公式PDF（保存版）");
    expect(html).toContain(q.sourceArchiveUrl);
    expect(html).toContain("公式正答PDF（保存版）");
    expect(html).toContain(q.sourceAnswerArchiveUrl);
  });
});
