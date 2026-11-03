import { z } from "zod";
import type { EssayGradingResult } from "@/lib/essay/types";
import type { AfternoonScoringResult } from "@/lib/afternoon/types";

export type GradingUnavailableReason = "provider_unavailable" | "provider_error" | "invalid_response" | "truncated_response";
export interface GradingUnavailable {
  status: "unavailable";
  error: GradingUnavailableReason;
  message: string;
}
export type GradingResponse<T> = (T & { status: "graded" }) | GradingUnavailable;
export function gradingUnavailable(error: GradingUnavailableReason): GradingUnavailable {
  return { status: "unavailable", error, message: "AIによる内容の評価を完了できませんでした。答案はそのまま残っています。時間を置いて再度お試しください。" };
}
const score = z.number().finite().min(0).max(100);
const strings = z.array(z.string());
export const essayContentSchema = z.object({
  rank: z.enum(["A", "B", "C", "fail"]), passProbability: score,
  subResults: z.array(z.object({ key: z.enum(["ア", "イ", "ウ"]), score,
    axes: z.object({ relevance: score, logic: score, concreteness: score, industryFit: score }),
    goodPoints: strings, improvements: strings, missingElements: strings })).length(3)
    .refine((rows) => new Set(rows.map((s) => s.key)).size === 3),
  overallAdvice: z.string(), unnecessaryElements: strings, improvedExample: z.string().optional(),
});
export const afternoonContentSchema = z.object({
  totalScore: score, subResults: z.array(z.object({label: z.string().min(1), score,
    goodPoints: strings, improvements: strings, modelAnswer: z.string().optional()})).min(1)
    .refine((rows) => new Set(rows.map((s) => s.label)).size === rows.length),
  overallComment: z.string(),
});
// HTTP 200 alone is not an evaluation. Older length-only responses are rejected too.
export function isGradedEssay(value: unknown): value is EssayGradingResult & { status: "graded" } {
  const envelope = z.object({status: z.literal("graded"), gradingMode: z.literal("ai"),
    questionId: z.string(), industry: z.string(), gradedAt: z.string()}).safeParse(value);
  return envelope.success && essayContentSchema.safeParse(value).success;
}
export function isGradedAfternoon(value: unknown): value is AfternoonScoringResult & { status: "graded" } {
  return z.object({status: z.literal("graded"), gradingMode: z.literal("ai"), questionId: z.string()}).safeParse(value).success
    && afternoonContentSchema.safeParse(value).success;
}
