const CANONICAL_FALLBACK = "https://www.kakomon-ai.jp";

function resolveBaseUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit && !/(^|\.)vercel\.app(\/|$)/i.test(explicit)) {
    return explicit.replace(/\/$/, "");
  }
  return CANONICAL_FALLBACK;
}

export const SITE_BASE_URL = resolveBaseUrl();

export const SITE_NAME = "過去問AI";
export const SITE_TAGLINE = "AIネイティブ過去問学習";
