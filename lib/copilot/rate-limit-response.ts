import type { AiNormalUseResult } from "@/lib/ai/normal-use-server";

export function copilotRateLimitResponse(result: AiNormalUseResult, headers: Record<string, string>): Response | null {
  if (result.ok) return null;
  if (result.reason === "unavailable") {
    return Response.json(
      { error: "rate_limit_unavailable", message: "AIサービスは一時的に利用できません。少し待ってから再試行してください。" },
      { status: 503, headers: { ...headers, "X-Error-Type": "server_error", "Retry-After": "60" } },
    );
  }
  return Response.json(
    { error: "rate_limited", message: "リクエストが集中しています。しばらく待ってから再試行してください。",
      reason: result.reason, scope: result.scope, resetAt: result.resetAt },
    { status: 429, headers: { ...headers, "X-Error-Type": "rate_limited" } },
  );
}
