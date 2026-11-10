import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { EISEI1_QUESTIONS } from "@/data/questions/eisei1";
import { EISEI2_QUESTIONS } from "@/data/questions/eisei2";
import source1 from "@/data/questions/eisei1/2026-october-source.json";
import source2 from "@/data/questions/eisei2/2026-october-source.json";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { filterQuestions, isPracticeReadyQuestion } from "@/lib/questions/filter";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { questionPagePath, parseQuestionRoute } from "@/lib/seo/question-url";
import { getQuestionsByExamStrict, groupByYearSeason } from "@/lib/seo/exam-meta";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import YearModePage from "@/app/modes/year/page";

const KEYS = ["ア", "イ", "ウ", "エ", "オ"] as const;
// Transcribed from the circled official answers in PDF pp.19–23 / pp.12–16.
const OFFICIAL_ANSWERS = [3, 4, 3, 1, 2, 4, 3, 5, 5, 2];

describe("衛生管理者2026年10月公表版の労働生理", () => {
  for (const [exam, all, source, first, total] of [
    ["eisei1", EISEI1_QUESTIONS, source1, 35, 98],
    ["eisei2", EISEI2_QUESTIONS, source2, 21, 70],
  ] as const) {
    it(`${exam}: 原本・公式正答・全肢解説を保つ`, () => {
      const paper = all.filter(q => q.season === "october");
      expect(all).toHaveLength(total);
      expect(paper).toHaveLength(10);
      expect(paper.map(q => q.qNumber)).toEqual(Array.from({ length: 10 }, (_, i) => first + i));
      for (const [i, q] of paper.entries()) {
        expect(q.question).toBe(source.questions[i].prompt);
        expect(q.choices).toEqual(source.questions[i].choices);
        expect(q.answer).toBe(KEYS[OFFICIAL_ANSWERS[i] - 1]);
        expect(q.officialAnswerNumber).toBe(String(OFFICIAL_ANSWERS[i]));
        expect(q.sourcePdfUrl).toBe(source.sourcePdfUrl);
        expect(q.sourceAnswerUrl).toBe(source.sourceAnswerUrl);
        expect(Object.keys(q.choiceExplanations ?? {})).toEqual(KEYS);
        for (const value of Object.values(q.choiceExplanations ?? {})) expect(value.length).toBeGreaterThan(20);
        expect(q.explanationCoverage).toBe("full");
        expect(q.questionNotice).toContain("部分収録");
        expect(q.hasImage).toBe(false);
        expect(isPracticeReadyQuestion(q)).toBe(true);
        expect(questionSourceEdition(q)).toBe("2026年10月公表問題");
        expect(JSON.stringify([q.question, q.choices])).not.toMatch(/[○�]/);
      }
      expect(paper[7].question).toContain("Ａ・Ｂ・Ｃの順");
      expect(paper[7].choices?.オ).toBe("抗原 ／ 体液性 ／ 免疫グロブリン");
      expect(paper[8].choices?.オ).toBe("増加 ／ 減少 ／ 副腎髄質 ／ 副腎皮質 ／ 増加");
    });

    it(`${exam}: 同期・遅延配信と年度フィルタが4月版から分離する`, async () => {
      const sync = getQuestionsByExamStrict(exam);
      const lazy = await getQuestionsForExam(exam);
      expect(lazy.map(q => q.id).sort()).toEqual(sync.map(q => q.id).sort());
      const october = filterQuestions(sync, { mode: "year", exam, year: 2026, season: "october", inOrder: true });
      expect(october).toHaveLength(10);
      expect(filterQuestions(sync, { mode: "year", exam, year: 2026, season: "published" })).toHaveLength(exam === "eisei1" ? 44 : 30);
      expect(EXAM_CONFIGS[exam].seasons).toContain("october");
      expect(groupByYearSeason(sync).map(g => g.label)).toEqual([
        "2026年10月公表問題", "2026年4月公表問題", "2025年10月公表問題",
      ]);
      expect(new Set(sync.map(questionPagePath)).size).toBe(sync.length);
      expect(questionPagePath(october[0])).toBe(`/q/${exam}/2026-october/gakka/q${first}`);
      expect(parseQuestionRoute({ exam, yearSeason: "2026-october", section: "gakka", qnum: `q${first}` })).not.toBeNull();
    });

    it(`${exam}: 年度別学習画面でも公表月と10問の範囲を表示する`, async () => {
      const html = renderToStaticMarkup(await YearModePage({ searchParams: Promise.resolve({ exam }) }));
      const doc = new DOMParser().parseFromString(html, "text/html");
      const october = Array.from(doc.querySelectorAll("a")).find(a => a.href.includes("season=october"));
      expect(october?.textContent).toContain("2026年10月公表問題");
      expect(october?.textContent).toContain("収録 10 問");
      expect(october?.textContent).not.toContain("10月試験");
      expect(doc.body.textContent).toContain("2026年4月公表問題");
    });
  }
});
