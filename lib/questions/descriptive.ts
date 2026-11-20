import type { Question } from "./types";

const examCodesWithModelAnswers = new Set([
  "chuken3",
  "kanken-1",
  "kanken-10",
  "kanken-2",
  "kanken-3",
  "kanken-4",
  "kanken-7",
  "katei-hifuku",
  "katei-hoiku",
  "katei-shoku-chori",
  "katei-shokumotsu",
  "shobo-setsubishi-kou2",
  "shobo-setsubishi-kou3",
  "shobo-setsubishi-kou5",
  "shobo-setsubishi-otsu7",
  "tsukanshi",
  "zenkou-joho",
  "zenkou-keisan-gijutsu",
  "zenkou-pc",
  "zensho-boki",
  "zensho-boki-2",
  "zensho-calc",
  "zensho-calc-1",
  "zensho-eco-78",
  "zensho-eco-79",
  "zensho-eco-80",
  "zensho-eco-81",
  "zensho-financial-statement-analysis",
]);

/** These papers are compared with a model answer without recording a score. */
export function isSelfReviewedDescriptiveQuestion(q: Question | null | undefined): q is Question & { type: "descriptive" } {
  return q?.type === "descriptive" && (q.exam === "sokuryoshi" || q.exam === "khk-kagaku" || q.exam === "iji-shuzen" || q.exam === "khk-kikai-kou" || q.exam === "gyosei" || q.exam === "chosashi" || q.exam === "khk-reito-1" || examCodesWithModelAnswers.has(q.exam));
}
