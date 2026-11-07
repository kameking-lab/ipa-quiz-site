// Shared by browser, Node and Edge: no server secrets or Node-only imports.
function record(value: unknown): Record<string, unknown> | undefined {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, unknown> : undefined;
}

export function telemetryUrl(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  try {
    const url = new URL(value, "https://redacted.invalid");
    return `${url.origin}${url.pathname}`;
  } catch { return undefined; }
}

export function sanitizeBreadcrumb<T>(breadcrumb: T): T {
  const value = record(breadcrumb);
  if (!value) return breadcrumb;
  // Console arguments, fetch bodies and URLs can contain essays, credentials,
  // email addresses or OAuth codes. Retain only the breadcrumb category/timing.
  delete value.message;
  delete value.data;
  return breadcrumb;
}

export function sanitizeTelemetryEvent<T>(event: T): T {
  const value = record(event);
  if (!value) return event;
  delete value.user;
  delete value.extra;
  const request = record(value.request);
  if (request) {
    const safeUrl = telemetryUrl(request.url);
    const method = typeof request.method === "string" ? request.method : undefined;
    // Drop all header casing variants, cookies, query_string, env and data.
    value.request = { url: safeUrl, method };
  }
  if (typeof value.message === "string") value.message = "Application error";
  const exception = record(value.exception);
  if (Array.isArray(exception?.values)) {
    for (const item of exception.values) {
      const error = record(item);
      if (!error) continue;
      // Upstream error strings can echo the entire prompt or secret-bearing URL.
      error.value = "Application error";
      const stack = record(error.stacktrace);
      if (Array.isArray(stack?.frames)) {
        stack.frames = stack.frames.map(frame => {
          const f = record(frame);
          return { filename: telemetryUrl(f?.filename), lineno: f?.lineno, colno: f?.colno };
        });
      }
    }
  }
  if (Array.isArray(value.breadcrumbs)) value.breadcrumbs.forEach(sanitizeBreadcrumb);
  // Performance events use a separate hook from error events.
  if (Array.isArray(value.spans)) {
    for (const span of value.spans) {
      const s = record(span);
      if (s) { delete s.data; delete s.description; }
    }
  }
  const trace = record(record(value.contexts)?.trace);
  if (trace) delete trace.data;
  return event;
}
