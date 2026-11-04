/** Normalize a local return path before passing it to either Auth.js or the browser. */
export function safeAuthCallback(raw: unknown): string {
  if (typeof raw !== "string" || !raw.startsWith("/") || /[\u0000-\u0020\u007f\\]/.test(raw)) return "/";
  const origin = "https://www.kakomon-ai.jp";
  try {
    const url = new URL(raw, origin);
    const local = url.pathname + url.search + url.hash;
    // Dot-segment normalization can turn a local URL into a pathname that
    // starts with //; reparsing that string in navigation would leave the site.
    return url.origin === origin && !local.startsWith("//") ? local : "/";
  } catch { return "/"; }
}
