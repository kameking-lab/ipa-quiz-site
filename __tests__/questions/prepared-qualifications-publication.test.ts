import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { ALL_QUIZ_EXAM_CODES, EXAM_CONFIGS } from "@/lib/exam-config";
import { getQualificationByExamCode, isExamPublished } from "@/lib/qualifications/catalog";
import { getQuestionsForExam, getRegisteredExamCodes } from "@/lib/questions/get-questions";
import { isPracticeReadyQuestion, shuffleChoices } from "@/lib/questions/filter";
import { choiceDisplayLabel } from "@/lib/questions/display";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { getHomeDirectory } from "@/lib/home/home-directory";
import QualificationsPage from "@/app/qualifications/page";
import { generateStaticParams, generateMetadata } from "@/app/[exam]/page";
import { getAvailableExams, getQuestionsByExamStrict, groupByYearSeason } from "@/lib/seo/exam-meta";
import { questionPagePath, findQuestionByRoute } from "@/lib/seo/question-url";
import { renderExamsSitemapXml, renderQuestionsSitemapChunkXml } from "@/lib/seo/sitemap-xml";
import { getSitemapChunkCount } from "@/lib/seo/sitemap-pagination";
import { searchQuestions } from "@/lib/search/question-index";
import { defaultPracticeSession, practiceSessionLabel } from "@/lib/questions/practice-session";
import type { ExamCode, Question } from "@/lib/questions/types";

const exams: ExamCode[] = ["unko-kanrisha-ryokaku", "shobo-setsubishi-kou1", "kikenbutsu-kou", "kikenbutsu-hei", "shobo-setsubishi-kou4", "shobo-setsubishi-otsu6", "kikenbutsu-otsu4", "unko-kanrisha-kamotsu"];

describe("eight prepared qualifications are published", () => {
  const counts: Record<string, number> = {
    "kikenbutsu-otsu4": 35, "kikenbutsu-kou": 45, "kikenbutsu-hei": 25,
    "shobo-setsubishi-kou1": 26, "shobo-setsubishi-kou4": 15, "shobo-setsubishi-otsu6": 16,
    "unko-kanrisha-kamotsu": 86, "unko-kanrisha-ryokaku": 92,
  };
  const examSitemap = renderExamsSitemapXml();
  const questionSitemap = Array.from({ length: getSitemapChunkCount() }, (_, i) => renderQuestionsSitemapChunkXml(i)).join("");

  it("renders all eight qualification cards and includes each hub in static generation", async () => {
    const doc = new DOMParser().parseFromString(renderToStaticMarkup(createElement(QualificationsPage)), "text/html");
    const params = await generateStaticParams();
    const directory = getHomeDirectory().flatMap(domain => [...domain.featured, ...domain.compact]);
    for (const exam of exams) {
      expect(params).toContainEqual({ exam });
      expect(directory.find(item => item.key === exam)).toMatchObject({ href: `/${exam}`, questionCount: counts[exam] });
      const card = [...doc.querySelectorAll("article")].find(article => article.querySelector(`a[href="/${exam}"]`));
      expect(card?.textContent).toContain(`収録 ${counts[exam]}問`);
      expect(card?.textContent).not.toMatch(/非公開で保管|許可待ち/);
      const metadata = await generateMetadata({ params: Promise.resolve({ exam }) });
      expect(metadata.alternates?.canonical).toBe(`/${exam}`);
      expect(metadata.robots).toBeUndefined();
    }
  });

  for (const exam of exams) {
    const dir = join(process.cwd(), "data/questions", exam);
    const questions: Question[] = readdirSync(dir)
      .filter(name => /^(published-|20\d\d)/.test(name) && name.endsWith(".json"))
      .flatMap(name => JSON.parse(readFileSync(join(dir, name), "utf8")));

    it(`${exam}: exposes the same complete corpus to lists, pages, search and practice`, async () => {
      expect(getQualificationByExamCode(exam)?.status).toBe("live");
      expect(isExamPublished(exam)).toBe(true);
      expect(questions).toHaveLength(counts[exam]);
      expect(QUESTIONS_BY_EXAM[exam]).toEqual(questions);
      expect(await getQuestionsForExam(exam)).toEqual(questions);
      expect(getQuestionsByExamStrict(exam)).toEqual(questions);
      expect(getRegisteredExamCodes()).toContain(exam);
      expect(ALL_QUIZ_EXAM_CODES).toContain(exam);
      expect(getAvailableExams()).toContain(exam);
      expect(examSitemap).toContain(`/${exam}</loc>`);
      for (const group of groupByYearSeason(questions)) {
        expect(examSitemap).toContain(`/${exam}/${group.key}</loc>`);
      }
      const hits = [];
      for (let offset = 0; offset < questions.length; offset += 60) {
        const result = await searchQuestions({ exam, offset, limit: 60 });
        expect(result.total).toBe(questions.length);
        hits.push(...result.hits);
      }
      expect(hits.map(hit => hit.id).sort()).toEqual(questions.map(q => q.id).sort());
      for (const q of questions) {
        const path = questionPagePath(q);
        expect(questionSitemap, q.id).toContain(`${path}</loc>`);
        const [, , exam, yearSeason, section, qnum] = path.split("/");
        expect(findQuestionByRoute(questions, { exam, yearSeason, section, qnum })?.id).toBe(q.id);
      }
    });

    it(`${exam}: preserves sources, images, all-choice explanations and printed numbering`, () => {
      expect(new Set(questions.map(q => q.id)).size).toBe(questions.length);
      for (const q of questions) {
        expect(q.publicAllowed).toBe(true);
        expect(isPracticeReadyQuestion(q), q.id).toBe(true);
        expect(q.exam).toBe(exam);
        expect(q.sourceAnswerUrl).toMatch(/^https:\/\//);
        expect(q.sourcePdfUrl).toMatch(/^https:\/\//);
        expect(q.sourceAttribution).toContain("独自作成");
        if (q.season === "published") expect(questionSourceEdition(q)).toContain("2026年6月公表版");
        expect(EXAM_CONFIGS[q.exam].seasons).toContain(q.season);
        expect(EXAM_CONFIGS[q.exam].sessions.find(s => s.session === q.session)?.categories).toContain(q.category);
        expect(defaultPracticeSession(q.exam)).toBe("gakka");
        expect(practiceSessionLabel(q.session, q.exam)).not.toContain("薬学");
        for (const url of [...(q.imageUrls ?? []), ...(q.answerImageUrls ?? [])]) {
          expect(existsSync(join(process.cwd(), "public", url)), url).toBe(true);
          expect(existsSync(join(process.cwd(), "private-assets/k11", url))).toBe(false);
        }
        if (q.type === "descriptive") continue;
        const keys = Object.keys(q.choices!);
        expect(Object.keys(q.choiceExplanations!).sort()).toEqual(keys.sort());
        for (const reason of Object.values(q.choiceExplanations!)) expect(reason!.length).toBeGreaterThan(12);
        for (const key of Array.isArray(q.answer) ? q.answer : [q.answer]) expect(keys).toContain(key);
        if (Array.isArray(q.answer)) expect(q.requiredSelections).toBe(q.answer.length);
        expect(choiceDisplayLabel(exam, "ア")).toBe("1");
        expect(shuffleChoices(q)).toBe(q);
      }
    });
  }

  it("丙種 keeps the 25 official answers and publication identity", () => {
    const questions: Question[] = JSON.parse(readFileSync(join(process.cwd(), "data/questions/kikenbutsu-hei/published-202606.json"), "utf8"));
    expect(questions.map(q => Number(q.officialAnswerNumber))).toEqual([2,4,4,2,3,3,1,3,4,2,4,3,3,1,1,2,4,3,3,1,4,4,4,3,2]);
    expect(questions.map(q => q.qNumber)).toEqual(Array.from({ length: 25 }, (_, i) => i + 1));
    for (const q of questions) {
      expect(q.sourceExamYear).toBeNull();
      expect(q.season).toBe("published");
      expect(q.publicationVersion).toBe("2026-06");
    }
  });

  it("甲種 keeps all 45 visually verified official answers and source pages", () => {
    const questions: Question[] = JSON.parse(readFileSync(join(process.cwd(), "data/questions/kikenbutsu-kou/published-202606.json"), "utf8"));
    expect(questions.map(q => Number(q.officialAnswerNumber))).toEqual([1,1,2,5,3,4,4,4,5,3,3,4,1,5,3,1,4,5,5,3,2,2,2,1,2,1,1,1,3,2,4,4,1,2,3,2,5,2,2,2,4,3,5,5,5]);
    for (const [i, q] of questions.entries()) {
      expect(q.qNumber).toBe(i + 1);
      expect(q.sourcePdfUrl).toContain(`#page=${Math.floor((i + 1) / 2) + 1}`);
      expect(q.sourceAnswerUrl).toContain("#page=24");
      expect(q.sourceExamYear).toBeNull();
      expect(q.publicationVersion).toBe("2026-06");
    }
  });

  it("甲1 preserves the class-specific written range and all practical answer slots", () => {
    const questions: Question[] = JSON.parse(readFileSync(join(process.cwd(), "data/questions/shobo-setsubishi-kou1/published-202606.json"), "utf8"));
    const written = questions.filter(q => q.session === "gakka");
    expect(written.map(q => q.qNumber)).toEqual([1,2,3,4,5,6,8,13,14,15,16,17,18,19,20,21,25,29,30]);
    expect(written.map(q => Number(q.officialAnswerNumber))).toEqual([4,4,4,3,3,2,4,4,3,2,3,2,2,2,2,1,1,1,3]);
    const heads = questions.filter(q => q.qNumber === 35);
    expect(heads.map(q => q.officialAnswerNumber)).toEqual(["ア", "イ", "ウ", "エ"]);
    expect(heads.map(q => q.part)).toEqual(["1", "2", "3", "4"]);
    const calculation = questions.filter(q => q.qNumber === 36);
    expect(calculation).toHaveLength(3);
    for (const q of calculation) {
      expect(q.type).toBe("descriptive");
      expect(q.modelAnswer!.length).toBeGreaterThan(10);
      expect(q.scoringCriteria!.length).toBeGreaterThan(15);
      expect(q.answerImageUrls).toHaveLength(1);
    }
  });

  it("乙4 keeps all 35 official answers and excerpt identity", () => {
    const questions: Question[] = JSON.parse(readFileSync(join(process.cwd(), "data/questions/kikenbutsu-otsu4/published-202606.json"), "utf8"));
    expect(questions.map(q => q.officialAnswerNumber)).toEqual(
      [4,1,4,1,4,3,2,2,5,4,2,2,2,3,2,1,1,4,5,5,4,1,2,5,3,5,3,1,4,5,5,1,4,4,1].map(String),
    );
    for (const q of questions) {
      expect(q.sourceExamYear).toBeNull();
      expect(q.season).toBe("published");
      expect(q.publicationVersion).toBe("2026-06");
      expect(q.questionNotice).toContain("個別の出題年度・回は非公表");
    }
  });

  it("貨物 preserves every answer slot and exact multiple-selection sets in both official tables", () => {
    const dir = join(process.cwd(), "data/questions/unko-kanrisha-kamotsu");
    const official: Record<string, (number | number[])[]> = JSON.parse(readFileSync(join(dir, "official-answers.json"), "utf8"));
    for (const year of ["2024", "2023"]) {
      if (!existsSync(join(dir, `${year}.json`))) continue;
      const questions: Question[] = JSON.parse(readFileSync(join(dir, `${year}.json`), "utf8"));
      expect(new Set(questions.map(q => q.qNumber)).size).toBe(30);
      for (let n = 1; n <= 30; n++) {
        const rows = questions.filter(q => q.qNumber === n);
        const expected = official[year][n - 1];
        if (rows[0].part) {
          expect(rows.map(q => Number(q.officialAnswerNumber))).toEqual(expected);
          expect(new Set(rows.map(q => q.part)).size).toBe(rows.length);
        } else {
          expect(rows).toHaveLength(1);
          expect(rows[0].officialAnswerNumber).toBe(String(expected));
        }
        for (const q of rows) {
          const keys = Array.isArray(q.answer) ? q.answer : [q.answer];
          expect(keys.map(key => "アイウエオカキク".indexOf(key) + 1).join(",")).toBe(q.officialAnswerNumber);
        }
      }
    }
  });

  it("旅客 preserves every answer slot and exact multiple-selection sets in both official tables", () => {
    const dir = join(process.cwd(), "data/questions/unko-kanrisha-ryokaku");
    const official: Record<string, (number | number[])[]> = JSON.parse(readFileSync(join(dir, "official-answers.json"), "utf8"));
    for (const year of ["2024", "2023"]) {
      if (!existsSync(join(dir, `${year}.json`))) continue;
      const questions: Question[] = JSON.parse(readFileSync(join(dir, `${year}.json`), "utf8"));
      expect(new Set(questions.map(q => q.qNumber)).size).toBe(30);
      for (let n = 1; n <= 30; n++) {
        const rows = questions.filter(q => q.qNumber === n);
        const expected = official[year][n - 1];
        if (rows[0].part) {
          expect(rows.map(q => Number(q.officialAnswerNumber))).toEqual(expected);
          expect(new Set(rows.map(q => q.part)).size).toBe(rows.length);
        } else {
          expect(rows).toHaveLength(1);
          expect(rows[0].officialAnswerNumber).toBe(String(expected));
        }
        for (const q of rows) {
          const keys = Array.isArray(q.answer) ? q.answer : [q.answer];
          expect(keys.map(key => "アイウエオカキク".indexOf(key) + 1).join(",")).toBe(q.officialAnswerNumber);
        }
      }
    }
  });

  it("消防設備士 includes only the target class and common written questions, with practical answer images", () => {
    for (const [exam, numbers, answers, practicalCount] of [
      ["shobo-setsubishi-otsu6", [1,2,3,4,5,6,7,13,15,17,18,19,29,41], [3,1,2,4,1,4,2,2,2,3,2,4,3,3], 2],
      ["shobo-setsubishi-kou4", [1,2,3,4,5,6,11,17,18,19,20,28,32], [4,4,4,3,3,2,4,2,2,2,2,1,2], 2],
    ] as const) {
      const questions: Question[] = JSON.parse(readFileSync(join(process.cwd(), `data/questions/${exam}/published-202606.json`), "utf8"));
      const written = questions.filter(q => q.session === "gakka");
      expect(written.map(q => q.qNumber)).toEqual(numbers);
      expect(written.map(q => Number(q.officialAnswerNumber))).toEqual(answers);
      const practical = questions.filter(q => q.session === "practical");
      expect(practical).toHaveLength(practicalCount);
      for (const q of practical.filter(q => q.type === "descriptive")) {
        expect(q.modelAnswer!.length).toBeGreaterThan(5);
        expect(q.scoringCriteria!.length).toBeGreaterThan(15);
        expect(q.answerImageUrls?.length).toBeGreaterThan(0);
      }
      for (const q of questions) {
        expect(q.sourceExamYear).toBeNull();
        expect(q.publicationVersion).toBe("2026-06");
        expect(q.officialQuestionLabel).toBeTruthy();
      }
    }
  });
});
