import { z } from "zod";

export const FEEDBACK_BONUS = 10;
export const IMPROVEMENT_CHOICES = [
  { id: "qualifications", label: "資格の数を増やしてほしい" },
  { id: "explanations", label: "解説をもっと詳しく" },
  { id: "years", label: "収録年度・回数を増やしてほしい" },
  { id: "guide", label: "傾向と対策（参考書のような読み物）" },
  { id: "review", label: "苦手分野の練習・復習機能" },
  { id: "mobile", label: "スマホでの使いやすさ" },
  { id: "mock", label: "模試・時間計測" },
  { id: "other", label: "その他" },
] as const;
export const UnlockFeedbackSchema = z.object({
  choices: z.array(z.enum(IMPROVEMENT_CHOICES.map(c => c.id))).max(8).transform(v => [...new Set(v)]),
  requestedQualifications: z.array(z.string().trim().min(1).max(80)).max(10).default([]),
  comment: z.string().trim().max(1000).default(""),
  turnstileToken: z.string().max(4096).optional(),
}).strict().superRefine((v, ctx) => {
  if (!v.choices.length && !v.comment) ctx.addIssue({ code: "custom", message: "選択肢またはご意見を入力してください。" });
  if (v.choices.includes("qualifications") && !v.requestedQualifications.length) ctx.addIssue({ code: "custom", message: "希望資格を入力してください。" });
  if (!v.choices.includes("qualifications") && v.requestedQualifications.length) ctx.addIssue({ code: "custom", message: "資格の選択肢を選んでください。" });
});

export interface UnlockStatus { requiresLogin?: boolean; submitted: boolean; eligible: boolean; remaining: number }
export interface FeedbackExport {
  schemaVersion: 1; eventId: string; source: "kakomon-ai"; receivedAt: string;
  anonymousId: string; choices: string[]; requestedQualifications: string[]; commentMasked: string;
}
