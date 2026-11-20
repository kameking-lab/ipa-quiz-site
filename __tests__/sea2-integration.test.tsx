import { ALL_QUIZ_EXAM_CODES } from "@/lib/exam-config";
import { restoreNichimuSourceUrls } from "./fixtures/nichimu-archive";
import { describe, expect, it } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { KAI_TOKU2_ALL_QUESTIONS as stored, KAI_TOKU2_QUESTIONS as ready } from "@/data/questions/kai-toku2";
import { ALL_QUESTIONS, QUESTIONS_BY_EXAM } from "@/data/questions";
import { isPracticeReadyQuestion, shuffleChoices } from "@/lib/questions/filter";
import { getQuestionsForExam, getRegisteredExamCodes } from "@/lib/questions/get-questions";
import { getQuestionsByExamStrict } from "@/lib/seo/exam-meta";
import { questionPagePath } from "@/lib/seo/question-url";
import { getPoolIds } from "@/lib/questions/pool-server";
import { GET as nextGET } from "@/app/api/questions/next/route";
import { GET as searchGET } from "@/app/api/search/questions/route";
import { POST as duePOST } from "@/app/api/review/due/route";
import { buildQuestionJsonLd } from "@/lib/seo/question-jsonld";
import { QuestionAnswerCard } from "@/components/quiz/QuestionAnswerCard";
import { ExplanationCard } from "@/components/quiz/ExplanationCard";
import { EXAM_CONFIGS, ALL_EXAM_CODES } from "@/lib/exam-config";
import { choiceDisplayLabel } from "@/lib/questions/display";
import { isOfficialPastOnlyRequest } from "@/lib/questions/past-question-policy";
import { defaultPracticeSession } from "@/lib/questions/practice-session";
import { getHomeDirectory } from "@/lib/home/home-directory";
const exam = "kai-toku2";
const hold = "radio21-sea2-2023-02-kogaku-q16";

describe("Sea2 historical original-only candidate", () => {
  it("stores 72 originals and exposes them through eager, lazy-filtered, strict and practice pools", async () => {
    expect(stored).toHaveLength(72); expect(ready).toHaveLength(72);
    expect(new Set(stored.map(q => q.id)).size).toBe(72);
    expect(stored.filter(q => !isPracticeReadyQuestion(q)).map(q => q.id)).toEqual([]);
    expect(isPracticeReadyQuestion({...stored[0]!, needsReview: true})).toBe(false);
    expect(QUESTIONS_BY_EXAM[exam]).toEqual(ready);
    expect(ALL_QUESTIONS.filter(q => q.exam === exam)).toEqual(ready);
    expect((await getQuestionsForExam(exam)).filter(isPracticeReadyQuestion)).toEqual(ready);
    expect(getQuestionsByExamStrict(exam)).toEqual(ready);
    expect(new Set(await getPoolIds({ exam, mode: "random" }))).toEqual(new Set(ready.map(q => q.id)));
    expect(new Set(getRegisteredExamCodes())).toEqual(new Set(ALL_QUIZ_EXAM_CODES)); expect(ALL_EXAM_CODES).not.toContain(exam);
    expect(EXAM_CONFIGS[exam].sessions.map(s => s.expectedQuestions)).toEqual([12,12]);
    expect(defaultPracticeSession(exam)).toBe("houki");
    const home = getHomeDirectory().flatMap(d => [...d.featured,...d.compact]).find(q => q.key === exam)!;
    expect(home.questionCount).toBe(72); expect(home.periodLabel).toBe("3期分");
  });
  it("keeps all official keys, numeric printed order and 288 accepted explanations in card and JSON-LD consumers", () => {
    let reasons = 0;
    for (const q of stored) {
      expect(Array.isArray(q.choices)).toBe(false); expect(Object.keys(q.choices!)).toEqual(["ア","イ","ウ","エ"]);
      expect(Object.keys(q.choiceExplanations!)).toEqual(Object.keys(q.choices!));
      expect(q.answer).toBe(["ア","イ","ウ","エ"][Number(q.officialAnswerNumber)-1]);
      expect(q.explanation).toBe(q.choiceExplanations![q.answer as "ア"]);
      expect(shuffleChoices(q)).toBe(q); expect(choiceDisplayLabel(exam,"ア")).toBe("1");
      const [official] = restoreNichimuSourceUrls([q]);
      expect(official?.sourcePdfUrl).toMatch(/^https:\/\/www\.nichimu\.or\.jp\//);
      expect(official?.sourceAnswerUrl).toMatch(/-kaito\.pdf$/);
      if (!isPracticeReadyQuestion(q)) continue;
      const html = renderToStaticMarkup(<QuestionAnswerCard question={q} questionId={q.id} choices={q.choices} answerKey={q.answer} exam={q.exam} year={q.year} season={q.season} session={q.session} qNumber={q.qNumber}/>);
      expect((html.match(/role="radio"/g) ?? [])).toHaveLength(4);
      const text = (markup: string) => { const el = document.createElement("div"); el.innerHTML = markup; return el.textContent!.replace(/\s+/g, ""); };
      for (const value of Object.values(q.choices!)) expect(text(html)).toContain(value!.replace(/\s+/g, ""));
      for (const key of ["ア","イ","ウ","エ"] as const) {
        const explanation = renderToStaticMarkup(<ExplanationCard question={q} selected={key} isCorrect={q.answer===key} onNext={()=>{}}/>);
        expect(explanation).toContain(`href="${q.sourcePdfUrl}"`);
        expect(explanation).toContain(`href="${q.sourceAnswerUrl}"`);
        expect(text(explanation)).toContain(q.choiceExplanations![key]!.replace(/\s+/g, "")); reasons++;
      }
      const ld = buildQuestionJsonLd({question:q,pageUrlAbs:`https://www.kakomon-ai.jp${questionPagePath(q)}`,title:"Sea2",lastUpdatedISO:"2026-10-16"});
      expect(JSON.stringify(ld)).toContain(q.choices![q.answer as "ア"]);
    }
    expect(reasons).toBe(288);
  });
  it("serves every original repeatedly, including the independently accepted Q16", async () => {
    for (const q of ready) for (const shuffle of [0,1]) {
      const res = await nextGET(new Request(`http://localhost/api/questions/next?id=${q.id}&shuffle=${shuffle}`));
      expect(res.status).toBe(200); expect(await res.json()).toEqual(q);
    }
    const res = await nextGET(new Request(`http://localhost/api/questions/next?id=${hold}`));
    expect(res.status).toBe(200); const body = await res.json();
    expect(body.id).toBe(hold); expect(body.needsReview).toBe(false);
    expect(body.choiceExplanations).toEqual(stored.find(q=>q.id===hold)!.choiceExplanations);
  });
  it("returns 72 canonical search hits with the original paper numbering and all due originals", async () => {
    const all = await searchGET(new Request(`http://localhost/api/search/questions?exam=${exam}&limit=60`));
    expect(all.status).toBe(200);
    expect((await all.json()).total).toBe(72);
    expect(new Set(ready.map(questionPagePath)).size).toBe(72);
    const searchedIds: string[] = [];
    for (const [year, season] of [[2022, "february"], [2022, "october"], [2023, "february"]] as const) {
      for (const session of ["houki", "kogaku"]) {
        const response = await searchGET(new Request(`http://localhost/api/search/questions?exam=${exam}&year=${year}&season=${season}&session=${session}`));
        expect(response.status).toBe(200);
        const result = await response.json();
        expect(result.total).toBe(12);
        searchedIds.push(...result.hits.map((q: { id: string }) => q.id));
      }
    }
    expect(searchedIds.sort()).toEqual(ready.map(q => q.id).sort());
    const due = await duePOST(new Request("http://localhost/api/review/due",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({exam,historyIds:stored.map(q=>q.id),reviewStore:{},today:"2026-10-16"})}));
    expect(due.status).toBe(200); expect(new Set((await due.json()).questions.map((q:{id:string})=>q.id))).toEqual(new Set(ready.map(q=>q.id)));
  });
  it("blocks generated questions for both canonical and original-ID aliases", () => {
    expect(isOfficialPastOnlyRequest(exam,"anything")).toBe(true);
    expect(isOfficialPastOnlyRequest("ap",ready[0]!.id)).toBe(true);
    expect(isOfficialPastOnlyRequest("ap","kai-toku2-example")).toBe(true);
  });
});
