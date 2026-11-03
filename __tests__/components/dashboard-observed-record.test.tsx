import { describe,it,expect,beforeEach,afterEach,vi } from "vitest";
import { render,screen,cleanup,within } from "@testing-library/react";
import type * as React from "react";
vi.mock("@/components/motivation/LearningHeatmap",()=>({LearningHeatmap:()=>null}));
vi.mock("recharts",()=>{
 const Pass=({children}:{children?:React.ReactNode})=><>{children}</>;
 return {ResponsiveContainer:Pass,Radar:Pass,RadarChart:Pass,PolarGrid:Pass,PolarAngleAxis:Pass,PolarRadiusAxis:Pass,Tooltip:Pass};
});
import { DashboardOverview } from "@/components/account/tabs/DashboardOverview";
import { DashboardProgress } from "@/components/account/tabs/DashboardProgress";
import { LS_KEYS } from "@/lib/storage/keys";
beforeEach(()=>{cleanup();localStorage.clear();vi.stubGlobal("fetch",vi.fn().mockResolvedValue(new Response(JSON.stringify({meta:[{id:"q1",exam:"ap",category:"security"},{id:"q2",exam:"sc",category:"security"}]}))));});
afterEach(()=>vi.unstubAllGlobals());
function seed(){const entries=[...Array.from({length:10},(_,i)=>({id:"q1",correct:i<5})),...Array.from({length:2},()=>({id:"q2",correct:true}))];localStorage.setItem(LS_KEYS.history,JSON.stringify({entries}));return localStorage.getItem(LS_KEYS.history);}
describe("observed learning records, not derived pass probabilities",()=>{
 it("overview uses the most answered exam's actual correct/answered ratio and keeps storage",async()=>{
  const before=seed();render(<DashboardOverview/>);await screen.findByText("記録の正答率");
  const card=screen.getByText("記録の正答率").closest("div.relative");expect(card).not.toBeNull();
  expect(within(card as HTMLElement).getByText("50%")).toBeInTheDocument();
  expect(within(card as HTMLElement).getByText(/10問の記録/)).toBeInTheDocument();
  expect(screen.queryByText(/予測合格率|計測中|合格圏/)).toBeNull();expect(localStorage.getItem(LS_KEYS.history)).toBe(before);
 });
 it("progress displays actual ratios even below ten samples, sorting by answer count",async()=>{
  const before=seed();render(<DashboardProgress/>);await screen.findByText("試験別 記録の正答率（13区分）");
  const rows=screen.getAllByRole("link");expect(rows[0]).toHaveAttribute("href","/quiz?mode=random&exam=ap");
  expect(within(rows[0]).getByText("50%")).toBeInTheDocument();expect(rows[0]).toHaveTextContent("10問 解答済");
  expect(rows[1]).toHaveTextContent("100%");expect(rows[1]).toHaveTextContent("2問 解答済");
  expect(screen.queryByText(/合格確率|合格圏|計測開始/)).toBeNull();expect(localStorage.getItem(LS_KEYS.history)).toBe(before);
 });
 it("empty overview shows no measured percentage",async()=>{
  render(<DashboardOverview/>);await screen.findByText("記録の正答率");expect(screen.getByText("まだ回答記録がありません")).toBeInTheDocument();expect(screen.getByText("—")).toBeInTheDocument();
 });
 it("unanswered exam rows use a dash",async()=>{
  render(<DashboardProgress/>);await screen.findByText("試験別 記録の正答率（13区分）");
  for(const row of screen.getAllByRole("link")){expect(row).toHaveTextContent("0問 解答済");expect(within(row).getByText("—")).toBeInTheDocument();}
 });
});
