import type { Question } from "@/lib/questions/types";
import type { QuickActionId } from "@/lib/ai/prompts";
import { buildRAGDirective } from "@/lib/ai/prompts";
import { captureException } from "@/lib/monitoring/sentry";
import { ragEnabled, ragMinScore, runRAG } from "@/lib/copilot/rag";
import { buildCitationFooter, buildRAGContextBlock } from "@/lib/copilot/citations";
import type { RAGResult } from "@/lib/copilot/types";
import { buildCitationMetas, encodeCitationsHeader } from "@/lib/copilot/citation-meta";
import { encodeRelatedHeader, findRelatedQuestions } from "@/lib/copilot/related";

export interface RAGPipelineInput {
  question: Question;
  messages: { role: "user" | "assistant"; content: string }[];
  quickAction?: QuickActionId;
}

export interface RAGPipelineOutput {
  ragResult: RAGResult;
  ragDirective: string | null;
  ragContextBlock: string;
  citationFooter: string;
  citationsHeader: string;
  relatedHeader: string;
  hasGrounding: boolean;
}

const EMPTY: RAGPipelineOutput = {
  ragResult: { passages: [], topScore: 0, rerankerUsed: "none" },
  ragDirective: null,
  ragContextBlock: "",
  citationFooter: "",
  citationsHeader: "",
  relatedHeader: "",
  hasGrounding: false,
};

/**
 * Run the full RAG pipeline: retrieval → grounding decision → citation header + related-question header.
 * Any failure is captured and the call returns the empty fallback so the copilot keeps working without grounding.
 */
export async function runCopilotRAGPipeline(
  input: RAGPipelineInput,
): Promise<RAGPipelineOutput> {
  const { question, messages, quickAction } = input;

  if (!ragEnabled()) return EMPTY;

  const lastUserMsg =
    [...messages].reverse().find((m) => m.role === "user")?.content ?? "";
  if (!lastUserMsg) return EMPTY;

  let ragResult: RAGResult = EMPTY.ragResult;
  try {
    ragResult = await runRAG({
      userMessage: lastUserMsg,
      question,
      quickAction,
    });
  } catch (err) {
    await captureException(err, {
      route: "/api/copilot",
      extra: { phase: "rag" },
    });
    return EMPTY;
  }

  const passesThreshold = ragResult.topScore >= ragMinScore();
  if (!(ragResult.passages.length > 0 && passesThreshold)) {
    return { ...EMPTY, ragResult };
  }

  const ragDirective = buildRAGDirective(ragResult.passages.length);
  const ragContextBlock = buildRAGContextBlock(ragResult.passages);
  const citationFooter = buildCitationFooter(ragResult.passages);

  const citationMetas = buildCitationMetas(ragResult.passages);
  const citationsHeader = encodeCitationsHeader(citationMetas);

  let relatedHeader = "";
  try {
    const excluded = new Set(ragResult.passages.map((p) => p.doc.id));
    const related = findRelatedQuestions({
      userMessage: lastUserMsg,
      currentQuestionId: question.id,
      currentExam: question.exam,
      currentCategory: question.category,
      currentTopicTags: question.topicTags,
      excludeDocIds: excluded,
      limit: 4,
    });
    relatedHeader = encodeRelatedHeader(related);
  } catch (relErr) {
    await captureException(relErr, {
      route: "/api/copilot",
      extra: { phase: "related" },
    });
  }

  return {
    ragResult,
    ragDirective,
    ragContextBlock,
    citationFooter,
    citationsHeader,
    relatedHeader,
    hasGrounding: true,
  };
}
