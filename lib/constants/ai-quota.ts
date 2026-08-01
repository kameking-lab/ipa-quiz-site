/**
 * Single source of truth for the AI copilot's free-quota model so enforcement
 * (lib/storage/rate-limit-client, lib/rate-limit/server) and user-facing copy
 * never drift. The product uses a feedback-driven model: the first
 * FREE_AI_DAILY_LIMIT requests/day are free, and after the user submits
 * feedback the cap is effectively unlimited (POST_FEEDBACK_AI_DAILY_LIMIT).
 *
 * NOTE: this is NOT a limit change — it codifies the value already enforced in
 * code (10). Some marketing pages still said "1日30回"; those are corrected to
 * reference this constant. Changing the enforced number itself is a CLAUDE.md
 * §10 approval-required action and is out of scope here.
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

/** Canonical one-line description of the quota model for marketing copy. */
export const AI_QUOTA_COPY = `AI コパイロットは初回 ${FREE_AI_DAILY_LIMIT} 回まで無料。フィードバックを投稿いただくと、その後はほぼ無制限でご利用いただけます。`;

/** Short form for tight spots (badges, captions). */
export const AI_QUOTA_COPY_SHORT = `初回 ${FREE_AI_DAILY_LIMIT} 回無料（フィードバック後ほぼ無制限）`;
