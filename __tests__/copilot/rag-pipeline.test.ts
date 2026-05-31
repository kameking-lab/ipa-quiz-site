import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { runCopilotRAGPipeline } from "@/lib/copilot/rag-pipeline";
import { resetCorpusCache } from "@/lib/copilot/corpus";
import { resetIndexCache } from "@/lib/copilot/retriever";
import type { Question, ExamCode, Season, Session } from "@/lib/questions/types";

// runCopilotRAGPipeline は AI コパイロット（B軸＝差別化中核）の retrieval→grounding 判定→
// 引用ヘッダ/関連問題ヘッダ組み立てを束ねる async オーケストレータ。
// rag.test.ts と同じ「実コーパス + 環境変数ゲート」方式で実挙動を回帰固定する（mock 不使用）。
// 崩れると、根拠なし応答に出典が付いたり（または根拠ありなのに付かなかったり）、無効時に
// 不要な retrieval が走るため、以下の契約を pin する:
//   - ragEnabled() が false なら retrieval せず EMPTY
//   - 最後の user メッセージが無い/空なら EMPTY
//   - topScore >= ragMinScore() の閾値ゲート（未達なら ragResult は保持しつつ grounding しない）
//   - 閾値通過時に grounding 出力一式（directive/contextBlock/citationFooter/citationsHeader）

function q(partial: Partial<Question> & { id?: string } = {}): Question {
  return {
    id: partial.id ?? "ap-2024a-am-q1",
    exam: (partial.exam ?? "ap") as ExamCode,
    session: (partial.session ?? "am") as Session,
    year: partial.year ?? 2024,
    season: (partial.season ?? "autumn") as Season,
    qNumber: partial.qNumber ?? 1,
    type: partial.type ?? "multiple-choice",
    category: partial.category ?? "テクノロジ系",
    topicTags: partial.topicTags ?? [],
    difficulty: partial.difficulty ?? 3,
    question: partial.question ?? "問題文です",
    choices: partial.choices,
    answer: partial.answer ?? "ア",
    explanation: partial.explanation ?? "これは十分に長い実際の解説文です。",
    hasImage: partial.hasImage ?? false,
    sourcePdfUrl: "https://example.com/x.pdf",
    license: "IPA-public",
    isCalculation: partial.isCalculation,
    needsReview: partial.needsReview,
    lastUpdated: partial.lastUpdated,
  };
}

// rag.test.ts と同じ「明確な知識クエリ」（実コーパスで passages>0・topScore>0 が保証される）。
const CLEAR_QUERY = "ACIDの永続性とは何ですか";

describe("runCopilotRAGPipeline", () => {
  beforeEach(() => {
    delete process.env.COPILOT_RAG_ENABLED;
    delete process.env.COPILOT_RAG_MIN_SCORE;
    resetCorpusCache();
    resetIndexCache();
  });
  afterEach(() => {
    delete process.env.COPILOT_RAG_ENABLED;
    delete process.env.COPILOT_RAG_MIN_SCORE;
  });

  it("ragEnabled() が false なら retrieval せず EMPTY を返す", async () => {
    process.env.COPILOT_RAG_ENABLED = "false";
    const out = await runCopilotRAGPipeline({
      question: q(),
      messages: [{ role: "user", content: CLEAR_QUERY }],
    });
    expect(out.hasGrounding).toBe(false);
    expect(out.ragResult.passages).toEqual([]);
    expect(out.ragResult.topScore).toBe(0);
    expect(out.ragDirective).toBeNull();
    expect(out.ragContextBlock).toBe("");
    expect(out.citationFooter).toBe("");
    expect(out.citationsHeader).toBe("");
    expect(out.relatedHeader).toBe("");
  });

  it("user メッセージが無ければ（assistant のみ）retrieval せず EMPTY", async () => {
    const out = await runCopilotRAGPipeline({
      question: q(),
      messages: [{ role: "assistant", content: CLEAR_QUERY }],
    });
    expect(out.hasGrounding).toBe(false);
    // retrieval が走っていない証拠＝passages は EMPTY のまま。
    expect(out.ragResult.passages).toEqual([]);
  });

  it("messages が空配列なら EMPTY", async () => {
    const out = await runCopilotRAGPipeline({ question: q(), messages: [] });
    expect(out.hasGrounding).toBe(false);
    expect(out.ragResult.passages).toEqual([]);
  });

  it("最後の user メッセージ内容が空文字なら EMPTY", async () => {
    const out = await runCopilotRAGPipeline({
      question: q(),
      messages: [{ role: "user", content: "" }],
    });
    expect(out.hasGrounding).toBe(false);
    expect(out.ragResult.passages).toEqual([]);
  });

  it("最後の user メッセージを retrieval に使う（末尾の空 user では grounding しない）", async () => {
    // 先頭に明確クエリ・末尾に空 user。lastUserMsg は末尾＝空のため EMPTY。
    const out = await runCopilotRAGPipeline({
      question: q(),
      messages: [
        { role: "user", content: CLEAR_QUERY },
        { role: "assistant", content: "..." },
        { role: "user", content: "" },
      ],
    });
    expect(out.hasGrounding).toBe(false);
    expect(out.ragResult.passages).toEqual([]);
  });

  it("topScore が ragMinScore 未満なら ragResult は保持しつつ grounding しない", async () => {
    process.env.COPILOT_RAG_MIN_SCORE = "999999";
    const out = await runCopilotRAGPipeline({
      question: q(),
      messages: [{ role: "user", content: CLEAR_QUERY }],
    });
    // 閾値ゲートで落ちるだけで retrieval 自体は走っている。
    expect(out.ragResult.passages.length).toBeGreaterThan(0);
    expect(out.hasGrounding).toBe(false);
    expect(out.ragDirective).toBeNull();
    expect(out.ragContextBlock).toBe("");
    expect(out.citationFooter).toBe("");
    expect(out.citationsHeader).toBe("");
  });

  it("閾値を満たすと grounding 出力一式を返す", async () => {
    process.env.COPILOT_RAG_MIN_SCORE = "0";
    const out = await runCopilotRAGPipeline({
      question: q(),
      messages: [{ role: "user", content: CLEAR_QUERY }],
    });
    expect(out.hasGrounding).toBe(true);
    expect(out.ragResult.passages.length).toBeGreaterThan(0);
    expect(out.ragResult.topScore).toBeGreaterThan(0);
    expect(out.ragDirective).not.toBeNull();
    expect(out.ragContextBlock.length).toBeGreaterThan(0);
    expect(out.citationFooter.length).toBeGreaterThan(0);
    expect(out.citationsHeader.length).toBeGreaterThan(0);
    // citationsHeader は base64 で ASCII-only に運搬される HTTP ヘッダ契約（日本語タイトルでも安全）。
    expect(/^[\x00-\x7F]*$/.test(out.citationsHeader)).toBe(true);
  });
});
