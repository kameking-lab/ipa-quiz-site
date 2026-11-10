import { TSUGINO_REFERRAL_LABELS } from "./tsugino-referral-labels";

export interface FunnelAttribution { utm_source: string; utm_content: string }
export const ATTRIBUTION_COOKIE = "funnel_first_touch";

// Public sending contract, snapshotted from t1's reviewed mappings (2026-11-10).
// Never infer a public label from its character set. New mappings require review.
const sources = new Set(["tsugino_shikaku", "tsugino-shikaku", "tsugino"]);
const placements = ["detail_hero", "learning", "my_next_steps"];
const publicContents = new Map<string, string>();
for (const [qualification, keys] of Object.entries(TSUGINO_REFERRAL_LABELS)) {
  publicContents.set(qualification, qualification);
  // Compatibility with the short/dotted labels used by the initial receiver.
  for (const placement of ["hero", ...placements]) {
    publicContents.set(`${qualification}.${placement}`, `${qualification}.${placement}`);
  }
  for (const [sourceKey, code] of keys) for (const placement of placements) {
    const canonical = `${qualification}.${placement}.${code}`;
    publicContents.set(`${qualification}_kakomon_${placement}_${sourceKey}`, canonical);
    publicContents.set(canonical, canonical);
  }
}

/** Both browser storage and server writes accept only enumerated public codes. */
export function normalizeAttribution(value: unknown): FunnelAttribution | null {
  if (!value || typeof value !== "object") return null;
  const v = value as Partial<FunnelAttribution>;
  if (typeof v.utm_source !== "string" || !sources.has(v.utm_source)) return null;
  const content = typeof v.utm_content === "string" ? publicContents.get(v.utm_content) : undefined;
  return { utm_source: v.utm_source, utm_content: content ?? "unknown" };
}

/** Only call on normalized content; unknown groups have no qualification. */
export function attributionQualification(attribution: FunnelAttribution): string {
  return attribution.utm_content === "unknown" ? "unknown" : attribution.utm_content.split(".")[0];
}
export function requestAttribution(request: Request): FunnelAttribution | null {
  try {
    const raw = request.headers.get("cookie")?.split(";").map(s => s.trim()).find(s => s.startsWith(`${ATTRIBUTION_COOKIE}=`))?.slice(ATTRIBUTION_COOKIE.length + 1);
    return raw ? normalizeAttribution(JSON.parse(decodeURIComponent(raw))) : null;
  } catch { return null; }
}
