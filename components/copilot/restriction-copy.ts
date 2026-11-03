/** Display-only guidance. Never authorizes a request or changes quota accounting. */
export interface CopilotRestriction {
  reason: string;
  resume: string;
  sharedNetwork: boolean;
}

export function copilotRestriction(
  response: Pick<Response, "status" | "headers">,
  body: unknown,
  now = Date.now(),
): CopilotRestriction | null {
  if (![401, 403, 429, 503].includes(response.status)) return null;
  const data = body && typeof body === "object" ? body as Record<string, unknown> : {};
  const scope = response.headers.get("X-AI-RateLimit-Scope") || data.scope;
  const daily = data.error === "ai_daily_quota_exhausted";
  let reason = "AIサービスを一時的に利用できません。";
  if (response.status === 401) reason = "AIを利用するにはログインが必要です。入力はこの画面に残しています。";
  else if (response.status === 403) reason = "現在のアカウントではこのAI機能を利用できません。";
  else if (daily) reason = "本日の無料AIの共通利用上限に達しています。";
  else if (scope === "subject-burst") reason = "短時間の送信が集中したため、一時的に制限されています。";
  else if (scope === "service-global") reason = "サービス全体の利用が集中したため、一時的に制限されています。";
  else if (scope === "service-cost" || data.error === "cost_capped") reason = "サービス全体のAI費用上限による一時停止です。個人の利用回数上限ではありません。";
  else if (response.status === 429) reason = "送信回数の一時制限がかかっています。";
  else if (scope === "unavailable" || data.error === "ai_usage_unavailable" || data.error === "budget_unavailable") reason = "AIサービスの利用状況を確認できないため、一時停止しています。";

  let resume = "再開時刻は確認できません。時間をおいて、ご自身で再送してください。";
  if (response.status === 401 || response.status === 403) {
    resume = "ログイン状態や利用条件をご確認ください。自動では再送しません。";
  } else {
    // resetAt is milliseconds in the existing API. Do not infer a daily reset
    // from a rate-limit scope, or apply the free quota reset to a burst guard.
    const resetAt = typeof data.resetAt === "number" ? data.resetAt : NaN;
    const retry = response.headers.get("Retry-After");
    const retryAt = retry && /^\d+$/.test(retry)
      ? now + Number(retry) * 1000
      : retry ? Date.parse(retry) : NaN;
    const candidate = Number.isFinite(resetAt) ? resetAt : retryAt;
    if (Number.isSafeInteger(candidate) && candidate > now && candidate <= 8640000000000000) {
      const label = new Intl.DateTimeFormat("ja-JP", {
        timeZone: "Asia/Tokyo", month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23",
      }).format(candidate);
      resume = `再送の目安：${label}（日本時間）。利用再開を保証する時刻ではありません。自動では再送しません。`;
    }
  }
  return { reason, resume, sharedNetwork: response.status === 429 && !daily && !scope };
}
