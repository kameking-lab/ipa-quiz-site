import { CITATION_UNVERIFIED_NOTICE } from "./citations";

/** Public diagnostics contain only fixed codes and bounded numeric metadata. */
export const COPILOT_ERROR_CODES = ["provider_config", "credit", "model", "parameters", "quota", "rate_limit", "temporary", "no_text", "malformed_stream", "truncated", "timeout", "monthly_budget", "general"] as const;
export type CopilotErrorCode = typeof COPILOT_ERROR_CODES[number];
export interface CopilotErrorInfo {
  code: CopilotErrorCode;
  retryable?: boolean;
  httpStatus?: number;
  providerCode?: string;
  providerReason?: string;
  retryAfterSeconds?: number;
}
const PROVIDER_CODES = new Set(["UNAUTHENTICATED", "PERMISSION_DENIED", "INVALID_ARGUMENT", "NOT_FOUND", "RESOURCE_EXHAUSTED", "UNAVAILABLE", "DEADLINE_EXCEEDED", "INTERNAL", "QUOTA_EXCEEDED", "RATE_LIMIT_EXCEEDED", "BILLING_DISABLED"]);
// Fixed google.rpc.ErrorInfo reasons in the googleapis.com domain. Never retain
// error messages, metadata, consumer IDs, URLs, or an unknown reason string.
const PROVIDER_REASONS = new Set(["API_KEY_INVALID", "API_KEY_SERVICE_BLOCKED", "API_KEY_HTTP_REFERRER_BLOCKED", "API_KEY_IP_ADDRESS_BLOCKED", "API_KEY_ANDROID_APP_BLOCKED", "API_KEY_IOS_APP_BLOCKED", "SERVICE_DISABLED", "BILLING_DISABLED", "CONSUMER_INVALID", "RATE_LIMIT_EXCEEDED", "RESOURCE_QUOTA_EXCEEDED"]);
export class CopilotProviderError extends Error {
  constructor(readonly info: CopilotErrorInfo) {
    super(`Copilot provider failure: ${info.code}`);
    this.name = "CopilotProviderError";
  }
}
export function classifyProviderError(httpStatus: number, providerCode?: unknown, retryAfter?: string | null): CopilotErrorInfo {
  const safeCode = typeof providerCode === "string" && PROVIDER_CODES.has(providerCode) ? providerCode : undefined;
  const code: CopilotErrorCode = httpStatus === 401 || httpStatus === 403 ? "provider_config"
    : httpStatus === 402 ? "credit" : httpStatus === 404 ? "model" : httpStatus === 400 ? "parameters"
    : httpStatus === 429 ? safeCode === "QUOTA_EXCEEDED" ? "quota" : safeCode === "RATE_LIMIT_EXCEEDED" ? "rate_limit" : "general"
    : (httpStatus === 500 && safeCode === "INTERNAL") || httpStatus === 503 || httpStatus === 504 ? "temporary" : "general";
  const seconds = retryAfter && /^\d+$/.test(retryAfter) ? Number(retryAfter) : NaN;
  return { code, httpStatus, ...(safeCode ? { providerCode: safeCode } : {}), ...(Number.isSafeInteger(seconds) && seconds >= 0 && seconds <= 86400 ? { retryAfterSeconds: seconds } : {}) };
}
export function copilotErrorInfo(error: unknown): CopilotErrorInfo {
  return error instanceof CopilotProviderError ? error.info : { code: "general" };
}
const PREFIX = "\n\n<!--copilot-error:";
export function encodeCopilotStreamError(info: CopilotErrorInfo): string {
  return `${PREFIX}${JSON.stringify(info)}-->`;
}
/** Call on the accumulated response; an incomplete marker is hidden while streaming. */
export function parseCopilotStreamError(text: string): { text: string; error?: CopilotErrorInfo } {
  const index = text.lastIndexOf(PREFIX);
  if (index < 0) return { text };
  const visible = text.slice(0, index);
  if (!text.endsWith("-->")) return { text: visible };
  try {
    const value: unknown = JSON.parse(text.slice(index + PREFIX.length, -3));
    if (!value || typeof value !== "object" || !("code" in value) || !COPILOT_ERROR_CODES.includes(value.code as CopilotErrorCode)) return { text: visible, error: { code: "general" } };
    const metadata = value as Record<string, unknown>;
    const retry = metadata.retryAfterSeconds;
    return { text: visible, error: { code: value.code as CopilotErrorCode, ...(typeof retry === "number" && Number.isSafeInteger(retry) && retry >= 0 && retry <= 86400 ? { retryAfterSeconds: retry } : {}) } };
  } catch { return { text: visible, error: { code: "general" } }; }
}

export type CopilotFailure = CopilotErrorInfo;
export function classifyCopilotHttpFailure(status: number, body?: unknown, retryAfter?: string | null): CopilotFailure {
  const record = body && typeof body === "object" ? body as Record<string, unknown> : undefined;
  const nested = record?.error && typeof record.error === "object" ? record.error as Record<string, unknown> : undefined;
  const appCode = typeof record?.error === "string" ? record.error : record?.code;
  const appCodes: Record<string, CopilotErrorCode> = { invalid_request: "parameters", unknown_question: "parameters", rate_limit_unavailable: "temporary", rate_limited: "rate_limit", provider_unavailable: "provider_config", cost_capped: "monthly_budget" };
  const info = classifyProviderError(status, nested?.status ?? record?.code ?? record?.error, retryAfter);
  if (Array.isArray(nested?.details)) {
    for (const detail of nested.details.slice(0, 16)) {
      if (detail && typeof detail === "object" && detail["@type"] === "type.googleapis.com/google.rpc.ErrorInfo" &&
        detail.domain === "googleapis.com" && typeof detail.reason === "string" && PROVIDER_REASONS.has(detail.reason)) {
        info.providerReason = detail.reason;
        break;
      }
    }
  }
  if (status === 429 && info.providerReason === "RATE_LIMIT_EXCEEDED") info.code = "rate_limit";
  if (status === 429 && info.providerReason === "RESOURCE_QUOTA_EXCEEDED") info.code = "quota";
  if (typeof appCode === "string" && Object.hasOwn(appCodes, appCode)) info.code = appCodes[appCode];
  if (appCode === "rate_limited") {
    info.code = record?.reason === "daily" ? "quota" : record?.reason === "hour" || record?.reason === "minute" ? "rate_limit" : "general";
    const resetAt = record?.resetAt;
    if (typeof resetAt === "number" && Number.isSafeInteger(resetAt)) {
      const seconds = Math.ceil((resetAt - Date.now()) / 1000);
      if (seconds >= 0 && seconds <= 86400) info.retryAfterSeconds = seconds;
    }
  }
  return { ...info, retryable: ["rate_limit", "temporary", "timeout"].includes(info.code) };
}
export function parseCopilotFailure(text: string): { text: string; error?: CopilotFailure } {
  const parsed = parseCopilotStreamError(text);
  // Match only the exact server fallback paragraph at the response tail.
  // A bracketed label inside an explanation is ordinary answer text.
  const legacy: Array<{ paragraph: string; code: CopilotErrorCode }> = [
    { paragraph: "[タイムアウト] AI応答が途中で止まりました。短めの設定で再試行するか、もう一度お試しください。", code: "timeout" },
    { paragraph: "[タイムアウト] AIの応答が間に合いませんでした。混雑時は再試行で改善することがあります。", code: "timeout" },
    { paragraph: "[応答の途中終了] 出力上限に達しました。続きを質問してください。", code: "truncated" },
    { paragraph: "[エラー] AI応答の取得に失敗しました。少し時間を置いて再度お試しください。", code: "general" },
  ];
  const unverifiedNotice = CITATION_UNVERIFIED_NOTICE.trim();
  const isFooterOrEnd = (tail: string) => !tail.trim() || tail.trim() === unverifiedNotice ||
    /^\r?\n+---\r?\n\*\*(?:参照資料(?:（[^）]*）)?|出典)\*\*\r?\n[\s\S]*$/.test(tail);
  const found = legacy.map((entry) => ({ ...entry, index: parsed.text.lastIndexOf(entry.paragraph) }))
    .find(({ paragraph, index }) => index >= 0 &&
      (index === 0 || /\r?\n\r?\n$/.test(parsed.text.slice(0, index))) &&
      isFooterOrEnd(parsed.text.slice(index + paragraph.length)));
  const visible = found ? parsed.text.slice(0, found.index).trimEnd() : parsed.text;
  const error = parsed.error ?? (found ? { code: found.code } : undefined);
  return error ? { text: visible, error: { ...error, retryable: ["rate_limit", "temporary", "timeout"].includes(error.code) } } : { text: visible };
}

export function copilotFailureMessage(error: CopilotFailure): string {
  const messages: Record<CopilotErrorCode, string> = {
    provider_config: "AIの接続設定を確認する必要があります。運営側の対応をお待ちください。",
    credit: "AIサービスの利用残高を確認する必要があります。運営側の対応をお待ちください。",
    model: "AIモデルを利用できません。運営側の対応をお待ちください。",
    parameters: "AIへのリクエストを処理できませんでした。入力内容を確認してください。",
    quota: "AIサービスの利用上限に達しました。上限の回復をお待ちください。",
    rate_limit: "アクセスが集中しています。時間を置いて再試行してください。",
    temporary: "AIサービスが一時的に利用できません。時間を置いて再試行してください。",
    no_text: "AIから回答本文を取得できませんでした。",
    malformed_stream: "AIの応答を読み取れませんでした。",
    truncated: "AIの回答が途中で終了しました。",
    timeout: "AIの応答が時間内に完了しませんでした。時間を置いて再試行してください。",
    monthly_budget: "今月のAI利用予算に達したため、一時的に停止しています。",
    general: "AI応答の取得に失敗しました。原因を確認中です。",
  };
  return messages[error.code];
}
