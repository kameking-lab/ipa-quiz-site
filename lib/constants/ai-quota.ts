/**
 * Legacy quota shared by non-copilot AI routes and the feedback token flow.
 * Both copilot question routes stopped using this ten-question gate after
 * the owner's 2026-09-28 instruction. Their abuse limits live in rate-limit.ts.
 */
export const FREE_AI_DAILY_LIMIT = 10;
export const POST_FEEDBACK_AI_DAILY_LIMIT = 9999;

/**
 * 1 本の無料枠解除トークンが 1 日に使える上限。
 *
 * 解除トークンは所持ベースなので、Cookie 値を配れば複数人で共有できる。
 * ここまでの防波堤は IP 単位の日次枠と §0 の月間コスト上限だけで、
 * 「1 本を大人数で回す」形の増幅には効かない（IP が違えば別枠になるため）。
 *
 * 値は 1 人分の枠（POST_FEEDBACK_AI_DAILY_LIMIT）と同じにしてある。
 * 普通に 1 人で使う限り到達しようがなく、共有されたときだけ効く＝
 * 正規利用者への副作用ゼロで増幅だけを止められる。上限を下げるのは
 * CLAUDE.md §10 の承認事項なので、既存の枠の値そのものは変えていない。
 */
export const FEEDBACK_TOKEN_DAILY_LIMIT = POST_FEEDBACK_AI_DAILY_LIMIT;

/** Copilot questions have no ten-question gate; other AI features retain their quotas. */
export const AI_QUOTA_COPY = "AI コパイロットは無料で質問できます。連続利用や大量送信には適正利用制限があります。";

/** Short form for tight spots (badges, captions). */
export const AI_QUOTA_COPY_SHORT = "無料で質問可能（適正利用制限あり）";
