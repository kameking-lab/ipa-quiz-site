import { describe,it,expect,beforeEach,vi } from "vitest";
import { render,screen,cleanup } from "@testing-library/react";
import { EssayResultView } from "@/components/essay/EssayResultView";
import { AfternoonResultView } from "@/components/afternoon/AfternoonResultView";
import { findEssayQuestion } from "@/lib/essay/load";
import { findAfternoonQuestion } from "@/lib/afternoon/load";
import type { EssayGradingResult } from "@/lib/essay/types";
import { EssayHistoryView } from "@/app/account/essay-history/EssayHistoryView";
const history = vi.hoisted(() => ({clear:vi.fn(),entries:[{id:"history1",questionId:"au-2024a-pm2-q1",exam:"au",industry:"it",rank:"A",totalScore:80,passProbability:99,gradedAt:"2026-10-08"}]}));
vi.mock("@/lib/storage/essay-history",()=>({readEssayHistory:()=>history.entries,clearEssayHistory:history.clear}));
beforeEach(cleanup);
const result:EssayGradingResult={questionId:"au-2024a-pm2-q1",industry:"it",rank:"A",passProbability:99,subResults:["ア","イ","ウ"].map(key=>({key:key as "ア"|"イ"|"ウ",score:80,axes:{relevance:80,logic:70,concreteness:60,industryFit:60},goodPoints:[],improvements:["根拠を示す"],missingElements:[],charCount:800})),overallAdvice:"改善を確認",unnecessaryElements:[],gradedAt:"2026-10-08",gradingMode:"ai"};
describe("grading presentation",()=>{
 it("normal AI retains feedback without pass odds",()=>{
  render(<EssayResultView result={result} question={findEssayQuestion(result.questionId)!}/>);
  expect(screen.getAllByText("根拠を示す")).toHaveLength(3);
  expect(screen.queryByText(/合格濃厚|合格率予測|99%/)).toBeNull();
  expect(screen.getByText("実際の合格率・合否の予測ではありません")).toBeInTheDocument();
 });
 it("legacy simplified essay never displays a rank or content axes",()=>{
  render(<EssayResultView result={{...result,gradingMode:"simplified"}} question={findEssayQuestion(result.questionId)!}/>);
  expect(screen.getByRole("status")).toHaveTextContent("内容を評価したものではありません");
  expect(screen.queryByText("設問への適合")).toBeNull();expect(screen.queryByText("A")).toBeNull();
 });
 it("legacy simplified afternoon never displays a score",()=>{
  render(<AfternoonResultView result={{questionId:"ap-2024h-pm-q1",totalScore:70,subResults:[],overallComment:"",gradingMode:"simplified"}} question={findAfternoonQuestion("ap-2024h-pm-q1")!}/>);
  expect(screen.getByRole("status")).toHaveTextContent("内容を評価したものではありません");expect(screen.queryByText(/総合/)).toBeNull();
 });
});

describe("stored grading history presentation",()=>{
 it("retains stored legacy values while hiding uncalibrated pass predictions",()=>{
  history.entries[0]!.rank="fail";const before=JSON.stringify(history.entries);render(<EssayHistoryView/>);
  expect(screen.queryByText(/合格率予測|99%|不合格/)).toBeNull();
  expect(screen.getByText("参考スコア 80（合否の予測ではありません）")).toBeInTheDocument();
  expect(history.clear).not.toHaveBeenCalled();expect(JSON.stringify(history.entries)).toBe(before);
 });
});
