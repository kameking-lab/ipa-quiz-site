export const SITE_BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://kakomon-ai.jp");

export const SITE_NAME = "過去問AI";
export const SITE_TAGLINE = "AIネイティブ過去問学習";
