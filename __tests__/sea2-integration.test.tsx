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
  it("stores48 and exposes exactly48 ready originals through eager, lazy-filtered, strict and practice pools", async () => {
    expect(stored).toHaveLength(48); expect(ready).toHaveLength(48);
    expect(new Set(stored.map(q => q.id)).size).toBe(48);
    expect(stored.filter(q => !isPracticeReadyQuestion(q)).map(q => q.id)).toEqual([]);
    expect(isPracticeReadyQuestion({...stored[0]!, needsReview: true})).toBe(false);
    expect(QUESTIONS_BY_EXAM[exam]).toEqual(ready);
    expect(ALL_QUESTIONS.filter(q => q.exam === exam)).toEqual(ready);
    expect((await getQuestionsForExam(exam)).filter(isPracticeReadyQuestion)).toEqual(ready);
    expect(getQuestionsByExamStrict(exam)).toEqual(ready);
    expect(new Set(await getPoolIds({ exam, mode: "random" }))).toEqual(new Set(ready.map(q => q.id)));
    expect(getRegisteredExamCodes()).toHaveLength(79); expect(ALL_EXAM_CODES).not.toContain(exam);
    expect(EXAM_CONFIGS[exam].sessions.map(s => s.expectedQuestions)).toEqual([12,12]);
    expect(defaultPracticeSession(exam)).toBe("houki");
    const home = getHomeDirectory().flatMap(d => [...d.featured,...d.compact]).find(q => q.key === exam)!;
    expect(home.questionCount).toBe(48); expect(home.periodLabel).toBe("2期分");
  });
  it("keeps48 official keys, numeric printed order and192 accepted explanations in actual card/JSONLD consumers", () => {
    let reasons = 0;
    for (const q of stored) {
      expect(Array.isArray(q.choices)).toBe(false); expect(Object.keys(q.choices!)).toEqual(["ア","イ","ウ","エ"]);
      expect(Object.keys(q.choiceExplanations!)).toEqual(Object.keys(q.choices!));
      expect(q.answer).toBe(["ア","イ","ウ","エ"][Number(q.officialAnswerNumber)-1]);
      expect(q.explanation).toBe(q.choiceExplanations![q.answer as "ア"]);
      expect(shuffleChoices(q)).toBe(q); expect(choiceDisplayLabel(exam,"ア")).toBe("1");
      expect(q.sourcePdfUrl).toMatch(/^https:\/\/www\.nichimu\.or\.jp\//);
      expect(q.sourceAnswerUrl).toMatch(/-kaito\.pdf$/);
      if (!isPracticeReadyQuestion(q)) continue;
      const html = renderToStaticMarkup(<QuestionAnswerCard question={q} questionId={q.id} choices={q.choices} answerKey={q.answer} exam={q.exam} year={q.year} season={q.season} session={q.session} qNumber={q.qNumber}/>);
      expect((html.match(/role="radio"/g) ?? [])).toHaveLength(4);
      const text = (markup: string) => { const el = document.createElement("div"); el.innerHTML = markup; return el.textContent!.replace(/\s+/g, ""); };
      for (const value of Object.values(q.choices!)) expect(text(html)).toContain(value!.replace(/\s+/g, ""));
      for (const key of ["ア","イ","ウ","エ"] as const) {
        const explanation = renderToStaticMarkup(<ExplanationCard question={q} selected={key} isCorrect={q.answer===key} starred={false} onToggleStar={()=>{}} onNext={()=>{}} onAskAI={()=>{}}/>);
        expect(explanation).toContain(`href="${q.sourceAnswerUrl}"`);
        expect(text(explanation)).toContain(q.choiceExplanations![key]!.replace(/\s+/g, "")); reasons++;
      }
      const ld = buildQuestionJsonLd({question:q,pageUrlAbs:`https://www.kakomon-ai.jp${questionPagePath(q)}`,title:"Sea2",lastUpdatedISO:"2026-10-16"});
      expect(JSON.stringify(ld)).toContain(q.choices![q.answer as "ア"]);
    }
    expect(reasons).toBe(192);
  });
  it("serves48 originals repeatedly and serves the independently accepted Q16 after exact3 overlay", async () => {
    for (const q of ready) for (const shuffle of [0,1]) {
      const res = await nextGET(new Request(`http://localhost/api/questions/next?id=${q.id}&shuffle=${shuffle}`));
      expect(res.status).toBe(200); expect(await res.json()).toEqual(q);
    }
    const res = await nextGET(new Request(`http://localhost/api/questions/next?id=${hold}`));
    expect(res.status).toBe(200); const body = await res.json();
    expect(body.id).toBe(hold); expect(body.needsReview).toBe(false);
    expect(body.choiceExplanations).toEqual(stored.find(q=>q.id===hold)!.choiceExplanations);
  });
  it("returns48 search canonical hits and keeps the original paper numbering and all48 due originals", async () => {
    const res = await searchGET(new Request(`http://localhost/api/search/questions?exam=${exam}&limit=60`));
    expect(res.status).toBe(200); const data = await res.json(); expect(data.total).toBe(48);
    expect(new Set(data.hits.map((q:{id:string})=>q.id))).toEqual(new Set(ready.map(q=>q.id)));
    expect(new Set(ready.map(questionPagePath)).size).toBe(48);
    for (const [season,session,n] of [["october","houki",12],["october","kogaku",12],["february","houki",12],["february","kogaku",12]] as const) {
      const response = await searchGET(new Request(`http://localhost/api/search/questions?exam=${exam}&season=${season}&session=${session}&limit=60`));
      expect((await response.json()).total).toBe(n);
    }
    const due = await duePOST(new Request("http://localhost/api/review/due",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({exam,historyIds:stored.map(q=>q.id),reviewStore:{},today:"2026-10-16"})}));
    expect(due.status).toBe(200); expect(new Set((await due.json()).questions.map((q:{id:string})=>q.id))).toEqual(new Set(ready.map(q=>q.id)));
  });
  it("blocks generated questions for both canonical and original-ID aliases", () => {
    expect(isOfficialPastOnlyRequest(exam,"anything")).toBe(true);
    expect(isOfficialPastOnlyRequest("ap",ready[0]!.id)).toBe(true);
    expect(isOfficialPastOnlyRequest("ap","kai-toku2-example")).toBe(true);
  });
});
