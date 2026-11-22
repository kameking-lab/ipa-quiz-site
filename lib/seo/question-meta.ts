import { questionSourceEdition, questionSourceExam } from "@/lib/questions/source-label";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";
import type { Question } from "@/lib/questions/types";
import { sessionLabel } from "@/lib/seo/question-jsonld";
import { questionNumberLabel } from "@/lib/questions/display";
import { isSelfReviewedDescriptiveQuestion } from "@/lib/questions/descriptive";
import { practiceCategoryLabel } from "@/lib/questions/practice-session";

const DESCRIPTION_MAX = 110;

const TITLE_TARGET = 38;
const TITLE_MAX = 63;
const TITLE_SEPARATOR = "｜答えと解説｜";
const MIN_STEM = 7;
const CTA = "答えと解説を無料で確認できます。";

function searchableStem(q: Question): string {
  return q.question.replace(/\s+/g, " ").trim();
}

function truncate(s: string, n: number): string {
  // Cap at exactly n chars *including* the ellipsis, so the description budget
  // is a hard ceiling rather than n+1.
  return s.length > n ? `${s.slice(0, n - 1)}…` : s;
}

function searchSourceExam(q: Question) {
  const name = q.exam.startsWith("shobo-setsubishi-") ? getQualificationByExamCode(q.exam)?.shortName : undefined;
  return name ?? questionSourceExam(q);
}

/** Source identity for the page heading and search description. */
export function questionHeading(q: Question): string {
  // The electrical and thermal papers reuse printed question/answer numbers.
  const field = q.exam === "energy-kanri"
    ? q.topicTags.find(tag => tag === "電気分野" || tag === "熱分野")
    : undefined;
  return [questionSourceEdition(q), searchSourceExam(q), field,
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
  const exam = searchSourceExam(q);
  const session = sessionLabel(q.session, q.exam);
  const field = q.exam === "energy-kanri" ? q.topicTags.find(tag => tag === "電気分野" || tag === "熱分野")
    : q.exam === "dekyo-chief-2" || q.exam.startsWith("dekyo-charge-") ? q.category
    : q.exam === "riku-tech1" && q.topicTags.length > 1 ? truncate(q.topicTags.at(-1)!, 17)
    : q.exam === "tohan" ? (q.season === "kansai" ? "関西" : q.sourcePdfUrl.includes("metro.tokyo.lg.jp") ? "東京" : undefined)
    : undefined;
  const qualifier = q.session === "am1" && exam === "高度試験共通" ? q.exam.toUpperCase() : undefined;
  const printedNumber = questionNumberLabel(q).replace(/^問/, "");
  const numberedItem = /第(\d+)問\s*(.*)$/.exec(printedNumber);
  const number = numberedItem ? "問" + numberedItem[1] + numberedItem[2] : "問" + printedNumber;
  const maxSource = TITLE_MAX - TITLE_SEPARATOR.length - MIN_STEM;
  let source = [exam + edition, field, session, qualifier, number].filter(Boolean).join(" ");
  if (source.length > maxSource) {
    const examName = truncate(exam, 12);
    const numberLabel = truncate(number, 16);
    const paper = [edition, session, qualifier, field].filter(Boolean).join(" ");
    const paperBudget = maxSource - examName.length - numberLabel.length - 2;
    source = examName + " " + truncate(paper, paperBudget) + " " + numberLabel;
  }
  const stem = truncate(searchableStem(q), Math.max(MIN_STEM, TITLE_TARGET - source.length - TITLE_SEPARATOR.length));
  return stem + TITLE_SEPARATOR + source;
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
  const review = "年度別・分野別の一覧から、同じ資格で収録されているほかの問題を探して、苦手な分野を復習できます。";
  return description.length < 80 ? truncate(description + review, DESCRIPTION_MAX) : description;
}
