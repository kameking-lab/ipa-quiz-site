import type { Question } from "@/lib/questions/types";
import ready from "./ready.json";
import paper2024 from "./2024.json";
import paper2023 from "./2023.json";
import paper2022 from "./2022.json";

/** JIA source questions; explanations are independently authored by this site. */
export const GAS_OTSU_QUESTIONS: Question[] = ([...ready, ...paper2024, ...paper2023, ...paper2022] as Question[])
  .filter(question => question.needsReview === false)
  .sort((a, b) => b.year - a.year || a.session.localeCompare(b.session) || a.qNumber - b.qNumber);
