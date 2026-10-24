import { CITATION_UNVERIFIED_NOTICE } from "@/lib/copilot/citations";
import { expect, it, vi } from "vitest";
import { classifyCopilotHttpFailure, copilotErrorInfo, encodeCopilotStreamError, parseCopilotFailure } from "@/lib/copilot/errors";

function errorDetail(reason: unknown, domain = "googleapis.com") {
  return { "@type": "type.googleapis.com/google.rpc.ErrorInfo", domain, reason, metadata: { consumer: "synthetic-private-project" } };
}
it("retains only an allowlisted ErrorInfo reason and never its message or metadata", () => {
  const info = classifyCopilotHttpFailure(401, { error: { status: "UNAUTHENTICATED", message: "synthetic-private-message", details: [errorDetail("API_KEY_INVALID")] } });
  expect(info).toEqual({ code: "provider_config", httpStatus: 401, providerCode: "UNAUTHENTICATED", providerReason: "API_KEY_INVALID", retryable: false });
  expect(JSON.stringify(info)).not.toContain("synthetic-private");
  expect(parseCopilotFailure(encodeCopilotStreamError(info)).error).toEqual({ code: "provider_config", retryable: false });
});
it.each([
  [errorDetail("synthetic-private-reason")],
  [errorDetail("API_KEY_INVALID", "untrusted.example")],
  [{ reason: "API_KEY_INVALID", domain: "googleapis.com" }],
  [null, 1, "API_KEY_INVALID"],
  [...Array.from({ length: 16 }, () => null), errorDetail("API_KEY_INVALID")],
])("ignores unknown or unbounded error details", (...details) => {
  expect(classifyCopilotHttpFailure(401, { error: { details } })).toEqual({ code: "provider_config", httpStatus: 401, retryable: false });
});
it("uses structured rate/resource reasons without interpreting free-text quota messages", () => {
  expect(classifyCopilotHttpFailure(429, { error: { status: "RESOURCE_EXHAUSTED", details: [errorDetail("RATE_LIMIT_EXCEEDED")] } })).toMatchObject({ code: "rate_limit", retryable: true });
  expect(classifyCopilotHttpFailure(429, { error: { status: "RESOURCE_EXHAUSTED", details: [errorDetail("RESOURCE_QUOTA_EXCEEDED")] } })).toMatchObject({ code: "quota", retryable: false });
  expect(classifyCopilotHttpFailure(429, { error: { message: "daily quota", status: "RESOURCE_EXHAUSTED" } })).toMatchObject({ code: "general", retryable: false });
});

it.each([[401, "provider_config"], [403, "provider_config"], [402, "credit"], [404, "model"], [400, "parameters"], [503, "temporary"], [504, "temporary"], [500, "general"]])("classifies HTTP %s without raw details", (status, code) => {
  const result = classifyCopilotHttpFailure(Number(status), { error: { status: "secret-prompt-or-key", message: "secret-prompt-or-key" } });
  expect(result.code).toBe(code);
  expect(JSON.stringify(result)).not.toContain("secret");
});
it("distinguishes explicit quota and rate codes without guessing RESOURCE_EXHAUSTED", () => {
  expect(classifyCopilotHttpFailure(429, { error: { status: "QUOTA_EXCEEDED" } }).code).toBe("quota");
  expect(classifyCopilotHttpFailure(429, { error: { status: "RATE_LIMIT_EXCEEDED" } }, "30")).toMatchObject({ code: "rate_limit", retryable: true, retryAfterSeconds: 30 });
  expect(classifyCopilotHttpFailure(429, { error: { status: "RESOURCE_EXHAUSTED" } }).code).toBe("general");
  expect(classifyCopilotHttpFailure(503, undefined, "999999999").retryAfterSeconds).toBeUndefined();
});
it("removes markers and rejects unknown diagnostic values", () => {
  expect(parseCopilotFailure("partial" + encodeCopilotStreamError({ code: "temporary" }))).toEqual({ text: "partial", error: { code: "temporary", retryable: true } });
  expect(parseCopilotFailure('partial\n\n<!--copilot-error:{"code":"secret"}-->')).toEqual({ text: "partial", error: { code: "general", retryable: false } });
  expect(parseCopilotFailure('partial\n\n<!--copilot-error:{')).toEqual({ text: "partial" });
  expect(copilotErrorInfo(new Error("secret"))).toEqual({ code: "general" });
});

it("prefers typed error metadata and removes a preceding legacy fallback", () => {
  const result = parseCopilotFailure("partial\n\n[エラー] AI応答の取得に失敗しました。少し時間を置いて再度お試しください。" + encodeCopilotStreamError({ code: "provider_config", retryAfterSeconds: 30 }));
  expect(result).toEqual({ text: "partial", error: { code: "provider_config", retryAfterSeconds: 30, retryable: false } });
});
it("distinguishes daily limits and bounds numeric reset timestamps", () => {
  const now = 1800000000000;
  const clock = vi.spyOn(Date, "now").mockReturnValue(now);
  try {
    expect(classifyCopilotHttpFailure(429, { error: "rate_limited", reason: "daily", resetAt: now + 60000 })).toMatchObject({ code: "quota", retryable: false, retryAfterSeconds: 60 });
    expect(classifyCopilotHttpFailure(429, { error: "rate_limited", reason: "minute", resetAt: now + 30000 })).toMatchObject({ code: "rate_limit", retryable: true, retryAfterSeconds: 30 });
    expect(classifyCopilotHttpFailure(429, { error: "rate_limited", reason: "hour", resetAt: "secret" }).retryAfterSeconds).toBeUndefined();
    expect(classifyCopilotHttpFailure(429, { error: "rate_limited", reason: "daily", resetAt: now + 86401000 }).retryAfterSeconds).toBeUndefined();
    expect(classifyCopilotHttpFailure(500, { error: { status: "INTERNAL" } })).toMatchObject({ code: "temporary", retryable: true });
  } finally { clock.mockRestore(); }
});

it.each([
  "ログの [エラー] は異常を表します。",
  "[タイムアウト] というログの意味を説明します。",
  "通信ログでは [タイムアウト] が記録されることがあります。",
  "[エラー] AI応答の取得に失敗しました。少し時間を置いて再度お試しください。という文は例です。",
])("preserves bracketed labels in successful answer text: %s", (text) => {
  expect(parseCopilotFailure(text)).toEqual({ text });
  expect(parseCopilotFailure(text + encodeCopilotStreamError({ code: "temporary" }))).toEqual({ text, error: { code: "temporary", retryable: true } });
});
it("recognizes exact fallback paragraphs with a legacy citation footer", () => {
  const fallback = "[エラー] AI応答の取得に失敗しました。少し時間を置いて再度お試しください。";
  const footer = "\n---\n**参照資料（引用番号に対応）**\n- [1] [資料](/q/ap/2024a/am/q1)";
  expect(parseCopilotFailure("partial\n\n" + fallback + footer)).toEqual({ text: "partial", error: { code: "general", retryable: false } });
  expect(parseCopilotFailure(fallback)).toEqual({ text: "", error: { code: "general", retryable: false } });
  expect(parseCopilotFailure("説明: " + fallback)).toEqual({ text: "説明: " + fallback });
  expect(parseCopilotFailure("partial\n\n" + fallback + "\n\n続きの説明")).toEqual({ text: "partial\n\n" + fallback + "\n\n続きの説明" });
});

it("removes the exact truncation warning followed by the shared citation notice", () => {
  const text = "partial\n\n[応答の途中終了] 出力上限に達しました。続きを質問してください。" + CITATION_UNVERIFIED_NOTICE;
  expect(parseCopilotFailure(text)).toEqual({ text: "partial", error: { code: "truncated", retryable: false } });
  expect(parseCopilotFailure(text + encodeCopilotStreamError({ code: "truncated" }))).toEqual({ text: "partial", error: { code: "truncated", retryable: false } });
});
