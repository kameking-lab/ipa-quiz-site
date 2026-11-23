import { describe, expect, it } from "vitest";
import { generateMetadata as examMetadata } from "@/app/[exam]/page";
import { generateMetadata as questionMetadata } from "@/app/q/[exam]/[yearSeason]/[section]/[qnum]/page";
import { ALL_QUESTIONS, QUESTIONS_BY_EXAM } from "@/data/questions";
import { getHomeDirectory } from "@/lib/home/home-directory";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";
import { getQuestionsForExam, getRegisteredExamCodes } from "@/lib/questions/get-questions";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import { examCatalog } from "@/mobile/shared/catalog-source";
import mobileCatalog from "@/mobile/src/generated/catalog.json";

const directory = getHomeDirectory().flatMap(({ featured, compact }) => [...featured, ...compact]);

describe("技能検定の公開範囲", () => {
  it("本番で公開済みの建設機械整備2級を既存の区分と問題URLで公開する", async () => {
    const exam = "kensetsu-kikai-seibi2";
    const id = "kensetsu-kikai-seibi2-2025-early-gakka-a-001";
    const params = { exam, yearSeason: "2025-early", section: "gakka", qnum: "q1" };
    const url = "/q/kensetsu-kikai-seibi2/2025-early/gakka/q1";
    expect(getQualificationByExamCode(exam)?.status).toBe("live");
    expect(directory.find(entry => entry.key === exam)?.href).toBe(`/${exam}`);
    expect(getRegisteredExamCodes()).toContain(exam);
    expect((await getQuestionsForExam(exam)).some(question => question.id === id)).toBe(true);
    const question = findQuestionByRoute(ALL_QUESTIONS, params);
    expect(question?.id).toBe(id);
    expect(question && questionPagePath(question)).toBe(url);
    expect((await examMetadata({ params: Promise.resolve({ exam }) })).alternates?.canonical).toBe(`/${exam}`);
    expect((await questionMetadata({ params: Promise.resolve(params) })).alternates?.canonical).toBe(url);
  });

  it.each([
    ["building-cleaning-1", 100],
    ["building-cleaning2", 100],
    ["building-cleaning3", 100],
    ["building-cleaning-ssw1", 17],
    ["concrete-assou1", 100],
    ["concrete-assou2", 100],
    ["glass-sekou1", 100],
    ["kawarabuki1", 100],
    ["kawarabuki2", 100],
    ["restaurant-1", 200],
    ["restaurant-2", 200],
    ["restaurant-3", 200],
    ["sakui-rotary1", 100],
    ["technical-illustration-cad1", 50],
  ] as const)(
    "補充済みの %s を %i 問公開する",
    async (exam, count) => {
      expect(getQualificationByExamCode(exam)?.status).toBe("live");
      expect(directory.find(entry => entry.key === exam)).toMatchObject({ href: `/${exam}`, questionCount: count });
      expect(getRegisteredExamCodes()).toContain(exam);
      const questions = await getQuestionsForExam(exam);
      expect(questions).toHaveLength(count);
      expect(questions).toEqual(QUESTIONS_BY_EXAM[exam]);
      expect((await examMetadata({ params: Promise.resolve({ exam }) })).alternates?.canonical).toBe(`/${exam}`);
      const mobileEntry = mobileCatalog.exams.find(entry => entry.code === exam);
      expect(mobileEntry?.count).toBe(count);
      expect(await examCatalog(exam)).toEqual(mobileEntry);
    },
  );

  it.each([2022, 2023])("ビルクリーニング3級の%d年度を個別URLで公開する", async year => {
    const exam = "building-cleaning3";
    const params = { exam, yearSeason: `${year}-annual`, section: "gakka", qnum: "q1" };
    const url = `/q/${exam}/${year}-annual/gakka/q1`;
    expect(QUESTIONS_BY_EXAM[exam]?.filter(question => question.year === year)).toHaveLength(25);
    expect(findQuestionByRoute(ALL_QUESTIONS, params)?.id).toBe(`${exam}-${year}-annual-gakka-q1`);
    expect((await questionMetadata({ params: Promise.resolve(params) })).alternates?.canonical).toBe(url);
  });
});
