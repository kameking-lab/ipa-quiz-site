import { questionSourceEdition, questionSourceExam } from "@/lib/questions/source-label";
import type { Question } from "@/lib/questions/types";
import { sessionLabel } from "@/lib/seo/question-jsonld";
import { questionNumberLabel } from "@/lib/questions/display";
import { isSelfReviewedDescriptiveQuestion } from "@/lib/questions/descriptive";
import { practiceCategoryLabel } from "@/lib/questions/practice-session";

const DESCRIPTION_MAX = 110;

const TITLE_TARGET = 38;
const CTA = "答えと解説を無料で確認できます。";

function searchableStem(q: Question): string {
  return q.question.replace(/\s+/g, " ").trim();
}

function truncate(s: string, n: number): string {
  // Cap at exactly n chars *including* the ellipsis, so the description budget
  // is a hard ceiling rather than n+1.
  return s.length > n ? `${s.slice(0, n - 1)}…` : s;
}

/** Source identity for the page heading and search description. */
export function questionHeading(q: Question): string {
  // The electrical and thermal papers reuse printed question/answer numbers.
  const field = q.exam === "energy-kanri"
    ? q.topicTags.find(tag => tag === "電気分野" || tag === "熱分野")
    : undefined;
  return [questionSourceEdition(q), questionSourceExam(q), field,
    sessionLabel(q.session, q.exam), `問${questionNumberLabel(q)}`].filter(Boolean).join(" ");
}

function supplementaryCategory(q: Question): string {
  const category = practiceCategoryLabel(q.category, q.exam);
  const canRepeatSession = q.exam === "gijutsushi1-kikai" || category === "午前" || category === "午後";
  return canRepeatSession && category === sessionLabel(q.session, q.exam) ? "" : category;
}

/** Lead with the searchable stem and retain the paper identity for repeated stems. */
export function questionTitle(q: Question): string {
  const edition = questionSourceEdition(q).replace(/（[^）]*）$/, "").replace(/年度/g, "").replaceAll(" ", "");
  const exam = questionSourceExam(q);
  const field = q.exam === "energy-kanri" ? q.topicTags.find(tag => tag === "電気分野" || tag === "熱分野") ?? "" : "";
  const session = sessionLabel(q.session, q.exam);
  const source = exam + edition + field + " " + session + " 問" + questionNumberLabel(q);
  const stem = truncate(searchableStem(q), Math.max(7, TITLE_TARGET - source.length - 7));
  return stem + "｜答えと解説｜" + source;
}

export function questionSnippet(q: Question): string {
  const category = supplementaryCategory(q);
  const context = questionHeading(q) + (category ? "・" + category : "");
  const cta = q.exam === "khk-reito-1" && isSelfReviewedDescriptiveQuestion(q)
    ? "公式解答例と独自解説で、記述・作図を無料で自己確認できます。"
    : q.explanationCoverage === "official-summary" ? "公式正答と一般解説を確認し、無料で演習できます。" : CTA;
  const source = "【" + truncate(context, 43) + "】";
  const lead = truncate(searchableStem(q), DESCRIPTION_MAX - source.length - cta.length - 1);
  const description = lead + " " + cta + source;
  const review = "収録された過去問を使って、この問題の考え方を復習できます。";
  return description.length < 80 ? truncate(description + review, DESCRIPTION_MAX) : description;
}
