import type { Question } from "@/lib/questions/types";
import publicQuestions from "./public-questions.json";

/** Only release-prepared data may enter client/offline bundles. Empty while unpublished. */
export const PUBLIC_KHK_KAGAKU_QUESTIONS: Question[] = publicQuestions as Question[];
