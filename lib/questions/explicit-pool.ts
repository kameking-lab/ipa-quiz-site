/**
 * Explicit question pools are used when a caller has already selected the
 * exact search results to practise. Keep the payload small enough for a normal
 * browser URL and reject malformed/tampered values instead of silently
 * widening the session to the full question corpus.
 */
export const MAX_EXPLICIT_POOL_IDS = 60;
export const MAX_EXPLICIT_POOL_PARAM_LENGTH = 1_600;

const QUESTION_ID_PATTERN = /^[a-z0-9][a-z0-9-]{0,99}$/;

export function encodeExplicitPoolIds(ids: readonly string[]): string {
  const unique: string[] = [];
  const seen = new Set<string>();

  for (const id of ids) {
    if (!QUESTION_ID_PATTERN.test(id) || seen.has(id)) continue;
    const candidate = [...unique, id].join(",");
    if (
      unique.length >= MAX_EXPLICIT_POOL_IDS ||
      encodeURIComponent(candidate).length > MAX_EXPLICIT_POOL_PARAM_LENGTH
    ) {
      break;
    }
    seen.add(id);
    unique.push(id);
  }

  return unique.join(",");
}

/**
 * Returns null for an invalid payload. An empty string is a valid empty pool,
 * which lets the quiz page fail closed with its existing empty-state UI.
 */
export function parseExplicitPoolIds(raw: unknown): string[] | null {
  // Next.js represents duplicate query keys as string[]. Only one canonical
  // `ids` value is accepted; arrays and every other runtime shape fail closed.
  if (typeof raw !== "string") return null;
  if (encodeURIComponent(raw).length > MAX_EXPLICIT_POOL_PARAM_LENGTH) return null;
  if (raw === "") return [];

  const ids = raw.split(",");
  if (ids.length > MAX_EXPLICIT_POOL_IDS) return null;
  if (ids.some((id) => !QUESTION_ID_PATTERN.test(id))) return null;
  if (new Set(ids).size !== ids.length) return null;
  return ids;
}

export function selectExplicitPoolIds(
  raw: unknown,
  availableIds: Iterable<string>,
): string[] {
  const requested = parseExplicitPoolIds(raw);
  if (!requested) return [];
  const available = new Set(availableIds);
  return requested.filter((id) => available.has(id));
}
