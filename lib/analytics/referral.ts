import { LS_KEYS } from "@/lib/storage/keys";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
const SCOPE_KEYS = ["exam", "year", "season", "session", "category", "topic", "group", "subject"] as const;
const TTL = 24 * 60 * 60 * 1000;
export interface Referral {
  utm_source: string;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  landing_path: string;
  landing_scope: string;
  referral_id: string;
  first_visit: boolean;
  captured_at: number;
}

function bounded(value: string | null): string | null {
  return value?.replace(/[\u0000-\u001f\u007f]/g, "").slice(0, 200) || null;
}

/** Tab-scoped campaigns survive internal links, sign-in and checkout. Only
 * explicit campaigns replace them. Never store arbitrary URL queries. */
export function currentReferral(): Referral | null {
  if (typeof window === "undefined") return null;
  try {
    const url = new URL(window.location.href);
    const raw: unknown = JSON.parse(window.sessionStorage.getItem(LS_KEYS.referral) ?? "null");
    const saved = raw && typeof raw === "object" ? raw as Partial<Referral> : null;
    const valid = saved && typeof saved.utm_source === "string" && typeof saved.referral_id === "string"
      && typeof saved.landing_path === "string" && typeof saved.landing_scope === "string"
      && typeof saved.captured_at === "number" && Date.now() - saved.captured_at < TTL && Date.now() >= saved.captured_at;
    const source = bounded(url.searchParams.get("utm_source"));
    const campaign = Object.fromEntries(UTM_KEYS.map(key => [key, bounded(url.searchParams.get(key))]));
    if (valid && (!source || UTM_KEYS.every(key => saved[key] === campaign[key]))) return saved as Referral;
    if (!source) return null;
    const scope = new URLSearchParams();
    for (const key of SCOPE_KEYS) {
      const value = bounded(url.searchParams.get(key));
      if (value) scope.set(key, value);
    }
    let firstVisit = false;
    try {
      firstVisit = window.localStorage.getItem(LS_KEYS.referralVisited) === null
        && !window.localStorage.getItem(LS_KEYS.history);
    } catch { /* Storage failure must never interrupt practice. */ }
    const referral: Referral = {
      utm_source: source, utm_medium: campaign.utm_medium, utm_campaign: campaign.utm_campaign,
      utm_content: campaign.utm_content, utm_term: campaign.utm_term,
      landing_path: url.pathname, landing_scope: scope.toString(), referral_id: crypto.randomUUID(),
      first_visit: firstVisit, captured_at: Date.now(),
    };
    window.sessionStorage.setItem(LS_KEYS.referral, JSON.stringify(referral));
    return referral;
  } catch { return null; }
}

export function markReferralVisit(): void {
  currentReferral();
  try { window.localStorage.setItem(LS_KEYS.referralVisited, "1"); } catch { /* optional */ }
}

export function referralProps(): Record<string, string | boolean | null> {
  const referral = currentReferral();
  if (!referral) return {};
  const { captured_at: _capturedAt, ...props } = referral;
  return props;
}

export function isTsuginoReferral(referral: Referral | null): boolean {
  return referral !== null && ["tsugino", "tsugino_shikaku", "tsugino-shikaku"].includes(referral.utm_source);
}

/** One funnel milestone per campaign (and per quota reset for free limits).
 * A bounded tab record also prevents remount/reload duplicates. */
export function claimReferralStage(referral: Referral, stage: string): boolean {
  try {
    const key = `${referral.referral_id}:${stage}`;
    const raw: unknown = JSON.parse(sessionStorage.getItem(LS_KEYS.referralStages) ?? "[]");
    const stages = Array.isArray(raw) ? raw.filter((value): value is string => typeof value === "string").slice(-99) : [];
    if (stages.includes(key)) return false;
    sessionStorage.setItem(LS_KEYS.referralStages, JSON.stringify([...stages, key]));
  } catch { /* In-memory deduplication is still available to the caller. */ }
  return true;
}
