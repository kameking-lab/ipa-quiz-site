// データ本体（data/questions）から組み立てる経路。開発・テスト・ビルド成果物が無いときに使う。
// 本番の通常経路では読み込まれないよう、source.ts からは動的 import する。
import { getQuestionById } from "@/lib/questions/load";
import { getCorpus } from "./corpus";
import { loadPrebuiltIndex } from "./index-artifact";
import { getCachedIndex } from "./retriever";
import type { CopilotSource } from "./source";

export function createRuntimeCopilotSource(): CopilotSource {
  return {
    kind: "runtime",
    getQuestion: getQuestionById,
    index: () => getCachedIndex(getCorpus, loadPrebuiltIndex),
  };
}
