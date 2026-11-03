import { describe, expect, it } from "vitest";
import { SHIHOSHOSHI_QUESTIONS } from "@/data/questions/shihoshoshi";
import excluded from "@/data/questions/shihoshoshi/excluded.json";
import holds from "@/data/questions/shihoshoshi/editorial/holds.json";
import legalSources from "@/data/questions/shihoshoshi/editorial/legal-sources.json";
import { ALL_QUIZ_EXAM_CODES, ALL_EXAM_CODES, EXAM_CONFIGS } from "@/lib/exam-config";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { getQualificationByExamCode, isExamPublished } from "@/lib/qualifications/catalog";
import { choiceDisplayLabel } from "@/lib/questions/display";
import { readFileSync } from "node:fs";

describe("司法書士公式2回分の未公開登録", () => {
  it("keeps synchronous, lazy and public exam registries closed", async () => {
    expect(getQualificationByExamCode("shihoshoshi")?.status).toBe("ready-to-ingest");
    expect(isExamPublished("shihoshoshi")).toBe(false);
    expect(QUESTIONS_BY_EXAM.shihoshoshi).toBeUndefined();
    expect(await getQuestionsForExam("shihoshoshi")).toEqual([]);
    expect(ALL_QUIZ_EXAM_CODES).not.toContain("shihoshoshi");
    expect(ALL_EXAM_CODES).not.toContain("shihoshoshi");
    expect(EXAM_CONFIGS.shihoshoshi.sessions.map(s => s.expectedQuestions)).toEqual([35, 35]);
  });

  it("reconciles each official answer row, including the unscorable question", () => {
    expect(SHIHOSHOSHI_QUESTIONS).toHaveLength(139);
    expect(new Set(SHIHOSHOSHI_QUESTIONS.map(q => q.id)).size).toBe(139);
    for (const year of [2025, 2026]) {
      const answerText = readFileSync(`data/questions/shihoshoshi/source-text/${year}-answers.txt`, "utf8");
      const rows = [...answerText.normalize("NFKC").matchAll(/第(\d+)問\s+([1-5-])\s+第(\d+)問\s+([1-5-])/g)];
      expect(rows).toHaveLength(35);
      for (const row of rows) for (const [session, number, answer] of [["am", row[1], row[2]], ["pm", row[3], row[4]]]) {
        const q = SHIHOSHOSHI_QUESTIONS.find(q => q.year === year && q.session === session && q.qNumber === Number(number));
        if (answer === "-") {
          expect(q).toBeUndefined();
          expect(excluded.some(q => q.year === year && q.session === session && q.qNumber === Number(number))).toBe(true);
        } else {
          expect(q?.officialAnswerNumber).toBe(answer);
          expect(choiceDisplayLabel("shihoshoshi", q!.answer as "ア")).toBe(answer);
        }
      }
    }
    expect(excluded).toHaveLength(1);
    expect(excluded[0]).toMatchObject({ year: 2025, session: "pm", qNumber: 33 });
  });

  it("retains selectable text, source attribution, historical law dates and the register table", () => {
    for (const q of SHIHOSHOSHI_QUESTIONS) {
      expect(q.question.length, q.id).toBeGreaterThan(300);
      expect(Object.keys(q.choices!)).toHaveLength(5);
      if (q.year === 2026) {
        expect(q.lawReferenceDate).toBe("2026-04-01");
        expect(q.explanation).toContain("出題時点の法令（2026年4月1日現在）");
      } else {
        expect(q.lawReferenceDate).toBeUndefined();
        expect(q.explanation).toContain("2025年度の公式冊子に基準日の記載なし");
        expect(q.explanation).toContain("法令資料の暫定検討日は2025年4月1日");
      }
      expect(q.sourcePdfUrl).toMatch(/^https:\/\/www\.moj\.go\.jp\/content\/\d+\.pdf$/);
      expect(q.sourceAnswerUrl).toMatch(/^https:\/\/www\.moj\.go\.jp\/content\/\d+\.pdf$/);
      expect(q.question).not.toMatch(/AQ\s*[―－]/);
    }
    const q = SHIHOSHOSHI_QUESTIONS.find(q => q.year === 2026 && q.session === "pm" && q.qNumber === 20)!;
    expect(q.hasImage).toBe(true);
    expect(q.question).toContain("根抵当権");
    expect(q.imageUrls).toHaveLength(1);
    const blank = SHIHOSHOSHI_QUESTIONS.find(q => q.year === 2026 && q.session === "am" && q.qNumber === 3)!;
    expect(blank.choices?.イ).toBe("ア 総議員\nエ 天皇");
  });

  it("distinguishes formal explanation coverage from explicitly unresolved statements", () => {
    const pending = holds as Record<string, Record<string, string>>;
    expect(Object.keys(pending)).toHaveLength(5);
    expect(Object.values(pending).flatMap(Object.keys)).toHaveLength(10);
    expect(SHIHOSHOSHI_QUESTIONS.filter(q => q.explanationCoverage === "full")).toHaveLength(134);
    expect(SHIHOSHOSHI_QUESTIONS.filter(q => q.needsReview)).toHaveLength(5);
    for (const q of SHIHOSHOSHI_QUESTIONS) {
      const unresolved = pending[q.id];
      expect(q.explanationCoverage, q.id).toBe(unresolved ? undefined : "full");
      expect(q.needsReview, q.id).toBe(unresolved ? true : undefined);
      expect(q.lastUpdated).toBe("2026-11-03");
      expect(q.officialReferenceUrls?.length, q.id).toBeGreaterThan(0);
      for (const reason of Object.values(unresolved ?? {})) {
        expect(q.explanation, q.id).toContain(reason);
        expect(reason).toMatch(/^保留。.+/);
      }
      expect(q.explanation, q.id).not.toMatch(/正答の組合せと一致|公式正答の組合せは/);
      expect(Object.keys(q.choiceExplanations!)).toEqual(["ア", "イ", "ウ", "エ", "オ"]);
      const reasons = Object.values(q.choiceExplanations!);
      expect(new Set(reasons).size, q.id).toBe(5);
      for (const reason of reasons) {
        expect(reason.length, q.id).toBeGreaterThan(20);
        expect(reason, q.id).not.toMatch(/正答の組合せと一致|一致しません/);
        if (!unresolved) expect(reason, q.id).not.toContain("保留。");
      }
    }
    const civil = SHIHOSHOSHI_QUESTIONS.find(q => q.id === "shihoshoshi-2025-am-q8")!;
    expect(civil.explanation).toContain("民法939条");
    expect(civil.explanation).toContain("相続放棄");
    const boundary = SHIHOSHOSHI_QUESTIONS.find(q => q.id === "shihoshoshi-2026-am-q9")!;
    expect(boundary.explanation).toContain("民法224条ただし書");
    expect(boundary.explanation).toContain("測量費");
  });

  it("records evidence for each released statement and keeps partially resolved questions held", () => {
    const review = legalSources.holdReleaseReview;
    expect(review.statementReviews).toHaveLength(17);
    expect(new Set(review.statementReviews.map(r => `${r.questionId}:${r.statement}`)).size).toBe(17);
    expect(review.statementReviews.filter(r => r.status === "released")).toHaveLength(7);
    const pending = holds as Record<string, Record<string, string>>;
    for (const item of review.statementReviews) {
      const q = SHIHOSHOSHI_QUESTIONS.find(q => q.id === item.questionId)!;
      expect(q.explanation, q.id).toContain(`記述${item.statement}：${item.reason}`);
      if (item.status === "held") {
        expect(pending[item.questionId]?.[item.statement]).toBe(item.reason);
      } else {
        expect(pending[item.questionId]?.[item.statement]).toBeUndefined();
        expect(item.references.length).toBeGreaterThan(0);
        for (const ref of item.references) {
          const doc = review.documents.find(d => d.id === ref.documentId)!;
          expect(doc.sha256).toMatch(/^[a-f0-9]{64}$/);
          expect(doc.checkedOn).toBe(review.checkedOn);
          expect(q.officialReferenceUrls).toContain(doc.url);
        }
      }
    }
    const partial = SHIHOSHOSHI_QUESTIONS.find(q => q.id === "shihoshoshi-2025-pm-q9")!;
    expect(partial.needsReview).toBe(true);
    expect(partial.explanationCoverage).toBeUndefined();
    expect(pending[partial.id]).not.toHaveProperty("ア");
    expect(pending[partial.id]).toHaveProperty("ウ");
  });
});
