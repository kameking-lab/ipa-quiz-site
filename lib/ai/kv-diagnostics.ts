type KvFailure = "configuration" | "network" | "timeout" | "http" | "response";

// Redis errors can echo arguments, keys or URLs. Only keep fixed phrases we
// recognize, never command parameters or arbitrary upstream text.
const upstashErrors = [
  "invalid AI usage arguments", "invalid AI usage counter", "invalid normal use counter",
  "invalid normal use arguments", "invalid quota arguments", "invalid quota hash", "invalid guest quota hash",
  "invalid budget", "duplicate reservation", "inconsistent budget", "WRONGPASS", "NOAUTH", "NOPERM", "WRONGTYPE",
  "CROSSSLOT Keys in request don't hash to the same slot", "CROSSSLOT", "NOSCRIPT", "BUSY", "OOM", "READONLY",
  "max request size exceeded", "max requests limit exceeded", "max daily request limit exceeded",
  "request is too large", "request limit exceeded", "command rate limit exceeded", "wrong number of arguments",
  "value is not an integer or out of range", "non local key", "undeclared key", "unknown command",
  "attempt to index", "attempt to compare", "attempt to call", "bad argument", "Error running script",
];

export function logAiKvFailure(operation: string, kind: KvFailure, httpStatus?: number, upstream?: unknown) {
  const message = typeof upstream === "string" ? upstream.toLowerCase() : undefined;
  const upstashError = message === undefined ? undefined :
    upstashErrors.find(phrase => message.includes(phrase.toLowerCase())) ?? "unrecognized Upstash error";
  console.warn("[ai-kv] command failed", { operation, kind, httpStatus, upstashError });
}
