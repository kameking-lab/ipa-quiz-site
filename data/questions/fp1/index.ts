import type { Question } from "@/lib/questions/types";
import launch from "./launch.json";
import addition from "./2026-may-addition.json";

/** 2026年5月のFP1級学科・基礎編50問。既存25問を保持し、不足25問を追加。 */
export const FP1_QUESTIONS: Question[] = [...launch, ...addition].sort((a, b) => a.qNumber - b.qNumber) as Question[];
