/** Public campaign labels only. URLs, email addresses and arbitrary query fields are discarded. */
export interface FunnelAttribution { utm_source: string; utm_content: string }
export const ATTRIBUTION_COOKIE = "funnel_first_touch";
const label = (value: unknown, max: number) => typeof value === "string" && value.length <= max && /^[a-z][a-z0-9_-]*$/.test(value) ? value : null;
export function normalizeAttribution(value: unknown): FunnelAttribution | null {
  if (!value || typeof value !== "object") return null;
  const v = value as Partial<FunnelAttribution>;
  const source = label(v.utm_source, 40);
  if (!source) return null;
  const content = typeof v.utm_content === "string" && v.utm_content.length <= 80 && /^[a-z][a-z0-9_-]*(?:\.[a-z][a-z0-9_-]*)?$/.test(v.utm_content) ? v.utm_content : "unknown";
  return { utm_source: source, utm_content: content };
}
export function requestAttribution(request: Request): FunnelAttribution | null {
  try {
    const raw = request.headers.get("cookie")?.split(";").map(s => s.trim()).find(s => s.startsWith(`${ATTRIBUTION_COOKIE}=`))?.slice(ATTRIBUTION_COOKIE.length + 1);
    return raw ? normalizeAttribution(JSON.parse(decodeURIComponent(raw))) : null;
  } catch { return null; }
}
