import { getAllQuestions } from "@/lib/questions/load";
import { GLOSSARY } from "@/data/glossary";
import type { CorpusDoc } from "./types";
import { buildGlossaryDoc, buildQuestionDoc, isCorpusQuestion } from "./corpus-docs";

export { buildGlossaryDoc, buildQuestionDoc, isCorpusQuestion } from "./corpus-docs";

let CACHED_CORPUS: CorpusDoc[] | null = null;

/** 全コーパスを返す。プロセス内でキャッシュされる。 */
export function getCorpus(): CorpusDoc[] {
  if (CACHED_CORPUS) return CACHED_CORPUS;
  const docs: CorpusDoc[] = [];
  for (const q of getAllQuestions()) {
    if (!isCorpusQuestion(q)) continue;
    docs.push(buildQuestionDoc(q));
  }
  for (const term of GLOSSARY) {
    docs.push(buildGlossaryDoc(term));
  }
  CACHED_CORPUS = docs;
  return docs;
}

/** テスト用: キャッシュをクリア */
export function resetCorpusCache(): void {
  CACHED_CORPUS = null;
}
