import { getCorpus } from "./corpus";
import { loadPrebuiltIndex } from "./index-artifact";
import { getCachedIndex, type InvertedIndex } from "./retriever";

/**
 * コパイロットの検索で使う索引。ビルド時に作った索引を優先し、
 * 使えないときだけ実行時に組み立てる（どちらも結果は同じ）。
 */
export function getCopilotIndex(): InvertedIndex {
  return getCachedIndex(getCorpus, loadPrebuiltIndex);
}

/**
 * 索引の読み込みを、今のリクエストが KV などのネットワーク応答を待っている間に
 * 済ませておく（冷えたサーバでだけ意味がある。温まっていれば何もしない）。
 */
export function warmCopilotIndexSoon(): void {
  setImmediate(() => {
    try {
      getCopilotIndex();
    } catch {
      // 失敗しても本処理の runRAG 側で同じ処理をやり直し、そこで捕捉・記録される。
    }
  });
}
