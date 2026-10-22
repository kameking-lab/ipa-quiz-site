import { SG_FE_DISPLAY_FOLLOWUP } from "./sg-fe-display-followup-20261020";
import { FE_2024_PUBLIC_SET_COMPLETIONS } from "./fe-2024-public-set-20261020";
import { SG_FE_PUBLIC_SET_COMPLETIONS } from "./sg-fe-public-sets-20261020";
import type { ExamCode, Question } from "@/lib/questions/types";
import { IPA_AUDIT_CORRECTIONS } from "./ipa-audit-20260913";
import { IPA_AUDIT_ADDITIONS } from "./ipa-audit-additions-20260913";
import { IPA_EXPLANATION_REPAIRS } from "./explanations-20260913";
import { SC_TWO_YEAR_PUBLICATION_CORRECTIONS } from "./sc-two-year-publication-20260924";
import sources from "./official-sources.json";
import { ST_FIGURE_CORRECTIONS } from "./st-figures-20260924";

const sourceByPaper: Record<string, { question: string; answer: string }> = sources;

/** Shared by eager, lazy and direct exam imports so no player uses stale keys. */
export function applyIpaCorrections(exam: ExamCode, questions: Question[]): Question[] {
  const ids = new Set(questions.map(q => q.id));
  const originals: Question[] = [...questions, ...IPA_AUDIT_ADDITIONS.filter(q => q.exam === exam && !ids.has(q.id))];
  return originals.map((q: Question): Question => {
    const source = sourceByPaper[[q.exam, q.year, q.season, q.session].join("/")];
    const explanation = IPA_EXPLANATION_REPAIRS[q.id];
    const verified = IPA_AUDIT_CORRECTIONS[q.id];
    const figure = ST_FIGURE_CORRECTIONS[q.id];
    const publicationReady = SC_TWO_YEAR_PUBLICATION_CORRECTIONS[q.id];
    const selectedPublicSet = FE_2024_PUBLIC_SET_COMPLETIONS[q.id] || SG_FE_PUBLIC_SET_COMPLETIONS[q.id];
    return {
      ...q,
      ...(source ? { sourcePdfUrl: source.question } : {}),
      ...explanation,
      ...verified,
      ...figure,
      ...publicationReady,
      ...(figure || publicationReady
        ? { lastUpdated: "2026-09-24" }
        : explanation || verified
          ? { lastUpdated: "2026-09-13" }
          : {}),
      ...FE_2024_PUBLIC_SET_COMPLETIONS[q.id],
      ...SG_FE_PUBLIC_SET_COMPLETIONS[q.id],
      ...SG_FE_DISPLAY_FOLLOWUP[q.id],
      ...(selectedPublicSet ? {
        sourceAttribution: `出典：IPA「${q.year}年度公開問題」${q.exam === "sg" ? "情報セキュリティマネジメント" : "基本情報技術者"}試験 ${q.session === "kamoku-b" ? "科目B" : "科目A"} 問${q.qNumber}。Web掲載のため、改行・表記の整形や図表の文章・表への置換など、一部改変しています。解説は当サイトが独自に作成したもので、IPAの公式解説ではありません。`,
      } : {}),
    };
  });
}
