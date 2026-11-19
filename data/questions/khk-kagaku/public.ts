import type { Question } from "@/lib/questions/types";
import publicQuestions from "./public-questions.json";
import questions2026 from "./2026.json";

/** Only release-prepared data may enter client/offline bundles. Empty while unpublished. */
export const PUBLIC_KHK_KAGAKU_QUESTIONS: Question[] = [...publicQuestions, ...questions2026] as Question[];
