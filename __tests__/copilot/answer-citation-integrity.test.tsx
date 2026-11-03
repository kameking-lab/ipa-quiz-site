import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CitationCards } from "@/components/copilot/CitationCards";
import { buildCitationFooter, citationFooterForResponse, selectCitedCandidates, stripCitationFooter, CITATION_UNVERIFIED_NOTICE } from "@/lib/copilot/citations";
import { createCopilotResponseStream } from "@/lib/copilot/streaming";
import type { CitationMeta } from "@/lib/copilot/header-codec";
import type { RerankedCandidate } from "@/lib/copilot/types";
vi.mock("@/lib/posthog", () => ({ posthogCapture: vi.fn() }));
vi.mock("@/lib/monitoring/sentry", () => ({ captureException: vi.fn() }));

const candidates = ["IP2024問1 MA", "用語集 MA", "看護師2024午後問41 糖尿病フットケア", "用語集 分析"].map((title, index) => ({
  ordinal: index + 1, title, docId: `fixture:${index}`, kind: "glossary" as const, url: `/fixture/${index}`, fullSourceUrl: `/fixture/${index}`, snippet: title, score: 1, rerankScore: 1,
})) satisfies CitationMeta[];
const passages: RerankedCandidate[] = candidates.map(c => ({score:1,rerankScore:1,doc:{id:c.docId,kind:"glossary" as const,title:c.title,url:c.url,text:c.snippet,meta:{}}}));
const candidateFooter = buildCitationFooter(passages);
const answer = "アは蓄積データの分析、エは見込み顧客の獲得・育成を効率化するMAです。[1]";

describe("answer-used citation integrity", () => {
  it("does not let an old four-source footer turn unused candidates into citations", () => {
    expect(selectCitedCandidates(answer + candidateFooter, candidates).map(c => c.ordinal)).toEqual([1]);
    expect(stripCitationFooter(answer + candidateFooter)).toBe(answer);
    expect(citationFooterForResponse(candidateFooter,answer)).not.toContain("フットケア");
  });
  it("preserves original ordinals and legitimately cited references", () => {
    expect(selectCitedCandidates("医学問題の説明です。[3]", candidates).map(c=>c.ordinal)).toEqual([3]);
    expect(citationFooterForResponse(candidateFooter,"用語の確認 [2]")).toContain("- [2]");
    expect(citationFooterForResponse(candidateFooter,"用語の確認 [2]")).not.toContain("- [1]");
  });
  it("does not claim sources for invalid markers, code examples or source lists alone", () => {
    for (const response of ["引用なし", "未知 [99]", "例 `[1]`", candidateFooter]) {
      expect(selectCitedCandidates(response,candidates)).toEqual([]);
      expect(citationFooterForResponse(candidateFooter,response)).toBe("");
    }
  });
  it("filters the server stream footer using the reported IP2024 question, including chunk-split markers", async () => {
    const stream=createCopilotResponseStream({provider:{name:"mock",async *streamChat(){yield answer.slice(0,-2);yield "1]";}},system:"",userMessages:[{role:"user",content:"この問題のアとエの違いを、短く説明してください"}],model:"mock",maxTokens:100,hasGrounding:true,citationFooter:candidateFooter});
    const text=await new Response(stream).text();
    expect(text).toContain(answer);
    expect(text).toContain("- [1] [IP2024問1 MA]");
    expect(text).not.toContain("フットケア");
    expect(text).not.toContain("- [2]");
  });
  it("explicitly marks a completed answer with no usable citation as unverified", async () => {
    const stream=createCopilotResponseStream({provider:{name:"mock",async *streamChat(){yield "引用なしの説明";}},system:"",userMessages:[],model:"mock",maxTokens:100,hasGrounding:true,citationFooter:candidateFooter});
    expect(await new Response(stream).text()).toBe("引用なしの説明"+CITATION_UNVERIFIED_NOTICE);
  });
  it("renders only answer-used cards for persisted legacy metadata", () => {
    render(<CitationCards citations={candidates} response={answer+candidateFooter} />);
    expect(screen.getByText("IP2024問1 MA")).toBeInTheDocument();
    expect(screen.queryByText("看護師2024午後問41 糖尿病フットケア")).not.toBeInTheDocument();
  });
  it("labels legacy answers with no citation and does not warn prematurely during streaming", () => {
    const view=render(<CitationCards citations={[]} response="過去の回答" isStreaming />);
    expect(screen.queryByRole("note")).not.toBeInTheDocument();
    view.rerender(<CitationCards citations={[]} response="過去の回答" />);
    expect(screen.getByRole("note")).toHaveTextContent("出典未確認");
  });
});
