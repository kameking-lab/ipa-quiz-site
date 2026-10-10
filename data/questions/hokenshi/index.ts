import type { Question } from "@/lib/questions/types";
import candidate from "./medical44-prepublication.json";

/** Fixed source-literal Q45–55 candidate; publication remains catalog-gated. */
export const HOKENSHI_QUESTIONS: Question[] = (candidate as Question[]).sort(
  (a, b) => b.year - a.year || a.session.localeCompare(b.session) || a.qNumber - b.qNumber,
);
