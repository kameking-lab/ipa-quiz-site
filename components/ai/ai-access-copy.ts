import { DRAFT_AI_NORMAL_USE_POLICY, normalUsePolicyReady, type AiNormalUsePolicy } from "@/lib/ai/normal-use-policy";
import { AI_FEATURES, aiPolicyReady, DRAFT_AI_ACCESS_POLICY, type AiAccessPolicy } from "@/lib/ai/access-policy";

export const AI_ACCESS_DESCRIPTION = "無料AIは1日3回です（対象のAI機能で共通・日本時間の毎日0時更新）。有料会員は通常利用で回数無制限です。短時間の大量送信やサービス全体の費用上限などにより、一時停止する場合があります。";
export const BROWSER_AUDIO_DESCRIPTION = "ブラウザーの読み上げ・音声入力は無料で、AIの利用回数を消費しません。対応状況や音声の利用可否はブラウザー・端末により異なります。";
export const AI_ATTEMPT_DESCRIPTION = "無料AIは生成を開始する試行ごとに1回を消費します。開始後の失敗・中断・ユーザーによる停止・不正な出力でも回数は戻りません。通信結果が不明な場合、消費の有無は確認できません。";

/** Publishing claims requires the exact runtime policy to be ready, not just selected business values. */
export function aiAccessClaimsEnabled(policy: Readonly<AiAccessPolicy> = DRAFT_AI_ACCESS_POLICY, normal: Readonly<AiNormalUsePolicy> = DRAFT_AI_NORMAL_USE_POLICY, now = Date.now()): boolean {
  return aiPolicyReady(policy, now) && normalUsePolicyReady(normal, policy.version, now)
    && normal.subjectWindowMode === "burst-only" && policy.dailyNewGenerationLimit === 3
    && policy.dailyResetUtcOffsetMinutes === 540 && policy.paidNormalUseEnabled === true
    && policy.freeFeatures?.length === AI_FEATURES.length && policy.paidFeatures?.length === AI_FEATURES.length
    && AI_FEATURES.every(feature => policy.freeFeatures?.includes(feature) && policy.paidFeatures?.includes(feature));
}

/** Only appended after matching policy and a complete, consistent free quota response. */
export const AI_QUOTA_EXHAUSTED_DESCRIPTION = "この応答時点で本日の無料AI枠を使い切っています。";
export const AI_QUOTA_CONTINUATION_DESCRIPTION = "無料で続ける：個別問題・検索・保存済み履歴の閲覧と復習、対応ブラウザーの読み上げを利用できます。AIの再開：上記の更新日時以降に再度お試しください（日本時間の毎日0時更新）。有料で続ける：月額プランの条件と受付状況を確認できます。サービス全体の一時制限は有料会員にも適用されます。";

export function hasAiQuotaContinuation(message?: string | null): boolean {
  return !!message?.includes(AI_QUOTA_EXHAUSTED_DESCRIPTION);
}

interface ResponseSummary { status: number; headers: Pick<Headers, "get"> }
export function aiResponseNotice(response: ResponseSummary, expectedVersion = DRAFT_AI_ACCESS_POLICY.version): string {
  const h = response.headers;
  if (!expectedVersion || h.get("X-AI-Policy-Version") !== expectedVersion) return "送信結果の利用回数情報を確認できません。";
  const access = h.get("X-AI-Access");
  const scope = h.get("X-AI-Quota-Scope");
  const attempt = h.get("X-AI-Attempt");
  const consumed = h.get("X-AI-Quota-Consumed");
  const guard = h.get("X-AI-RateLimit-Scope");
  const result: string[] = [];
  if (guard === "service-cost") result.push("サービス全体の費用上限による一時停止です。個人の1日分を使い切ったという意味ではありません。");
  if (guard === "subject-burst") result.push("短時間の送信制限です。時間をおいてお試しください。個人の1日分を使い切ったという意味ではありません。");
  else if (guard === "service-global") result.push("サービス全体の一時的な利用制限です。個人の1日分を使い切ったという意味ではありません。");
  else if (guard === "unavailable") result.push("サービスの利用状況を確認できません。");
  const numeric = (name: string) => {
    const value = h.get(name);
    return value !== null && /^(0|[1-9]\d*)$/.test(value) && Number.isSafeInteger(Number(value)) ? Number(value) : null;
  };
  const free = access === "free" && scope === "subject-day";
  const paid = access === "paid-normal-use" && scope === "none";
  const consistent = (free && ((attempt === "admitted" && consumed === "1") || ((attempt === "not-started" || attempt === "mock") && consumed === "0") || (attempt === "unknown" && consumed === "unknown")))
    || (paid && (attempt === "admitted" || attempt === "not-started" || attempt === "mock") && consumed === "0");
  if (!access && !scope && attempt === "not-started" && consumed === "0") return [...result, "今回は生成開始前のため、AI回数を消費していません。"].join(" ");
  if (!consistent) return [...result, "今回のAI利用回数の消費は確認できません。"].join(" ");
  if (paid) result.push("前回送信時の確認：有料会員・通常利用で回数無制限。");
  if (free) {
    const remaining = numeric("X-RateLimit-Remaining");
    const limit = numeric("X-RateLimit-Limit");
    const reset = numeric("X-RateLimit-Reset");
    if (!guard && attempt !== "unknown" && limit === 3 && remaining !== null && remaining <= limit && reset !== null && reset > 0 && reset <= 8640000000000000) {
      const resetLabel = new Intl.DateTimeFormat("ja-JP", {timeZone:"Asia/Tokyo",month:"numeric",day:"numeric",hour:"2-digit",minute:"2-digit",hourCycle:"h23"}).format(reset);
      result.push("前回送信時の確認：無料AIの共通残り " + remaining + " / 3 回。更新：" + resetLabel + "（日本時間）。");
      if (remaining === 0) result.push(AI_QUOTA_EXHAUSTED_DESCRIPTION, AI_QUOTA_CONTINUATION_DESCRIPTION);
    } else result.push("前回送信時の確認：無料AI。残り回数は確認できません。");
  }
  if (attempt === "admitted") result.push(free ? "今回は生成開始の試行で1回消費しました。出力の成功・品質の保証ではありません。" : "今回は生成開始の試行が行われました。無料枠の消費はありません。");
  else if (attempt === "not-started") result.push("今回は生成開始前のため、AI回数を消費していません。");
  else if (attempt === "mock") result.push("デモ応答のため、AI回数を消費していません。");
  else result.push("通信結果が不明なため、今回のAI回数の消費は確認できません。");
  return result.join(" ");
}

/** New or unknown policy markers must never revoke a legacy feedback benefit. */
export function shouldSyncLegacyAiFeedback(headers: Pick<Headers,"has">, serverManaged: boolean): boolean {
  return !serverManaged && !["X-AI-Policy-Version", "X-AI-Access", "X-AI-Quota-Scope", "X-AI-Attempt", "X-AI-Quota-Consumed", "X-AI-RateLimit-Scope"].some(name => headers.has(name));
}
