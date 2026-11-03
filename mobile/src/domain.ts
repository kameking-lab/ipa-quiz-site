import { z } from "zod";

export const CHOICES = ["ア", "イ", "ウ", "エ"] as const;
export const ExamSchema = z.enum(["ip", "fe"]);
export type Exam = z.infer<typeof ExamSchema>;
export const EXAMS: Record<Exam, string> = { ip: "ITパスポート", fe: "基本情報技術者" };
const sourceUrl = z.url().refine((value) => {
  const u = new URL(value);
  return u.protocol === "https:" && ["www.ipa.go.jp", "www.jitec.ipa.go.jp", "www3.jitec.ipa.go.jp"].includes(u.hostname);
}, "公式の出典URLが必要です");
const text = z.string().min(1).max(24000);
export const QuestionSchema = z.object({
  id: z.string().min(1).max(120), exam: ExamSchema,
  session: z.enum(["am", "kamoku-a"]), year: z.number().int().min(2000).max(2100),
  season: z.enum(["spring", "autumn", "cbt"]), qNumber: z.number().int().positive(),
  type: z.literal("multiple-choice"), category: text,
  topicTags: z.array(z.string().max(100)).max(30), difficulty: z.number().int().min(1).max(5),
  question: text,
  choices: z.object({ ア: text, イ: text, ウ: text, エ: text }).strict(),
  answer: z.enum(CHOICES), explanation: text,
  choiceExplanations: z.object({ ア: text.optional(), イ: text.optional(), ウ: text.optional(), エ: text.optional() }).optional(),
  hasImage: z.literal(false), license: z.literal("IPA-public"),
  sourcePdfUrl: sourceUrl, sourceAnswerUrl: sourceUrl.optional(),
  sourceAttribution: z.string().max(1000).optional(), lastUpdated: z.iso.date().optional(),
});
export type Question = z.infer<typeof QuestionSchema>;
export type Choice = typeof CHOICES[number];

export const PackSchema = z.object({
  schema: z.literal(1), id: ExamSchema, version: z.number().int().positive(),
  updatedAt: z.iso.date(), attribution: text, rightsUrl: sourceUrl,
  // A release requires the separate, documented original-source content review.
  questions: z.array(QuestionSchema).min(1).max(500),
}).superRefine((p, ctx) => {
  if (p.questions.some(q => q.exam !== p.id) || new Set(p.questions.map(q => q.id)).size !== p.questions.length)
    ctx.addIssue({ code: "custom", message: "パックの資格または問題IDが不正です" });
});
export type Pack = z.infer<typeof PackSchema>;
export const DeltaSchema = z.object({
  schema: z.literal(1), packId: ExamSchema,
  fromVersion: z.number().int().nonnegative(), toVersion: z.number().int().positive(),
  updatedAt: z.iso.date(), attribution: text, rightsUrl: sourceUrl,
  upserts: z.array(QuestionSchema).max(500), deletedIds: z.array(z.string().min(1).max(120)).max(500),
  sha256: z.string().regex(/^[a-f0-9]{64}$/),
}).strict();
export type Delta = z.infer<typeof DeltaSchema>;

export async function packHash(pack: Pack): Promise<string> {
  const bytes = new TextEncoder().encode(JSON.stringify(pack));
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), b => b.toString(16).padStart(2, "0")).join("");
}

export async function applyDelta(current: Pack, input: unknown): Promise<Pack> {
  const d = DeltaSchema.parse(input);
  if (d.packId !== current.id || d.fromVersion !== current.version || d.toVersion <= current.version)
    throw new Error("問題パックの版が一致しません。現在のデータを保持します。");
  const upsertIds = d.upserts.map(q => q.id);
  if (new Set(upsertIds).size !== upsertIds.length || new Set(d.deletedIds).size !== d.deletedIds.length ||
      d.deletedIds.some(id => upsertIds.includes(id)) || d.upserts.some(q => q.exam !== current.id))
    throw new Error("差分データが不正です。");
  const questions = new Map(current.questions.map(q => [q.id, q]));
  for (const id of d.deletedIds) questions.delete(id);
  for (const q of d.upserts) questions.set(q.id, q);
  const next = PackSchema.parse({
    schema: 1, id: current.id, version: d.toVersion, updatedAt: d.updatedAt,
    attribution: d.attribution, rightsUrl: d.rightsUrl,
    questions: [...questions.values()].sort((a, b) => a.id.localeCompare(b.id, "en")),
  });
  if (await packHash(next) !== d.sha256) throw new Error("問題パックの整合性を確認できません。");
  return next;
}

export const AnswerSchema = z.object({
  questionId: z.string(), selected: z.enum(CHOICES), correct: z.boolean(),
  answeredAt: z.iso.datetime(), uncertain: z.boolean(),
});
export type Answer = z.infer<typeof AnswerSchema>;
export interface Progress { attempts: number; correct: number; latest: Answer; review: boolean }
export function progressFor(history: Answer[]): Map<string, Progress> {
  const progress = new Map<string, Progress>();
  for (const a of history) {
    const prev = progress.get(a.questionId);
    progress.set(a.questionId, {
      attempts: (prev?.attempts ?? 0) + 1, correct: (prev?.correct ?? 0) + Number(a.correct),
      latest: a, review: !a.correct || a.uncertain,
    });
  }
  return progress;
}
export function queueFor(pack: Pack, history: Answer[], reviewOnly: boolean): Question[] {
  const progress = progressFor(history);
  return pack.questions.filter(q => !reviewOnly || progress.get(q.id)?.review)
    .sort((a, b) => (progress.get(a.id)?.latest.answeredAt ?? "").localeCompare(progress.get(b.id)?.latest.answeredAt ?? ""));
}
export function jstDay(now = new Date()): string {
  return new Date(now.getTime() + 9 * 3600_000).toISOString().slice(0, 10);
}
