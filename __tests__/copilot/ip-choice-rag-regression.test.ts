import { afterEach, describe, expect, it, vi } from "vitest";
import { IP_QUESTIONS_2024_CBT_AM } from "@/data/questions/ip/by-year/2024-cbt-am";
import { runCopilotRAGPipeline } from "@/lib/copilot/rag-pipeline";
import { decodeCitationsHeader, decodeRelatedHeader } from "@/lib/copilot/header-codec";
import { matchesQuestionTopic } from "@/lib/copilot/related";

const question=IP_QUESTIONS_2024_CBT_AM.find(q=>q.qNumber===1)!;
afterEach(()=>vi.unstubAllEnvs());

describe("reported IP2024 question 1 choice comparison",()=>{
  it("does not mistake a broad category for a shared topic on untagged questions",()=>{
    expect(question.topicTags).toEqual([]);
    for(const text of ["ISOに関する記述として最も適切なものはどれか。", "アクセシビリティを高めるための記述として適切なものはどれか。"]) {
      expect(matchesQuestionTopic({category:question.category,topicTags:[]},question.category,[],question.question,text)).toBe(false);
    }
    expect(matchesQuestionTopic({category:question.category,topicTags:[]},question.category,[],question.question,"MAで見込み顧客を育成する。")).toBe(true);
  });
  it("uses the actual corpus while excluding nursing context and unrelated practice candidates",async()=>{
    vi.stubEnv("COPILOT_RAG_ENABLED","true");
    vi.stubEnv("COPILOT_RAG_MIN_SCORE","0");
    const result=await runCopilotRAGPipeline({question,messages:[{role:"user",content:"この問題のアとエの違いを、短く説明してください"}]});
    expect(result.hasGrounding).toBe(true);
    const metas=decodeCitationsHeader(result.citationsHeader);
    expect(metas[0].question?.questionId).toBe(question.id);
    expect(result.ragContextBlock).not.toContain("糖尿病フットケア");
    for(const meta of metas.filter(meta=>meta.kind==="question")) expect(meta.question?.exam).toBe("ip");
    for(const related of decodeRelatedHeader(result.relatedHeader)) {
      expect(related.exam).toBe("ip");
      expect(related.preview).not.toMatch(/ISO|アクセシビリティ/);
    }
  });
});
