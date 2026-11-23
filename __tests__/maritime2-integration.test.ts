import { ALL_QUIZ_EXAM_CODES } from "@/lib/exam-config";
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { MARITIME2_ALL_QUESTIONS as stored, MARITIME2_QUESTIONS as ready } from "@/data/questions/maritime2";
import { ALL_QUESTIONS, QUESTIONS_BY_EXAM } from "@/data/questions";
import restored from "@/data/questions/maritime2/additional-papers.json";
import { isPracticeReadyQuestion, shuffleChoices } from "@/lib/questions/filter";
import { getQuestionsForExam, getRegisteredExamCodes } from "@/lib/questions/get-questions";
import { getQuestionsByExamStrict } from "@/lib/seo/exam-meta";
import { getSitemapQuestions } from "@/lib/seo/sitemap-pagination";
import { questionPagePath, findQuestionByRoute } from "@/lib/seo/question-url";
import { getPoolIds } from "@/lib/questions/pool-server";
import { GET as nextGET } from "@/app/api/questions/next/route";
import { GET as searchGET } from "@/app/api/search/questions/route";
import { POST as duePOST } from "@/app/api/review/due/route";
import { EXAM_CONFIGS, ALL_EXAM_CODES } from "@/lib/exam-config";
import { choiceDisplayLabel } from "@/lib/questions/display";
import { isOfficialPastOnlyRequest } from "@/lib/questions/past-question-policy";
import { defaultPracticeSession } from "@/lib/questions/practice-session";
import { getHomeDirectory } from "@/lib/home/home-directory";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";
const exam = "maritime2";
const allReady = [...ready, ...restored];
const allIds = new Set(allReady.map(q => q.id));

describe("maritime2 registered original-only candidate", () => {
  it("connects the 190 originals and 75 restored questions to eager, lazy and strict pools", async () => {
    expect(ready).toHaveLength(190);
    expect(restored).toHaveLength(75);
    expect(QUESTIONS_BY_EXAM[exam]).toEqual(allReady);
    expect(ALL_QUESTIONS.filter(q => q.exam === exam)).toEqual(allReady);
    expect(await getQuestionsForExam(exam)).toEqual(allReady);
    expect(getQuestionsByExamStrict(exam)).toEqual(allReady);
    expect(new Set(await getPoolIds({exam,mode:"random"}))).toEqual(allIds);
    expect(new Set(getRegisteredExamCodes())).toEqual(new Set(ALL_QUIZ_EXAM_CODES));expect(ALL_EXAM_CODES).not.toContain(exam);
    expect(getQuestionsByExamStrict("kai-toku2")).toHaveLength(72);
    expect(defaultPracticeSession(exam)).toBe("kiso");
    expect(EXAM_CONFIGS[exam].sessions.map(s=>s.expectedQuestions)).toEqual([25,25,25,20]);
    expect(stored.every(isPracticeReadyQuestion)).toBe(true);
  });
  it("keeps190 canonical original routes unique including40 printed B numbers", () => {
    expect(new Set(ready.map(questionPagePath)).size).toBe(190);
    for(const q of ready){
      const path=questionPagePath(q).split("/");
      expect(findQuestionByRoute(ALL_QUESTIONS,{exam:path[2]!,yearSeason:path[3]!,section:path[4]!,qnum:path[5]!})).toBe(q);
      expect(shuffleChoices(q)).toBe(q);
    }
    expect(choiceDisplayLabel(exam,"ア")).toBe("1");
  });
  it("serves every original through both standard and shuffled API requests", async () => {
    for(const q of ready)for(const shuffle of [0,1]){
      const response=await nextGET(new Request(`http://localhost/api/questions/next?id=${q.id}&shuffle=${shuffle}`));
      expect(response.status).toBe(200);expect(await response.json()).toEqual(q);
    }
  });
  it("returns canonical search hits for every published sitting and subject", async () => {
    const sittings = [
      { year: 2026, season: "march", technicalCount: 25, lawCount: 20 },
      { year: 2026, season: "september", technicalCount: 25, lawCount: 20 },
      { year: 2022, season: "september", technicalCount: 20, lawCount: 15 },
    ];
    for (const { year, season, technicalCount, lawCount } of sittings) {
      for (const session of ["kiso", "kogaku-a", "kogaku-b", "houki"]) {
        const response = await searchGET(new Request(`http://localhost/api/search/questions?exam=${exam}&year=${year}&season=${season}&session=${session}&limit=60`));
        expect(response.status).toBe(200);
        const body = await response.json();
        const count = session === "houki" ? lawCount : technicalCount;
        expect(body.total).toBe(count);
        expect(body.hits).toHaveLength(count);
        const expected = allReady.filter(q => q.year === year && q.season === season && q.session === session);
        expect(new Set(body.hits.map((q: { id: string }) => q.id))).toEqual(new Set(expected.map(q => q.id)));
      }
    }
  });
  it("offers 40 native parents to due review and all published questions to the sitemap", async () => {
    const native=stored.filter(q=>q.nativeB);
    expect(native).toHaveLength(40);
    const response=await duePOST(new Request("http://localhost/api/review/due",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({exam,historyIds:native.map(q=>q.id),reviewStore:{},today:"2026-10-16"})}));
    expect(response.status).toBe(200);expect(new Set((await response.json()).questions.map((q:{id:string})=>q.id))).toEqual(new Set(native.map(q=>q.id)));
    expect(new Set(getSitemapQuestions().filter(q=>q.exam===exam).map(q=>q.id))).toEqual(allIds);
    expect(isPracticeReadyQuestion({...stored[0]!,needsReview:true})).toBe(false);
  });
  it("uses past-only policy for the canonical and original-ID prefix", () => {
    expect(isOfficialPastOnlyRequest(exam,"anything")).toBe(true);
    for(const q of ready)expect(isOfficialPastOnlyRequest("ap",q.id)).toBe(true);
  });
  it("shows the free past-paper scope and all three published sittings at home", () => {
    const catalog=getQualificationByExamCode(exam)!;
    expect(catalog.shortName).toBe("第二級海上無線通信士");
    for(const text of ["無料","回数制限なく","190原問","英語","通信術"])expect(catalog.reuseSummary).toContain(text);
    const home=getHomeDirectory().flatMap(d=>[...d.featured,...d.compact]).find(q=>q.key===exam)!;
    expect(home.href).toBe("/maritime2");expect(home.questionCount).toBe(265);expect(home.periodLabel).toBe("3期分");
  });
  it("registers the canonical on actual year/topic/stream and search entrypoints", () => {
    for(const file of ["app/modes/year/page.tsx","app/modes/topic/page.tsx","app/quiz/stream/page.tsx","app/api/search/questions/route.ts","components/search/SearchClient.tsx"]){
      expect(readFileSync(file,"utf8")).toContain("ALL_QUIZ_EXAM_CODES");
    }
  });
});
