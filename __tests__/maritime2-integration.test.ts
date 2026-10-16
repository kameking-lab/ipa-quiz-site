import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { MARITIME2_ALL_QUESTIONS as stored, MARITIME2_QUESTIONS as ready } from "@/data/questions/maritime2";
import { ALL_QUESTIONS, QUESTIONS_BY_EXAM } from "@/data/questions";
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

describe("maritime2 registered original-only candidate", () => {
  it("connects190 accepted originals to eager/lazy/strict pools and keeps Sea2 distinct", async () => {
    expect(QUESTIONS_BY_EXAM[exam]).toEqual(ready);
    expect(ALL_QUESTIONS.filter(q => q.exam === exam)).toEqual(ready);
    expect(await getQuestionsForExam(exam)).toEqual(stored);
    expect(getQuestionsByExamStrict(exam)).toEqual(ready);
    expect(new Set(await getPoolIds({exam,mode:"random"}))).toEqual(new Set(ready.map(q=>q.id)));
    expect(getRegisteredExamCodes()).toHaveLength(77);expect(ALL_EXAM_CODES).not.toContain(exam);
    expect(getQuestionsByExamStrict("kai-toku2")).toHaveLength(48);
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
  it("returns canonical search hits for both sittings and every original subject", async () => {
    for(const season of ["march","september"])for(const [session,count] of [["kiso",25],["kogaku-a",25],["kogaku-b",25],["houki",20]] as const){
      const response=await searchGET(new Request(`http://localhost/api/search/questions?exam=${exam}&season=${season}&session=${session}&limit=60`));
      expect(response.status).toBe(200);const body=await response.json();expect(body.total).toBe(count);
      expect(new Set(body.hits.map((q:{id:string})=>q.id))).toEqual(new Set(ready.filter(q=>q.season===season&&q.session===session).map(q=>q.id)));
    }
  });
  it("offers40 native parents to due review and190 originals to sitemap", async () => {
    const native=stored.filter(q=>q.nativeB);
    const response=await duePOST(new Request("http://localhost/api/review/due",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({exam,historyIds:native.map(q=>q.id),reviewStore:{},today:"2026-10-16"})}));
    expect(response.status).toBe(200);expect(new Set((await response.json()).questions.map((q:{id:string})=>q.id))).toEqual(new Set(native.map(q=>q.id)));
    expect(new Set(getSitemapQuestions().filter(q=>q.exam===exam).map(q=>q.id))).toEqual(new Set(ready.map(q=>q.id)));
    expect(isPracticeReadyQuestion({...stored[0]!,needsReview:true})).toBe(false);
  });
  it("uses past-only policy for the canonical and original-ID prefix", () => {
    expect(isOfficialPastOnlyRequest(exam,"anything")).toBe(true);
    for(const q of ready)expect(isOfficialPastOnlyRequest("ap",q.id)).toBe(true);
  });
  it("shows the exact free past-paper scope and190 originals at home", () => {
    const catalog=getQualificationByExamCode(exam)!;
    expect(catalog.shortName).toBe("第二級海上無線通信士");
    for(const text of ["無料","回数制限なく","190原問","英語","通信術"])expect(catalog.reuseSummary).toContain(text);
    const home=getHomeDirectory().flatMap(d=>[...d.featured,...d.compact]).find(q=>q.key===exam)!;
    expect(home.href).toBe("/maritime2");expect(home.questionCount).toBe(190);expect(home.periodLabel).toBe("2期分");
  });
  it("registers the canonical on actual year/topic/stream and search entrypoints", () => {
    for(const file of ["app/modes/year/page.tsx","app/modes/topic/page.tsx","app/quiz/stream/page.tsx","app/api/search/questions/route.ts","components/search/SearchClient.tsx"]){
      expect(readFileSync(file,"utf8")).toContain('"maritime2"');
    }
  });
});
