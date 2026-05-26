/**
 * One-time rename of a legacy LocalStorage key to its new name.
 *
 * Copies the legacy value to newKey (only when newKey is unset, so newer data is
 * never clobbered) and removes the legacy key. No-op on the server, when the
 * legacy key is absent, or on any storage error. Idempotent — safe to call on
 * every read: once migrated, the legacy key is gone and subsequent calls return
 * immediately.
 *
 * Used to unify the few standalone `kakomon-ai-*` keys onto the project's
 * `ipa-quiz:*` convention (empirical review F-8) without losing existing users'
 * data.
 */
export function migrateLegacyKey(oldKey: string, newKey: string): void {
  if (typeof window === "undefined" || typeof window.localStorage === "undefined") return;
  try {
    const legacy = window.localStorage.getItem(oldKey);
    if (legacy === null) return;
    if (window.localStorage.getItem(newKey) === null) {
      window.localStorage.setItem(newKey, legacy);
    }
    window.localStorage.removeItem(oldKey);
  } catch {
    /* private mode / quota — ignore */
  }
}
