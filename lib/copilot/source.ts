// コパイロットが使う「問題データと検索索引」の入手口。
//
// 本番（pnpm build 後）は、ビルド時に書き出したファイル（generated/copilot/）だけを読む。
// 全問題のデータ本体（約 150MB の JS）を読み込まないので、冷えたサーバでも速い。
// 開発中・テスト中は、従来どおりデータ本体から組み立てる。どちらでも結果は同じ
// （scripts/build-copilot-index.ts が書き出し時に全件一致を確かめる）。

import type { Question } from "@/lib/questions/types";
import type { InvertedIndex } from "./retriever";
import { openPrebuiltCopilotSource } from "./source-prebuilt";

export interface CopilotSource {
  readonly kind: "prebuilt" | "runtime";
  /** 問題を ID で引く（公開中の全問題。検索対象外の問題も含む）。 */
  getQuestion(id: string): Question | undefined;
  /** 検索索引（文書つき）。初回は読み込みのぶん重い。 */
  index(): InvertedIndex;
}

let SOURCE: Promise<CopilotSource> | null = null;

export function getCopilotSource(): Promise<CopilotSource> {
  SOURCE ??= loadSource().catch((err: unknown) => {
    SOURCE = null;
    throw err;
  });
  return SOURCE;
}

async function loadSource(): Promise<CopilotSource> {
  // 本番ビルドではこの分岐ごと消える（NODE_ENV はビルド時に定数になる）。そのため
  // 全問題データは /api/copilot 関数に同梱されない。開発・テストはデータ本体から組み立てる。
  if (process.env.NODE_ENV !== "production") {
    const { createRuntimeCopilotSource } = await import("./source-runtime");
    return createRuntimeCopilotSource();
  }
  const prebuilt = openPrebuiltCopilotSource();
  if (prebuilt) return prebuilt;
  // pnpm build は next build の前に必ず書き出し・照合する（失敗すればビルドが止まる）。
  throw new Error("copilot prebuilt files missing: run `pnpm copilot:index:write` before `next build`");
}

/** テスト用 */
export function resetCopilotSource(): void {
  SOURCE = null;
}

/**
 * 索引の読み込みを、今のリクエストが KV などのネットワーク応答を待っている間に
 * 済ませておく（冷えたサーバでだけ意味がある。温まっていれば何もしない）。
 */
export function warmCopilotIndexSoon(): void {
  setImmediate(() => {
    void getCopilotSource()
      .then((source) => source.index())
      .catch(() => {
        // 失敗しても本処理の runRAG 側で同じ処理をやり直し、そこで捕捉・記録される。
      });
  });
}
