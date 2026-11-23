import {
  GoogleGenerativeAIAbortError,
  GoogleGenerativeAIError,
  GoogleGenerativeAIFetchError,
  GoogleGenerativeAIRequestInputError,
  GoogleGenerativeAIResponseError,
} from "@google/generative-ai";

/** Log diagnostics, never the SDK object, stack, response or errorDetails. */
export function providerErrorDiagnostic(error: unknown, privateText: readonly string[] = []) {
  const kind = error instanceof GoogleGenerativeAIFetchError ? "google_http"
    : error instanceof GoogleGenerativeAIAbortError ? "google_abort"
      : error instanceof GoogleGenerativeAIRequestInputError ? "google_request"
        : error instanceof GoogleGenerativeAIResponseError ? "google_response"
          : error instanceof GoogleGenerativeAIError ? "google_transport"
            : error instanceof Error && ["AbortError", "TimeoutError"].includes(error.name) ? error.name
              : "internal";
  if (!(error instanceof GoogleGenerativeAIFetchError)) return { kind };

  // The legacy SDK appends errorDetails JSON (which may include credentials).
  // Keep only Google's human-readable message after the HTTP status prefix.
  let message = error.message.replace(/^[\s\S]*?: \[\d{3} [^\]]*\]\s*/, "").split(/\s+\[\s*\{/)[0];
  for (const text of [...privateText].filter(Boolean).sort((a, b) => b.length - a.length)) {
    message = message.split(text).join("[redacted]");
  }
  message = message
    .replace(/https?:\/\/\S+/gi, "[url]")
    .replace(/(?:data:[^\s,]*;base64,)?[A-Za-z0-9+/_=-]{32,}/g, "[redacted]")
    .replace(/\b(?:bearer|api[_ -]?key|token|authorization|password|secret)\b\s*[:=]?\s*["']?[^\s,;"']+/gi, "[credential]")
    .replace(/"[^"\r\n]*"|'[^'\r\n]*'|`[^`\r\n]*`/g, "[redacted]")
    .replace(/[\r\n\t\u0000-\u001f]+/g, " ")
    .slice(0, 600);
  return { kind, status: error.status, googleMessage: message };
}
