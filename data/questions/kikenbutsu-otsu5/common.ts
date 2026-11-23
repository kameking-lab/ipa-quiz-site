import type { Question } from "@/lib/questions/types";
import { QUESTIONS as OTSU4_QUESTIONS } from "../kikenbutsu-otsu4";

type Exam = "kikenbutsu-otsu3" | "kikenbutsu-otsu5";

/** 問1〜25は乙種公表版の共通問題。第4類版と同一のため解説を共有する。 */
export function commonQuestions(exam: Exam): Question[] {
  const original = "https://www.shoubo-shiken.or.jp/content/kikenbutsu_otsu.pdf";
  return OTSU4_QUESTIONS.filter((question) => question.qNumber <= 25).map((question) => {
    const page = question.sourcePdfUrl.split("#page=")[1];
    return {
      ...question,
      id: `${exam}-2026-published-q${question.qNumber}`,
      exam,
      topicTags: [exam, question.category],
      imageUrls: [`/images/questions/kikenbutsu-otsu-common/2026-page-${page.padStart(2, "0")}.webp`],
      sourcePdfUrl: `${original}#page=${page}`,
      sourceAnswerUrl: `${original}#page=44`,
      license: "SHOUBO-owner-authorized",
    };
  });
}
