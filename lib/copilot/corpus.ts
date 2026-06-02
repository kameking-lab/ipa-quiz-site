import { getAllQuestions } from "@/lib/questions/load";
import type { Question } from "@/lib/questions/types";
import { GLOSSARY } from "@/data/glossary";
import type { GlossaryTerm } from "@/data/glossary";
import { examLabel, formatYearSeason } from "@/lib/utils";
import { questionPagePath } from "@/lib/seo/question-url";
import type { CorpusDoc } from "./types";
import { GLOSSARY_ALIASES } from "./aliases";

function buildQuestionDoc(q: Question): CorpusDoc {
  // 検索対象文書は「問題文 + 選択肢 + 解説 + タグ + カテゴリ」を統合。
  // カテゴリとタグは BM25 でやや弱くなりがちなので 2 回繰り返してフィールド重みを上げる。
  const choiceText = q.choices
    ? Object.entries(q.choices)
        .map(([k, v]) => `${k}. ${v}`)
        .join(" ")
    : "";
  const tagText = q.topicTags.join(" ");
  const text = [
    q.category,
    q.category, // 重複: カテゴリの重みを 2 倍
    tagText,
    tagText, // 重複: タグの重みを 2 倍
    q.question,
    choiceText,
    q.explanation,
  ]
    .filter(Boolean)
    .join("\n");

  return {
    id: `q:${q.id}`,
    kind: "question",
    title: `${examLabel(q.exam)} ${formatYearSeason(q.year, q.season)} 問${q.qNumber} / ${q.category}`,
    // 引用カード/関連問題のリンク先は、正規の indexable な静的問題ページ /q/* を指す。
    // 旧 `/quiz?id=` は (1) `mode` クエリが無いと next.config.ts の 308 でホームへ
    // リダイレクトされ、(2) /quiz ページは `id` を読まない ＝ 引用した問題ではなく
    // ホームへ着地する死リンクだった。questionPagePath で正規ページへ解決する。
    url: questionPagePath(q),
    text,
    meta: {
      exam: q.exam,
      category: q.category,
      topicTags: q.topicTags,
      year: q.year,
    },
  };
}

function buildGlossaryDoc(t: GlossaryTerm): CorpusDoc {
  const aliases = [t.term, t.english].filter(Boolean).join(" ");
  const extraAliases = (GLOSSARY_ALIASES[t.term] ?? []).join(" ");
  const related = (t.relatedTopics ?? []).join(" ");
  // 用語集は「タイトル＝用語名そのもの」の比重が一番大事。
  // 用語名を 6 倍、英語表記を 3 倍重複させて BM25 上で title-field 相当の重みを与える。
  const titleWeighted = [
    t.term,
    t.term,
    t.term,
    t.term,
    t.term,
    t.term,
    t.english ?? "",
    t.english ?? "",
    t.english ?? "",
  ]
    .filter(Boolean)
    .join(" ");
  // エイリアスは title-weight と短文の間に置く（中程度の重み）。
  // 重複させすぎると BM25 的にスパムになるため 2 回まで。
  const text = [titleWeighted, aliases, extraAliases, extraAliases, t.short, t.detail, related]
    .filter(Boolean)
    .join("\n");

  return {
    id: `g:${t.term}`,
    kind: "glossary",
    title: `用語集: ${t.term}${t.english ? ` (${t.english})` : ""}`,
    // Must match the per-term anchor on app/glossary/page.tsx:
    // id={`term-${encodeURIComponent(t.term)}`}. Without the `term-` prefix the
    // citation card link is a dead anchor that lands at the glossary page top.
    url: `/glossary#term-${encodeURIComponent(t.term)}`,
    text,
    meta: {
      category: t.category,
      topicTags: t.relatedTopics,
    },
  };
}

let CACHED_CORPUS: CorpusDoc[] | null = null;

/** 全コーパスを返す。プロセス内でキャッシュされる。 */
export function getCorpus(): CorpusDoc[] {
  if (CACHED_CORPUS) return CACHED_CORPUS;
  const docs: CorpusDoc[] = [];
  for (const q of getAllQuestions()) {
    // 解説が空 / placeholder のものは検索対象から外す
    if (!q.explanation || q.explanation.trim().length < 20) continue;
    // needsReview の問題は /q ページが notFound()（404）を返すため、引用/関連問題の
    // リンク先にすると死リンクになる。検索対象からも外す（パース不全のため教材価値も低い）。
    if (q.needsReview) continue;
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
