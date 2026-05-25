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

/** Canonical one-line description of the quota model for marketing copy. */
export const AI_QUOTA_COPY = `AI コパイロットは初回 ${FREE_AI_DAILY_LIMIT} 回まで無料。フィードバックを投稿いただくと、その後はほぼ無制限でご利用いただけます。`;

/** Short form for tight spots (badges, captions). */
export const AI_QUOTA_COPY_SHORT = `初回 ${FREE_AI_DAILY_LIMIT} 回無料（フィードバック後ほぼ無制限）`;
